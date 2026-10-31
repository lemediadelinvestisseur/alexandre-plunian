// Flux de toutes les publications (articles du média + vidéos YouTube), lu au moment du build.
// Ordre de priorité pour les articles : API Content de Ghost (tous les articles), sinon flux RSS
// (15 derniers), sinon la copie locale src/data/posts-fallback.json. Une source indisponible
// ne fait jamais échouer le build.
import { XMLParser } from 'fast-xml-parser';
import fallback from '../data/posts-fallback.json';

export type Publication = {
  title: string;
  url: string;
  date: string;
  excerpt: string;
  category: string | null;
  image: string | null;
  source: 'article' | 'video';
};

const GHOST_URL = (import.meta.env.GHOST_URL || 'https://lemediadelinvestisseur.fr').replace(/\/$/, '');
const GHOST_KEY = import.meta.env.GHOST_CONTENT_API_KEY;
const YOUTUBE_CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

async function get(url: string): Promise<Response> {
  const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} sur ${url}`);
  return res;
}

const clean = (s: unknown) =>
  String(s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const cut = (s: string, n = 220) => (s.length > n ? s.slice(0, n).replace(/\s\S*$/, '') + '…' : s);

/** Libellés lisibles pour les rubriques Ghost dont le nom est un identifiant */
const CATEGORY_LABELS: Record<string, string> = { epargne: 'Épargne', Cryptomonnaie: 'Crypto' };
const label = (c: string | null | undefined) => (c ? CATEGORY_LABELS[c] ?? c : null);

async function ghostApi(): Promise<Publication[]> {
  const items: Publication[] = [];
  for (let page = 1; page < 50; page++) {
    const url = `${GHOST_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&limit=100&page=${page}&include=tags&fields=title,url,published_at,custom_excerpt,excerpt,feature_image`;
    const data = await (await get(url)).json();
    for (const p of data.posts) {
      items.push({
        title: p.title,
        url: p.url,
        date: p.published_at,
        excerpt: cut(clean(p.custom_excerpt || p.excerpt)),
        category: label(p.primary_tag?.name ?? p.tags?.[0]?.name),
        image: p.feature_image ?? null,
        source: 'article',
      });
    }
    if (!data.meta?.pagination?.next) break;
  }
  return items;
}

async function ghostRss(): Promise<Publication[]> {
  const xml = parser.parse(await (await get(`${GHOST_URL}/rss/`)).text());
  const raw = xml?.rss?.channel?.item ?? [];
  return (Array.isArray(raw) ? raw : [raw]).map((i: any) => ({
    title: clean(i.title),
    url: i.link,
    date: new Date(i.pubDate).toISOString(),
    excerpt: cut(clean(i.description)),
    category: label(Array.isArray(i.category) ? i.category[0] : i.category),
    image: i['media:content']?.url ?? null,
    source: 'article' as const,
  }));
}

async function youtube(): Promise<Publication[]> {
  if (!YOUTUBE_CHANNEL_ID) return [];
  const xml = parser.parse(
    await (await get(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`)).text(),
  );
  const raw = xml?.feed?.entry ?? [];
  return (Array.isArray(raw) ? raw : [raw]).map((e: any) => ({
    title: clean(e.title),
    url: e.link?.href ?? `https://www.youtube.com/watch?v=${e['yt:videoId']}`,
    date: new Date(e.published).toISOString(),
    excerpt: cut(clean(e['media:group']?.['media:description'])),
    category: 'Vidéo',
    image: e['media:group']?.['media:thumbnail']?.url ?? null,
    source: 'video' as const,
  }));
}

async function articles(): Promise<Publication[]> {
  if (GHOST_KEY) {
    try {
      return await ghostApi();
    } catch (e) {
      console.warn(`[flux] API Ghost indisponible : ${(e as Error).message}`);
    }
  }
  try {
    return await ghostRss();
  } catch (e) {
    console.warn(`[flux] RSS Ghost indisponible : ${(e as Error).message}`);
  }
  return (fallback as Publication[]).map((p) => ({ ...p, category: label(p.category), source: 'article' }));
}

let cache: Promise<Publication[]> | null = null;

/** Toutes les publications, de la plus récente à la plus ancienne (résultat mis en cache pendant le build). */
export function getPublications(): Promise<Publication[]> {
  cache ??= (async () => {
    const [a, v] = await Promise.all([
      articles(),
      youtube().catch((e) => {
        console.warn(`[flux] YouTube indisponible : ${(e as Error).message}`);
        return [];
      }),
    ]);
    return [...a, ...v].sort((x, y) => +new Date(y.date) - +new Date(x.date));
  })();
  return cache;
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

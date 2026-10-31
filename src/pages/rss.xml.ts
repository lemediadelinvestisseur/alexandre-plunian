// Flux RSS unique de toutes les publications (articles du média + vidéos YouTube).
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublications } from '../lib/feed';
import { SITE } from '../config';

export async function GET(context: APIContext) {
  const items = await getPublications();
  return rss({
    title: `Publications de ${SITE.name}`,
    description: "Articles du Média de l'investisseur et vidéos YouTube d'Alexandre Plunian.",
    site: context.site!,
    items: items.map((p) => ({
      title: p.title,
      link: p.url,
      pubDate: new Date(p.date),
      description: p.excerpt,
      categories: p.category ? [p.category] : [],
    })),
    customData: '<language>fr-fr</language>',
  });
}

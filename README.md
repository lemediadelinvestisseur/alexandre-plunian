# Alexandre Plunian's website

Personal site: investments, media partnerships, content agency, client book and a feed of all
publications. Built with [Astro](https://astro.build), hosted on Cloudflare.

## Pages

| Page | Content |
| --- | --- |
| `/` | Home: introduction, key figures, offer summary, latest publications |
| `/investissements` | The three pillars (real estate, stocks, crypto) and related guides |
| `/media` | Media partnership offers (YouTube, articles, comparisons, newsletter) |
| `/agence` | Agency services (social media, SEO writing, strategy, short videos) |
| `/parcours` | Writing history: author pages and articles per client (`src/data/clients.ts`) |
| `/publications` | All articles and videos, filterable by category |
| `/contact` | WhatsApp, email and social links |
| `/rss.xml` | Single RSS feed of all publications |

## Commands

```sh
bun install
bun run dev      # http://localhost:4321
bun run check    # type check + build
```

## Still to fill in

- **Clients**: author page, start year and articles per client in `src/data/clients.ts`; logos as
  `public/clients/<slug>.svg` (or `.png`, `.webp`, `.jpg`).
- **Legal notice**: legal form, company name and address in `src/pages/mentions-legales.astro`.
- **Offers**: copy lives in `src/data/offers.ts`.

The WhatsApp number is set in `src/config.ts` (international format without "+"); the photo is
`public/portrait.jpg` (4:3 landscape).

## Deployment (Cloudflare Workers)

`.github/workflows/deploy.yml` builds and deploys the site on every commit to `main`, and every
morning. The Worker that serves the static site, and its custom domains, are configured in
`wrangler.jsonc`.

1. On Cloudflare, create an API token from the *Edit Cloudflare Workers* template (*My Profile → API Tokens*).
2. On GitHub (*Settings → Secrets and variables → Actions*), add `CLOUDFLARE_API_TOKEN`, plus
   `GHOST_CONTENT_API_KEY` for the publications feed.

Deploying from CI replaces any conflicting DNS records on the domains listed in `wrangler.jsonc`.

### Publications feed

The feed is read at build time:
- **Articles**: Ghost Content API if `GHOST_CONTENT_API_KEY` is set (all articles), otherwise the
  Ghost RSS feed (latest 15), otherwise the `src/data/posts-fallback.json` copy.
  Key: Ghost → *Settings → Integrations → Add custom integration* → *Content API key*.
- **Videos**: YouTube channel feed if `YOUTUBE_CHANNEL_ID` is set (ID starting with `UC…`, in
  YouTube Studio → *Settings → Channel → Advanced settings*). The public YouTube feed returns the
  latest 15 videos.

The morning deployment picks up new publications. For an immediate update, run the workflow
manually from the GitHub *Actions* tab.

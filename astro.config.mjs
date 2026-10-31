import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL : à définir dans Netlify une fois le nom de domaine choisi.
export default defineConfig({
  site: process.env.SITE_URL || 'https://alexandreplunian.fr',
  integrations: [sitemap()],
  trailingSlash: 'ignore',
});

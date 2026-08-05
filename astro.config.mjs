// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // If you later attach a custom domain in Netlify, update this to match
  // (and SITE.url in src/config/site.ts, and robots.txt), then push.
  site: 'https://lurvenea.netlify.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), mdx()]
});
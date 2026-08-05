// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // TODO: Netlify will assign your real *.netlify.app URL (or your custom
  // domain) after the first deploy — update this to match, then redeploy
  // (just push to GitHub) so the sitemap and canonical URLs are correct.
  site: 'https://lurvenea.netlify.app',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), mdx()]
});
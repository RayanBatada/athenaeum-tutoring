// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages serves the site under /<repo-name>/ unless a custom domain is set.
  // When you point a real domain at this site, change `site` to that origin and
  // remove `base` (or set base to '/').
  site: 'https://rayanbatada.github.io',
  base: '/athenaeum-tutoring',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx()]
});

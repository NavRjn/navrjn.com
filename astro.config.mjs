// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: "https://navrjn.com",
  integrations: [
    mdx(),
    // Keep the placeholder and error pages out of the sitemap.
    sitemap({
      filter: (page) => !/\/(not-yet|404)\/?$/.test(page),
    }),
  ]
});

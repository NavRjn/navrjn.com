// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: "https://navrjn.com",
  integrations: [
    mdx(),
    // Keep gated/placeholder pages out of the sitemap; remove entries as sections go live.
    sitemap({
      filter: (page) => !/\/(writing|now|not-yet)\/?$/.test(page),
    }),
  ]
});

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      role: z.string(),
      period: z.string(),
      type: z.string(), // card eyebrow, e.g. "ROBOTICS · EDGE ML"
      tags: z.array(z.string()).default([]),
      stack: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      // Draft entries get no case-study page; the homepage card links to `links.repo` instead.
      draft: z.boolean().default(false),
      metric: z.object({ value: z.string(), label: z.string() }).optional(),
      links: z
        .object({
          repo: z.string().url().optional(),
          demo: z.string().url().optional(),
          video: z.string().url().optional(),
        })
        .default({}),
      cover: image().optional(),
    }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };

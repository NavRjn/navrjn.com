# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal site for navrjn.com: a static Astro site (`astro` ^7, `@astrojs/sitemap`, no UI framework, no Tailwind). There is no test or lint tooling configured.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Other commands (via `npm run`): `build` (output to `dist/`), `preview` (serve the built site). Requires Node >=22.12.

## Architecture

- `src/data/profile.ts`: **single source of truth** for facts about me (summary, experience, education, skills, press, availability). About, `/cv`, JSON-LD, `llms.txt`, `resume.json` and the footer all read from it. Edit facts there, not in pages.
- `src/pages/*.astro`: file-based routes (`index`, `about`, `now`, `cv`, `projects/`, `writing/`, `404`, `not-yet`). Each page wraps its content in `src/layouts/Layout.astro` and passes `title` / `description` (plus optional `type`, `noindex`, `markdown`, `jsonLd`).
- `src/layouts/Layout.astro`: owns `<head>` (canonical, Open Graph, Twitter, Person JSON-LD, RSS/markdown alternates), the header/nav, the footer, and mounts `components/Delights.astro` (console greeting, `?` shortcuts dialog, `g`+key navigation, Konami "flight HUD").
- Content collections (`src/content.config.ts`): `projects` (`src/content/projects/*.mdx`, case studies with SVG diagrams in `public/diagrams/`) and `writing` (`src/content/writing/*.mdx`). `draft: true` entries are not built.
- Agent/LLM layer: `llms.txt`, `llms-full.txt`, `resume.json`, `rss.xml`, `index.md`, `about.md`, and `.md` twins of every project and post. Shared helpers in `src/lib/md.ts`. `public/robots.txt` explicitly allows AI crawlers.
- `src/middleware.ts`: gates unfinished sections. `UNFINISHED_PATHS` is currently empty; add a path to 302-redirect it to `/not-yet?from=<path>`.
- `public/cv.pdf` is generated from `/cv` with `npm run build && npm run cv:pdf` (headless Edge/Chrome). Regenerate it after changing `profile.ts`.
- `public/_headers` sets security headers; `astro.config.mjs` sets `site: "https://navrjn.com"`, MDX and the sitemap (excluding `/not-yet` and `/404`).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

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

- `src/pages/*.astro`: file-based routes (`index`, `about`, `now`, `projects`, `writing`, `404`, `not-yet`). Each page wraps its content in `src/layouts/Layout.astro` and passes `title` / `description` props; styles are scoped per page.
- `src/layouts/Layout.astro`: owns `<head>` metadata (title is rendered as `"<title> — Naveen Rajan"`), the site header/nav, and exposes a `head` slot for per-page additions.
- `src/middleware.ts`: **gates unfinished sections.** Any path in `UNFINISHED_PATHS` (currently `/writing`, `/now`, `/projects`, `/about`, including subpaths) is 302-redirected to `/not-yet?from=<path>`. The pages exist but are unreachable until their entry is removed from that list, so when working on one of them, remove it from `UNFINISHED_PATHS` to see it in dev.
- `public/_headers` sets security headers (nosniff, frame deny, referrer/permissions policy) for the host; `astro.config.mjs` sets `site: "https://navrjn.com"` and enables the sitemap.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

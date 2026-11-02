# navrjn.com — job-offer conversion pass + Projects case-study system

## Context
navrjn.com is the landing page people reach from LinkedIn and from the hello@navrjn.com address. Its job is to turn a 10-second recruiter scan into a reach-out. Right now it works against that:
- **Every nav item is a dead end.** Writing, Projects, About and Now all 302 to `/not-yet`. So do the featured project card and "Explore writing".
- **The footer LinkedIn link is broken**: `https://linkedin/in/navrjn` in `src/layouts/Layout.astro`.
- **No LinkedIn preview image.** There is no og:image, canonical, twitter card or Person JSON-LD, so a shared link looks bare on the main traffic source.
- **The hero portrait is 2.6 MB**: `public/images/me-3.jpg` is served raw, so the first paint on mobile is slow.
- **DOM XSS in `not-yet.astro`.** The `?from=` value is written with `innerHTML`.
- **Smaller problems**: `<main>` nested inside `<main>` (not-yet, 404); not-yet's title renders "Not Yet — Naveen Rajan — Naveen Rajan"; the default description has a typo ("an embodied robotics"); and the role is unclear (the headline is "Applied AI & Systems Engineer", while the meta mixes in founder, researcher and SciML).
- FYI: all 15 "modified" files in `git status` differ only in line endings (CRLF). There is no content change. I won't touch this, but a `.gitattributes` would silence it.

## Positioning recommendation (the "what would you recommend" answer)
**Lead with "Machine Learning Engineer — computer vision & autonomous systems". Show LLM/NLP and SciML as range, not as competing headlines.**
- Your most credible and longest-running evidence is shipped perception and navigation for drones (2021–present). A recruiter needs one clear lane to file you under, and this one has proof.
- "ML Engineer" is the umbrella title most recruiters search for. It still qualifies you for CV, robotics, applied-AI and many LLM roles, so it keeps the pool wide while the subtitle keeps you distinctive.
- The legal knowledge-graph and entity-resolution work shows you can ship applied LLM/NLP. PINNs show research depth. Both make you more attractive to the same ML-engineer roles.
- Founder or co-founder framing stays secondary, on the About page only. Leading with it reads as a flight risk to employers.

**CV:** publish **one** general "ML Engineer" CV at the stable URL `/cv.pdf` (`download="Naveen-Rajan-CV.pdf"`). Send tailored variants directly with applications and never post them publicly. Several public CVs dilute the message and make the reader choose.

## Plan

### 1. Layout and site-wide (`src/layouts/Layout.astro`)
- **Nav**: Work (`/projects`), About, Résumé (`/cv.pdf`), plus a highlighted **Contact** button (mailto with a prefilled subject). Remove Writing and Now from the nav; they stay gated.
- **Footer**: fix the LinkedIn URL to `https://www.linkedin.com/in/navrjn`. Show the email as plain, copyable text.
- **Head**: add `initial-scale=1`, canonical (`Astro.url` + `Astro.site`), `og:url`, `og:image` (1200×630 `public/og.jpg`, cropped once from the portrait), `twitter:card=summary_large_image`, and Person JSON-LD (name, jobTitle, url, email, Vienna, sameAs GitHub/LinkedIn). Add an optional `image` prop so case studies can set their own og:image.
- Fix the description typo and align it with the positioning.

### 2. Homepage rework (`src/pages/index.astro`)
Keep the current visual language (dark, sage accent, card style). Restructure for conversion:
1. **Hero**
   - Eyebrow: "MACHINE LEARNING ENGINEER · VIENNA".
   - H1: an outcome statement (e.g. "I build computer-vision and ML systems that work outside the lab.").
   - Proof line on the drone work.
   - One line of range (LLM document intelligence, scientific ML).
   - CTAs: **Email me** (primary), **Résumé (PDF)**, LinkedIn.
   - Availability: "Vienna · on-site or remote (EU) · open to full-time roles".
   - Portrait via `astro:assets` `<Image>`, with the file moved to `src/assets/me-3.jpg` (gives responsive AVIF/WebP).
2. **"What I bring"**: replaces the "Now" strip with three capability pillars, each pointing to its project:
   - Perception and autonomy on edge hardware
   - Applied LLM/NLP
   - Scientific ML
3. **Selected work**: rendered from the projects collection (`featured: true`). Each card links to its case study, or to the repo if the case study is still a draft. The featured card keeps the metric. **I need you to define the 97%** (97% of what, over what test set); a vague number hurts credibility with technical readers.
4. **Remove the Writing teaser** while Writing is gated. A teaser that leads to a dead end costs conversions.
5. **Contact**: one direct ask ("Hiring for CV/ML? Let's talk."), the plain email address, and the three actions.

### 3. Projects case-study system
- Add `@astrojs/mdx` (`npx astro add mdx`).
- `src/content.config.ts`: a `projects` collection using the `glob` loader over `src/content/projects/*.mdx`. Schema fields:
  - `title`, `summary`, `role`, `period`, `tags[]`, `stack[]`
  - `featured`, `order`, `draft`
  - optional `metric {value,label}`, `links {repo,demo,video}`, `cover: image()`
- `src/pages/projects/index.astro`: replaces `src/pages/projects.astro`. Lists the non-draft entries sorted by `order`, reusing the homepage card styles.
- `src/pages/projects/[slug].astro`: `getStaticPaths` over the non-draft entries. It shows:
  - a facts header (Role / Period / Stack / Outcome)
  - the MDX body
  - repo/demo links
  - prev/next
  - a closing contact CTA, so every case study ends with an ask
- MDX components in `src/components/`, each kept minimal:
  - `Figure.astro`: image or SVG with a caption; use it for architecture diagrams (draw in Excalidraw or draw.io, export SVG).
  - `Video.astro`: native `<video>` (muted, playsinline, controls, `preload="none"`, poster) or a youtube-nocookie iframe.
  - `Demo.astro`: click-to-load iframe, so heavy demos don't slow the page.
- Seed three entries from the existing homepage copy: drone navigation, PINN framework and entity resolution. Each gets the skeleton Problem → Constraints → Approach → Architecture → Results → What I'd do next. Entries whose facts are missing stay `draft: true` and are excluded from the build.

### 4. About page (`src/pages/about.astro`)
Rewrite it for recruiters:
- a short bio
- an **experience and education timeline**
- grouped skills (Languages / ML & CV / Robotics & edge / Infra)
- "What I'm looking for"
- contact

Where I don't know a fact (degree, institution, dates, employer titles), I'll leave a clearly marked `TODO` comment instead of inventing it.

### 5. Gating and bug fixes
- `src/middleware.ts`: `UNFINISHED_PATHS = ['/writing', '/now']`.
- `src/pages/not-yet.astro`: build the message with `textContent` and a `<code>` element instead of `innerHTML`. Replace the inner `<main>` with a `<div>`. Pass `title="Not yet"`.
- `src/pages/404.astro`: replace the inner `<main>` with a `<div>`.
- Writing and Now page files stay untouched (out of scope).

### Inputs needed from you, which can come after implementation
- `public/cv.pdf`
- the definition of the 97% metric
- employer and role titles, degree and dates for About
- media (videos and diagrams) for the case studies

## Verification
1. `npm run build` succeeds.
2. Check the output in `dist/`: no raw 2.6 MB JPG is referenced, and the portrait is emitted as AVIF/WebP.
3. `astro dev --background`, then curl every nav, footer and card link:
   - `/`, `/projects`, `/projects/<slug>` and `/about` return 200.
   - `/writing` still returns 302 to `/not-yet`.
4. Open `/not-yet?from=<img src=x onerror=alert(1)>`: it renders as literal text.
5. View source on `/`: check the canonical, og:image, twitter card and valid JSON-LD (paste it into the Rich Results test after deploy). LinkedIn Post Inspector shows the preview image after deploy.
6. Screenshot the homepage at 375 px and 1280 px: no horizontal scroll, and the CTAs are visible above the fold on mobile.

# Personal Website — Design Spec

**Date:** 2026-09-21
**Owner:** Joshua Matte
**Working title / domain:** jackmatte.me
**Repo location:** `~/projects/personal-website`

## Purpose

A personal website that is **portfolio-first but built to last** — it serves
employers now (showcase projects, make me easy to find and contact) and grows
into a durable personal hub (blog, about) without a rebuild.

Design north star: benadam.me — minimal, multi-page, typography-first, content
carries it. The assignment's own guidance ("simple, clean, and to the point
rather than bloated") is the tie-breaker for every scope decision. Personality
comes from substance, not decoration.

## Goals

- Clean landing page that says who I am and links to my work and contact.
- Projects section where each entry has a real writeup + screenshot.
- About page for the longer narrative.
- Blog stubbed now (one placeholder post) so the structure exists for later.
- **First-class documentation** — the README is a graded deliverable, not an
  afterthought.
- Fast, accessible, static output; cheap to host and maintain.

## Non-Goals (YAGNI)

- No CMS, no database, no backend, no auth.
- No dark-mode toggle (system preference only).
- No interactive "experiments" at launch — leave a hook for later.
- No CSS framework.
- No analytics at launch.
- Not using Bloomfield Homes branding — this is a personal site.

## Aesthetic Direction

- Monochromatic base with a single restrained accent color.
- Generous whitespace, strong type scale, single readable content column.
- Mobile-first, responsive.
- Dark mode via `prefers-color-scheme`, no toggle.
- Semantic HTML, visible focus states, skip-to-content link, good contrast.
- Personality: restrained at launch. Leave obvious, low-cost hooks for a future
  "Experiments" section and small touches of wit — do not build them now.

## Tech Stack

- **Astro** (latest), static output, zero JS shipped by default.
- **TypeScript** for config and content-collection schemas.
- **Scoped CSS + design tokens** (CSS custom properties for color, type scale,
  spacing). No Tailwind/framework.
- Integrations: `@astrojs/sitemap`. (RSS deferred until the blog is real.)

Rationale: matches "portfolio-first, built to last," gives a clean Markdown
blog path, and is a good resume signal without the weight of a full React app.

## Site Structure (pages)

| Route | Purpose |
|-------|---------|
| `/` | Intro/bio, social + contact links, 2–3 featured projects |
| `/projects` | Full project list, each links to its detail page |
| `/projects/[slug]` | Per-project page: screenshot + README-style writeup |
| `/about` | Longer bio / background |
| `/blog` | Post index (one placeholder post at launch) |
| `/blog/[slug]` | Individual post |
| 404 | Simple styled not-found page |

The per-project detail page is deliberate: it mirrors the assignment's
documentation requirement (why I built it, what it does, how it runs) at the
project level.

## Data Model — Astro Content Collections

Two Markdown-body collections with typed (Zod) frontmatter.

**`projects`**
- `title: string`
- `description: string` (one-line summary)
- `tech: string[]`
- `repo?: string` (URL)
- `demo?: string` (URL)
- `screenshot?: string` (path under `src/assets` or `public`)
- `featured: boolean` (default false)
- `order: number` (for sorting)
- body (Markdown) = the writeup

**`blog`**
- `title: string`
- `date: date`
- `description: string`
- `draft: boolean` (default false)
- body (Markdown) = the post

> **Learning-mode contribution point:** the `projects` schema shapes what every
> portfolio entry can express, so Joshua writes it (~8 lines) during
> implementation rather than having it handed over. The file will be scaffolded
> with context, signature, and a clear TODO.

## Components

Small, single-purpose:

- `BaseLayout.astro` — `<head>`, SEO/OpenGraph, skip link, nav + footer slots
- `Nav.astro` — site navigation, current-page state
- `Footer.astro`
- `SocialLinks.astro` — GitHub / LinkedIn / email
- `ProjectCard.astro` — used on home (featured) and `/projects`
- `Prose.astro` — wrapper applying readable typography to rendered Markdown

## SEO & Meta

- Per-page `<title>` and meta description.
- Open Graph tags for link previews.
- `@astrojs/sitemap`.
- Favicon.
- `site` in `astro.config` set to `https://jackmatte.me` for correct canonical
  URLs and sitemap output.

## Documentation (graded deliverable)

`README.md` at the repo root must contain:

1. **Screenshot** of the running site near the top.
2. **Plain-language intro** for a non-technical reader — what this is, in a
   sentence or two, no jargon.
3. **"Why I built this"** — motivation and what it demonstrates.
4. **"Run locally"** — prerequisites and the exact commands: install, dev,
   build, preview.
5. Brief tech/structure overview and deploy notes.

Per-project writeups (the `projects/[slug]` bodies) reinforce the documentation
story.

## Deploy

- GitHub Pages via a GitHub Actions workflow (build on push to `main`, deploy
  `dist/`).
- `site` set for canonical URLs; `CNAME` added when `jackmatte.me` is
  registered (custom `.me` domain is a one-time ~30-min DNS setup, independent
  of the framework).
- Output stays plain static `dist/`, so moving to another host later is free.

## Testing & Security

Pragmatic for a static content site:

- **CI gate:** `astro check` (type + content diagnostics) and a successful
  production build must pass.
- **Smoke tests:** a small Playwright suite asserting each page renders and nav
  works.
- **TDD** applied where there is real logic (schemas, any sort/filter helpers) —
  test first there; not forced onto static markup.
- **HawkScan / DAST: not applicable.** No backend, endpoints, or server-side
  attack surface. Revisit only if a server component is ever added.

## Open Items / Deferred

- Real project + about + bio content (Joshua fills in later; launch uses clearly
  labeled placeholders).
- Blog RSS feed (add when the blog is real).
- Future "Experiments" section for interactive demos.
- Custom domain registration + `CNAME`.

## Post-Approval

Per Joshua's workflow, after this spec is approved the final copy moves to the
Obsidian vault under `Areas/Work/Projects/personal-website/Specs/`, and the next
step is the writing-plans skill to produce the implementation plan.

# Personal Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal, typography-first personal portfolio website in Astro that deploys as a static site to GitHub Pages.

**Architecture:** Astro static site (zero JS by default). Content lives in two Markdown content collections (`projects`, `blog`) with typed Zod schemas via the Astro 5 content layer. A small set of single-purpose `.astro` components compose a handful of pages. Pure sort/filter logic is extracted to a testable helper module. Quality is gated by `astro check`, a Vitest unit suite for the logic, and a Playwright smoke suite for page rendering.

**Tech Stack:** Astro 5, TypeScript (strict), `@astrojs/sitemap`, scoped CSS + design tokens (no framework), Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-21-personal-website-design.md`

## Global Constraints

- **Astro 5.x**, static output, **zero JS shipped by default**.
- **Node >= 20** (LTS).
- **TypeScript strict** for config, schemas, and helpers.
- Content layer API: config at `src/content.config.ts`; `glob()` loader from `astro/loaders`; entries use `.id` (not `.slug`) and `.data`; render via `render(entry)` from `astro:content`.
- **Scoped CSS + CSS custom-property design tokens. No CSS framework.**
- `site: 'https://jackmatte.me'` in `astro.config.mjs`.
- Aesthetic: monochromatic + single restrained accent; generous whitespace; single readable column; mobile-first.
- **Dark mode via `prefers-color-scheme` only — no toggle.**
- Accessibility: semantic HTML, visible focus states, skip-to-content link, good contrast.
- **Not** using Bloomfield Homes branding — this is a personal site.
- HawkScan / DAST is **not applicable** (static site, no backend). Do not run it.
- Content is placeholder at launch, clearly labeled; real content added later.

---

### Task 1: Scaffold, config, design tokens, and test harness

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`
- Create: `src/pages/index.astro` (minimal placeholder)
- Test: `tests/e2e/smoke.spec.ts`

**Interfaces:**
- Produces: an installable, buildable Astro project; `npm run build`, `npm run check`, `npm run test`, `npm run test:e2e` scripts; global design tokens on `:root` (`--color-bg`, `--color-fg`, `--color-muted`, `--color-accent`, `--space-*`, `--font-sans`, `--measure`); a `dev` server on `http://localhost:4321`.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "personal-website",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "engines": { "node": ">=20" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/sitemap": "^3.0.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.5.0",
    "vitest": "^2.0.0",
    "@playwright/test": "^1.47.0"
  }
}
```

- [ ] **Step 2: Install dependencies and Playwright browser**

Run:
```bash
npm install
npx playwright install chromium
```
Expected: install completes; Chromium downloaded.

- [ ] **Step 3: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jackmatte.me',
  integrations: [sitemap()],
});
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: Create `src/styles/global.css` with design tokens**

```css
:root {
  --color-bg: #fdfdfc;
  --color-fg: #1a1a1a;
  --color-muted: #6a6a6a;
  --color-accent: #3b5bdb;
  --color-border: #e5e5e2;
  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --measure: 68ch;
  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 2.5rem;
  --space-5: 4rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #14161a;
    --color-fg: #e9e9e6;
    --color-muted: #9a9a94;
    --color-accent: #7c93f0;
    --color-border: #2a2d33;
  }
}

* { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-sans);
  line-height: 1.6;
  font-size: 1.0625rem;
}

a { color: var(--color-accent); }

:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--color-accent);
  color: #fff;
  padding: var(--space-1) var(--space-2);
  z-index: 10;
}
.skip-link:focus { left: var(--space-2); }

.container {
  width: 100%;
  max-width: var(--measure);
  margin-inline: auto;
  padding-inline: var(--space-2);
}
```

- [ ] **Step 6: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#3b5bdb"/><text x="16" y="22" font-family="sans-serif" font-size="18" fill="#fff" text-anchor="middle">jm</text></svg>
```

- [ ] **Step 7: Create minimal `src/pages/index.astro`**

```astro
---
import '../styles/global.css';
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Jack Matte</title>
  </head>
  <body>
    <main class="container">
      <h1>Jack Matte</h1>
    </main>
  </body>
</html>
```

- [ ] **Step 8: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
  },
});
```

- [ ] **Step 9: Create `playwright.config.ts`**

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://localhost:4321' },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 10: Write the failing smoke test `tests/e2e/smoke.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('home page renders with a heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Jack Matte');
});
```

- [ ] **Step 11: Run the smoke test**

Run: `npm run test:e2e`
Expected: PASS (Playwright boots the dev server, home page shows the `h1`). If it fails, fix the page/config before continuing.

- [ ] **Step 12: Verify build and type check**

Run:
```bash
npm run build && npm run check
```
Expected: build writes `dist/`; `astro check` reports 0 errors.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project, config, tokens, and test harness"
```

---

### Task 2: Base layout and site chrome (Nav, Footer, SocialLinks)

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/SocialLinks.astro`
- Modify: `src/pages/index.astro` (use the layout)
- Test: `tests/e2e/chrome.spec.ts`

**Interfaces:**
- Produces: `BaseLayout` accepting props `{ title: string; description?: string }` and a default `<slot />`; renders `<head>` (charset, viewport, favicon, title, meta description, Open Graph tags, canonical), a `.skip-link`, `<Nav />`, a `<main id="main">`, and `<Footer />`. `Nav` renders links to `/`, `/projects`, `/about`, `/blog` with `aria-current="page"` on the active route. `SocialLinks` renders GitHub, LinkedIn, and email links.
- Consumes: design tokens from Task 1.

- [ ] **Step 1: Write the failing test `tests/e2e/chrome.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('nav links are present on the home page', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation');
  await expect(nav.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  await expect(nav.getByRole('link', { name: 'Writing' })).toHaveAttribute('href', '/blog');
});

test('home has a skip link and a main landmark', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a.skip-link')).toHaveAttribute('href', '#main');
  await expect(page.locator('main#main')).toBeVisible();
});
```

- [ ] **Step 2: Run it to confirm failure**

Run: `npm run test:e2e -- chrome.spec.ts`
Expected: FAIL (no nav, no skip link yet).

- [ ] **Step 3: Create `src/components/SocialLinks.astro`**

```astro
---
const links = [
  { label: 'GitHub', href: 'https://github.com/jackmatte' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jackmatte' },
  { label: 'Email', href: 'mailto:hello@jackmatte.me' },
];
---
<ul class="social">
  {links.map((l) => (
    <li><a href={l.href} rel="me noopener">{l.label}</a></li>
  ))}
</ul>
<style>
  .social { list-style: none; display: flex; gap: var(--space-2); padding: 0; margin: 0; flex-wrap: wrap; }
</style>
```

> Note: these URLs are placeholders and are corrected when real accounts/domain are confirmed.

- [ ] **Step 4: Create `src/components/Nav.astro`**

```astro
---
const path = Astro.url.pathname;
const items = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Writing', href: '/blog' },
];
const isActive = (href: string) =>
  href === '/' ? path === '/' : path.startsWith(href);
---
<nav aria-label="Primary">
  <a class="brand" href="/">Jack Matte</a>
  <ul>
    {items.map((it) => (
      <li>
        <a href={it.href} aria-current={isActive(it.href) ? 'page' : undefined}>{it.label}</a>
      </li>
    ))}
  </ul>
</nav>
<style>
  nav { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-2); padding-block: var(--space-3); flex-wrap: wrap; }
  .brand { font-weight: 700; text-decoration: none; color: var(--color-fg); }
  ul { list-style: none; display: flex; gap: var(--space-2); padding: 0; margin: 0; flex-wrap: wrap; }
  a[aria-current='page'] { color: var(--color-fg); text-decoration: underline; }
</style>
```

- [ ] **Step 5: Create `src/components/Footer.astro`**

```astro
---
import SocialLinks from './SocialLinks.astro';
const year = new Date().getFullYear();
---
<footer>
  <SocialLinks />
  <p>&copy; {year} Jack Matte</p>
</footer>
<style>
  footer { border-top: 1px solid var(--color-border); margin-top: var(--space-5); padding-block: var(--space-3); color: var(--color-muted); display: flex; flex-direction: column; gap: var(--space-1); }
</style>
```

- [ ] **Step 6: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';

interface Props { title: string; description?: string }
const { title, description = 'Personal site of Jack Matte.' } = Astro.props;
const canonical = new URL(Astro.url.pathname, Astro.site);
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonical} />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="container">
      <Nav />
      <main id="main">
        <slot />
      </main>
      <Footer />
    </div>
  </body>
</html>
```

- [ ] **Step 7: Rewrite `src/pages/index.astro` to use the layout**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Jack Matte">
  <h1>Jack Matte</h1>
  <p>Software engineer. This site is a work in progress.</p>
</BaseLayout>
```

- [ ] **Step 8: Run tests**

Run: `npm run test:e2e`
Expected: all specs PASS (smoke + chrome).

- [ ] **Step 9: Verify build and type check**

Run: `npm run build && npm run check`
Expected: 0 errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: base layout with nav, footer, social links, and SEO head"
```

---

### Task 3: Content collections and sample content

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects/example-alpha.md`
- Create: `src/content/projects/example-beta.md`
- Create: `src/content/blog/hello-world.md`

**Interfaces:**
- Produces: two collections. `projects` schema: `{ title: string; description: string; tech: string[]; repo?: string(url); demo?: string(url); screenshot?: string; featured: boolean(default false); order: number }`. `blog` schema: `{ title: string; date: date; description: string; draft: boolean(default false) }`. Both use `glob()` over `./src/content/<name>` matching `**/*.md`.
- Consumes: nothing.

> **Learning-mode note (execution only):** the `projects` schema is Joshua's contribution point. During execution, present `src/content.config.ts` scaffolded with the `blog` schema complete and the `projects` schema marked with a TODO + the field list above, and let Joshua write the ~8 Zod lines. The code below is the reference/expected result for verification.

- [ ] **Step 1: Create `src/content.config.ts`**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    screenshot: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
```

- [ ] **Step 2: Create `src/content/projects/example-alpha.md`**

```markdown
---
title: "Example Project Alpha"
description: "Placeholder project — replace with a real one."
tech: ["Astro", "TypeScript"]
repo: "https://github.com/jackmatte/example-alpha"
featured: true
order: 1
---

## Why I built this

Placeholder writeup. Explain the problem this project solved and what it demonstrates.

## What it does

Placeholder details.
```

- [ ] **Step 3: Create `src/content/projects/example-beta.md`**

```markdown
---
title: "Example Project Beta"
description: "Another placeholder project."
tech: ["Node.js", "SQLite"]
featured: false
order: 2
---

## Why I built this

Placeholder writeup.
```

- [ ] **Step 4: Create `src/content/blog/hello-world.md`**

```markdown
---
title: "Hello World"
date: 2026-09-22
description: "First post — placeholder to establish the blog structure."
draft: false
---

This is a placeholder post. Real writing goes here later.
```

- [ ] **Step 5: Verify the schemas validate the content**

Run: `npm run check && npm run build`
Expected: `astro check` reports 0 errors; build succeeds (proves the frontmatter matches the schemas).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: define projects and blog content collections with sample content"
```

---

### Task 4: Projects logic helper (Vitest, TDD)

**Files:**
- Create: `src/lib/projects.ts`
- Test: `tests/unit/projects.test.ts`

**Interfaces:**
- Produces: `sortByOrder(projects)` → new array sorted ascending by `data.order`; `getFeatured(projects)` → featured-only, sorted by order. Both are pure and operate on objects shaped `{ data: { order: number; featured: boolean } }` (the relevant slice of `CollectionEntry<'projects'>`).
- Consumes: `CollectionEntry<'projects'>` type (type-only import; erased at runtime).

- [ ] **Step 1: Write the failing test `tests/unit/projects.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { sortByOrder, getFeatured } from '../../src/lib/projects';

const make = (order: number, featured: boolean) =>
  ({ data: { order, featured } }) as any;

describe('sortByOrder', () => {
  it('sorts ascending by order without mutating input', () => {
    const input = [make(3, false), make(1, true), make(2, false)];
    const out = sortByOrder(input);
    expect(out.map((p) => p.data.order)).toEqual([1, 2, 3]);
    expect(input.map((p) => p.data.order)).toEqual([3, 1, 2]);
  });
});

describe('getFeatured', () => {
  it('returns only featured entries, sorted by order', () => {
    const input = [make(3, true), make(1, false), make(2, true)];
    const out = getFeatured(input);
    expect(out.map((p) => p.data.order)).toEqual([2, 3]);
    expect(out.every((p) => p.data.featured)).toBe(true);
  });
});
```

- [ ] **Step 2: Run it to confirm failure**

Run: `npm run test`
Expected: FAIL ("Cannot find module '../../src/lib/projects'").

- [ ] **Step 3: Implement `src/lib/projects.ts`**

```ts
import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

export function sortByOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.data.order - b.data.order);
}

export function getFeatured(projects: Project[]): Project[] {
  return sortByOrder(projects.filter((p) => p.data.featured));
}
```

- [ ] **Step 4: Run tests to confirm pass**

Run: `npm run test`
Expected: PASS (both suites).

- [ ] **Step 5: Type check**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add tested projects sort/filter helpers"
```

---

### Task 5: ProjectCard, projects index, and project detail pages

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/Prose.astro`
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/projects/[id].astro`
- Test: `tests/e2e/projects.spec.ts`

**Interfaces:**
- Consumes: `getCollection`, `render` from `astro:content`; `sortByOrder` from `src/lib/projects.ts`; `BaseLayout`.
- Produces: `ProjectCard` accepting `{ project: CollectionEntry<'projects'> }` linking to `/projects/<id>`; `Prose` wrapping `<slot />` for readable rendered Markdown; a `/projects` list page; a `/projects/<id>` detail page per entry.

- [ ] **Step 1: Write the failing test `tests/e2e/projects.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('projects index lists project titles', async ({ page }) => {
  await page.goto('/projects');
  await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Example Project Alpha' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Example Project Beta' })).toBeVisible();
});

test('project detail page renders title and writeup', async ({ page }) => {
  await page.goto('/projects/example-alpha');
  await expect(page.getByRole('heading', { name: 'Example Project Alpha', level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why I built this' })).toBeVisible();
});
```

- [ ] **Step 2: Run it to confirm failure**

Run: `npm run test:e2e -- projects.spec.ts`
Expected: FAIL (routes 404).

- [ ] **Step 3: Create `src/components/Prose.astro`**

```astro
<div class="prose"><slot /></div>
<style>
  .prose { max-width: var(--measure); }
  .prose :global(h2) { margin-top: var(--space-4); }
  .prose :global(p) { margin-block: var(--space-2); }
  .prose :global(pre) { overflow-x: auto; padding: var(--space-2); border: 1px solid var(--color-border); border-radius: 6px; }
</style>
```

- [ ] **Step 4: Create `src/components/ProjectCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
interface Props { project: CollectionEntry<'projects'> }
const { project } = Astro.props;
const { title, description, tech } = project.data;
---
<article class="card">
  <h3><a href={`/projects/${project.id}`}>{title}</a></h3>
  <p>{description}</p>
  <ul class="tech">{tech.map((t) => <li>{t}</li>)}</ul>
</article>
<style>
  .card { border-top: 1px solid var(--color-border); padding-block: var(--space-3); }
  .card h3 { margin: 0 0 var(--space-1); }
  .tech { list-style: none; display: flex; gap: var(--space-1); padding: 0; margin: 0; flex-wrap: wrap; color: var(--color-muted); font-size: 0.9rem; }
</style>
```

- [ ] **Step 5: Create `src/pages/projects/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import { sortByOrder } from '../../lib/projects';

const projects = sortByOrder(await getCollection('projects'));
---
<BaseLayout title="Projects — Jack Matte" description="Things I've built.">
  <h1>Projects</h1>
  {projects.map((project) => <ProjectCard project={project} />)}
</BaseLayout>
```

- [ ] **Step 6: Create `src/pages/projects/[id].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Prose from '../../components/Prose.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({ params: { id: project.id }, props: { project } }));
}

const { project } = Astro.props;
const { Content } = await render(project);
const { title, description, repo, demo, tech } = project.data;
---
<BaseLayout title={`${title} — Jack Matte`} description={description}>
  <h1>{title}</h1>
  <p>{description}</p>
  <ul class="tech">{tech.map((t) => <li>{t}</li>)}</ul>
  <p>
    {repo && <a href={repo}>Source</a>}
    {demo && <> · <a href={demo}>Live demo</a></>}
  </p>
  <Prose><Content /></Prose>
</BaseLayout>
<style>
  .tech { list-style: none; display: flex; gap: var(--space-1); padding: 0; margin: 0 0 var(--space-2); flex-wrap: wrap; color: var(--color-muted); }
</style>
```

- [ ] **Step 7: Run tests**

Run: `npm run test:e2e -- projects.spec.ts`
Expected: PASS.

- [ ] **Step 8: Verify build and type check**

Run: `npm run build && npm run check`
Expected: 0 errors; detail pages generated for each project id.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: projects index and detail pages"
```

---

### Task 6: Blog index and post pages

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[id].astro`
- Test: `tests/e2e/blog.spec.ts`

**Interfaces:**
- Consumes: `getCollection`, `render` from `astro:content`; `BaseLayout`; `Prose`.
- Produces: `/blog` list (non-draft posts, newest first) and `/blog/<id>` post pages.

- [ ] **Step 1: Write the failing test `tests/e2e/blog.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('blog index lists the placeholder post', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByRole('heading', { name: 'Writing', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Hello World' })).toBeVisible();
});

test('blog post renders its body', async ({ page }) => {
  await page.goto('/blog/hello-world');
  await expect(page.getByRole('heading', { name: 'Hello World', level: 1 })).toBeVisible();
  await expect(page.getByText('This is a placeholder post')).toBeVisible();
});
```

- [ ] **Step 2: Run it to confirm failure**

Run: `npm run test:e2e -- blog.spec.ts`
Expected: FAIL (routes 404).

- [ ] **Step 3: Create `src/pages/blog/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = (await getCollection('blog'))
  .filter((p) => !p.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const fmt = (d: Date) => d.toISOString().slice(0, 10);
---
<BaseLayout title="Writing — Jack Matte" description="Notes and posts.">
  <h1>Writing</h1>
  <ul class="posts">
    {posts.map((post) => (
      <li>
        <a href={`/blog/${post.id}`}>{post.data.title}</a>
        <time datetime={fmt(post.data.date)}>{fmt(post.data.date)}</time>
      </li>
    ))}
  </ul>
</BaseLayout>
<style>
  .posts { list-style: none; padding: 0; }
  .posts li { display: flex; justify-content: space-between; gap: var(--space-2); padding-block: var(--space-1); border-top: 1px solid var(--color-border); }
  time { color: var(--color-muted); }
</style>
```

- [ ] **Step 4: Create `src/pages/blog/[id].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Prose from '../../components/Prose.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({ params: { id: post.id }, props: { post } }));
}

const { post } = Astro.props;
const { Content } = await render(post);
const fmt = (d: Date) => d.toISOString().slice(0, 10);
---
<BaseLayout title={`${post.data.title} — Jack Matte`} description={post.data.description}>
  <h1>{post.data.title}</h1>
  <p><time datetime={fmt(post.data.date)}>{fmt(post.data.date)}</time></p>
  <Prose><Content /></Prose>
</BaseLayout>
```

- [ ] **Step 5: Run tests**

Run: `npm run test:e2e -- blog.spec.ts`
Expected: PASS.

- [ ] **Step 6: Verify build and type check**

Run: `npm run build && npm run check`
Expected: 0 errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: blog index and post pages"
```

---

### Task 7: Home page, About page, and 404

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/404.astro`
- Test: `tests/e2e/home-about.spec.ts`

**Interfaces:**
- Consumes: `getCollection` from `astro:content`; `getFeatured` from `src/lib/projects.ts`; `BaseLayout`, `ProjectCard`, `SocialLinks`.
- Produces: finished home (intro + social + featured projects), about page, styled 404.

- [ ] **Step 1: Write the failing test `tests/e2e/home-about.spec.ts`**

```ts
import { test, expect } from '@playwright/test';

test('home shows intro and only featured projects', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Jack Matte');
  await expect(page.getByRole('link', { name: 'Example Project Alpha' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Example Project Beta' })).toHaveCount(0);
});

test('about page renders', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { name: 'About', level: 1 })).toBeVisible();
});
```

- [ ] **Step 2: Run it to confirm failure**

Run: `npm run test:e2e -- home-about.spec.ts`
Expected: FAIL (home shows no projects yet; `/about` 404s).

- [ ] **Step 3: Rewrite `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/ProjectCard.astro';
import SocialLinks from '../components/SocialLinks.astro';
import { getFeatured } from '../lib/projects';

const featured = getFeatured(await getCollection('projects'));
---
<BaseLayout title="Jack Matte">
  <h1>Jack Matte</h1>
  <p class="lede">Software engineer. I build clean, practical web software.</p>
  <SocialLinks />

  <section aria-labelledby="featured">
    <h2 id="featured">Featured projects</h2>
    {featured.map((project) => <ProjectCard project={project} />)}
    <p><a href="/projects">All projects &rarr;</a></p>
  </section>
</BaseLayout>
<style>
  .lede { font-size: 1.25rem; color: var(--color-muted); }
  section { margin-top: var(--space-4); }
</style>
```

- [ ] **Step 4: Create `src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import SocialLinks from '../components/SocialLinks.astro';
---
<BaseLayout title="About — Jack Matte" description="About Jack Matte.">
  <h1>About</h1>
  <p>Placeholder bio. Replace with a longer narrative: background, what you work on, and what you care about building.</p>
  <SocialLinks />
</BaseLayout>
```

- [ ] **Step 5: Create `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Not found — Jack Matte" description="Page not found.">
  <h1>404</h1>
  <p>That page doesn't exist. <a href="/">Head home</a>.</p>
</BaseLayout>
```

- [ ] **Step 6: Run the full test suite**

Run: `npm run test && npm run test:e2e`
Expected: all unit and e2e specs PASS.

- [ ] **Step 7: Verify build and type check**

Run: `npm run build && npm run check`
Expected: 0 errors.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: home with featured projects, about page, and 404"
```

---

### Task 8: README, screenshot, and GitHub Pages deploy

**Files:**
- Create: `README.md`
- Create: `docs/screenshot.png`
- Create: `.github/workflows/deploy.yml`
- Create: `public/CNAME`

**Interfaces:**
- Consumes: the built site and running dev server.
- Produces: graded documentation, a screenshot, and an automated Pages deploy.

- [ ] **Step 1: Capture a screenshot via a throwaway Playwright command**

Create `tests/e2e/_screenshot.spec.ts`:

```ts
import { test } from '@playwright/test';

test('capture home screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 900 });
  await page.goto('/');
  await page.screenshot({ path: 'docs/screenshot.png', fullPage: true });
});
```

Run: `npm run test:e2e -- _screenshot.spec.ts`
Expected: `docs/screenshot.png` created. Then delete the throwaway spec:
```bash
rm tests/e2e/_screenshot.spec.ts
```

- [ ] **Step 2: Write `README.md`**

````markdown
# Jack Matte — Personal Website

![Screenshot of the home page](docs/screenshot.png)

My personal website: a place to introduce myself, show what I've built, and
share the occasional post. It's intentionally simple and fast.

## For non-technical readers

This is a small website about me and my work. If you open the folder and want
to see it on your own computer, the "Run locally" steps below do that. You
don't need to change any code to look around — the pages are under `src/pages`
and the writeups are plain text files under `src/content`.

## Why I built this

I wanted a single, durable home on the web that I control — somewhere to point
people, showcase projects with real writeups, and grow a writing section over
time. It's also a deliberately clean build: no heavy framework, fast to load,
and easy to maintain. The code doubles as a small demonstration of how I like
to build things.

## Tech

- [Astro](https://astro.build) — static site, ships zero JavaScript by default
- TypeScript, content collections (Markdown) with typed schemas
- Plain scoped CSS with design tokens (no CSS framework)
- Vitest (unit) + Playwright (page smoke tests)

## Run locally

Prerequisites: [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install          # install dependencies
npm run dev          # start the dev server at http://localhost:4321
npm run build        # build the production site into dist/
npm run preview      # preview the production build locally
```

Quality checks:

```bash
npm run check        # type + content diagnostics (astro check)
npm run test         # unit tests (Vitest)
npm run test:e2e     # page smoke tests (Playwright)
```

## Project structure

- `src/pages` — routes (home, projects, about, blog, 404)
- `src/content` — project and blog Markdown + schemas (`src/content.config.ts`)
- `src/components`, `src/layouts` — UI building blocks
- `src/lib` — small tested helpers

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml`. The custom domain is configured in
`public/CNAME`. In the repo's **Settings → Pages**, set the source to
**GitHub Actions**.
````

- [ ] **Step 3: Create `public/CNAME`**

```
jackmatte.me
```

> Note: this only takes effect once the domain is registered and its DNS points at GitHub Pages. It is harmless before then.

- [ ] **Step 4: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
        with:
          node-version: 20
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 5: Final full verification**

Run:
```bash
npm run check && npm run test && npm run build && npm run test:e2e
```
Expected: all pass; `dist/` contains `index.html`, `projects/`, `blog/`, `about/index.html`, `404.html`, `sitemap-index.xml`, and `CNAME`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "docs: add README, screenshot, and GitHub Pages deploy workflow"
```

---

## Notes for the executor

- The site name is **Jack Matte** and domain **jackmatte.me** throughout. Social URLs and the bio/about copy are placeholders to be replaced with real content later — leave them clearly generic, do not invent real personal details.
- Do **not** run HawkScan/DAST — static site, no backend.
- After completion: publish the repo to GitHub, and in **Settings → Pages** set the build source to **GitHub Actions**. Registering `jackmatte.me` and pointing DNS at Pages is a separate one-time step.

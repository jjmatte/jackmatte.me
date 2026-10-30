---
title: "This Website"
description: "The portfolio site you're reading right now, a fast, static, minimal-JavaScript site built from scratch and deployed on a custom domain."
tech: ["Astro 5", "TypeScript", "Zod", "Vitest", "Playwright", "GitHub Pages"]
repo: "https://github.com/jjmatte/jackmatte.me"
demo: "https://jackmatte.me"
featured: true
order: 2
---

## Why I built this

I wanted a portfolio I owned end to end: no site builder, no template, no
tracking. I also wanted a small project where I could make every decision myself,
from the content model to the deploy pipeline. It doubles as a working example of the
kind of site I like to build: fast, accessible, and simple enough to maintain for
years.

## What it does

It presents who I am and what I've built: a home page with a featured list and an
interactive timeline, a projects section with a detail page per project, and a
blog. Content is authored in plain Markdown and JSON, so adding a post or a
project is a single file. No CMS, no database, no build-time surprises.

## How it's built

Astro 5 renders everything to static HTML and ships almost no client-side
JavaScript. A few small progressive-enhancement scripts power the interactive
touches, like the timeline, the copy-to-clipboard button, and a cursor-following
dial. Content lives in typed Zod
content collections, so a malformed project or post fails the build instead of
shipping. Styling is scoped CSS with design tokens and a light/dark theme, no UI
framework. Unit tests run in Vitest and end-to-end flows in Playwright; CI builds
and tests on every push, then a second workflow deploys to GitHub Pages behind a
Cloudflare-proxied custom domain.

## My role

Solo project. I designed it, wrote every line, set up the content model and the
tests, and own the hosting and DNS.

> You're looking at it. This very site is the project, and the full source is
> [on GitHub](https://github.com/jjmatte/jackmatte.me).

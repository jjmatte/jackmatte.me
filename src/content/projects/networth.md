---
title: "Net Worth Tracker"
description: "A self-hosted personal finance app for tracking net worth, investments, and progress toward financial independence, built so my own financial data never leaves my own machine."
tech: ["SvelteKit", "Svelte 5", "TypeScript", "Drizzle ORM", "SQLite", "Tailwind CSS", "Chart.js"]
repo: "https://github.com/jjmatte/personal-networth-app"
screenshot: "/screenshots/networth.png"
featured: true
order: 1
---

## Why I built this

I wanted one place to see my whole financial picture without handing my
account details to a third-party aggregator. Everything runs locally and the
data never leaves the machine it's on. It's also a passion project, a chance to
build something I actually use and to work in a different stack than my day job.

## What it does

Point-in-time net-worth snapshots charted over time, an investment portfolio
with cost basis and gains, and allocation measured against target weights.
There's a financial-independence section with milestones and income tracking, a
purchases log, and per-holding history. The dashboard pulls it together into a
single overview: net worth, investments, the trend line, and allocation at a
glance.

## How it's built

SvelteKit 2 on Svelte 5 with its new runes, written in TypeScript. Data lives in
SQLite through Drizzle ORM (better-sqlite3), accessed only on the server via load
functions and form actions, with Zod validating every write. The interface is
Tailwind CSS 4 using its CSS-first theming, and the charts are Chart.js. Pure
financial math is isolated in its own module and unit-tested with Vitest;
end-to-end flows are covered with Playwright.

## My role

Solo project. I designed, built, and tested all of it: the schema and data
layer, the server actions, the finance calculations, and the interface.

> The screenshot above uses fictional demo data, not real account values.

---
title: "Lots"
description: "A production platform that replaced a legacy Microsoft Access database, giving a homebuilder's teams one place to manage lot data, documents, and approvals."
tech: ["React 19", "TypeScript", "Vite", "TanStack Query", "Prisma", "Azure SQL"]
featured: true
order: 0
---

## Why I built this

Bloomfield Homes ran years of lot and community data out of a Microsoft Access
database that had outgrown itself. Lots is the web application that replaced it —
a single hub where sales, construction, and purchasing work from the same source
of truth instead of a fragile shared file.

## What it does

Centralized, filterable data grids over thousands of lots; document storage tied
to each lot; multi-step approval workflows that route requests to the right roles;
and reporting dashboards. Updates propagate in real time so everyone sees the same
state.

## How it's built

React 19 and TypeScript on Vite, with Fluent UI and Tailwind for the interface.
TanStack Query manages server state and TanStack Table (virtualized) renders large
datasets smoothly; Zustand holds UI state. Forms use React Hook Form with Zod
validation. The API layer mixes GraphQL and REST, with live updates over
WebSockets, backed by Prisma against Azure SQL.

## My role

I build features across the front end and API — data grids, forms, workflows, and
the integrations that keep everything in sync.

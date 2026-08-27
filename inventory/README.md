# inventory/

A private, working catalogue of every project that might belong in the
portfolio — before any decision about what to publish or how to model it.

## Why this exists

Per `docs/` and the project plan: the domain model in `packages/data` should be
designed **against real historical and current work**, not invented in the
abstract. This directory is where that raw material lives while it's being
gathered.

## Privacy

Everything in `inventory/` is git-ignored **except** `README.md` and
`TEMPLATE.md` (see `.gitignore`). Client names, unpublished URLs, NDA-covered
work, and rough notes never get committed. Nothing here is published until it's
been deliberately promoted into `packages/content` in a form that's been checked
for what's appropriate to share.

## How to use it

1. Copy the template to a working file (git-ignored):
   `cp inventory/TEMPLATE.md inventory/projects.md`
2. Do a broad brain-dump first — one entry per project, no polished prose.
   Current work, past professional work, client work, personal projects,
   open source, experiments, sites that no longer exist.
3. For each, note the **evidence** available: GitHub, live URL, Wayback
   captures, local screenshots/files, or nothing.
4. Flag what's **publishable** vs. NDA/private vs. needs-permission.

This inventory then drives, in order: the `packages/archive` tooling (built
around the sites that actually need Wayback recovery), the `packages/data`
schema (shaped to fit what the real entries require), and finally the content
in `packages/content`.

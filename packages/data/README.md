# @portfolio/data

Domain models and validation schemas for portfolio content. Presentation- and
storage-agnostic; no React, no database. Consumed by `@portfolio/content` (to
validate authored content) and, later, by `apps/web`.

> **Provisional.** This model is a first draft from the project plan's
> illustrative shapes. It will be reworked against the real work inventory
> (`inventory/projects.md`) in Phase 3.

## Model

| Schema             | Purpose                                                                     |
| ------------------ | --------------------------------------------------------------------------- |
| `ProjectSchema`    | A portfolio project: identity, timeline, role, tech, links, media           |
| `CaseStudySchema`  | Optional long-form writeup; only `summary` is required                      |
| `EvidenceSchema`   | Discriminated union: `wayback` / `source` / `link` / `artifact` / `account` |
| `TechnologySchema` | A technology tagged with claim confidence                                   |

Every factual claim carries a **confidence** — `confirmed`, `inferred`, or
`recollection` — so historical projects never overstate what is actually known.

## Usage

```ts
import { parseProject, ProjectSchema } from '@portfolio/data';

const project = parseProject(raw); // throws on invalid input
```

Schemas are [valibot](https://valibot.dev); types are inferred from them
(`v.InferOutput`) so there is a single source of truth.

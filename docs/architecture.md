# Architecture

Status: provisional. This describes package boundaries and the allowed
dependency direction. It will be revised once the domain model (`data`) and the
work inventory exist — see "Open questions" below.

## Principle

Each package owns one concern. Dependencies flow one direction only. A package's
**non**-responsibilities matter as much as its responsibilities: they are what
keeps `data` from becoming a dumping ground and `ui` from becoming
portfolio-specific.

## Dependency direction

```text
content ──▶ data ◀── archive
                │
                ▼
         (future) apps/web ◀── ui
```

Allowed internal edges:

| Package   | May import         | May not import               |
| --------- | ------------------ | ---------------------------- |
| `data`    | (nothing internal) | `content`, `ui`, `archive`   |
| `content` | `data`             | `ui`, `archive`              |
| `archive` | `data`             | `content`, `ui`              |
| `ui`      | (nothing internal) | `data`, `content`, `archive` |

A future `apps/web` sits at the bottom of the graph and may import anything.

This is enforced by ESLint (`no-restricted-imports` on `@portfolio/*`
specifiers, per package directory — see [`configs/boundaries.ts`](../configs/boundaries.ts)).
The rule is specifier-based rather than path-based (`import-x/no-restricted-paths`)
because that needs working package `exports` resolution, which the packages do
not have yet. Swap to path-based zones once they do.

## Package responsibilities

### `data`

**Owns:** the domain model — types, and validation schemas for portfolio
entities (Project, its timeline, role, technologies, links, media, evidence,
etc.). Presentation-agnostic and storage-agnostic.

**Does not own:** any actual content or project data; any rendering, formatting,
or React; any knowledge of the Wayback Machine or how evidence is gathered (it
defines the _shape_ of an evidence record, not the process that produces one);
any database or persistence layer.

### `content`

**Owns:** the authored portfolio content itself (projects, case studies,
writing, profile, experience, capabilities), stored as structured data +
long-form prose, validated against `data`'s schemas at build/test time.

**Does not own:** the schemas it validates against (those are `data`'s); any
rendering of the content; any tooling that _generates_ content (e.g. archive
research output lands here as data, but the archive tool lives in `archive`).

### `archive`

**Owns:** Node/TypeScript tooling for researching historical websites —
Wayback/CDX capture discovery, archived-page retrieval, metadata and evidence
extraction. Likely exposes a CLI (`archive discover <domain>`).

**Does not own:** where its output is stored or how it's presented; the
definition of an evidence record (that's `data`); anything portfolio-content
specific beyond producing evidence records `content` can adopt.

### `ui`

**Owns:** presentation primitives and design-system infrastructure — generic,
reusable, portfolio-agnostic. Tokens, layout primitives, unstyled/low-level
components.

**Does not own:** any domain knowledge (it must not import `data`); any content;
any page or route; the existing external React component library, which stays a
separate published package and is not vendored here. Components that need to
know what a "Project" is are composition concerns for `apps/web`, not `ui`.

## Open questions

- **`ui` ↔ `data`:** currently disallowed, to keep `ui` reusable. If it turns
  out most `ui` components are inherently portfolio-shaped, either relax this
  edge or split a portfolio-specific `ui` layer from the generic primitives.
- **`archive` → `data`:** allowed on the assumption evidence-record types live
  in `data`. If `archive` grows its own rich internal types that `data` doesn't
  need, reconsider whether it should depend on `data` at all.
- **`apps/` workspace:** not created yet; `pnpm-workspace.yaml` only globs
  `packages/*`. Add `apps/*` when the frontend framework is chosen.

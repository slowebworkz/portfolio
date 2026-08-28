# Architecture

This describes package boundaries and the allowed dependency direction.
`data`, `content`, and `apps/web` are now real; `ui` and `archive` are still
placeholders. See "Open questions" for what is still unsettled.

## Principle

Each package owns one concern. Dependencies flow one direction only. A package's
**non**-responsibilities matter as much as its responsibilities: they are what
keeps `data` from becoming a dumping ground and `ui` from becoming
portfolio-specific.

## Dependency direction

```text
content ──▶ data ◀── archive
   │            ▲
   └──▶ apps/web ◀── ui
```

`apps/web` imports `content` and `data` today; it will import `ui` once `ui`
exists.

Allowed internal edges:

| Package   | May import         | May not import               |
| --------- | ------------------ | ---------------------------- |
| `data`    | (nothing internal) | `content`, `ui`, `archive`   |
| `content` | `data`             | `ui`, `archive`              |
| `archive` | `data`             | `content`, `ui`              |
| `ui`      | (nothing internal) | `data`, `content`, `archive` |

`apps/web` sits at the bottom of the graph and may import anything.

This is enforced by ESLint (`no-restricted-imports` on `@portfolio/*`
specifiers, per package directory — see [`configs/boundaries.ts`](../configs/boundaries.ts)).
The rule is specifier-based rather than path-based (`import-x/no-restricted-paths`);
path-based zones can wait until there's a reason to switch.

## Package responsibilities

### `data`

**Owns:** the domain model — types and valibot validation schemas for portfolio
entities (Project, period, role, technologies, contributions, site lineage,
package metadata, evidence, case study, publishability). Presentation-agnostic
and storage-agnostic. See [`packages/data/README.md`](../packages/data/README.md).

**Does not own:** any actual content or project data; any rendering, formatting,
or React; any knowledge of the Wayback Machine or how evidence is gathered (it
defines the _shape_ of an evidence record, not the process that produces one);
any database or persistence layer.

### `content`

**Owns:** the authored portfolio content itself (projects, and later case
studies, writing, profile), as plain typed modules validated against `data`'s
schemas at module load and in tests. No MDX / content framework yet. Content the
inventory marks `private` never lands here.

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
- **Content format:** currently plain typed TS modules. `project.yaml` +
  `case-study.mdx` remains an option if authoring ergonomics or embedded
  components justify the toolchain.
- **`ui`:** still a placeholder. `praxis-kit` (the author's published framework)
  is in the catalog as the likely foundation; `ui` would wrap it into
  portfolio-specific primitives, or `apps/web` may consume `praxis-kit` directly.

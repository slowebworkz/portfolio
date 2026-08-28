# @portfolio/data

Domain model and validation schemas for portfolio content. Presentation- and
storage-agnostic; no React, no database. Consumed by `@portfolio/content` (to
validate authored content) and by `apps/web`.

Designed against the real work inventory: two site redesigns whose only evidence
is the Internet Archive (McMillan, AP Logic), and one published package
(Praxis Kit).

## Model

| Schema               | Purpose                                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ProjectSchema`      | A portfolio project (see fields below)                                                                                                                      |
| `EvidenceSchema`     | Discriminated union: `wayback` / `source` / `package` / `link` / `artifact` / `account`, each with a `role` (`before` / `after` / `context` / `supporting`) |
| `LineageStageSchema` | One stage in a site's history, flagged `mine: true/false`                                                                                                   |
| `PackageInfoSchema`  | npm/registry metadata for projects that are published packages                                                                                              |
| `CaseStudySchema`    | Optional long-form writeup; only `summary` required                                                                                                         |
| `ProfileSchema`      | The person — name, tagline, bio, links, credentials                                                                                                         |
| `ExperienceSchema`   | A résumé-style role (full-time / contract / independent), `named` true/false, optional `relatedProject`                                                     |

Key `Project` fields: `slug`, `title`, `summary`, `category`
(`employment` / `contract` / `open-source` / `personal` / `experiment`),
`status` (`active` / `live` / `gone` / `archived` / `private`), `period`
(`start` / `end` / `approximate` / `note`), `role`, `organization`,
`motivation`, `technologies`, `contributions` (`did` / `didNot`), `lineage`,
`package`, `links`, `evidence`, `retainedArtifacts`, `caveats`,
`publishability` (`status` + `notes`), `caseStudy`, `featured`.

### Honesty is structural

- Every technology and every evidence item carries a **confidence** —
  `confirmed`, `inferred`, or `recollection`.
- `contributions.didNot` records what the owner explicitly did _not_ do.
- `lineage[].mine` separates the owner's work from what came before.
- `caveats` holds the places where evidence and memory diverge.

## Usage

```ts
import { parseProject, parseProfile, parseExperience } from '@portfolio/data';

const project = parseProject(raw); // throws on invalid input or broken references
```

`parseProject` runs the valibot schema **and** cross-field checks
(`checkReferentialIntegrity`): unique evidence ids, and every
`lineage[].evidenceId` resolving to a real evidence item. `parseProfile` /
`parseExperience` are schema-only.

Schemas are [valibot](https://valibot.dev); types are inferred from them
(`v.InferOutput`) so there is a single source of truth. The package exports
`./src` directly (internal package, no build step).

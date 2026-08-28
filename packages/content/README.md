# @portfolio/content

The authored portfolio content — projects and (eventually) case studies,
writing, and profile. Validated against `@portfolio/data` at module load and in
tests. Framework-neutral: plain typed modules, no MDX or content framework yet.

## Layout

```text
src/
  projects/
    <slug>.ts        one project each; exports a validated `Project`
    index.ts         `projects`, `getProject(slug)`, `getFeaturedProjects()`
  index.ts           public surface
```

Each project file:

```ts
import { parseProject, type Project } from '@portfolio/data';

export const example: Project = parseProject({/* ... */});
```

`parseProject` throws at import time if the data is invalid or a reference is
broken, so a bad edit fails `typecheck` / `test`, not production.

## Current entries

| Slug                             | What                                         | Evidence          |
| -------------------------------- | -------------------------------------------- | ----------------- |
| `praxis-kit`                     | The author's contract-based UI framework     | public repo + npm |
| `mcmillan-study-guides-redesign` | Front-end modernization of a live storefront | Internet Archive  |
| `ap-logic-redesign`              | 3-month contract, custom WordPress theme     | Internet Archive  |

Case studies are `null` for now — the structured metadata is in place; the
long-form writing is a separate pass.

## Not here

No content that the inventory marks `private` (e.g. NDA-bound client work).
`getProject` / the app also filter `publishability.status === 'private'` as a
backstop.

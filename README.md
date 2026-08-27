# portfolio

Monorepo for a personal portfolio: its content, the domain model behind that
content, supporting research tooling, and shared presentation primitives.

## Status

Early scaffolding. The repository currently contains only workspace structure and
shared tooling configuration (TypeScript, ESLint, Prettier, Vitest, CI). No
portfolio content, domain models, tooling implementations, UI, or frontend
application exist yet.

## Structure

```text
packages/
  content/   Structured portfolio content (projects, case studies, writing,
             profile/about, experience, capabilities). No content authored yet.
  data/      Shared domain models, types, and validation schemas. Presentation-
             agnostic. No database.
  archive/   Node/TypeScript tooling for researching historical websites,
             primarily the Internet Archive Wayback Machine / CDX API (capture
             discovery, archived-page retrieval, metadata extraction, evidence
             tracking). Not implemented yet.
  ui/        Shared presentation primitives and design-system infrastructure.
             No design system built yet. An existing external React component
             library remains a separate package and is not vendored here.
configs/     ESLint config split into composable modules (base, typescript),
             assembled by the root `eslint.config.ts`.
scripts/     Repository-level development and maintenance scripts. Empty for now.
```

Every package currently holds only a placeholder `src/index.ts` (`export {}`) so
that `tsc --build` has an input; no real code is authored yet.

## Tooling

- **Package manager:** pnpm workspaces. Chosen for fast, disk-efficient installs,
  a strict non-flat `node_modules`, and first-class workspace support without an
  additional build-orchestration layer.
- **Node.js:** current LTS (24.x), pinned in `.nvmrc`; `packageManager` in the
  root `package.json` pins the pnpm version.
- **Modules:** ESM throughout (`"type": "module"`, `NodeNext` resolution).
- **TypeScript:** a single strict root `tsconfig.json` holds the shared compiler
  options (`composite` enabled); each package has a small `tsconfig.json` that
  extends it and sets only `rootDir` / `outDir` / `include`. Each package's
  `typecheck` script runs `tsc --build`; `pnpm typecheck` fans out across them.
- **Lint / format:** ESLint (typed flat config — `eslint.config.ts` assembles the
  modules under `configs/`, with type-aware `typescript-eslint` rules) and
  Prettier.
- **Tests:** Vitest at the repo root; packages add suites under `src/` as needed.

### Commands

```sh
pnpm install          # install (use --frozen-lockfile in CI)
pnpm lint
pnpm format           # check; `pnpm format:write` to apply
pnpm typecheck        # runs each package's typecheck script if present
pnpm test
```

## CI

`.github/workflows/ci.yml` checks out the repo, enables pnpm, sets up Node from
`.nvmrc`, installs with the frozen lockfile, and runs lint, format check,
typecheck, and tests. It is written to stay useful as packages are added: the
aggregate scripts fan out across the workspace.

## No frontend framework yet

There is intentionally no Next.js / Astro / Vite app at this stage. The current
focus is the content model and supporting packages; the delivery framework will
be chosen later, once those are further along.

## Why not Turborepo (yet)

pnpm workspaces alone cover current needs. With no build graph, no cross-package
compilation, and no app to serve, a task runner like Turborepo would add caching
and pipeline configuration with nothing yet to cache or pipeline. It can be
adopted later if build times or task orchestration justify it.

## Direction

- Define the domain model in `data` and author content against it in `content`.
- Build out `archive` as Wayback/CDX research tooling.
- Choose and add a frontend framework that consumes `content` and `data`.
- Introduce `ui` primitives (and possibly the external component library) when
  there is a frontend to use them.
- Revisit build orchestration if and when the workspace warrants it.

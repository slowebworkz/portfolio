# portfolio

Monorepo for a personal portfolio: its content, the domain model behind that
content, supporting research tooling, and shared presentation primitives.

## Status

Early scaffolding. The repository currently contains workspace structure, shared
tooling configuration (TypeScript, ESLint, Prettier, Vitest, CI), and documented
and lint-enforced package boundaries. No portfolio content, domain models,
tooling implementations, UI, or frontend application exist yet.

The repository is private for now. It will be made public once it contains
meaningful work and has been reviewed for client-sensitive or confidential
material.

## Structure

```text
apps/
  web/       The portfolio site: React + Vite + TypeScript. Routing, layout,
             and an accessibility baseline, rendering real content from
             @portfolio/content (see "Frontend" below).
packages/
  content/   The authored portfolio content — projects now, case studies /
             writing / profile later. Plain typed modules validated against
             @portfolio/data. Three projects authored.
  data/      Domain model and valibot validation schemas. Presentation- and
             storage-agnostic. Designed against the real work inventory.
  archive/   Node/TypeScript tooling for researching historical websites,
             primarily the Internet Archive Wayback Machine / CDX API (capture
             discovery, archived-page retrieval, metadata extraction, evidence
             tracking). Not implemented yet.
  ui/        Shared presentation primitives and design-system infrastructure.
             Not built yet; likely built on `praxis-kit` (the author's
             published framework, in the dependency catalog).
configs/     ESLint config split into composable modules (base, typescript),
             assembled by the root `eslint.config.ts`.
docs/        Repository documentation. `architecture.md` defines what each
             package owns and the allowed dependency direction.
inventory/   Private catalogue of candidate portfolio work, used to design the
             domain model against real projects. Only README/TEMPLATE are
             tracked; the filled-in inventory stays local (git-ignored).
scripts/     Repository-level development and maintenance scripts. Empty for now.
```

`archive` and `ui` still hold only a placeholder `src/index.ts`; `data`,
`content`, and `apps/web` are real.

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
- **Package boundaries:** each package's allowed dependencies are documented in
  [`docs/architecture.md`](docs/architecture.md) and enforced by ESLint
  (`no-restricted-imports` on `@portfolio/*` specifiers, per package).

### Commands

```sh
pnpm install          # install (use --frozen-lockfile in CI)
pnpm lint
pnpm format           # check; `pnpm format:write` to apply
pnpm typecheck        # runs each package's typecheck script if present
pnpm test
pnpm build            # runs each package's build script if present
pnpm dev              # run the site locally (Vite dev server)
pnpm preview          # serve the production build
```

## CI

`.github/workflows/ci.yml` checks out the repo, enables pnpm, sets up Node from
`.nvmrc`, installs with the frozen lockfile, and runs lint, format check,
typecheck, tests, and build. It is written to stay useful as packages are
added: the aggregate scripts fan out across the workspace. A deployment step
will be added once the site is ready to publish.

## Frontend

The delivery app (`apps/web`) is **React + Vite + TypeScript**: `react-router`
routing, a base layout, and an accessibility baseline (skip link, landmarks,
focus styles, reduced-motion and colour-scheme support), rendering the real
projects from `@portfolio/content` — a work list and per-project pages showing
the site lineage, what was and wasn't the author's work, evidence links, and
caveats. The portfolio is a content-driven, static-first site: the priority is
prerendering,
performance, semantic HTML, accessibility, straightforward deployment, and
minimal runtime complexity — and Vite is also a natural home for the existing
React component library.

Prerendering / static generation is not wired up yet; it comes with the first
real project (Phase 4 of the plan).

Next.js / SSR / server functions are deliberately deferred until a concrete
requirement calls for them. `content` and `data` stay framework-neutral, so a
different frontend could consume them later without rework.

## Why not Turborepo (yet)

pnpm workspaces alone cover current needs. With no build graph, no cross-package
compilation, and no app to serve, a task runner like Turborepo would add caching
and pipeline configuration with nothing yet to cache or pipeline. It can be
adopted later if build times or task orchestration justify it.

## Direction

1. Compile a private inventory of past and current work (`inventory/`). _Ongoing._
2. Design the domain model in `data` against that inventory and author the
   projects in `content`. _Done for the first three projects; case studies and
   more entries still to come._
3. Build `apps/web` (React + Vite) consuming `content` and `data`. _In
   progress — work list and project pages render; prerendering and design-system
   integration still to do._
4. Take one strong project all the way through — long-form case study, page,
   tests, deployment — to validate the architecture.
5. Build out `archive` as Wayback/CDX research tooling and fold validated
   historical evidence into the content.
6. Expand: more case studies, writing, technical demos; revisit hosting
   (GitHub Pages vs Vercel), build orchestration, and framework experiments.

Guiding principle: start simple, add complexity when the system earns it.
Projects are presented as engineering stories with evidence, not technology
lists.

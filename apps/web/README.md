# @portfolio/web

The portfolio site. React + Vite + TypeScript, consuming `@portfolio/content`.

## Scripts

| Command                                  | Does                                             |
| ---------------------------------------- | ------------------------------------------------ |
| `pnpm dev` (repo root)                   | Vite dev server                                  |
| `pnpm --filter @portfolio/web build`     | client build + SSR build + prerender every route |
| `pnpm --filter @portfolio/web build:spa` | client build only, no prerender                  |
| `pnpm preview` (repo root)               | serve the built `dist/`                          |
| `pnpm --filter @portfolio/web typecheck` | `tsc --noEmit`                                   |

## Build / prerender

`build` runs three steps:

1. `vite build` — the client bundle → `dist/`
2. `vite build --ssr src/entry-server.tsx --outDir dist-server` — a Node-loadable
   render function (`render(pathname)` + `routePaths`)
3. `node scripts/prerender.mjs` — for each route, render to HTML, inject into the
   `dist/index.html` shell, write `dist/<route>/index.html`; also write
   `404.html` as the SPA fallback

Prerendered pages carry the full markup and hydrate on load
([`src/main.tsx`](src/main.tsx) picks `hydrateRoot` vs `createRoot`).

## Base path

`SITE_BASE` sets the public base (default `/`). For a GitHub Pages **project**
site, the deploy workflow passes `/portfolio/`; assets and router basename
follow. Use a custom domain (or a `<user>.github.io` repo) to keep it at `/`.

## Routing

[`src/routes.tsx`](src/routes.tsx) is the shared route table — imported by the
browser router ([`src/router.tsx`](src/router.tsx)), the tests, and the
prerender entry ([`src/entry-server.tsx`](src/entry-server.tsx)).

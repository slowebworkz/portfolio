# scripts

Repository-level development and maintenance scripts.

- **`kill-dev-server.mjs`** — stop whatever is listening on the Vite dev-server
  port (default `5173`; override with an argument or `VITE_PORT`). Exposed as
  `pnpm dev:kill` and used by the "Vite: Kill" / "Vite: Restart" editor tasks.

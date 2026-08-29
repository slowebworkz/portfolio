# @portfolio/archive

Node/TypeScript tooling for researching historical websites through the Internet
Archive Wayback Machine. Used to firm up evidence for the two redesign projects
whose only public record is the archive (McMillan, AP Logic).

**The archive is evidence, not a licence to republish.** These tools locate and
retrieve captures for analysis; the claims that end up in `@portfolio/content`
are written by hand and tagged for confidence.

## CLI

Run from the repo root:

```sh
# List captures for a site (writes .archive/<host>/captures.json + evidence-drafts.json)
pnpm archive discover ap-logic.com --from 2012 --to 2014 --mime text/html

# Download the raw HTML of each capture (.archive/<host>/captures/<timestamp>.html)
pnpm archive fetch ap-logic.com --delay-ms 1500
```

`discover` flags: `--from` / `--to` (`YYYY`, `YYYYMM`, `YYYYMMDD`), `--limit`,
`--match-type exact|prefix|host|domain` (default `prefix`), `--mime`,
`--all-status` (keep non-200 rows), `--no-collapse` (keep byte-identical
captures). `fetch` flags: `--limit`, `--delay-ms` (between requests, default
1500), `--force` (re-download).

Output goes to a git-ignored `.archive/` directory.

## Library

`discover(url, options)` → `Capture[]`, `fetchCapture(timestamp, url)` → HTML
string, `toEvidenceDraft(capture)` → a `WaybackEvidence` draft (`@portfolio/data`
shape, `confidence: 'inferred'`, placeholder `id`/`label` to edit before use).

## Boundary

`archive → data` only. No dependency on `content`, `ui`, or `apps/web`.

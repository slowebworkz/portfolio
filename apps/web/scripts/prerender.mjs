import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const webRoot = dirname(fileURLToPath(new URL('.', import.meta.url)));
const clientDir = join(webRoot, 'dist');
const serverEntry = join(webRoot, 'dist-server', 'entry-server.js');
const base = process.env.SITE_BASE ?? '/';
/** Absolute origin (no trailing slash) for canonical / og:url. Optional. */
const origin = (process.env.SITE_ORIGIN ?? '').replace(/\/$/u, '');

const template = await readFile(join(clientDir, 'index.html'), 'utf8');
const { render, routePaths, metaForPath, canonicalUrl } = await import(
  pathToFileURL(serverEntry).href
);

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}

const escapeHtml = (value) =>
  value
    .replace(/&/gu, '&amp;')
    .replace(/</gu, '&lt;')
    .replace(/>/gu, '&gt;')
    .replace(/"/gu, '&quot;');

/** Bake per-page title, description, and Open Graph tags into the shell. */
function applyHead(html, path, meta) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);

  const head = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta name="twitter:card" content="summary" />`,
  ];
  const url = canonicalUrl(path, origin, base);
  if (url) {
    head.push(`<link rel="canonical" href="${url}" />`);
    head.push(`<meta property="og:url" content="${url}" />`);
  }

  return html
    .replace(/<title>.*?<\/title>/u, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/u,
      `<meta name="description" content="${description}" />`,
    )
    .replace(/\s*<\/head>/u, `\n    ${head.join('\n    ')}\n  </head>`);
}

for (const path of routePaths) {
  const appHtml = await render(path);
  const page = applyHead(
    template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`),
    path,
    metaForPath(path),
  );

  const outFile =
    path === '/'
      ? join(clientDir, 'index.html')
      : join(clientDir, path.replace(/^\//u, ''), 'index.html');

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, page, 'utf8');
  console.log(`prerendered ${path} -> ${outFile.slice(clientDir.length + 1)}`);
}

// SPA fallback: any path the prerender step didn't emit still boots the app.
// GitHub Pages serves 404.html for unknown paths.
const notFoundPath = '/xyz-not-found';
const notFound = applyHead(
  template
    .replace('<div id="root"></div>', `<div id="root">${await render(notFoundPath)}</div>`)
    .replace('<html', `<html data-base="${base}"`),
  notFoundPath,
  metaForPath(notFoundPath),
);
await writeFile(join(clientDir, '404.html'), notFound, 'utf8');
console.log('wrote 404.html (SPA fallback)');

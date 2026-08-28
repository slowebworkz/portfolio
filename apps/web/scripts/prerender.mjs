import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const webRoot = dirname(fileURLToPath(new URL('.', import.meta.url)));
const clientDir = join(webRoot, 'dist');
const serverEntry = join(webRoot, 'dist-server', 'entry-server.js');
const base = process.env.SITE_BASE ?? '/';

const template = await readFile(join(clientDir, 'index.html'), 'utf8');
const { render, routePaths } = await import(pathToFileURL(serverEntry).href);

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in dist/index.html');
}

for (const path of routePaths) {
  const appHtml = await render(path);
  const page = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

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
const notFound = template
  .replace('<div id="root"></div>', `<div id="root">${await render('/xyz-not-found')}</div>`)
  .replace('<html', `<html data-base="${base}"`);
await writeFile(join(clientDir, '404.html'), notFound, 'utf8');
console.log('wrote 404.html (SPA fallback)');

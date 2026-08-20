#!/usr/bin/env node
/**
 * Renders every route to a real HTML file so the site is readable without
 * JavaScript.
 *
 * Why: this is a client-rendered SPA, so before this step every URL served the
 * same shell — identical title, and a canonical pointing at the homepage.
 * Google runs JS and eventually saw the right thing; Facebook, WhatsApp and
 * LinkedIn never did, so sharing any page showed the homepage's title and no
 * image. Prerendering gives each URL its own head and its own copy up front.
 *
 *   npm run build && node scripts/prerender.mjs
 *
 * Output: dist/<route>.html (and dist/index.html for "/"), which .htaccess
 * serves directly — see the RewriteCond for %{REQUEST_FILENAME}.html.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const PORT = 41999;

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain',
};

/** Routes come from the sitemap plus the slugs in the data files, so a page
 *  missing from one of them still gets rendered. */
async function collectRoutes() {
  const routes = new Set(['/']);
  const sitemap = await readFile(path.join(root, 'public', 'sitemap.xml'), 'utf8');
  for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) routes.add(new URL(loc).pathname);

  const areas = await readFile(path.join(root, 'src', 'lib', 'areas.ts'), 'utf8');
  for (const [, slug] of areas.matchAll(/slug: '([^']+)'/g)) routes.add(`/${slug}`);

  const services = await readFile(path.join(root, 'src', 'lib', 'services.ts'), 'utf8');
  for (const [, slug] of services.matchAll(/slug: '([^']+)'/g)) routes.add(`/services/${slug}`);

  for (const p of ['/about', '/our-work', '/contact', '/privacy']) routes.add(p);
  return [...routes].sort();
}

function serve() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const { pathname } = new URL(req.url, 'http://localhost');
      let file = path.join(dist, decodeURIComponent(pathname));
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      } catch {
        file = path.join(dist, 'index.html'); // SPA fallback, same as .htaccess
      }
      try {
        const body = await readFile(file);
        res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(404).end('not found');
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

/** One of each SEO tag, and the values have to belong to this page. */
function checkHead(html, route) {
  const problems = [];
  const count = (re) => (html.match(re) ?? []).length;
  const canonicals = count(/<link[^>]+rel="canonical"/g);
  if (canonicals !== 1) problems.push(`${canonicals} canonical tags`);
  const descriptions = count(/<meta[^>]+name="description"/g);
  if (descriptions !== 1) problems.push(`${descriptions} descriptions`);
  const ogUrls = count(/<meta[^>]+property="og:url"/g);
  if (ogUrls !== 1) problems.push(`${ogUrls} og:url tags`);
  if (count(/<title>/g) !== 1) problems.push('title is not unique');

  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] ?? '';
  const expected = `https://www.jw-gardening.com${route === '/' ? '/' : route}`;
  if (canonical !== expected) problems.push(`canonical is ${canonical || '(none)'}, expected ${expected}`);
  if (!/<h1/.test(html)) problems.push('no h1 in the rendered markup');
  return problems;
}

/**
 * Playwright wants the exact browser build it shipped with. Use whatever it
 * finds first; if that build is not installed, fall back to any Chromium
 * already on the machine (CHROMIUM_EXECUTABLE, then PLAYWRIGHT_BROWSERS_PATH)
 * rather than downloading one.
 */
async function launchBrowser() {
  try {
    return await chromium.launch();
  } catch (err) {
    const explicit = process.env.CHROMIUM_EXECUTABLE;
    if (explicit) return chromium.launch({ executablePath: explicit });

    const store = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
    const candidates = [];
    for (const entry of await readdir(store).catch(() => [])) {
      if (!entry.startsWith('chromium')) continue;
      for (const rel of ['chrome-linux/chrome', 'chrome-linux/headless_shell']) {
        const candidate = path.join(store, entry, rel);
        if (await stat(candidate).then(() => true, () => false)) candidates.push(candidate);
      }
    }
    if (!candidates.length) throw err;
    console.log(`using ${candidates[0]}`);
    return chromium.launch({ executablePath: candidates[0] });
  }
}

const server = await serve();
const browser = await launchBrowser();
const page = await browser.newPage();
const routes = await collectRoutes();
let failures = 0;

for (const route of routes) {
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('h1', { timeout: 15000 });
  // The hero <video> is chosen on the client from screen size and codec support,
  // so leaving the captured one in the static markup makes a phone fetch the
  // desktop file before React swaps it. The poster image stays; the video is
  // added after load either way.
  const html = ('<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML)))
    .replace(/<video[\s\S]*?<\/video>/g, '');

  const problems = checkHead(html, route);
  if (problems.length) {
    failures++;
    console.error(`✗ ${route}\n    ${problems.join('\n    ')}`);
  }

  const target = route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  console.log(`${problems.length ? '✗' : '✓'} ${route.padEnd(42)} ${title.slice(0, 52)}`);
}

await browser.close();
server.close();

console.log(`\n${routes.length} routes prerendered, ${failures} with problems`);
process.exit(failures ? 1 : 0);

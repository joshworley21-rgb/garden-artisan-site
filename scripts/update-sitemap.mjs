#!/usr/bin/env node
/**
 * Stamps each sitemap URL with a <lastmod> taken from the last commit that
 * touched the file behind that page, so the dates are true rather than "today".
 * Crawlers discount a sitemap where everything changed this morning.
 *
 *   node scripts/update-sitemap.mjs [--check]
 */
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');
const check = process.argv.includes('--check');

const lastCommit = (files) => {
  const dates = files
    .map((f) => {
      try {
        return execFileSync('git', ['log', '-1', '--format=%cI', '--', f], { cwd: root, encoding: 'utf8' }).trim();
      } catch {
        return '';
      }
    })
    .filter(Boolean)
    .sort();
  return dates.at(-1)?.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
};

/** Which source file decides a page's content. */
function sourcesFor(pathname) {
  if (pathname === '/') return ['src/pages/Index.tsx', 'src/components/HeroSection.tsx', 'src/components/ServicesSection.tsx', 'src/components/AboutSection.tsx', 'src/components/GallerySection.tsx', 'src/components/AreasSection.tsx'];
  if (pathname.startsWith('/services/')) return ['src/lib/services.ts', 'src/pages/ServiceDetail.tsx'];
  if (pathname === '/about') return ['src/pages/About.tsx'];
  if (pathname === '/our-work') return ['src/pages/Work.tsx'];
  if (pathname === '/contact') return ['src/pages/Contact.tsx', 'src/components/ContactSection.tsx'];
  if (pathname === '/privacy') return ['src/pages/Privacy.tsx'];
  return ['src/lib/areas.ts', 'src/pages/AreaDetail.tsx'];
}

const original = await readFile(sitemapPath, 'utf8');
let updated = original.replace(/\s*<lastmod>[^<]*<\/lastmod>/g, '');
updated = updated.replace(/(<loc>([^<]+)<\/loc>)/g, (_m, loc, url) => {
  const stamp = lastCommit(sourcesFor(new URL(url).pathname));
  return `${loc}\n    <lastmod>${stamp}</lastmod>`;
});

if (check) {
  if (updated !== original) {
    console.error('sitemap.xml lastmod dates are stale — run: node scripts/update-sitemap.mjs');
    process.exit(1);
  }
  console.log('✓ sitemap lastmod dates are current');
} else {
  await writeFile(sitemapPath, updated);
  const stamps = [...updated.matchAll(/<lastmod>([^<]+)</g)].map((m) => m[1]);
  console.log(`stamped ${stamps.length} URLs; dates ${[...new Set(stamps)].sort().join(', ')}`);
}

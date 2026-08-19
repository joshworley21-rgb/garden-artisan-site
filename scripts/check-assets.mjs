#!/usr/bin/env node
/**
 * Fails the build if the site references an image or video that is not in
 * public/assets/. Cheap insurance against a half-finished asset migration
 * shipping a page full of broken images.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetRef = /\/assets\/([\w.-]+\.(?:webp|jpg|jpeg|png|svg|mp4|webm))/g;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx?|html)$/.test(entry.name)) out.push(p);
  }
  return out;
}

const files = [...(await walk(path.join(root, 'src'))), path.join(root, 'index.html')];
const present = new Set(await readdir(path.join(root, 'public', 'assets')));
const missing = new Map();

for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const [, name] of source.matchAll(assetRef)) {
    if (present.has(name)) continue;
    const where = missing.get(name) ?? new Set();
    where.add(path.relative(root, file));
    missing.set(name, where);
  }
}

if (missing.size === 0) {
  console.log(`✓ all referenced assets present in public/assets (${present.size} files)`);
  process.exit(0);
}

console.error('✗ missing files in public/assets:\n');
for (const [name, where] of missing) {
  console.error(`  ${name}  ← ${[...where].join(', ')}`);
}
console.error('\nRun: node scripts/fetch-lovable-assets.mjs   (see docs/SELF-HOSTING.md)');
process.exit(1);

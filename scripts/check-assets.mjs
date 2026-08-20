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

/** Nothing is optional any more: every hero file is committed. */
const optional = new Set();

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

const required = [...missing].filter(([name]) => !optional.has(name));
const optionalMissing = [...missing].filter(([name]) => optional.has(name));

if (optionalMissing.length) {
  console.log('• Lovable-hosted hero media not copied across yet:');
  for (const [name] of optionalMissing) console.log(`    ${name}`);
  console.log(
    '  The hero falls back to the committed photo and clip, so the build is fine.\n' +
      '  To use the newer hero: node scripts/fetch-lovable-assets.mjs\n',
  );
}

if (required.length === 0) {
  console.log(`✓ every required asset is in public/assets (${present.size} files)`);
  process.exit(0);
}

console.error('✗ missing files in public/assets:\n');
for (const [name, where] of required) {
  console.error(`  ${name}  ← ${[...where].join(', ')}`);
}
process.exit(1);

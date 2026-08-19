#!/usr/bin/env node
/**
 * Drops files in dist/assets/ that nothing in the built site references —
 * the original full-size .jpg/.png uploads whose resized .webp variants are
 * what the pages actually request. Roughly halves what gets deployed.
 *
 *   npm run build && node scripts/prune-unused-assets.mjs
 *
 * Pass --dry to list without deleting.
 */
import { readdir, readFile, unlink, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const dry = process.argv.includes('--dry');
const searchable = new Set(['.html', '.js', '.css', '.xml', '.txt', '.php', '.json']);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(dist);
const haystack = (
  await Promise.all(
    files.filter((f) => searchable.has(path.extname(f))).map((f) => readFile(f, 'utf8')),
  )
).join('');

let removed = 0;
let bytes = 0;
for (const entry of await readdir(path.join(dist, 'assets'), { withFileTypes: true })) {
  if (!entry.isFile() || haystack.includes(entry.name)) continue;
  const file = path.join(dist, 'assets', entry.name);
  bytes += (await stat(file)).size;
  removed++;
  console.log(`${dry ? 'would remove' : 'removed'} ${entry.name}`);
  if (!dry) await unlink(file);
}
console.log(`\n${removed} unused originals, ${(bytes / 1048576).toFixed(1)} MB`);

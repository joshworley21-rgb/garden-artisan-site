#!/usr/bin/env node
/**
 * One-time migration helper: pull the image/video originals that still live on
 * Lovable's CDN into public/assets/ so the site is self-contained.
 *
 * Lovable stored uploads outside git and left a stub next to each one in
 * src/assets/<name>.asset.json describing where the real file lives. Anything
 * still pointing at those `/__l5e/...` URLs breaks the moment the site is not
 * served by Lovable, so run this once, commit the downloaded files, and the
 * dependency is gone for good.
 *
 *   node scripts/fetch-lovable-assets.mjs                    # required files only
 *   node scripts/fetch-lovable-assets.mjs --all              # every stub (full backup)
 *   node scripts/fetch-lovable-assets.mjs --origin https://garden-artisan-site.lovable.app
 *
 * Existing files are left alone unless --force is passed.
 */
import { mkdir, readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const stubDir = path.join(root, 'src', 'assets');
const outDir = path.join(root, 'public', 'assets');

const args = process.argv.slice(2);
const all = args.includes('--all');
const force = args.includes('--force');
const originArg = args.indexOf('--origin');
const origin = (originArg !== -1 && args[originArg + 1]) || 'https://garden-artisan-site.lovable.app';

/** Files the built site actually requests (see src/components/HeroSection.tsx). */
const required = ['jw-hero2-720.webp', 'jw-hero2-1280.webp', 'jw-hero-video-2.mp4'];

const exists = (p) => stat(p).then(() => true, () => false);

async function main() {
  await mkdir(outDir, { recursive: true });
  const stubs = (await readdir(stubDir)).filter((f) => f.endsWith('.asset.json'));
  if (stubs.length === 0) {
    console.log('No .asset.json stubs left — nothing to fetch.');
    return;
  }

  let downloaded = 0;
  let skipped = 0;
  const failed = [];

  for (const stub of stubs) {
    const meta = JSON.parse(await readFile(path.join(stubDir, stub), 'utf8'));
    const name = meta.original_filename ?? stub.replace(/\.asset\.json$/, '');
    if (!all && !required.includes(name)) continue;

    const dest = path.join(outDir, name);
    if (!force && (await exists(dest))) {
      skipped++;
      continue;
    }

    const url = new URL(meta.url, origin).toString();
    process.stdout.write(`↓ ${name} … `);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (meta.size && buf.byteLength !== meta.size) {
        throw new Error(`size mismatch: got ${buf.byteLength}, expected ${meta.size}`);
      }
      await writeFile(dest, buf);
      downloaded++;
      console.log(`${(buf.byteLength / 1024).toFixed(0)} kB`);
    } catch (err) {
      console.log(`FAILED (${err.message})`);
      failed.push({ name, url, reason: err.message });
    }
  }

  console.log(`\n${downloaded} downloaded, ${skipped} already present, ${failed.length} failed.`);
  if (failed.length) {
    console.log(
      '\nIf the Lovable app is offline you can still save these by hand:\n' +
        failed.map((f) => `  ${f.name}\n    ${f.url}`).join('\n') +
        `\nDrop them into public/assets/ under exactly those names.`,
    );
    process.exitCode = 1;
  }
}

main();

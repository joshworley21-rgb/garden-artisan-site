#!/usr/bin/env node
/**
 * Publishes dist/ to the `deploy` branch, which Hostinger clones into
 * public_html. Writes the branch with git plumbing so the working tree is never
 * touched and the branch carries only built files — no source, no .gitignore.
 *
 *   npm run build:deploy && node scripts/publish-deploy.mjs [--no-push]
 */
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const indexFile = path.join(root, '.git', 'deploy.index');
const git = (args, env) =>
  execFileSync('git', args, { cwd: root, encoding: 'utf8', env: { ...process.env, ...env } }).trim();

if (!existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html is missing — run `npm run build:deploy` first.');
  process.exit(1);
}
if (!existsSync(path.join(dist, '.htaccess'))) {
  console.error('dist/.htaccess is missing — without it every route but / returns 404.');
  process.exit(1);
}
if (existsSync(path.join(dist, 'enquiry-config.php'))) {
  console.error(
    'dist/enquiry-config.php exists. That file holds the mailbox password and this branch is public —\n' +
      'delete it from public/ and create it directly on the server instead.',
  );
  process.exit(1);
}

const env = { GIT_INDEX_FILE: indexFile };
git(['--work-tree', dist, 'add', '-A', '-f', '.'], env);
const tree = git(['write-tree'], env);
const source = git(['rev-parse', '--short', 'HEAD']);
const commit = git(['commit-tree', tree, '-m', `Built site from ${source}`]);
git(['branch', '-f', 'deploy', commit]);
console.log(`deploy → ${commit.slice(0, 9)} (built from ${source})`);

if (!process.argv.includes('--no-push')) {
  console.log(git(['push', '-f', 'origin', 'deploy']));
  console.log('pushed; Hostinger pulls it on the next deploy or webhook fire.');
}

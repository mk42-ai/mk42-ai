#!/usr/bin/env node
/**
 * build — emits the deployable bundle for the AIREV deck.
 *
 * There is nothing to transpile (the deck is deliberately dependency-free), so
 * "building" means: gate on deck-check, then assemble dist/ with the served
 * artefacts and a build stamp. Fails loudly if the integrity gate fails.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT, DECK, STANDALONE, DIST_DIR, ensureDir, bytes } from './lib/deck.mjs';

console.log('\x1b[1m\nbuild — AIREV strategic overview\x1b[0m');

/* ---------- 1. integrity gate ---------- */
try {
  const out = execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'deck-check.mjs')], { encoding: 'utf8' });
  process.stdout.write(out);
} catch (e) {
  process.stdout.write(e.stdout || '');
  process.stderr.write(e.stderr || '');
  console.error('\nbuild FAILED — deck-check gate did not pass\n');
  process.exit(1);
}

/* ---------- 2. assemble dist/ ---------- */
fs.rmSync(DIST_DIR, { recursive: true, force: true });
ensureDir(DIST_DIR);

const artefacts = [
  [DECK, 'index.html'],
  [STANDALONE, path.basename(STANDALONE)],
  [path.join(ROOT, 'server.js'), 'server.js'],
  [path.join(ROOT, 'package.json'), 'package.json']
];

let total = 0;
for (const [src, name] of artefacts) {
  const buf = fs.readFileSync(src);
  fs.writeFileSync(path.join(DIST_DIR, name), buf);
  total += buf.length;
  console.log(`  + dist/${name.padEnd(48)} ${bytes(buf.length)}`);
}

/* ---------- 2b. copy local assets (deal images etc.) into dist/ ---------- */
const ASSETS_SRC = path.join(ROOT, 'assets');
let assetCount = 0;
if (fs.existsSync(ASSETS_SRC)) {
  const copyTree = (from, to) => {
    ensureDir(to);
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
      const s = path.join(from, entry.name);
      const d = path.join(to, entry.name);
      if (entry.isDirectory()) { copyTree(s, d); continue; }
      const buf = fs.readFileSync(s);
      fs.writeFileSync(d, buf);
      total += buf.length;
      assetCount += 1;
      console.log(`  + dist/${path.relative(DIST_DIR, d).padEnd(48)} ${bytes(buf.length)}`);
    }
  };
  copyTree(ASSETS_SRC, path.join(DIST_DIR, 'assets'));
  console.log(`  assets: ${assetCount} file(s) copied into dist/assets/`);
}

fs.writeFileSync(
  path.join(DIST_DIR, 'build-info.json'),
  JSON.stringify(
    {
      name: 'airev-strategic-overview-app',
      builtAt: new Date().toISOString(),
      node: process.version,
      artefacts: artefacts.map(([, n]) => n),
      totalBytes: total
    },
    null,
    2
  ) + '\n'
);

console.log(`\n  dist/ total ${bytes(total)}`);
console.log('\x1b[1m\nbuild PASSED\x1b[0m\n');

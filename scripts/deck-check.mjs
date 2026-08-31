#!/usr/bin/env node
/**
 * deck-check — static integrity gate for the single-file AIREV deck.
 *
 * The project has no bundler and no framework, so this script IS the type/import
 * checker: it extracts the inline scripts, syntax-checks them with `node --check`,
 * and then asserts the invariants the deck relies on at runtime.
 *
 * Exit code 0 = clean, 1 = at least one ERROR. Warnings never fail the build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  ROOT, STANDALONE, BUILD_DIR,
  readDeck, extractInlineScripts, extractInlineStyles,
  collectIds, collectIdReferences, checkTagBalance, ensureDir, lineOf
} from './lib/deck.mjs';

const errors = [];
const warnings = [];
const notes = [];

const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const note = (m) => notes.push(m);

const html = readDeck();
note(`deck: index.html — ${html.split('\n').length} lines, ${(Buffer.byteLength(html) / 1024).toFixed(1)} kB`);

/* ---------- 1. inline scripts: extract + syntax check ---------- */
const scripts = extractInlineScripts(html);
const inlineDir = ensureDir(path.join(BUILD_DIR, 'inline'));
for (const f of fs.readdirSync(inlineDir)) fs.unlinkSync(path.join(inlineDir, f));

scripts.forEach((s, i) => {
  const file = path.join(inlineDir, `deck-inline-${String(i + 1).padStart(2, '0')}.js`);
  fs.writeFileSync(file, s.code, 'utf8');
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (e) {
    err(`inline <script> #${i + 1} (index.html line ${s.startLine}) is not valid JavaScript:\n${e.stderr?.toString() || e.message}`);
  }
});
note(`inline scripts: ${scripts.length} extracted to .build/inline, all syntax-checked`);

/* ---------- 2. server + tooling syntax check ---------- */
for (const f of ['server.js', 'scripts/deck-check.mjs', 'scripts/build.mjs', 'scripts/lib/deck.mjs']) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { err(`missing file: ${f}`); continue; }
  try {
    execFileSync(process.execPath, ['--check', p], { stdio: 'pipe' });
  } catch (e) {
    err(`${f} is not valid JavaScript:\n${e.stderr?.toString() || e.message}`);
  }
}

/* ---------- 3. duplicate element ids ---------- */
const ids = collectIds(html);
const seen = new Map();
for (const { id, line } of ids) {
  if (seen.has(id)) err(`duplicate id="${id}" (lines ${seen.get(id)} and ${line})`);
  else seen.set(id, line);
}
note(`element ids: ${seen.size} unique`);

/* ---------- 4. dangling DOM references ---------- */
const refs = collectIdReferences(scripts);
const dangling = [...refs].filter((r) => !seen.has(r));
if (dangling.length) err(`JS references ids that do not exist in the markup: ${dangling.join(', ')}`);
note(`DOM id references resolved: ${refs.size - dangling.length}/${refs.size}`);

/* ---------- 5. tag balance ---------- */
const tagErrors = checkTagBalance(html);
for (const e of tagErrors) err(`html: ${e}`);
if (!tagErrors.length) note('html tag balance: OK');

/* ---------- 6. slide invariants ---------- */
const slideTags = [...html.matchAll(/<section class="slide"[^>]*>/g)].map((m) => m[0]);
const slideIds = slideTags.map((t) => (t.match(/id="([^"]+)"/) || [, '(no id)'])[1]);
const footerTotal = html.match(/<span id="slideTotal">(\d+)<\/span>/);
if (!footerTotal) {
  err('footer slide counter (#slideTotal) not found');
} else if (Number(footerTotal[1]) !== slideIds.length) {
  err(`footer #slideTotal says ${footerTotal[1]} but the deck has ${slideIds.length} slides (${slideIds.join(', ')}) — the pre-hydration markup is wrong`);
}
for (const s of ['s7', 'sPipeline']) {
  if (!slideIds.includes(s)) err(`expected slide #${s} is missing from the deck`);
}
const closingIdx = slideIds.indexOf('s11');
const pipeIdx = slideIds.indexOf('sPipeline');
if (closingIdx > -1 && pipeIdx > -1) {
  if (!(pipeIdx < closingIdx)) {
    err(`slide order wrong: expected …→ sPipeline(${pipeIdx}) → s11 closing(${closingIdx})`);
  }
}

/* ---------- 6b. local asset references must exist on disk ---------- */
for (const m of html.matchAll(/src="(assets\/[^"]+)"/g)) {
  if (!fs.existsSync(path.join(ROOT, m[1]))) err(`referenced asset missing on disk: ${m[1]}`);
}
slideTags.forEach((tag, i) => {
  if (!/aria-label="/.test(tag)) warn(`slide #${slideIds[i]} (position ${i + 1}) has no aria-label`);
});
note(`slides: ${slideIds.length} — ${slideIds.join(', ')}`);

/* ---------- 7. accessibility invariants the deck's JS must maintain ---------- */
if (/id="raiseSlider"/.test(html)) {
  const joined = scripts.map((s) => s.code).join('\n');
  if (!/aria-valuetext/.test(joined)) {
    err('#raiseSlider carries a static aria-valuetext that no script ever updates — screen readers will always announce the initial value');
  }
}

/* ---------- 8. inline styles: brace balance + var() sanity ---------- */
const styles = extractInlineStyles(html);
let css = styles.map((s) => s.code).join('\n');
const open = (css.match(/\{/g) || []).length;
const close = (css.match(/\}/g) || []).length;
if (open !== close) err(`inline CSS brace mismatch: ${open} '{' vs ${close} '}'`);
// Custom properties can also be declared in an inline style="--x:…" attribute or
// set imperatively with element.style.setProperty('--x', …) — count both.
const declaredVars = new Set([
  ...[...html.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]),
  ...[...html.matchAll(/setProperty\(\s*['"](--[\w-]+)['"]/g)].map((m) => m[1])
]);
const usedVars = new Set([...css.matchAll(/var\((--[\w-]+)/g)].map((m) => m[1]));
const missingVars = [...usedVars].filter((v) => !declaredVars.has(v));
if (missingVars.length) err(`CSS uses undeclared custom properties: ${missingVars.join(', ')}`);
note(`inline css: ${styles.length} block(s), ${open} rules, ${declaredVars.size} custom properties`);

/* ---------- 9. standalone deck copy must stay byte-identical ---------- */
if (!fs.existsSync(STANDALONE)) {
  err('standalone deck file airev-strategic-overview-chairman-2026-08-30.html is missing');
} else if (fs.readFileSync(STANDALONE, 'utf8') !== html) {
  err('airev-strategic-overview-chairman-2026-08-30.html has drifted from index.html — the two must stay byte-identical');
} else {
  note('standalone deck copy: in sync with index.html');
}

/* ---------- 10. no secrets ---------- */
for (const pat of [/gh[pousr]_[A-Za-z0-9]{20,}/, /sk-[A-Za-z0-9]{20,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/]) {
  const m = html.match(pat);
  if (m) err(`possible secret committed in index.html at line ${lineOf(html, m.index)}`);
}

/* ---------- report ---------- */
const label = (s) => `\x1b[1m${s}\x1b[0m`;
console.log(label('\ndeck-check — AIREV strategic overview'));
for (const n of notes) console.log(`  · ${n}`);
if (warnings.length) {
  console.log(label(`\n${warnings.length} warning(s)`));
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (errors.length) {
  console.log(label(`\n${errors.length} error(s)`));
  for (const e of errors) console.log(`  x ${e}`);
  console.log('\ndeck-check FAILED\n');
  process.exit(1);
}
console.log(label('\ndeck-check PASSED\n'));

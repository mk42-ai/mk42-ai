/**
 * Shared helpers for the deck build + integrity check.
 *
 * The deck is a single self-contained HTML file (no bundler, no framework).
 * These helpers pull the inline <script> / <style> payloads back out so the
 * normal JS toolchain (node --check, eslint) can be pointed at them.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const DECK = path.join(ROOT, 'index.html');
export const STANDALONE = path.join(ROOT, 'airev-strategic-overview-chairman-2026-08-30.html');
export const BUILD_DIR = path.join(ROOT, '.build');
export const DIST_DIR = path.join(ROOT, 'dist');

export function readDeck(file = DECK) {
  return fs.readFileSync(file, 'utf8');
}

/** Line number (1-based) of a character offset. */
export function lineOf(html, index) {
  return html.slice(0, index).split('\n').length;
}

/** Every inline <script> body that is NOT an external src= reference. */
export function extractInlineScripts(html) {
  const out = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const attrs = m[1] || '';
    if (/\bsrc\s*=/.test(attrs)) continue;
    if (/type\s*=\s*["'](?!text\/javascript|module|application\/javascript)/i.test(attrs)) continue;
    out.push({
      code: m[2],
      startLine: lineOf(html, m.index),
      attrs: attrs.trim()
    });
  }
  return out;
}

/** Every inline <style> body. */
export function extractInlineStyles(html) {
  const out = [];
  const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push({ code: m[1], startLine: lineOf(html, m.index) });
  }
  return out;
}

/** All id="..." values in document order (duplicates preserved). */
export function collectIds(html) {
  const ids = [];
  const re = /\sid\s*=\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) ids.push({ id: m[1], line: lineOf(html, m.index) });
  return ids;
}

/** IDs referenced from JS via getElementById('x') or querySelector('#x'). */
export function collectIdReferences(scripts) {
  const refs = new Set();
  for (const s of scripts) {
    let m;
    const byId = /getElementById\(\s*['"]([^'"]+)['"]\s*\)/g;
    while ((m = byId.exec(s.code)) !== null) refs.add(m[1]);
    const bySel = /querySelector(?:All)?\(\s*['"]#([A-Za-z][\w-]*)['"]\s*\)/g;
    while ((m = bySel.exec(s.code)) !== null) refs.add(m[1]);
  }
  return refs;
}

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
  'meta', 'param', 'source', 'track', 'wbr'
]);

/**
 * Stack-based tag balance check. Skips <script>/<style> bodies and comments so
 * string literals such as '</div>' inside JS never trip it.
 */
export function checkTagBalance(html) {
  const errors = [];
  const stack = [];
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, (m) => ' '.repeat(m.length))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (m) => m.replace(/[^\n]/g, ' '));

  const re = /<(\/?)([a-zA-Z][\w-]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const closing = m[1] === '/';
    const tag = m[2].toLowerCase();
    const selfClosed = m[4] === '/';
    if (VOID_TAGS.has(tag) || selfClosed) continue;
    if (!closing) {
      stack.push({ tag, line: lineOf(cleaned, m.index) });
    } else {
      const top = stack.pop();
      if (!top) {
        errors.push(`line ${lineOf(cleaned, m.index)}: stray closing </${tag}>`);
      } else if (top.tag !== tag) {
        errors.push(`line ${lineOf(cleaned, m.index)}: </${tag}> closes <${top.tag}> opened on line ${top.line}`);
      }
    }
  }
  for (const left of stack) errors.push(`line ${left.line}: <${left.tag}> never closed`);
  return errors;
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export const bytes = (n) => `${(n / 1024).toFixed(1)} kB`;

/* Zero-dependency dev/preview server for the deck.
   - serves the static deck from this folder (also under the /airev-two-year-strategy-2026-2028 prefix)
   - mounts the serverless handlers for /api/chat and /api/media from ./api (the deck is self-contained; the repo-root
     api/*.js files used by Vercel are one-line shims that re-export these)
   - loads ./.env at start (never committed) so ONDEMAND_API_KEY survives a sandbox restart
   - when the OnDemand key is not configured (or a handler is missing), /api/* is PROXIED to the deployed Vercel API
     (API_PROXY_BASE) instead of answering "no such function" — a restored preview always has a working assistant. */
'use strict';
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const PREFIX = '/airev-two-year-strategy-2026-2028';

/* ---- .env (app root) — values already present in the environment win ---- */
(function loadEnv() {
  const f = path.join(root, '.env');
  if (!fs.existsSync(f)) return;
  for (const raw of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    if (process.env[key] === undefined || process.env[key] === '') process.env[key] = val;
  }
})();

const PORT = Number(process.env.PORT || 4173);
const PROXY_BASE = String(process.env.API_PROXY_BASE || 'https://mk42-ai-git-feature-two-year-strateg-19d701-schoolhack-web-team.vercel.app').replace(/\/+$/, '');

/* ---- API handlers: ./api first (self-contained deck), ../api second (repo-root layout) ---- */
function loadHandler(name) {
  for (const dir of [path.join(root, 'api'), path.join(root, '..', 'api')]) {
    const file = path.join(dir, name + '.js');
    if (!fs.existsSync(file)) continue;
    try { return require(file); } catch (err) { console.error(`[api] failed to load ${file}: ${err && err.message}`); }
  }
  return null;
}
const handlers = { chat: loadHandler('chat'), media: loadHandler('media') };
const keyConfigured = () => Boolean(process.env.ONDEMAND_API_KEY);

/* ---- proxy to the deployed API (used when the key or the handler is unavailable locally) ---- */
function proxy(req, res, pathname, search) {
  const target = new URL(PROXY_BASE + pathname + (search || ''));
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const body = Buffer.concat(chunks);
    const headers = { 'content-type': req.headers['content-type'] || 'application/json', accept: 'application/json', 'x-forwarded-host': req.headers.host || '' };
    if (body.length) headers['content-length'] = String(body.length);
    const up = https.request(target, { method: req.method, headers, timeout: 60000 }, (r) => {
      const h = { 'cache-control': 'no-store', 'x-airev-api': 'proxied:' + target.host };
      for (const k of ['content-type', 'location']) if (r.headers[k]) h[k] = r.headers[k];
      res.writeHead(r.statusCode || 502, h);
      r.pipe(res);
    });
    up.on('timeout', () => up.destroy(new Error('upstream timeout')));
    up.on('error', (err) => {
      res.writeHead(502, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
      res.end(JSON.stringify({ ok: false, error: `The assistant API could not be reached (${err.message}).` }));
    });
    if (body.length) up.write(body);
    up.end();
  });
}

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.map': 'application/json' };

const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost');
  let p = decodeURIComponent(u.pathname);

  const api = p.match(/^\/api\/([a-z]+)\/?$/);
  if (api) {
    const name = api[1];
    const h = handlers[name];
    if (!h) {
      if (name === 'chat' || name === 'media') return proxy(req, res, p, u.search);
      res.writeHead(404, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
      return res.end(JSON.stringify({ ok: false, error: `Unknown API route /api/${name}` }));
    }
    if (name === 'chat' && !keyConfigured()) return proxy(req, res, p, u.search);   // no local key → deployed API answers
    req.query = Object.fromEntries(u.searchParams.entries());
    return Promise.resolve(h(req, res)).catch((err) => {
      console.error('[api]', name, err);
      if (!res.headersSent) { res.writeHead(500, { 'content-type': 'application/json; charset=utf-8' }); res.end(JSON.stringify({ ok: false, error: 'internal error' })); }
      else res.end();
    });
  }

  if (p === PREFIX || p.startsWith(PREFIX + '/')) p = p.slice(PREFIX.length) || '/';
  if (p === '/deck' || p === '/deck/') p = '/';
  if (p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('forbidden'); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }); return res.end('not found'); }
    res.writeHead(200, { 'content-type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'cache-control': p.startsWith('/assets/') ? 'public, max-age=3600' : 'no-cache', 'x-robots-tag': 'noindex' });
    fs.createReadStream(file).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const mode = handlers.chat ? (keyConfigured() ? 'local handler + ONDEMAND_API_KEY' : `local handler present, no key → proxied to ${PROXY_BASE}`) : `no local handler → proxied to ${PROXY_BASE}`;
  console.log(`AIREV strategy deck listening on http://0.0.0.0:${PORT} · api/chat: ${mode} · api/media: ${handlers.media ? 'mounted' : 'proxied'}`);
});

/* GET /api/media?id=<mediaId>   → 302 to a fresh OnDemand-hosted URL of that library document (scrubbed extract)
   GET /api/media?doc=<docId>    → same, resolved through the deck's library.json
   GET /api/media                → JSON list of the library media (id, name, createdAt) — no URLs, no secrets
   Falls back to the committed extract in the repository when the OnDemand lookup is unavailable. */
'use strict';

const { listLibraryMedia, redact } = require('./_lib/ondemand.js');
const library = require('../airev-two-year-strategy-2026-2028/library.json');

const REPO_RAW = 'https://raw.githubusercontent.com/mk42-ai/mk42-ai/feature/two-year-strategy-deck-2026-09-05/airev-two-year-strategy-2026-2028/';

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return send(res, 405, { ok: false, error: 'Method not allowed' }); }
  const url = new URL(req.url, 'http://local');
  let id = (url.searchParams.get('id') || '').replace(/[^A-Za-z0-9]/g, '');
  const docId = (url.searchParams.get('doc') || '').replace(/[^A-Za-z0-9_-]/g, '');
  const doc = (library.docs || []).find((d) => (id && d.mediaId === id) || (docId && d.id === docId)) || null;
  if (!id && doc) id = doc.mediaId || '';

  if (!id && !doc) {
    try {
      const items = await listLibraryMedia();
      return send(res, 200, { ok: true, count: items.length, media: items.map((m) => ({ id: m.id, name: redact(m.name), createdAt: m.createdAt, mimeType: m.mimeType })) });
    } catch (err) { return send(res, err.status === 503 ? 503 : 502, { ok: false, error: redact(err.message) }); }
  }

  let target = null;
  try {
    const items = await listLibraryMedia();
    const hit = items.find((m) => m.id === id);
    if (hit && hit.url) target = hit.url;
  } catch (_) { /* fall through to the repository copy */ }
  if (!target && doc && doc.file) target = REPO_RAW + doc.file;
  if (!target) return send(res, 404, { ok: false, error: 'Unknown document' });

  res.statusCode = 302;
  res.setHeader('Location', target);
  res.setHeader('Cache-Control', 'no-store');
  res.end();
};

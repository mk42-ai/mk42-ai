/* POST /api/chat — OnDemand-backed assistant for the two-year strategy deck.
   Body: { query: string, sessionId?: string, visitorId?: string }
   • creates an OnDemand chat session per visitor (POST /chat/v1/sessions) when no sessionId is supplied
   • proxies the question to POST /chat/v1/sessions/{id}/query (sync, knowledge-plugin RAG)
   • returns the grounded answer plus citation/source metadata mapped to the deck's document library.
   GET /api/chat → health/config (no secrets). */
'use strict';

const { CONFIG, createSession, submitQuery, redact } = require('./_lib/ondemand.js');
const { retrieve } = require('./_lib/retrieve.js');
const library = require('../airev-two-year-strategy-2026-2028/library.json');

const DOCS = (library.docs || []).map((d) => ({ ...d, norm: norm(d.label) }));

function norm(s) {
  return String(s || '').toLowerCase().replace(/\(scrubbed extract\)|\.txt$/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}
function tokens(s) { return new Set(norm(s).split(' ').filter((t) => t.length > 2)); }
function similarity(a, b) {
  const A = tokens(a), B = tokens(b);
  if (!A.size || !B.size) return 0;
  let inter = 0; for (const t of A) if (B.has(t)) inter++;
  return inter / Math.min(A.size, B.size);
}
function matchDoc(title) {
  const n = norm(title);
  if (!n) return null;
  let best = null, bestScore = 0;
  for (const d of DOCS) {
    if (d.norm === n || d.norm.includes(n) || n.includes(d.norm)) return d;
    const s = similarity(n, d.norm);
    if (s > bestScore) { bestScore = s; best = d; }
  }
  return bestScore >= 0.6 ? best : null;
}

/** Split "SOURCES: a | b" off the answer and map the titles to library documents. */
function extractCitations(answer) {
  const lines = String(answer || '').split(/\r?\n/);
  const titles = [];
  const kept = [];
  for (const line of lines) {
    const m = line.match(/^\s*[*_#-]*\s*sources?\s*(?:used)?\s*[:：]\s*(.+?)\s*[*_]*\s*$/i);
    if (m) { titles.push(...m[1].split(/\s*[|;]\s*|\s*,\s+(?=[A-Z])/).map((t) => t.replace(/^[*_"“”'\-\s]+|[*_"“”'\s.]+$/g, '')).filter(Boolean)); }
    else kept.push(line);
  }
  const seen = new Set(), citations = [];
  const push = (doc, rawTitle) => {
    const key = doc ? doc.id : 'raw:' + norm(rawTitle);
    if (seen.has(key)) return;
    seen.add(key);
    citations.push(doc
      ? { docId: doc.id, label: doc.label, type: doc.type, pages: doc.pages || null, mediaId: doc.mediaId || null, download: doc.mediaId ? `/api/media?id=${encodeURIComponent(doc.mediaId)}` : null, source: 'sources-line' }
      : { docId: null, label: rawTitle, type: null, pages: null, mediaId: null, download: null, source: 'sources-line' });
  };
  for (const t of titles) push(matchDoc(t), t);
  // Also credit documents whose full title is quoted in the body of the answer.
  const body = kept.join('\n');
  const bodyNorm = norm(body);
  for (const d of DOCS) if (d.norm.length > 12 && bodyNorm.includes(d.norm) && !seen.has(d.id)) push(d, d.label);
  return { text: kept.join('\n').replace(/\n{3,}/g, '\n\n').trim(), citations, sourceTitles: titles };
}

async function readBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (_) { return {}; } }
    return req.body;
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (c) => { raw += c; if (raw.length > 64 * 1024) req.destroy(); });
    req.on('end', () => { try { resolve(raw ? JSON.parse(raw) : {}); } catch (_) { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    return send(res, 200, {
      ok: true, backend: 'ondemand', endpointId: CONFIG.endpointId, knowledgePluginId: CONFIG.knowledgePluginId,
      documents: DOCS.length, keyConfigured: Boolean(process.env.ONDEMAND_API_KEY)
    });
  }
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return send(res, 405, { ok: false, error: 'Method not allowed' }); }

  const body = await readBody(req);
  const query = String(body.query || '').trim().slice(0, 2000);
  if (!query) return send(res, 400, { ok: false, error: 'query is required' });
  const visitorId = String(body.visitorId || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64) || `anon-${Date.now().toString(36)}`;
  const externalUserId = `deck-visitor-${visitorId}`;
  const startedAt = Date.now();

  try {
    let sessionId = String(body.sessionId || '').replace(/[^A-Za-z0-9]/g, '').slice(0, 64) || null;
    let created = false;
    if (!sessionId) { sessionId = await createSession(externalUserId); created = true; }

    // Evidence passages from the same scrubbed library that was ingested into OnDemand (deterministic citations).
    // OnDemand applies a size cap to the fulfilment prompt on the RAG path (~3.3K characters end-to-end were
    // verified to reach the model), so the evidence is budgeted: five passages, 430 characters each.
    const passages = retrieve(query, 5);
    const evidence = passages.length
      ? 'DATA-ROOM EVIDENCE (each passage starts with its exact document title; rely on these and on any retrieved documents, and cite the titles):\n' +
        passages.map((p, i) => `[${i + 1}] # ${p.label}\n${p.text.slice(0, 430)}`).join('\n')
      : '';

    let data;
    try {
      data = await submitQuery(sessionId, query, evidence);
    } catch (err) {
      // A stale/unknown session id (e.g. cleared server-side): open a fresh session once and retry.
      if (!created && err && (err.status === 404 || err.status === 400)) {
        sessionId = await createSession(externalUserId); created = true;
        data = await submitQuery(sessionId, query, evidence);
      } else throw err;
    }

    const parsed = extractCitations(redact(data.answer || ''));
    const seen = new Set();
    const citations = [];
    for (const c of parsed.citations) { const key = c.docId || 'raw:' + c.label; if (!seen.has(key)) { seen.add(key); citations.push({ ...c, label: redact(c.label) }); } }
    for (const p of passages) {                                  // evidence passages the model was given, in rank order
      if (seen.has(p.docId)) continue;
      seen.add(p.docId);
      citations.push({ docId: p.docId, label: redact(p.label), type: p.type, pages: p.pages, mediaId: p.mediaId, download: p.mediaId ? `/api/media?id=${encodeURIComponent(p.mediaId)}` : null, source: 'library-passage' });
    }
    const cited = citations.filter((c) => c.docId);            // drop unmatched raw titles when we have real documents
    const finalCitations = (cited.length ? cited : citations).slice(0, 5);
    const m = data.metrics || {};
    return send(res, 200, {
      ok: true,
      sessionId,
      sessionCreated: created,
      messageId: data.messageId || null,
      status: data.status || 'completed',
      answer: parsed.text || redact(data.answer || ''),
      citations: finalCitations,
      sourceTitles: parsed.sourceTitles.map(redact),
      evidencePassages: passages.length,
      grounded: finalCitations.length > 0,
      metrics: { ragTimeSec: m.ragTimeSec ?? null, fulfillmentTimeSec: m.fulfillmentTimeSec ?? null, totalTimeSec: m.totalTimeSec ?? null, inputTokens: m.inputTokens ?? null, outputTokens: m.outputTokens ?? null, apiMs: Date.now() - startedAt },
      backend: { provider: 'ondemand', endpointId: CONFIG.endpointId, knowledgePluginId: CONFIG.knowledgePluginId }
    });
  } catch (err) {
    const status = err && err.status === 503 ? 503 : 502;
    return send(res, status, { ok: false, error: redact((err && err.message) || 'Upstream error'), upstreamStatus: err && err.status ? err.status : null });
  }
};

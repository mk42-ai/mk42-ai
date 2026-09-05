/* POST /api/chat — OnDemand-agent-backed assistant for the two-year strategy deck.
   Body: { query: string, sessionId?: string, visitorId?: string }
   Request path (per OnDemand's live public API docs, 2026-09-05):
     1. GET  /chat/v1/projects/{agentId}            → the agent (system prompt embeds the document registry + scrubbed data room)
     2. POST /chat/v1/sessions { externalUserId, projectId }  → one chat session per visitor, filed in the agent
        (a stored sessionId is re-used only if GET /chat/v1/sessions/{id} confirms it belongs to the agent)
     3. POST /chat/v1/sessions/{id}/query           → sync, fulfillmentOnly, modelConfigs.fulfillmentPrompt = agent system prompt
   No knowledge plugin, no media plugin and no local passage retrieval sit on this path any more.
   The answer's "SOURCES:" line is mapped to the deck's document library for citation chips + downloads.
   GET /api/chat → health/config (no secrets, no prompt text). */
'use strict';

const { CONFIG, getAgent, createSession, sessionBelongsToAgent, submitQuery, redact } = require('./_lib/ondemand.js');
const library = require('../airev-two-year-strategy-2026-2028/library.json');

/* The deck itself is one of the agent's sources (narrative + roadmap); citations of it open the deck. */
const DECK_DOC = { id: 'deck', label: 'AIREV Two-Year Strategy 2026–2028 — interactive deck', type: 'deck', pages: null, mediaId: null, file: null, download: './' };
const DOCS = [...(library.docs || []), DECK_DOC].map((d) => ({ ...d, norm: norm(d.label) }));

function norm(s) {
  return String(s || '').toLowerCase().replace(/\(scrubbed extract\)|\(narrative\)|\(roadmap[^)]*\)|\.txt$/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
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
function downloadFor(doc) {
  if (!doc) return null;
  if (doc.download) return doc.download;
  if (doc.mediaId) return `/api/media?id=${encodeURIComponent(doc.mediaId)}`;
  if (doc.file) return `/api/media?doc=${encodeURIComponent(doc.id)}`;
  return null;
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
      ? { docId: doc.id, label: doc.label, type: doc.type, pages: doc.pages || null, mediaId: doc.mediaId || null, download: downloadFor(doc), source: 'sources-line' }
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

/** Re-use the visitor's session when it still belongs to the agent; otherwise open a new one inside the agent. */
async function ensureSession(sessionId, externalUserId) {
  if (sessionId && await sessionBelongsToAgent(sessionId)) return { sessionId, created: false };
  return { sessionId: await createSession(externalUserId), created: true };
}

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const keyConfigured = Boolean(process.env.ONDEMAND_API_KEY);
    let agent = null, error = null;
    if (keyConfigured) { try { agent = await getAgent(); } catch (err) { error = redact((err && err.message) || 'agent unavailable'); } }
    return send(res, 200, {
      ok: Boolean(agent), backend: 'ondemand-agent', agentId: CONFIG.agentId,
      agent: agent ? { name: redact(agent.name), endpointId: agent.endpointId, promptChars: agent.promptChars, updatedAt: agent.updatedAt, fetchedAt: agent.fetchedAt } : null,
      documents: DOCS.length - 1, keyConfigured, error
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
    const agent = await getAgent();
    const requested = String(body.sessionId || '').replace(/[^A-Za-z0-9]/g, '').slice(0, 64) || null;
    let { sessionId, created } = await ensureSession(requested, externalUserId);

    let data;
    try {
      data = await submitQuery(sessionId, query, agent);
    } catch (err) {
      // A session that vanished between the check and the query: open a fresh one inside the agent and retry once.
      if (!created && err && (err.status === 404 || err.status === 400)) {
        sessionId = await createSession(externalUserId); created = true;
        data = await submitQuery(sessionId, query, agent);
      } else throw err;
    }
    if (!String(data.answer || '').trim() || data.status === 'failed') {
      // Rare empty/failed completion: one more attempt on the same session before surfacing an error.
      const again = await submitQuery(sessionId, query, agent);
      if (String(again.answer || '').trim()) data = again;
      else { const e = new Error('The assistant returned an empty answer'); e.status = 502; throw e; }
    }

    const parsed = extractCitations(redact(data.answer || ''));
    const seen = new Set();
    const citations = [];
    for (const c of parsed.citations) { const key = c.docId || 'raw:' + c.label; if (!seen.has(key)) { seen.add(key); citations.push({ ...c, label: redact(c.label) }); } }
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
      grounded: finalCitations.length > 0,
      metrics: { ragTimeSec: null, fulfillmentTimeSec: m.fulfillmentTimeSec ?? null, totalTimeSec: m.totalTimeSec ?? null, inputTokens: m.inputTokens ?? null, outputTokens: m.outputTokens ?? null, apiMs: Date.now() - startedAt },
      backend: { provider: 'ondemand', mode: 'agent-system-prompt', agentId: agent.id, endpointId: agent.endpointId, promptChars: agent.promptChars }
    });
  } catch (err) {
    const status = err && (err.status === 503 || err.status === 504) ? err.status : 502;
    return send(res, status, { ok: false, error: redact((err && err.message) || 'Upstream error'), upstreamStatus: err && err.status ? err.status : null });
  }
};

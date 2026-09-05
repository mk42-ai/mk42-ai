/* Shared OnDemand client for the deck's serverless functions (Vercel Node runtime / local dev server).
   Endpoints follow OnDemand's live public API docs (Chat API: createchatsession, submitquery; Media API: fetchmedia).
   The API key is read ONLY from the environment (ONDEMAND_API_KEY) — never committed. */
'use strict';

const CONFIG = {
  base: (process.env.ONDEMAND_API_BASE || 'https://api.on-demand.io').replace(/\/+$/, ''),
  // Knowledge-chat plugin holding the 49 scrubbed data-room extracts (ingested via the Media API, pluginInputs.postProcess.chatPluginId).
  knowledgePluginId: process.env.ONDEMAND_KNOWLEDGE_PLUGIN_ID || 'plugin-1752333751',
  // Fulfilment model endpoint (see OnDemand "Fulfillment Models" — predefined models).
  endpointId: process.env.ONDEMAND_ENDPOINT_ID || 'predefined-openai-gpt4o',
  // externalUserId the library media were uploaded under — used to list them with fresh download URLs.
  libraryUser: process.env.ONDEMAND_LIBRARY_USER || 'vvip-deck-library',
  timeoutMs: Number(process.env.ONDEMAND_TIMEOUT_MS || 55000)
};

function apiKey() {
  const k = process.env.ONDEMAND_API_KEY;
  if (!k) { const e = new Error('ONDEMAND_API_KEY is not configured'); e.status = 503; throw e; }
  return k;
}

/** Minimal fetch wrapper: JSON in/out, apikey header, timeout, structured errors (never leaks the key). */
async function od(method, path, body) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CONFIG.timeoutMs);
  try {
    const res = await fetch(CONFIG.base + path, {
      method,
      headers: { apikey: apiKey(), 'Content-Type': 'application/json', Accept: 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: ctrl.signal
    });
    const text = await res.text();
    let json = null;
    try { json = text ? JSON.parse(text) : null; } catch (_) { json = null; }
    if (!res.ok) {
      const e = new Error((json && (json.message || json.error)) || `OnDemand ${method} ${path} → ${res.status}`);
      e.status = res.status; e.body = json || text.slice(0, 300);
      throw e;
    }
    return json;
  } finally { clearTimeout(timer); }
}

/** POST /chat/v1/sessions — one session per visitor (externalUserId is the visitor's stable id).
    The knowledge plugin is passed per query rather than at session level: sessions created with pluginIds
    were observed to ignore per-query modelConfigs (the evidence prompt never reached the model). */
async function createSession(externalUserId) {
  const j = await od('POST', '/chat/v1/sessions', { externalUserId, pluginIds: [] });
  const id = j && j.data && j.data.id;
  if (!id) { const e = new Error('OnDemand did not return a session id'); e.status = 502; throw e; }
  return id;
}

const FULFILMENT_PROMPT = [
  'You are the AIREV two-year strategy deck assistant. Answer ONLY from the retrieved data-room documents.',
  'Be concise (at most 170 words): a one-sentence lead, then short bullet points with the specific figures, dates and counterparties.',
  'The joint-venture counterparty must only ever be called "VVIP Sovereign JV" — never name, guess or describe its identity.',
  'If the documents do not contain the answer, say so plainly and suggest which document to open; never invent figures.',
  'Finish with one final line in exactly this format, using the exact document titles you relied on (the "# " heading of each document):',
  'SOURCES: <document title> | <document title>'
].join(' ');

/** POST /chat/v1/sessions/{id}/query — sync RAG answer from the knowledge plugin. */
async function submitQuery(sessionId, query, evidence) {
  // Evidence passages travel in the fulfilment prompt: OnDemand's RAG pipeline pre-processes the query text
  // for retrieval, whereas the fulfilment prompt reaches the model verbatim.
  const prompt = evidence ? `${FULFILMENT_PROMPT}\n\n${evidence}` : FULFILMENT_PROMPT;
  const j = await od('POST', `/chat/v1/sessions/${encodeURIComponent(sessionId)}/query`, {
    query,
    endpointId: CONFIG.endpointId,
    responseMode: 'sync',
    pluginIds: [CONFIG.knowledgePluginId],
    modelConfigs: { fulfillmentPrompt: prompt, temperature: 0.2 }
  });
  return (j && j.data) || {};
}

/** GET /media/v1/public/file?externalUserId=… — the library media with fresh signed URLs (cached briefly). */
let mediaCache = { at: 0, items: [] };
async function listLibraryMedia() {
  if (Date.now() - mediaCache.at < 10 * 60 * 1000 && mediaCache.items.length) return mediaCache.items;
  const items = [];
  for (let page = 1; page <= 3; page++) {
    const j = await od('GET', `/media/v1/public/file?externalUserId=${encodeURIComponent(CONFIG.libraryUser)}&limit=50&page=${page}&sort=createdAt`);
    const data = (j && j.data) || [];
    items.push(...data);
    if (data.length < 50) break;
  }
  mediaCache = { at: Date.now(), items };
  return items;
}

/* ---- Confidentiality guard ------------------------------------------------------------------
   Defence in depth on everything that leaves this API. The deny-list is stored base64-encoded so the
   plaintext terms never appear in the repository; each entry is [base64(regex source), flags]. */
const DENY = [
  ['cHJlc2lkZW50aWFsXHMrY291cnQoPzpbJ+KAmV1zKT8=', 'gi'],
  ['b2ZmaWNlXHMrb2ZccytkZXZlbG9wbWVudFxzK2FmZmFpcnM=', 'gi'],
  ['XGJhdGhhclxi', 'gi'],
  ['XGJPREFcYg==', 'g']
].map(([b, f]) => new RegExp(Buffer.from(b, 'base64').toString('utf8'), f));
const REPLACEMENT = 'VVIP Sovereign JV';
function redact(text) {
  let t = String(text == null ? '' : text);
  for (const re of DENY) t = t.replace(re, REPLACEMENT);
  return t.replace(/(VVIP Sovereign JV)(?:\s*[·\-–]?\s*VVIP Sovereign JV)+/g, '$1');
}

module.exports = { CONFIG, od, createSession, submitQuery, listLibraryMedia, redact, FULFILMENT_PROMPT };

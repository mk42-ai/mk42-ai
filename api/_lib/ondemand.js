/* Shared OnDemand client for the deck's serverless functions (Vercel Node runtime / local dev server).
   Every call follows OnDemand's live public API documentation (read on 2026-09-05):
     • Projects API  — GET  /chat/v1/projects/{projectId}         → the agent: { name, endpointId, systemPrompt }
     • Chat API      — POST /chat/v1/sessions                     → { externalUserId, projectId }  (one session per visitor, filed in the agent)
                       GET  /chat/v1/sessions/{sessionId}         → verifies a stored session still belongs to the agent
                       POST /chat/v1/sessions/{sessionId}/query   → { query, endpointId, responseMode:'sync', fulfillmentOnly:true,
                                                                       modelConfigs:{ fulfillmentPrompt:<agent systemPrompt>, temperature } }
     • Media API     — GET  /media/v1/public/file?externalUserId= → fresh download URLs for the scrubbed extracts (api/media.js only)
   The docs state that a project's endpointId + systemPrompt are the project's defaults and that "the application starting the
   chat applies them" — so the agent is read here and its system prompt is sent as the fulfillment prompt of every query
   (verified live: the prompt is not applied server-side on its own). The fulfillment prompt must carry the two template
   variables `Context: {context}` / `Question: {question}` (Fulfillment Prompts doc); they are appended if the agent lacks them.
   The API key is read ONLY from the environment (ONDEMAND_API_KEY) — never committed. */
'use strict';

const CONFIG = {
  base: (process.env.ONDEMAND_API_BASE || 'https://api.on-demand.io').replace(/\/+$/, ''),
  // The OnDemand agent (chat project) whose system prompt embeds the data-room registry + scrubbed extracts.
  agentId: String(process.env.ONDEMAND_AGENT_ID || '6a9c566598ed33a866ffbf13').trim(),
  // Optional override; by default every query uses the endpoint saved on the agent itself.
  endpointId: String(process.env.ONDEMAND_ENDPOINT_ID || '').trim(),
  // externalUserId the scrubbed extracts were uploaded under — used by api/media.js to mint fresh download URLs.
  libraryUser: process.env.ONDEMAND_LIBRARY_USER || 'vvip-deck-library',
  timeoutMs: Number(process.env.ONDEMAND_TIMEOUT_MS || 50000),
  agentCacheMs: Number(process.env.ONDEMAND_AGENT_CACHE_MS || 10 * 60 * 1000),
  temperature: Number(process.env.ONDEMAND_TEMPERATURE || 0.1)
};

function apiKey() {
  const k = process.env.ONDEMAND_API_KEY;
  if (!k) { const e = new Error('ONDEMAND_API_KEY is not configured'); e.status = 503; throw e; }
  return k;
}

/** Minimal fetch wrapper: JSON in/out, `apikey` header, timeout, structured errors (never leaks the key). */
async function od(method, path, body, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs || CONFIG.timeoutMs);
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
  } catch (err) {
    if (err && err.name === 'AbortError') { const e = new Error('OnDemand did not respond in time'); e.status = 504; throw e; }
    throw err;
  } finally { clearTimeout(timer); }
}

/* ---- The agent (OnDemand project) -------------------------------------------------------------- */
const TEMPLATE_TAIL = '\n\nContext: {context}\nQuestion: {question}';
let agentCache = { at: 0, agent: null, inflight: null };

/** GET /chat/v1/projects/{id} — the agent's name, endpoint and system prompt (cached per function instance). */
async function getAgent(force) {
  const fresh = agentCache.agent && Date.now() - agentCache.at < CONFIG.agentCacheMs;
  if (fresh && !force) return agentCache.agent;
  if (agentCache.inflight) return agentCache.inflight;
  agentCache.inflight = (async () => {
    try {
      const j = await od('GET', `/chat/v1/projects/${encodeURIComponent(CONFIG.agentId)}`);
      const d = j && j.data;
      if (!d || !d.id) { const e = new Error('OnDemand agent not found'); e.status = 503; throw e; }
      let prompt = String(d.systemPrompt || '');
      if (!prompt.trim()) { const e = new Error('OnDemand agent has an empty system prompt'); e.status = 503; throw e; }
      if (!/\{context\}/.test(prompt) || !/\{question\}/.test(prompt)) prompt += TEMPLATE_TAIL;
      const agent = {
        id: d.id, name: d.name || '', endpointId: CONFIG.endpointId || d.endpointId || 'predefined-openai-gpt4.1',
        systemPrompt: prompt, promptChars: prompt.length, updatedAt: d.updatedAt || null, fetchedAt: new Date().toISOString()
      };
      agentCache = { at: Date.now(), agent, inflight: null };
      return agent;
    } catch (err) {
      agentCache.inflight = null;
      if (agentCache.agent) return agentCache.agent;           // serve the last good copy while OnDemand is unreachable
      throw err;
    }
  })();
  return agentCache.inflight;
}

/* ---- Sessions ---------------------------------------------------------------------------------- */
/** POST /chat/v1/sessions — one session per visitor, filed in the agent (projectId). */
async function createSession(externalUserId) {
  const j = await od('POST', '/chat/v1/sessions', { externalUserId, projectId: CONFIG.agentId });
  const id = j && j.data && j.data.id;
  if (!id) { const e = new Error('OnDemand did not return a session id'); e.status = 502; throw e; }
  if (j.data.projectId && j.data.projectId !== CONFIG.agentId) { const e = new Error('OnDemand session was not filed in the agent'); e.status = 502; throw e; }
  return id;
}

/** GET /chat/v1/sessions/{id} — true when the session exists and belongs to the agent (stale ids from older builds are replaced). */
async function sessionBelongsToAgent(sessionId) {
  try {
    const j = await od('GET', `/chat/v1/sessions/${encodeURIComponent(sessionId)}`, undefined, 15000);
    return Boolean(j && j.data && j.data.id === sessionId && j.data.projectId === CONFIG.agentId);
  } catch (err) {
    if (err && (err.status === 404 || err.status === 400)) return false;
    throw err;
  }
}

/* ---- Queries ----------------------------------------------------------------------------------- */
/** POST /chat/v1/sessions/{id}/query — sync answer from the agent's endpoint with the agent's system prompt as the
    fulfillment prompt. fulfillmentOnly skips the RAG/plugin stage: no knowledge plugin, no media plugin — the data room
    travels inside the system prompt. */
async function submitQuery(sessionId, query, agent) {
  const j = await od('POST', `/chat/v1/sessions/${encodeURIComponent(sessionId)}/query`, {
    query,
    endpointId: agent.endpointId,
    responseMode: 'sync',
    fulfillmentOnly: true,
    modelConfigs: { fulfillmentPrompt: agent.systemPrompt, temperature: CONFIG.temperature }
  });
  return (j && j.data) || {};
}

/* ---- Media (downloads only — not part of the chat request path) -------------------------------- */
let mediaCache = { at: 0, items: [] };
/** GET /media/v1/public/file?externalUserId=… — the scrubbed-extract media with fresh signed URLs (cached briefly). */
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
   Defence in depth on everything that leaves this API (the agent's system prompt enforces the same rule).
   The deny-list is stored base64-encoded so the plaintext terms never appear in the repository;
   each entry is [base64(regex source), flags]. */
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

module.exports = { CONFIG, od, getAgent, createSession, sessionBelongsToAgent, submitQuery, listLibraryMedia, redact };

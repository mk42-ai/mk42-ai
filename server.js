#!/usr/bin/env node
/* AIREV Strategic Overview — app server.
 * Zero-dependency static server for the interactive deck.
 * Run: node server.js   (PORT env optional, default 3000)
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '3000', 10);
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2'
};

function send(res, code, body, headers) {
  res.writeHead(code, Object.assign({ 'Cache-Control': 'no-store' }, headers || {}));
  res.end(body);
}

function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden');
  fs.readFile(filePath, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  });
}

/* ---- OnDemand text-to-audio proxy (Services API) ----
 * POST /api/tts {text, voice?} -> {audioUrl}
 * Reads ON_DEMAND_API_KEY from the environment; the key never ships to the client
 * and is never committed to the repository. Without a key it returns 503 and the
 * client falls back to the browser speech engine. */
const TTS_URL = 'https://api.on-demand.io/services/v1/public/service/execute/text_to_speech';
const TTS_VOICE = process.env.TTS_VOICE || 'nova'; // American female-sounding voice

async function handleTts(req, res) {
  const key = process.env.ON_DEMAND_API_KEY || '';
  if (!key) return send(res, 503, JSON.stringify({ error: 'tts-unavailable' }), { 'Content-Type': 'application/json' });
  let raw = '';
  req.on('data', (c) => { raw += c; if (raw.length > 16384) req.destroy(); });
  req.on('end', async () => {
    try {
      const body = JSON.parse(raw || '{}');
      const text = String(body.text || '').slice(0, 2400).trim();
      if (!text) return send(res, 400, JSON.stringify({ error: 'text required' }), { 'Content-Type': 'application/json' });
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 30000);
      const r = await fetch(TTS_URL, {
        method: 'POST',
        headers: { apikey: key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'tts-1', input: text, voice: String(body.voice || TTS_VOICE) }),
        signal: ctl.signal
      });
      clearTimeout(timer);
      const j = await r.json().catch(() => ({}));
      const audioUrl = j && j.data && j.data.audioUrl;
      if (!r.ok || !audioUrl) {
        return send(res, 502, JSON.stringify({ error: 'tts-failed', status: r.status }), { 'Content-Type': 'application/json' });
      }
      send(res, 200, JSON.stringify({ audioUrl }), { 'Content-Type': 'application/json' });
    } catch (e) {
      send(res, 502, JSON.stringify({ error: 'tts-error' }), { 'Content-Type': 'application/json' });
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/api/health')) {
    return send(res, 200, JSON.stringify({ ok: true, app: 'airev-strategic-overview', voice: !!process.env.ON_DEMAND_API_KEY, ts: new Date().toISOString() }),
      { 'Content-Type': 'application/json' });
  }
  if (req.url.startsWith('/api/tts') && req.method === 'POST') return handleTts(req, res);
  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
  send(res, 405, 'Method not allowed');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AIREV deck app listening on http://0.0.0.0:${PORT}`);
});

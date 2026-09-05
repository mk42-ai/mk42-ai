/* Server-side passage retrieval over the scrubbed data-room extracts (library/*.txt) — the same 49
   documents that were ingested into OnDemand. OnDemand's knowledge-plugin RAG is always enabled on the
   query; these passages are additionally handed to the model as explicit evidence so every answer is
   grounded in the library with deterministic citations, even while the OnDemand index is warming up. */
'use strict';

const fs = require('fs');
const path = require('path');

const LIB_DIR = [
  path.join(process.cwd(), 'airev-two-year-strategy-2026-2028', 'library'),
  path.join(__dirname, '..', '..', 'airev-two-year-strategy-2026-2028', 'library')
].find((p) => fs.existsSync(p));
const library = require('../../airev-two-year-strategy-2026-2028/library.json');

const STOP = new Set(('a an and are as at be but by can do does for from had has have how if in is it its of on or please summarize summarise tell me about ' +
  'that the their there these they this to was we were what when where which who why will with would you your').split(' '));
const STEM = [['ies', 'y'], ['sses', 'ss'], ['xes', 'x'], ['ches', 'ch'], ['shes', 'sh'], ['ing', ''], ['ed', ''], ['s', '']];
const EXPAND = {
  valuation: ['pre-money', 'post-money', 'dcf', 'multiple', 'arr'], revenue: ['licensing', 'royalty', 'arr', 'billings'],
  jv: ['joint', 'venture', 'seats'], qualcomm: ['tla', 'activated', 'unit', 'snapdragon', 'licence', 'license'],
  deal: ['agreement', 'licence', 'license', 'terms'], tenstorrent: ['galaxy', 'blackhole', 'fleet'],
  kairoswealth: ['merger', 'loi', 'aum', 'aua'], redington: ['distribution', 'reseller', 'price', 'card'],
  intel: ['panther', 'lake', 'pc', 'mou'], africa: ['angola', 'luanda', 'solar', 'modular'], debt: ['blackrock', 'infrastructure', 'facility']
};

function stem(t) {
  for (const [suf, rep] of STEM) if (t.endsWith(suf)) { const s = t.slice(0, -suf.length) + rep; if (s.length >= 4) return s; }
  return t;
}
function tokenize(text) {
  const out = [];
  for (const m of String(text).toLowerCase().matchAll(/[a-z0-9]+(?:\.[0-9][a-z0-9]*)?/g)) {
    const t = m[0];
    if (t.length < 2 || STOP.has(t)) continue;
    out.push(stem(t));
  }
  return out;
}

let index = null;
function buildIndex() {
  if (index) return index;
  const chunks = [], df = new Map();
  for (const doc of library.docs || []) {
    const file = LIB_DIR && path.join(LIB_DIR, path.basename(doc.file || `${doc.id}.txt`));
    if (!file || !fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    const paras = text.split(/\n\s*\n/).map((p) => p.replace(/\s+/g, ' ').trim()).filter((p) => p.length > 60 && !/^# /.test(p));
    // merge short paragraphs into ~650-character passages
    const passages = [];
    let cur = '';
    for (const p of paras) {
      if ((cur + ' ' + p).length > 650 && cur) { passages.push(cur); cur = p; } else cur = cur ? cur + ' ' + p : p;
    }
    if (cur) passages.push(cur);
    passages.forEach((ptxt, i) => {
      const toks = tokenize(ptxt), tf = new Map();
      toks.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
      for (const t of tf.keys()) df.set(t, (df.get(t) || 0) + 1);
      chunks.push({ doc, i, text: ptxt, tf, len: toks.length, titleToks: new Set(tokenize(doc.label)) });
    });
  }
  const N = chunks.length || 1, avgdl = chunks.reduce((s, c) => s + c.len, 0) / N || 1;
  const idf = new Map();
  for (const [t, n] of df) idf.set(t, Math.log(1 + (N - n + 0.5) / (n + 0.5)));
  index = { chunks, idf, avgdl, N };
  return index;
}

function retrieve(question, k = 6) {
  const { chunks, idf, avgdl } = buildIndex();
  const toks = tokenize(question);
  const bag = new Map();
  toks.forEach((t) => bag.set(t, (bag.get(t) || 0) + 1));
  for (const t of toks) for (const x of EXPAND[t] || []) { const s = stem(x); bag.set(s, (bag.get(s) || 0) + 0.6); }
  const K1 = 1.5, B = 0.75;
  const scored = chunks.map((c) => {
    let s = 0;
    for (const [t, w] of bag) {
      const f = c.tf.get(t);
      if (!f) continue;
      s += w * (idf.get(t) || 0) * (f * (K1 + 1)) / (f + K1 * (1 - B + B * c.len / avgdl));
      if (c.titleToks.has(t)) s += 0.4 * w * (idf.get(t) || 0);          // the document title matching the query is strong evidence
    }
    return { c, s };
  }).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
  if (!scored.length) return [];
  const floor = scored[0].s * 0.3, perDoc = new Map(), out = [];
  for (const { c, s } of scored) {
    if (s < floor || out.length >= k) break;
    const n = perDoc.get(c.doc.id) || 0;
    if (n >= 2) continue;                                              // at most two passages per document
    perDoc.set(c.doc.id, n + 1);
    out.push({ docId: c.doc.id, label: c.doc.label, mediaId: c.doc.mediaId || null, type: c.doc.type, pages: c.doc.pages || null, score: Number(s.toFixed(3)), text: c.text });
  }
  return out;
}

module.exports = { retrieve, tokenize, buildIndex };

/* ==========================================================================
   AIREV deck · "Ask the deck" — collapsible RAG assistant (chat.js)
   Vanilla ES2020, no build step, no dependencies, inline SVG icons. Fetches
   ./library.json once, builds a BM25 index over the document chunks in the
   browser and answers questions with cited, downloadable sources.
   API    : window.AirevChat = { open, close, toggle, isOpen, ask, ready, library, docs }
   Events : document → chat:ready, chat:opened, chat:closed, chat:answered
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------ configuration */
  const LIB_URL = 'library.json';
  const K1 = 1.5, B = 0.75;                                   // BM25 parameters
  const TOP_K = 8, FLOOR = 0.35, MAX_DOCS = 3, MAX_EXCERPT = 240;
  const SYNONYM_WEIGHT = 0.6;                                 // expansions weigh less than typed terms
  const TYPING_MIN = 450, TYPING_MAX = 800;                   // ms the typing dots are shown
  const INTRO = 'Ask me anything in the two-year strategy data room — every answer cites its source document and every source can be downloaded.';
  const UNAVAILABLE = 'Document library unavailable';
  const SUGGESTIONS = [
    'What is the Series A2 valuation and how was it derived?',
    'What does the Qualcomm licence pay per device?',
    'Summarise the VVIP Sovereign JV economics',
    'What is the Tenstorrent Galaxy fleet and what does it cost?',
    'How does the Kairoswealth combination work?'
  ];
  const STOP = new Set(('a an and are as at be but by can do does for from had has have how if in is it its of on or ' +
    'that the their there these they this to was we were what when where which who why will with would you your').split(' '));
  /* Light stemmer: [suffix, replacement], applied only when the stem stays ≥ 4 chars.
     "es" is limited to the sibilant cases (classes/taxes/matches) so devices → device, prices → price. */
  const STEM_RULES = [['ies', 'y'], ['sses', 'ss'], ['xes', 'x'], ['ches', 'ch'], ['shes', 'sh'], ['ing', ''], ['ed', ''], ['s', '']];
  const TOKEN_RE = /[a-z0-9]+(?:\.[0-9][a-z0-9]*)?/gi;        // words, numbers, "200m", "3.5m", "a2"
  const EXPAND = {
    valuation: ['pre-money', 'post-money', 'dcf', 'multiple', 'arr'],
    revenue: ['licensing', 'royalty', 'arr', 'billings'],
    jv: ['joint', 'venture', 'seats', 'partner'],
    qualcomm: ['tla', 'activated', 'unit', 'snapdragon'],
    tenstorrent: ['galaxy', 'blackhole', 'fleet', 'rack'],
    kairoswealth: ['merger', 'loi', 'aum', 'aua', 'category'],
    redington: ['distribution', 'reseller', 'price', 'card'],
    intel: ['panther', 'lake', 'ai', 'pc', 'mou'],
    africa: ['angola', 'luanda', 'solar', 'modular'],
    debt: ['blackrock', 'blackstone', 'infrastructure', 'facility'],
    bangalore: ['india', 'office', 'engineering']
  };
  /* Defence in depth: these names must never reach the screen, whatever the source text says. */
  const SCRUB = [
    [/presidential\s+court(?:'s)?/gi, 'VVIP Sovereign JV'],
    [/office of development affairs/gi, 'VVIP Sovereign JV'],
    [/\bathar\b/gi, 'VVIP Sovereign JV'],
    [/\bODA\b/g, 'VVIP Sovereign JV']
  ];
  const ICONS = {
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    send: '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
    docs: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>'
  };

  /* ---------------------------------------------------------------- utilities */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const scrub = (s) => SCRUB.reduce((t, [re, rep]) => t.replace(re, rep), String(s == null ? '' : s));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const truncate = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
  const emit = (name, detail) => document.dispatchEvent(new CustomEvent(name, { detail }));
  const docUrl = (d) => d.url || d.file || '#';
  const docType = (d) => String(d.type || (d.file || '').split('.').pop() || 'DOC').toUpperCase();
  const icon = (name, size = 16) =>
    `<svg data-testid="icon-${name}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" ` +
    `stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

  function fmtDate(v) {
    if (!v) return 'unknown';
    const d = new Date(v);
    return isNaN(d) ? String(v) : d.toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  /** Tiny element builder: h(tag, {attr, text, html}, children). `true` → boolean attribute. */
  function h(tag, attrs = {}, children = []) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v;
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (const c of [].concat(children)) if (c != null) n.append(c);
    return n;
  }

  /* ------------------------------------------------------- text processing */
  function stem(t) {
    for (const [suf, rep] of STEM_RULES) {
      if (!t.endsWith(suf)) continue;
      const s = t.slice(0, t.length - suf.length) + rep;
      if (s.length >= 4) return s;
    }
    return t;
  }

  /** lowercase → alphanumeric tokens (numbers kept) → drop stopwords / 1-char tokens → light stem */
  function tokenize(text) {
    const out = [];
    for (const m of String(text).toLowerCase().matchAll(TOKEN_RE)) {
      if (m[0].length >= 2 && !STOP.has(m[0])) out.push(stem(m[0]));
    }
    return out;
  }

  /** Query bag: Map token → weight. Typed terms count 1 each, synonyms SYNONYM_WEIGHT. */
  function queryBag(tokens) {
    const bag = new Map();
    for (const t of tokens) bag.set(t, (bag.get(t) || 0) + 1);
    for (const t of tokens) {
      for (const syn of EXPAND[t] || []) {
        for (const x of tokenize(syn)) if (!bag.has(x)) bag.set(x, SYNONYM_WEIGHT);
      }
    }
    return bag;
  }

  /** Escape, then wrap every word whose stem is a query token in <mark>. */
  function highlight(text, qset) {
    return text.split(new RegExp(`(${TOKEN_RE.source})`, 'i')).map((part, i) =>
      (i % 2 && qset.has(stem(part.toLowerCase()))) ? `<mark data-testid="chat-mark">${esc(part)}</mark>` : esc(part)).join('');
  }

  /* --------------------------------------------------------------- BM25 index */
  let library = [], index = null, libError = null;

  function buildIndex(docs) {
    const chunks = [], df = new Map();
    for (const doc of docs) {
      for (const c of doc.chunks || []) {
        const toks = tokenize(c.text || ''), tf = new Map();
        for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1);
        for (const t of tf.keys()) df.set(t, (df.get(t) || 0) + 1);
        chunks.push({ doc, id: c.id, page: c.page, text: String(c.text || ''), tf, len: toks.length });
      }
    }
    const N = chunks.length;
    const avgdl = (N ? chunks.reduce((s, c) => s + c.len, 0) / N : 0) || 1;
    const idf = new Map();
    for (const [t, n] of df) idf.set(t, Math.log(1 + (N - n + 0.5) / (n + 0.5)));
    return { chunks, idf, avgdl, N };
  }

  function score(chunk, bag) {
    let s = 0;
    for (const [t, w] of bag) {
      const f = chunk.tf.get(t);
      if (!f) continue;
      s += w * (index.idf.get(t) || 0) * (f * (K1 + 1)) / (f + K1 * (1 - B + B * chunk.len / index.avgdl));
    }
    return s;
  }

  /* ---------------------------------------------------------------- retrieval */
  /** Best sentence(s) of a chunk: prefer ≥ 2 query tokens, join at most 2, keep ≤ MAX_EXCERPT chars. */
  function pickExcerpt(text, bag) {
    const raw = text.split(/\.\s+/);
    const sents = raw.map((s, i) => s.trim() && (i < raw.length - 1 ? s.trim() + '.' : s.trim())).filter(Boolean);
    if (!sents.length) return '';
    const ranked = sents.map((s, i) => {
      const set = new Set(tokenize(s));
      let hits = 0;
      for (const t of bag.keys()) if (set.has(t)) hits++;
      return { s, i, hits };
    }).sort((a, b) => b.hits - a.hits || a.i - b.i);
    let pool = ranked.filter((x) => x.hits >= 2);
    if (!pool.length) pool = ranked.filter((x) => x.hits >= 1);
    if (!pool.length) pool = ranked.slice(0, 1);
    const chosen = [pool[0]];
    if (pool[1] && pool[0].s.length + pool[1].s.length + 1 <= MAX_EXCERPT) chosen.push(pool[1]);
    chosen.sort((a, b) => a.i - b.i);
    return clip(chosen.map((x) => x.s).join(' '), bag);
  }

  /** Clip to MAX_EXCERPT chars, windowed around the first query hit so the evidence survives the cut. */
  function clip(str, bag) {
    if (str.length <= MAX_EXCERPT) return str;
    let start = 0;
    for (const m of str.matchAll(TOKEN_RE)) {
      if (bag.has(stem(m[0].toLowerCase()))) { start = Math.max(0, m.index - 80); break; }
    }
    start = Math.min(start, str.length - MAX_EXCERPT);
    if (start > 0) start = str.indexOf(' ', start) + 1;         // snap to a word boundary
    let out = str.slice(start, start + MAX_EXCERPT - 2);
    const cutTail = start + out.length < str.length;
    if (cutTail) out = out.slice(0, Math.max(out.lastIndexOf(' '), Math.floor(MAX_EXCERPT * 0.6)));
    return (start > 0 ? '…' : '') + out.trim() + (cutTail ? '…' : '');
  }

  const cite = (doc, page) => ({ docId: doc.id, label: scrub(doc.label || doc.file || doc.id), url: docUrl(doc), page: page || null });

  /** Fallback when nothing scores: documents whose label shares a 4-letter prefix with a query term, then library order. */
  function closest(tokens) {
    const keys = tokens.map((t) => t.slice(0, 4)).filter((k) => k.length === 4);
    return library
      .map((d, i) => ({ d, i, n: keys.filter((k) => String(d.label || '').toLowerCase().includes(k)).length }))
      .sort((a, b) => b.n - a.n || a.i - b.i)
      .slice(0, MAX_DOCS)
      .map((x) => cite(x.d, null));
  }

  function retrieve(question) {
    const tokens = tokenize(question), bag = queryBag(tokens);
    const hits = index.chunks.map((c) => ({ c, s: score(c, bag) }))
      .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, TOP_K);
    if (!hits.length) {
      return { question, lead: 'I could not find that in the data room — closest documents:', items: [], cites: closest(tokens), empty: true };
    }
    const floor = hits[0].s * FLOOR, best = new Map();            // best chunk per document, in score order
    for (const x of hits) if (x.s >= floor && !best.has(x.c.doc.id)) best.set(x.c.doc.id, x);
    const items = [...best.values()].slice(0, MAX_DOCS)
      .map((x) => ({ ...cite(x.c.doc, x.c.page), excerpt: scrub(pickExcerpt(x.c.text, bag)) }));
    return {
      question,
      lead: scrub(`Here is what the data room says about “${truncate(question, 60)}”:`),
      items,
      cites: items.map(({ docId, label, url, page }) => ({ docId, label, url, page })),
      empty: false
    };
  }

  /* --------------------------------------------------------------------- DOM */
  let panel, launcher, thread, docsEl, docsList, docsToggle, closeBtn, form, input, send, typingEl, suggestEl;
  let opened = false, introShown = false, noteShown = false, queue = Promise.resolve();
  let readyResolve;
  /** Resolves (never rejects) with {docs, chunks[, error]} once library.json is indexed or has failed to load. */
  const ready = new Promise((r) => { readyResolve = r; });

  const avatar = () => h('div', { class: 'avatar', 'data-testid': 'chat-avatar', 'aria-hidden': 'true', text: 'AI' });

  function build() {
    launcher = h('button', { id: 'chat-launcher', type: 'button', 'data-testid': 'chat-launcher', 'aria-label': 'Ask the deck', 'aria-haspopup': 'dialog', 'aria-controls': 'chat-panel' }, [
      h('span', { class: 'chat-launcher-icon', 'data-testid': 'chat-launcher-icon', html: icon('chat', 16) }),
      h('span', { class: 'chat-launcher-label', 'data-testid': 'chat-launcher-label', text: 'Ask the deck' })
    ]);
    docsToggle = h('button', { id: 'chat-docs-toggle', type: 'button', class: 'chat-btn', 'data-testid': 'chat-docs-toggle', 'aria-expanded': 'false', 'aria-controls': 'chat-docs', title: 'Browse the library',
      html: icon('docs', 14) + '<span class="chat-btn-label" data-testid="chat-docs-toggle-label">Documents</span>' });
    closeBtn = h('button', { id: 'chat-close', type: 'button', class: 'chat-btn icon', 'data-testid': 'chat-close', 'aria-label': 'Close assistant', title: 'Close (Esc)', html: icon('close', 16) });
    docsList = h('div', { class: 'chat-docs-list', 'data-testid': 'chat-docs-list' });
    docsEl = h('section', { id: 'chat-docs', class: 'chat-docs', 'data-testid': 'chat-docs', hidden: true, 'aria-label': 'Library documents' }, docsList);
    thread = h('div', { id: 'chat-thread', class: 'chat-thread', 'data-testid': 'chat-thread', role: 'log', 'aria-live': 'polite' });
    input = h('input', { id: 'chat-input', 'data-testid': 'chat-input', type: 'text', placeholder: 'Ask about valuation, partners, the JV, hardware…', autocomplete: 'off', 'aria-label': 'Your question' });
    send = h('button', { id: 'chat-send', 'data-testid': 'chat-send', type: 'submit', 'aria-label': 'Send', title: 'Send', html: icon('send', 16) });
    form = h('form', { id: 'chat-form', class: 'chat-form', 'data-testid': 'chat-form' }, [input, send]);
    typingEl = h('div', { class: 'msg assistant chat-typing', 'data-testid': 'chat-typing', 'aria-label': 'Assistant is typing' }, [
      avatar(), h('div', { class: 'bubble', 'data-testid': 'chat-typing-bubble' }, [0, 1, 2].map(() => h('span', { class: 'dot', 'data-testid': 'chat-typing-dot' })))
    ]);
    panel = h('aside', { id: 'chat-panel', class: 'chat-panel closed', 'data-testid': 'chat-panel', role: 'dialog', 'aria-modal': 'false', 'aria-label': 'Document assistant', 'aria-hidden': 'true' }, [
      h('header', { class: 'chat-head', 'data-testid': 'chat-head' }, [
        h('div', { class: 'chat-head-text', 'data-testid': 'chat-head-text' }, [
          h('h2', { class: 'chat-title', 'data-testid': 'chat-title', text: 'AIREV Insights' }),
          h('p', { class: 'chat-sub', 'data-testid': 'chat-subtitle', text: 'Document assistant · answers cite the data room' })
        ]),
        h('div', { class: 'chat-head-actions', 'data-testid': 'chat-head-actions' }, [docsToggle, closeBtn])
      ]),
      docsEl,
      thread,
      h('footer', { class: 'chat-foot', 'data-testid': 'chat-foot' }, form)
    ]);
    document.body.append(launcher, panel);
  }

  function renderDocs() {
    docsList.replaceChildren();
    if (!library.length) return docsList.append(h('p', { class: 'chat-docs-empty', 'data-testid': 'chat-docs-empty', text: UNAVAILABLE }));
    for (const d of library) {
      const label = scrub(d.label || d.file || d.id);
      docsList.append(h('div', { class: 'chat-doc', 'data-testid': 'chat-doc', 'data-doc-id': d.id }, [
        h('span', { class: 'chat-badge', 'data-testid': 'chat-doc-type', text: docType(d) }),
        h('span', { class: 'chat-doc-main', 'data-testid': 'chat-doc-main' }, [
          h('span', { class: 'chat-doc-label', 'data-testid': 'chat-doc-label', title: label, text: label }),
          h('span', { class: 'chat-doc-meta', 'data-testid': 'chat-doc-expires', text: `link valid to ${fmtDate(d.expires)}` })
        ]),
        h('a', { class: 'chat-dl', 'data-testid': 'chat-dl', href: docUrl(d), target: '_blank', rel: 'noopener', download: true,
          title: `Download ${label}`, 'aria-label': `Download ${label}`, html: icon('download', 14) })
      ]));
    }
  }

  function scrollDown() { thread.scrollTop = thread.scrollHeight; }

  function addMsg(role, content) {
    const bubble = h('div', { class: 'bubble', 'data-testid': 'chat-bubble' }, content);
    const msg = h('div', { class: `msg ${role}`, 'data-testid': `chat-msg-${role}` }, role === 'assistant' ? [avatar(), bubble] : bubble);
    thread.append(msg);
    scrollDown();
    return msg;
  }

  function showIntro() {
    introShown = true;
    addMsg('assistant', h('p', { class: 'chat-lead', 'data-testid': 'chat-intro', text: INTRO }));
    suggestEl = h('div', { id: 'chat-suggestions', class: 'chat-suggestions', 'data-testid': 'chat-suggestions', role: 'group', 'aria-label': 'Suggested questions' },
      SUGGESTIONS.map((q) => h('button', { type: 'button', class: 'chat-suggestion', 'data-testid': 'chat-suggestion', text: q })));
    thread.append(suggestEl);
    if (libError) noteUnavailable();
    scrollDown();
  }

  function noteUnavailable() {
    if (noteShown) return;
    noteShown = true;
    addMsg('assistant', h('p', { class: 'chat-lead chat-warn', 'data-testid': 'chat-unavailable',
      text: `${UNAVAILABLE} — the data-room index could not be loaded, so answers cannot cite sources right now.` }));
  }

  function citeChip(c) {
    const label = truncate(c.label, 34) + (c.page ? ` · p.${c.page}` : '');
    return h('span', { class: 'chat-cite', 'data-testid': 'chat-cite', 'data-doc-id': c.docId }, [
      h('a', { class: 'chat-cite-label', 'data-testid': 'chat-cite-label', href: c.url, target: '_blank', rel: 'noopener', title: `Open ${c.label}`, text: label }),
      h('a', { class: 'chat-cite-dl', 'data-testid': 'chat-cite-dl', href: c.url, target: '_blank', rel: 'noopener', download: true,
        title: `Download ${c.label}`, 'aria-label': `Download ${c.label}`, html: icon('download', 12) })
    ]);
  }

  function renderAnswer(ans, qset) {
    const parts = [h('p', { class: 'chat-lead', 'data-testid': 'chat-lead', text: ans.lead })];
    if (ans.items.length) {
      parts.push(h('ul', { class: 'chat-excerpts', 'data-testid': 'chat-excerpts' }, ans.items.map((it) =>
        h('li', { class: 'chat-excerpt', 'data-testid': 'chat-excerpt', 'data-doc-id': it.docId }, [
          h('span', { class: 'chat-excerpt-src', 'data-testid': 'chat-excerpt-src', text: it.label + (it.page ? ` · p.${it.page}` : '') }),
          h('span', { class: 'chat-excerpt-text', 'data-testid': 'chat-excerpt-text', html: highlight(it.excerpt, qset) })
        ]))));
    }
    if (ans.cites.length) parts.push(h('div', { class: 'chat-cites', 'data-testid': 'chat-cites' }, ans.cites.map(citeChip)));
    addMsg('assistant', parts);
  }

  /* --------------------------------------------------------------- behaviour */
  function setBusy(b) { send.disabled = b; thread.setAttribute('aria-busy', String(b)); }

  async function answer(q) {
    setBusy(true);
    if (suggestEl) { suggestEl.remove(); suggestEl = null; }
    addMsg('user', h('span', { class: 'chat-user-text', 'data-testid': 'chat-user-text', text: scrub(q) }));
    await ready;                                                // index (or its failure) is known from here on
    thread.append(typingEl);
    scrollDown();
    await sleep(TYPING_MIN + Math.random() * (TYPING_MAX - TYPING_MIN));
    const ans = index
      ? retrieve(q)
      : { question: q, lead: `${UNAVAILABLE} — I cannot search the data room right now.`, items: [], cites: [], empty: true };
    typingEl.remove();
    renderAnswer(ans, new Set(tokenize(q)));
    setBusy(false);
    emit('chat:answered', ans);
    return ans;
  }

  /** Ask a question; answers are serialised so rapid calls never interleave in the thread. */
  function ask(question) {
    const q = String(question == null ? '' : question).trim();
    if (!q) return Promise.resolve(null);
    ensure();
    open();
    const run = queue.then(() => answer(q));
    queue = run.catch(() => {});
    return run;
  }

  function open() {
    ensure();
    if (opened) return;
    opened = true;
    panel.classList.remove('closed');
    panel.removeAttribute('aria-hidden');
    launcher.hidden = true;
    if (!introShown) showIntro();
    input.focus({ preventScroll: true });
    emit('chat:opened');
  }

  function close() {
    if (!opened) return;
    opened = false;
    launcher.hidden = false;
    if (panel.contains(document.activeElement)) launcher.focus({ preventScroll: true });
    panel.classList.add('closed');
    panel.setAttribute('aria-hidden', 'true');
    emit('chat:closed');
  }

  function bind() {
    launcher.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    docsToggle.addEventListener('click', () => {
      const show = docsEl.hidden;
      docsEl.hidden = !show;
      docsToggle.setAttribute('aria-expanded', String(show));
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      input.value = '';
      ask(q);
    });
    thread.addEventListener('click', (e) => {
      const chip = e.target.closest('.chat-suggestion');
      if (chip) { ask(chip.textContent); input.focus({ preventScroll: true }); }
    });
    /* Escape closes the panel and is swallowed in the capture phase so the deck's own Escape
       handler on window never sees it. No other key is intercepted. */
    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || !opened) return;
      e.stopImmediatePropagation();
      e.preventDefault();
      close();
    }, { capture: true });
  }

  async function load() {
    try {
      const res = await fetch(LIB_URL);
      if (!res.ok) throw new Error(`${LIB_URL} responded ${res.status}`);
      const data = await res.json();
      library = Array.isArray(data && data.docs) ? data.docs : [];
      index = buildIndex(library);
    } catch (err) {                                             // missing/invalid library: degrade quietly
      libError = (err && err.message) || String(err);
      library = [];
      index = null;
      if (introShown) noteUnavailable();
    }
    renderDocs();
    const detail = { docs: library.length, chunks: index ? index.N : 0, ...(libError ? { error: libError } : {}) };
    readyResolve(detail);
    emit('chat:ready', detail);
  }

  function init() { if (!panel && document.body) { build(); bind(); load(); } }
  const ensure = () => { if (!panel) init(); };

  /* ------------------------------------------------------------- public API */
  window.AirevChat = {
    open, close, toggle: () => (opened ? close() : open()), isOpen: () => opened, ask, ready,
    get library() { return library; },
    docs: () => library.map((d) => ({ id: d.id, label: scrub(d.label || d.file || d.id), url: docUrl(d), type: docType(d), expires: d.expires }))
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

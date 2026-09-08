/* Display mode — "Full" shows every counterparty; "Presentation" redacts the sensitive ones deck-wide
   (text nodes, title/alt/aria attributes, logos, tooltips and the Ask-the-deck exchange; the VVIP Sovereign JV keeps its alias in both modes) and persists in
   localStorage. Everything that is redacted keeps its original value so switching back is lossless. */
(function () {
  'use strict';
  const KEY = 'airev-deck-mode';
  const RULES = [
    [/Kairos\s?wealth(?:\s(?:Prive|Holding|Prive Limited|Holding Limited))?/gi, 'Confidential Partner B'],
    [/B Capital(?:\sGroup)?/g, 'Confidential Partner A'],
    /* investor names on the capital cards (8 Sep 2026) — Core42 stays: it is a named MSA / sovereign-cloud partner across the deck.
       'VVIP Sovereign JV' is itself the anonymised name of the sovereign counterparty and is shown as-is in both modes (rule removed 8 Sep 2026). */
    [/Titian(?:\s+Capital)?(?:\s+RSC(?:\s+Ltd\.?)?)?/g, 'Confidential Partner C'],
    [/Venture\s?[Ww]ave(?:\s+Capital(?:\s+No\.?\s*9)?(?:\s+Limited)?)?/g, 'Confidential Partner D'],
    [/Further Ventures\s*\/\s*Nabyl|Nabyl(?:\s*\(Further Ventures\))?|Further Ventures/g, 'Confidential Partner E'],
    [/Eyad(?:\s+Yousif(?:\s+Ibrahim)?)?\s+Omari|E\.\s?Omari|\bOmari\b/g, 'Confidential Partner F'],
    [/Robert(?:\s+John)?\s+Grim|Bob\s+Grim|\bGrim\b/g, 'Confidential Partner G'],
    [/David(?:\s+Bradley)?\s+Bennett|\bBennett\b/g, 'Confidential Partner H'],
    [/Inveniam(?:\s+Middle\s+East)?(?:\s+Ltd)?/g, 'Confidential Partner I'],
    [/Itqan(?:\s+Financial\s+Services(?:\s+WLL)?|\s+Investments)?/g, 'Confidential Partner J'],
    /* founders are shown by their SHA initials only (Cl. 1.1: OT, YY, KU) */
    [/Olu Melville Thomas(?:\s*\(OT\))?/g, 'OT'],
    [/Youssef Ahmad Youssef(?:\s*\(YY\))?/g, 'YY'],
    [/Kayaan Keki Unwalla(?:\s*\(KU\))?/g, 'KU']
  ];
  const SENSITIVE = /Kairos\s?wealth|B Capital|Titian|Venture\s?wave|Nabyl|Further Ventures|Omari|\bGrim\b|Bennett|Inveniam|Itqan|Olu Melville|Youssef Ahmad|Kayaan Keki/i;
  const ATTRS = ['title', 'alt', 'aria-label', 'data-title', 'placeholder', 'data-cap'];
  const BADGE = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 132 40"><rect width="132" height="40" rx="8" fill="#0E332C"/><text x="66" y="25" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="11.5" font-weight="600" letter-spacing="1.5" fill="#E4CB8C">CONFIDENTIAL</text></svg>');
  const redact = (s) => { s = String(s == null ? '' : s); for (const [re, rep] of RULES) s = s.replace(re, rep); return s; };
  const text = (s) => (mode === 'presentation' ? redact(s) : String(s == null ? '' : s)); /* mode-aware: what callers should use */
  const savedText = new Map(), savedAttr = new Map(), savedSrc = new Map();
  let mode = localStorage.getItem(KEY) === 'presentation' ? 'presentation' : 'full';
  let applying = false;

  function redactImg(el) {
    const orig = (savedAttr.get(el) || {}).alt || el.getAttribute('alt') || el.getAttribute('data-partner') || '';
    if (SENSITIVE.test(orig) && !savedSrc.has(el)) {
      savedSrc.set(el, el.getAttribute('src'));
      el.setAttribute('src', BADGE); el.classList.add('redacted-logo');
    }
  }
  function redactElementAttrs(el) {
    if (!el.getAttribute) return;
    ATTRS.forEach((a) => {
      const v = el.getAttribute(a);
      if (v && SENSITIVE.test(v)) {
        const m = savedAttr.get(el) || {};
        if (!(a in m)) { m[a] = v; savedAttr.set(el, m); }
        el.setAttribute(a, redact(m[a]));
      }
    });
    if (el.tagName === 'IMG') redactImg(el);
  }
  function redactNode(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      if (SENSITIVE.test(root.nodeValue)) { if (!savedText.has(root)) savedText.set(root, root.nodeValue); root.nodeValue = redact(savedText.get(root)); }
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.nodeType === 1 && root.closest('#modeswitch,#mode-pill')) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => {
      const p = n.parentElement;
      if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.tagName) || p.closest('#modeswitch,#mode-pill')) return NodeFilter.FILTER_REJECT;
      return SENSITIVE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    } });
    const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => { if (!savedText.has(n)) savedText.set(n, n.nodeValue); n.nodeValue = redact(savedText.get(n)); });
    const els = root.nodeType === 1 ? [root].concat(Array.from(root.querySelectorAll('*'))) : Array.from(root.querySelectorAll('*'));
    els.forEach(redactElementAttrs);
  }
  function restoreAll() {
    savedText.forEach((v, n) => { n.nodeValue = v; }); savedText.clear();
    savedAttr.forEach((m, el) => { for (const a in m) el.setAttribute(a, m[a]); }); savedAttr.clear();
    savedSrc.forEach((src, el) => { el.setAttribute('src', src); el.classList.remove('redacted-logo'); }); savedSrc.clear();
  }
  function paint() {
    document.body.classList.toggle('mode-presentation', mode === 'presentation');
    document.querySelectorAll('#modeswitch .ms-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
  }
  function apply() {
    applying = true;
    try { if (mode === 'presentation') redactNode(document.body); else restoreAll(); paint(); }
    finally { applying = false; }
    document.dispatchEvent(new CustomEvent('deckmodechange', { detail: { mode } }));
  }
  function set(next) {
    next = next === 'presentation' ? 'presentation' : 'full';
    if (next === mode) { paint(); return; }
    mode = next;
    try { localStorage.setItem(KEY, mode); } catch (e) { /* private mode */ }
    apply();
  }
  /* anything rendered later (routes grid, quarter tabs, charts, chat bubbles, Silk Road tooltips) is redacted on arrival */
  const mo = new MutationObserver((muts) => {
    if (applying || mode !== 'presentation') return;
    applying = true;
    try {
      muts.forEach((m) => {
        if (m.type === 'childList') m.addedNodes.forEach(redactNode);
        else if (m.type === 'characterData') redactNode(m.target);
        else if (m.type === 'attributes') redactElementAttrs(m.target);
      });
    } finally { applying = false; }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS.concat(['src']) });

  /* Ask the deck: in Presentation mode the question carries the redaction instruction, and the rendered answer
     is redacted client-side as well (belt and braces). */
  const _fetch = window.fetch;
  window.fetch = function (input, init) {
    try {
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      if (mode === 'presentation' && init && typeof init.body === 'string' && /\/api\/chat/.test(url)) {
        const b = JSON.parse(init.body);
        if (b && typeof b.query === 'string') {
          b.query += ' (Presentation mode: refer to B Capital only as "Confidential Partner A", to Kairoswealth only as "Confidential Partner B", and to the investors Titian, Venturewave, Nabyl / Further Ventures, Eyad Omari, Robert Grim, David Bennett, Inveniam and Itqan only as "Confidential Partner C" to "J" respectively, and to the founders only by their initials OT, YY and KU; the sovereign counterparty is always called the VVIP Sovereign JV; never use those real names in your answer.)';
          init = Object.assign({}, init, { body: JSON.stringify(b) });
        }
      }
    } catch (e) { /* leave the request untouched */ }
    return _fetch.call(this, input, init);
  };

  /* UI: segmented control in the bottom bar + "M" key */
  document.querySelectorAll('#modeswitch .ms-btn').forEach((b) => b.addEventListener('click', () => set(b.dataset.mode)));
  addEventListener('keydown', (e) => {
    if (e.target && e.target.matches && e.target.matches('input,textarea')) return;
    if (e.key === 'm' || e.key === 'M') { e.preventDefault(); set(mode === 'full' ? 'presentation' : 'full'); }
  });
  window.deckMode = { get mode() { return mode; }, set, toggle: () => set(mode === 'full' ? 'presentation' : 'full'), text, redact, isSensitive: (s) => SENSITIVE.test(String(s || '')), rules: RULES.map(([re, rep]) => ({ pattern: re.source, replacement: rep })) };
  apply();
})();

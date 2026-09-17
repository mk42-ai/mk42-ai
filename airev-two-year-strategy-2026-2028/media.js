/* AIREV Two-Year Strategy — hero media controller (17 Sep 2026)
   Plays the looping hero video of the ACTIVE card only and pauses every other one; the deck's own hooks are used
   (the `stepchange` / `deckready` events from deck.js and body.overview for the Strategy Map).
   • prefers-reduced-motion: reduce (or ?motion=reduce, or html.reduce-motion) → never autoplays; the poster <picture>
     shows and a small "Play motion" control lets the reader opt in per card.
   • Strategy Map (O / Esc): every loop pauses and the CSS hides the <video>, so the thumbnails show the posters.
   • Print (P key / Print button / Ctrl-P): beforeprint pauses everything and forces the lazy posters to load; the print
     stylesheet hides <video> and prints the poster at full card size. afterprint resumes the active card.
   • Hash navigation (#1–#34): a hashchange flies the deck to that card (deck.js reads the hash only at boot), which
     pauses the previous loop and starts the new one through `stepchange`.
   • Presentation-mode redaction (mode.js) is untouched — nothing here carries counterparty text. */
(function () {
  const wraps = [...document.querySelectorAll('.hero-media')];
  if (!wraps.length) return;
  const vids = wraps.map((w) => w.querySelector('video.hero-video')).filter(Boolean);
  const mq = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false, addEventListener() {} };
  const params = new URLSearchParams(location.search);
  const forced = params.get('motion') === 'reduce';
  const reduce = () => forced || mq.matches || document.documentElement.classList.contains('reduce-motion');
  let printing = false;
  if (forced) document.documentElement.classList.add('reduce-motion');

  const stepOf = (el) => el.closest('.step');
  const wrapOf = (v) => v.closest('.hero-media');
  const isActive = (v) => { const s = stepOf(v); return !!(s && s.classList.contains('active')); };
  const shouldPlay = (v) => !printing && !document.hidden && !document.body.classList.contains('overview') && isActive(v) &&
    (!reduce() || wrapOf(v).classList.contains('user-play'));

  vids.forEach((v) => {
    v.muted = true; v.defaultMuted = true; v.loop = true; v.setAttribute('playsinline', '');
    v.addEventListener('playing', () => wrapOf(v).classList.add('playing'));
    v.addEventListener('play', () => { if (!shouldPlay(v)) v.pause(); });   /* a late autoplay on a non-active card is stopped */
    v.addEventListener('error', () => wrapOf(v).classList.remove('playing')); /* the poster stays */
  });

  function play(v) {
    if (v.preload !== 'auto') v.preload = 'auto';
    const p = v.play();
    if (p && p.catch) p.catch(() => { /* autoplay refused → the poster stays visible */ });
  }
  function sync() {
    vids.forEach((v) => {
      if (shouldPlay(v)) { if (v.paused) play(v); }
      else { if (v.autoplay) v.autoplay = false; if (!v.paused) v.pause(); }
    });
    warmNext();
  }

  /* the next hero card's loop is fetched ahead so arrow-key navigation starts it without a stall */
  function warmNext() {
    const steps = window.deck && window.deck.steps; if (!steps) return;
    const cur = window.deck.current;
    for (let j = cur + 1; j < Math.min(steps.length, cur + 6); j++) {
      const v = steps[j].querySelector('.hero-media video.hero-video');
      if (v) { if (v.preload !== 'auto' && !reduce()) v.preload = 'auto'; break; }
    }
  }
  /* posters are lazy for first paint; once the deck is idle they are pulled in so the Strategy Map and a print always have them */
  let warmed = false;
  function warmPosters() {
    if (warmed) return; warmed = true;
    document.querySelectorAll('.hero-media img[loading="lazy"]').forEach((img) => { img.loading = 'eager'; });
  }
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1));
  window.addEventListener('load', () => setTimeout(() => idle(warmPosters), 2500));

  /* reduced motion → per-card opt-in control */
  wraps.forEach((w) => {
    const v = w.querySelector('video.hero-video'); if (!v) return;
    const host = w.classList.contains('step') ? w.querySelector('.hero-media-stack') : w;
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'motion-toggle'; b.setAttribute('aria-pressed', 'false'); b.textContent = 'Play motion';
    b.title = 'Reduced motion is on — play this card\u2019s loop';
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const on = !w.classList.contains('user-play');
      w.classList.toggle('user-play', on); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Pause motion' : 'Play motion';
      if (on) play(v); else v.pause();
    });
    b.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') e.stopPropagation(); }); /* the deck must not advance */
    host.appendChild(b);
  });

  /* hooks */
  document.addEventListener('stepchange', sync);
  document.addEventListener('deckready', sync);
  document.addEventListener('visibilitychange', sync);
  new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  mq.addEventListener && mq.addEventListener('change', () => { document.documentElement.classList.toggle('reduce-motion', reduce()); sync(); });
  window.addEventListener('beforeprint', () => { printing = true; warmPosters(); vids.forEach((v) => { if (!v.paused) v.pause(); }); });
  window.addEventListener('afterprint', () => { printing = false; sync(); });
  window.addEventListener('hashchange', () => {
    const n = parseInt((location.hash || '#1').slice(1), 10);
    if (window.deck && n >= 1 && n <= window.deck.steps.length && window.deck.current !== n - 1) window.deck.goTo(n - 1);
    else sync();
  });
  window.deckMedia = { videos: vids, sync, get reduced() { return reduce(); }, setReduced(on) { document.documentElement.classList.toggle('reduce-motion', !!on); sync(); } };
  sync();
})();

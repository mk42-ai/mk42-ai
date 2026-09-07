/* The Silk Road for AI — a fully coded world-map graph (inline SVG + JS, no raster image).
   Animated trade arcs radiate from the UAE hub to the five export lanes; hovering or clicking a lane, its arc or
   its legend chip shows the named routes, partners and 2027 proof → 2028 scale milestones. Tooltip text goes
   through window.deckMode.text() so Presentation mode redacts Kairoswealth / VVIP Sovereign JV / B Capital. */
(function () {
  'use strict';
  const stage = document.getElementById('sr-stage'); if (!stage || !window.SILKROAD_LAND) return;
  const mapEl = document.getElementById('sr-map'), tip = document.getElementById('sr-tip'), lanesEl = document.getElementById('sr-lanes');
  const P = window.SILKROAD_PROJ;
  const proj = (lon, lat) => [(lon + 180) / 360 * P.w, (P.latTop - lat) / (P.latTop - P.latBot) * P.h];
  const HUB = { name: 'UAE hub · Abu Dhabi', lon: 54.65, lat: 24.45 };
  const LANES = [
    { id: 'na', name: 'North America', place: 'Washington, D.C.', lon: -77.04, lat: 38.9, routes: 'WWT · Cisco · NetApp · Qualcomm / Intel co-sell', p27: 'first US public-sector PO', p28: '≥2 agency estates · ≥20% of bookings', logos: ['wwt.png', 'cisco.png', 'netapp.png', 'qualcomm.png', 'intel.png'], dur: 9 },
    { id: 'gcc', name: 'GCC / MENA', place: 'Riyadh · Doha · Kuwait · Manama', lon: 46.72, lat: 24.69, routes: 'Redington · Alpha Data · UXE · Moro Hub · e& · Core42 / ADQ', p27: 'VVIP Sovereign JV live; e& activation waves', p28: 'KSA, Qatar, Kuwait, Bahrain estates', logos: ['redington.png', 'alpha-data.png', 'uxe.png', 'moro-hub.svg', 'eand.svg', 'core42.png'], dur: 6 },
    { id: 'af', name: 'Africa · Luanda', place: 'Luanda, Angola', lon: 13.23, lat: -8.84, routes: 'Redington Africa · ADEX / ADFD · Masdar · Space42', p27: 'Luanda hub funded and under build', p28: 'Luanda live · second CEPA country', logos: ['redington.png', 'adex.png', 'adfd.svg', 'masdar.svg', 'space42.png'], dur: 8 },
    { id: 'eu', name: 'Europe', place: 'Sofia — WISER lighthouse', lon: 23.32, lat: 42.7, routes: 'WISER · Intel AI PC channel', p27: 'lighthouse case', p28: '2–3 references', logos: ['wiser.png', 'intel.png'], dur: 7 },
    { id: 'sa', name: 'South & SE Asia · Bangalore', place: 'Bangalore, India', lon: 77.59, lat: 12.97, routes: 'Redington SISA · Bangalore hub · Kairoswealth corridors', p27: 'Bangalore office · India pilot', p28: 'scale-market entries', logos: ['redington.png', 'kairoswealth.svg'], dur: 6.5 }
  ];
  const R = (s) => (window.deckMode ? window.deckMode.text(s) : s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const [hx, hy] = proj(HUB.lon, HUB.lat);

  function arcPath(x0, y0, x1, y1) {
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0, d = Math.hypot(dx, dy) || 1;
    const nx = -dy / d, ny = dx / d;                   /* unit normal */
    const lift = Math.min(150, 0.32 * d) * (ny < 0 ? 1 : -1); /* always bow the arc northwards */
    return `M${x0.toFixed(1)} ${y0.toFixed(1)} Q${(mx + nx * lift).toFixed(1)} ${(my + ny * lift).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  /* graticule */
  let grat = '';
  for (let lon = -150; lon <= 180; lon += 30) { const [x] = proj(lon, 0); grat += `<line x1="${x.toFixed(1)}" y1="0" x2="${x.toFixed(1)}" y2="${P.h}"/>`; }
  for (let lat = -30; lat <= 60; lat += 30) { const [, y] = proj(0, lat); grat += `<line x1="0" y1="${y.toFixed(1)}" x2="${P.w}" y2="${y.toFixed(1)}"/>`; }
  let arcs = '', nodes = '';
  LANES.forEach((L, i) => {
    const [x, y] = proj(L.lon, L.lat); L.x = x; L.y = y; L.d = arcPath(hx, hy, x, y);
    arcs += `<g class="sr-lane-g" data-lane="${L.id}">
      <path id="sr-arc-${L.id}" class="sr-arc" d="${L.d}"/>
      <path class="sr-arc-flow" d="${L.d}" style="animation-duration:${(L.dur * 0.55).toFixed(2)}s"/>
      <path class="sr-arc-hit" d="${L.d}"/>
      <circle class="sr-comet" r="4.2"><animateMotion dur="${L.dur}s" begin="${(i * 0.9).toFixed(1)}s" repeatCount="indefinite" rotate="auto"><mpath href="#sr-arc-${L.id}"/></animateMotion></circle>
    </g>`;
    const anchor = x > hx + 40 ? 'start' : (x < hx - 40 ? 'end' : 'middle');
    const tx = anchor === 'start' ? x + 12 : anchor === 'end' ? x - 12 : x, ty = y + (L.id === 'af' ? 22 : -14);
    nodes += `<g class="sr-node" data-lane="${L.id}" tabindex="0" role="button" aria-label="${esc(L.name)}">
      <circle class="sr-ring" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9"/><circle class="sr-ring sr-ring2" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9"/>
      <circle class="sr-pt" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.6"/>
      <text class="sr-lbl" x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="${anchor}">${esc(L.name)}</text>
    </g>`;
  });
  mapEl.innerHTML = `<svg class="sr-svg" viewBox="0 0 ${P.w} ${P.h}" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby="sr-title">
    <title id="sr-title">The Silk Road for AI — export arcs from the UAE hub to five lanes</title>
    <defs>
      <radialGradient id="sr-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#E4CB8C" stop-opacity=".55"/><stop offset="1" stop-color="#E4CB8C" stop-opacity="0"/></radialGradient>
      <filter id="sr-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="2.2"/></filter>
    </defs>
    <rect class="sr-sea" width="${P.w}" height="${P.h}"/>
    <g class="sr-grat">${grat}</g>
    <path class="sr-land" d="${window.SILKROAD_LAND}"/>
    <g class="sr-arcs">${arcs}</g>
    <g class="sr-hub" tabindex="0" role="button" aria-label="${esc(HUB.name)}">
      <circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="34" fill="url(#sr-glow)"/>
      <circle class="sr-hub-ring" cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="14"/><circle class="sr-hub-ring sr-hub-ring2" cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="14"/>
      <circle class="sr-hub-pt" cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="6.5"/>
      <text class="sr-lbl sr-hub-lbl" x="${(hx + 14).toFixed(1)}" y="${(hy + 30).toFixed(1)}">Abu Dhabi · UAE hub</text>
    </g>
    <g class="sr-nodes">${nodes}</g>
  </svg>`;
  const svg = mapEl.querySelector('svg');

  /* legend chips under the map (also selectors) */
  lanesEl.innerHTML = LANES.map((L) => `<button type="button" class="sr-lane" role="tab" data-lane="${L.id}" aria-selected="false">
      <span class="sr-lane-n">${esc(L.name)}</span><span class="sr-lane-r">${esc(L.routes)}</span>
      <span class="sr-lane-m"><b>2027</b> ${esc(L.p27)} ○ <i>→</i> <b>2028</b> ${esc(L.p28)} ○</span></button>`).join('');

  let active = null, pinned = false;
  function tipHtml(L) {
    const logos = L.logos.map((f) => `<img src="assets/logos/${f}" alt="${esc(R(f.replace(/\.(png|svg)$/, '').replace(/-/g, ' ')))}">`).join('');
    return `<div class="sr-tip-h"><span class="sr-tip-k">Lane</span><b>${esc(R(L.name))}</b><span class="sr-tip-place">${esc(R(L.place))}</span></div>
      <div class="sr-tip-row"><span class="sr-tip-k">Named routes</span><span>${esc(R(L.routes))}</span></div>
      <div class="sr-tip-logos">${logos}</div>
      <div class="sr-tip-row"><span class="sr-tip-k">2027 · proof</span><span>${esc(R(L.p27))} ○</span></div>
      <div class="sr-tip-row"><span class="sr-tip-k">2028 · scale</span><span>${esc(R(L.p28))} ○</span></div>
      <div class="sr-tip-foot">${pinned ? 'Pinned · click again or press Esc to release' : 'Click to pin'}</div>`;
  }
  function placeTip(L) {
    const sr = stage.getBoundingClientRect(), vr = svg.getBoundingClientRect();
    const k = sr.width / stage.offsetWidth || 1;           /* the deck scales the whole card — convert screen px back to CSS px */
    const sx = vr.width / P.w, sy = vr.height / P.h;
    let left = (vr.left - sr.left) / k + L.x * sx / k + 14, top = (vr.top - sr.top) / k + L.y * sy / k - 12;
    tip.hidden = false;
    const tw = tip.offsetWidth, th = tip.offsetHeight, W = stage.offsetWidth, H = stage.offsetHeight;
    if (left + tw > W - 10) left = (vr.left - sr.left) / k + L.x * sx / k - tw - 14;
    if (left < 10) left = 10;
    if (top + th > H - 10) top = H - th - 10;
    if (top < 10) top = 10;
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
  }
  function show(id, opts) {
    const L = LANES.find((l) => l.id === id); if (!L) return;
    if (opts && opts.pin) pinned = !(pinned && active === id);
    active = id;
    stage.classList.add('has-active');
    stage.querySelectorAll('[data-lane]').forEach((el) => el.classList.toggle('on', el.dataset.lane === id));
    lanesEl.querySelectorAll('.sr-lane').forEach((b) => { const on = b.dataset.lane === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', String(on)); });
    tip.innerHTML = tipHtml(L); tip.dataset.lane = id; tip.classList.toggle('pinned', pinned);
    placeTip(L);
  }
  function hide(force) {
    if (pinned && !force) return;
    pinned = false; active = null; tip.hidden = true; tip.classList.remove('pinned');
    stage.classList.remove('has-active');
    stage.querySelectorAll('[data-lane].on').forEach((el) => el.classList.remove('on'));
    lanesEl.querySelectorAll('.sr-lane.on').forEach((b) => { b.classList.remove('on'); b.setAttribute('aria-selected', 'false'); });
  }
  const laneOf = (t) => { const el = t && t.closest ? t.closest('[data-lane]') : null; return el ? el.dataset.lane : null; };
  svg.addEventListener('pointerover', (e) => { const id = laneOf(e.target); if (id && !pinned) show(id); });
  svg.addEventListener('pointerout', (e) => { const id = laneOf(e.target); const to = laneOf(e.relatedTarget); if (id && !to && !pinned) hide(); });
  svg.addEventListener('click', (e) => { const id = laneOf(e.target); if (id) { show(id, { pin: true }); e.stopPropagation(); } else hide(true); });
  svg.addEventListener('keydown', (e) => { const id = laneOf(e.target); if (id && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); show(id, { pin: true }); } });
  lanesEl.addEventListener('pointerover', (e) => { const id = laneOf(e.target); if (id && !pinned) show(id); });
  lanesEl.addEventListener('pointerout', (e) => { const id = laneOf(e.target); if (id && !laneOf(e.relatedTarget) && !pinned) hide(); });
  lanesEl.addEventListener('click', (e) => { const id = laneOf(e.target); if (id) show(id, { pin: true }); });
  tip.addEventListener('click', (e) => e.stopPropagation());
  stage.addEventListener('click', (e) => { if (!laneOf(e.target) && !tip.contains(e.target)) hide(true); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && (pinned || active)) hide(true); });
  document.addEventListener('deckmodechange', () => { if (active) show(active); });
  addEventListener('resize', () => { if (active) placeTip(LANES.find((l) => l.id === active)); });
  window.silkRoad = { lanes: LANES.map((l) => l.id), show: (id) => show(id, { pin: true }), hide: () => hide(true), get active() { return active; }, get pinned() { return pinned; } };
})();

/* AIREV Insights — advanced voice mode.
 * Narrates every slide with an American female voice.
 * Primary engine: OnDemand Services API text-to-audio (model tts-1, voice "nova")
 * via this app's /api/tts proxy (API key stays server-side, never in this file).
 * Fallback engine: browser speechSynthesis with an en-US female voice.
 * Controls: voice orb (start/stop), play/pause, replay, auto-narrate toggle.
 */
(function () {
  'use strict';
  if (!window.AIREVDECK) return;

  /* ---------- per-slide narration scripts (keyed by data-narr) ---------- */
  var NARR = {
    "cover": "Welcome to the AIREV strategic overview, prepared for the chairman on the thirtieth of August, twenty twenty six. This is a private and confidential interactive briefing, designed to walk through where AIREV stands today, the strategic partnerships fueling our growth, and the path forward as we advance this fundraising process. Please navigate through each section at your own pace.",
    "where-we-stand": "Today, the OnDemand platform serves over four million users worldwide, powered by more than three hundred AI agents operating in over fifty languages. In the second quarter of twenty twenty six, the platform processed six point eight trillion tokens, roughly six times the volume from the same period one year earlier. This scale reflects consistent, compounding platform adoption.",
    "intel-partnership": "In October twenty twenty five, AIREV announced a strategic partnership with Intel to optimize the OnDemand platform on Intel Xeon processors and Gaudi AI accelerators. The companies committed to a joint go to market plan built around shared selling, shared marketing, demonstrations, pilots, and workshops. Leaders from both organizations, including AIREV's founder and CEO and Intel's commercial and regional executives, voiced strong support for the partnership.",
    "intel-ondevice": "In December twenty twenty five, AIREV expanded the partnership by bringing all three hundred plus OnDemand AI agents fully on device to Intel's next generation AI PCs, removing any dependence on the cloud. This milestone was endorsed by doctor Thani bin Ahmed Al Zeyoudi, the UAE Minister for Foreign Trade and AIREV's chairman, reinforcing confidence in sovereign, on device intelligence.",
    "qualcomm": "AIREV has signed a strategic agreement with Qualcomm to integrate the OnDemand platform with Qualcomm's Dragonwing product line, including the Dragonwing AI On Prem Appliance for sovereign AI deployments. This agreement makes AIREV the first UAE company to sell AI software to a Fortune fifty company. Leaders from both companies, including AIREV's chairman and founder and Qualcomm's senior vice president for EMEA, welcomed the milestone.",
    "community-pulse": "Across developer and technology communities, sentiment around AI is shifting. Data center construction has surged past fifty billion dollars, creating divisions within American labor unions. Communities are also weighing the AI training data gig economy, a Debian vote dividing open source over AI, and open weight AI companies becoming acquisition targets. Consumer backlash against cloud AI is growing, and AIREV's sovereign, on device approach directly answers these privacy concerns.",
    "pipeline": "AIREV's pipeline today includes fifty five tracked deals worth forty one point eight million dollars in open opportunity. Leading deals include the Intel AI PC preload at fourteen million dollars, Tenstorrent's OEM preload at ten million dollars, and ADNOC Energy AI at just over two million dollars, alongside two million dollar resell motions with Qualcomm, Dell, Cisco, and AWS, plus roughly thirty more UAE deals and BNFITS already closed.",
    "position": "Where we stand. AIREV carries a two hundred fifteen million dollar current mark, built on roughly ten million dollars of primary capital raised since inception. Revenue has moved from one million to one point two million, and is projected to reach six million dollars in year three, roughly five times year over year, while annual burn holds near four and a half million dollars. For every ten million invested, roughly twenty times equity value has been created. Arithmetic, not adjectives.",
    "revenue": "This slide presents AIREV's revenue snapshot as an interactive timeline. As you move through it, key revenue milestones appear, tracing how the business has grown over time. Hover over each point on the timeline to reveal further detail behind that milestone. This view offers the chairman a clear, at a glance picture of AIREV's revenue trajectory to date.",
    "burn": "This slide highlights AIREV's discipline around burn and runway. As the platform scales, monthly burn is managed with discipline, ensuring the company extends its runway while continuing to invest in growth. This balance between careful spending and platform expansion reflects a deliberate, sustainable approach to financial management as AIREV grows toward its next phase.",
    "investment": "This chart presents AIREV's investment history, displaying prior funding rounds and the investors behind them. Each bar on the chart represents a distinct round, and hovering over it reveals further detail, including round size and participating investors. This interactive view gives the chairman a clear picture of how AIREV's capital base has developed over time.",
    "investors": "This slide presents AIREV's current investor conversations for this raise, organized as ranked cards. Each card reflects an active discussion, ordered to show where engagement is strongest and where conversations are progressing most quickly. This view gives the chairman a real time sense of investor interest and momentum across the current fundraising process.",
    "arithmetic": "This slide walks through the arithmetic behind the raise, laying out the underlying mathematics in plain terms. It examines the valuation logic guiding this round and the dilution trade offs that come with it, giving the chairman a transparent view of how the numbers fit together. The goal is a clear, grounded understanding of what this raise means for ownership.",
    "sequence": "This slide presents the sequence of execution milestones planned for after the raise closes. Displayed as an interactive timeline, it outlines the key steps AIREV will take to deploy capital, scale the platform, and deliver on the commitments described in this briefing. This gives the chairman visibility into exactly how momentum continues once the raise is complete.",
    "closing": "This closing slide introduces AIREV Insights, powered by the AIREV voice assistant, available to answer any questions you may have about what we have covered today. This briefing remains private and confidential. Thank you for your time and consideration. We welcome your questions now, and look forward to continuing this conversation as AIREV moves ahead with this raise."
  };

  /* ---------- dock styles ---------- */
  var css = ''
    + '#vdock{position:fixed;right:26px;bottom:88px;z-index:96;display:flex;align-items:center;gap:12px;'
    + 'padding:10px 14px 10px 10px;border:1px solid rgba(16,32,27,.16);border-radius:999px;'
    + 'background:rgba(255,255,255,.92);backdrop-filter:blur(10px);box-shadow:0 18px 48px -20px rgba(14,122,95,.35)}'
    + '#vorb{position:relative;width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;flex:none;'
    + 'background:radial-gradient(circle at 32% 30%,#12B886 0%,#0E7A5F 58%,#0A5945 100%);'
    + 'box-shadow:0 6px 18px -6px rgba(14,122,95,.7);transition:transform .25s ease}'
    + '#vorb:hover{transform:scale(1.05)}'
    + '#vorb .vring{position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(18,184,134,.55);opacity:0;pointer-events:none}'
    + '#vdock.speaking #vorb .vring{animation:vpulse 1.6s ease-out infinite}'
    + '#vdock.speaking #vorb .vring.r2{animation-delay:.55s}'
    + '#vdock.busy #vorb{animation:vbreathe 1.1s ease-in-out infinite}'
    + '#vdock.err #vorb{background:radial-gradient(circle at 32% 30%,#c96f5f,#8f3f33)}'
    + '@keyframes vpulse{0%{transform:scale(.9);opacity:.85}100%{transform:scale(1.55);opacity:0}}'
    + '@keyframes vbreathe{0%,100%{transform:scale(1)}50%{transform:scale(.93)}}'
    + '#vorb svg{position:absolute;inset:0;margin:auto;width:22px;height:22px;color:#fff}'
    + '.vbtn{width:34px;height:34px;border-radius:50%;border:1px solid rgba(16,32,27,.16);background:#fff;'
    + 'cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#44584F;flex:none}'
    + '.vbtn:hover{border-color:#0E7A5F;color:#0E7A5F}'
    + '.vbtn:disabled{opacity:.35;cursor:default}'
    + '.vbtn svg{width:13px;height:13px}'
    + '#vmeta{display:flex;flex-direction:column;gap:3px;min-width:118px;max-width:190px}'
    + '#vstatus{font:600 10px/1.3 "Inter",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#0E7A5F;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '#vauto{display:inline-flex;align-items:center;gap:6px;font:500 10px/1 "Inter",sans-serif;color:#66786F;cursor:pointer;user-select:none}'
    + '#vauto .sw{width:26px;height:14px;border-radius:7px;background:rgba(16,32,27,.18);position:relative;transition:background .2s;flex:none}'
    + '#vauto .sw::after{content:"";position:absolute;top:2px;left:2px;width:10px;height:10px;border-radius:50%;background:#fff;transition:left .2s}'
    + '#vauto.on .sw{background:#12B886}'
    + '#vauto.on .sw::after{left:14px}'
    + '@media (max-width:1080px){#vdock{right:12px;bottom:96px;padding:8px 10px 8px 8px}#vmeta{display:none}}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  /* ---------- dock markup ---------- */
  var dock = document.createElement('div');
  dock.id = 'vdock';
  dock.setAttribute('role', 'region');
  dock.setAttribute('aria-label', 'AIREV voice narration');
  dock.innerHTML = ''
    + '<button id="vorb" type="button" aria-pressed="false" aria-label="Start voice narration" title="AIREV Insights — voice narration">'
    + '<span class="vring" aria-hidden="true"></span><span class="vring r2" aria-hidden="true"></span>'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><line x1="12" y1="18" x2="12" y2="21"/></svg>'
    + '</button>'
    + '<button class="vbtn" id="vplay" type="button" aria-label="Play or pause narration" disabled>'
    + '<svg viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 2.2v9.6l8-4.8z"/></svg></button>'
    + '<button class="vbtn" id="vreplay" type="button" aria-label="Replay this slide narration" disabled>'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg></button>'
    + '<div id="vmeta"><span id="vstatus">Voice off — tap the orb</span>'
    + '<span id="vauto" class="on" role="switch" aria-checked="true" tabindex="0"><span class="sw"></span>Auto-narrate</span></div>';
  document.body.appendChild(dock);

  var orb = document.getElementById('vorb');
  var playBtn = document.getElementById('vplay');
  var replayBtn = document.getElementById('vreplay');
  var statusEl = document.getElementById('vstatus');
  var autoEl = document.getElementById('vauto');

  var ICON_PLAY = '<svg viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 2.2v9.6l8-4.8z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 2h3v10H3zM8 2h3v10H8z"/></svg>';


  /* ---------- AIREV Insights workflow wiring (live context: HubSpot CRM,
     file directory, Zoho Mail). Fire-and-forget context pings; failures
     never affect narration. Workflow: 6a93fafbccfc34e5ad071e66 (active). ---------- */
  var INSIGHTS_EXECUTE_URL = 'https://gateway.on-demand.io/automation/public/v1/webhook/workflow/6a93fafbccfc34e5ad071e66/execute';
  function insightsPing(action) {
    try {
      var s = window.AIREVDECK.slide();
      fetch(INSIGHTS_EXECUTE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: {
          action: action,
          slideIndex: window.AIREVDECK.index + 1,
          slideTitle: s ? (s.getAttribute('data-title') || '') : '',
          workflow: 'AIREV Insights',
          source: 'airev-chairman-deck-v2'
        } })
      }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- state ---------- */
  var live = false;          // narration mode on/off
  var auto = true;           // auto-narrate on slide change
  var speaking = false;      // audio currently playing
  var paused = false;
  var engine = null;         // 'ondemand' | 'browser'
  var audioEl = null;        // current Audio element
  var reqSeq = 0;            // stale-response guard
  var cache = {};            // narrKey -> audioUrl
  try { cache = JSON.parse(sessionStorage.getItem('airevTTS') || '{}'); } catch (e) { cache = {}; }

  function setStatus(t) { statusEl.textContent = t; }
  function setDock(cls) {
    dock.classList.remove('speaking', 'busy', 'err');
    if (cls) dock.classList.add(cls);
  }
  function setPlayIcon(playing) { playBtn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY; }

  function currentKey() {
    var s = window.AIREVDECK.slide();
    return s ? (s.getAttribute('data-narr') || '') : '';
  }
  function currentTitle() {
    var s = window.AIREVDECK.slide();
    return s ? (s.getAttribute('data-title') || 'this slide') : '';
  }

  function stopAll() {
    reqSeq++;
    speaking = false; paused = false;
    if (audioEl) { try { audioEl.pause(); audioEl.src = ''; } catch (e) {} audioEl = null; }
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
    setPlayIcon(false);
    setDock(null);
  }

  /* ---------- browser fallback voice (en-US female preference) ---------- */
  function pickBrowserVoice() {
    var vs = (window.speechSynthesis && window.speechSynthesis.getVoices()) || [];
    var score = function (v) {
      var s = 0, n = (v.name || '').toLowerCase(), l = (v.lang || '').toLowerCase();
      if (l.indexOf('en-us') === 0) s += 4; else if (l.indexOf('en') === 0) s += 2;
      if (/female|samantha|jenny|aria|zira|allison|ava|susan|nova/.test(n)) s += 3;
      if (/google us english/.test(n)) s += 3;
      return s;
    };
    vs.sort(function (a, b) { return score(b) - score(a); });
    return vs[0] || null;
  }

  function speakBrowser(text, seq) {
    if (!window.speechSynthesis) { setStatus('No voice available'); setDock('err'); return; }
    var u = new SpeechSynthesisUtterance(text);
    var v = pickBrowserVoice();
    if (v) u.voice = v;
    u.rate = 1.02; u.pitch = 1.0;
    u.onstart = function () {
      if (seq !== reqSeq) return;
      engine = 'browser'; speaking = true; paused = false;
      setDock('speaking'); setPlayIcon(true);
      setStatus('Narrating — ' + currentTitle() + ' (browser voice)');
    };
    u.onend = function () {
      if (seq !== reqSeq) return;
      speaking = false; setPlayIcon(false); setDock(null);
      setStatus('Listening — navigate to continue');
    };
    u.onerror = function () { if (seq === reqSeq) { setDock('err'); setStatus('Voice error'); } };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  /* ---------- primary: OnDemand TTS via /api/tts ---------- */
  function speakOnDemand(key, text, seq) {
    var play = function (url) {
      if (seq !== reqSeq) return;
      audioEl = new Audio(url);
      audioEl.onplay = function () {
        if (seq !== reqSeq) return;
        engine = 'ondemand'; speaking = true; paused = false;
        setDock('speaking'); setPlayIcon(true);
        setStatus('Narrating — ' + currentTitle());
      };
      audioEl.onended = function () {
        if (seq !== reqSeq) return;
        speaking = false; setPlayIcon(false); setDock(null);
        setStatus('Listening — navigate to continue');
      };
      audioEl.onerror = function () { if (seq === reqSeq) speakBrowser(text, seq); };
      var p = audioEl.play();
      if (p && p.catch) {
        p.catch(function () {
          if (seq !== reqSeq) return;
          setDock(null); setPlayIcon(false);
          setStatus('Tap play to hear this slide');
          playBtn.disabled = false;
        });
      }
    };
    if (cache[key]) { play(cache[key]); return; }
    setDock('busy'); setStatus('Loading voice…');
    var ctl = ('AbortController' in window) ? new AbortController() : null;
    var timer = ctl && setTimeout(function () { ctl.abort(); }, 22000);
    fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
      signal: ctl ? ctl.signal : undefined
    }).then(function (r) {
      if (timer) clearTimeout(timer);
      if (!r.ok) throw new Error('tts ' + r.status);
      return r.json();
    }).then(function (j) {
      var url = j && j.audioUrl;
      if (!url) throw new Error('no audioUrl');
      cache[key] = url;
      try { sessionStorage.setItem('airevTTS', JSON.stringify(cache)); } catch (e) {}
      play(url);
    }).catch(function () {
      if (seq === reqSeq) speakBrowser(text, seq);
    });
  }

  function narrate() {
    var key = currentKey();
    var text = NARR[key];
    if (!text) { setStatus('No narration for this slide'); return; }
    stopAll();
    var seq = ++reqSeq;
    playBtn.disabled = false; replayBtn.disabled = false;
    speakOnDemand(key, text, seq);
  }

  /* ---------- controls ---------- */
  orb.addEventListener('click', function () {
    live = !live;
    orb.setAttribute('aria-pressed', String(live));
    orb.setAttribute('aria-label', live ? 'Stop voice narration' : 'Start voice narration');
    if (live) { insightsPing('start'); narrate(); } else { insightsPing('stop'); stopAll(); playBtn.disabled = true; replayBtn.disabled = true; setStatus('Voice off — tap the orb'); }
  });

  playBtn.addEventListener('click', function () {
    if (!live) return;
    if (engine === 'ondemand' && audioEl) {
      if (speaking && !paused) { audioEl.pause(); paused = true; setPlayIcon(false); setDock(null); setStatus('Paused'); }
      else { audioEl.play(); paused = false; speaking = true; setPlayIcon(true); setDock('speaking'); setStatus('Narrating — ' + currentTitle()); }
    } else if (engine === 'browser' && window.speechSynthesis) {
      if (speaking && !paused) { window.speechSynthesis.pause(); paused = true; setPlayIcon(false); setDock(null); setStatus('Paused'); }
      else if (paused) { window.speechSynthesis.resume(); paused = false; setPlayIcon(true); setDock('speaking'); }
      else { narrate(); }
    } else { narrate(); }
  });

  replayBtn.addEventListener('click', function () { if (live) narrate(); });

  function toggleAuto() {
    auto = !auto;
    autoEl.classList.toggle('on', auto);
    autoEl.setAttribute('aria-checked', String(auto));
  }
  autoEl.addEventListener('click', toggleAuto);
  autoEl.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleAuto(); } });

  window.addEventListener('keydown', function (e) {
    if (e.target && (e.target.isContentEditable || /INPUT|TEXTAREA/.test(e.target.tagName))) return;
    if (e.key === 'p' || e.key === 'P') { e.preventDefault(); playBtn.click(); }
    if (e.key === 'n' || e.key === 'N') { e.preventDefault(); if (live) narrate(); }
  });

  /* auto-narration follows the deck */
  var debounce = null;
  window.AIREVDECK.onChange(function () {
    if (!live || !auto) return;
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(narrate, 420);
  });

  /* warm the browser voice list (Chrome loads async) */
  if (window.speechSynthesis) { try { window.speechSynthesis.getVoices(); window.speechSynthesis.onvoiceschanged = function () {}; } catch (e) {} }
})();

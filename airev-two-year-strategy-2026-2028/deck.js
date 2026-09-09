/* AIREV Two-Year Strategy — spatial deck engine (no dependencies)
   Steps are absolutely positioned on an infinite plane (data-x / data-y / data-scale / data-rot);
   the camera (#canvas transform) flies from step to step; 'O' zooms out to the whole strategy map. */
(function(){
  const W=1400, H=800;
  const canvas=document.getElementById('canvas');
  const steps=[...document.querySelectorAll('.step')];
  const body=document.body;
  let cur=0, overview=false;

  /* ---- place steps on the plane ---- */
  steps.forEach((s,i)=>{
    s.dataset.i=i;
    const x=+s.dataset.x||0, y=+s.dataset.y||0, sc=+s.dataset.scale||1, rot=+s.dataset.rot||0;
    s.style.left=(x-W/2)+'px'; s.style.top=(y-H/2)+'px';
    s.style.transform=`rotate(${rot}deg) scale(${sc})`;
    if(!s.querySelector('.ov-label')){
      const l=document.createElement('div'); l.className='ov-label';
      l.innerHTML=`<div><small>${s.dataset.chapter||''}</small>${s.dataset.title||''}</div>`;
      s.appendChild(l);
    }
    s.addEventListener('click',()=>{ if(overview){ goTo(i); } });
  });

  /* ---- lane labels & connecting lines (drawn from data on <section data-lane>) ---- */
  const lanes={};
  steps.forEach(s=>{ const ln=s.dataset.lane; if(ln===undefined) return; (lanes[ln]=lanes[ln]||[]).push(s); });
  Object.keys(lanes).forEach(k=>{
    const arr=lanes[k];
    const xs=arr.map(s=>+s.dataset.x), ys=arr.map(s=>+s.dataset.y);
    const minX=Math.min(...xs), maxX=Math.max(...xs), y=ys[0];
    const line=document.createElement('div'); line.className='lane-line';
    line.style.left=(minX)+'px'; line.style.width=(maxX-minX)+'px'; line.style.top=(y)+'px';
    canvas.insertBefore(line, canvas.firstChild);
    const lab=document.createElement('div'); lab.className='lane-label';
    lab.innerHTML=`<b>${String(+k+1).padStart(2,'0')}</b>${arr[0].dataset.chapter||''}<span class="lane-story"> · ${arr[0].dataset.story||''}</span>`;
    lab.style.left=(minX-W/2-1650)+'px'; lab.style.top=y+'px';
    canvas.insertBefore(lab, canvas.firstChild);
  });

  const fit=()=>Math.min(innerWidth/W,(innerHeight-70)/H)*0.94;

  let offsetX=0, flyTimer=null;
  function camera(x,y,rot,scale){
    canvas.style.transform=`translate(${innerWidth/2-offsetX}px,${(innerHeight-8)/2}px) rotate(${-rot}deg) scale(${scale}) translate(${-x}px,${-y}px)`;
  }
  function goTo(i, opts={}){
    i=Math.max(0,Math.min(steps.length-1,i));
    const s=steps[i];
    const x=+s.dataset.x||0, y=+s.dataset.y||0, sc=+s.dataset.scale||1, rot=+s.dataset.rot||0;
    const laneChange=!overview && steps[cur] && steps[cur].dataset.lane!==s.dataset.lane && !opts.silent && i!==cur;
    overview=false; body.classList.remove('overview');
    if(flyTimer){ clearTimeout(flyTimer); flyTimer=null; }
    if(laneChange && !body.classList.contains('no-anim')){
      /* animated spatial transition between lanes: pull back to a mid-point, then dive into the target card */
      const px=+steps[cur].dataset.x||0, py=+steps[cur].dataset.y||0;
      canvas.style.transitionDuration='.6s';
      camera((px+x)/2,(py+y)/2,0,fit()*0.28);
      flyTimer=setTimeout(()=>{ canvas.style.transitionDuration='.85s'; camera(x,y,rot,fit()/sc); flyTimer=null; },600);
    } else {
      canvas.style.transitionDuration='';
      camera(x,y,rot,fit()/sc);
    }
    steps.forEach((t,j)=>{ t.classList.toggle('active',j===i); t.classList.toggle('past',j<i); t.classList.toggle('future',j>i); });
    cur=i;
    updateChrome();
    if(!opts.silent) history.replaceState(null,'','#'+(i+1));
    document.dispatchEvent(new CustomEvent('stepchange',{detail:{index:i,step:s}}));
  }
  function showOverview(){
    overview=true; body.classList.add('overview');
    const xs1=[],xs2=[],ys1=[],ys2=[];
    steps.forEach(s=>{ const x=+s.dataset.x||0,y=+s.dataset.y||0,sc=+s.dataset.scale||1;
      xs1.push(x-W/2*sc); xs2.push(x+W/2*sc); ys1.push(y-H/2*sc); ys2.push(y+H/2*sc); });
    const minX=Math.min(...xs1)-1700, maxX=Math.max(...xs2)+200, minY=Math.min(...ys1)-200, maxY=Math.max(...ys2)+200;
    const bw=maxX-minX, bh=maxY-minY;
    const scale=Math.min(innerWidth/bw,(innerHeight-90)/bh);
    camera((minX+maxX)/2,(minY+maxY)/2,0,scale);
    steps.forEach(t=>t.classList.remove('active'));
    updateChrome();
  }
  function toggleOverview(){ overview?goTo(cur):showOverview(); }

  /* ---- chrome ---- */
  const chapEl=document.getElementById('chapters');
  const chapterList=[]; steps.forEach((s,i)=>{ const c=s.dataset.chapter; if(c && !chapterList.find(o=>o.name===c)) chapterList.push({name:c,index:i}); });
  chapterList.forEach(c=>{ const b=document.createElement('button'); b.className='chap'; b.textContent=c.name; b.onclick=()=>goTo(c.index); chapEl.appendChild(b); });
  const counter=document.getElementById('counter'), prog=document.querySelector('#progress i');
  function updateChrome(){
    counter.textContent=overview?'MAP':`${String(cur+1).padStart(2,'0')} / ${steps.length}`;
    prog.style.width=((cur+1)/steps.length*100)+'%';
    const c=steps[cur].dataset.chapter;
    [...chapEl.children].forEach((b,k)=>b.classList.toggle('on',!overview && chapterList[k].name===c));
    renderNotes();
  }
  document.getElementById('prev').onclick=()=>goTo(cur-1);
  document.getElementById('next').onclick=()=>goTo(cur+1);
  document.getElementById('mapbtn').onclick=toggleOverview;
  const help=document.getElementById('help'), notes=document.getElementById('notes');
  document.getElementById('helpbtn').onclick=()=>help.classList.toggle('on');
  document.getElementById('notesbtn').onclick=()=>notes.classList.toggle('on');
  document.getElementById('printbtn').onclick=()=>window.print();
  function renderNotes(){
    const n=steps[cur].querySelector('.notes');
    notes.innerHTML=`<h4>Speaker notes · ${String(cur+1).padStart(2,'0')}</h4>`+(n?n.innerHTML:'<p class="muted">No notes for this card.</p>');
  }

  /* ---- assistant panel: keep the active card visible when the right-hand panel is open ---- */
  document.addEventListener('chat:opened',()=>{ offsetX=innerWidth>1100?200:0; overview?showOverview():goTo(cur,{silent:true}); });
  document.addEventListener('chat:closed',()=>{ offsetX=0; overview?showOverview():goTo(cur,{silent:true}); });

  /* ---- keyboard / touch ---- */
  addEventListener('keydown',e=>{
    if(e.target.matches('input,textarea')) return;
    const k=e.key;
    if(k==='ArrowRight'||k===' '||k==='PageDown'||k==='Enter'){ e.preventDefault(); overview?goTo(cur):goTo(cur+1); }
    else if(k==='ArrowLeft'||k==='PageUp'||k==='Backspace'){ e.preventDefault(); goTo(cur-1); }
    else if(k==='ArrowDown'){ e.preventDefault(); const c=steps[cur].dataset.chapter; const idx=chapterList.findIndex(o=>o.name===c); if(idx<chapterList.length-1) goTo(chapterList[idx+1].index); }
    else if(k==='ArrowUp'){ e.preventDefault(); const c=steps[cur].dataset.chapter; const idx=chapterList.findIndex(o=>o.name===c); if(idx>0) goTo(chapterList[idx-1].index); else goTo(0); }
    else if(k==='o'||k==='O'||k==='Escape'){ e.preventDefault(); if(help.classList.contains('on')||notes.classList.contains('on')){help.classList.remove('on');notes.classList.remove('on');} else toggleOverview(); }
    else if(k==='Home'){ goTo(0); } else if(k==='End'){ goTo(steps.length-1); }
    else if(k==='n'||k==='N'){ notes.classList.toggle('on'); }
    else if(k==='?'||k==='h'||k==='H'){ help.classList.toggle('on'); }
    else if(k==='p'||k==='P'){ window.print(); }
  });
  let tx=null,ty=null;
  addEventListener('touchstart',e=>{ tx=e.touches[0].clientX; ty=e.touches[0].clientY; },{passive:true});
  addEventListener('touchend',e=>{ if(tx===null) return; const dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty; tx=ty=null;
    if(Math.abs(dx)>60 && Math.abs(dx)>Math.abs(dy)){ dx<0?goTo(cur+1):goTo(cur-1); } });
  addEventListener('resize',()=>{ body.classList.add('no-anim'); overview?showOverview():goTo(cur,{silent:true}); setTimeout(()=>body.classList.remove('no-anim'),50); });

  /* ---- tiny SVG chart kit ---- */
  const C={em:'#0E7A5F', emb:'#12B886', gold:'#A5884B', ink:'#10201B', dim:'#44584F', faint:'#6C7E75', red:'#B4533A', grey:'#B8C4BE'};
  const fmt=(v,d=1)=>{ if(Math.abs(v)>=1000) return (v/1000).toFixed(v%1000===0?0:1)+'k'; return (+v).toFixed(d).replace(/\.0$/,''); };
  function niceMax(v){ const p=Math.pow(10,Math.floor(Math.log10(v||1))); const n=v/p; const m=n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10; return m*p; }
  function frame(el){ const r=el.getBoundingClientRect(); const w=Math.max(320, el.clientWidth||r.width||600), h=Math.max(180, el.clientHeight||r.height||260); return {w,h}; }

  window.barChart=function(el,o){
    const {w,h}=frame(el); const m={l:52,r:14,t:20,b:44}; const iw=w-m.l-m.r, ih=h-m.t-m.b;
    const all=o.series.flatMap(s=>s.values.filter(v=>v!=null)); const maxV=niceMax(Math.max(...all)*1.12); const minV=Math.min(0,...all);
    const yMin=minV<0?-niceMax(-minV):0; const span=maxV-yMin;
    const y=v=>m.t+ih-( (v-yMin)/span*ih );
    const n=o.labels.length, gw=iw/n, k=o.series.length, bw=Math.min(46,(gw*0.72)/k);
    let g=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">`;
    g+='<g class="grid">'; const ticks=5; for(let i=0;i<=ticks;i++){ const v=yMin+span*i/ticks; g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${m.l-8}" y="${y(v)+4}" text-anchor="end" font-size="10.5" fill="${C.faint}">${o.yFmt?o.yFmt(v):fmt(v)}</text>`; } g+='</g>';
    o.series.forEach((s,si)=>{ s.values.forEach((v,i)=>{ if(v==null) return; const x=m.l+gw*i+(gw-bw*k)/2+bw*si; const y0=y(0), y1=y(v);
      g+=`<rect x="${x}" y="${Math.min(y0,y1)}" width="${bw-3}" height="${Math.abs(y0-y1)}" rx="3" fill="${s.color||(si?C.gold:C.em)}" opacity="${s.opacity||1}"><title>${s.name}: ${o.valFmt?o.valFmt(v):v}</title></rect>`;
      if(o.values!==false) g+=`<text class="val" x="${x+(bw-3)/2}" y="${(v>=0?y1-5:y1+12)}" text-anchor="middle" font-size="10.5" fill="${C.ink}">${o.valFmt?o.valFmt(v):fmt(v)}</text>`; }); });
    g+='<g class="axis">'; o.labels.forEach((l,i)=>{ g+=`<text x="${m.l+gw*i+gw/2}" y="${h-m.b+18}" text-anchor="middle" font-size="11" fill="${C.dim}">${l}</text>`; }); g+='</g>';
    g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(0)}" y2="${y(0)}" stroke="${C.dim}" stroke-width="1"/>`;
    if(o.series.length>1 && o.legend!==false){ let lx=m.l; o.series.forEach((s,si)=>{ g+=`<rect x="${lx}" y="${h-12}" width="10" height="10" rx="2" fill="${s.color||(si?C.gold:C.em)}"/><text x="${lx+15}" y="${h-3}" font-size="11" fill="${C.dim}">${s.name}</text>`; lx+= 22 + s.name.length*6.2; }); }
    g+='</svg>'; el.innerHTML=g;
  };
  window.lineChart=function(el,o){
    const {w,h}=frame(el); const m={l:52,r:18,t:20,b:44}; const iw=w-m.l-m.r, ih=h-m.t-m.b;
    const all=o.series.flatMap(s=>s.values.filter(v=>v!=null)); const maxV=o.yMax||niceMax(Math.max(...all)*1.12); const minV=Math.min(0,...all); const yMin=minV<0?-niceMax(-minV):0; const span=maxV-yMin;
    const y=v=>m.t+ih-((v-yMin)/span*ih); const n=o.labels.length; const x=i=>m.l+iw*(n===1?0.5:i/(n-1));
    let g=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">`;
    g+='<g class="grid">'; for(let i=0;i<=5;i++){ const v=yMin+span*i/5; g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${m.l-8}" y="${y(v)+4}" text-anchor="end" font-size="10.5" fill="${C.faint}">${o.yFmt?o.yFmt(v):fmt(v)}</text>`; } g+='</g>';
    o.series.forEach((s,si)=>{ const col=s.color||[C.em,C.gold,C.red,C.emb][si%4]; const pts=s.values.map((v,i)=>v==null?null:{x:x(i),y:y(v),i,v}).filter(Boolean); if(!pts.length) return;
      if(s.area){ g+=`<path d="M${pts[0].x},${y(0)} `+pts.map(p=>`L${p.x},${p.y}`).join(' ')+` L${pts[pts.length-1].x},${y(0)} Z" fill="${col}" opacity=".10"/>`; }
      g+=`<path d="M`+pts.map(p=>p.x+','+p.y).join(' L')+`" fill="none" stroke="${col}" stroke-width="${s.width||2.5}" stroke-dasharray="${s.dash||''}"/>`;
      pts.forEach((p,k)=>{ g+=`<circle cx="${p.x}" cy="${p.y}" r="4" fill="#fff" stroke="${col}" stroke-width="2"><title>${s.name} · ${o.labels[p.i]}: ${o.valFmt?o.valFmt(p.v):p.v}</title></circle>`;
        if(o.values!==false && (!s.labelEvery || k%s.labelEvery===0) && !(s.skipLabels && s.skipLabels.includes(p.i))) g+=`<text class="val" x="${p.x}" y="${p.y-9+(s.labelDy||0)}" text-anchor="middle" font-size="10.5" fill="${col}">${o.valFmt?o.valFmt(p.v):fmt(p.v)}</text>`; }); });
    g+='<g class="axis">'; o.labels.forEach((l,i)=>{ g+=`<text x="${x(i)}" y="${h-m.b+18}" text-anchor="middle" font-size="11" fill="${C.dim}">${l}</text>`; }); g+='</g>';
    g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(0)}" y2="${y(0)}" stroke="${C.dim}" stroke-width="1"/>`;
    if(o.legend!==false){ let lx=m.l; o.series.forEach((s,si)=>{ const col=s.color||[C.em,C.gold,C.red,C.emb][si%4]; g+=`<rect x="${lx}" y="${h-12}" width="10" height="10" rx="2" fill="${col}"/><text x="${lx+15}" y="${h-3}" font-size="11" fill="${C.dim}">${s.name}</text>`; lx+=22+s.name.length*6.2; }); }
    g+='</svg>'; el.innerHTML=g;
  };
  window.hbarChart=function(el,o){
    const {w,h}=frame(el); const m=Object.assign({l:150,r:70,t:8,b:8},o.margin||{}); const iw=w-m.l-m.r, ih=h-m.t-m.b; const n=o.labels.length; const rh=ih/n;
    const maxV=o.max||(o.track?Math.max(...o.values):niceMax(Math.max(...o.values)*1.05));
    const bh=o.barHeight?Math.min(o.barHeight,rh*0.8):rh*0.64, rx=o.rx!=null?o.rx:3, gap=o.labelGap||10;
    const lstyle=o.labelSize?` style="font-size:${o.labelSize}px"`:'', vstyle=` style="font-variant-numeric:tabular-nums${o.valueSize?';font-size:'+o.valueSize+'px':''}"`;
    let g=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">`;
    o.labels.forEach((l,i)=>{ const v=o.values[i]; const bw=Math.max(v/maxV*iw, o.minBar||0); const cy=m.t+rh*i+rh/2; const yy=cy-bh/2; const col=(o.colors&&o.colors[i])||C.em; const val=o.valFmt?o.valFmt(v):v;
      g+=`<text x="${m.l-gap}" y="${cy}" text-anchor="end" dominant-baseline="central" font-size="11.5" fill="${C.ink}"${lstyle}>${l}</text>`;
      if(o.track) g+=`<rect class="track" x="${m.l}" y="${yy}" width="${iw}" height="${bh}" rx="${rx}" fill="${o.trackColor||'rgba(16,32,27,.05)'}"/>`;
      g+=`<rect class="bar" x="${m.l}" y="${yy}" width="${bw}" height="${bh}" rx="${rx}" fill="${col}"><title>${l}: ${val}</title></rect>`;
      if(o.valuesAt==='edge') g+=`<text class="val" x="${w-(o.valueInset||4)}" y="${cy}" text-anchor="end" dominant-baseline="central" font-size="11" fill="${C.ink}" font-weight="600"${vstyle}>${val}</text>`;
      else g+=`<text class="val" x="${m.l+bw+8}" y="${cy}" dominant-baseline="central" font-size="11" fill="${C.ink}" font-weight="600"${vstyle}>${val}</text>`; });
    g+='</svg>'; el.innerHTML=g;
  };
  window.donut=function(el,o){
    const {w,h}=frame(el); const r=Math.min(w,h)/2-6, cx=w/2, cy=h/2, tot=o.values.reduce((a,b)=>a+b,0); let a0=-Math.PI/2;
    let g=`<svg viewBox="0 0 ${w} ${h}">`;
    o.values.forEach((v,i)=>{ const a1=a0+v/tot*2*Math.PI; const large=(a1-a0)>Math.PI?1:0; const x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1);
      g+=`<path d="M${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} L${cx},${cy} Z" fill="${o.colors[i]}"><title>${o.labels[i]}: ${v}</title></path>`; a0=a1; });
    g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.62}" fill="#fff"/>`;
    if(o.center) g+=`<text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="15" font-weight="600" fill="${C.ink}">${o.center}</text>`;
    g+='</svg>'; el.innerHTML=g;
  };

  /* ---- boot ---- */
  const start=Math.max(0,Math.min(steps.length-1,(parseInt((location.hash||'#1').slice(1),10)||1)-1));
  body.classList.add('no-anim'); goTo(start,{silent:true}); setTimeout(()=>body.classList.remove('no-anim'),80);
  document.dispatchEvent(new CustomEvent('deckready'));
  window.deck={goTo,showOverview,toggleOverview,steps,get current(){return cur;}};
})();

/* ---- card 23 (#28) · Hardware — Datacenter → Device spectrum (9 Sep 2026) ----
   Eight tiles: click / tap or Enter / Space expands one inline detail panel at a time, Esc closes it; the zone buttons on the
   track and the All · Datacenter · Device pills filter the grid (tiles fade out, then get the hidden attribute).
   Key handling lives on the tiles themselves and only stops propagation for Enter / Space / Esc, so the deck's arrow-key
   navigation is untouched and works whenever no tile has focus. Presentation-mode redaction (mode.js) is unaffected; print CSS
   renders every tile expanded and static regardless of filter or open state. */
(function(){
  const card=document.getElementById('hardware'); if(!card) return;
  const grid=card.querySelector('#hwgrid'); if(!grid) return;
  const tiles=[...grid.querySelectorAll('.it')];
  const zones=[...card.querySelectorAll('.hw-zone')];
  const pills=[...card.querySelectorAll('.hw-pills .pill')];
  const reduce=window.matchMedia?window.matchMedia('(prefers-reduced-motion: reduce)'):null;
  const timers=new Map();
  let filter='all';

  function setOpen(t,on){ t.classList.toggle('open',on); t.setAttribute('aria-expanded',on?'true':'false'); }
  function closeAll(except){ tiles.forEach(o=>{ if(o!==except && o.classList.contains('open')) setOpen(o,false); }); }
  function toggle(t){ const on=!t.classList.contains('open'); closeAll(t); setOpen(t,on); }
  function applyFilter(f){
    f=(f==='datacenter'||f==='device')?f:'all';
    filter=f; grid.dataset.filter=f;
    pills.forEach(p=>{ const on=p.dataset.f===f; p.classList.toggle('on',on); p.setAttribute('aria-pressed',on?'true':'false'); });
    zones.forEach(z=>z.setAttribute('aria-pressed',z.dataset.zone===f?'true':'false'));
    const instant=!!(reduce&&reduce.matches);
    tiles.forEach(t=>{
      const show=f==='all'||t.dataset.zone===f;
      clearTimeout(timers.get(t));
      if(show){
        if(t.hidden){ t.hidden=false; void t.offsetWidth; }   /* un-hide first, then let the fade-in run */
        t.classList.remove('out');
      } else {
        if(t.classList.contains('open')) setOpen(t,false);
        if(document.activeElement===t) t.blur();
        t.classList.add('out');
        if(instant) t.hidden=true;
        else timers.set(t,setTimeout(()=>{ if(t.classList.contains('out')) t.hidden=true; },380));
      }
    });
  }

  tiles.forEach(t=>{
    t.addEventListener('click',e=>{ if(e.target.closest('.more')) return; toggle(t); });
    t.addEventListener('keydown',e=>{
      if(e.target!==t) return;                                  /* only when the tile itself has focus */
      const k=e.key;
      if(k==='Enter'||k===' '||k==='Spacebar'){ e.preventDefault(); e.stopPropagation(); toggle(t); }
      else if((k==='Escape'||k==='Esc') && t.classList.contains('open')){ e.preventDefault(); e.stopPropagation(); setOpen(t,false); }
      /* arrow keys and everything else fall through to the deck */
    });
  });
  pills.forEach(p=>p.addEventListener('click',()=>applyFilter(p.dataset.f)));
  zones.forEach(z=>z.addEventListener('click',()=>applyFilter(z.dataset.zone===filter?'all':z.dataset.zone)));
  [...pills,...zones].forEach(b=>b.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' ') e.stopPropagation(); })); /* native button activation; the deck must not advance */

  /* leaving the card closes any open panel and drops tile focus so the deck's Enter / Space keep navigating */
  document.addEventListener('stepchange',e=>{
    if(e.detail && e.detail.step===card) return;
    closeAll();
    if(card.contains(document.activeElement)) document.activeElement.blur();
  });

  window.hardwareSpectrum={tiles, filter:applyFilter, toggle, closeAll, get current(){ return filter; }};
})();

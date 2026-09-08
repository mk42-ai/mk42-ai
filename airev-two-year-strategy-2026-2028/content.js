/* Content-driven interactions v2: roadmap, all-signed partner grid, VVIP Sovereign JV scenario toggle, DC cost-share, valuation slider, charts. */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------------- Roadmap (8 quarters · 5 columns) ---------------- */
  const Q=[{"q": "Q4", "y": "2026", "gate": "JV incorporated; 100 seats live", "story": "Mandate", "cols": {"Partners": ["Qualcomm TLA: $100 per activated unit, perpetual, five silicon families ●", "Redington distribution: 8 MENA markets plus all of Africa ●", "Tenstorrent LOI: ~50% cost-share of first modular sovereign DC ●"], "Sovereign": ["G1: VVIP Sovereign JV MoU signed 8–10 October ○", "G2: JV incorporated 20 November; AED 20.4M committed capital ○", "G3: first 100 seats live 25 December ○"], "Platform": ["Offline OnDemand for Windows on Intel Panther Lake shipping ●", "Supermicro AS-2115HV-TNRT certified sovereign appliance ●", "NetApp AI data layer and Cisco networking in sovereign stack ●"], "Capital": ["2026 revenue $6.0M, 100% licensing ●", "Series A2 launched: $200M pre-money, closing January 2027 ○", "Kairoswealth USD 2M investment (potential, subject to completion) ○"], "Execution": ["Galaxy fleet rollout P0–P3: 23 units, 736 Blackhole chips ○", "Qualcomm/e& activation waves: ~10K AR glasses, ~11K AI PCs, ~4K appliances ○", "Moro Hub 100 MW solar Tier III hosting in place ●"]}}, {"q": "Q1", "y": "2027", "gate": "Series A2 closed; billing live", "story": "Proof", "cols": {"Partners": ["Redington price card: $110K/$200K/$360K across MENA and Africa ●", "WWT reseller agreement: US federal and state flow-downs active ●", "Cisco + NetApp \"sovereign rack\" SKU via WWT: one certified bundle ●"], "Sovereign": ["G4: five anchors contracted, ~500 seats, 29 January ○", "G5: JV launch and billing, 19 February ○", "G6: month-6 review and owned-compute decision, 26 March ○"], "Platform": ["AR runtime for Qualcomm XR2/AR1 glasses released ○", "Modular DC #1 commissioning with Tenstorrent ahead of Q2 go-live ○", "IBM/Dell models, channel and certified systems for OnDemand ●"], "Capital": ["$200M pre-money Series A2 closes ○", "JV Year-1 revenue AED 15.8M (model v13) ◐", "Kairoswealth ADGM Category 4 licence (potential, subject to completion) ○"], "Execution": ["Bangalore office opens — India engineering & delivery hub ○", "Qualcomm/e& AR glasses wave: AR runtime on ~10K units ○", "First 100 JV seats in production; five anchors onboarding ○"]}}, {"q": "Q2", "y": "2027", "gate": "Modular DC #1 live", "story": "Partners", "cols": {"Partners": ["Tenstorrent: modular sovereign DC #1 deployed under cost-share LOI ○", "WISER European lighthouse preparation for 2027 launch ○", "Core42 (G42) and ADQ master services agreements in force ●"], "Sovereign": ["GCC government sovereign deployment with Qualcomm and e& ○", "Owned-compute decision (G6) implemented; JV workloads onto modular DC #1 ○", "UXE Security Solutions integrating OnDemand for Dubai government security ●"], "Platform": ["Modular DC #1 live: 23 Galaxy units, 736 Blackhole chips ○", "Fleet all-in cost $2.9–4.4M, ~50% Tenstorrent cost-shared ◐", "Sovereign appliance on Supermicro and Dell certified systems ●"], "Capital": ["$500M round; modular DC #1 live with Tenstorrent ○", "$25–50M project facility against sovereign offtake (potential, subject to completion) ○", "BlackRock GIP/AIP-type and Blackstone-type infrastructure platforms (potential, subject to completion) ○"], "Execution": ["Qualcomm/e& AI PC wave: ~11K units activated ○", "Bangalore hub staffing delivery for India/South Asia ○", "Africa: Luanda flagship ~$12M scoping (potential, subject to completion) ○"]}}, {"q": "Q3", "y": "2027", "gate": "$1B valuation; 40% export", "story": "Capital", "cols": {"Partners": ["WISER European lighthouse deployment live ○", "WWT: first US federal/state opportunities via flow-downs ○", "Redington Africa distribution feeding export bookings ○"], "Sovereign": ["JV five anchors in production; ~500 seats billing ○", "Africa: Luanda flagship, ~2.0M students (potential, subject to completion) ○", "Core42/ADQ sovereign programmes scaling under MSAs ○"], "Platform": ["Modular DC #1 at steady state; owned compute serving JV ○", "OnDemand across all five Qualcomm silicon families ○", "Intel AI PC MOU: Panther Lake offline OnDemand in channel ●"], "Capital": ["$1B — UAE's first AI unicorn within six months ○", "2027E revenue base case $29.0M on track ◐", "Africa national build ~$55M via ADEX/ADFD (potential, subject to completion) ○"], "Execution": ["Export share: ≥40% of new bookings outside UAE by September ○", "Installed OEM devices tracking to 279,000 by year-end ◐", "Bangalore hub delivering Redington SISA and offshore-India work ○"]}}, {"q": "Q4", "y": "2027", "gate": "279K devices; $29.0M revenue", "story": "Scale", "cols": {"Partners": ["Qualcomm TLA: $100 per activated unit on 279,000 installed devices ◐", "e& enterprise and government distribution beyond first 25,000 devices ○", "WISER lighthouse converting to European channel bookings ○"], "Sovereign": ["JV Year-1 run-rate toward AED 15.8M (model v13) ◐", "International expansion planning: CEPA partner countries from Year 2 ○", "GCC government sovereign deployments expanding with Qualcomm/e& ○"], "Platform": ["NetApp AI data layer across sovereign deployments ○", "AR runtime and AI PC builds at general availability ○", "Cisco networking and government channel deployments ○"], "Capital": ["2027E revenue $29.0M (model base case) ◐", "Infrastructure debt term sheet (potential, subject to completion) ○", "IPO readiness workstreams begin ahead of January 2028 ○"], "Execution": ["Installed OEM devices 279,000 at year-end ◐", "Redington SISA and Bangalore hub serving South Asia delivery ○", "Luanda flagship go-live for ~2.0M students (potential, subject to completion) ○"]}}, {"q": "Q1", "y": "2028", "gate": "IPO readiness declared", "story": "Capital", "cols": {"Partners": ["Qualcomm TLA perpetual: installed base compounding toward 562,500 ◐", "Intel AI PC MOU: Panther Lake volume through channel ○", "IBM/Dell models, channel and certified systems at scale ○"], "Sovereign": ["JV Year 2: international expansion to CEPA partner countries ○", "JV Year-1 result reviewed against AED 15.8M (model v13) ◐", "Core42/ADQ and GCC sovereign deployments in steady operation ○"], "Platform": ["Same JV products packaged for CEPA export markets ○", "Modular DC #1 utilisation review; owned-compute expansion case ○", "Sovereign appliance roadmap on AI200/AI250 racks ○"], "Capital": ["IPO readiness ○", "Kairoswealth ≥USD 250M AUM/AUA KPI (potential, subject to completion) ○", "2028E revenue base case $62.6M ◐"], "Execution": ["Export bookings share tracking from ≥40% toward ≥60% ○", "Bangalore hub: India/South Asia delivery and engineering at scale ○", "Africa national build-out ~$55M (potential, subject to completion) ○"]}}, {"q": "Q2", "y": "2028", "gate": "CEPA expansion live", "story": "Scale", "cols": {"Partners": ["Redington: MENA and Africa channel volume on price card ○", "WWT US public-sector pipeline via federal/state flow-downs ○", "WISER European channel expansion beyond lighthouse ○"], "Sovereign": ["First CEPA partner-country deployments under JV expansion ○", "JV revenue trajectory toward AED 56.9M Year 5 (model v13) ◐", "UXE smart-city deployments across Dubai government ○"], "Platform": ["Owned-compute expansion executed if DC #1 review positive ○", "Supermicro, Dell, Cisco, NetApp certified sovereign stack refresh ○", "OnDemand on AI200/AI250 racks and XR2/AR1 glasses at volume ○"], "Capital": ["Kairoswealth Category 3: AUA→AUM (potential, subject to completion) ○", "Installed base trajectory 562,500 devices by 2028 year-end ◐", "Project facility drawdowns against sovereign offtake (potential, subject to completion) ○"], "Execution": ["e& distribution: enterprise and government device programmes beyond 25,000 ○", "Bangalore hub supporting CEPA and offshore-India corridor delivery ○", "Africa flagship operating; national rollout (potential, subject to completion) ○"]}}, {"q": "Q3", "y": "2028", "gate": "562K devices; 60% export", "story": "Scale", "cols": {"Partners": ["Qualcomm TLA: 562,500 installed devices trajectory, $100 per unit ◐", "Tenstorrent Commercial Collaboration Agreement: next-phase compute options ○", "Redington, WWT, WISER, e&: multi-region channel at scale ○"], "Sovereign": ["JV international expansion: multiple CEPA partner countries live ○", "Path to AED 95.0M Year 5 with international expansion (model v13) ◐", "GCC and Dubai government sovereign estates in steady operation ○"], "Platform": ["Sovereign agentic OS across five Qualcomm families and Intel ○", "Owned compute serving JV and export workloads ○", "Moro Hub green hosting plus modular DC capacity ○"], "Capital": ["2028E revenue $62.6M (model base case) ◐", "IPO-ready company: listing window assessed ○", "Infrastructure PE/debt scale-up (potential, subject to completion) ○"], "Execution": ["Export share: ≥60% of new bookings outside UAE by September ○", "Installed OEM devices 562,500 by year-end ◐", "Africa national programme scaling (potential, subject to completion) ○"]}}];
  const qtabs=$('#qtabs'), qbody=$('#qbody');
  if(qtabs){
    Q.forEach((q,i)=>{ const b=document.createElement('div'); b.className='qtab'+(i===0?' on':''); b.dataset.q=q.q+'-'+q.y; b.innerHTML=`<div class="q">${q.q}</div><div class="y">${q.y} · ${q.story}</div><div class="m">${esc(q.gate)}</div>`; b.onclick=()=>showQ(i); qtabs.appendChild(b); });
    const order=['Partners','Sovereign','Platform','Capital','Execution'];
    function showQ(i){ $$('.qtab').forEach((t,k)=>t.classList.toggle('on',k===i)); const q=Q[i];
      qbody.innerHTML=order.map(h=>`<div class="qcol"><h4>${h}</h4><ul class="clean">${(q.cols[h]||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join(''); }
    showQ(0);
    window.showQuarter=showQ;
  }

  /* ---------------- Routes to market — fifteen signed routes ---------------- */
  const P=[{"n": "Qualcomm", "cat": "silicon", "logo": "assets/logos/qualcomm.png", "role": "Technology licence agreement: $100 per activated unit, perpetual, across five silicon families.", "detail": "Snapdragon X AI PCs, Cloud AI 100/Ultra, Dragonwing IQ-X, XR2/AR1 glasses and AI200/AI250 racks carry OnDemand; installed base 111,000 (2026) to 562,500 (2028).", "reach": "5 silicon families · 562.5K devices 2028E", "dark": false}, {"n": "Intel", "cat": "silicon", "logo": "assets/logos/intel.png", "role": "AI PC MOU: offline OnDemand for Windows on Panther Lake, delivered February 2026.", "detail": "Puts a fully offline sovereign assistant on Intel AI PCs through 2027–2028, widening the OEM installed base beyond Qualcomm silicon and feeding the licensing revenue line.", "reach": "Panther Lake AI PC platform", "dark": false}, {"n": "Tenstorrent", "cat": "silicon", "logo": "assets/logos/tenstorrent.svg", "role": "Commercial Collaboration Agreement (1 Sep 2025) plus LOI cost-sharing the first modular sovereign DC.", "detail": "Tenstorrent cost-shares ~50% of the UAE's first modular sovereign data centre: 23 Galaxy units, 736 Blackhole chips, $2.9–4.4M fleet all-in, live with the $500M round around April 2027.", "reach": "23 Galaxy units · 736 Blackhole chips", "dark": false}, {"n": "World Wide Technology", "cat": "channel", "logo": "assets/logos/wwt.png", "role": "Reseller agreement carrying US federal and state contract flow-downs.", "detail": "Opens US public-sector procurement for the sovereign appliance and OnDemand licences, a key contributor to the ≥40% (Sep 2027) and ≥60% (Sep 2028) export-booking targets.", "reach": "US federal & state flow-downs", "dark": false}, {"n": "Redington", "cat": "channel", "logo": "assets/logos/redington.png", "role": "Distribution across 8 MENA markets and all of Africa on a fixed price card.", "detail": "Price card $110K/$200K/$360K; Redington SISA sits beside the new Bangalore hub, giving the Africa and South Asia export push a fulfilment backbone.", "reach": "8 MENA markets · all of Africa", "dark": false}, {"n": "WISER Technology", "cat": "channel", "logo": "assets/logos/wiser.png", "role": "European channel partnership anchored on a 2027 lighthouse deployment.", "detail": "The 2027 European lighthouse becomes the reference site for EU sovereign buyers and a core plank of the ≥40% / ≥60% export-share targets.", "reach": "European lighthouse 2027", "dark": false}, {"n": "Core42 · ADQ", "cat": "sovereign", "logo": "assets/logos/core42.png", "role": "Master services agreements with Core42 (G42) and ADQ.", "detail": "Anchors OnDemand inside the UAE's sovereign cloud and state-holding ecosystem; MSAs give the JV, GCC government deployments and owned-compute plans a contracted enterprise frame.", "reach": "UAE sovereign cloud & state holding", "dark": false}, {"n": "Supermicro", "cat": "silicon", "logo": "assets/logos/supermicro.png", "role": "Certified sovereign appliance platform: Supermicro AS-2115HV-TNRT.", "detail": "The certified AS-2115HV-TNRT is the reference on-prem appliance for channel deployments via Redington and WWT, deployable inside Moro Hub or customer sites.", "reach": "AS-2115HV-TNRT certified", "dark": true}, {"n": "Cisco", "cat": "silicon", "logo": "assets/logos/cisco.png", "role": "Networking partner and government channel for sovereign deployments.", "detail": "Cisco networking underpins the sovereign stack while its government channel carries OnDemand into public-sector accounts in the GCC, US and Europe alongside WWT and WISER.", "reach": "Networking + government channel", "dark": false}, {"n": "NetApp", "cat": "silicon", "logo": "assets/logos/netapp.png", "role": "AI data layer for the sovereign OnDemand stack.", "detail": "NetApp provides the governed data layer beneath OnDemand agents in sovereign deployments — the JV, GCC government estates and the modular data centre — keeping data resident in-country.", "reach": "Sovereign AI data layer", "dark": false}, {"n": "Moro Hub (Digital DEWA)", "cat": "sovereign", "logo": "assets/logos/moro-hub.svg", "role": "Hosting in Moro Hub's 100 MW solar-powered Tier III green data centre.", "detail": "Gives OnDemand a DEWA-backed, renewable-powered home for sovereign workloads and JV seats, complementing the Tenstorrent modular data centre as owned compute comes online.", "reach": "100 MW solar · Tier III", "dark": false}, {"n": "UXE Security Solutions", "cat": "sovereign", "logo": "assets/logos/uxe.png", "role": "Dubai government security and smart-city integrator deploying OnDemand.", "detail": "Brings OnDemand agents into Dubai government security and smart-city programmes, a sovereign showcase feeding the GCC government deployments planned from Q2 2027.", "reach": "Dubai government security & smart city", "dark": false}, {"n": "e&", "cat": "channel", "logo": "assets/logos/eand.svg", "role": "Enterprise and government distribution; first blended 25,000-device programme with Qualcomm.", "detail": "Programme one blends ~10K AR glasses, ~11K AI PCs and ~4K appliances across e&'s enterprise and government base; activation waves run Q3–Q4 2026, GCC government deployment Q2 2027.", "reach": "244.7M subscribers", "dark": false}, {"n": "IBM · Dell", "cat": "channel", "logo": "assets/logos/ibm.png", "role": "Models, channel and certified systems for the OnDemand sovereign stack.", "detail": "IBM and Dell extend OnDemand's model catalogue, enterprise channel and certified server options, giving buyers a second hardware track beside Supermicro across 2027–2028.", "reach": "Models · channel · certified systems", "dark": false, "logo2": "assets/logos/dell.png"}, {"n": "VVIP Sovereign JV", "cat": "sovereign", "logo": "assets/logos/vvip-sovereign-jv.svg", "role": "50/50 joint venture with a UAE sovereign counterparty, six-gate plan G1–G6.", "detail": "AED 20.4M committed capital (10.2M per partner); 100 seats Dec 2026, five anchors Jan 2027, billing Feb 2027; revenue AED 15.8M Year 1 to AED 56.9M Year 5.", "reach": "AED 95.0M Year 5 with international expansion", "dark": false}];
  const pg=$('#pgrid');
  if(pg){
    P.forEach(p=>{ const d=document.createElement('div'); d.className='pcard signed'; d.dataset.c=p.cat; d.dataset.name=p.n;
      const mono=p.n.split(/[\s·]+/).filter(Boolean).map(w=>w[0]).join('').slice(0,3).toUpperCase();
      const logo=p.logo?`<span class="${p.dark?'logo-dark sm':''}"><img class="plogo" src="${p.logo}" alt="${esc(p.n)} logo"></span>${p.logo2?`<img class="plogo" src="${p.logo2}" alt="Dell logo" style="display:inline-block;margin-left:8px">`:''}`:`<span class="mono" aria-hidden="true">${mono}</span>`;
      d.innerHTML=`<div class="nm">${logo}<span class="tag signed big">● SIGNED</span></div><div class="nm" style="font-size:16px">${esc(p.n)}</div><div class="role">${esc(p.role)}</div>${p.reach?`<div class="reach">${esc(p.reach)}</div>`:''}<div class="more">${esc(p.detail)}</div>`;
      d.onclick=()=>d.classList.toggle('open'); pg.appendChild(d); });
    $$('#pfilter .pill').forEach(b=>b.onclick=()=>{ $$('#pfilter .pill').forEach(x=>x.classList.remove('on')); b.classList.add('on'); const f=b.dataset.f;
      $$('.pcard').forEach(c=>c.classList.toggle('hide',!(f==='all'||c.dataset.c===f))); });
  }

  /* ---------------- VVIP Sovereign JV scenario toggle (model v13, AED M) ---------------- */
  const JV={
    uae:{rev:[15.8,27.3,40.0,45.7,56.9],cost:[24.5,37.2,44.1,45.1,48.4],sur:[-8.7,-9.9,-4.1,0.6,8.5],seats:[500,758,1119,1716,2826],be:'Year 4',pnpv:'60.2',anpv:'30.1',y5:'56.9',s5:'8.5'},
    intl:{rev:[15.8,29.3,47.4,63.8,95.0],cost:[24.5,38.0,47.0,52.1,62.9],sur:[-8.7,-8.7,0.4,11.7,32.1],seats:[500,931,1732,3224,6000],be:'Year 3',pnpv:'215.2',anpv:'121.5',y5:'95.0',s5:'32.1'}
  };
  function renderJV(k){ const a=JV[k]; const el=$('#c-jv'); if(!el) return;
    lineChart(el,{labels:['Y1','Y2','Y3','Y4','Y5'],series:[{name:'Revenue (AED M)',values:a.rev,area:true},{name:'Fully-loaded cost',values:a.cost,color:'#A5884B',dash:'5,4'},{name:'Operating surplus / (deficit)',values:a.sur,color:'#B4533A'}],valFmt:v=>v.toFixed(1)});
    $('#jv-kpis').innerHTML=`<div class="hero compact"><div class="hn" style="font-size:30px">${a.seats[4].toLocaleString()}</div><div class="hl">Year-5 seats</div></div><div class="hero compact"><div class="hn" style="font-size:30px">AED ${a.y5}M</div><div class="hl">Year-5 revenue · surplus AED ${a.s5}M · break-even ${a.be}</div></div><div class="hero compact gold"><div class="hn" style="font-size:30px">${a.pnpv} / ${a.anpv}</div><div class="hl">NPV AED M · partner @3.5% / AIREV @10%</div></div>`;
    $$('[data-sc]').forEach(b=>b.classList.toggle('on',b.dataset.sc===k)); }
  $$('[data-sc]').forEach(b=>b.onclick=()=>renderJV(b.dataset.sc));

  /* ---------------- Modular DC #1 cost-share toggle ---------------- */
  function renderDC(cs){ const lo=4.4, hi=5.9; const share=cs?0.5:1; const el=$('#dc-split'); if(!el) return;
    el.innerHTML=`<div class="hero glass compact"><div class="hn">$${lo}–${hi}M</div><div class="hl">containerised unit, grid-powered</div></div>
      <div class="hero glass compact"><div class="hn">${cs?'$'+(lo*0.5).toFixed(1)+'–'+(hi*0.5).toFixed(1)+'M':'—'}</div><div class="hl">${cs?'Tenstorrent contribution (~50%, LOI) ○':'no cost-share'}</div></div>
      <div class="hero em compact"><div class="hn">$${(lo*share).toFixed(1)}–${(hi*share).toFixed(1)}M</div><div class="hl">AIREV / JV share</div></div>`;
    $$('[data-cs]').forEach(b=>b.classList.toggle('on',(b.dataset.cs==='1')===!!cs)); }
  $$('[data-cs]').forEach(b=>b.onclick=()=>renderDC(b.dataset.cs==='1'));

  /* ---------------- Valuation slider (card 12, slide 16) — the three metric tiles on a flat valuation mark, $500M by default ----------------
     Denominators are the model base case already used on this deck: FY2027E revenue $29.0M, FY2028E revenue $62.6M, FY2027 contracted exit ARR $9.6M (IM). */
  const REV27=29.0, REV28=62.6, ARR27=9.6;
  const mult=$('#mult'), mo=$('#mult-out');
  function renderMult(){ if(!mult||!mo) return; const m=+mult.value; const where=m===500?'the $500M stage':m===1000?'the $1B stage':m===200?'the $200M base':(m<500?'between the base and the $500M stage':'between the $500M and $1B stages');
    mo.innerHTML=`<div class="hero compact"><div class="hn">$${m>=1000?(m/1000).toFixed(m%1000?1:0)+'B':m+'M'}</div><div class="hl">${where} · ${(m/REV27).toFixed(1)}× FY2027E revenue ($${REV27.toFixed(1)}M)</div></div>
      <div class="hero compact"><div class="hn">${(m/REV28).toFixed(1)}×</div><div class="hl">÷ FY2028E revenue ($${REV28.toFixed(1)}M)</div></div>
      <div class="hero compact gold"><div class="hn">${(m/ARR27).toFixed(0)}×</div><div class="hl">÷ FY2027 contracted exit ARR ($${ARR27.toFixed(1)}M) — peers fund at 40–100×</div></div>`; }
  if(mult){ mult.oninput=renderMult; }

  /* ---------------- Charts ---------------- */
  function renderCharts(){
    const rev=$('#c-rev'); if(rev) barChart(rev,{labels:['Y1','2025','2026','2027E','2028E','2029E'],series:[{name:'Revenue (USD M)',values:[1.0,1.2,6.0,29.0,62.6,97.9]},{name:'Contracted exit ARR (USD M)',values:[null,null,1.5,9.6,19.4,31.7],color:'#A5884B'}],valFmt:v=>v.toFixed(1)});
    /* Card 10 (slide 13) — latest fiscal-year revenue of the six largest signed routes, USD B, ordered by size.
       WEB: Cisco 10-K FY2026 63.33; Qualcomm 10-K FY2025 (fiscal year ended 28 Sep 2025, filed 5 Nov 2025) 44.284; WWT stated ~20; e& FY2025 19.9 (AED→USD);
       Redington audited consolidated FY2026 (year ended 31 Mar 2026, results 13 May 2026) ₹1,19,162.36 crore ÷ FY-average ECB USD/INR 88.3851 (255 business days, api.frankfurter.dev) = 13.48 (company headline $13.5B; FY2025 was ₹99,333.65 crore ÷ 84.5426 = 11.75); NetApp 10-K FY2026 6.925.
       Gold bars are converted from a local currency (AED / INR). Six routes: Cisco, Qualcomm, WWT, e&, Redington, NetApp (8 Sep 2026). */
    const pc=$('#c-partners'); if(pc) hbarChart(pc,{labels:['Cisco (FY26)','Qualcomm (FY25)','WWT (stated)','e& (FY25)','Redington (FY26)','NetApp (FY26)'],values:[63.33,44.284,20,19.9,13.48,6.925],colors:['#0E7A5F','#0E7A5F','#0E7A5F','#A5884B','#A5884B','#0E7A5F'],valFmt:v=>'$'+(v>=10?v.toFixed(1):v.toFixed(2))+'B',track:true,valuesAt:'edge',barHeight:30,rx:4,minBar:6,labelSize:12.5,valueSize:13,margin:{l:160,r:78,t:8,b:8}});
    const af=$('#c-africa'); if(af) barChart(af,{labels:['Africa DC build 2025','2031','MEA AI-DC 2026','2031 '],series:[{name:'USD B',values:[1.24,4.58,2.51,8.24]}],valFmt:v=>'$'+v.toFixed(2)+'B',legend:false});
    /* Card 12 (slide 16) — documented marks: $10M Feb 2024 (seed post-money, CO/S2), $90M Dec 2025 (Series A-1 close, journey deck), $137.85M May 2026 (Itqan TS V6 pre-money), $200M Aug 2026 (Series A2 pre-money, IM/CO).
       The arc — management target: $200M (Jan 2027) → $500M (≈ Apr 2027) → $1B (≈ Jul 2027). Exactly three steps — $200M, $500M, $1B (8 Sep 2026); a '$250M Jan 2027' mark is not supported by any document and is not plotted. */
    const val=$('#c-val'); if(val) lineChart(val,{labels:['Feb 2024','Dec 2025','May 2026','Aug 2026','Jan 2027 ○','Apr 2027 ○','Jul 2027 ○'],series:[{name:'Documented marks (USD M)',values:[10,90,137.85,200,null,null,null],area:true},{name:'The arc — management target (USD M)',values:[null,null,null,200,200,500,1000],color:'#A5884B',dash:'6,4',skipLabels:[3]}],valFmt:v=>v>=1000?'$'+(v/1000)+'B':'$'+v+'M',yFmt:v=>v>=1000?(v/1000).toFixed(2).replace(/\.?0+$/,'')+'k':String(Math.round(v)),yMax:1250});
    renderJV('uae'); renderDC(true); renderMult();
  }
  if(document.readyState==='complete') renderCharts(); else addEventListener('load',renderCharts);

  /* ================= Capital · cards 13–15 (slides 17–19) and the dilution lines on card 12 (slide 16) =================
     ONE source of truth, computed at run time — every figure traces to one of these documents (titles only; no storage URLs in the deck):
       CT   Cap table 26 Jul 2026 — "Final Cap table post Series-A1", AIREV Holding Limited, table dated 11/6/2025 (file 260720 AIREV Cap Table vshare):
            11 register lines, 108,792 fully diluted shares including the 5,000 unissued B Shares of the Share Incentive Scheme (no votes, Cl. 5.2).
            Founder-level counts as printed (text layer, OCR and the reconciled json/xlsx agree): Olu Melville Thomas 59,219 · Youssef Ahmad Youssef 3,500 ·
            Kayaan Keki Unwalla 3,500. The Intel AI PC MOU signature block reads "Olu Thomas (Muhammed Khalid)"; the IM lists Muhammed Khalid as CEO & Founder.
       SHA  Amended & Restated Shareholders' Agreement (Amendment and Restatement Agreement, Nov 2025; DocuSign audit 19 Dec 2025): Schedule 2 Preferred
            Shareholders pp. 88–91 (Seed: Core42 25,000 @ $100.00 = $2,500,000 · Series A-1: Titian 5,000 @ $800.00 = $4,000,000, Venturewave 3,448 @ $580.00
            = $2,000,000 · Angel: Bennett 250 @ $800 = $200,000, Grim 94 @ $800 = $75,000 · Legacy: Eyad Omari 2,331 @ $107.25 = $249,999.75);
            Cl. 1.1 Founder Consent (≥ 50% of the voting rights held by OT, YY and KU together); Cl. 5.2 B Shares carry no vote.
       TS   Series A2 term sheets — Terra draft (clean, with changes): USD 5,000,000 at USD 200,000,000 pre-money, fully diluted, 2× non-participating;
            Itqan V6, 11 May 2026: USD 5,000,000 at USD 137,850,000 pre / 142,850,000 post (≈ 3.50%) — carried as the alternative in the footer only.
       CO   Chairman overview, 30 Aug 2026 — the $215M current mark; G42 ≈ 21.5× (undiluted basis), VentureWave marked $80M internally, Nabyl $1.6M secondary at ≈ $80M.
       A    projection ○ — the $500M and $1B stages are management targets with NO documented round size: modelled at USD 25M at USD 500M pre and
            USD 50M at USD 1B pre (5% of pre-money each). Change CAPITAL.assumedRaise and cards 12–13 recompute.
     Method: price = pre-money ÷ fully diluted shares before the round; whole shares, rounded down; dilution = new shares ÷ post-round shares;
     votes exclude the unissued B Shares; no pool top-up, pre-emption take-up or anti-dilution is modelled (all prices are above the USD 100 Starting Price). */
  const CAPITAL={
    todayMarkM:215,
    a2:{preM:200, raiseM:5, when:'Jan 2027', tsPreM:137.85},
    assumedRaise:{r500:25, r1b:50},           /* USD M — PROJECTION ○ (5% of pre-money); no document states these round sizes */
    poolShares:5000,
    /* register lines in the order the cap-table cards list them (the three founder rows first, one row each — never grouped) */
    holders:[
      {id:'ot',  name:'Olu Melville Thomas', alias:'Muhammed Khalid', cls:'Ordinary · founder',  shares:59219, founder:true, entry:'Founder', roundKey:'base', src:'CT'},
      {id:'yy',  name:'Youssef Youssef',      legal:'Youssef Ahmad Youssef', cls:'Ordinary · founder', shares:3500, founder:true, entry:'Founder', roundKey:'base', src:'CT'},
      {id:'ku',  name:'Kayaan Unwalla',       legal:'Kayaan Keki Unwalla',   cls:'Ordinary · founder', shares:3500, founder:true, entry:'Founder', roundKey:'base', src:'CT'},
      {id:'c42', name:'G42 / Core42',         legal:'Core42 Investments 1 SPV RSC Ltd', cls:'Seed Preferred · 2×', shares:25000, pps:100, cost:2500000, entry:'Feb 2024', roundKey:'seed', src:'SHA', logo:'assets/logos/core42.png'},
      {id:'tit', name:'Titian',               legal:'Titian RSC Ltd',        cls:'Series A-1 Preferred · 2×', shares:5000, pps:800, cost:4000000, entry:'Dec 2025', roundKey:'dec25', src:'SHA'},
      {id:'vw',  name:'VentureWave',          legal:'Venturewave Capital No. 9 Limited', cls:'Series A-1 Preferred · 2×', shares:3448, pps:580, cost:2000000, entry:'2025 · first close', roundKey:'a1first', src:'SHA'},
      {id:'nab', name:'Nabyl',                legal:'Nabyl (Further Ventures)', cls:'secondary purchase', shares:0, cost:1600000, entryValM:80, entry:'secondary', secondary:true, src:'CO'},
      {id:'eo',  name:'Eyad Omari',           legal:'Eyad Yousif Ibrahim Omari', cls:'Legacy Preferred · 1×', shares:2331, pps:107.25, cost:249999.75, entry:'≤ Jan 2024', roundKey:'base', src:'SHA'},
      {id:'rjg', name:'Bob Grim',             legal:'Robert John Grim',      cls:'Angel Preferred · 1×', shares:94, pps:800, cost:75000, entry:'Dec 2025', roundKey:'dec25', src:'SHA'},
      {id:'dbb', name:'David Bennett',        legal:'David Bradley Bennett', cls:'Angel Preferred · 1×', shares:250, pps:800, cost:200000, entry:'Dec 2025', roundKey:'dec25', src:'SHA'},
      {id:'inv', name:'Inveniam Middle East', cls:'Ordinary · no stated consideration', shares:1450, entry:'≤ Nov 2025', roundKey:'base', src:'CT'},
      {id:'pool',name:'B-share / ESOP pool',  legal:'Share Incentive Scheme', cls:'B Shares · unissued · no vote', shares:5000, pool:true, entry:'—', roundKey:'base', src:'CT'}
    ],
    /* the seed closed on a round 100,000-share base (Core42 25,000 = 25.00% = $2.5M ÷ $10.0M), so the pre-seed base is 75,000 shares */
    rounds:[
      {key:'base',   label:'Pre-seed base',                    short:'Base',       when:'≤ Jan 2024',   pps:107.25, src:'CT'},
      {key:'seed',   label:'Seed · Core42',                    short:'Seed',       when:'Feb 2024',     pps:100,    src:'SHA'},
      {key:'a1first',label:'Series A-1 first close',           short:'A-1 first',  when:'2025',         pps:580,    src:'SHA'},
      {key:'dec25',  label:'Series A-1 final close · Dec 2025',short:'Dec 2025',   when:'Dec 2025',     pps:800,    src:'SHA'},
      {key:'a2',     label:'Series A2 · $200M pre-money',      short:'$200M',      when:'Jan 2027',     preM:200,   raiseM:5, src:'TS', target:true},
      {key:'r500',   label:'$500M round · projection',         short:'$500M',      when:'≈ Apr 2027',   preM:500,   src:'A',  target:true, projection:true},
      {key:'r1b',    label:'$1B round · projection',           short:'$1B',        when:'≈ Jul 2027',   preM:1000,  src:'A',  target:true, projection:true}
    ]
  };
  const SRC_TITLE={CT:'Cap table 26 Jul 2026 — "Final Cap table post Series-A1", AIREV Holding Limited (table dated 11/6/2025), reconciled 8 Sep 2026',SHA:'Amended & Restated Shareholders\u2019 Agreement (Nov 2025) — Schedule 2 prices, Cl. 1.1 Founder Consent',TS:'Series A2 term sheets — Terra draft ($5M at $200M pre) and Itqan V6, 11 May 2026 ($5M at $137.85M pre)',CO:'Chairman overview, 30 Aug 2026 — $215M current mark, investor entry marks',IM:'Investment Memorandum, Aug 2026',A:'projection — no document states this round size (CAPITAL.assumedRaise in content.js)'};
  const chip=k=>`<span class="src${k==='A'?' a':''}" title="${esc(SRC_TITLE[k]||k)}">${k}</span>`;
  const fUSD=v=>v==null?'—':(Math.abs(v)>=1e9?'$'+(v/1e9).toFixed(2)+'B':Math.abs(v)>=1e6?'$'+(v/1e6).toFixed(2)+'M':'$'+Math.round(v).toLocaleString('en-US'));
  const fM=v=>v==null?'—':(v>=1000?'$'+(v/1000).toFixed(v%1000?2:1).replace(/\.?0+$/,'')+'B':'$'+(Number.isInteger(v)?v:v.toFixed(2))+'M');
  const fP=(v,d=2)=>v==null?'—':v.toFixed(d)+'%';
  const fN=v=>v==null?'—':Math.round(v).toLocaleString('en-US');
  const fX=v=>v==null?'—':v.toFixed(1)+'×';
  const fPPS=v=>v==null?'—':'$'+v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

  /* ---- build the ladder ---- */
  function buildCapital(){
    const H=CAPITAL.holders.map(h=>Object.assign({},h));
    const reg=H.filter(h=>!h.secondary);
    const founderSh=reg.filter(h=>h.founder).reduce((a,h)=>a+h.shares,0);      /* used only for the one-line Cl. 1.1 marker */
    const todaySh=reg.reduce((a,h)=>a+h.shares,0);
    const pool=CAPITAL.poolShares;
    const rounds=[]; let sh=0;
    CAPITAL.rounds.forEach(r=>{
      const o=Object.assign({},r);
      if(r.key==='base'){ const members=reg.filter(h=>h.roundKey==='base'); o.newShares=members.reduce((a,h)=>a+h.shares,0); o.preSh=0; o.postSh=o.newShares; o.raised=members.reduce((a,h)=>a+(h.cost||0),0); o.pps=null; o.preMoney=null; o.postMoney=null; sh=o.postSh; }
      else if(r.preM!=null){ const raiseM=r.raiseM!=null?r.raiseM:CAPITAL.assumedRaise[r.key]; o.raiseM=raiseM; o.raised=raiseM*1e6; o.preSh=sh; o.pps=r.preM*1e6/sh; o.newShares=Math.floor(o.raised/o.pps); o.postSh=sh+o.newShares; o.preMoney=r.preM*1e6; o.postMoney=o.pps*o.postSh; sh=o.postSh; }
      else { const members=reg.filter(h=>h.roundKey===r.key); o.newShares=members.reduce((a,h)=>a+h.shares,0); o.raised=members.reduce((a,h)=>a+(h.cost||0),0); o.preSh=sh; o.postSh=sh+o.newShares; o.preMoney=r.pps*o.preSh; o.postMoney=r.pps*o.postSh; sh=o.postSh; }
      o.dilution=o.postSh?o.newShares/o.postSh*100:0; o.keep=100-o.dilution;
      o.founderVote=founderSh/(o.postSh-pool)*100;
      rounds.push(o);
    });
    const byKey=Object.fromEntries(rounds.map(r=>[r.key,r]));
    const stages=['a2','r500','r1b'].map(k=>byKey[k]); let cum=100; stages.forEach(s=>{ cum=cum*s.keep/100; s.cumKeep=cum; });
    const todayPPS=CAPITAL.todayMarkM*1e6/todaySh;
    /* entry valuation & % bought at entry per holder (post-money of its round, on the round's closing share count) */
    reg.forEach(h=>{ const r=byKey[h.roundKey]; if(r&&r.postMoney!=null){ h.entryValM=r.postMoney/1e6; h.pctAtEntry=h.shares/r.postSh*100; } else { h.pctAtEntry=h.shares/byKey.base.postSh*100; h.implied=true; if(h.id==='eo') h.entryValM=byKey.base.postSh*h.pps/1e6; }
      h.pctNow=h.shares/todaySh*100; h.value=h.shares*todayPPS; h.mult=h.cost?h.value/h.cost:null; });
    const nab=H.find(h=>h.secondary); nab.value=nab.cost*CAPITAL.todayMarkM/nab.entryValM; nab.mult=CAPITAL.todayMarkM/nab.entryValM;
    /* the Itqan V6 alternative for the A2 (same $5M at $137.85M pre) */
    const itqan=(()=>{ const pps=CAPITAL.a2.tsPreM*1e6/todaySh; const n=Math.floor(CAPITAL.a2.raiseM*1e6/pps); return {pps,newShares:n,pct:n/(todaySh+n)*100}; })();
    return {H,reg,nab,founderSh,todaySh,pool,rounds,byKey,stages,todayPPS,itqan,selfCheck:Math.abs(reg.reduce((a,h)=>a+h.pctNow,0)-100)<1e-9};
  }
  const CM=buildCapital(); window.capitalModel=CM;

  /* ---- card 12 (slide 16): the dilution line under each stage of the arc ---- */
  $$('.arc .node .dl[data-dil]').forEach(el=>{ const r=CM.byKey[el.dataset.dil]; if(!r) return;
    el.innerHTML=`<b>${fM(r.raiseM)}</b> ${r.projection?'projection ○':'raised'} · <b>${fP(r.dilution)}</b> sold · existing holders keep <b>${fP(r.keep)}</b> ${chip(r.src)}`;
    el.dataset.raisedM=r.raiseM; el.dataset.pctSold=r.dilution.toFixed(2); });

  /* ---- card 13 (slide 17): three stages — money in and dilution, one animated SVG bar chart ---- */
  function renderStages(){
    const el=$('#c-stages'); if(!el) return;
    const S=CM.stages; const w=Math.max(720,el.clientWidth||1200), h=Math.max(260,el.clientHeight||330);
    const m={l:24,r:24,t:74,b:54}; const iw=w-m.l-m.r, ih=h-m.t-m.b; const gw=iw/S.length; const maxRaise=Math.max(...S.map(s=>s.raiseM));
    const y0=m.t+ih; const moneyH=v=>v/maxRaise*ih*0.76; const bwM=Math.min(96,gw*0.22), bwO=Math.min(150,gw*0.36), gap=Math.min(46,gw*0.1);
    const C={money:'#0E7A5F',moneyP:'#7FB8A6',keep:'rgba(14,122,95,.16)',keepLine:'#0E7A5F',sold:'#A5884B',ink:'#10201B',dim:'#44584F',faint:'#6C7E75'};
    let g=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="group" aria-label="Three stages of the valuation arc: money in and dilution at $200M, $500M and $1B pre-money">`;
    g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y0}" y2="${y0}" stroke="${C.dim}" stroke-width="1"/>`;
    S.forEach((s,i)=>{
      const gx=m.l+gw*i; const cx=gx+gw/2; const xM=cx-(bwM+gap+bwO)/2; const xO=xM+bwM+gap;
      const hM=Math.max(6,moneyH(s.raiseM)); const soldH=Math.max(8,ih*s.dilution/100); const keepH=ih-soldH;
      const label=s.key==='a2'?'Series A2':(s.key==='r500'?'$500M round':'$1B round');
      const mark=s.projection?'projection ○':'signed term sheet ●';
      const tip=`${label} — ${fM(s.preM)} pre-money · ${s.when}${s.projection?' · projection ○':''}. Money in ${fM(s.raiseM)}${s.projection?' (projection ○, 5% of pre-money)':' (Series A2 term sheets)'}. Price ${fPPS(s.pps)} per share · ${fN(s.newShares)} new shares · post-money ${fM(+(s.postMoney/1e6).toFixed(s.postMoney>=1e9?2:1))}. New investor ${fP(s.dilution)}; existing holders 100% → ${fP(s.keep)} of their stake (${fP(s.cumKeep)} of a pre-A2 stake after this stage).`;
      g+=`<g class="stage" tabindex="0" role="img" aria-label="${esc(tip)}" data-stage="${s.key}" data-tip="${esc(tip)}">`;
      g+=`<rect class="hit" x="${gx+6}" y="${m.t-70}" width="${gw-12}" height="${ih+70+40}" fill="transparent"/>`;
      /* stage header */
      g+=`<text class="stage-h" x="${cx}" y="${m.t-50}" text-anchor="middle" font-size="12" letter-spacing="2.2" font-weight="600" fill="${s.projection?C.faint:C.money}">${fM(s.preM).toUpperCase()} PRE-MONEY · ${esc(s.when.toUpperCase())}</text>`;
      g+=`<text class="stage-sub" x="${cx}" y="${m.t-33}" text-anchor="middle" font-size="11" fill="${C.faint}">${esc(label)} · ${mark}</text>`;
      /* money-in bar */
      g+=`<rect class="bar money${s.projection?' proj':''}" x="${xM}" y="${y0-hM}" width="${bwM}" height="${hM}" rx="5" fill="${s.projection?C.moneyP:C.money}" style="--d:${i*0.18}s"${s.projection?' stroke="#0E7A5F" stroke-dasharray="5,4" stroke-width="1.4"':''}/>`;
      g+=`<text class="lab money-lab" x="${xM+bwM/2}" y="${y0-hM-10}" text-anchor="middle" font-size="24" font-weight="500" font-family="Playfair Display, Georgia, serif" fill="${C.ink}" style="--d:${i*0.18+0.5}s">${fM(s.raiseM)}${s.projection?' ○':''}</text>`;
      g+=`<text class="axis-lab" x="${xM+bwM/2}" y="${y0+18}" text-anchor="middle" font-size="10.5" fill="${C.dim}">money in</text>`;
      /* ownership-after bar: existing holders (bottom) + new investor (top) */
      g+=`<rect class="bar keep" x="${xO}" y="${y0-keepH}" width="${bwO}" height="${keepH}" rx="5" fill="${C.keep}" stroke="${C.keepLine}" stroke-width="1" style="--d:${i*0.18+0.08}s"/>`;
      g+=`<rect class="bar sold" x="${xO}" y="${y0-ih}" width="${bwO}" height="${soldH}" rx="4" fill="${C.sold}" style="--d:${i*0.18+0.16}s"/>`;
      g+=`<text class="lab" x="${xO+bwO/2}" y="${y0-keepH/2+5}" text-anchor="middle" font-size="15" font-weight="600" fill="${C.keepLine}" style="--d:${i*0.18+0.55}s">${fP(s.keep,1)}</text>`;
      g+=`<text class="lab" x="${xO+bwO/2}" y="${y0-ih-8}" text-anchor="middle" font-size="12.5" font-weight="600" fill="${C.sold}" style="--d:${i*0.18+0.6}s">new investor ${fP(s.dilution)}</text>`;
      g+=`<text class="axis-lab" x="${xO+bwO/2}" y="${y0+18}" text-anchor="middle" font-size="10.5" fill="${C.dim}">existing holders 100% → ${fP(s.keep,1)}</text>`;
      g+=`<text class="axis-lab" x="${cx}" y="${y0+36}" text-anchor="middle" font-size="10.5" fill="${C.faint}">post-money ${fM(+(s.postMoney/1e6).toFixed(s.postMoney>=1e9?2:0))} · ${fPPS(s.pps)} / share</text>`;
      g+='</g>';
      if(i<S.length-1) g+=`<line x1="${gx+gw}" x2="${gx+gw}" y1="${m.t-58}" y2="${y0+40}" stroke="rgba(16,32,27,.10)" stroke-dasharray="3,4"/>`;
    });
    g+='</svg>'; el.innerHTML=g;
    /* captions — one line per stage */
    const caps=$('#stage-caps'); if(caps) caps.innerHTML=S.map(s=>`<div class="stage-cap${s.projection?' proj':''}"><b>${s.key==='a2'?'Series A2':(s.key==='r500'?'$500M round':'$1B round')}</b> · ${fM(s.raiseM)} ${s.projection?'projection ○':'per the term sheets ●'} at ${fM(s.preM)} pre → ${fM(+(s.postMoney/1e6).toFixed(s.postMoney>=1e9?2:0))} post · sells ${fP(s.dilution)} · a pre-A2 stake keeps ${fP(s.cumKeep,1)}</div>`).join('');
    /* hover / focus tooltip */
    const tip=$('#stage-tip'); if(tip){ const show=(gEl)=>{ tip.textContent=gEl.dataset.tip; tip.hidden=false; const r=gEl.getBoundingClientRect(), p=el.getBoundingClientRect(); tip.style.left=Math.max(0,Math.min(p.width-tip.offsetWidth,(r.left+r.width/2-p.left)-tip.offsetWidth/2))+'px'; tip.style.top=Math.max(0,r.top-p.top+8)+'px'; };
      $$('#c-stages g.stage').forEach(gEl=>{ gEl.addEventListener('mouseenter',()=>show(gEl)); gEl.addEventListener('focus',()=>show(gEl)); gEl.addEventListener('mouseleave',()=>{tip.hidden=true;}); gEl.addEventListener('blur',()=>{tip.hidden=true;}); }); }
    /* one-line consent marker (A&R SHA Cl. 1.1) */
    const mk=$('#stage-consent'); if(mk){ const v=S.map(s=>fP(s.founderVote,1)); mk.innerHTML=`<b>Founder Consent</b> (A&amp;R SHA Cl. 1.1) holds while OT · YY · KU together keep ≥ 50% of the votes: ${v[0]} after the A2 · ${v[1]} after $500M ○ · ${v[2]} after $1B ○ — the line is not crossed on the arc. ${chip('SHA')}`; }
    /* replay the entry animation each time the card becomes the active step */
    const step=el.closest('.step'); const play=()=>{ el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); };
    if(step&&!el.dataset.bound){ el.dataset.bound='1'; document.addEventListener('stepchange',e=>{ if(e.detail&&e.detail.step===step) setTimeout(play,60); else el.classList.remove('play'); }); if(step.classList.contains('active')) setTimeout(play,120); }
    else if(step&&step.classList.contains('active')) el.classList.add('play');
  }

  /* ---- cards 14–15 (slides 18–19): the two holder tables — one row per holder, in the order set on 8 Sep 2026 ---- */
  function holderRows(kind){
    const rows=[]; const t=CAPITAL.todayMarkM;
    const nameCell=h=>`<td class="h" title="${esc((h.legal||h.name)+(h.alias?' — '+h.alias:'')+' · '+h.cls)}">${h.logo?`<img class="mark" src="${h.logo}" alt="${esc(h.name)}">`:''}${esc(h.name)}${h.alias?` <span class="muted">(${esc(h.alias)})</span>`:''}${h.founder?' <span class="tag signed">founder</span>':''}${h.pool?' <span class="tag target">unissued</span>':''}${h.secondary?' <span class="tag target">secondary</span>':''}<span class="sh">${h.secondary?'no register line':fN(h.shares)+' sh'}</span></td>`;
    CM.H.forEach(h=>{
      if(h.secondary){ rows.push(`<tr class="na" data-id="${h.id}" data-shares="0">${nameCell(h)}<td>${esc(h.entry)} <span class="muted">· date n/s</span></td><td class="n">≈ $80M <span class="muted">CO</span></td><td class="n">${fUSD(h.cost)}</td><td class="n">—</td><td class="n">—</td><td class="n" title="Chairman-overview basis: $1.6M × 215 ÷ 80">≈ ${fUSD(h.value)} ◐${kind==='who'?` <span class="muted">~${fX(h.mult)} CO basis</span>`:''}</td></tr>`); return; }
      const ev=h.entryValM!=null?'$'+h.entryValM.toFixed(1)+'M'+(h.implied?' <span class="muted">◐</span>':''):'—';
      const amt=h.cost!=null?fUSD(h.cost):(h.founder?'—':(h.pool?'—':'not stated'));
      const pe=h.pctAtEntry!=null?fP(h.pctAtEntry)+(h.implied?' <span class="muted">◐</span>':''):'—';
      const val=fUSD(h.value)+(kind==='who'&&h.mult?` <span class="muted">${fX(h.mult)}</span>`:'');
      rows.push(`<tr class="${h.founder?'founder':''}${h.pool?' pool':''}" data-id="${h.id}" data-shares="${h.shares}">${nameCell(h)}<td>${esc(h.entry)}</td><td class="n">${ev}</td><td class="n">${amt}</td><td class="n" data-v="${(h.pctAtEntry||0).toFixed(4)}">${pe}</td><td class="n" data-v="${h.pctNow.toFixed(4)}"><b>${fP(h.pctNow)}</b></td><td class="n" data-v="${Math.round(h.value)}">${val}</td></tr>`);
    });
    const a2=CM.byKey.a2;
    rows.push(`<tr class="target" data-id="a2" data-shares="0"><td class="h">Series A2 investor <span class="tag target">pending ○</span><span class="sh">${fN(a2.newShares)} sh at close</span></td><td>${esc(a2.when)} ○</td><td class="n">$205.0M</td><td class="n">${fUSD(a2.raised)}</td><td class="n">${fP(a2.dilution)}</td><td class="n">—</td><td class="n">—</td></tr>`);
    rows.push(`<tr class="total"><td class="h">Register total<span class="sh">${fN(CM.todaySh)} FD sh</span></td><td>11 lines</td><td class="n"></td><td class="n">${fUSD(CM.reg.reduce((a,h)=>a+(h.cost||0),0))}</td><td class="n"></td><td class="n" data-sum="100.0000">100.00% ${CM.selfCheck?'✓':'✗'}</td><td class="n">${fUSD(t*1e6)}</td></tr>`);
    return rows.join('');
  }
  function renderHolderTables(){
    const head=`<thead><tr><th>Holder</th><th>Entry date</th><th class="n">Entry valuation</th><th class="n">Amount in</th><th class="n">% at entry</th><th class="n">% now</th><th class="n">Value at the $${CAPITAL.todayMarkM}M mark</th></tr></thead>`;
    const a=$('#money-table'); if(a){ a.innerHTML=head+'<tbody>'+holderRows('money')+'</tbody>'; a.dataset.rows=String(a.rows.length); }
    const b=$('#who-table'); if(b){ b.innerHTML=head+'<tbody>'+holderRows('who')+'</tbody>'; b.dataset.rows=String(b.rows.length); }
    const k=$('#money-kpis'); if(k){ const c=CM.reg.find(h=>h.id==='c42'); k.innerHTML=`<div class="k"><b>${fN(CM.todaySh)}</b>fully diluted shares · 11 register lines${chip('CT')}</div><div class="k"><b>${fPPS(CM.todayPPS)}</b>per share at the $${CAPITAL.todayMarkM}M mark${chip('CO')}</div><div class="k"><b>${fUSD(CM.reg.reduce((s,h)=>s+(h.cost||0),0))}</b>primary capital on the register${chip('SHA')}</div><div class="k"><b>${fP(c.pctAtEntry)} → ${fP(c.pctNow)}</b>G42 / Core42 · bought → now${chip('CT')}</div>`; }
    const k2=$('#who-kpis'); if(k2){ const c=CM.reg.find(h=>h.id==='c42'), v=CM.reg.find(h=>h.id==='vw'), o=CM.reg.find(h=>h.id==='eo'); k2.innerHTML=`<div class="k"><b>${fX(c.mult)}</b>G42 / Core42 · register basis (Chairman chart ≈ 21.5×, undiluted)${chip('CO')}</div><div class="k"><b>${fX(v.mult)}</b>VentureWave · register basis (≈ 2.7× on its $80M internal mark)${chip('CO')}</div><div class="k"><b>${fX(o.mult)}</b>Eyad Omari · Legacy Preferred at $107.25${chip('SHA')}</div><div class="k"><b>${fX(CM.nab.mult)}</b>Nabyl · secondary · Chairman-overview basis${chip('CO')}</div>`; }
  }
  renderStages(); renderHolderTables();
  addEventListener('resize',()=>{ renderStages(); });
})();

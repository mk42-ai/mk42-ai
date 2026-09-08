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

  /* ---------------- Valuation slider (card 13, slide 17) — the three metric tiles on a flat valuation mark, $500M by default ----------------
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
    /* Card 13 (slide 17) — documented marks: $10M Feb 2024 (seed post-money, CO/S2), $90M Dec 2025 (Series A-1 close, journey deck), $137.85M May 2026 (Itqan TS V6 pre-money), $200M Aug 2026 (Series A2 pre-money, IM/CO).
       The arc — management target: $200M (Jan 2027) → $500M (≈ Apr 2027) → $1B (≈ Jul 2027). Exactly three steps — $200M, $500M, $1B (8 Sep 2026); a '$250M Jan 2027' mark is not supported by any document and is not plotted. */
    const val=$('#c-val'); if(val) lineChart(val,{labels:['Feb 2024','Dec 2025','May 2026','Aug 2026','Jan 2027 ○','Apr 2027 ○','Jul 2027 ○'],series:[{name:'Documented marks (USD M)',values:[10,90,137.85,200,null,null,null],area:true},{name:'The arc — management target (USD M)',values:[null,null,null,200,200,500,1000],color:'#A5884B',dash:'6,4',skipLabels:[3]}],valFmt:v=>v>=1000?'$'+(v/1000)+'B':'$'+v+'M',yFmt:v=>v>=1000?(v/1000).toFixed(2).replace(/\.?0+$/,'')+'k':String(Math.round(v)),yMax:1250});
    renderJV('uae'); renderDC(true); renderMult();
  }
  if(document.readyState==='complete') renderCharts(); else addEventListener('load',renderCharts);

  /* ================= Capital · cards 14–17 (slides 18–21) and the dilution rows on card 13 (slide 17) =================
     ONE source of truth, computed at run time — every figure traces to one of these documents (titles only; no storage URLs in the deck):
       CT   Cap table 26 Jul 2026 — "Final Cap table post Series-A1", AIREV Holding Limited, table dated 11/6/2025 (file 260720 AIREV Cap Table vshare):
            11 register lines, 108,792 fully diluted shares including the 5,000 unissued B Shares of the Share Incentive Scheme (no votes, Cl. 5.2).
            Reconciled cap table (xlsx / json, 8 Sep 2026) joins it to Schedule 2 — every shares × price line matches (±$200 rounding on two lines).
       SHA  Amended & Restated Shareholders' Agreement (Amendment and Restatement Agreement, Nov 2025): Schedule 2 Preferred Shareholders pp. 88–91
            (Seed: Core42 25,000 @ $100.00 = $2,500,000 · Series A-1: Titian 5,000 @ $800.00 = $4,000,000, Venturewave 3,448 @ $580.00 = $2,000,000 ·
            Angel: Bennett 250 @ $800 = $200,000, Grim 94 @ $800 = $75,000 · Legacy: Eyad Omari 2,331 @ $107.25 = $249,999.75); Cl. 1.1 Founder /
            Founder Consent / Major Investor / Major Investor Consent / Major Investor Director Consent (pp. 28–32); Cl. 2 Board; Cl. 5 votes; Cl. 7.1
            preference stack; Cl. 11 anti-dilution; Cl. 13 pre-emption; Cl. 21.1 drag-along; Cl. 25 Share Incentive Plan; Sch. 3 Reserved Matters (pp. 92–95).
       TS   Series A2 term sheets — Terra draft (clean, with changes): USD 5,000,000 at USD 200,000,000 pre-money, fully diluted, 2× non-participating,
            one Major Investor Director seat, A&R SHA prevails (§8.10); Itqan V6, 11 May 2026: USD 5,000,000 at USD 137,850,000 pre / 142,850,000 post
            (≈3.50%), board up to 8, Investor Director + observer, protective provisions by a majority of Series A + A2, drag by Board + that majority.
       CO   Chairman overview, 30 Aug 2026 — the $215M current mark; G42 ≈21.5×, VentureWave ≈2.7× (marked $80M), Nabyl $1.6M secondary at ≈$80M.
       A    illustrative assumption — the $500M and $1B stages are management targets with NO documented round size: modelled at USD 25M at USD 500M
            pre and USD 50M at USD 1B pre (5% of pre-money each). Change CAPITAL.assumedRaise and every figure on cards 13–17 recomputes.
     Method: price = pre-money ÷ fully diluted shares before the round; whole shares, rounded down; dilution = new shares ÷ post-round shares;
     votes exclude the unissued B Shares; no pool top-up, pre-emption take-up or anti-dilution is modelled (all prices are above the USD 100 Starting Price). */
  const CAPITAL={
    registerDate:'11/6/2025 as printed · file shared 26 Jul 2026',
    todayMarkM:215,
    a2:{preM:200, raiseM:5, when:'Jan 2027', tsPreM:137.85},
    assumedRaise:{r500:25, r1b:50},           /* USD M — ILLUSTRATIVE ○ (5% of pre-money); no document states these round sizes */
    stressRaise:{r500:50, r1b:100},           /* USD M — the sensitivity line on card 17 (10% of pre-money) */
    poolShares:5000,
    holders:[
      {id:'ot',  name:'Olu Melville Thomas',               grp:'Founders',        cls:'Ordinary',                 shares:59219, founder:true, entry:'Founder', roundKey:'base', src:'CT'},
      {id:'yy',  name:'Youssef Ahmad Youssef',             grp:'Founders',        cls:'Ordinary',                 shares:3500,  founder:true, entry:'Founder', roundKey:'base', src:'CT'},
      {id:'ku',  name:'Kayaan Keki Unwalla',               grp:'Founders',        cls:'Ordinary',                 shares:3500,  founder:true, entry:'Founder', roundKey:'base', src:'CT'},
      {id:'inv', name:'Inveniam Middle East',              grp:'Other ordinary',  cls:'Ordinary · terms not stated', shares:1450, entry:'≤ Nov 2025', roundKey:'base', src:'CT', note:'1,450 Ordinary Shares — no price, amount or date in the cap table, Schedule 2 or the term sheets'},
      {id:'pool',name:'Share Incentive Scheme',            grp:'ESOP',            cls:'B Shares · unissued · no vote', shares:5000, pool:true, entry:'—', roundKey:'base', src:'CT'},
      {id:'eo',  name:'Eyad Omari',                        grp:'Angels / Legacy', cls:'Legacy Pref. · 1×',        shares:2331,  pps:107.25, cost:249999.75, entry:'≤ Jan 2024', roundKey:'base', src:'SHA', page:'Sch. 2 Part 4', pref:1},
      {id:'c42', name:'Core42 Investments 1 SPV', short:'G42', grp:'Seed',        cls:'Seed Pref. · 2×',          shares:25000, pps:100,    cost:2500000,   entry:'Feb 2024',  roundKey:'seed', src:'SHA', page:'Sch. 2 Part 1', pref:2, logo:'assets/logos/core42.png', co:'$10M post · ≈21.5×'},
      {id:'vw',  name:'Venturewave Capital No. 9',         grp:'Series A-1',      cls:'Series A-1 Pref. · 2×',    shares:3448,  pps:580,    cost:2000000,   entry:'2025',      roundKey:'a1first', src:'SHA', page:'Sch. 2 Part 2', pref:2, co:'$60M entry · marked $80M · ≈2.7×'},
      {id:'tit', name:'Titian RSC',                        grp:'Series A-1',      cls:'Series A-1 Pref. · 2×',    shares:5000,  pps:800,    cost:4000000,   entry:'Nov–Dec 2025', roundKey:'dec25', src:'SHA', page:'Sch. 2 Part 2', pref:2},
      {id:'dbb', name:'David Bennett',                     grp:'Angels / Legacy', cls:'Angel Pref. · 1×',         shares:250,   pps:800,    cost:200000,    entry:'Nov–Dec 2025', roundKey:'dec25', src:'SHA', page:'Sch. 2 Part 3', pref:1},
      {id:'rjg', name:'Robert Grim',                       grp:'Angels / Legacy', cls:'Angel Pref. · 1×',         shares:94,    pps:800,    cost:75000,     entry:'Nov–Dec 2025', roundKey:'dec25', src:'SHA', page:'Sch. 2 Part 3', pref:1}
    ],
    /* not on the register — shown, never priced from shares */
    offRegister:[
      {id:'nab',  name:'Nabyl (Further Ventures)', round:'secondary · not on the register', cost:1600000, entryValM:80, src:'CO', note:'$1.6M secondary at ≈$80M on the Chairman chart (30 Aug 2026); a secondary purchase creates no register line — the reconciled cap table flags the identity as unresolved'},
      {id:'bcap', name:'B Capital', logo:'assets/logos/b-capital.svg', round:'in conversation · no committed amount', src:'CO', note:'investor conversation #2 on the capital plan card; the 29 Jun 2026 brief states no entry price, date or stake'}
    ],
    /* the waterfall: the seed closed on a round 100,000-share base (Core42 25,000 = 25.00% = $2.5M ÷ $10.0M), so the pre-seed base is 75,000 shares */
    rounds:[
      {key:'base',   label:'Pre-seed base · Legacy (Omari)',            short:'Base',        when:'≤ Jan 2024',    pps:107.25, src:'CT',  note:'founders 66,219 + Inveniam 1,450 + unissued pool 5,000 + Legacy Preferred 2,331 = 75,000 shares in place before the seed; the only priced line is Omari at $107.25 (Sch. 2 Part 4)'},
      {key:'seed',   label:'Seed · Core42 (G42)',                        short:'Seed',        when:'Feb 2024',      pps:100,    src:'SHA', page:'Sch. 2 Part 1'},
      {key:'a1first',label:'Series A-1 first close · VentureWave',      short:'A-1 first',   when:'2025',          pps:580,    src:'SHA', page:'Sch. 2 Part 2'},
      {key:'dec25',  label:'Series A-1 final close · Dec-2025 round',   short:'Dec-2025',    when:'Nov–Dec 2025',  pps:800,    src:'SHA', page:'Sch. 2 Parts 2–3', note:'Titian 5,000 + Bennett 250 + Grim 94 at $800.00 — the round announced as "$8M @ $90M" (journey deck)'},
      {key:'a2',     label:'Series A2 · $200M pre-money',              short:'A2 · $200M',  when:'Jan 2027 ○',    preM:200,   raiseM:5, src:'TS', target:true},
      {key:'r500',   label:'$500M round ○ · illustrative $25M',       short:'$500M ○',     when:'≈ Apr 2027 ○',  preM:500,   src:'A',  target:true, illustrative:true},
      {key:'r1b',    label:'$1B round ○ · illustrative $50M',         short:'$1B ○',       when:'≈ Jul 2027 ○',  preM:1000,  src:'A',  target:true, illustrative:true}
    ],
    groups:['Founders','ESOP','Seed','Series A-1','Angels / Legacy','Other ordinary','Series A2','$500M round','$1B round'],
    groupColors:{'Founders':'#0E7A5F','ESOP':'#B8C4BE','Seed':'#A5884B','Series A-1':'#12B886','Angels / Legacy':'#D9C48A','Other ordinary':'#6C7E75','Series A2':'#B4533A','$500M round':'#E4CB8C','$1B round':'#7FB8A6'}
  };
  const SRC_TITLE={CT:'Cap table 26 Jul 2026 — "Final Cap table post Series-A1", AIREV Holding Limited (table dated 11/6/2025), reconciled 8 Sep 2026',SHA:'Amended & Restated Shareholders\u2019 Agreement (Nov 2025) — Schedule 2 prices, Cl. 1.1 consents, Sch. 3 reserved matters',TS:'Series A2 term sheets — Terra draft ($5M at $200M pre) and Itqan V6, 11 May 2026 ($5M at $137.85M pre)',CO:'Chairman overview, 30 Aug 2026 — $215M current mark, investor entry marks',IM:'Investment Memorandum, Aug 2026',A:'illustrative assumption — no document states this round size (CAPITAL.assumedRaise in content.js)'};
  const chip=k=>`<span class="src${k==='A'?' a':''}" title="${esc(SRC_TITLE[k]||k)}">${k}</span>`;
  const fUSD=v=>v==null?'—':(Math.abs(v)>=1e9?'$'+(v/1e9).toFixed(2)+'B':Math.abs(v)>=1e6?'$'+(v/1e6).toFixed(2)+'M':'$'+Math.round(v).toLocaleString('en-US'));
  const fM=v=>v==null?'—':(v>=1000?'$'+(v/1000).toFixed(v%1000?2:1).replace(/\.?0+$/,'')+'B':'$'+(Number.isInteger(v)?v:v.toFixed(2))+'M');
  const fMoney=v=>v==null?'—':(v>=1e9?'$'+(v/1e9).toFixed(2)+'B':v>=1e8?'$'+Math.round(v/1e6)+'M':'$'+(v/1e6).toFixed(2)+'M');
  const fP=(v,d=2)=>v==null?'—':v.toFixed(d)+'%';
  const fN=v=>v==null?'—':Math.round(v).toLocaleString('en-US');
  const fX=v=>v==null?'—':v.toFixed(1)+'×';
  const fPPS=v=>v==null?'—':'$'+v.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

  /* ---- build the ladder ---- */
  function buildCapital(){
    const H=CAPITAL.holders.map(h=>Object.assign({},h));
    const founderSh=H.filter(h=>h.founder).reduce((a,h)=>a+h.shares,0);
    const todaySh=H.reduce((a,h)=>a+h.shares,0);
    const pool=CAPITAL.poolShares;
    const rounds=[]; let sh=0, cum=0; const grp={}; const stageHolders=[];
    const addG=(g,n)=>{ grp[g]=(grp[g]||0)+n; };
    CAPITAL.rounds.forEach(r=>{
      const o=Object.assign({},r);
      if(r.key==='base'){
        const members=H.filter(h=>h.roundKey==='base'); members.forEach(h=>addG(h.grp,h.shares));
        o.newShares=members.reduce((a,h)=>a+h.shares,0); o.preSh=0; o.postSh=o.newShares; o.raised=members.reduce((a,h)=>a+(h.cost||0),0); o.pps=null; o.preMoney=null; o.postMoney=null; sh=o.postSh;
      } else if(r.preM!=null){
        const raiseM=r.raiseM!=null?r.raiseM:CAPITAL.assumedRaise[r.key];
        o.raiseM=raiseM; o.raised=raiseM*1e6; o.preSh=sh; o.pps=r.preM*1e6/sh; o.newShares=Math.floor(o.raised/o.pps); o.postSh=sh+o.newShares;
        o.preMoney=r.preM*1e6; o.postMoney=o.pps*o.postSh; o.pctSoldFormula=raiseM/(r.preM+raiseM)*100;
        const g=r.key==='a2'?'Series A2':(r.key==='r500'?'$500M round':'$1B round'); addG(g,o.newShares);
        stageHolders.push({id:'new-'+r.key, name:r.key==='a2'?'Series A2 investor (Terra draft / SPV)':(r.key==='r500'?'$500M-round investor(s)':'$1B-round investor(s)'), grp:g, cls:r.key==='a2'?'Series A2 Pref. · 2× (TS)':'new money · target ○', shares:o.newShares, pps:o.pps, cost:o.raised, entry:r.when, roundKey:r.key, src:r.src, stage:r.key, target:true, pref:r.key==='a2'?2:null});
        sh=o.postSh;
      } else {
        const members=H.filter(h=>h.roundKey===r.key); members.forEach(h=>addG(h.grp,h.shares));
        o.newShares=members.reduce((a,h)=>a+h.shares,0); o.raised=members.reduce((a,h)=>a+(h.cost||0),0); o.preSh=sh; o.postSh=sh+o.newShares; o.preMoney=r.pps*o.preSh; o.postMoney=r.pps*o.postSh; sh=o.postSh;
      }
      cum+=o.raised||0; o.cum=cum;
      o.dilution=o.postSh?o.newShares/o.postSh*100:0;
      o.foundersFD=founderSh/o.postSh*100; o.foundersVote=founderSh/(o.postSh-pool)*100; o.poolPct=pool/o.postSh*100;
      o.groups=CAPITAL.groups.map(g=>({g,sh:grp[g]||0,pct:(grp[g]||0)/o.postSh*100}));
      o.sumPct=o.groups.reduce((a,x)=>a+x.pct,0);
      rounds.push(o);
    });
    const byKey=Object.fromEntries(rounds.map(r=>[r.key,r]));
    /* the marks: today ($215M on the 108,792-share register), $200M (= the A2 price), $500M and $1B (= the price of that round; the same for every holder before and after it) */
    const marks={
      today:{key:'today',label:'$'+CAPITAL.todayMarkM+'M · today\u2019s mark',valueM:CAPITAL.todayMarkM,pps:CAPITAL.todayMarkM*1e6/todaySh,stages:[],src:'CO'},
      m200:{key:'m200',label:'$200M · A2 price',valueM:200,pps:byKey.a2.pps,stages:['a2'],src:'TS'},
      m500:{key:'m500',label:'$500M ○',valueM:500,pps:byKey.r500.pps,stages:['a2','r500'],src:'A'},
      m1b:{key:'m1b',label:'$1B ○',valueM:1000,pps:byKey.r1b.pps,stages:['a2','r500','r1b'],src:'A'}
    };
    Object.values(marks).forEach(m=>{ const extra=stageHolders.filter(h=>m.stages.includes(h.stage)); m.holders=H.concat(extra); m.totalSh=m.holders.reduce((a,h)=>a+h.shares,0); m.postMoney=m.pps*m.totalSh; m.foundersFD=founderSh/m.totalSh*100; });
    /* entry valuation & % bought at entry per holder (post-money of its round, on the round's closing share count) */
    H.forEach(h=>{ const r=byKey[h.roundKey]; if(r&&r.postMoney!=null){ h.entryValM=r.postMoney/1e6; h.pctAtEntry=h.shares/r.postSh*100; } else if(h.id==='eo'){ h.entryValM=75000*107.25/1e6; h.pctAtEntry=h.shares/75000*100; h.implied=true; } });
    stageHolders.forEach(h=>{ const r=byKey[h.roundKey]; h.entryValM=r.postMoney/1e6; h.pctAtEntry=h.shares/r.postSh*100; });
    /* value of a holding at each mark = shares × that mark's price per share */
    const valueAt=(shares,mk)=>shares*marks[mk].pps;
    /* the Itqan V6 alternative for the A2 (same $5M at $137.85M pre) */
    const itqan=(()=>{ const pps=CAPITAL.a2.tsPreM*1e6/todaySh; const n=Math.floor(CAPITAL.a2.raiseM*1e6/pps); const post=todaySh+n; return {pps,newShares:n,postSh:post,pct:n/post*100,foundersFD:founderSh/post*100,foundersVote:founderSh/(post-pool)*100,postMoney:pps*post}; })();
    /* sensitivity — 10% of pre-money at the $500M and $1B stages */
    const stress=(()=>{ let s=byKey.a2.postSh; const out={}; [['r500',500],['r1b',1000]].forEach(([k,preM])=>{ const pps=preM*1e6/s; const n=Math.floor(CAPITAL.stressRaise[k]*1e6/pps); s+=n; out[k]={raiseM:CAPITAL.stressRaise[k],pps,newShares:n,postSh:s,foundersFD:founderSh/s*100,foundersVote:founderSh/(s-pool)*100,dilution:n/s*100}; }); return out; })();
    /* the documented potential dilution event outside the rounds: the Kairoswealth share-for-share combination (LOI 23 Aug 2026) — consideration 10–20% of the combined equity, in shares, after the A2 */
    const kairos=[0.10,0.20].map(p=>{ const base=byKey.a2.postSh; const n=Math.round(base*p/(1-p)); const t=base+n; return {pct:p*100,newShares:n,postSh:t,foundersFD:founderSh/t*100,foundersVote:founderSh/(t-pool)*100}; });
    /* thresholds: the Cl. 1.1 test is 50% of the VOTING rights (B Shares carry none) */
    const firstBelowFD=rounds.find(r=>r.foundersFD<50), firstBelowVote=rounds.find(r=>r.foundersVote<50);
    const headroomSh=founderSh/0.5-(todaySh-pool);               /* new voting shares the founders can absorb before 50% */
    const headroomUSD={m200:headroomSh*marks.m200.pps,m500:headroomSh*marks.m500.pps,m1b:headroomSh*marks.m1b.pps};
    const r1b=byKey.r1b; const maxRaise1bVote=((founderSh/0.5+pool)-r1b.preSh)*r1b.pps/1e6, maxRaise1bFD=((founderSh/0.5)-r1b.preSh)*r1b.pps/1e6;
    /* consent arithmetic today */
    const mi={c42:25000,tit:5000,vw:3448}; const miTot=Object.values(mi).reduce((a,b)=>a+b,0);
    const a1a2={tit:5000,vw:3448,a2:byKey.a2.newShares}; const a1a2Tot=Object.values(a1a2).reduce((a,b)=>a+b,0);
    const ordSh=H.filter(h=>/^Ordinary/.test(h.cls)).reduce((a,h)=>a+h.shares,0); const prefSh=H.filter(h=>h.pref).reduce((a,h)=>a+h.shares,0);
    const prefStack=H.reduce((a,h)=>a+(h.pref?h.pref*h.cost:0),0);
    return {H,founderSh,todaySh,pool,rounds,byKey,marks,valueAt,stageHolders,itqan,stress,kairos,firstBelowFD,firstBelowVote,headroomSh,headroomUSD,maxRaise1bVote,maxRaise1bFD,
      consents:{miShare:Object.fromEntries(Object.entries(mi).map(([k,v])=>[k,v/miTot*100])),a1a2Share:Object.fromEntries(Object.entries(a1a2).map(([k,v])=>[k,v/a1a2Tot*100])),foundersOfOrdinary:founderSh/ordSh*100,core42OfPreferred:25000/prefSh*100,prefSh,ordSh},
      prefStack, prefStackAfterA2:prefStack+2*CAPITAL.a2.raiseM*1e6,
      selfCheck:rounds.every(r=>Math.abs(r.sumPct-100)<1e-9)};
  }
  const CM=buildCapital(); window.capitalModel=CM;

  /* ---- card 13 (slide 17): the dilution line under each stage of the arc ---- */
  $$('.arc .node .dl[data-dil]').forEach(el=>{ const r=CM.byKey[el.dataset.dil]; if(!r) return;
    el.innerHTML=`<b>${fM(r.raiseM)}</b> raised${r.illustrative?' (illustrative ○)':''} · <b>${fP(r.dilution)}</b> sold · founders <b>${fP(r.foundersFD)}</b> FD / <b>${fP(r.foundersVote)}</b> votes after ${chip(r.src)}`;
    el.dataset.raisedM=r.raiseM; el.dataset.pctSold=r.dilution.toFixed(2); el.dataset.foundersAfter=r.foundersFD.toFixed(2); });

  /* ---- shared: a stacked-bar renderer (ownership by holder group / value by cohort) ---- */
  function stackedBars(el,o){
    const w=Math.max(360,el.clientWidth||520), h=Math.max(200,el.clientHeight||260); const m=Object.assign({l:40,r:10,t:22,b:34},o.margin||{}); const iw=w-m.l-m.r, ih=h-m.t-m.b;
    const n=o.labels.length, gw=iw/n, bw=Math.min(o.maxBar||64,gw*0.62); const yMax=o.yMax||100; const y=v=>m.t+ih-v/yMax*ih;
    let g=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="${esc(o.aria||'')}">`;
    g+='<g class="grid">'; const ticks=o.ticks||[0,25,50,75,100]; ticks.forEach(v=>{ g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${m.l-6}" y="${y(v)+4}" text-anchor="end" font-size="10" fill="#6C7E75">${o.yFmt?o.yFmt(v):v+'%'}</text>`; }); g+='</g>';
    o.labels.forEach((l,i)=>{ const x=m.l+gw*i+(gw-bw)/2; let acc=0;
      o.series.forEach(s=>{ const v=s.values[i]||0; if(v<=0) return; const y1=y(acc+v), y0=y(acc);
        g+=`<rect x="${x}" y="${y1}" width="${bw}" height="${Math.max(0,y0-y1)}" fill="${s.color}" opacity="${o.fade&&o.fade[i]?.82:1}"><title>${esc(l)} · ${esc(s.name)}: ${o.valFmt?o.valFmt(v):v.toFixed(2)+'%'}</title></rect>`;
        if(y0-y1>=13 && (s.label!==false)) g+=`<text x="${x+bw/2}" y="${(y0+y1)/2+3.5}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${s.ink||'#fff'}">${o.inFmt?o.inFmt(v):v.toFixed(1)}</text>`;
        acc+=v; });
      if(o.tops) g+=`<text class="val" x="${x+bw/2}" y="${y(acc)-5}" text-anchor="middle" font-size="10" fill="#10201B">${o.tops[i]}</text>`;
      g+=`<text x="${m.l+gw*i+gw/2}" y="${h-m.b+15}" text-anchor="middle" font-size="10.5" fill="#44584F">${l}</text>`;
      if(o.sub&&o.sub[i]) g+=`<text x="${m.l+gw*i+gw/2}" y="${h-m.b+27}" text-anchor="middle" font-size="9.5" fill="#6C7E75">${o.sub[i]}</text>`; });
    if(o.line){ const pts=o.line.values.map((v,i)=>({x:m.l+gw*i+gw/2,y:y(v)})); g+=`<path d="M${pts.map(p=>p.x+','+p.y).join(' L')}" fill="none" stroke="${o.line.color||'#B4533A'}" stroke-width="1.5" stroke-dasharray="4,3"/>`; pts.forEach((p,i)=>{ g+=`<circle cx="${p.x}" cy="${p.y}" r="3" fill="#fff" stroke="${o.line.color||'#B4533A'}" stroke-width="1.6"><title>${esc(o.line.name)} · ${esc(o.labels[i])}: ${o.valFmt?o.valFmt(o.line.values[i]):o.line.values[i]}</title></circle>`; }); }
    if(o.hline!=null){ g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(o.hline)}" y2="${y(o.hline)}" stroke="#B4533A" stroke-width="1.4" stroke-dasharray="2,3"/>`; if(o.hlineLabel) g+=`<text x="${w-m.r-4}" y="${y(o.hline)-4}" text-anchor="end" font-size="9.5" font-weight="600" fill="#B4533A">${o.hlineLabel}</text>`; }
    g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(0)}" y2="${y(0)}" stroke="#44584F" stroke-width="1"/></svg>`; el.innerHTML=g;
  }
  const legendHTML=(items)=>items.map(([c,t])=>`<span><i style="background:${c}"></i>${esc(t)}</span>`).join('');

  /* ---- card 14 (slide 18): round-by-round — dollars raised & dilution ---- */
  function renderRounds(){
    const T=$('#rounds-table'), K=$('#rounds-kpis'), C=$('#c-own'), L=$('#own-legend'); if(!T) return;
    const R=CM.rounds;
    T.innerHTML=`<thead><tr><th>Round</th><th>Date</th><th class="n">Pre-money</th><th class="n">Raised</th><th class="n">Post-money</th><th class="n">New shares</th><th class="n">Price / share</th><th class="n" title="new shares ÷ post-round fully diluted shares — the % of the company sold to the new money">Dilution to existing</th><th class="n">FD shares after</th><th class="n">Cumulative primary</th><th>Src</th></tr></thead>`;
    const tb=document.createElement('tbody');
    R.forEach(r=>{ const tr=document.createElement('tr'); tr.dataset.round=r.key; tr.className=r.target?'target':''; 
      tr.innerHTML=`<td class="h" title="${esc(r.note||'')}">${esc(r.label)}${r.key==='base'?' <span class="muted">*</span>':''}${r.illustrative?' <span class="muted">†</span>':''}</td><td>${esc(r.when)}</td><td class="n">${r.preMoney!=null?fMoney(r.preMoney):'—'}</td><td class="n" data-v="${Math.round(r.raised||0)}">${r.raised?fUSD(r.raised):'—'}</td><td class="n">${r.postMoney!=null?fMoney(r.postMoney):'—'}</td><td class="n">${fN(r.newShares)}</td><td class="n">${fPPS(r.pps)}</td><td class="n" data-v="${r.dilution.toFixed(4)}">${r.key==='base'?'—':'<b>'+fP(r.dilution)+'</b>'}</td><td class="n">${fN(r.postSh)}</td><td class="n" data-v="${Math.round(r.cum)}">${fUSD(r.cum)}</td><td>${chip(r.src)}</td>`;
      tb.appendChild(tr); });
    const signed=R.filter(r=>!r.target); const lastSigned=signed[signed.length-1];
    const tot=document.createElement('tr'); tot.className='total'; tot.innerHTML=`<td class="h">Register today · ${fN(CM.todaySh)} FD shares</td><td>11 lines</td><td class="n"></td><td class="n" data-v="${Math.round(lastSigned.cum)}">${fUSD(lastSigned.cum)} ●</td><td class="n">${fMoney(lastSigned.postMoney)} last priced</td><td class="n">${fN(CM.todaySh)}</td><td class="n">${fPPS(CM.marks.today.pps)} @ $${CAPITAL.todayMarkM}M</td><td class="n"></td><td class="n"></td><td class="n">${fUSD(R[R.length-1].cum)} through the arc ○</td><td>${chip('CT')}</td>`; tb.appendChild(tot);
    T.appendChild(tb); T.dataset.rows=String(R.length);
    if(K){ const a2=CM.byKey.a2, r1=CM.byKey.r1b; K.innerHTML=`<div class="k"><b>${fUSD(lastSigned.cum)}</b>primary raised to date · 108,792 FD sh${chip('CT')}</div><div class="k"><b>${fP(CM.founderSh/CM.todaySh*100)} → ${fP(a2.foundersFD)}</b>founders FD · today → after the A2${chip('TS')}</div><div class="k"><b>${fP(r1.foundersFD)} / ${fP(r1.foundersVote)}</b>founders FD / votes after the $1B round ○${chip('A')}</div><div class="k"><b>${fUSD(R[R.length-1].cum)}</b>cumulative primary through the arc ○${chip('A')}</div>`; }
    if(C){ const rows=R.filter(r=>r.key!=='base');
      stackedBars(C,{labels:rows.map(r=>r.short),sub:rows.map(r=>r.postMoney!=null?fM(+(r.postMoney/1e6).toFixed(r.postMoney>=1e9?2:0))+' post':''),
        series:CAPITAL.groups.map(g=>({name:g,color:CAPITAL.groupColors[g],values:rows.map(r=>r.groups.find(x=>x.g===g).pct),ink:/ESOP|Angels|\$500M|\$1B|Series A-1/.test(g)?'#10201B':'#fff'})),
        fade:rows.map(r=>r.target),margin:{l:38,r:8,t:14,b:36},hline:50,hlineLabel:'50% — founders\u2019 control line',aria:'Ownership by holder group after each round, fully diluted, stacked to 100%'}); }
    if(L) L.innerHTML=legendHTML(CAPITAL.groups.map(g=>[CAPITAL.groupColors[g],g]));
  }

  /* ---- card 15 (slide 19): money in — % bought and what it is worth at each mark ---- */
  function renderMoneyIn(){
    const T=$('#money-table'), C=$('#c-money'), L=$('#money-legend'), K=$('#money-kpis'); if(!T) return;
    const H=Object.fromEntries(CM.H.map(h=>[h.id,h]));
    const angels={id:'angels',name:'Angels · Bennett + Grim',grp:'Angels / Legacy',cls:'Angel Pref. · 1× · 250 + 94 sh at $800',shares:H.dbb.shares+H.rjg.shares,cost:H.dbb.cost+H.rjg.cost,entry:H.dbb.entry,roundKey:'dec25',src:'SHA',pref:1,entryValM:H.dbb.entryValM,pctAtEntry:(H.dbb.shares+H.rjg.shares)/CM.byKey.dec25.postSh*100,note:'David Bennett $200,000 for 250 shares; Robert Grim $75,000 for 94 shares — Angel Preferred, 1× preference (Sch. 2 Part 3)'};
    const rowsList=[H.eo,H.c42,H.vw,H.tit,angels].concat(CM.stageHolders);
    const roundLabel=h=>{ const r=CM.byKey[h.roundKey]; return r.key==='base'?'Legacy · pre-seed':(r.short||r.label); };
    T.innerHTML=`<thead><tr><th>Round</th><th>New investor</th><th class="n">Money in</th><th class="n" title="new shares ÷ fully diluted shares at that close">% FD bought at entry</th><th class="n">Entry post-money</th><th class="n" title="the holding re-priced at today\u2019s $215M mark — the register\u2019s 108,792 shares">Worth @ $215M today</th><th class="n" title="the holding at the Series A2 price — $200M pre on 108,792 shares ($205M post)">@ $200M A2 close</th><th class="n" title="the holding at the $500M round price (illustrative round)">@ $500M ○</th><th class="n" title="the holding at the $1B round price (illustrative round)">@ $1B ○</th><th class="n">Stake FD after $1B ○</th><th>Src</th></tr></thead>`;
    const tb=document.createElement('tbody'); const finalSh=CM.marks.m1b.totalSh;
    rowsList.forEach(h=>{ const tr=document.createElement('tr'); tr.dataset.id=h.id; tr.className=h.target?'target':'';
      const cost=h.cost; const v=(mk)=>CM.valueAt(h.shares,mk);
      const cell=(mk,ok)=>ok?`<td class="n" data-v="${Math.round(v(mk))}">${fUSD(v(mk))}${cost?` <span class="muted">${fX(v(mk)/cost)}</span>`:''}</td>`:'<td class="n">— <span class="muted">pre-entry</span></td>';
      const inA2=!h.stage||h.stage==='a2', in500=!h.stage||h.stage!=='r1b';
      tr.innerHTML=`<td class="h">${esc(roundLabel(h))}${h.target?' <span class="tag target">'+(h.stage==='a2'?'pending ○':'illustrative ○')+'</span>':''}</td><td class="h" title="${esc(h.note||h.cls)}">${h.logo?`<img class="mark" src="${h.logo}" alt="${esc(h.short||h.name)}">`:''}${esc(h.name)}${h.short?` <span class="muted">(${esc(h.short)})</span>`:''}</td><td class="n" data-v="${Math.round(cost)}">${fUSD(cost)}</td><td class="n" data-v="${h.pctAtEntry.toFixed(4)}"><b>${fP(h.pctAtEntry)}</b>${h.implied?' <span class="muted">◐</span>':''}</td><td class="n">${fM(+h.entryValM.toFixed(2))}${h.implied?' <span class="muted">◐</span>':''}</td>${cell('today',!h.stage)}${cell('m200',inA2)}${cell('m500',in500)}${cell('m1b',true)}<td class="n">${fP(h.shares/finalSh*100)}</td><td>${chip(h.src)}${h.implied?chip('A'):''}</td>`;
      tb.appendChild(tr); });
    const nab=CAPITAL.offRegister.find(x=>x.id==='nab'); const v215=nab.cost*CAPITAL.todayMarkM/nab.entryValM;
    const trn=document.createElement('tr'); trn.className='na'; trn.dataset.id='nab'; trn.title=nab.note; trn.innerHTML=`<td class="h">Secondary <span class="tag target">no register line</span></td><td class="h">${esc(nab.name)}</td><td class="n">${fUSD(nab.cost)}</td><td class="n">— <span class="muted">bought from a holder</span></td><td class="n">$80M <span class="muted">CO</span></td><td class="n" title="CO basis: $1.6M × 215 ÷ 80">${fUSD(v215)} <span class="muted">${fX(v215/nab.cost)}</span></td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td>${chip('CO')}</td>`; tb.appendChild(trn);
    /* totals: outside money on the register */
    const reg=[H.eo,H.c42,H.vw,H.tit,H.dbb,H.rjg]; const sum=(mk)=>reg.reduce((a,h)=>a+CM.valueAt(h.shares,mk),0); const costSum=reg.reduce((a,h)=>a+h.cost,0);
    const tot=document.createElement('tr'); tot.className='total'; tot.innerHTML=`<td class="h">Outside primary on the register</td><td>6 investors ●</td><td class="n" data-v="${Math.round(costSum)}">${fUSD(costSum)}</td><td class="n"></td><td class="n"></td><td class="n" data-v="${Math.round(sum('today'))}">${fUSD(sum('today'))} <span class="muted">${fX(sum('today')/costSum)}</span></td><td class="n">${fUSD(sum('m200'))}</td><td class="n">${fUSD(sum('m500'))}</td><td class="n">${fUSD(sum('m1b'))}</td><td class="n">${fP(reg.reduce((a,h)=>a+h.shares,0)/finalSh*100)}</td><td>${chip('CT')}</td>`; tb.appendChild(tot);
    T.appendChild(tb); T.dataset.rows=String(rowsList.length+2); T.dataset.outsideCost=String(Math.round(costSum)); T.dataset.outsideToday=String(Math.round(sum('today')));
    if(K){ const c42=H.c42; K.innerHTML=`<div class="k"><b>${fUSD(costSum)} → ${fUSD(sum('today'))}</b>outside money on the register · today\u2019s $215M mark${chip('CO')}</div><div class="k"><b>${fP(c42.pctAtEntry)} → ${fP(c42.shares/CM.todaySh*100)}</b>G42\u2019s 25,000 shares · bought → today (FD)${chip('CT')}</div><div class="k"><b>${fP(CM.byKey.a2.dilution)} for $5M</b>Series A2 at $200M pre · ${fPPS(CM.byKey.a2.pps)} / share${chip('TS')}</div><div class="k"><b>${fP(CM.itqan.pct)} for $5M</b>the Itqan V6 alternative · $137.85M pre · ${fPPS(CM.itqan.pps)}${chip('TS')}</div>`; }
    if(C){ /* what the outside money is worth at each mark, stacked by cohort, against the money in */
      const cohorts=[['Seed',['c42']],['Series A-1',['vw','tit']],['Angels / Legacy',['eo','dbb','rjg']],['Series A2',['new-a2']],['$500M round',['new-r500']],['$1B round',['new-r1b']]];
      const all=Object.assign({},H,Object.fromEntries(CM.stageHolders.map(h=>[h.id,h])));
      const mks=['today','m200','m500','m1b']; const labels=['$215M today','$200M · A2 close','$500M ○','$1B ○'];
      const inMark=(h,mk)=>!h.stage||CM.marks[mk].stages.includes(h.stage);
      const series=cohorts.map(([g,ids])=>({name:g,color:CAPITAL.groupColors[g],ink:/Angels|\$500M|\$1B|Series A-1/.test(g)?'#10201B':'#fff',values:mks.map(mk=>ids.reduce((a,id)=>a+(inMark(all[id],mk)?CM.valueAt(all[id].shares,mk)/1e6:0),0))}));
      const moneyIn=mks.map(mk=>Object.values(all).reduce((a,h)=>a+((h.cost&&inMark(h,mk))?h.cost/1e6:0),0));
      const tops=mks.map((mk,i)=>fM(+series.reduce((a,s)=>a+s.values[i],0).toFixed(0))+' vs '+fM(+moneyIn[i].toFixed(1))+' in');
      const yMax=niceMaxLocal(series.reduce((a,s)=>a+s.values[3],0)*1.15);
      stackedBars(C,{labels,series,tops,yMax,ticks:[0,yMax*0.25,yMax*0.5,yMax*0.75,yMax],yFmt:v=>'$'+Math.round(v)+'M',valFmt:v=>'$'+v.toFixed(1)+'M',inFmt:v=>v>=10?'$'+v.toFixed(0)+'M':'$'+v.toFixed(1)+'M',line:{name:'money in (cumulative outside primary)',values:moneyIn,color:'#B4533A'},margin:{l:46,r:8,t:16,b:26},maxBar:76,aria:'Value of the outside investors\u2019 holdings at each mark, stacked by cohort, against the money invested'}); }
    if(L) L.innerHTML=legendHTML([['#A5884B','Seed'],['#12B886','Series A-1'],['#D9C48A','Angels / Legacy'],['#B4533A','Series A2 ○'],['#E4CB8C','$500M round ○'],['#7FB8A6','$1B round ○']])+'<span><i style="background:#fff;border:1.5px dashed #B4533A"></i>money in</span>';
  }
  function niceMaxLocal(v){ const p=Math.pow(10,Math.floor(Math.log10(v||1))); const n=v/p; const m=n<=1?1:n<=2?2:n<=2.5?2.5:n<=4?4:n<=5?5:n<=6?6:n<=8?8:10; return m*p; }

  /* ---- card 16 (slide 20): who came in at what — and what they have made ---- */
  const capT=$('#cap-table'), capK=$('#cap-kpis');
  function nameCell(h,extraTag){ return `<td class="h" title="${esc(h.note||h.name)}">${h.logo?`<img class="mark" src="${h.logo}" alt="${esc(h.short||h.name)}">`:''}${esc(h.name)}${h.short?` <span class="muted">(${esc(h.short)})</span>`:''}${extraTag||''}</td>`; }
  function renderCapTable(){
    if(!capT) return;
    const fd=CM.todaySh; const pct=sh=>sh/fd*100; const v215=sh=>CM.valueAt(sh,'today');
    capT.innerHTML=`<thead><tr><th>Holder</th><th>Round · class</th><th>Entry date</th><th class="n">Entry valuation<br>(post-money)</th><th class="n">Cash in</th><th class="n">Stake today<br>(FD)</th><th class="n">Value @ $${CAPITAL.todayMarkM}M<br>current mark</th><th class="n" title="value at the $215M mark ÷ cash in — unrealised, before preferences">Unrealised<br>multiple</th><th class="n" title="Cl. 7.1: 2× Original Issue Price on Seed and Series A-1 (and the A2 per its term sheet); 1× on Angel and Legacy">Preference<br>amount</th><th>Src</th></tr></thead>`;
    const rows=[];
    rows.push(`<tr class="founder sub" data-id="founders"><td class="h">Founders (OT · YY · KU) <span class="tag signed">founders</span></td><td>Ordinary</td><td>—</td><td class="n">—</td><td class="n">—</td><td class="n" data-v="${pct(CM.founderSh).toFixed(4)}"><b>${fP(pct(CM.founderSh))}</b> <span class="muted">· ${fP(CM.founderSh/(fd-CM.pool)*100)} votes</span></td><td class="n" data-v="${Math.round(v215(CM.founderSh))}">${fUSD(v215(CM.founderSh))}</td><td class="n">—</td><td class="n">—</td><td>${chip('CT')}</td></tr>`);
    const order=['c42','tit','vw','nab','eo','angels','inv','pool'];
    const H=Object.fromEntries(CM.H.map(h=>[h.id,h])); const nab=CAPITAL.offRegister.find(x=>x.id==='nab');
    H.angels={id:'angels',name:'Angels · Bennett + Grim',cls:'Angel Pref. · 1×',shares:H.dbb.shares+H.rjg.shares,cost:H.dbb.cost+H.rjg.cost,entry:H.dbb.entry,entryValM:H.dbb.entryValM,src:'SHA',pref:1,note:'David Bennett $200,000 for 250 shares; Robert Grim $75,000 for 94 shares — Angel Preferred, 1× (Sch. 2 Part 3); cap table prints them as "Series-A Preferred 1.0x"'};
    order.forEach(id=>{ 
      if(id==='nab'){ const v=nab.cost*CAPITAL.todayMarkM/nab.entryValM;
        rows.push(`<tr class="na" data-id="nab" title="${esc(nab.note)}"><td class="h">${esc(nab.name)} <span class="tag target">secondary</span></td><td>Secondary purchase</td><td>—</td><td class="n">$80.0M <span class="muted">CO</span></td><td class="n">${fUSD(nab.cost)}</td><td class="n">— <span class="muted">*</span></td><td class="n" title="CO basis: $1.6M × 215 ÷ 80">${fUSD(v)}</td><td class="n">${fX(v/nab.cost)} <span class="muted">CO</span></td><td class="n">—</td><td>${chip('CO')}</td></tr>`); return; }
      const h=H[id]; const val=v215(h.shares); const mult=h.cost?val/h.cost:null;
      const ev=h.entryValM!=null?fM(+h.entryValM.toFixed(1))+(h.implied?' <span class="muted">◐</span>':''):(h.pool?'—':'not stated');
      rows.push(`<tr class="${h.pool?'pool':''}" data-id="${h.id}">${nameCell(h,h.pool?' <span class="tag target">unissued</span>':'')}<td title="${esc(h.cls)}">${esc(h.cls)}</td><td>${esc(h.entry)}</td><td class="n">${ev}</td><td class="n">${h.cost!=null?fUSD(h.cost):(h.pool?'—':'not stated')}</td><td class="n" data-v="${pct(h.shares).toFixed(4)}"><b>${fP(pct(h.shares))}</b></td><td class="n" data-v="${Math.round(val)}">${fUSD(val)}</td><td class="n" data-v="${mult!=null?mult.toFixed(3):''}">${mult!=null?'<b>'+fX(mult)+'</b>':'—'}</td><td class="n">${h.pref?fUSD(h.pref*h.cost)+' <span class="muted">'+h.pref+'×</span>':'—'}</td><td>${chip(h.src)}${h.co?chip('CO'):''}${h.implied?chip('A'):''}</td></tr>`); });
    const a2=CM.byKey.a2;
    rows.push(`<tr class="target" data-id="a2"><td class="h">Series A2 investor · Terra draft / SPV <span class="tag target">pending ○</span></td><td>Series A2 Pref. · 2× (TS)</td><td>${esc(a2.when)}</td><td class="n" title="$200M pre-money · $205M post">$205.0M</td><td class="n">${fUSD(a2.raised)}</td><td class="n" data-v="${a2.dilution.toFixed(4)}">${fP(a2.dilution)} <span class="muted">at close</span></td><td class="n">— <span class="muted">pre-entry</span></td><td class="n">1.0× <span class="muted">at close</span></td><td class="n">${fUSD(2*a2.raised)} <span class="muted">2×</span></td><td>${chip('TS')}</td></tr>`);
    const invested=CM.H.reduce((s,h)=>s+(h.cost||0),0);
    rows.push(`<tr class="total"><td class="h">Register total · ${fN(fd)} FD shares</td><td>11 lines</td><td></td><td class="n"></td><td class="n" data-v="${Math.round(invested)}">${fUSD(invested)}</td><td class="n" data-sum="100.0000">100.00% ✓</td><td class="n">${fUSD(CAPITAL.todayMarkM*1e6)}</td><td class="n"></td><td class="n" data-v="${Math.round(CM.prefStack)}">${fUSD(CM.prefStack)}</td><td>${chip('CT')}</td></tr>`);
    capT.innerHTML+='<tbody>'+rows.join('')+'</tbody>'; capT.dataset.rows=String(rows.length);
    if(capK){ capK.innerHTML=`<div class="k"><b>${fP(CM.founderSh/CM.todaySh*100)} · ${fP(CM.founderSh/(CM.todaySh-CM.pool)*100)}</b>founders\u2019 collective today · FD · votes${chip('CT')}</div><div class="k"><b>${fX(v215(H.c42.shares)/H.c42.cost)}</b>G42 on the register (≈21.5× on the Chairman chart, 25% undiluted)${chip('CO')}</div><div class="k"><b>${fUSD(CM.prefStack)} → ${fUSD(CM.prefStackAfterA2)}</b>preference stack · today → after the A2${chip('SHA')}</div><div class="k"><b>${fPPS(CM.marks.today.pps)}</b>per share at the $${CAPITAL.todayMarkM}M mark · $800 last paid</div>`; }
    const MC=$('#c-mult'); if(MC){ const items=[['G42 · Seed · $2.5M',v215(H.c42.shares)/H.c42.cost],['Omari · Legacy · $0.25M',v215(H.eo.shares)/H.eo.cost],['VentureWave · A-1 · $2.0M',v215(H.vw.shares)/H.vw.cost],['Nabyl · secondary · $1.6M (CO)',CAPITAL.todayMarkM/nab.entryValM],['Titian · A-1 · $4.0M',v215(H.tit.shares)/H.tit.cost],['Angels · Bennett + Grim · $0.28M',v215(H.angels.shares)/H.angels.cost]];
      hbarChart(MC,{labels:items.map(x=>x[0]),values:items.map(x=>x[1]),colors:items.map(x=>/CO\)/.test(x[0])?'#A5884B':'#0E7A5F'),valFmt:v=>v.toFixed(1)+'×',track:true,valuesAt:'edge',barHeight:13,rx:3,minBar:4,labelSize:10.5,valueSize:11,margin:{l:212,r:48,t:2,b:2}}); }
  }

  /* ---- card 17 (slide 21): control — where founder consent stops ---- */
  function renderControl(){
    const C=$('#c-ctl'); const S=$('#ctl-statement'); const T=$('#ctl-title'); if(!C&&!S) return;
    const R=CM.rounds.filter(r=>r.key!=='base'); const n=R.length;
    const stressFD=R.map(r=>r.key==='r500'?CM.stress.r500.foundersFD:r.key==='r1b'?CM.stress.r1b.foundersFD:r.foundersFD);
    const stressVote=R.map(r=>r.key==='r500'?CM.stress.r500.foundersVote:r.key==='r1b'?CM.stress.r1b.foundersVote:r.foundersVote);
    if(C){ const w=Math.max(480,C.clientWidth||720), h=Math.max(220,C.clientHeight||300); const m={l:42,r:150,t:16,b:40}; const iw=w-m.l-m.r, ih=h-m.t-m.b; const yMin=40,yMax=75; const y=v=>m.t+ih-(v-yMin)/(yMax-yMin)*ih; const x=i=>m.l+iw*(i/(n-1));
      let g=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Founders\u2019 collective percentage after every round: fully diluted and voting, base case and the 10% stress case, against the 50% voting-rights test of the shareholders\u2019 agreement">`;
      g+='<g class="grid">'; [40,45,50,55,60,65,70,75].forEach(v=>{ g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${m.l-6}" y="${y(v)+4}" text-anchor="end" font-size="10" fill="#6C7E75">${v}%</text>`; }); g+='</g>';
      /* 50% band */
      g+=`<rect x="${m.l}" y="${y(50)}" width="${iw}" height="${y(yMin)-y(50)}" fill="rgba(180,83,58,.05)"/>`;
      g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(50)}" y2="${y(50)}" stroke="#B4533A" stroke-width="1.6" stroke-dasharray="3,3"/>`;
      g+=`<text x="${w-m.r+8}" y="${y(50)-3}" font-size="9.5" font-weight="600" fill="#B4533A">50% of votes — SHA Cl. 1.1</text><text x="${w-m.r+8}" y="${y(50)+9}" font-size="9" fill="#B4533A">below it Founder Consent →</text><text x="${w-m.r+8}" y="${y(50)+20}" font-size="9" fill="#B4533A">Major Investor Director Consent</text>`;
      const line=(vals,col,dash,wd)=>{ const pts=vals.map((v,i)=>({x:x(i),y:y(v)})); return `<path d="M${pts.map(p=>p.x+','+p.y).join(' L')}" fill="none" stroke="${col}" stroke-width="${wd}" stroke-dasharray="${dash}"/>`; };
      /* stress lines (10% of pre-money) — drawn first, thin */
      g+=line(stressFD,'#0E7A5F','2,4',1.3)+line(stressVote,'#A5884B','2,4',1.3);
      [['FD',stressFD,'#0E7A5F'],['votes',stressVote,'#A5884B']].forEach(([nm,vals,col])=>{ const i=n-1; g+=`<circle cx="${x(i)}" cy="${y(vals[i])}" r="3" fill="#fff" stroke="${col}" stroke-width="1.4"><title>10% stress case ($50M at $500M, $100M at $1B): founders ${vals[i].toFixed(2)}% ${nm}</title></circle><text x="${x(i)+6}" y="${y(vals[i])+(nm==='FD'?11:-4)}" font-size="9" fill="${col}">${vals[i].toFixed(1)}% ${nm} · 10% case</text>`; });
      /* base lines */
      g+=line(R.map(r=>r.foundersFD),'#0E7A5F','',2.4)+line(R.map(r=>r.foundersVote),'#A5884B','',2.4);
      R.forEach((r,i)=>{ [['foundersFD','#0E7A5F',-8],['foundersVote','#A5884B',-8]].forEach(([k,col,dy])=>{ g+=`<circle cx="${x(i)}" cy="${y(r[k])}" r="4" fill="#fff" stroke="${col}" stroke-width="2"><title>${esc(r.label)}: founders ${r[k].toFixed(2)}% ${k==='foundersFD'?'fully diluted':'of votes'}</title></circle><text x="${x(i)}" y="${y(r[k])+(k==='foundersFD'?14:dy)}" text-anchor="middle" font-size="9.5" font-weight="600" fill="${col}">${r[k].toFixed(1)}%</text>`; });
        g+=`<text x="${x(i)}" y="${h-m.b+15}" text-anchor="middle" font-size="10.5" fill="#44584F">${esc(r.short)}</text><text x="${x(i)}" y="${h-m.b+27}" text-anchor="middle" font-size="9" fill="#6C7E75">${esc(r.when.replace(' ○',''))}</text>`; });
      /* Itqan alternative for the A2 */
      { const i=R.findIndex(r=>r.key==='a2'); g+=`<circle cx="${x(i)}" cy="${y(CM.itqan.foundersVote)}" r="3" fill="#A5884B" opacity=".55"><title>Itqan V6 alternative ($5M at $137.85M pre, 3.50%): founders ${CM.itqan.foundersFD.toFixed(2)}% FD · ${CM.itqan.foundersVote.toFixed(2)}% votes</title></circle>`; }
      /* Kairoswealth 20% ceiling — a documented potential event, not a round */
      { const i=R.findIndex(r=>r.key==='a2'); const k=CM.kairos[1]; const kx=x(i)+iw/(n-1)*0.5; g+=`<line x1="${kx}" x2="${kx}" y1="${y(k.foundersVote)}" y2="${y(R[i].foundersVote)}" stroke="#B4533A" stroke-width="1" stroke-dasharray="2,2"/><circle cx="${kx}" cy="${y(k.foundersVote)}" r="4" fill="#B4533A"><title>Kairoswealth combination at its 20% consideration ceiling, in shares, after the A2 (LOI 23 Aug 2026 — potential): founders ${k.foundersFD.toFixed(2)}% FD · ${k.foundersVote.toFixed(2)}% votes</title></circle><text x="${kx}" y="${y(k.foundersVote)+14}" text-anchor="middle" font-size="9" font-weight="600" fill="#B4533A">${k.foundersVote.toFixed(1)}% votes if the</text><text x="${kx}" y="${y(k.foundersVote)+24}" text-anchor="middle" font-size="9" font-weight="600" fill="#B4533A">combination pays 20% in shares ○</text>`; }
      g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(yMin)}" y2="${y(yMin)}" stroke="#44584F" stroke-width="1"/></svg>`; C.innerHTML=g; }
    const vt=CM.firstBelowVote, fd=CM.firstBelowFD, last=CM.byKey.r1b, s1=CM.stress.r1b, k20=CM.kairos[1], k10=CM.kairos[0];
    if(T) T.textContent=vt?`Founder Consent flips at the ${vt.short}: the founders\u2019 votes drop below 50%.`:`No round on the arc takes the founders below 50% of votes — Founder Consent survives the arc.`;
    if(S){ S.innerHTML=`<b>Where control stops.</b> The agreement tests <b>votes</b>, not fully diluted shares: Founder Consent is the unanimous consent of OT, YY and KU while they hold ≥ 50% of the voting rights (Cl. 1.1; unissued B Shares carry none) and becomes Major Investor Director Consent below that line or after an IPO. On the arc as modelled the founders end at <b>${fP(last.foundersVote)} of votes / ${fP(last.foundersFD)} FD</b> after the $1B round — <b>no round crosses the line</b>. In the 10% stress case ($50M at $500M, $100M at $1B) the FD line dips to ${fP(s1.foundersFD)} at the $1B round while votes hold at <b>${fP(s1.foundersVote)}</b>. The line is crossed only once cumulative new voting shares exceed <b>${fN(CM.headroomSh)}</b> — ≈ ${fM(Math.round(CM.headroomUSD.m200))} at the A2 price, ≈ ${fM(Math.round(CM.headroomUSD.m500))} at $500M, ≈ ${fM(Math.round(CM.headroomUSD.m1b))} at $1B; on the base path a $1B round above ≈ <b>${fM(Math.floor(CM.maxRaise1bVote))}</b>. The one documented event that flips it on its own is the Kairoswealth combination paid in shares at its 20% ceiling: <b>${fP(k20.foundersVote)} votes / ${fP(k20.foundersFD)} FD</b> (10% floor: ${fP(k10.foundersVote)} / ${fP(k10.foundersFD)}). <b>What survives a flip:</b> Founder Consent becomes Major Investor Director Consent, which itself needs two Founders plus two Major Investor Directors; the three Manager Director seats stay with the Ordinary majority (Cl. 2.3 — founders hold ${fP(CM.consents.foundersOfOrdinary,1)}); a Cl. 21.1 drag still needs ≥ 50% of the Ordinary Shares.`; }
    /* gate arithmetic today */
    const g1=$('#ctl-mi'); if(g1) g1.textContent=`Core42 ${fP(CM.consents.miShare.c42,1)} · Titian ${fP(CM.consents.miShare.tit,1)} · Venture Wave ${fP(CM.consents.miShare.vw,1)} of the Major Investors\u2019 votes — Core42 alone clears 50% but the consent must include two Major Investors, so it is Core42 plus one.`;
    const g2=$('#ctl-a2'); if(g2) g2.textContent=`on the $200M scenario: Titian ${fP(CM.consents.a1a2Share.tit,1)} · Venture Wave ${fP(CM.consents.a1a2Share.vw,1)} · the A2 investor ${fP(CM.consents.a1a2Share.a2,1)} of the class — no single holder has a majority; Titian is pivotal in every winning pair.`;
    const g3=$('#ctl-drag'); if(g3) g3.textContent=`founders hold ${fP(CM.consents.foundersOfOrdinary,1)} of the Ordinary Shares and Core42 ${fP(CM.consents.core42OfPreferred,1)} of the Preferred — neither side can drag without the other.`;
  }
  renderRounds(); renderMoneyIn(); renderCapTable(); renderControl();
  addEventListener('resize',()=>{ renderRounds(); renderMoneyIn(); renderControl(); const MC=$('#c-mult'); if(MC&&capT) renderCapTable(); });
})();

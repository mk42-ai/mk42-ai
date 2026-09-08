/* Content-driven interactions v2: roadmap, all-signed partner grid, VVIP Sovereign JV scenario toggle, DC cost-share, valuation slider, charts. */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------------- Roadmap (8 quarters · 5 columns) ---------------- */
  const Q=[{"q": "Q4", "y": "2026", "gate": "JV incorporated; 100 seats live", "story": "Mandate", "cols": {"Partners": ["Qualcomm TLA: $100 per activated unit, perpetual, five silicon families ●", "Redington distribution: 8 MENA markets plus all of Africa ●", "Tenstorrent LOI: ~50% cost-share of first modular sovereign DC ●"], "Sovereign": ["G1: VVIP Sovereign JV MoU signed 8–10 October ○", "G2: JV incorporated 20 November; AED 20.4M committed capital ○", "G3: first 100 seats live 25 December ○"], "Platform": ["Offline OnDemand for Windows on Intel Panther Lake shipping ●", "Supermicro AS-2115HV-TNRT certified sovereign appliance ●", "NetApp AI data layer and Cisco networking in sovereign stack ●"], "Capital": ["2026 revenue $6.0M, 100% licensing ●", "Series A2 launched: $200M pre-money, closing January 2027 ○", "Kairoswealth USD 2M investment (potential, subject to completion) ○"], "Execution": ["Galaxy fleet rollout P0–P3: 23 units, 736 Blackhole chips ○", "Qualcomm/e& activation waves: ~10K AR glasses, ~11K AI PCs, ~4K appliances ○", "Moro Hub 100 MW solar Tier III hosting in place ●"]}}, {"q": "Q1", "y": "2027", "gate": "Series A2 closed; billing live", "story": "Proof", "cols": {"Partners": ["Redington price card: $110K/$200K/$360K across MENA and Africa ●", "WWT reseller agreement: US federal and state flow-downs active ●", "Alpha Data white-label reseller agreement, UAE ●"], "Sovereign": ["G4: five anchors contracted, ~500 seats, 29 January ○", "G5: JV launch and billing, 19 February ○", "G6: month-6 review and owned-compute decision, 26 March ○"], "Platform": ["AR runtime for Qualcomm XR2/AR1 glasses released ○", "Modular DC #1 commissioning with Tenstorrent ahead of Q2 go-live ○", "IBM/Dell models, channel and certified systems for OnDemand ●"], "Capital": ["$200M pre-money Series A2 closes ○", "JV Year-1 revenue AED 15.8M (model v13) ◐", "Kairoswealth ADGM Category 4 licence (potential, subject to completion) ○"], "Execution": ["Bangalore office opens — India engineering & delivery hub ○", "Qualcomm/e& AR glasses wave: AR runtime on ~10K units ○", "First 100 JV seats in production; five anchors onboarding ○"]}}, {"q": "Q2", "y": "2027", "gate": "Modular DC #1 live", "story": "Partners", "cols": {"Partners": ["Tenstorrent: modular sovereign DC #1 deployed under cost-share LOI ○", "WISER European lighthouse preparation for 2027 launch ○", "Core42 (G42) and ADQ master services agreements in force ●"], "Sovereign": ["GCC government sovereign deployment with Qualcomm and e& ○", "Owned-compute decision (G6) implemented; JV workloads onto modular DC #1 ○", "UXE Security Solutions integrating OnDemand for Dubai government security ●"], "Platform": ["Modular DC #1 live: 23 Galaxy units, 736 Blackhole chips ○", "Fleet all-in cost $2.9–4.4M, ~50% Tenstorrent cost-shared ◐", "Sovereign appliance on Supermicro and Dell certified systems ●"], "Capital": ["$500M round; modular DC #1 live with Tenstorrent ○", "$25–50M project facility against sovereign offtake (potential, subject to completion) ○", "BlackRock GIP/AIP-type and Blackstone-type infrastructure platforms (potential, subject to completion) ○"], "Execution": ["Qualcomm/e& AI PC wave: ~11K units activated ○", "Bangalore hub staffing delivery for India/South Asia ○", "Africa: Luanda flagship ~$12M scoping (potential, subject to completion) ○"]}}, {"q": "Q3", "y": "2027", "gate": "$1B valuation; 40% export", "story": "Capital", "cols": {"Partners": ["WISER European lighthouse deployment live ○", "WWT: first US federal/state opportunities via flow-downs ○", "Redington Africa distribution feeding export bookings ○"], "Sovereign": ["JV five anchors in production; ~500 seats billing ○", "Africa: Luanda flagship, ~2.0M students (potential, subject to completion) ○", "Core42/ADQ sovereign programmes scaling under MSAs ○"], "Platform": ["Modular DC #1 at steady state; owned compute serving JV ○", "OnDemand across all five Qualcomm silicon families ○", "Intel AI PC MOU: Panther Lake offline OnDemand in channel ●"], "Capital": ["$1B — UAE's first AI unicorn within six months ○", "2027E revenue base case $29.0M on track ◐", "Africa national build ~$55M via ADEX/ADFD (potential, subject to completion) ○"], "Execution": ["Export share: ≥40% of new bookings outside UAE by September ○", "Installed OEM devices tracking to 279,000 by year-end ◐", "Bangalore hub delivering Redington SISA and offshore-India work ○"]}}, {"q": "Q4", "y": "2027", "gate": "279K devices; $29.0M revenue", "story": "Scale", "cols": {"Partners": ["Qualcomm TLA: $100 per activated unit on 279,000 installed devices ◐", "e& enterprise and government distribution beyond first 25,000 devices ○", "WISER lighthouse converting to European channel bookings ○"], "Sovereign": ["JV Year-1 run-rate toward AED 15.8M (model v13) ◐", "International expansion planning: CEPA partner countries from Year 2 ○", "GCC government sovereign deployments expanding with Qualcomm/e& ○"], "Platform": ["NetApp AI data layer across sovereign deployments ○", "AR runtime and AI PC builds at general availability ○", "Cisco networking and government channel deployments ○"], "Capital": ["2027E revenue $29.0M (model base case) ◐", "Infrastructure debt term sheet (potential, subject to completion) ○", "IPO readiness workstreams begin ahead of January 2028 ○"], "Execution": ["Installed OEM devices 279,000 at year-end ◐", "Redington SISA and Bangalore hub serving South Asia delivery ○", "Luanda flagship go-live for ~2.0M students (potential, subject to completion) ○"]}}, {"q": "Q1", "y": "2028", "gate": "IPO readiness declared", "story": "Capital", "cols": {"Partners": ["Qualcomm TLA perpetual: installed base compounding toward 562,500 ◐", "Intel AI PC MOU: Panther Lake volume through channel ○", "IBM/Dell models, channel and certified systems at scale ○"], "Sovereign": ["JV Year 2: international expansion to CEPA partner countries ○", "JV Year-1 result reviewed against AED 15.8M (model v13) ◐", "Core42/ADQ and GCC sovereign deployments in steady operation ○"], "Platform": ["Same JV products packaged for CEPA export markets ○", "Modular DC #1 utilisation review; owned-compute expansion case ○", "Sovereign appliance roadmap on AI200/AI250 racks ○"], "Capital": ["IPO readiness ○", "Kairoswealth ≥USD 250M AUM/AUA KPI (potential, subject to completion) ○", "2028E revenue base case $62.6M ◐"], "Execution": ["Export bookings share tracking from ≥40% toward ≥60% ○", "Bangalore hub: India/South Asia delivery and engineering at scale ○", "Africa national build-out ~$55M (potential, subject to completion) ○"]}}, {"q": "Q2", "y": "2028", "gate": "CEPA expansion live", "story": "Scale", "cols": {"Partners": ["Redington: MENA and Africa channel volume on price card ○", "WWT US public-sector pipeline via federal/state flow-downs ○", "WISER European channel expansion beyond lighthouse ○"], "Sovereign": ["First CEPA partner-country deployments under JV expansion ○", "JV revenue trajectory toward AED 56.9M Year 5 (model v13) ◐", "UXE smart-city deployments across Dubai government ○"], "Platform": ["Owned-compute expansion executed if DC #1 review positive ○", "Supermicro, Dell, Cisco, NetApp certified sovereign stack refresh ○", "OnDemand on AI200/AI250 racks and XR2/AR1 glasses at volume ○"], "Capital": ["Kairoswealth Category 3: AUA→AUM (potential, subject to completion) ○", "Installed base trajectory 562,500 devices by 2028 year-end ◐", "Project facility drawdowns against sovereign offtake (potential, subject to completion) ○"], "Execution": ["e& distribution: enterprise and government device programmes beyond 25,000 ○", "Bangalore hub supporting CEPA and offshore-India corridor delivery ○", "Africa flagship operating; national rollout (potential, subject to completion) ○"]}}, {"q": "Q3", "y": "2028", "gate": "562K devices; 60% export", "story": "Scale", "cols": {"Partners": ["Qualcomm TLA: 562,500 installed devices trajectory, $100 per unit ◐", "Tenstorrent Commercial Collaboration Agreement: next-phase compute options ○", "Redington, WWT, WISER, Alpha Data: multi-region channel at scale ○"], "Sovereign": ["JV international expansion: multiple CEPA partner countries live ○", "Path to AED 95.0M Year 5 with international expansion (model v13) ◐", "GCC and Dubai government sovereign estates in steady operation ○"], "Platform": ["Sovereign agentic OS across five Qualcomm families and Intel ○", "Owned compute serving JV and export workloads ○", "Moro Hub green hosting plus modular DC capacity ○"], "Capital": ["2028E revenue $62.6M (model base case) ◐", "IPO-ready company: listing window assessed ○", "Infrastructure PE/debt scale-up (potential, subject to completion) ○"], "Execution": ["Export share: ≥60% of new bookings outside UAE by September ○", "Installed OEM devices 562,500 by year-end ◐", "Africa national programme scaling (potential, subject to completion) ○"]}}];
  const qtabs=$('#qtabs'), qbody=$('#qbody');
  if(qtabs){
    Q.forEach((q,i)=>{ const b=document.createElement('div'); b.className='qtab'+(i===0?' on':''); b.dataset.q=q.q+'-'+q.y; b.innerHTML=`<div class="q">${q.q}</div><div class="y">${q.y} · ${q.story}</div><div class="m">${esc(q.gate)}</div>`; b.onclick=()=>showQ(i); qtabs.appendChild(b); });
    const order=['Partners','Sovereign','Platform','Capital','Execution'];
    function showQ(i){ $$('.qtab').forEach((t,k)=>t.classList.toggle('on',k===i)); const q=Q[i];
      qbody.innerHTML=order.map(h=>`<div class="qcol"><h4>${h}</h4><ul class="clean">${(q.cols[h]||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`).join(''); }
    showQ(0);
    window.showQuarter=showQ;
  }

  /* ---------------- Routes to market — sixteen signed routes ---------------- */
  const P=[{"n": "Qualcomm", "cat": "silicon", "logo": "assets/logos/qualcomm.png", "role": "Technology licence agreement: $100 per activated unit, perpetual, across five silicon families.", "detail": "Snapdragon X AI PCs, Cloud AI 100/Ultra, Dragonwing IQ-X, XR2/AR1 glasses and AI200/AI250 racks carry OnDemand; installed base 111,000 (2026) to 562,500 (2028).", "reach": "5 silicon families · 562.5K devices 2028E", "dark": false}, {"n": "Intel", "cat": "silicon", "logo": "assets/logos/intel.png", "role": "AI PC MOU: offline OnDemand for Windows on Panther Lake, delivered February 2026.", "detail": "Puts a fully offline sovereign assistant on Intel AI PCs through 2027–2028, widening the OEM installed base beyond Qualcomm silicon and feeding the licensing revenue line.", "reach": "Panther Lake AI PC platform", "dark": false}, {"n": "Tenstorrent", "cat": "silicon", "logo": "assets/logos/tenstorrent.svg", "role": "Commercial Collaboration Agreement (1 Sep 2025) plus LOI cost-sharing the first modular sovereign DC.", "detail": "Tenstorrent cost-shares ~50% of the UAE's first modular sovereign data centre: 23 Galaxy units, 736 Blackhole chips, $2.9–4.4M fleet all-in, live with the $500M round around April 2027.", "reach": "23 Galaxy units · 736 Blackhole chips", "dark": false}, {"n": "World Wide Technology", "cat": "channel", "logo": "assets/logos/wwt.png", "role": "Reseller agreement carrying US federal and state contract flow-downs.", "detail": "Opens US public-sector procurement for the sovereign appliance and OnDemand licences, a key contributor to the ≥40% (Sep 2027) and ≥60% (Sep 2028) export-booking targets.", "reach": "US federal & state flow-downs", "dark": false}, {"n": "Redington", "cat": "channel", "logo": "assets/logos/redington.png", "role": "Distribution across 8 MENA markets and all of Africa on a fixed price card.", "detail": "Price card $110K/$200K/$360K; Redington SISA sits beside the new Bangalore hub, giving the Africa and South Asia export push a fulfilment backbone.", "reach": "8 MENA markets · all of Africa", "dark": false}, {"n": "Alpha Data", "cat": "channel", "logo": "assets/logos/alpha-data.png", "role": "White-label reseller agreement for the UAE market.", "detail": "Alpha Data sells OnDemand under its own brand to UAE enterprise and government accounts, adding an in-country route alongside Core42, ADQ and the VVIP Sovereign JV.", "reach": "UAE white-label channel", "dark": false}, {"n": "WISER Technology", "cat": "channel", "logo": "assets/logos/wiser.png", "role": "European channel partnership anchored on a 2027 lighthouse deployment.", "detail": "The 2027 European lighthouse becomes the reference site for EU sovereign buyers and a core plank of the ≥40% / ≥60% export-share targets.", "reach": "European lighthouse 2027", "dark": false}, {"n": "Core42 · ADQ", "cat": "sovereign", "logo": "assets/logos/core42.png", "role": "Master services agreements with Core42 (G42) and ADQ.", "detail": "Anchors OnDemand inside the UAE's sovereign cloud and state-holding ecosystem; MSAs give the JV, GCC government deployments and owned-compute plans a contracted enterprise frame.", "reach": "UAE sovereign cloud & state holding", "dark": false}, {"n": "Supermicro", "cat": "silicon", "logo": "assets/logos/supermicro.png", "role": "Certified sovereign appliance platform: Supermicro AS-2115HV-TNRT.", "detail": "The certified AS-2115HV-TNRT is the reference on-prem appliance for channel deployments via Redington, Alpha Data and WWT, deployable inside Moro Hub or customer sites.", "reach": "AS-2115HV-TNRT certified", "dark": true}, {"n": "Cisco", "cat": "silicon", "logo": "assets/logos/cisco.png", "role": "Networking partner and government channel for sovereign deployments.", "detail": "Cisco networking underpins the sovereign stack while its government channel carries OnDemand into public-sector accounts in the GCC, US and Europe alongside WWT and WISER.", "reach": "Networking + government channel", "dark": false}, {"n": "NetApp", "cat": "silicon", "logo": "assets/logos/netapp.png", "role": "AI data layer for the sovereign OnDemand stack.", "detail": "NetApp provides the governed data layer beneath OnDemand agents in sovereign deployments — the JV, GCC government estates and the modular data centre — keeping data resident in-country.", "reach": "Sovereign AI data layer", "dark": false}, {"n": "Moro Hub (Digital DEWA)", "cat": "sovereign", "logo": "assets/logos/moro-hub.svg", "role": "Hosting in Moro Hub's 100 MW solar-powered Tier III green data centre.", "detail": "Gives OnDemand a DEWA-backed, renewable-powered home for sovereign workloads and JV seats, complementing the Tenstorrent modular data centre as owned compute comes online.", "reach": "100 MW solar · Tier III", "dark": false}, {"n": "UXE Security Solutions", "cat": "sovereign", "logo": "assets/logos/uxe.png", "role": "Dubai government security and smart-city integrator deploying OnDemand.", "detail": "Brings OnDemand agents into Dubai government security and smart-city programmes, a sovereign showcase feeding the GCC government deployments planned from Q2 2027.", "reach": "Dubai government security & smart city", "dark": false}, {"n": "e&", "cat": "channel", "logo": "assets/logos/eand.svg", "role": "Enterprise and government distribution; first blended 25,000-device programme with Qualcomm.", "detail": "Programme one blends ~10K AR glasses, ~11K AI PCs and ~4K appliances across e&'s enterprise and government base; activation waves run Q3–Q4 2026, GCC government deployment Q2 2027.", "reach": "244.7M subscribers", "dark": false}, {"n": "IBM · Dell", "cat": "channel", "logo": "assets/logos/ibm.png", "role": "Models, channel and certified systems for the OnDemand sovereign stack.", "detail": "IBM and Dell extend OnDemand's model catalogue, enterprise channel and certified server options, giving buyers a second hardware track beside Supermicro across 2027–2028.", "reach": "Models · channel · certified systems", "dark": false, "logo2": "assets/logos/dell.png"}, {"n": "VVIP Sovereign JV", "cat": "sovereign", "logo": "assets/logos/vvip-sovereign-jv.svg", "role": "50/50 joint venture with a UAE sovereign counterparty, six-gate plan G1–G6.", "detail": "AED 20.4M committed capital (10.2M per partner); 100 seats Dec 2026, five anchors Jan 2027, billing Feb 2027; revenue AED 15.8M Year 1 to AED 56.9M Year 5.", "reach": "AED 95.0M Year 5 with international expansion", "dark": false}];
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

  /* ---------------- Valuation slider (card 13, slide 16) — the three metric tiles on a flat valuation mark, $500M by default ----------------
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
       Redington audited consolidated FY2026 (year ended 31 Mar 2026, results 13 May 2026) ₹1,19,162.36 crore ÷ RBI reference rate 94.6543 = 12.59 (company headline $13.5B; FY2025 was ₹99,333.65 crore = 11.61); NetApp 10-K FY2026 6.925.
       Gold bars are converted from a local currency (AED / INR). Alpha Data (FY25, $0.68B) was dropped from this chart on 8 Sep 2026 — it remains a signed route on card 09. */
    const pc=$('#c-partners'); if(pc) hbarChart(pc,{labels:['Cisco (FY26)','Qualcomm (FY25)','WWT (stated)','e& (FY25)','Redington (FY26)','NetApp (FY26)'],values:[63.33,44.284,20,19.9,12.59,6.925],colors:['#0E7A5F','#0E7A5F','#0E7A5F','#A5884B','#A5884B','#0E7A5F'],valFmt:v=>'$'+(v>=10?v.toFixed(1):v.toFixed(2))+'B',track:true,valuesAt:'edge',barHeight:30,rx:4,minBar:6,labelSize:12.5,valueSize:13,margin:{l:160,r:78,t:8,b:8}});
    const af=$('#c-africa'); if(af) barChart(af,{labels:['Africa DC build 2025','2031','MEA AI-DC 2026','2031 '],series:[{name:'USD B',values:[1.24,4.58,2.51,8.24]}],valFmt:v=>'$'+v.toFixed(2)+'B',legend:false});
    /* Card 13 (slide 16) — documented marks: $10M Feb 2024 (seed post-money, CO/S2), $90M Dec 2025 (Series A-1 close, journey deck), $137.85M May 2026 (Itqan TS V6 pre-money), $200M Aug 2026 (Series A2 pre-money, IM/CO).
       The arc — management target: $200M (Jan 2027) → $500M (≈ Apr 2027) → $1B (≈ Jul 2027). The former 'arc — high' line ($215M → $600M) and the $500–600M band were removed on 8 Sep 2026; a '$250M Jan 2027' mark is not supported by any document and is not plotted. */
    const val=$('#c-val'); if(val) lineChart(val,{labels:['Feb 2024','Dec 2025','May 2026','Aug 2026','Jan 2027 ○','Apr 2027 ○','Jul 2027 ○'],series:[{name:'Documented marks (USD M)',values:[10,90,137.85,200,null,null,null],area:true},{name:'The arc — management target (USD M)',values:[null,null,null,200,200,500,1000],color:'#A5884B',dash:'6,4',skipLabels:[3]}],valFmt:v=>v>=1000?'$'+(v/1000)+'B':'$'+v+'M',yFmt:v=>v>=1000?(v/1000).toFixed(2).replace(/\.?0+$/,'')+'k':String(Math.round(v)),yMax:1250});
    renderJV('uae'); renderDC(true); renderMult();
  }
  if(document.readyState==='complete') renderCharts(); else addEventListener('load',renderCharts);

  /* ================= Capital · cards 14–15 (slides 17–18) and the dilution rows on card 13 (slide 16) =================
     ONE source of truth, computed at run time:
       CT  reconciled cap table — AIREV Holding Limited, "Final Cap table post Series-A1", 6 Nov 2025: 11 register lines, 108,792 fully diluted
           shares including the 5,000 unissued B Shares of the Share Incentive Scheme (no votes, Cl. 5.2). Founders (Cl. 1.1: OT, YY, KU) = 66,219 sh.
       S2  Amended & Restated SHA (Nov 2025), Schedule 2 Preferred Shareholders — PDF pp. 88–91: Part 1 Seed (Core42 25,000 @ $100.00 = $2,500,000),
           Part 2 Series A-1 (Titian 5,000 @ $800.00 = $4,000,000; Venturewave 3,448 @ $580.00 = $2,000,000), Part 3 Angel (Bennett 250 @ $800 = $200,000;
           Grim 94 @ $800 = $75,000), Part 4 Legacy (Eyad Omari 2,331 @ $107.25 = $249,999.75).
       TS  Itqan Series A2 term sheet V6, 11 May 2026 — $5,000,000 raise (p3), ≈3.50% at a $137.85M pre-money (p4; superseded here by $200M),
           Qualified IPO ≥3× post-money and ≥$50M primary (p5).
       CO  Chairman overview, 30 Aug 2026 — entry marks G42/Core42 ≈$10M, VentureWave ≈$60M, Nabyl ≈$80M ($1.6M secondary, not on the register), today $215M.
       A   assumption — the $500M and $1B stages have no documented round size (IM, CO, card 20 list the layers without amounts): modelled at 10% of
           pre-money. Change CAPITAL.assumedRaise and every figure on cards 13–15 recomputes. Whole shares, rounded down; price = pre-money ÷ FD shares before. */
  const CAPITAL={
    registerDate:'6 Nov 2025',
    todayMarkM:215,
    a2:{preM:200, raiseM:5, when:'Jan 2027', tsPreM:137.85},
    assumedRaise:{r500:50, r1b:100},           /* USD M — ASSUMPTION (10% of pre-money); not in any document */
    poolShares:5000,
    holders:[
      {id:'ot',  name:'Olu Melville Thomas',              cls:'Ordinary',           round:'Founder (OT)',                 shares:59219, founder:true,  entry:'Founder',                 src:'CT'},
      {id:'yy',  name:'Youssef Ahmad Youssef',            cls:'Ordinary',           round:'Founder (YY)',                 shares:3500,  founder:true,  entry:'Founder',                 src:'CT'},
      {id:'ku',  name:'Kayaan Keki Unwalla',              cls:'Ordinary',           round:'Founder (KU)',                 shares:3500,  founder:true,  entry:'Founder',                 src:'CT'},
      {id:'inv', name:'Inveniam Middle East',             cls:'terms not stated',                  round:'Ordinary', shares:1450, entry:'≤ Nov 2025', src:'CT', note:'no price, amount or date in the cap table or Schedule 2'},
      {id:'pool',name:'Share Incentive Scheme',           cls:'B Shares · unissued',          round:'Option pool (Cl. 25.1)',  shares:5000,  pool:true,     entry:'—',                       src:'CT'},
      {id:'eo',  name:'Eyad Omari',                       cls:'Legacy Pref. · 1×',             round:'Legacy · first cheque',   shares:2331,  pps:107.25, cost:249999.75, entry:'≤ 31 Jan 2024', roundKey:'legacy', src:'S2', page:'p91'},
      {id:'c42', name:'Core42 Investments 1 SPV RSC Ltd', short:'G42', cls:'Seed Pref. · 2×', round:'Seed', shares:25000, pps:100, cost:2500000, entry:'31 Jan 2024', roundKey:'seed', src:'S2', page:'p88', logo:'assets/logos/core42.png', co:'≈$10M'},
      {id:'vw',  name:'Venturewave Capital No. 9 Limited', cls:'Series A-1 Pref. · 2×', round:'Series A-1 · first close', shares:3448, pps:580, cost:2000000, entry:'2025', roundKey:'a1first', src:'S2', page:'p89', co:'≈$60M'},
      {id:'dbb', name:'David Bradley Bennett',            cls:'Angel Pref. · 1×',              round:'Angel',                   shares:250,   pps:800, cost:200000,  entry:'Nov 2025', roundKey:'angel', entryRound:'a1final', src:'S2', page:'p90'},
      {id:'rjg', name:'Robert John Grim',                 cls:'Angel Pref. · 1×',              round:'Angel',                   shares:94,    pps:800, cost:75000,   entry:'Nov 2025', roundKey:'angel', entryRound:'a1final', src:'S2', page:'p90'},
      {id:'tit', name:'Titian RSC Ltd',                   cls:'Series A-1 Pref. · 2×',         round:'Series A-1 · final close', shares:5000, pps:800, cost:4000000, entry:'Nov 2025', roundKey:'a1final', src:'S2', page:'p89'}
    ],
    /* not on the register — shown, never priced */
    offRegister:[
      {id:'bcap', name:'B Capital', logo:'assets/logos/b-capital.svg', round:'n/a · not in register', note:'B Capital — investor conversation #2 on card 20; the 29 Jun 2026 brief states no entry price, date or stake', src:'CO'},
      {id:'nab',  name:'Nabyl (Further Ventures)', round:'CO mark only · not in register', note:'Nabyl — $1.6M secondary at ≈$80M on the Chairman chart (30 Aug 2026); a secondary purchase does not create a register line', src:'CO'}
    ],
    /* the documented waterfall, in the order the register implies (the seed closed on a round 100,000-share base: 25,000 = 25.00% = $2.5M ÷ $10.0M) */
    rounds:[
      {key:'base',   label:'Pre-seed base',                           when:'—',            src:'CT', note:'founders 66,219 + Inveniam 1,450 + unissued pool 5,000 — assumed in place before the first cheque'},
      {key:'legacy', label:'Legacy · first cheque · E. Omari',       when:'≤ 31 Jan 2024', pps:107.25, raised:249999.75, src:'S2', page:'p91', implied:true},
      {key:'seed',   label:'Seed · Core42',                            when:'31 Jan 2024',  pps:100,    raised:2500000,   src:'S2', page:'p88'},
      {key:'a1first',label:'Series A-1 first close · VentureWave',   when:'2025',         pps:580,    raised:2000000,   src:'S2', page:'p89'},
      {key:'angel',  label:'Series A-1 final close (a) · Angel', when:'Nov 2025',     pps:800,    raised:275000,    src:'S2', page:'p90'},
      {key:'a1final',label:'Series A-1 final close (b) · Titian',   when:'Nov 2025',     pps:800,    raised:4000000,   src:'S2', page:'p89'},
      {key:'a2',     label:'Series A2 · $200M pre-money',              when:'Jan 2027',     preM:200,   raiseM:5,         src:'TS', target:true},
      {key:'r500',   label:'$500M stage',                              when:'≈ Apr 2027',   preM:500,                     src:'A',  target:true},
      {key:'r1b',    label:'$1B stage',                                when:'≈ Jul 2027',   preM:1000,                    src:'A',  target:true}
    ]
  };
  const SRC_TITLE={CT:'reconciled cap table, 6 Nov 2025',S2:'A&R SHA Schedule 2, PDF pp. 88–91',TS:'Itqan Series A2 term sheet V6, 11 May 2026',CO:'Chairman overview, 30 Aug 2026',IM:'Investment Memorandum, Aug 2026',A:'assumption — not in any document (CAPITAL.assumedRaise in content.js)'};
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
    const rounds=[]; let sh=0;
    const baseSh=H.filter(h=>!h.roundKey).reduce((a,h)=>a+h.shares,0);
    const stageHolders=[];
    CAPITAL.rounds.forEach(r=>{
      const o=Object.assign({},r);
      if(r.key==='base'){ o.newShares=baseSh; o.preSh=0; o.postSh=baseSh; o.raised=null; o.pps=null; o.preM=null; o.postM=null; sh=baseSh; }
      else if(r.preM!=null){
        const raiseM=r.raiseM!=null?r.raiseM:CAPITAL.assumedRaise[r.key];
        o.raiseM=raiseM; o.raised=raiseM*1e6; o.preSh=sh; o.pps=r.preM*1e6/sh; o.newShares=Math.floor(o.raised/o.pps); o.postSh=sh+o.newShares;
        o.preMoney=r.preM*1e6; o.postMoney=o.pps*o.postSh; o.pctSoldFormula=raiseM/(r.preM+raiseM)*100;
        const inv={id:'new-'+r.key, name:r.key==='a2'?'Series A2 investor (SPV)':(r.key==='r500'?'$500M-stage investor(s)':'$1B-stage investor(s)'), cls:r.key==='a2'?'Series A2 Pref. (TS p3)':'new money · target', round:o.label, shares:o.newShares, pps:o.pps, cost:o.raised, entry:r.when, roundKey:r.key, src:r.src, stage:r.key, target:true};
        stageHolders.push(inv); sh=o.postSh;
      } else {
        const members=H.filter(h=>h.roundKey===r.key);
        o.newShares=members.reduce((a,h)=>a+h.shares,0); o.preSh=sh; o.postSh=sh+o.newShares; o.preMoney=r.pps*o.preSh; o.postMoney=r.pps*o.postSh; sh=o.postSh;
      }
      o.dilution=o.postSh?o.newShares/o.postSh*100:0;
      o.foundersFD=founderSh/o.postSh*100; o.foundersVote=founderSh/(o.postSh-pool)*100;
      /* self-check: every line on the register at this point sums to 100.00% */
      const lines=H.filter(h=>!h.roundKey||CAPITAL.rounds.findIndex(x=>x.key===h.roundKey)<=CAPITAL.rounds.findIndex(x=>x.key===r.key)).map(h=>h.shares).concat(stageHolders.map(h=>h.shares));
      o.sumPct=lines.reduce((a,v)=>a+v,0)/o.postSh*100; o.lines=lines.length;
      rounds.push(o);
    });
    const byKey=Object.fromEntries(rounds.map(r=>[r.key,r]));
    /* the marks: today ($215M on the register), $200M (= the A2 price), $500M, $1B */
    const marks={
      today:{key:'today',label:'today · $'+CAPITAL.todayMarkM+'M mark',valueM:CAPITAL.todayMarkM,sh:todaySh,stages:[],src:'CO'},
      m200:{key:'m200',label:'$200M',valueM:200,sh:byKey.a2.preSh,stages:['a2'],src:'TS'},
      m500:{key:'m500',label:'$500M',valueM:500,sh:byKey.r500.preSh,stages:['a2','r500'],src:'A'},
      m1b:{key:'m1b',label:'$1B',valueM:1000,sh:byKey.r1b.preSh,stages:['a2','r500','r1b'],src:'A'}
    };
    Object.values(marks).forEach(m=>{ m.pps=m.valueM*1e6/m.sh; const extra=stageHolders.filter(h=>m.stages.includes(h.stage)); m.holders=H.concat(extra); m.totalSh=m.holders.reduce((a,h)=>a+h.shares,0); m.postMoney=m.pps*m.totalSh; m.sumPct=m.holders.reduce((a,h)=>a+h.shares,0)/m.totalSh*100; m.foundersFD=founderSh/m.totalSh*100; });
    /* entry valuation & % bought at entry per holder (post-money of its round, on the round's closing share count) */
    H.forEach(h=>{ const r=byKey[h.entryRound||h.roundKey]; if(r){ h.entryValM=r.postMoney/1e6; h.pctAtEntry=h.shares/r.postSh*100; h.implied=!!r.implied; } });
    const todayPPS=marks.today.pps;
    /* thresholds */
    const firstBelowFD=rounds.find(r=>r.foundersFD<50), firstBelowVote=rounds.find(r=>r.foundersVote<50);
    const r1b=byKey.r1b; const maxRaiseFD=((founderSh/0.5)-r1b.preSh)*r1b.pps/1e6, maxRaiseVote=((founderSh/0.5+pool)-r1b.preSh)*r1b.pps/1e6;
    return {H,founderSh,todaySh,pool,rounds,byKey,marks,todayPPS,stageHolders,firstBelowFD,firstBelowVote,maxRaiseFD,maxRaiseVote,
      selfCheck:rounds.every(r=>Math.abs(r.sumPct-100)<1e-9)&&Object.values(marks).every(m=>Math.abs(m.sumPct-100)<1e-9)};
  }
  const CM=buildCapital(); window.capitalModel=CM;

  /* ---- card 13 (slide 16): the dilution line under each stage ---- */
  $$('.arc .node .dl[data-dil]').forEach(el=>{ const r=CM.byKey[el.dataset.dil]; if(!r) return;
    el.innerHTML=`<b>${fM(r.raiseM)}</b> raised${r.src==='A'?' (assumed)':''} · <b>${fP(r.dilution)}</b> sold · founders <b>${fP(r.foundersFD)}</b> after ${chip(r.src)}`;
    el.dataset.raisedM=r.raiseM; el.dataset.pctSold=r.dilution.toFixed(2); el.dataset.foundersAfter=r.foundersFD.toFixed(2); });

  /* ---- card 14 (slide 17): who came in, when, and at what ---- */
  const capT=$('#cap-table'), capK=$('#cap-kpis');
  function holderCell(h){ const nm=h.short?`${esc(h.name)} <span class="muted">(${esc(h.short)})</span>`:esc(h.name); return `<td class="h" title="${esc(h.note||h.name)}">${h.logo?`<img class="mark" src="${h.logo}" alt="${esc(h.short||h.name)}">`:''}${nm}${h.founder?' <span class="tag signed">founder</span>':''}${h.pool?' <span class="tag target">pool</span>':''}${h.target?' <span class="tag target">target ○</span>':''}</td>`; }
  function renderCap(tab){
    if(!capT) return;
    const m=CM.marks[tab==='inv'?'today':tab]; const rows=[];
    const fdShares=m.totalSh;
    if(tab==='inv'){
      capT.innerHTML=`<thead><tr><th>Holder</th><th>Round · class</th><th>Entry</th><th class="n">Entry valuation</th><th class="n">Price / share</th><th class="n">$ invested</th><th class="n">% bought at entry</th><th class="n">Shares</th><th class="n">% held today (FD)</th><th>Src</th></tr></thead>`;
      const tb=document.createElement('tbody');
      CM.H.forEach(h=>{ const tr=document.createElement('tr'); tr.className=(h.founder?'founder':'')+(h.pool?' pool':''); tr.dataset.id=h.id;
        const ev=h.entryValM!=null?`$${h.entryValM.toFixed(1)}M post${h.implied?' <span class="muted">*</span>':''}${h.co?` <span class="muted">(CO ${esc(h.co)})</span>`:''}`:(h.founder||h.pool?'—':'n/s');
        tr.innerHTML=holderCell(h)+`<td>${esc(h.round)} <span class="muted">· ${esc(h.cls)}</span></td><td>${esc(h.entry)}</td><td class="n">${ev}</td><td class="n">${fPPS(h.pps)}</td><td class="n">${h.cost!=null?fUSD(h.cost):'—'}</td><td class="n">${h.pctAtEntry!=null?fP(h.pctAtEntry)+(h.implied?' <span class="muted">*</span>':''):'—'}</td><td class="n" data-v="${h.shares}">${fN(h.shares)}</td><td class="n" data-v="${(h.shares/fdShares*100).toFixed(4)}">${fP(h.shares/fdShares*100)}</td><td>${chip(h.src)}${h.implied?chip('A'):''}</td>`;
        tb.appendChild(tr); });
      CAPITAL.offRegister.forEach(h=>{ const tr=document.createElement('tr'); tr.className='na'; tr.dataset.id=h.id; tr.innerHTML=holderCell(h)+`<td>${esc(h.round)}</td><td>—</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td>${chip(h.src)}</td>`; tr.title=h.note; tb.appendChild(tr); });
      const sub=document.createElement('tr'); sub.className='sub'; sub.innerHTML=`<td class="h">Founders' collective (OT · YY · KU)</td><td>Ordinary</td><td></td><td class="n"></td><td class="n"></td><td class="n"></td><td class="n"></td><td class="n" data-v="${CM.founderSh}">${fN(CM.founderSh)}</td><td class="n" data-v="${(CM.founderSh/fdShares*100).toFixed(4)}">${fP(CM.founderSh/fdShares*100)}</td><td>${chip('CT')}</td>`; tb.appendChild(sub);
      const tot=document.createElement('tr'); tot.className='total'; const inv=CM.H.reduce((a,h)=>a+(h.cost||0),0); tot.innerHTML=`<td class="h">Total · register as at ${CAPITAL.registerDate}</td><td>11 lines</td><td></td><td class="n"></td><td class="n"></td><td class="n">${fUSD(inv)}</td><td class="n"></td><td class="n" data-v="${fdShares}">${fN(fdShares)}</td><td class="n" data-sum="${m.sumPct.toFixed(4)}">${fP(m.sumPct)} ✓</td><td>${chip('CT')}</td>`; tb.appendChild(tot);
      capT.appendChild(tb);
    } else {
      const t=CM.marks.today;
      capT.innerHTML=`<thead><tr><th>Holder</th><th>Round · class</th><th class="n">Shares</th><th class="n">% at the ${esc(m.label)} mark</th><th class="n">$ value at ${esc(m.label)}</th><th class="n">Multiple on entry</th><th class="n">Gain vs cost</th><th class="n">today · $${CAPITAL.todayMarkM}M mark</th><th>Src</th></tr></thead>`;
      const tb=document.createElement('tbody');
      m.holders.forEach(h=>{ const tr=document.createElement('tr'); tr.className=(h.founder?'founder':'')+(h.pool?' pool':'')+(h.target?' target':''); tr.dataset.id=h.id;
        const own=h.stage&&m.stages[m.stages.length-1]===h.stage; const v=own?h.cost:h.shares*m.pps, pct=h.shares/m.totalSh*100, mult=h.cost?v/h.cost:null, gain=h.cost&&!own?v-h.cost:null, tv=h.stage?null:h.shares*t.pps;
        tr.innerHTML=holderCell(h)+`<td>${esc(h.round)}</td><td class="n" data-v="${h.shares}">${fN(h.shares)}</td><td class="n" data-v="${pct.toFixed(4)}">${fP(pct)}</td><td class="n" data-v="${Math.round(v)}">${fUSD(v)}</td><td class="n">${mult!=null?fX(mult):'—'}</td><td class="n">${gain!=null?(gain>=0?'+':'−')+fUSD(Math.abs(gain)):(own?'<span class="muted">entry</span>':'—')}</td><td class="n">${tv!=null?fUSD(tv)+(h.cost?' <span class="muted">('+fX(tv/h.cost)+')</span>':''):'<span class="muted" title="not yet on the register at today\u2019s mark">n/a</span>'}</td><td>${chip(h.src)}${h.implied?chip('A'):''}</td>`;
        tb.appendChild(tr); });
      CAPITAL.offRegister.forEach(h=>{ const tr=document.createElement('tr'); tr.className='na'; tr.dataset.id=h.id; tr.innerHTML=holderCell(h)+`<td>${esc(h.round)}</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td class="n">—</td><td>${chip(h.src)}</td>`; tr.title=h.note; tb.appendChild(tr); });
      const fv=CM.founderSh*m.pps; const sub=document.createElement('tr'); sub.className='sub'; sub.innerHTML=`<td class="h">Founders' collective (OT · YY · KU)</td><td>Ordinary</td><td class="n" data-v="${CM.founderSh}">${fN(CM.founderSh)}</td><td class="n" data-v="${m.foundersFD.toFixed(4)}">${fP(m.foundersFD)}</td><td class="n">${fUSD(fv)}</td><td class="n">—</td><td class="n">—</td><td class="n">${fUSD(CM.founderSh*t.pps)}</td><td>${chip('CT')}</td>`; tb.appendChild(sub);
      const tot=document.createElement('tr'); tot.className='total'; tot.innerHTML=`<td class="h">Total · ${m.holders.length} lines · price ${fPPS(m.pps)} / share</td><td>post-money ${fM(+(m.postMoney/1e6).toFixed(1))}</td><td class="n" data-v="${m.totalSh}">${fN(m.totalSh)}</td><td class="n" data-sum="${m.sumPct.toFixed(4)}">${fP(m.sumPct)} ✓</td><td class="n">${fUSD(m.postMoney)}</td><td class="n"></td><td class="n"></td><td class="n">${fUSD(t.postMoney)}</td><td>${chip(m.src)}</td>`; tb.appendChild(tot);
      capT.appendChild(tb);
    }
    capT.dataset.tab=tab; capT.dataset.sum=m.sumPct.toFixed(4);
    if(capK){ const a2=CM.byKey.a2, r5=CM.byKey.r500, r1=CM.byKey.r1b;
      capK.innerHTML=`<div class="k"><b>${fP(CM.founderSh/CM.todaySh*100)}</b>founders' collective today · FD${chip('CT')}</div><div class="k"><b>${fP(a2.foundersFD)}</b>after Series A2 · $5M at $200M pre${chip('TS')}</div><div class="k"><b>${fP(r5.foundersFD)} → ${fP(r1.foundersFD)}</b>after the $500M / $1B stages${chip('A')}</div><div class="k"><b>${fPPS(m.pps)}</b>${tab==='inv'?'per share at today\u2019s $'+CAPITAL.todayMarkM+'M mark':'per share at the '+esc(m.label)+' mark'}</div>`; }
    $$('.cap-tabs .pill').forEach(b=>{ const on=b.dataset.tab===tab; b.classList.toggle('on',on); b.setAttribute('aria-selected',String(on)); });
  }
  $$('.cap-tabs .pill').forEach(b=>b.onclick=()=>renderCap(b.dataset.tab));
  renderCap('inv');

  /* ---- card 15 (slide 18): round-by-round dilution and control ---- */
  const dilT=$('#dil-table'), dilC=$('#c-dil'), dilCheck=$('#dil-check'), dilTitle=$('#dil-title');
  function renderDilution(){
    if(!dilT) return;
    const R=CM.rounds;
    dilT.innerHTML=`<thead><tr><th>Round</th><th>When</th><th class="n">$ raised</th><th class="n">Price / share</th><th class="n">New shares</th><th class="n">FD after</th><th class="n">Pre-money</th><th class="n">Post-money</th><th class="n">Dilution</th><th class="n">Founders FD</th><th class="n">Founders votes</th><th class="n">Σ holders</th><th>Src</th></tr></thead>`;
    const tb=document.createElement('tbody');
    R.forEach(r=>{ const tr=document.createElement('tr'); tr.dataset.round=r.key; tr.className=(r.target?'target ':'')+(r.foundersFD<50?'cross':'');
      const pre=fMoney(r.preMoney), post=fMoney(r.postMoney);
      tr.innerHTML=`<td class="h" title="${esc(r.note||(r.implied?'pre-money and post-money implied on the assumed pre-seed base':(r.src==='A'?'round size assumed at 10% of pre-money — CAPITAL.assumedRaise in content.js':'')))}">${esc(r.label)}${r.implied?' <span class="muted">*</span>':''}${r.src==='A'?' <span class="muted">†</span>':''}</td><td>${esc(r.when)}</td><td class="n" data-v="${r.raised||0}">${r.raised!=null?fUSD(r.raised):'—'}</td><td class="n">${fPPS(r.pps)}</td><td class="n" data-v="${r.newShares}">${r.key==='base'?fN(r.newShares)+' <span class="muted">base</span>':'+'+fN(r.newShares)}</td><td class="n" data-v="${r.postSh}">${fN(r.postSh)}</td><td class="n">${pre}</td><td class="n">${post}</td><td class="n" data-v="${r.dilution.toFixed(4)}">${r.key==='base'?'—':fP(r.dilution)}</td><td class="n" data-v="${r.foundersFD.toFixed(4)}"><b>${fP(r.foundersFD)}</b>${r.foundersFD<50?' <span class="tag risk">&lt; 50%</span>':''}</td><td class="n" data-v="${r.foundersVote.toFixed(4)}">${fP(r.foundersVote)}${r.foundersVote<50?' <span class="tag risk">consent flips</span>':''}</td><td class="n" data-sum="${r.sumPct.toFixed(4)}">${fP(r.sumPct)} ${Math.abs(r.sumPct-100)<1e-9?'✓':'✗'}</td><td>${chip(r.src)}${r.implied?chip('A'):''}</td>`;
      tb.appendChild(tr); });
    dilT.appendChild(tb);
    if(dilCheck){ const ok=CM.selfCheck; dilCheck.classList.toggle('fail',!ok); dilCheck.dataset.pass=String(ok);
      dilCheck.innerHTML=ok?`✓ Self-check passed — ownership sums to 100.00% at every one of the ${R.length} steps and at all four marks (${R.map(r=>r.sumPct.toFixed(2)+'%').join(' · ')}).`:`✗ Self-check FAILED — ownership does not sum to 100.00% at every round.`; }
    /* thresholds text */
    const th=$('#dil-thresholds'); if(th){ const fd=CM.firstBelowFD, vt=CM.firstBelowVote; const r1=CM.byKey.r1b;
      th.innerHTML=`<b>Where the lines fall.</b> Fully diluted, the founders first drop below 50% ${fd?`at the <b>${esc(fd.label)}</b> (${fP(fd.foundersFD)})`:'at none of the modelled steps'}. On <b>votes</b> — the test that matters (Cl. 1.1, PDF pp. 28–29: Founder Consent becomes Major Investor Director Consent once the Founders hold under 50% of the voting rights; unissued B Shares carry no vote, Cl. 5.2) — they ${vt?`fall below 50% at the <b>${esc(vt.label)}</b> (${fP(vt.foundersVote)})`:`stay above 50% through the $1B stage (<b>${fP(r1.foundersVote)}</b>)`}. At $1B pre-money that holds up to a raise of ≈ <b>${fM(Math.floor(CM.maxRaiseVote))}</b> (fully diluted: ≈ ${fM(Math.floor(CM.maxRaiseFD))}). Schedule 3 (pp. 92–95) is untouched: Board Reserved Matters keep needing Major Investor Director Consent, Major Investor Reserved Matters keep needing Major Investor Consent.`; }
    if(dilTitle){ const vt=CM.firstBelowVote, fd=CM.firstBelowFD; const last=CM.rounds[CM.rounds.length-1]; dilTitle.textContent=vt?`Founder Consent flips at the ${vt.label}: the founders' votes drop below 50%.`:(fd?`Voting control holds through the ${last.label}; fully diluted, the founders dip under 50% ${fd===last?'there':'at the '+fd.label}.`:'Founders keep control through every modelled round — no line is crossed.'); }
    /* the chart */
    if(dilC){ const w=Math.max(480,dilC.clientWidth||700), h=Math.max(200,dilC.clientHeight||236); const m={l:44,r:14,t:26,b:40}; const iw=w-m.l-m.r, ih=h-m.t-m.b; const n=R.length, gw=iw/n; const yMax=100, y=v=>m.t+ih-v/yMax*ih;
      const short={base:'Base',legacy:'Legacy',seed:'Seed',a1first:'A-1 first',angel:'Angel',a1final:'A-1 final',a2:'A2 · $200M',r500:'$500M',r1b:'$1B'};
      let g=`<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" role="img" aria-label="Founders' collective holding after each round — fully diluted bars and voting line — against the 50% control line">`;
      g+='<g class="grid">'; [0,25,50,75,100].forEach(v=>{ g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${m.l-8}" y="${y(v)+4}" text-anchor="end" font-size="10.5" fill="#6C7E75">${v}%</text>`; }); g+='</g>';
      const bw=Math.min(54,gw*0.56);
      R.forEach((r,i)=>{ const x=m.l+gw*i+(gw-bw)/2; const yy=y(r.foundersFD); const col=r.foundersFD<50?'#B4533A':(r.target?'#12B886':'#0E7A5F');
        g+=`<rect x="${x}" y="${yy}" width="${bw}" height="${y(0)-yy}" rx="4" fill="${col}" opacity="${r.target?.78:1}"><title>${esc(r.label)}: founders ${fP(r.foundersFD)} fully diluted · ${fP(r.foundersVote)} of votes · post-money ${r.postMoney!=null?fM(+(r.postMoney/1e6).toFixed(1)):'—'}</title></rect>`;
        g+=`<text class="val" x="${x+bw/2}" y="${yy-6}" text-anchor="middle" font-size="10.5" fill="#10201B">${r.foundersFD.toFixed(1)}%</text>`;
        g+=`<text x="${m.l+gw*i+gw/2}" y="${h-m.b+16}" text-anchor="middle" font-size="10.5" fill="#44584F">${short[r.key]||r.key}</text>`;
        if(r.postMoney!=null) g+=`<text x="${m.l+gw*i+gw/2}" y="${h-m.b+29}" text-anchor="middle" font-size="9.5" fill="#6C7E75">${fM(+(r.postMoney/1e6).toFixed(r.postMoney>=1e9?1:0))} post</text>`; });
      /* voting line */
      const pts=R.map((r,i)=>({x:m.l+gw*i+gw/2,y:y(r.foundersVote)}));
      g+=`<path d="M${pts.map(p=>p.x+','+p.y).join(' L')}" fill="none" stroke="#A5884B" stroke-width="2" stroke-dasharray="5,4"/>`;
      pts.forEach((p,i)=>{ g+=`<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#fff" stroke="#A5884B" stroke-width="2"><title>${esc(R[i].label)}: ${fP(R[i].foundersVote)} of votes</title></circle>`; });
      /* the 50% control line + crossing markers */
      g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(50)}" y2="${y(50)}" stroke="#B4533A" stroke-width="1.5" stroke-dasharray="2,3"/><text x="${m.l+6}" y="${y(50)-5}" font-size="10" font-weight="600" fill="#B4533A">50% control line — below it on votes, Founder Consent → Major Investor Director Consent (Cl. 1.1)</text>`;
      if(CM.firstBelowFD){ const i=R.indexOf(CM.firstBelowFD); const x=m.l+gw*i+gw/2; g+=`<line x1="${x}" x2="${x}" y1="${m.t}" y2="${y(0)}" stroke="#B4533A" stroke-width="1" stroke-dasharray="3,3"/><text x="${x-6}" y="${m.t+10}" text-anchor="end" font-size="9.5" font-weight="600" fill="#B4533A">FD &lt; 50% here</text>`; }
      if(CM.firstBelowVote){ const i=R.indexOf(CM.firstBelowVote); const x=m.l+gw*i+gw/2; g+=`<text x="${x+6}" y="${m.t+10}" font-size="9.5" font-weight="600" fill="#B4533A">votes &lt; 50% here</text>`; }
      g+=`<line x1="${m.l}" x2="${w-m.r}" y1="${y(0)}" y2="${y(0)}" stroke="#44584F" stroke-width="1"/>`;
      g+='</svg>'; dilC.innerHTML=g; }
  }
  /* Clause 11 / Clause 13 annotations on card 15: the A2 price vs the USD 100 Starting Price, and the Major Investors' Pro Rata Entitlement */
  (function(){ const a2=CM.byKey.a2; const pps=$('#dil-a2-pps'); if(pps){ pps.textContent=fPPS(a2.pps)+' ('+(a2.pps/100).toFixed(1)+'× the Starting Price)'; pps.dataset.v=a2.pps.toFixed(2); }
    const issued=CM.todaySh-CM.pool; const mi=CM.H.filter(h=>['c42','tit','vw'].includes(h.id)).reduce((a,h)=>a+h.shares,0); const share=mi/issued; const pre=$('#dil-a2-preempt');
    if(pre){ pre.textContent=fUSD(share*a2.raised)+' ('+(share*100).toFixed(1)+'% — Core42, Titian and Venture Wave\u2019s share of issued capital, '+fN(Math.floor(share*a2.newShares))+' of the '+fN(a2.newShares)+' new shares)'; pre.dataset.v=(share*100).toFixed(2); } })();
  renderDilution();
  addEventListener('resize',()=>{ renderDilution(); });
})();

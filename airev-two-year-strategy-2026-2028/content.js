/* Content-driven interactions: roadmap, partner grid, Athar scenario toggle, DC cost-share, valuation slider, charts. */
(function(){
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const src=t=>`<span class="src">${t}</span>`;

  /* ---------------- Roadmap ---------------- */
  const Q=[
    {q:'Q4',y:'2026',gate:'Series A2 close · Athar MoU',
     export:['Redington price card live in 8 MENA markets + Africa; first channel orders ●','Qualcomm / e& first activation wave (Q3–Q4 2026 per programme) ●','WWT joint account plan for US public sector ○','Cisco, NetApp, UXE, Moro Hub partnership tracks opened ○'],
     sovereign:['Athar G1 MoU signing window 8–10 Oct; Wave-1 frozen (16 confirmed / 8 live) ●','G2 20 Nov — JV incorporated, tenant + SSO live; first board 27 Nov','G3 25 Dec — ODA go-live, 100 seats, 8 products; Core42 compute live','Angola: Presidential Court / ADEX sponsorship decision for Luanda ○'],
     platform:['Tenstorrent Galaxy P0 spin-up → P1 pilot → P2 fleet build (Sep–Nov) ●','111,000 devices carrying OnDemand by year-end ◐','Intel Panther Lake AI-PC launch wave; quarterly validated release under the TLA','Galaxy P3 ramp (Nov–Dec): SLOs green at target TPM'],
     capital:['Close Series A2 at $200M pre-money (sovereign vehicle, B Capital, Further, VentureWave, Itqan) ○','Kairoswealth definitive documents; FSRA change-of-control filing; USD 2M strategic investment ○','Board mandate for the DC-fleet financing workstream ○','FY2026 closes at $6.0M licensing revenue, EBITDA-positive ◐']},
    {q:'Q1',y:'2027',gate:'Athar live & billing · next-round launch',
     export:['WISER lighthouse case scoped (Europe) ○','KSA entity / programme set-up (Itqan track, if closed) ○','Redington India / SISA pilot ○','Cisco + NetApp "sovereign rack" reference design started ○'],
     sovereign:['G4 29 Jan — all five anchors contracted (~500 seats) ●','G5 19 Feb — launch; billing starts (model billing month Feb 2027)','G6 26 Mar — Month-6 review; owned-compute decision ($0.65M cluster option)','Luanda funding instrument executed via ADEX/ADFD; hardware PO ○'],
     platform:['Certified images: Panther Lake + Galaxy fleet validated (K3 pair, V4-Flash replicas)','Production AR runtime for Snapdragon AR1+/XR2+ (Q1 2027 per programme)','DC #1 UAE: site, power and hosting (Moro Hub / Core42) selected ○','Tenstorrent LOI → definitive cost-share agreement ○'],
     capital:['Launch the H1 2027 round: $500–600M pre-money narrative, data room refreshed ○','Kairoswealth Category 4 licence effective (target) → 12-month measurement period starts ○','Q1 royalty statements from Qualcomm as the first activation evidence ◐','Arranger short-list for infrastructure debt ○']},
    {q:'Q2',y:'2027',gate:'Round close · first US order',
     export:['First US public-sector purchase order through WWT ○','GCC defence / government sovereign deployment on Qualcomm devices (Q2 2027 per programme) ○','Alpha Data white-label deployments in UAE government; KSA/Qatar expansion path ○','UXE public-safety / smart-city agent pilot ○'],
     sovereign:['Athar Year-2 cohort contracting; international Expansion Schedule tabled (Art. 14.3(a)) ○','DC #1 UAE build — containerised Galaxy fleet ○','Luanda hub: civil works, Masdar power, Space42 connectivity ○','Second CEPA-country conversations opened (Kenya / Morocco) ○'],
     platform:['Quarterly release; SOC 2 Type II maintenance; 99.9% activation SLA reporting','Owned Athar cluster (if approved at G6) commissioned','AI-appliance SKUs (Cloud AI 100 Ultra / AI200-class) in the e& programme','NetApp data layer validated for on-prem RAG estates ○'],
     capital:['Close next round at $500–600M pre-money (targets: Intel Capital, Qualcomm Ventures, Georgian; sovereign options open) ○','Arranger appointed for a $25–50M project facility ○','Kairoswealth onboarding: first corridor family offices into FAB / WIO / ENBD / ADCB ○','Board: mid-year KPI review']},
    {q:'Q3',y:'2027',gate:'DC #1 live · Africa build',
     export:['Redington orders in ≥3 markets; Africa channel deals scoped ○','WISER first European reference delivered ○','Cisco/NetApp rack design published; WWT and Alpha Data quoting it as one SKU ○','NA pipeline ≥ 20% of total ○'],
     sovereign:['Modular sovereign DC #1 live in the UAE (Galaxy fleet) ○','Athar international pilot with first CEPA partner (if approved) ○','Luanda hub construction; Portuguese-language sovereign agents; teacher enablement ○','Athar Year-1 run-rate tracking AED 15.8M (model) ◐'],
     platform:['Galaxy fleet at 4–5M TPM blended; fallback models retired if K3/V4 validated','Snapdragon glasses runtime in production estates','Second Qualcomm activation wave (AI PC bundle at scale)','Certified image coverage for all five Qualcomm families'],
     capital:['Round proceeds deployed: export sales capacity, DC equity, M&A execution ○','Kairoswealth mid-period KPI review; Category 3 roadmap filed within 90 days of licence ○','Debt facility structuring: SPV, offtake, collateral, guarantees ○','Sovereign-vehicle follow-on discussions ○']},
    {q:'Q4',y:'2027',gate:'279K devices · $29.0M FY2027E',
     export:['FY2027E revenue $29.0M; contracted exit ARR $9.6M ◐','Outside-UAE share of new bookings ≥ 40% ○','Redington Africa deployments in 3+ markets ○','e& programme Year-2 volumes (index 180–220 vs Year 1) ◐'],
     sovereign:['Luanda live for ~2.0M students (if funded Q1) ○','Athar Year-2 seats (758 UAE-only / 931 with international) ◐','DC #2 (Luanda solar unit) commissioned ○','National Angola phase-1 procurement opened ○'],
     platform:['279,000 installed OEM devices by year-end ◐','Galaxy fleet expansion decision (23 → 28 units or second site)','AI250 rack line certified under the TLA','OnDemand marketplace agents localised for Portuguese / French African estates'],
     capital:['Unicorn-threshold round window opens (H2 2027 target) ○','Project facility term sheet ($25–50M) for DC #2–3 ○','Kairoswealth: qualifying AUA/AUM tracking toward $250M ○','Board: FY2028 budget on the eight-quarter plan']},
    {q:'Q1',y:'2028',gate:'Kairoswealth KPI test · Cat 3',
     export:['Second US agency estate via WWT ○','KSA revenue at 24-month aspirational marker ($5M) if programme active ○','Europe: 2–3 references with WISER ○','India / SE Asia scale-market entry per export deck ○'],
     sovereign:['Second CEPA country signed for a national programme ○','DC #3 (second country) site and funding ○','Athar Year-3 trajectory: 1,119 UAE-only / 1,732 with international seats ◐','Angola national phase-1 hubs in construction ○'],
     platform:['Certified images for new Intel/Qualcomm generations; quarterly cadence continues','Fleet operations tooling: multi-site K8s, blue-green weights, per-tenant metering','Sovereign model updates in-country (no telemetry leaves the estate)','Hardware roadmap review with Tenstorrent, Qualcomm, Intel'],
     capital:['Kairoswealth measurement period ends (if licence Q1 2027) → KPI test → consideration shares ○','Category 3 application filed → AUA to discretionary AUM ○','First drawdown on the project facility ○','IPO-readiness scoping (Qualified IPO: ≥3× post-money, ≥$50M primary) ○']},
    {q:'Q2',y:'2028',gate:'IPO-readiness · fleet scale',
     export:['NA ≥ 20% of bookings; outside-UAE ≥ 60% of new bookings ○','Cisco channel agreement executed (target) ○','Redington renewals at ~35% of year-1 fees converting to annuity ◐','Moro Hub-hosted sovereign capacity offered to GCC governments ○'],
     sovereign:['DC #3 live; fleet of three modular units ○','Athar break-even trajectory (Year 4 UAE-only; Year 3 with international) ◐','Angola health & agriculture agents live on the same hardware ○','Third CEPA country scoped ○'],
     platform:['562,500-device trajectory confirmed by royalty statements ◐','Cisco/NetApp/Galaxy rack v2; AR runtime v2','Marketplace: 1,500+ listings; partner-built agents','Compliance: ISO 27001 recertification, SOC 2 Type II period'],
     capital:['IPO-readiness workstream: audited accounts, governance, venue (ADX or international) ○','$1B+ round or pre-IPO round decision ○','Debt facility fully structured for national roll-outs ○','Kairoswealth fee income compounding; co-investment perimeter cleared with FSRA ○']},
    {q:'Q3',y:'2028',gate:'Two-year scorecard',
     export:['Twelve-KPI scorecard delivered to the Board ○','Export receipts reported to the Ministry as non-oil exports ○','Channel: WWT, Cisco, Redington, Alpha Data, WISER, UXE all transacting ○','Partner-sourced pipeline ≥ 50% of total ○'],
     sovereign:['3+ sovereign estates outside the UAE ○','Athar international cohorts contributing per Expansion Schedule ◐','Luanda national programme phase 1 live ○','Reference-estate playbook published for CEPA partners ○'],
     platform:['On track to 562,500 devices by Dec 2028 ◐','Three silicon families in factory pre-load; Galaxy fleet at scale','Platform R&D line funded from operating cash flow ◐','Next-generation harness roadmap (agent compute runtime v2)'],
     capital:['FY2028E revenue $62.6M; EBITDA margin 77% ◐','Valuation: $1B+ mark or IPO track decided ○','Debt: no recourse beyond licence/operating contracts maintained ○','Two-year plan closed; 2029–2031 plan tabled ○']}
  ];
  const qtabs=$('#qtabs'), qbody=$('#qbody');
  if(qtabs){
    Q.forEach((q,i)=>{ const b=document.createElement('div'); b.className='qtab'+(i===0?' on':''); b.innerHTML=`<div class="q">${q.q}</div><div class="y">${q.y}</div><div class="m">${q.gate}</div>`; b.onclick=()=>showQ(i); qtabs.appendChild(b); });
    function showQ(i){ $$('.qtab').forEach((t,k)=>t.classList.toggle('on',k===i)); const q=Q[i];
      const col=(h,arr)=>`<div class="qcol"><h4>${h}</h4><ul class="clean">${arr.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
      qbody.innerHTML=col('Export engine',q.export)+col('Sovereign programmes',q.sovereign)+col('Platform & hardware',q.platform)+col('Capital & corporate',q.capital); }
    showQ(0);
  }

  /* ---------------- Partner grid ---------------- */
  const P=[
    {n:'Qualcomm',s:'signed',c:'silicon',r:'Technology License Agreement (eff. 1 Jun 2026): factory pre-load across Snapdragon X, Cloud AI 100/Ultra, Dragonwing IQ-X, XR2/AR1, AI200/AI250 — $100 per activated unit, perpetual.',m:'Two-year target: ≥279K activated devices by end-2027, 562.5K by end-2028 (model); first blended 25,000-device programme with Entity X and e& (glasses ~10K, AI PCs ~11K, appliances ~4K). '+src('IM')+src('QC')},
    {n:'Intel',s:'signed',c:'silicon',r:'AI PC MOU (12 Dec 2025): fully offline OnDemand for Windows on Panther Lake, OpenVINO/NPU; production build delivered 26 Feb 2026; six-month marketing exclusivity.',m:'Target: convert the MOU (non-binding on commercials) into a volume/bundle instrument; Xeon & Gaudi certified datacenter images; joint co-sell in NA and GCC. '+src('IM')+src('EX')},
    {n:'Tenstorrent',s:'signed',c:'silicon',r:'Commercial Collaboration Agreement (1 Sep 2025): joint hardware + harness Integrated Offering; referral fees 5%/10%; 10 qualified leads per quarter; 5% QoQ growth target from Q1 2026.',m:'Target: Galaxy fleet (23 units) live; LOI for ~50% cost-share of the first UAE modular DC converted to definitive; co-sell into Cyprus/Japan/GCC sovereign accounts where Tenstorrent is present. '+src('IM')+src('TT')},
    {n:'World Wide Technology',s:'signed',c:'channel',r:'Reseller Agreement (countersigned 20 Jan 2026): authorised reseller with US federal and state Government Contract flow-downs (FAR/DFARS); net-60 via Coupa. >$20B revenue; 10,000+ customers.',m:'Target: first US public-sector PO in 2027; two agency estates by Q1 2028; Cisco/NetApp sovereign-rack SKU quoted through WWT. '+src('IM')+src('WEB')},
    {n:'Redington',s:'signed',c:'channel',r:'Distribution MoA (18 Jun 2026): UAE, KSA, Oman, Qatar, Kuwait, Bahrain, Jordan, Egypt + the whole of Africa; price card $110K/$200K/$360K; renewals ~35%; margins 8% / 15–20%.',m:'Target: orders in ≥3 markets by Q3 2027; Africa channel deals in 3+ markets by 2028; India/SISA pilot; renewals converting to annuity. '+src('IM')},
    {n:'Alpha Data',s:'signed',c:'channel',r:'White-label reseller MoU (17 Sep / 8 Oct 2025): OnDemand under Alpha Data branding for UAE government and enterprise; first complete on-prem agentic system built in the UAE. AED 2.5B revenue; ~2,200 clients.',m:'Target: white-label deployments across UAE government in 2027; extend territory to KSA/Qatar where Alpha Data operates; commercial annex fixed. '+src('IM')+src('WEB')},
    {n:'WISER Technology',s:'signed',c:'channel',r:'Partnership MoU (13/16 Feb 2026): non-exclusive reseller and implementation partner; GCC first, expansion to European markets (Bulgaria).',m:'Target: one European lighthouse in 2027; 2–3 references by 2028; EU sovereign-cloud positioning. '+src('IM')},
    {n:'Core42 (G42) · ADQ',s:'signed',c:'sovereign',r:'Core42 MSA (2024) for the entire G42 group; ADQ MSA (10 Jul 2025) with pre-agreed OnDemand pricing (SaaS from $10K/month), shareable across ADQ affiliates and Abu Dhabi government entities.',m:'Target: Core42 as Athar\'s rented sovereign compute (32× H200) and overflow host for modular units; ADQ affiliate programmes as the domestic reference estate. '+src('IM')+src('JV')},
    {n:'Supermicro',s:'signed',c:'silicon',r:'OnDemand certified for the AS-2115HV-TNRT workstation (Oct 2025); sovereign / air-gapped systems ship preloaded via Supermicro\'s global supply chain.',m:'Target: preloaded SKUs in WWT and Redington catalogues; rack-scale systems for DC #1–3. '+src('EX')},
    {n:'Cisco',s:'target',c:'channel',r:'In development — constellation partner (networking backbone, enterprise/government channel reach). FY2026 revenue $63.3B; 1M+ customers in 150+ countries; 82,000+ government organisations; 99% of the Fortune 500.',m:'Target: joint "sovereign rack" reference design (Cisco fabric + NetApp + Galaxy/AI200 + OnDemand) in 2027; executed channel agreement by Q2 2028; government accounts in NA and GCC. '+src('EX')+src('WEB')},
    {n:'NetApp',s:'target',c:'channel',r:'Proposed — AI data infrastructure (FY2026 revenue $6.925B; AI Data Engine; NVIDIA-validated architectures).',m:'Target: NetApp as the data layer of on-prem RAG estates; validated design with Cisco and WWT; first joint sovereign deployment 2027–28. '+src('WEB')},
    {n:'Moro Hub (Digital DEWA)',s:'target',c:'sovereign',r:'Proposed — 100 MW solar-powered Green Data Centre at the MBR Solar Park; Tier III; Guinness-record first phase; second phase inaugurated Jan 2025.',m:'Target: hosting RFP for modular DC #1 and green sovereign capacity for GCC governments; co-marketed "sovereign AI on solar" offer. '+src('WEB')},
    {n:'UXE Security Solutions',s:'target',c:'channel',r:'Proposed — Dubai-based government security and smart-city integrator (video, IoT sensing, asset tracking, body-worn cameras; 101–250 staff).',m:'Target: public-safety and smart-city agent pilots in 2027; UXE as delivery partner for GCC municipal estates. '+src('WEB')},
    {n:'e& (Etisalat)',s:'target',c:'channel',r:'Programme partner in the Qualcomm × Entity X × e& device programme: enterprise/government distribution; 244.7M group subscribers, 38 countries; ~16.3M UAE subscribers.',m:'Target: first 25,000-device PO activated across glasses, AI PCs and appliances; Year-2 volumes at index 180–220; GCC defence/government sovereign deployment Q2 2027. '+src('QC')},
    {n:'IBM · Dell',s:'target',c:'channel',r:'Constellation partners — IBM: enterprise AI models plus worldwide distribution; Dell: certified systems plus multi-layer distribution.',m:'Target: certified Dell systems preloaded for channel SKUs; IBM ecosystem listing; instruments to be executed. '+src('EX')},
    {n:'ODA — Presidential Court',s:'signed',c:'sovereign',r:'Athar JV MoU (signing window 8–10 Oct 2026): 50/50 venture with the Office of Development Affairs; five federal development anchors; ~500 seats Year 1.',m:'Target: live and billing Feb 2027; international expansion vehicle for CEPA partners from Year 2. '+src('JV')}
  ];
  const pg=$('#pgrid');
  if(pg){
    P.forEach(p=>{ const d=document.createElement('div'); d.className='pcard '+p.s; d.dataset.s=p.s; d.dataset.c=p.c;
      d.innerHTML=`<div class="nm">${p.n}<span class="tag ${p.s==='signed'?'signed':'target'}">${p.s==='signed'?'● signed':'○ target'}</span></div><div class="role">${p.r}</div><div class="more">${p.m}</div>`;
      d.onclick=()=>d.classList.toggle('open'); pg.appendChild(d); });
    $$('#pfilter .pill').forEach(b=>b.onclick=()=>{ $$('#pfilter .pill').forEach(x=>x.classList.remove('on')); b.classList.add('on'); const f=b.dataset.f;
      $$('.pcard').forEach(c=>{ const show=f==='all'||c.dataset.s===f||c.dataset.c===f; c.classList.toggle('hide',!show); }); });
  }

  /* ---------------- Athar scenario toggle ---------------- */
  const A={
    uae:{rev:[15.8,27.3,40.0,45.7,56.9],cost:[24.5,37.2,44.1,45.1,48.4],sur:[-8.7,-9.9,-4.1,0.6,8.5],seats:[500,758,1119,1716,2826],be:'Year 4',oda:'60.2',airev:'30.1',y5:'56.9',s5:'8.5'},
    intl:{rev:[15.8,29.3,47.4,63.8,95.0],cost:[24.5,38.0,47.0,52.1,62.9],sur:[-8.7,-8.7,0.4,11.7,32.1],seats:[500,931,1732,3224,6000],be:'Year 3',oda:'215.2',airev:'121.5',y5:'95.0',s5:'32.1'}
  };
  function renderAthar(k){ const a=A[k]; const el=$('#c-athar'); if(!el) return;
    lineChart(el,{labels:['Y1','Y2','Y3','Y4','Y5'],series:[{name:'Revenue (AED M)',values:a.rev,area:true},{name:'Fully-loaded cost',values:a.cost,color:'#A5884B',dash:'5,4'},{name:'Operating surplus / (deficit)',values:a.sur,color:'#B4533A'}],valFmt:v=>v.toFixed(1)});
    $('#athar-kpis').innerHTML=`<div class="tile"><div class="k">Year-5 seats</div><div class="v" style="font-size:22px">${a.seats[4].toLocaleString()}</div><div class="d">from 500 anchor seats</div></div><div class="tile"><div class="k">Year-5 revenue · surplus</div><div class="v" style="font-size:22px">AED ${a.y5}M</div><div class="d">operating surplus AED ${a.s5}M · break-even ${a.be}</div></div><div class="tile gold"><div class="k">NPV · ODA @3.5% / AIREV @10%</div><div class="v" style="font-size:22px">${a.oda} / ${a.airev}</div><div class="d">AED M · committed capital AED 20.40M (10.20M each)</div></div>`;
    $$('[data-sc]').forEach(b=>b.classList.toggle('on',b.dataset.sc===k)); }
  $$('[data-sc]').forEach(b=>b.onclick=()=>renderAthar(b.dataset.sc));

  /* ---------------- DC cost-share toggle ---------------- */
  function renderDC(cs){ const lo=4.4, hi=5.9; const share=cs?0.5:1; const el=$('#dc-split'); if(!el) return;
    el.innerHTML=`<div class="tile"><div class="k">Unit all-in (grid-powered)</div><div class="v" style="font-size:22px">$${lo}–${hi}M</div><div class="d">Galaxy fleet $2.9–4.4M + container/cooling ~$0.75M + network/software ~$0.75M</div></div>
      <div class="tile ${cs?'gold':''}"><div class="k">Tenstorrent contribution</div><div class="v" style="font-size:22px">${cs?'$'+(lo*0.5).toFixed(1)+'–'+(hi*0.5).toFixed(1)+'M':'—'}</div><div class="d">${cs?'~50% of the first UAE modular deployment per the LOI premise (to be confirmed)':'no cost-share assumed'}</div></div>
      <div class="tile em"><div class="k">AIREV / JV share</div><div class="v" style="font-size:22px">$${(lo*share).toFixed(1)}–${(hi*share).toFixed(1)}M</div><div class="d">${cs?'equity from Athar JV / AIREV; hosting via Moro Hub or Core42':'full unit cost carried by AIREV / JV'}</div></div>`;
    $$('[data-cs]').forEach(b=>b.classList.toggle('on',(b.dataset.cs==='1')===!!cs)); }
  $$('[data-cs]').forEach(b=>b.onclick=()=>renderDC(b.dataset.cs==='1'));

  /* ---------------- Valuation slider ---------------- */
  const mult=$('#mult'), mo=$('#mult-out');
  function renderMult(){ if(!mult) return; const m=+mult.value; const v27=29.0*m, v28=62.6*m; const arr27=9.6*m;
    const peers=[['Sierra',100],['LangChain',90],['Glean',72],['n8n',60],['Cognition',53],['Writer',38],['AIREV A2 entry (2026 rev)',33]];
    mo.innerHTML=`<div class="tile"><div class="k">${m}× FY2027E revenue ($29.0M)</div><div class="v" style="font-size:22px">$${Math.round(v27)}M</div><div class="d">${v27>=500&&v27<=600?'inside the $500–600M band':v27<500?'below the band':'above the band'}</div></div>
      <div class="tile"><div class="k">Same value ÷ FY2028E revenue ($62.6M)</div><div class="v" style="font-size:22px">${(v27/62.6).toFixed(1)}×</div><div class="d">next-twelve-months multiple at an H1 2027 close</div></div>
      <div class="tile gold"><div class="k">Same value ÷ FY2027 exit ARR ($9.6M)</div><div class="v" style="font-size:22px">${(v27/9.6).toFixed(0)}×</div><div class="d">peer rounds priced at ${peers.filter(p=>p[1]>=Math.round(v27/9.6)).length} of 7 reference multiples or higher</div></div>`; }
  if(mult){ mult.oninput=renderMult; }

  /* ---------------- Charts ---------------- */
  function renderCharts(){
    const arm=$('#c-arm'); if(arm) donut(arm,{labels:['Royalty $2,613M','Licence & other $2,307M'],values:[2613,2307],colors:['#0E7A5F','#A5884B'],center:'$4.92B'});
    const roy=$('#c-royalty'); if(roy) barChart(roy,{labels:['20K units','50K','100K'],series:[{name:'Cumulative royalty (USD M)',values:[2.0,4.7,9.2]}],valFmt:v=>'$'+v.toFixed(1)+'M',legend:false});
    const rev=$('#c-rev'); if(rev) barChart(rev,{labels:['Y1','2025','2026','2027E','2028E','2029E'],series:[{name:'Revenue (USD M)',values:[1.0,1.2,6.0,29.0,62.6,97.9]},{name:'Contracted exit ARR (USD M)',values:[null,null,1.5,9.6,19.4,31.7],color:'#A5884B'}],valFmt:v=>v.toFixed(1)});
    const pc=$('#c-partners'); if(pc) hbarChart(pc,{labels:['Cisco (FY26)','WWT (stated)','e& (FY25)','NetApp (FY26)','Alpha Data (FY25)'],values:[63.33,20,19.9,6.925,0.68],colors:['#0E7A5F','#0E7A5F','#A5884B','#0E7A5F','#A5884B'],valFmt:v=>'$'+(v>=10?v.toFixed(1):v.toFixed(2))+'B'});
    const af=$('#c-africa'); if(af) barChart(af,{labels:['Africa DC construction 2025','2031','MEA AI DC 2026','2031 '],series:[{name:'USD B',values:[1.24,4.58,2.51,8.24]}],valFmt:v=>'$'+v.toFixed(2)+'B',legend:false});
    const val=$('#c-val'); if(val) lineChart(val,{labels:['Feb 2024','Dec 2025','May 2026','Aug 2026','H1 2027 ○','H2 2027 ○'],series:[{name:'Documented marks (USD M)',values:[10,90,137.85,200,null,null],area:true},{name:'Targets — low',values:[null,null,null,200,500,1000],color:'#A5884B',dash:'6,4'},{name:'Targets — high',values:[null,null,null,215,600,1000],color:'#B4533A',dash:'2,4',width:1.5}],valFmt:v=>'$'+v+'M'});
    renderAthar('uae'); renderDC(true); renderMult();
  }
  if(document.readyState==='complete') renderCharts(); else addEventListener('load',renderCharts);
})();

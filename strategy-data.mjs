export const strategy = {
  "model": {
    "scenarios": {
      "uae": {
        "id": "uae",
        "label": "UAE-only base case",
        "seats": [
          500,
          758,
          1119,
          1716,
          2826
        ],
        "revenue": [
          15.8,
          27.3,
          40,
          45.7,
          56.9
        ],
        "cost": [
          24.5,
          37.2,
          44.1,
          45.1,
          48.4
        ],
        "surplus": [
          -8.7,
          -9.9,
          -4.1,
          0.6,
          8.5
        ],
        "breakEven": 4,
        "partnerNpv": 60.2,
        "airevNpv": 30.09,
        "condition": "UAE-only scope. Contractual capital basis and callable cash remain subject to joint alignment.",
        "currency": "AED",
        "financialUnit": "million",
        "modelHorizonYears": 5,
        "modelDate": "2026-09-03",
        "modelVersion": "v13",
        "deliveryModel": "Open-source",
        "facility": "No concessional facility",
        "evidence": "Source-reported forecast · unaudited",
        "source": "S05 · physical p.1 §2; p.2 §3",
        "modelIndependentlyValidated": false
      },
      "international": {
        "id": "international",
        "label": "International expansion upside",
        "seats": [
          500,
          931,
          1732,
          3224,
          6000
        ],
        "revenue": [
          15.8,
          29.3,
          47.4,
          63.8,
          95
        ],
        "cost": [
          24.5,
          38,
          47,
          52.1,
          62.9
        ],
        "surplus": [
          -8.7,
          -8.7,
          0.4,
          11.7,
          32.1
        ],
        "breakEven": 3,
        "partnerNpv": 215.2,
        "airevNpv": 121.5,
        "condition": "Additional international cohorts from model Year 2, contingent on the Expansion Schedule and Article 14.3(a) approval.",
        "currency": "AED",
        "financialUnit": "million",
        "modelHorizonYears": 5,
        "modelDate": "2026-09-03",
        "modelVersion": "v13",
        "deliveryModel": "Open-source",
        "facility": "No concessional facility",
        "evidence": "Source-reported forecast · unaudited",
        "source": "S05 · physical p.1 §2; p.2 §3",
        "modelIndependentlyValidated": false
      }
    },
    "funding": {
      "without": {
        "capital": 20.4,
        "equityEach": 10.2,
        "facility": 0,
        "partnerNpv": 60.2,
        "airevNpv": 30.09
      },
      "with": {
        "capital": 20.4,
        "equityEach": 6.8,
        "facility": 6.8,
        "partnerNpv": 60.96,
        "airevNpv": 31.69
      }
    },
    "limits": [
      "Full financial workbook not available; summary transcription and arithmetic checked, not independent model validation.",
      "Sovereign Partner NPV rate 3.5%; AIREV NPV rate 10%. Cashflow definitions, valuation date and NPV horizon are not disclosed in the summary.",
      "Five-year model years are not the eight execution quarters.",
      "No equity, facility or partner contribution is represented as cash received or an executed funding obligation."
    ]
  },
  "sources": {
    "S01": {
      "title": "Export narrative",
      "date": "Date not established",
      "scope": "11 physical pages; image-based English OCR; company positioning, not independent proof."
    },
    "S02": {
      "title": "Journey and strategic validation",
      "date": "Snapshot date varies",
      "scope": "15 physical pages; company-reported history, capabilities and demonstrations. No current audit assurance inferred."
    },
    "S03": {
      "title": "Investment memorandum",
      "date": "August 2026",
      "scope": "12 physical pages. Management-prepared, unaudited forecasts; original valuation workbook and many underlying agreements unavailable."
    },
    "S04": {
      "title": "VVIP Sovereign JV — executive summary",
      "date": "Model basis: 3 September 2026",
      "scope": "2 slides. Indicative October 2026–March 2027 gates; no signature or completion inferred."
    },
    "S05": {
      "title": "VVIP Sovereign JV — financial summary",
      "date": "3 September 2026 · v13",
      "scope": "2 physical pages. Open-source/no-facility geographic scenarios; summary source-checked; full model unavailable."
    },
    "S06": {
      "title": "Potential wealth-platform combination — draft LOI",
      "date": "23 August 2026",
      "scope": "Clauses,184 body paragraphs and4 tables read. Unsigned proposal. Separate investment instrument and regulatory approvals required. Conflicting optional conversion mechanics withheld."
    },
    "R08": {
      "title": "Channel reseller MoU",
      "date": "17 September 2025 effective date",
      "scope": "4 pages; UAE non-exclusive white-label reseller rights; margins in separate annex. Signature authentication not performed."
    },
    "R09": {
      "title": "Distribution / reseller agreement",
      "date": "18 June 2026 effective date",
      "scope": "11 pages; defined MENA/Africa territory, subject to orders and export controls. No minimum sales volume inferred."
    },
    "R10": {
      "title": "AI PC collaboration MoU",
      "date": "12 December 2025 effective date",
      "scope": "13 pages. Sections1–10 binding wording; engagement Schedule explicitly non-binding. Delivery plans are not proof of completion."
    },
    "R11": {
      "title": "Prospective channel MoU",
      "date": "Undated draft",
      "scope": "Unsigned draft with legal-entity placeholders. Proposed market development and enablement, not executed resale rights."
    },
    "P01": {
      "title": "Tenstorrent technical collaboration announcement",
      "date": "25 June 2025",
      "scope": "Official public announcement: integration and proposed UAE development node; no facility co-funding commitment."
    },
    "P02": {
      "title": "Intel partner technical brief",
      "date": "November 2025",
      "scope": "One-page official brief, Xeon6/Gaudi3 platform scope. Brief is not an audit or universal compatibility guarantee."
    },
    "R01": {
      "title": "VVIP Sovereign JV — implementation plan",
      "date": "27 August 2026 · revision 3",
      "scope": "85 pages recovered/extracted; workstreams and gates reviewed. Older dates and scenarios retained separately; no approval inferred."
    },
    "R02": {
      "title": "VVIP Sovereign JV — implementation workbook",
      "date": "Recovered revision 2",
      "scope": "14 worksheets;763 formulas;0 cached values. Implementation workbook, not the full v13 financial model; not recalculated."
    },
    "V01": {
      "title": "VVIP Sovereign JV — alternate summary visual",
      "date": "Version approval unconfirmed",
      "scope": "Consolidated19.1/46.6/70.2 revenue series and September–March gate dates differ from S04/S05; comparison only."
    },
    "B01": {
      "title": "Original strategy presentation",
      "date": "30 August 2026 snapshot",
      "scope": "Byte-matching source presentation; legacy financial assertions and investor context are not audited. Private identities are redacted."
    },
    "U01": {
      "title": "Management strategy direction",
      "date": "Current implementation brief",
      "scope": "Two-year export ambition, proposed sequencing and provisional USD500–600M valuation milestone; not a funding commitment."
    }
  },
  "periodConvention": {
    "label": "Eight execution quarters · Month 1–24",
    "effectiveDate": null,
    "basis": "Proposed management sequencing, not an approved calendar plan. Q1 is the first three months after an approved strategy start. JV model years and dated gates are separate."
  },
  "devices": [
    {
      "id": "modular-data-centre",
      "title": "Modular data centres",
      "status": "Proposed reference deployment",
      "body": "Package compute, sovereign inference and the OnDemand harness as an exportable offer. The public Tenstorrent development-node announcement supports a technical relationship, not a completed modular facility.",
      "gate": "Site, power, connectivity, performance acceptance, approvals and financing must all clear before commissioning.",
      "source": "P01 · 25 Jun 2025; S04 · slide 2; U01",
      "compute": "Intel · Tenstorrent",
      "tag": "Concept artwork",
      "image": "assets/modular-data-centre.webp"
    },
    {
      "id": "laptop",
      "title": "Laptops / AI PCs",
      "status": "Documented integration scope",
      "body": "An offline Windows AI PC track is described in the Intel collaboration MoU. Company materials also describe Qualcomm device licensing. Delivery must be validated for each supported architecture.",
      "gate": "Hardware-specific installation, model tests, security review and distribution terms; not every laptop is compatible or preloaded.",
      "source": "R10 · pp.5–8; S03 · p.10 A.2",
      "compute": "Intel · Qualcomm",
      "tag": "Concept artwork",
      "image": "assets/laptop.webp"
    },
    {
      "id": "smart-glasses",
      "title": "Smart glasses",
      "status": "Roadmap / R&D",
      "body": "A wearable runtime is a potential surface for governed agentic assistance. The memorandum includes AR/VR runtime R&D in reported license obligations, not proof of shipped smart glasses.",
      "gate": "Device runtime, privacy, battery/latency, user-consent and safety validation.",
      "source": "S03 · p.10 A.2; S01 · p.11",
      "compute": "Qualcomm example",
      "tag": "Concept artwork",
      "image": "assets/smart-glasses.webp"
    },
    {
      "id": "on-prem-appliance",
      "title": "On-premise appliances",
      "status": "Reported supported configuration",
      "body": "Run inside an enterprise perimeter with model choice, local retrieval and governance. Company sources report a specific Supermicro workstation configuration and sovereign deployment options.",
      "gate": "Verify configuration sheet, image version, integration acceptance and each customer boundary.",
      "source": "S01 · pp.5/8; P01; P02",
      "compute": "Supermicro · Intel · Tenstorrent",
      "tag": "Concept artwork",
      "image": "assets/on-prem-appliance.webp"
    },
    {
      "id": "cctv",
      "title": "CCTV / vision edge",
      "status": "Roadmap concept",
      "body": "Connect visual events to governed workflows: detect an operational signal, route an approved task and preserve an audit trail. This is a proposed application, not a claimed installed camera estate.",
      "gate": "Lawful purpose, privacy, access controls, human review and device-specific validation.",
      "source": "U01 · deployment concepts; R11 · proposed solutions",
      "compute": "Device selection pending",
      "tag": "Concept artwork",
      "image": "assets/cctv.webp"
    },
    {
      "id": "robot",
      "title": "Robotics",
      "status": "Roadmap concept",
      "body": "Translate approved high-level tasks into monitored workflows. Any physical action needs an explicit permission boundary, safe operating limits and human override.",
      "gate": "Simulation, safety assessment, vendor integration and verified emergency-stop controls.",
      "source": "U01 · deployment concepts",
      "compute": "Device selection pending",
      "tag": "Concept artwork",
      "image": "assets/robot.webp"
    },
    {
      "id": "drone",
      "title": "Drones",
      "status": "Roadmap concept",
      "body": "Potential inspection and response workflows combine mission data, local inference and human authorization. No completed drone integration is established by the reviewed sources.",
      "gate": "Aviation permissions, export controls, mission safety, telemetry security and human command.",
      "source": "U01 · deployment concepts",
      "compute": "Device selection pending",
      "tag": "Concept artwork",
      "image": "assets/drone.webp"
    }
  ],
  "layers": [
    {
      "id": "compute",
      "title": "01 · Compute & deployment",
      "kicker": "Hardware is a choice, not a lock-in",
      "body": "Documented relationships are configuration-specific. Intel Xeon/Gaudi and AI PC work, Qualcomm licensing scope reported by management, and Tenstorrent integration each carry different evidence.",
      "items": [
        "Intel: official partner brief; AI PC MoU engagement Schedule is non-binding.",
        "Qualcomm: memorandum-reported commercial instruments; original TLA not available in this review.",
        "Tenstorrent: official integration announcement; no percentage of facility funding verified."
      ],
      "source": "P01; P02; R10 pp.3/5–8; S03 p.10"
    },
    {
      "id": "harness",
      "title": "02 · OnDemand harness",
      "kicker": "The reusable sovereign software layer",
      "body": "Orchestrate models, tools and enterprise knowledge into governed agent workflows. The deployment boundary, policy and audit trail remain explicit as underlying models change.",
      "items": [
        "Orchestration: multi-agent flows, approvals and error handling.",
        "Tools & RAG: scoped connectors, retrieval and controlled data access.",
        "Governance: identity, role-based permissions, policy, audit and human oversight.",
        "Model choice: select validated models for task, cost, classification and placement."
      ],
      "source": "S03 pp.3–4; R10 pp.10–13; S02 p.14"
    },
    {
      "id": "applications",
      "title": "03 · Sector applications",
      "kicker": "Outcomes above the common layer",
      "body": "Reuse the harness in government, education, healthcare and smart-city workflows. Each proposed use case needs its own data rights, acceptance tests, regulatory review and operating owner.",
      "items": [
        "Smart government: accountable service and knowledge workflows.",
        "Education: teacher assistance and learning-content workflows.",
        "Healthcare: administrative assistance first; clinical use requires additional validation.",
        "Smart cities: asset, planning and operations workflows."
      ],
      "source": "S02 pp.13–14; U01"
    }
  ],
  "sectors": [
    {
      "id": "government",
      "title": "Smart government",
      "status": "Source-reported capability / proposed rollout",
      "body": "Policy research, knowledge retrieval and service workflows with named owners, approval gates and sovereign data boundaries. Future JV contracting and go-live remain plans.",
      "gate": "Authorized data; product-owner sign-off; audit records; actual procurement and acceptance.",
      "source": "S02 pp.13–14; S04 slides1–2"
    },
    {
      "id": "education",
      "title": "Education",
      "status": "Company-reported demonstrations",
      "body": "Teacher administration, curriculum support and multilingual learning assistance. Prior education demonstrations do not establish deployment at every institution.",
      "gate": "Separate product/user cohorts, learner privacy and evaluated learning outcomes.",
      "source": "S02 pp.6/9/13"
    },
    {
      "id": "healthcare",
      "title": "Healthcare",
      "status": "Proposed applications",
      "body": "Begin with documentation and administrative support, with human oversight. Examples of third-party healthcare AI are not AIREV customers or clinical validation.",
      "gate": "Clinical safety where relevant, lawful health-data processing and required approvals.",
      "source": "S02 p.13; U01"
    },
    {
      "id": "cities",
      "title": "Smart cities",
      "status": "Roadmap applications",
      "body": "Potential planning, asset maintenance, procurement and operational knowledge workflows on the same governed software layer.",
      "gate": "City-specific data rights, operational safety, integration tests and accountable human owners.",
      "source": "S02 p.13; U01"
    }
  ],
  "channels": [
    {
      "id": "cisco",
      "name": "Cisco",
      "role": "Showcase",
      "status": "Prior public research",
      "scope": "ISV discovery",
      "body": "Prior research reports OnDemand in the Cisco ISV showcase.",
      "limit": "Listing is not a reseller contract, guaranteed reach or sales. Direct page confirmation remains pending.",
      "regions": [
        "north-america",
        "global"
      ],
      "source": "Prior research register; S01 p.8"
    },
    {
      "id": "wwt",
      "name": "WWT",
      "role": "Systems integration / resale",
      "status": "Agreement reported by memorandum",
      "scope": "Territory per original agreement",
      "body": "The memorandum reports authorized reseller status and public-sector contracting terms. Public reporting also describes exploration and workstation-channel availability.",
      "limit": "Original countersigned reseller agreement not available here; no completed sales inferred.",
      "regions": [
        "north-america",
        "global"
      ],
      "source": "S03 p.12 A.10; prior public research"
    },
    {
      "id": "alpha-data",
      "name": "Alpha Data",
      "role": "White-label reseller",
      "status": "Original MoU read",
      "scope": "UAE",
      "body": "Non-exclusive white-label reseller access, training and joint go-to-market appear in the recovered MoU.",
      "limit": "Margin annex, current renewal status and signature authenticity are not independently verified.",
      "regions": [
        "uae"
      ],
      "source": "R08 pp.2–4"
    },
    {
      "id": "redington",
      "name": "Redington",
      "role": "Distribution / reseller",
      "status": "Original agreement read",
      "scope": "Named MENA markets + Africa",
      "body": "The recovered agreement covers UAE, Oman, KSA, Qatar, Kuwait, Bahrain, Jordan, Egypt and Africa, with defined license and service offerings.",
      "limit": "Orders and export controls govern sales. Territory is potential access, not contracted volume or shipped devices.",
      "regions": [
        "uae",
        "mena",
        "africa"
      ],
      "source": "R09 p.1 §1; p.10 Annexure B"
    },
    {
      "id": "uxe",
      "name": "UXE",
      "role": "Market development",
      "status": "Draft / announcement lead",
      "scope": "UAE focus; international by agreement",
      "body": "The recovered draft proposes solution development, enablement and market access. Prior research records partnership activity.",
      "limit": "Legal entity, date and signatures remain placeholders in the recovered draft; definitive resale terms required.",
      "regions": [
        "uae",
        "mena",
        "global"
      ],
      "source": "R11 §§3/7/12; prior public research"
    },
    {
      "id": "moro-hub",
      "name": "Moro Hub",
      "role": "Prospective channel",
      "status": "Management-identified",
      "scope": "Scope pending evidence",
      "body": "Included as a management-identified route requiring relationship and deployment evidence.",
      "limit": "No primary commercial agreement recovered. Missing public evidence is not proof of no relationship.",
      "regions": [
        "uae"
      ],
      "source": "U01; prior research gap"
    },
    {
      "id": "netapp",
      "name": "NetApp",
      "role": "Prospective systems channel",
      "status": "Management-identified",
      "scope": "Scope pending evidence",
      "body": "Potential storage and enterprise-system alignment remains subject to source confirmation.",
      "limit": "No signed commercial channel or customer relationship asserted.",
      "regions": [
        "global"
      ],
      "source": "U01; prior research gap"
    },
    {
      "id": "intel",
      "name": "Intel",
      "role": "Compute / technical",
      "status": "Official brief + MoU read",
      "scope": "Xeon6 / Gaudi3; AI PC track",
      "body": "Official brief describes platform integrations; recovered MoU defines a proposed offline AI PC engagement.",
      "limit": "The Schedule is non-binding. A brief is not an independent certification audit or universal preload guarantee.",
      "regions": [
        "global",
        "north-america"
      ],
      "source": "P02; R10 pp.3/5–8"
    },
    {
      "id": "qualcomm",
      "name": "Qualcomm",
      "role": "Compute / licensing",
      "status": "Commercial scope reported",
      "scope": "Named silicon families",
      "body": "The memorandum reports SOW delivery and a non-exclusive activated-device technology license.",
      "limit": "Original executed instruments and activation records not recovered. R&D scope is not shipped product evidence.",
      "regions": [
        "global",
        "north-america"
      ],
      "source": "S03 pp.5/10 A.1–A.2"
    },
    {
      "id": "tenstorrent",
      "name": "Tenstorrent",
      "role": "Compute / technical",
      "status": "Official announcement read",
      "scope": "Integration; proposed UAE node",
      "body": "The 25 June 2025 announcement describes OnDemand on Tenstorrent hardware and a planned development node.",
      "limit": "Not evidence of completed modular deployment or an accepted co-funding percentage.",
      "regions": [
        "uae",
        "north-america",
        "asia"
      ],
      "source": "P01; S03 p.11 A.8"
    },
    {
      "id": "supermicro",
      "name": "Supermicro",
      "role": "Systems configuration",
      "status": "Company / public report",
      "scope": "AS-2115HV-TNRT workstation",
      "body": "Company sources and prior reporting describe model-specific compatibility/certification and preloaded ordering.",
      "limit": "No universal bundling claim. Vendor configuration and current delivery status need direct confirmation.",
      "regions": [
        "global"
      ],
      "source": "S01 pp.5/8; S02 p.7; prior research"
    },
    {
      "id": "dell",
      "name": "Dell",
      "role": "Systems ecosystem",
      "status": "Company-stated",
      "scope": "Scope unverified",
      "body": "Included in the original ecosystem narrative.",
      "limit": "No inspected direct reseller contract or deployment proof; no guaranteed sales channel asserted.",
      "regions": [
        "global"
      ],
      "source": "S01 pp.5/8"
    },
    {
      "id": "ibm",
      "name": "IBM",
      "role": "Enterprise ecosystem",
      "status": "Company-stated",
      "scope": "Scope unverified",
      "body": "Included in the original ecosystem narrative and stack context.",
      "limit": "No inspected direct commercial agreement; logo placement is not revenue or committed access.",
      "regions": [
        "global"
      ],
      "source": "S01 pp.5/8"
    },
    {
      "id": "core42",
      "name": "Core42",
      "role": "Technical delivery",
      "status": "Relationship reported",
      "scope": "UAE reference estate",
      "body": "Company sources report technical collaboration and a domestic services framework.",
      "limit": "Named here only as a public technical partner, not as disclosure of private investor terms. Deployment-level acceptance remains separate.",
      "regions": [
        "uae",
        "mena"
      ],
      "source": "S03 pp.8/11 A.6"
    },
    {
      "id": "wiser",
      "name": "WISER Technology",
      "role": "Delivery / implementation",
      "status": "MoU reported",
      "scope": "GCC first; Europe potential",
      "body": "The memorandum reports a non-exclusive reseller and implementation framework.",
      "limit": "Original agreement not recovered in this review; opportunity-specific commercials and acceptance required.",
      "regions": [
        "europe",
        "mena"
      ],
      "source": "S03 p.11 A.5"
    }
  ],
  "regions": [
    {
      "id": "uae",
      "title": "UAE reference base",
      "body": "Engineering, governance and first reference acceptance. Demonstrate the offer locally before claiming repeatable export delivery."
    },
    {
      "id": "mena",
      "title": "MENA channel route",
      "body": "Use named country rights and partner enablement. A regional footprint is not blanket customer access."
    },
    {
      "id": "africa",
      "title": "Africa expansion option",
      "body": "Redington territory supports a potential channel route. Modular projects need local demand, power, approvals and financing."
    },
    {
      "id": "north-america",
      "title": "North American ecosystem",
      "body": "Technical and distribution relationships can support qualification; public-sector channels and approvals remain opportunity-specific."
    },
    {
      "id": "europe",
      "title": "European delivery route",
      "body": "Reported implementation relationships and software licensing offer possible routes, subject to contracts and compliance."
    },
    {
      "id": "asia",
      "title": "Asia / wider markets",
      "body": "Prioritize partner-led opportunities with validated local data, deployment permissions and support capacity."
    },
    {
      "id": "global",
      "title": "All channel pathways",
      "body": "Potential geographic reach is not contracted sales. Compare the evidence and rights of each relationship, not the size of its logo."
    }
  ],
  "quarters": [
    {
      "id": "Q1",
      "months": "1–3",
      "title": "Establish the evidence base",
      "owner": "Strategy + product + security",
      "deliverables": [
        "Approve the strategy start and responsible owners.",
        "Confirm source versions, product boundaries and permitted reference use.",
        "Freeze a repeatable deployment acceptance checklist."
      ],
      "dependencies": [
        "Baseline approval",
        "Data rights and source register"
      ],
      "exitGates": [
        "Approved eight-quarter plan",
        "Every proposed claim has a source/status label"
      ],
      "status": "Proposed management plan",
      "tag": "Readiness before expansion",
      "source": "U01; S01 p.10; R01 workstreams; S04 indicative gates; S06 conditions"
    },
    {
      "id": "Q2",
      "months": "4–6",
      "title": "Make the offer repeatable",
      "owner": "Engineering + security + channel leads",
      "deliverables": [
        "Package validated hardware configurations and deployment modes.",
        "Complete threat modeling, access controls and audit evidence.",
        "Agree channel onboarding, support and opportunity ownership."
      ],
      "dependencies": [
        "Q1 scope and governance",
        "Configuration and contract evidence"
      ],
      "exitGates": [
        "Reproducible deployment package",
        "Owner-approved pilot test plan"
      ],
      "status": "Proposed management plan",
      "tag": "Productize the reference offer",
      "source": "U01; S01 p.10; R01 workstreams; S04 indicative gates; S06 conditions"
    },
    {
      "id": "Q3",
      "months": "7–9",
      "title": "Qualify the UAE pilot",
      "owner": "Delivery + infrastructure + finance",
      "deliverables": [
        "Confirm site, power, connectivity and operator model.",
        "Validate the costed scope, permits and lawful data flows.",
        "Negotiate contribution terms; do not assume vendor financing."
      ],
      "dependencies": [
        "Validated configurations",
        "Permits and accountable operator"
      ],
      "exitGates": [
        "Costed pilot with acceptance criteria",
        "Financing and procurement gates documented"
      ],
      "status": "Proposed management plan",
      "tag": "Proposed infrastructure step",
      "source": "U01; S01 p.10; R01 workstreams; S04 indicative gates; S06 conditions"
    },
    {
      "id": "Q4",
      "months": "10–12",
      "title": "Accept the first reference",
      "owner": "Delivery + customer owners",
      "deliverables": [
        "Commission only after approvals and funding.",
        "Measure reliability, task quality, latency and unit costs.",
        "Obtain reference consent and build an export playbook."
      ],
      "dependencies": [
        "Q3 approvals and executed instruments",
        "Customer/offtake and safety evidence"
      ],
      "exitGates": [
        "Signed pilot acceptance",
        "Reference case with measured outcomes"
      ],
      "status": "Proposed management plan",
      "tag": "UAE pilot precedes valuation ambition",
      "source": "U01; S01 p.10; R01 workstreams; S04 indicative gates; S06 conditions"
    },
    {
      "id": "Q5",
      "months": "13–15",
      "title": "Prepare the next capital stage",
      "owner": "Finance + board + commercial leads",
      "deliverables": [
        "Reconcile recurring revenue, forecasts and valuation basis.",
        "Prepare due diligence for the provisional USD500–600M target valuation.",
        "Keep corporate funding separate from client assets and project debt."
      ],
      "dependencies": [
        "Accepted reference and updated evidence",
        "Approved valuation methodology"
      ],
      "exitGates": [
        "Board-reviewed financing materials",
        "Currency clear; pre/post-money basis explicitly resolved or flagged"
      ],
      "status": "Proposed management plan",
      "tag": "Provisional valuation, not funds raised",
      "source": "U01; S01 p.10; R01 workstreams; S04 indicative gates; S06 conditions"
    },
    {
      "id": "Q6",
      "months": "16–18",
      "title": "Replicate through channels",
      "owner": "Channel + regional delivery",
      "deliverables": [
        "Prioritize qualified overseas opportunities by partner rights.",
        "Localize deployment, training and support.",
        "Validate export controls and in-country data requirements."
      ],
      "dependencies": [
        "Channel agreements and trained delivery teams",
        "Country approvals and customer acceptance plans"
      ],
      "exitGates": [
        "Qualified contracts or pilots, not logo counts",
        "Measured support and delivery capacity"
      ],
      "status": "Proposed management plan",
      "tag": "Export execution",
      "source": "U01; S01 p.10; R01 workstreams; S04 indicative gates; S06 conditions"
    },
    {
      "id": "Q7",
      "months": "19–21",
      "title": "Qualify African infrastructure",
      "owner": "Infrastructure + country counsel + finance",
      "deliverables": [
        "Validate demand/offtake, site and energy economics.",
        "Evaluate project equity and debt structures with prospective capital providers.",
        "Separate the project vehicle from software licensing."
      ],
      "dependencies": [
        "UAE pilot performance",
        "Country and financing diligence"
      ],
      "exitGates": [
        "Bankable project case with documented risks",
        "No commitment stated before definitive agreement"
      ],
      "status": "Proposed management plan",
      "tag": "Conditional expansion option",
      "source": "U01; S01 p.10; R01 workstreams; S04 indicative gates; S06 conditions"
    },
    {
      "id": "Q8",
      "months": "22–24",
      "title": "Scale only what is proven",
      "owner": "Board + operating leads",
      "deliverables": [
        "Review reference outcomes, retention, cash discipline and capacity.",
        "Approve repeatable deployment waves against evidence.",
        "Refresh the next planning horizon and stop unvalidated programs."
      ],
      "dependencies": [
        "Auditable delivery and financial reporting",
        "Funding and operating approvals"
      ],
      "exitGates": [
        "Board-approved scale decision",
        "Next-wave gates and downside protections"
      ],
      "status": "Proposed management plan",
      "tag": "Evidence-gated scale",
      "source": "U01; S01 p.10; R01 workstreams; S04 indicative gates; S06 conditions"
    }
  ],
  "infra": [
    {
      "id": "prepare",
      "title": "01 · Prepare the UAE reference",
      "body": "Confirm land/site, power, connectivity, operator roles and a costed hardware-plus-harness scope. No vendor contribution percentage is assumed.",
      "gates": [
        "Permits and data sovereignty",
        "Performance/acceptance specification",
        "Executed procurement and funding arrangements"
      ]
    },
    {
      "id": "pilot",
      "title": "02 · First proposed UAE modular deployment",
      "body": "Commission, test and accept the proposed reference offer. The earlier technical development-node announcement is not proof that this future modular deployment exists.",
      "gates": [
        "Customer acceptance and reliability",
        "Cost per useful workload",
        "Security and operational readiness"
      ]
    },
    {
      "id": "valuation",
      "title": "03 · Provisional USD 500–600M valuation ambition",
      "body": "A strategic target round valuation, not confirmed pricing, cash raised or a completed round. Pre-/post-money basis remains unresolved. Proposed sequencing follows the first UAE reference.",
      "gates": [
        "Updated management model and diligence",
        "Board and financing approvals",
        "Definitive documents if a transaction proceeds"
      ]
    },
    {
      "id": "africa",
      "title": "04 · Potential African expansion",
      "body": "Replicate compute + OnDemand + sector applications only when country economics and delivery capacity support it. Large-scale African AI infrastructure is an ambition, not an established ranking.",
      "gates": [
        "Demand/offtake; country/export approvals",
        "Site, energy and local operator capacity",
        "Project equity/debt diligence and committed funding"
      ]
    }
  ],
  "ma": [
    {
      "id": "diligence",
      "title": "Diligence & approvals",
      "body": "Potential holding-company combination with an anonymous wealth-platform group. The draft is unsigned; no acquisition or funding completion is established.",
      "gates": [
        "Legal, financial, technical and IP diligence",
        "Board/shareholder and relevant regulatory approvals",
        "Consistent definitive economics; optional floor mechanics withheld"
      ],
      "source": "S06 §§3/10/16"
    },
    {
      "id": "advice",
      "title": "Advice / administration",
      "body": "Services must remain inside the operating entity’s actual permission. The draft describes an applicant; current FSP status and effective date have not been independently verified.",
      "gates": [
        "Verify live FSP and lawful service scope",
        "Approved-bank onboarding and KYC/AML",
        "Client mandates and auditable asset records"
      ],
      "source": "S06 definitions, §9; Schedule1"
    },
    {
      "id": "management",
      "title": "Permission-gated management",
      "body": "Discretionary asset management is a later possibility only after the necessary FSRA authorization or variation and other approvals. Category4 alone is not evidence of permission.",
      "gates": [
        "Regulatory readiness and capital plan",
        "Accepted application/variation process",
        "Permission effective before regulated activity"
      ],
      "source": "S06 §11; Schedule1"
    },
    {
      "id": "integration",
      "title": "Integration & future capability",
      "body": "Integrate technology, controls and reporting subject to transaction completion. Client assets remain client assets; corporate cash and separately financed infrastructure remain different pools.",
      "gates": [
        "Executed investment instrument before funding",
        "IP/control transfer and operational acceptance",
        "No double counting of AUA, AUM or corporate capital"
      ],
      "source": "S06 §§4/7/10; Schedules1–2"
    }
  ],
  "insights": [
    {
      "id": "financial",
      "question": "What do the JV numbers establish?",
      "answer": "They reproduce the complete two-page S05 summary dated3 September2026, with arithmetic checked. They are unaudited five-year management projections, not a validated full workbook, committed funding or a two-year outcome."
    },
    {
      "id": "valuation",
      "question": "Is USD500–600M money raised?",
      "answer": "No. It is a provisional target round valuation/strategic ambition in management’s current brief. Pre-/post-money basis remains unresolved. It is separate from the memorandum’s approximatelyUSD200M forecast-model context."
    },
    {
      "id": "funding",
      "question": "Does Tenstorrent fund the facility?",
      "answer": "A technical collaboration is documented. No accepted facility co-funding commitment or percentage is established by the recovered evidence. The future UAE modular deployment remains conditional."
    },
    {
      "id": "assets",
      "question": "Are wealth-platform client assets deployable cash?",
      "answer": "No. Qualifying assets under advice/administration or management belong to clients. They are not AIREV balance-sheet cash or project-finance proceeds. The proposedUSD2M investment requires a separate executed instrument."
    },
    {
      "id": "arm",
      "question": "What does the ARM analogy mean?",
      "answer": "It is the ambition to license a reusable agentic software layer through hardware and distribution channels. It does not imply affiliation with Arm, universal hardware compatibility or installation on every device."
    },
    {
      "id": "timeline",
      "question": "When does the two-year strategy start?",
      "answer": "The eight quarters are proposed Month1–24 planning buckets. An approved company strategy effective date has not been established. Source-dated JV gates are shown separately and are not marked complete."
    }
  ]
};

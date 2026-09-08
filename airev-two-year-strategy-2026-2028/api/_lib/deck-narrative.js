/* Deck narrative addendum — appended to the OnDemand agent's system prompt at request time (api/_lib/ondemand.js → getAgent)
   so "Ask the deck" answers reflect the 8 Sep 2026 revision of the deck without redeploying the agent.
   Figures are the same ones content.js computes at run time (CAPITAL model); sources are named by title — no storage URLs. */
'use strict';

module.exports = `
=== DECK REVISION 8 SEP 2026 — READ BEFORE ANSWERING (overrides older deck narrative where they differ) ===
Deck: "AIREV Two-Year Strategy 2026–2028 — interactive deck" (35 cards on six lanes; deep link #N = position in the deck, the eyebrow number is the content-card label). Cite it as a source when you use these facts.

REMOVED CARDS: the "Export lanes · Five lanes, each with a named route and a dated proof point" card was deleted on 8 Sep 2026 (the Silk Road for AI map card, label 11 / #14, carries the five lanes, their named routes and their 2027 / 2028 proof points). The former "Control: where founder consent stops" card was folded into the three-stage card below.

VALUATION ARC (label 12 / #16) — exactly three steps: $200M (Series A2 pre-money, closing January 2027) → $500M round (≈ April 2027, with modular DC #1 live with Tenstorrent) → $1B round (≈ July 2027, the UAE's first AI unicorn). Quote only these three steps — never a band between the second and third step or any intermediate valuation figure; the older wording was removed. Multiples: $500M ≈ 17× FY2027E revenue ($29.0M) or ≈ 8× FY2028E revenue ($62.6M); $1B ≈ 16× FY2028E revenue. The $500M and $1B round SIZES are not contracted or documented: the deck models a PROJECTION of USD 25M at USD 500M pre and USD 50M at USD 1B pre (5% of pre-money) and labels them "projection ○".

ROUTES TO MARKET — fifteen signed routes (Qualcomm, Intel, Tenstorrent, World Wide Technology, Redington, WISER, Core42 · ADQ, Supermicro, Cisco, NetApp, Moro Hub, UXE, e&, IBM · Dell, VVIP Sovereign JV). The UAE white-label reseller that appeared in older builds is NOT a route in the deck (removed 8 Sep 2026) — do not present any partner outside this list as a route, reseller or signed instrument. Card 10 "Partner scale & reach" shows six routes by latest fiscal-year revenue: Cisco $63.3B, Qualcomm $44.3B, WWT ~$20B, e& $19.9B, Redington $13.5B, NetApp $6.92B. Reach copy: Redington = 30+ markets · South Asia · MEA · Turkey · Africa · 39,500+ channel partners; Qualcomm = 5 silicon families · factory pre-load · 111K → 562.5K devices 2026 → 2028E.

CAPITAL LANE (labels 12–15; deep links #16–#19). Sources by title: Cap table 26 Jul 2026 ("Final Cap table post Series-A1", AIREV Holding Limited, table dated 11/6/2025; reconciled 8 Sep 2026); Amended & Restated Shareholders' Agreement (A&R SHA, Nov 2025; executed 19 Dec 2025) — Schedule 2 prices, Cl. 1.1 Founder Consent; Series A2 term sheets — Terra draft ($5M at $200M pre) and Itqan V6 of 11 May 2026 ($5M at $137.85M pre, ≈ 3.50%); Chairman overview 30 Aug 2026 ($215M current mark). Register: 108,792 fully diluted shares incl. 5,000 unissued B Shares (option pool, no vote); $215M ÷ 108,792 = $1,976.25 per share.

Card 13 "Three stages: money in and dilution" (#17) — one animated bar chart, three stages: Series A2 $5M at $200M pre → $205M post, $1,838.37/share, 2,719 new shares, new investor 2.44%, existing holders keep 97.56% (signed term sheet ●; Itqan V6 alternative $137.85M pre ≈ 3.50%) · $500M round projection ○ $25M at $500M pre → ≈ $525M post, $4,483.86/share, 5,575 shares, 4.76% sold, existing holders keep 95.24% (a pre-A2 stake keeps 92.9%) · $1B round projection ○ $50M at $1B pre → ≈ $1.05B post, $8,540.73/share, 5,854 shares, 4.76% sold (a pre-A2 stake keeps 88.5%). One-line marker: Founder Consent (A&R SHA Cl. 1.1) holds while OT · YY · KU together keep ≥ 50% of the votes — 62.2% after the A2, 59.1% after $500M, 56.1% after $1B; the line is not crossed on the arc.

Cards 14 "Money in: who paid what, and what it bought" (#18) and 15 "Who came in at what — and what each position has made" (#19) — the same register, one row per holder, in this order, columns entry date · entry valuation · amount in · % at entry · % now · value at the $215M mark (card 15 adds the unrealised multiple next to the value):
 Olu Melville Thomas (Muhammed Khalid) — founder, 59,219 Ordinary — 54.43% now — $117.03M.
 Youssef Youssef — founder, 3,500 Ordinary — 3.22% — $6.92M.
 Kayaan Unwalla — founder, 3,500 Ordinary — 3.22% — $6.92M.
 G42 / Core42 — Feb 2024, $10.0M post, $2.5M for 25,000 Seed Preferred (25.00% at entry) — 22.98% now — $49.41M — 19.8× on the register (the Chairman chart's ≈ 21.5× uses the undiluted 25%).
 Titian — Dec 2025, $87.0M post, $4.0M for 5,000 Series A-1 Preferred at $800 (4.60%) — 4.60% — $9.88M — 2.5×.
 VentureWave — 2025 first close, $60.0M post, $2.0M for 3,448 Series A-1 Preferred at $580 (3.33%) — 3.17% — $6.81M — 3.4× on the register (≈ 2.7× on its $80M internal mark).
 Nabyl — secondary purchase, $1.6M at ≈ $80M (Chairman overview), no register line — ≈ $4.3M / ~2.7× on the Chairman-overview basis only.
 Eyad Omari — ≤ Jan 2024, $8.0M post (implied), $250,000 for 2,331 Legacy Preferred at $107.25 (3.11% of the pre-seed base) — 2.14% — $4.61M — 18.4×.
 Bob Grim — Dec 2025, $87.0M post, $75,000 for 94 Angel Preferred at $800 — 0.09% — $185,767 — 2.5×.
 David Bennett — Dec 2025, $87.0M post, $200,000 for 250 Angel Preferred at $800 — 0.23% — $494,062 — 2.5×.
 Inveniam Middle East — 1,450 Ordinary, no stated consideration — 1.33% — $2.87M.
 B-share / ESOP pool — 5,000 unissued B Shares — 4.60% — $9.88M.
 Series A2 investor — pending ○, Jan 2027, $205M post, $5.0M for 2.44%.
 Register total 108,792 FD shares = 100.00%; primary capital on the register $9.02M. There is no aggregated founder row or bar anywhere — the three founder rows are individual. No separate Angel / Legacy Preferred lines exist beyond Omari (Legacy), Grim and Bennett (Angel).

Card numbering after the revision: modular DC #1 is card 16 (#20), financing 17 (#21), M&A 18 (#22), AUA→AUM 19 (#23), capital plan 20 (#24), JV structure 21 (#26), JV economics 22 (#27), hardware 23 (#28), Africa 24 (#29), Bangalore 25 (#31), risks 26 (#32), governance 27 (#33), decisions 28 (#34), sources 29 (#35).
=== END OF REVISION ===
`;

# AIREV — Two-Year Strategy 2026–2028 · The ARM of the Agentic Era (v2)

Interactive, spatial strategy deck (34 cards on a six-lane map, story flow Mandate → Proof → Partners → Capital → Scale) prepared for the Chairman and Board — Private & Confidential, 5 September 2026.

## Run

```bash
npm run dev        # serves on http://0.0.0.0:4173
# or open index.html directly — static HTML/CSS/JS, no build step, no dependencies
```

## Navigate

| Key | Action |
|---|---|
| → / Space | next card |
| ← | previous card |
| ↓ / ↑ | next / previous lane — the camera pulls back and flies between lanes |
| O / Esc | zoom out to the whole strategy map; click a card to fly to it |
| N | speaker notes |
| P | print / save as PDF |
| Ask the deck | right-hand assistant: cited answers from the data room, per-document downloads |
| `#12` in the URL | deep-link to card 12 |

## Structure

- `index.html` — the 34 cards (the coded “Silk Road for AI” map card carries the five export lanes; the Capital lane holds three investor-economics cards, 8 Sep 2026: “Three stages: money in and dilution” (label 13 / #17 — one animated inline-SVG bar chart: money in and ownership after each of the $200M / $500M / $1B stages, hover or focus a stage for the values, one caption per stage, one-line Cl. 1.1 Founder Consent marker), “Money in: who paid what, and what it bought” (label 14 / #18) and “Who came in at what — and what each position has made” (label 15 / #19) — the same register as two simple tables, one row per holder in a fixed order (the three founder rows individually, then G42 / Core42, Titian, VentureWave, Nabyl, Eyad Omari, Bob Grim, David Bennett, Inveniam, the B-share / ESOP pool, the pending Series A2 investor), columns entry date · entry valuation · amount in · % at entry · % now · value at the $215M mark) (hero numbers, icon rows, progressive-disclosure reveals, source tags)
- `content.js` — eight-quarter roadmap, fifteen routes to market (each tagged with its instrument: agreement / MoU / LOI / certification / MoU to sign), JV scenario toggle, modular-DC cost-share toggle, valuation slider, charts, and the `CAPITAL` model (Cap table 26 Jul 2026 — “Final Cap table post Series-A1”, table dated 11/6/2025 — joined to A&R SHA Schedule 2 prices, the Series A2 at $200M pre per the Terra draft with the Itqan V6 $137.85M alternative, and the $500M / $1B rounds) that renders the dilution lines on card 12, the three-stage bar card and the two holder tables at run time — `CAPITAL.assumedRaise` (USD 25M at $500M pre, USD 50M at $1B pre; 5% of pre-money) is the one labelled projection; `window.capitalModel` exposes the computed ladder for QA
- `deck.js` — spatial camera engine (with animated lane transitions) + dependency-free SVG chart kit
- `media.js` — hero-media controller (17 Sep 2026): plays the looping hero video of the active card only, pauses the rest, honours `prefers-reduced-motion` (poster + a per-card “Play motion” control; `?motion=reduce` forces it), shows posters in the Strategy Map and in print, and flies to `#n` on a hash change
- `chat.js` / `chat.css` — collapsible assistant UI; calls `/api/chat` (OnDemand) and renders cited answers with per-document downloads
- `library.json` — document library: label, type, pages, OnDemand media id (downloads resolve through `/api/media`)
- `library/*.txt` — the 48 scrubbed data-room extracts; their full text is embedded in the OnDemand agent's system prompt (they are also the downloadable copies behind the citation chips)
- `mode.js` — the Full / Presentation display mode (bottom-bar switch, `M` key, `localStorage`): Presentation redacts B Capital, Kairoswealth and the cap-table investor names (Titian, Venturewave, Nabyl, Omari, Grim, Bennett, Inveniam, Itqan → Confidential Partner A–J) deck-wide; the VVIP Sovereign JV alias stays visible in both modes — text, attributes, logos, tooltips and the Ask-the-deck exchange — as Confidential Partner A / B / C
- `silkroad-map.js` + `silkroad.js` — the coded “Silk Road for AI” card: Natural Earth 1:110m land (public domain) projected offline into an inline SVG, animated export arcs from the UAE hub to the five lanes, hover/click tooltips (redaction-aware)
- `styles.css` — design tokens (emerald / gold / Inter / Playfair; chapter cards in the OnDemand brand gradient)
- `assets/` — hero art (`assets/generated/` — the 17 Sep 2026 GPT-Image cover and lane dividers, each as AVIF + WebP + JPG), the card-03 hero (`hero-arm.*`, remastered), press photos, the licence-revenue chart, partner logos (all fifteen routes plus ADEX/ADFD, Masdar, Space42, Kairoswealth — served same-origin, never hot-linked; the anonymised VVIP Sovereign JV carries a coded emblem), OnDemand brand glyphs, and `assets/video/` — the seven Runway loops (MP4 + WebM + poster). See **Assets & attribution** below
- `api/` — the `/api/chat` and `/api/media` handlers; `api/_lib/deck-narrative.js` is the deck-side narrative addendum (8 Sep 2026 Capital lane, valuation-arc wording, route changes) spliced into the agent’s system prompt at request time so “Ask the deck” tracks the deck without an agent redeploy (the repo-root `api/*.js` files are one-line shims that re-export them for Vercel), so the deck folder is self-contained
- card 08 “Talent · the India flywheel” — a fully coded diagram (inline SVG + CSS + JS in `index.html` / `styles.css`: a continuously rotating flywheel, IIT → AIREV India office · 6–12 months → top performers → UAE → UAE mandate) plus an “Already on the ground in India” proof strip and an institution row
- `assets/talent/` — the three event photographs behind the proof strip, committed as static assets: `lpu-genai-hackathon-2024-award.jpg` (Generative AI Hackathon stage award, Lovely Professional University, 13–14 Sept 2024) and `campus-activation-felicitation.jpg` (campus activation at LPU / DTU) — GPT-Image remasters of the originals, composition unchanged, 880 px JPEG + AVIF/WebP at 440/880 px; `campus-activation-auditorium.jpg` — the untouched 1600 px original (its remaster was rejected on fidelity, see below) with AVIF/WebP derivatives
- `assets/institutions/` — the official institution logos on card 08, fetched from the institutions’ English-Wikipedia infobox files and committed locally: `iit-kharagpur.png`, `nit-tiruchirappalli.png`, `lpu.png`, `dtu.png` (shown to identify the campuses; trademarks remain with their owners)
- `assets/video/` — the cover, five lane dividers and the card-03 hero carry looping motion (`<video muted loop playsinline preload="metadata" poster>` with `<source webm>` then `<source mp4>`, behind a static `<picture>` poster). Generated 2026-09-17 by Runway image-to-video from the GPT-Image heroes and committed as static assets: no audio track, tail cross-faded into the head for a seamless loop, H.264 MP4 (CRF 23, faststart) + VP9 WebM (CRF 32), 1280×720, 24 fps; each `*-poster.jpg` is the loop’s first frame. The 6 Sep 2026 xAI cover clip (`cover-motion.mp4`) is superseded and removed (no hot-linked URLs anywhere in the deck)
- `server.js` — zero-dependency dev/preview server: serves the deck, mounts `./api`, loads `./.env`, and proxies `/api/*` to the deployed Vercel API (`API_PROXY_BASE`) when no `ONDEMAND_API_KEY` is configured locally — a restored preview never answers “no such function”

## Backend (OnDemand agent)

The assistant is served by two Vercel serverless functions (`api/chat.js`, `api/media.js` at the repository root — shims over `airev-two-year-strategy-2026-2028/api/`). Every call follows OnDemand's live public API documentation (Projects API, Chat API, Fulfillment Prompts, Media API — read on 2026-09-05):

- **The agent** is an OnDemand chat project (`ONDEMAND_AGENT_ID`, default `6a9c566598ed33a866ffbf13`) whose system prompt embeds the confidentiality rules, the registry of the 15 data-room source files (their storage URLs), the deck narrative and all 49 scrubbed extracts. Nothing is uploaded through the Media API for retrieval and no knowledge plugin is attached — the data room travels inside the system prompt.
- `api/chat.js` — reads the agent (`GET /chat/v1/projects/{agentId}`, cached per instance), opens one session per visitor filed in the agent (`POST /chat/v1/sessions` with `projectId`; a stored session is re-used only if `GET /chat/v1/sessions/{id}` confirms it belongs to the agent), then submits every typed question with `POST /chat/v1/sessions/{id}/query` (`responseMode: sync`, `fulfillmentOnly: true`, `modelConfigs.fulfillmentPrompt` = the agent's system prompt, which carries the required `Context: {context}` / `Question: {question}` variables) and returns `{answer, citations[], metrics, sessionId}`. The answer's final `SOURCES:` line is mapped to `library.json` for the citation chips.
- `api/media.js` — resolves a document id to a fresh OnDemand-hosted download URL (`GET /media/v1/public/file?externalUserId=…`); this is the download path only, not the chat path.

Configuration is environment-only: `ONDEMAND_API_KEY` (required — set on the Vercel project, never committed), optional `ONDEMAND_AGENT_ID`, `ONDEMAND_ENDPOINT_ID` (overrides the endpoint saved on the agent), `ONDEMAND_LIBRARY_USER`, `ONDEMAND_TIMEOUT_MS`. Locally: copy `.env.example` to `.env` (git-ignored) and run `npm run dev` — the same handlers are mounted at `/api/*`; without a key the server proxies `/api/*` to the deployed preview.

## Confidentiality

The sovereign joint-venture counterparty is referred to only as the **VVIP Sovereign JV** throughout the deck, the chatbot labels and the extracted passages. Downloads are the scrubbed extracts hosted by OnDemand (fresh signed URLs are fetched on every request), so no data-room URL is committed. Both the API and the UI apply an encoded deny-list before anything is displayed.

## Assets & attribution

All generated imagery was produced for AIREV on **17 September 2026** and carries no third-party IP (no photographs, marks or text were used as inputs to the new images); the partner and institution logos are untouched and remain the property of their owners. Nothing is hot-linked.

### Generated (GPT-Image 2 · 17 Sep 2026)

| Asset | Card / slot | Prompt summary | Licence |
|---|---|---|---|
| `assets/generated/cover-hero-arm-agentic-era.{avif,webp,jpg}` (1536×1024) | card 00 · cover hero | Luminous silicon die on a cream ground, hairline gold traces resolving into sage line-art silhouettes of a laptop, AR glasses, a server rack and a modular data-centre container; forest-green depth, editorial fintech aesthetic, no text | generated for AIREV, no third-party IP |
| `assets/generated/divider-01-position-mandate.*` | lane 01 · Position — card 01 “Mandate · the national equation” (under a white veil) | Abstract aerial view of a sovereign trade hub at dawn: geometric port cranes and container terminals in forest green and sage on cream, gold shipping-lane arcs, empty top-left for typography | generated for AIREV, no third-party IP |
| `assets/generated/divider-02-thesis-licence-engine.*` | lane 02 · Thesis chapter card | Macro processor die seen edge-on beneath a translucent emerald architectural lattice, gold light threads linking lattice nodes to the silicon; cream backdrop | generated for AIREV, no third-party IP |
| `assets/generated/divider-03-export-engine.*` | lane 03 · Export engine chapter card (static) | Minimalist sage wireframe globe on cream with five gold great-circle arcs from a glowing forest-green node in the Arabian Gulf; dotted-grid ground | generated for AIREV, no third-party IP |
| `assets/generated/divider-04-capital-arc.*` | lane 04 · Capital chapter card | Three ascending frosted-glass monoliths lit from within in forest green, joined by a single rising gold ribbon of light; long soft shadows | generated for AIREV, no third-party IP |
| `assets/generated/divider-05-sovereign-programmes.*` | lane 05 · Sovereign programmes chapter card | A single modular data-centre container in matte forest green on pale desert sand under an evening sky, a row of solar panels reflecting sage light, faint line-art skyline | generated for AIREV, no third-party IP |
| `assets/generated/divider-06-execution-gates.*` | lane 06 · Execution chapter card | Precision brass-gold gate mechanism — interlocking gears and a latch, partly open — set into a forest-green panel on cream, a soft sage light beam through the opening | generated for AIREV, no third-party IP |
| `assets/generated/og-share-image-1200x630.jpg` | `og:image` / `twitter:image` | Centred abstract emblem of a silicon die emitting six gold traces that end in sage nodes on a gentle arc, forest-green vignette, dotted-grid texture; cropped from the 1536×1024 generation | generated for AIREV, no third-party IP |

Every prompt fixed the deck palette (ink #10201B, forest green #1E5A45, sage #A9C4B4, cream #F4F1EA, gold #B8935A) and forbade text, numerals, logos and watermarks. A second GPT-Image batch (the transparent accent overlays and inline illustrations of the 17-prompt plan) failed upstream (HTTP 524) and is deferred — those slots keep their current assets.

### Motion (Runway image-to-video · 17 Sep 2026)

| Loop | Source image | Runway task | Length |
|---|---|---|---|
| `assets/video/cover-hero-loop.{mp4,webm}` + `cover-hero-poster.jpg` | cover hero | `3b4cc67c-e1d3-4df6-932a-8e3fede4b839` | 9.3 s (10 s clip, 0.75 s cross-fade) |
| `assets/video/divider-01-position-loop.*` + poster | divider 01 | `1ca8e831-5f76-4d6c-b844-af6d366ab50f` | 4.5 s (5 s clip, 0.5 s cross-fade) |
| `assets/video/divider-02-thesis-loop.*` + poster | divider 02 | `9c2ea985-4bec-4d3b-83ef-723ee38b1868` | 4.5 s |
| — (divider 03 stays a static picture) | divider 03 | image-to-video failed upstream: `INTERNAL.BAD_OUTPUT.CODE01` | — |
| `assets/video/divider-04-capital-loop.*` + poster | divider 04 | `20ed94e0-e950-4bdf-8c49-2aa4641d9e0a` | 4.5 s |
| `assets/video/divider-05-sovereign-loop.*` + poster | divider 05 | `f18c28a8-7d8a-4c61-a714-341d0d49a3d7` | 4.5 s |
| `assets/video/divider-06-execution-loop.*` + poster | divider 06 | `ee3a35c7-6ffb-49a0-8309-c08dd3d104d2` | 4.5 s |
| `assets/video/hero-arm-loop.*` + poster | card 03 hero (remastered `hero-arm`) | `81aec75d-1095-457c-8647-50d06ef383e7` | 9.3 s |

Prompts asked for gentle camera drift / parallax only, the source composition and palette preserved, no new elements. Two text-to-video clips (an ambient cover loop and a modular-data-centre loop) failed upstream with HTTP 524 and are deferred. Each clip was assigned to its slot from the Runway request’s source image and cross-checked by perceptual hash of the first frame (all seven unambiguous).

### Enhanced originals (GPT-Image edit · composition unchanged)

- `assets/hero-arm.*` — the card-03 illustration (AIREV, 2026), upscaled/cleaned at 1536×1024; 864 px 1× and 1536 px 2× variants.
- `assets/talent/lpu-genai-hackathon-2024-award.*` and `assets/talent/campus-activation-felicitation.*` — AIREV campus-programme photographs (LPU Generative AI Hackathon 13–14 Sep 2024; campus activation at LPU / DTU), denoised and colour-graded; every person, face, banner and the framing verified unchanged against the originals before the swap.
- Rejected on fidelity (originals kept byte-for-byte, only AVIF/WebP derivatives added): `assets/press-intel-oct-2025.jpg` and `assets/press-qualcomm-aug-2026.jpg` (Gulf News photographs, Oct 2025 / Aug 2026 — the remasters re-rendered faces and, for the Qualcomm photograph, changed the composition) and `assets/talent/campus-activation-auditorium.jpg` (the upscaler synthesised facial detail on crowd faces that are not resolvable in the original).

### Format pipeline

- Rasters: AVIF (quality 60) → WebP (quality 82) → progressive JPEG fallback, delivered through `<picture>` with explicit `width`/`height` (no layout shift), `loading="lazy" decoding="async"` everywhere except the cover hero (`loading="eager" fetchpriority="high"`). Inline images carry 1× / 2× `srcset` variants sized to their rendered box (card 03 hero 864 / 1536 px; press 428 / 856 px; talent 440 / 880 px); the full-bleed heroes are served at their native 1536 px (the rendered card is 1400 CSS px wide).
- Video: H.264 MP4 (yuv420p, CRF 23, `+faststart`, no audio) and VP9 WebM (CRF 32), 1280×720; the last 0.5–0.75 s is cross-faded into the head so the loop has no visible seam; the poster is the first frame of the finished loop.
- Playback (`media.js`): only the active card’s loop plays (the deck’s `stepchange` hook), the others are paused; `prefers-reduced-motion: reduce` (or `?motion=reduce`) never autoplays and shows the poster with a small “Play motion” control; the Strategy Map shows posters; on print the `<video>` is hidden and the poster `<picture>` prints at full card size, so the 34-page landscape PDF is unchanged in length; Presentation-mode redaction is unaffected (no media element carries counterparty text).
- Orphan sweep (17 Sep 2026): 39 unreferenced files (unused brand glyphs and UI icons, superseded `-900` variants, unused charts/diagrams, `logos/b-capital.svg`, `logos/hp.png`) plus the superseded `cover-motion.mp4` / `cover-motion-poster.jpg` / `hero-sovereign-apps.jpg` were removed after a repository-wide reference check; ADEX / ADFD, Masdar and Space42 remain (referenced by the Silk Road card).

Partner and institution logos: served same-origin, never hot-linked, shown to identify the counterparties and campuses; trademarks remain with their respective owners. The logo normalisation on card 28 (ink filter, cap-height alignment, official Supermicro wordmark) is unchanged.


# AIREV — Two-Year Strategy 2026–2028 · The ARM of the Agentic Era (v2)

Interactive, spatial strategy deck (31 cards on a six-lane map, story flow Mandate → Proof → Partners → Capital → Scale) prepared for the Chairman and Board — Private & Confidential, 5 September 2026.

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

- `index.html` — the 31 cards (hero numbers, icon rows, progressive-disclosure reveals, source tags)
- `content.js` — eight-quarter roadmap, sixteen signed routes to market, JV scenario toggle, modular-DC cost-share toggle, valuation slider, charts
- `deck.js` — spatial camera engine (with animated lane transitions) + dependency-free SVG chart kit
- `chat.js` / `chat.css` — collapsible assistant UI; calls `/api/chat` (OnDemand) and renders cited answers with per-document downloads
- `library.json` — document library: label, type, pages, OnDemand media id (downloads resolve through `/api/media`)
- `library/*.txt` — the 49 scrubbed data-room extracts that were ingested into OnDemand via the Media API (also used as evidence passages by `/api/chat`)
- `styles.css` — design tokens (emerald / gold / Inter / Playfair; chapter cards in the OnDemand brand gradient)
- `assets/` — hero art, press photos, charts, partner logos and OnDemand brand glyphs
- `server.js` — zero-dependency static server

## Backend (OnDemand)

The assistant is served by two Vercel serverless functions at the repository root:

- `api/chat.js` — creates one OnDemand chat session per visitor (`POST /chat/v1/sessions`), submits the question with the knowledge plugin (`POST /chat/v1/sessions/{id}/query`, sync) plus budgeted evidence passages from `library/`, and returns `{answer, citations[], metrics, sessionId}`.
- `api/media.js` — resolves a document id to a fresh OnDemand-hosted download URL (`GET /media/v1/public/file?externalUserId=…`).

Configuration is environment-only: `ONDEMAND_API_KEY` (required — set on the Vercel project, never committed), optional `ONDEMAND_KNOWLEDGE_PLUGIN_ID`, `ONDEMAND_ENDPOINT_ID`, `ONDEMAND_LIBRARY_USER`. Locally: `ONDEMAND_API_KEY=… npm run dev` mounts the same handlers at `/api/*`.

## Confidentiality

The sovereign joint-venture counterparty is referred to only as the **VVIP Sovereign JV** throughout the deck, the chatbot labels and the extracted passages. Downloads are the scrubbed extracts hosted by OnDemand (fresh signed URLs are fetched on every request), so no data-room URL is committed. Both the API and the UI apply an encoded deny-list before anything is displayed.

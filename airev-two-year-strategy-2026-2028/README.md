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
- `library/*.txt` — the 49 scrubbed data-room extracts; their full text is embedded in the OnDemand agent's system prompt (they are also the downloadable copies behind the citation chips)
- `styles.css` — design tokens (emerald / gold / Inter / Playfair; chapter cards in the OnDemand brand gradient)
- `assets/` — hero art, press photos, charts, partner logos and OnDemand brand glyphs
- `server.js` — zero-dependency static server

## Backend (OnDemand agent)

The assistant is served by two Vercel serverless functions at the repository root. Every call follows OnDemand's live public API documentation (Projects API, Chat API, Fulfillment Prompts, Media API — read on 2026-09-05):

- **The agent** is an OnDemand chat project (`ONDEMAND_AGENT_ID`, default `6a9c566598ed33a866ffbf13`) whose system prompt embeds the confidentiality rules, the registry of the 15 data-room source files (their storage URLs), the deck narrative and all 49 scrubbed extracts. Nothing is uploaded through the Media API for retrieval and no knowledge plugin is attached — the data room travels inside the system prompt.
- `api/chat.js` — reads the agent (`GET /chat/v1/projects/{agentId}`, cached per instance), opens one session per visitor filed in the agent (`POST /chat/v1/sessions` with `projectId`; a stored session is re-used only if `GET /chat/v1/sessions/{id}` confirms it belongs to the agent), then submits every typed question with `POST /chat/v1/sessions/{id}/query` (`responseMode: sync`, `fulfillmentOnly: true`, `modelConfigs.fulfillmentPrompt` = the agent's system prompt, which carries the required `Context: {context}` / `Question: {question}` variables) and returns `{answer, citations[], metrics, sessionId}`. The answer's final `SOURCES:` line is mapped to `library.json` for the citation chips.
- `api/media.js` — resolves a document id to a fresh OnDemand-hosted download URL (`GET /media/v1/public/file?externalUserId=…`); this is the download path only, not the chat path.

Configuration is environment-only: `ONDEMAND_API_KEY` (required — set on the Vercel project, never committed), optional `ONDEMAND_AGENT_ID`, `ONDEMAND_ENDPOINT_ID` (overrides the endpoint saved on the agent), `ONDEMAND_LIBRARY_USER`, `ONDEMAND_TIMEOUT_MS`. Locally: `ONDEMAND_API_KEY=… npm run dev` mounts the same handlers at `/api/*`.

## Confidentiality

The sovereign joint-venture counterparty is referred to only as the **VVIP Sovereign JV** throughout the deck, the chatbot labels and the extracted passages. Downloads are the scrubbed extracts hosted by OnDemand (fresh signed URLs are fetched on every request), so no data-room URL is committed. Both the API and the UI apply an encoded deny-list before anything is displayed.

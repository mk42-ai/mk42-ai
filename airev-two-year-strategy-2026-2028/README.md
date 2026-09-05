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
- `chat.js` / `chat.css` — collapsible RAG assistant (client-side BM25 over `library.json`, citation chips, downloads)
- `library.json` — document library: file, signed URL, expiry, extracted & scrubbed passages
- `styles.css` — design tokens (emerald / gold / Inter / Playfair; chapter cards in the OnDemand brand gradient)
- `assets/` — hero art, press photos, charts, partner logos and OnDemand brand glyphs
- `server.js` — zero-dependency static server

## Confidentiality

The sovereign joint-venture counterparty is referred to only as the **VVIP Sovereign JV** throughout the deck, the chatbot labels and the extracted passages. Signed download URLs in `library.json` expire between 7 and 12 September 2026 — refresh them from the data room when re-publishing.

# AIREV — Two-Year Strategy 2026–2028 · The ARM of the Agentic Era

Interactive, spatial strategy deck (29 cards on a six-lane map) prepared for the Chairman and Board — Private & Confidential, 5 September 2026.

## Run

```bash
npm run dev        # serves on http://0.0.0.0:4173
# or open index.html directly — the deck is static (HTML/CSS/JS, no dependencies)
```

## Navigate

| Key | Action |
|---|---|
| → / Space | next card |
| ← | previous card |
| ↓ / ↑ | next / previous lane (chapter) |
| O / Esc | zoom out to the whole strategy map; click a card to fly to it |
| N | speaker notes |
| P | print / save as PDF (cards stack vertically) |
| `#12` in the URL | deep-link to card 12 |

## Structure

- `index.html` — all 29 cards (content, source tags, speaker notes)
- `content.js` — roadmap data (8 quarters), partner grid (16 routes), Athar scenario toggle, modular-DC cost-share toggle, valuation slider, charts
- `deck.js` — spatial camera engine + a tiny dependency-free SVG chart kit
- `styles.css` — design tokens (emerald / gold / Inter / Playfair), card, chart and chrome styles
- `server.js` — zero-dependency static server

## Sources

Investment Memorandum (Series A2, Aug 2026); Athar JV model v13 and executive summaries; Kairoswealth LOI (23 Aug 2026); Itqan term sheet V6 and redacted draft; Tenstorrent Galaxy fleet map (23 Aug 2026); UAE Export Story / Journey decks; Angola proposal; Qualcomm × e& deck; Chairman overview (30 Aug 2026); public sources as of 5 Sep 2026. See the final card, *Sources & caveats*.

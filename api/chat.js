/* Vercel serverless entry point. The implementation lives inside the deck folder so the deck is self-contained
   (the same handler serves the local/sandbox dev server); this shim keeps the /api/chat route at the repo root. */
module.exports = require('../airev-two-year-strategy-2026-2028/api/chat.js');

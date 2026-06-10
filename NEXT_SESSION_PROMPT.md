# Prompt for next session (run from the RS Deck folder)

Rebuild the slide deck in this folder. Start by reading `OUTLINE_2026-06-09.md` — that's the approved plan. The two attached PDFs are background/inspiration for the themes (not the visual style).

**This folder** is a deck-as-app: `build-deck.js` (pptxgenjs) builds a BII-style institutional deck, slides export to images in `slides/`, and `index.html` is the viewer with a downloadable .pptx.

**The job:** Build ~15 slides titled **"AI in the Market."** BII style, neutral institutional tone, for institutional investors. Explain what's happening in AI but always tie it back to **equity markets and investors' portfolios**. Keep compute/power constraints to one context slide. Include a slide on the **recent bond issuance financing AI capex**. Refresh all data to current (June 2026) figures — verify against web/ETF sources, cite them, don't invent.

**Already decided:** keep BII style (not the PDF blueprint look); tighten ~25→~15 slides; rebuild cleanly so the .pptx is valid; update the viewer (fix counter + title, add jump-to nav and a presenter/notes mode).

**Fix these known bugs** (see `REVIEW_2026-04-27.md`): the current .pptx is corrupt and `build-deck.js` is truncated — regenerate from one clean script; no empty `IMAGE:` placeholders; one "data as of June 2026" date stamp; reconcile the slide count.

**Leeway:** the outline is the intent, not a straitjacket — use your judgment on design, charts, and wording. If you find a stronger structure or a newer market development, use it and note the change. When done, show me the .pptx, the build script, and the viewer.

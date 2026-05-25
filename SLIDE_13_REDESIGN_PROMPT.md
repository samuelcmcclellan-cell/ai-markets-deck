# Slide 13 Redesign — Claude Code Prompt

Paste the text below into a fresh Claude Code session opened in the `RS deck` project root.

---

## Prompt

You're working in a pptxgenjs deck that renders to `ai-markets-deck.pptx`. Everything is built from a single file: `build-deck.js`. Run `node build-deck.js` to rebuild; the output is `ai-markets-deck.pptx` in the project root. Slide JPG exports live in `slides/` (Slide13.JPG for reference) but are regenerated separately — don't worry about them.

### Task

Redesign slide 13 (headline: "The divergence.", theme tag: SHIFTS) end-to-end. Keep the left-side line chart exactly as it is. Rework the entire right column plus the bottom strip so the slide is qualitative and language-forward instead of stat-forward. Lean into icons. Preserve the "Why Semis Are Up" and "Why Software Is Down" framing — that structure is what's working.

### What to remove

In slide 13 (lines ~1264–1371 of `build-deck.js`), delete:

1. The "YTD SPREAD — SOX vs IGV / +58 pts" hero card (the entire `heroX / heroY / heroH` block including its off-white rectangle, the eyebrow label, the big +58 pts text, and the "Semis +38% vs software −20%" subtext).
2. The giant "+47%" and "−21%" numerals inside the two driver tiles. The tile chrome (accent bar + card) stays, but the hero percentage is out.
3. Any footnote / citation entries that are only there to support the removed numbers (renumber the remaining markers so they stay sequential, 1, 2, 3… with no gaps).

### What to keep

- Headline: `The divergence.`
- Subhead: `Semis are up, software is down — a wide spread inside one theme. The sell-off is starting to bleed into private credit and PE-held SaaS.`
- Theme tag SHIFTS (orange).
- The three-series line chart on the left (Semis / Nasdaq / Software, Jan 1 → Apr 17 2026, values 100/110/118/128/138, 100/98/96/99/104, 100/88/78/76/80), its title "YTD price return, rebased to 100", its anchor (`x: 0.5, y: 1.95, w: 4.3, h: 3.75`), and the existing `lineOpts({...})` styling.
- The final italic strip about BDC credit indices bleeding into private credit / PE-held SaaS (keep the idea; you can tweak the exact wording if it flows better with the new right column).
- The "WHY SEMIS ARE UP" (orange accent) and "WHY SOFTWARE IS DOWN" (red accent) framing as the two right-column anchors.

### Design direction for the right column

The right column (`x: 5.2, w: 4.3`, available vertical space roughly `y: 1.95` to `y: 5.70`) should become two stacked qualitative panels — NOT side-by-side tiles, NOT a hero stat, NOT a percentage.

- **Top panel — WHY SEMIS ARE UP** (orange accent bar on top, same pattern as the existing `drawTile` chrome). Roughly `y: 1.95`, height ~1.80".
- **Bottom panel — WHY SOFTWARE IS DOWN** (red accent bar). Roughly `y: 3.85`, height ~1.80".

Each panel has the same internal structure:

1. Small uppercase eyebrow label at top ("WHY SEMIS ARE UP" / "WHY SOFTWARE IS DOWN"), `fontSize: 10`, charSpacing 3, medGray bold. Match the existing eyebrow treatment used in the deck.
2. A one-line thesis sentence in `darkGray`, ~`fontSize: 12`, bold. This is the qualitative headline — e.g. for semis something like "Capacity is sold out and demand keeps coming." For software something like "Seat pricing is under attack as agents replace users." You have editorial latitude — make them land.
3. Three short driver rows underneath the thesis sentence. Each row = a small icon glyph on the left (set inside a filled circle or square, ~0.30" wide, filled with the panel's accent color — orange for semis, red for software — with a contrasting white glyph) + a single sentence of prose to the right, `fontSize: 9.5`, darkGray, ~1–2 lines. Leading of roughly 0.36" per row.

### Icon choices

Use Unicode glyphs that render reliably in Arial Black (the deck already uses `$`, `%`, `⇅`, `◨` on slide 14 — follow that pattern). Pick glyphs that actually match the driver. Suggested pairings (feel free to substitute if you find something crisper):

Semis drivers:
- `⚙` manufacturing / fab capacity — "HBM sold out through 2026; hyperscalers are locking in every GB of memory they can secure."
- `⚡` power / demand — "Data-center power demand keeps pulling forward; each new model generation wants more silicon."
- `↑` or `▲` pricing — "ASPs and margins are expanding across memory and advanced-node logic."

Software drivers:
- `◉` or `◆` seat displacement — "Agentic AI threatens per-seat pricing; 2026 CIO surveys flag displacement risk."
- `✕` multiple compression — "Public SaaS EV/Revenue reset from Q4'25 to Q1'26 as buyers re-underwrite."
- `↓` or `▼` private spillover — "BDC credit indices are softening; the sell-off is starting to bleed into PE-held SaaS."

These are starting points — sharpen the copy. Aim for sentences that a portfolio manager would nod at, not filler. If one of your drivers overlaps with the italic BDC strip at the bottom, rewrite the strip so it doesn't repeat.

### Visual standards (match the rest of the deck)

- Canvas is 4:3 standard (10" × 7.5"). Headline rule sits at `y: 1.45`.
- Colors (already defined as constant `C` in build-deck.js): use `C.orange` (F6693D) as the semis accent, `C.red` (CC0000) as the software accent, `C.white`, `C.offWhite`, `C.darkGray`, `C.medGray`, `C.lightGray` for the usual neutrals.
- Typography: Arial / Arial Black, same sizes used in other slides. Don't introduce new fonts.
- Card chrome: 0.5pt `C.lightGray` border, white fill, 0.06"-tall accent bar flush along the top. The existing `drawTile` helper inside the slide 13 block is the template — you can either refactor it or replace it.
- Icon circles: `pres.shapes.OVAL` with accent-color fill, white glyph on top, centered. Slide 14 has a working example.
- Citations: keep `addCitations` at the bottom with whatever markers actually appear in the new copy. Renumber inline superscripts so there are no missing numerals.
- Leave `addFooter(s, 13)` intact.

### Quality bar

The slide should feel like an investor-facing qualitative explainer, not a dashboard. A reader should be able to cover the line chart and still understand *why* the two sub-industries diverged. The right column is now text and iconography doing the work, so the copy has to be tight — no filler, no recycled phrases from the subhead, no stat-shaped language sneaking back in.

### Before you finish

1. Run `node build-deck.js` and confirm it builds without errors.
2. Re-read the slide 13 code top to bottom and check that: (a) no big `%` or `pts` numerals remain on the right side, (b) citation markers are sequential with no gaps, (c) the orange/red accent bars sit flush with the card tops, (d) no text boxes overlap, (e) the italic bottom strip still fits above the footer at `FOOTER_Y = 6.875`.
3. Summarize what you changed (which blocks deleted, what the two new panels contain, final citation list) so I can spot-check.

Do not touch any other slide.

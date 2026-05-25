# Plan 3 — Editorial pass (Claude Code prompt)

> Paste everything below the divider into a fresh Claude Code session opened in this repo.

---

You are doing an **editorial pass** on the AI Markets May 2026 deck. The deck is built from `build-deck.js` via `node build-deck.js` → `ai-markets-deck.pptx`. Before you start, read `REVIEW_2026-04-26.md` in the repo root — it's the review that motivates this work and contains the slide-by-slide context.

## Scope (read this carefully)

This pass touches **titles, body copy, and the slide-2 TOC only**. Do **not** touch any of the following — they belong to other plans:

- Image placeholders or `IMAGE:` art-direction text (Plan 2)
- Bar-chart values, scatter points, chart series data, or the `TOP20` table (Plan 1)
- Card geometry, shape coordinates, fonts, or the `C.*` color system
- The `addHeadline` helper or any helper function — change call-site arguments only

If you find a data error mid-pass that's outside scope, **don't fix it**. Append a one-line note to a new `PLAN3_NOTES.md` file ("slide N: <claim> looks wrong because <reason>") and move on. Plan 1 will pick it up.

## Tasks, in order

### Task 1 — Rewrite 14 topic-label titles to full-sentence takeaways

Find each `addHeadline(s, "...")` call in `build-deck.js` (use grep — there's one per slide, near the top of each `// SLIDE N` block). Replace each title in the table below. The current titles read as topic labels with trailing periods; the new ones carry the slide's conclusion.

| Slide | Current | New |
|---|---|---|
| 4  | `AI evolution from chatbots to agents.` | `Sixty years of AI in six steps — and we are now in step six` |
| 5  | `The AI stack.` | `Eleven layers, four power blocs — your exposure depends on which layer you own` |
| 7  | `Semiconductors, explained.` | `Logic and memory absorb the capex — ASML, TSMC, and packaging decide who ships` |
| 8  | `Who's buying the chips.` | `Five hyperscalers fund ~60% of advanced-AI chip demand — their capex IS the market` |
| 10 | `The labs.` | `Two private giants, one public, one merger — Q1 2026 funding doubled all of 2025` |
| 11 | `Earnings & valuations.` | `Top 10 Tech grow 4× faster than Top 10 Non-Tech — at a similar multiple` |
| 12 | `What is agentic AI?` | `Agentic AI uses 10–100× the compute per session — that's the capex thesis` |
| 13 | `The divergence.` | `Semis up, software down — one theme, two outcomes` |
| 16 | `Policy & regulation.` | `Export controls, EU compliance, and rare-earths now decide who can sell what` |
| 17 | `AI backlash.` | `Communities, voters, and labor are pricing the AI infrastructure bet lower` |
| 18 | `Beyond the grid.` | `Orbital compute sidesteps the bottlenecks slowing Earth-bound data centers — pilot stage today` |
| 19 | `Physical AI.` | `Humanoid pilots launch in factories, warehouses, and hospitals — every robot is a walking inference endpoint` |
| 20 | `Autonomous mobility.` | `Every autonomous mile compounds — every AV consumes frontier-scale edge compute` |
| 22 | `Key takeaways.` | `Four conclusions — capex on credit, basket trade is over, bottleneck is moving, exposure is a thesis` |

**Constraints:**
- Drop the trailing period — these are conclusions, not labels.
- Keep each title ≤ 95 characters so it fits one line at 24 pt in the existing 7.2"-wide title box. If a rewrite would wrap, shorten before committing.
- When you change a title, **re-read the subhead immediately below it** (the 13.5 pt line ~0.8" below the headline). If the new title now duplicates the subhead, rewrite the subhead so it adds information rather than restating. Two specific cases to watch:
  - **Slide 11:** the existing subhead says `"...growing 4× faster than the top 10 Non-Tech — at a lower multiple."` — change `lower multiple` → `similar multiple` so it matches the corrected medians (Plan 1 fixes the bar values; this just fixes the prose).
  - **Slide 13:** the existing subhead says `"Semis are up, software is down — a wide spread inside one theme."` — after retitling that's a near-duplicate. Rewrite to focus on the *consequence*: `"A 50+ point spread inside a single theme — and the pain is now bleeding into private credit and PE-held SaaS."`

### Task 2 — Date-stamp quantitative claims inline

Source lines already carry dates. Surface the dates next to the numbers themselves in the slide body. Format: `~12% by 2028 (EPRI high case, 2024)` or `$852B (Apr 22, 2026)`.

| Slide | Claim to date-stamp | Insert |
|---|---|---|
| 9  | `~12% of US electricity demand` callout | `(EPRI high case, 2024)` after the 11 pt explainer |
| 10 | The four valuations in the table | One new 8 pt line under the table: `All valuations as of Apr 22, 2026.` |
| 11 | Dark-band medians line | Append `(consensus, Apr 22, 2026)` to the line |
| 17 | `Only 26% of Americans view AI positively` | Insert `(Echelon Insights, Mar 2026)` inline |
| 22 | `Semis +38% YTD, software –20% YTD` | Append `(YTD through Apr 17, 2026)` |

Don't change any *number* — only add the date in parens. Keep insertions in matching font/size/color so layout doesn't shift.

### Task 3 — Reconcile slide-2 TOC with the appendix

The TOC ends at `06 TAKEAWAYS · 22` but the file has appendix slides 23 (and 24, once Plan 1 rebuilds it). Pick **Option A** unless you find a concrete blocker.

**Option A (recommended) — add a 7th TOC row.** In the slide-2 block (around lines 290–340 of `build-deck.js`), follow the pattern of rows 01–06 to add:
- Number tile: `07`
- Sidebar color: `C.medGray`
- Label: `APPENDIX`
- Page range: `23 – 24`
- Matching divider line above the row

Verify visually that 7 rows fit on the slide without crowding the footer (the existing 6 rows occupy y ≈ 1.9 → 5.5 in 0.72" steps; row 7 lands at y ≈ 6.22 which collides with the source line at y = 6.42 — you may need to compress row spacing from 0.72" to 0.62" to fit row 7 cleanly).

**Option B (fallback) — relabel appendix footers.** If Option A causes layout collisions you can't resolve, instead change the `addFooter(s, N)` calls on slides 23/24 to pass `"A1"` / `"A2"` as strings. The `addFooter` helper currently expects a number; widen its signature to accept `string | number` and pass through. Document why you fell back in `PLAN3_REPORT.md`.

## Verification (required before declaring done)

1. `node build-deck.js` — confirm it exits 0 with no warnings.
2. Convert to PDF and render slides for visual check:
   ```bash
   python /path/to/skills/pptx/scripts/office/soffice.py --headless --convert-to pdf ai-markets-deck.pptx
   pdftoppm -jpeg -r 150 ai-markets-deck.pdf slide
   ```
   Open slides 2, 4, 5, 7, 8, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22 — confirm:
   - Every retitled slide has a one-line title that doesn't wrap or clip.
   - Slide 2's TOC reads cleanly as either 7 rows (Option A) or 6 rows + footers labeled A1/A2 (Option B).
   - Slide 11's subhead says "similar multiple," not "lower multiple."
   - Slide 13's subhead doesn't duplicate the new title.
   - Inline date stamps fit without pushing other text into the footer.
3. `python -m markitdown ai-markets-deck.pptx | grep -iE "lower multiple|TBD|TODO"` — should return nothing.

## Output

When done, write `PLAN3_REPORT.md` with:
- **Titles changed** — table of (slide #, before, after, char count)
- **Date stamps added** — table of (slide #, claim, date inserted)
- **TOC option** — A or B, plus any layout concessions
- **Subhead rewrites** — any subheads you touched beyond slides 11 and 13
- **Out-of-scope flags** — paste the contents of `PLAN3_NOTES.md` here if you created one
- **Verification** — paste the relevant grep / build output

Files you may write: `build-deck.js`, `ai-markets-deck.pptx` (regenerated), `PLAN3_REPORT.md`, `PLAN3_NOTES.md`. Touch nothing else.

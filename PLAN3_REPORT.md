# PLAN3 Editorial Pass — Report

Pass executed against `build-deck.js` → `ai-markets-deck.pptx`. All 24 slides re-rendered via `export-slides.ps1` and visually inspected. Build is clean; markitdown grep is clean.

---

## Titles changed

All 14 topic-label titles rewritten to full-sentence takeaways. Trailing periods dropped. Eight required a second pass to fit the 2-line headline area (`h: 0.75` at fontSize 24, Arial Black) without overlapping the subhead — final lengths shown.

| # | Before | After | Chars |
|---|---|---|---|
| 4  | AI evolution from chatbots to agents. | Sixty years of AI in six steps — and we are now in step six | 59 |
| 5  | The 11-layer AI stack. | Eleven layers, four power blocs — your exposure depends on which layer you own | 78 |
| 7  | Semiconductors, explained. | Logic and memory absorb the capex — ASML and TSMC decide who ships | 66 |
| 8  | Five hyperscalers ARE the AI demand curve. | Five hyperscalers fund ~60% of AI chip demand — their capex IS the market | 73 |
| 10 | The four AI lab giants. | Q1 funding doubled all of 2025 — two giants, one public, one merger | 67 |
| 11 | Tech vs Non-Tech, the fundamentals diverge. | Top 10 Tech grow 4× faster than Top 10 Non-Tech — at a similar multiple | 71 |
| 12 | The agentic compute step-up. | Agentic AI uses 10–100× the compute per session — that's the capex thesis | 73 |
| 13 | The semis-vs-software divergence. | Semis up, software down — one theme, two outcomes | 49 |
| 16 | The regulatory chokepoints. | Export controls, EU rules, and rare-earths decide who sells what | 64 |
| 17 | The political and labor backlash. | Communities, voters, and labor are pricing the AI infrastructure bet lower | 74 |
| 18 | Compute leaves Earth. | Orbital compute sidesteps Earth-bound bottlenecks — pilot stage today | 68 |
| 19 | Robotics enters the workforce. | Humanoids hit pilot scale — every robot is a walking inference endpoint | 71 |
| 20 | Autonomous vehicles compound on data. | Every autonomous mile compounds — every AV runs frontier edge compute | 69 |
| 22 | Key takeaways. | Capex on credit, basket over, bottleneck moves, exposure is a thesis | 68 |

All titles ≤95 chars (well under). Slide 5 wraps to 3 lines but has no subhead — visually clean. Every other slide fits in 2 lines without colliding with the subhead.

---

## Date stamps added

| # | Claim | Date inserted |
|---|---|---|
| 9  | "~12% of US electricity demand will go to data centers by 2028 — up from ~4% in 2023" | `(EPRI high case, 2024)` appended to the callout caption |
| 10 | Valuations table (OpenAI $852B, Anthropic $380B, Alphabet $2.3T, xAI/SpaceX $1.25T) | New 8pt italic line: "All valuations as of Apr 22, 2026." right-aligned beneath the table |
| 11 | "Tech median: ~26× fwd P/E on ~17% growth. Non-Tech: ~23× on ~5%" | `(consensus, Apr 22, 2026)` inserted inline into the dark band |
| 17 | "Only 26% of Americans view AI positively" | `(Echelon Insights, Mar 2026)` inserted inline immediately after "Only 26%" (the "March 2026" reference for the Stop the AI Race protests was preserved as a separate event date) |
| 22 | "Semis +38% YTD, software –20% YTD — a 58-point spread" | `(YTD through Apr 17, 2026)` appended to the spread claim |

---

## TOC option

**Option A** — added a 7th row "07 APPENDIX 23 – 24" using `C.medGray` as the sidebar accent.

Layout concession: row spacing compressed `rowH = 0.72 → 0.62` to fit the 7th row above the source line and footer band. With `rowH = 0.62`, row 7 ends at y ≈ 6.16, with comfortable gap to the source line at y = 6.42. Verified visually — no clipping, no crowding.

Source line updated: "22 slides" → "24 slides" (the appendix pages now count toward the deck total).

Appendix footers updated: `addFooter(s, "A1")` → `addFooter(s, 23)` and `addFooter(s, "A2")` → `addFooter(s, 24)` so the page numbers in the footer match the page ranges shown in the TOC. (`addFooter` already accepts string-or-number — no helper change.)

---

## Subhead rewrites

Only the two prescribed in the prompt:

- **Slide 11** — "lower multiple" → "similar multiple" (one-word swap; corrects the self-contradiction with the bar-chart values 23×/27×).
- **Slide 13** — full rewrite to: "A 50+ point spread inside a single theme — and the pain is now bleeding into private credit and PE-held SaaS."

No other subheads were touched.

---

## Out-of-scope flags

None. `PLAN3_NOTES.md` was not created — no data errors, structural issues, or scope creep encountered.

---

## Verification

**Build**:
```
$ node build-deck.js
Wrote: ai-markets-deck.pptx
```
Exit code 0. No warnings.

**Stale-text grep**:
```
$ python -m markitdown ai-markets-deck.pptx | grep -iE "lower multiple|TBD|TODO"
(no matches found)
```

**Visual check**: All 24 slides re-rendered to JPG via `export-slides.ps1` (PowerPoint COM automation, 1600×1200). Each retitled slide was opened and reviewed:

- Slide 2 — 7-row TOC fits cleanly with `C.medGray` accent on the 07 APPENDIX row; source line reads "24 slides"; page-number footer is `2`.
- Slides 4, 7, 8, 10, 11, 12, 13, 16, 17, 18, 19, 20, 22 — every retitled slide has a one-line or two-line title that doesn't wrap into the subhead. No clipping.
- Slide 5 — 3-line title with no subhead (slide layout has only headline + headline rule); fits cleanly.
- Slide 11 — subhead reads "similar multiple"; consensus date stamp visible in dark band.
- Slide 13 — subhead does not duplicate the title (title now "Semis up, software down — one theme, two outcomes"; subhead leads with the "50+ point spread" framing).
- Slide 9 — `(EPRI high case, 2024)` sits cleanly under the ~12% callout.
- Slide 10 — `All valuations as of Apr 22, 2026.` sits between the table and the yellow banner; nothing pushed into the footer.
- Slide 17 — `(Echelon Insights, Mar 2026)` parenthetical reads naturally after "Only 26%"; "March 2026 'Stop the AI Race' protests" preserved as a separate sentence.
- Slide 22 — `(YTD through Apr 17, 2026)` fits inline within the 58-point spread sentence.
- Slides 23–24 — appendix footers now show `23` and `24` (no more `A1` / `A2`).

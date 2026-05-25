# Claude Code prompt — AI Markets deck, deck-wide design polish

You're working on a slide-deck web app in this repo. Deliverable: a deck-wide design-quality pass covering the systemic issues that affect every slide, plus targeted enhancements to slides 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, and 22. Treat this as design polish — prioritize restraint, consistency, and visual rhythm. Use the `bii-deck` skill and read it before you start.

> Note: a separate prior pass already addressed slides **1, 2, 5, and 6** (cover strip-down, minimalist agenda, AI-stack right-hand fix, supply-chain map proportions). Assume those changes have landed. Do not redo them, but do check them for consistency with the systemic fixes below.

## STOP — critical file state before you do anything

The working copy of `build-deck.js` (1309 lines) is **truncated** relative to the last commit (1365 lines). Specifically, lines ~1310 onward were lost, which means:

- The `items.forEach(...)` render loop inside Slide 21 (the four "01/02/03/04" takeaways) is missing.
- Slide 21's `addSource(...)` and `addFooter(s, 21)` calls are missing.
- All of **Slide 22 (disclaimer)** is missing.
- The final `pres.writeFile(...)` call is missing — the script currently cannot produce a .pptx.

The file literally ends mid-variable (`i`) with no newline. The existing `slides/Slide21.JPG` and `slides/Slide22.JPG` were rendered from the previous (committed) version.

**Your first step:** restore the tail of `build-deck.js` from git before doing anything else. Run `git diff HEAD -- build-deck.js` to see exactly what was deleted, then either `git checkout HEAD -- build-deck.js` to start from a clean base, or hand-patch the missing ~55 lines back in. Confirm with `npm run build` that the script now produces `ai-markets-deck.pptx` cleanly before you proceed to design edits.

## What the project is

A 22-slide presentation titled **"AI Markets — May 2026"**, built in a BII (BlackRock-inspired Institutional) visual style with pptxgenjs, served as a static Vercel site. The deck is meant to mirror the tone of https://ai-markets.vercel.app/ — a minimalist, typography-first reading experience. When making design calls, optimize for that sensibility: fewer elements, more whitespace, stronger hierarchy.

### Key files

- `build-deck.js` — single source of truth; generates `ai-markets-deck.pptx`. All slide content, layout, and styling lives here. Each slide is its own `{ ... }` block with a `// SLIDE N — …` header.
- `export-slides.ps1` — exports the .pptx to JPGs in `slides/Slide1.JPG` … `Slide22.JPG` via PowerPoint COM (Windows only).
- `index.html` — static viewer. Loads JPGs by filename; hardcodes `TOTAL = 22`.
- `slides/` — exported JPGs served to the web viewer.
- `package.json` — `npm run build` runs `node build-deck.js`.
- `vercel.json`, `.vercel/` — deploy config; don't touch.

### Brand system in `build-deck.js`

- Colors: `C.yellow` (cover), `C.orange` (primary accent), `C.black`, `C.white`, `C.darkGray`, `C.medGray`, `C.lightGray`, `C.offWhite`, plus section-theme colors (`C.teal` LANDSCAPE, `C.gold` MARKET, `C.orange` SHIFTS, `C.red` RISKS, `C.pink` FRONTIER).
- Typography: Arial / Arial Black. 10" × 5.625" (16:9).
- Helpers: `addFooter`, `addThemeTag`, `addHeadline`, `addSubhead`, `addHeadlineRule`, `addImagePlaceholder`, `addChartTitle`, `addSource`, `makeBigNumber`, `barOpts`, `lineOpts`.
- Every non-cover slide has theme tag (top-right), headline, subhead, hairline rule, source line, dark footer band with page number.

## Systemic fixes first (these affect every slide)

Do these before touching individual slides — they're helper-function edits that cascade across the deck.

### S1. Fix the source line / footer-band collision

On virtually every content slide, the source line (`addSource` defaults to `y: 4.4, h: 0.4`) sits so close to the dark footer band (`y: 4.95, h: 0.675`) that in the exported JPGs the source line visually crashes into the top edge of the footer. On some slides the source text gets clipped by the footer's top.

Fix inside the helpers:

- Option A (recommended): raise the source line — change `addSource`'s default `y` from `4.4` to `4.25` (or reduce its `h` to `0.25`). Audit every call site that passes an explicit `y: 4.4` / `4.45` / `4.5` and push it up accordingly (most call sites set this by hand).
- Option B: make the footer thinner — reduce `addFooter`'s rectangle from `h: 0.675` to `h: 0.45` and move its text up to `y: 5.05`. This gives the source line more room.

Either way, after the fix no source line should touch the footer band in any exported JPG.

### S2. Kill the duplicated-footer / double-page-number artifact

In several rendered JPGs (slides 4, 8, 12, 14, 18, 20, 21 are clearest), the disclaimer text appears doubled and the page number renders as "4/4", "12/12", etc. stacked vertically. This looks like `addFooter` is being called twice, or a text element is rendered with a duplicate that's offset by a few pixels.

Audit the call graph:
- Search `build-deck.js` for every `addFooter(` call — there should be exactly one per slide.
- Inside `addFooter`, confirm there's only one `slide.addText(...)` for the disclaimer and one for the page number. The page-number call uses `color: C.white` on a dark band; confirm the band is actually drawn (sometimes the band renders light gray on export — see S3).
- If you can't reproduce the duplication from the source code, it may be a PowerPoint export quirk from `export-slides.ps1`. In that case, don't chase it further — flag it in your summary.

### S3. Make the footer band render as its intended dark gray

On many JPGs the footer band looks medium-gray (almost washing into the disclaimer text) rather than `#333333`. Check the `addFooter` rectangle fill (`{ color: C.darkGray }`) is actually being set correctly; consider bumping it to pure black (`C.black`) for better contrast on export. The page number in white needs to stay readable.

### S4. Unify the letterbox image-placeholder pattern

Slides 7, 18, 19, and 20 all use the same awkward letterbox image placeholder (`w: 9.0, h: 0.5`) above a row of columns — it reads as a banner, not imagery. This is the same issue already fixed on slide 6.

Fix each of those four slides individually (see slide-specific notes below), but the pattern is: either shrink the image placeholder to a proper proportion (e.g., 3.5w × 2h anchored on one side with content flowing around it), or make it taller and shorter (e.g., 6w × 2.5h centered as a hero, with the columns condensed below).

### S5. Consistency pass on accent-color rhythm

Scan every slide for this pattern: are big stats or chart series using colors consistently within the slide? A few specific breaks:
- **Slide 10** has two adjacent bar charts using different fill colors (left orange, right gold). Pick one — use orange for both (HBM TAM + supplier share are both the same story: memory scarcity). Or if you want differentiation, use orange for the hero chart and a muted `C.medGray` for the supporting chart.
- **Slide 3** mixes colors across the four big numbers (orange, orange, green, red) to convey sign — that's intentional and should stay.
- **Slide 17** goes all-red across three big numbers AND three card headers — over-saturated. Introduce a hierarchy: one number stays red (the headline stat), the other two move to `C.darkGray` or `C.medGray`; same for the card headers.

## Slide-by-slide enhancements

For each slide below, apply the listed changes. Keep the BII visual language. Every change should improve hierarchy, rhythm, whitespace, or restraint.

### Slide 3 — "Why AI matters to markets."

- Four big-number stats have uneven sublabel heights (the "$750B" sublabel wraps to 3 lines while "$4T" wraps to 2), which creates a jagged baseline. Either tighten the "$750B" label copy (e.g., "2026E hyperscaler capex — Big 5") to fit 2 lines, or pad the other labels so all four cards have matching sublabel heights.
- The sign prefixes on "+38%" and "–20%" make those numerals visually wider than "$750B"/"$4T". Nudge the horizontal spacing so the numerals read as evenly weighted — consider setting a common `fontSize` with `shrinkText` disabled and equalizing column widths.
- The yellow highlight band below ("A ~58-point spread…") floats a bit disconnected. Move it up (reduce the gap between the big numbers and the band) so it reads as a conclusion tied to the stats above.

### Slide 4 — "What is AI."

- There's a large empty zone between the subhead (~y=0.95) and the timeline (~y=2.5). Raise the timeline up — set `lineY` to ~1.8 — so the slide feels vertically balanced. The subhead can stay put.
- The timeline dots are tiny (0.18"). Bump to ~0.24" and make sure the connector line color (`C.darkGray`) doesn't visually dominate the dots.
- Card heights are uniform (1.55") but copy length varies — some cards feel stuffed (LLM chatbots, Agentic AI), others feel empty (Symbolic AI). Tighten the verbose descriptions or add one more short phrase to the sparse cards so every card has a similar visual weight.
- Possible upgrade: instead of six equal-width columns, consider weighting — the last two phases (LLM chatbots, Agentic AI) are the ones that matter for the thesis; they can be slightly wider or visually emphasized (bolder dot, colored card background).

### Slide 7 — "Power is part of the stack now."

- Kill the letterbox image placeholder (currently `w: 9.0, h: 0.5`). Replace with one of:
  - (a) a proper-proportion placeholder on the right (~3.5w × 2h) with the three power-source cards stacked tightly on the left
  - (b) a larger hero placeholder above (~6w × 2h centered) with the three cards as a compact row below
- The three column cards are short (~1.15" tall) and leave empty space between them and the dark "EMERGING" strip. Either raise the "EMERGING" strip closer, or extend the column cards' height and give them more body copy (one extra sentence each).
- The "SOLAR & PPAs" header uses white text on bright gold (`C.gold = #FFB800`), which is low contrast. Consider switching header text to `C.black` for the gold variant only (others can stay white on red / black on gold).

### Slide 8 — "The buyer base is broadening."

- The hyperscalers card's company list ("AMZN ~$200B · GOOGL ~$200B · MSFT ~$150B · META ~$120B · ORCL ~$80B") wraps awkwardly across 2–3 lines inside a narrow card. Either:
  - (a) split into two lines with explicit `breakLine: true` after two companies
  - (b) shorten to just tickers ("AMZN · GOOGL · MSFT · META · ORCL") and drop the dollar amounts (the big number "$750B" on the card already carries the weight)
- Audit card heights — "AI Labs" with just "OpenAI · Anthropic · xAI · Mistral" looks sparse compared to Hyperscalers. Consider adding a one-line hook under each company list (e.g., "Big 5 — all in S&P 500 top 10").
- The five-card row is wide and the gap between cards is small (0.12"). Consider increasing the gap to 0.18" for more breathing room; the cards can each drop to ~1.65" wide.

### Slide 9 — "Anatomy of a ~$975B market."

- The left bar chart's data labels "302" and "295" are nearly adjacent at the top of tall bars and visually collide. Options: switch to `dataLabelPosition: "ctr"` (inside the bar at top), or rotate the chart to a horizontal bar so labels have room to the right.
- Chart category label "Logic / AI accel." is long and wraps to two lines, crowding the x-axis. Shorten to "Logic" with the "(AI accel.)" as a note in the chart title or the yellow callout.
- The right "Value captured by node" table has a cell "HBM share; HBM4 to 70% for Rubin" that wraps awkwardly in the narrow Context column. Shorten to "HBM share; 70% for Rubin" or widen the Context column (`colW: [1.2, 1.0, 2.1]`).
- The yellow highlight band at the bottom is tight against the source line — see systemic fix S1.

### Slide 10 — "Memory is the bottleneck."

- Two bar charts side-by-side use different accent colors (orange and gold) — see systemic fix S5. Unify to one color (recommended: orange for both).
- The right chart has only 3 bars ("SK Hynix 60, Micron 22, Samsung 18") and looks sparse in a wide plot area. Swap to a **horizontal bar** (`barDir: "bar"`) so the three suppliers read cleanly stacked, or convert to a **stacked 100% single bar** (one horizontal bar segmented by supplier), which is a more typical "market share" visual.
- The dark band with the HBM4 bandwidth sentence is fine; consider tightening the copy ("HBM4 = 56× DDR5 bandwidth. All three suppliers sold out for 2026.") and adding whitespace below.

### Slide 11 — "The labs are a market."

- Table reads well. Minor: the "Latest event" column has uneven wrap — OpenAI's event spans two lines in the table cell. Either widen that column (shift `colW` from `[1.5, 1.6, 1.7, 4.2]` to `[1.4, 1.5, 1.6, 4.5]`) or shorten the event copy so each row fits one line.
- The yellow callout band below the table is dense (three sentences). Cut to the sharpest one: "Q1 2026 funding to foundational AI startups was 2× all of 2025."
- Source line sits very close to the footer — systemic S1 applies.

### Slide 12 — "From chatbots to coworkers."

- The table's right column uses orange bold on four cells — too much orange, especially competing with the orange SHIFTS theme tag in the corner. Cut back: orange only on the most important differentiator ("Sets goals, executes autonomously"), others in `C.black` bold. The visual punch should be about the *change*, not about the color.
- The orange callout band at the bottom is effective; consider matching its copy length to the band height (no wrapping) — currently "Anthropic → Bun, OpenAI → Astral" wraps awkwardly. Tighten to "Labs are buying dev-tool companies (Bun, Astral) to lock the coding stack."

### Slide 13 — "The basket trade is over."

- The two right-side panel headers ("MEMORY SUPERCYCLE — DRAM PRICES +40% Q2" and "THE diSAASter — SEAT-MODEL SaaS IS RE-RATING DOWN") wrap to two lines inside the 0.3"-tall colored strip — ugly. Fixes:
  - shorten each header to fit one line ("MEMORY SUPERCYCLE" and "THE diSAAS-ter")
  - or increase the strip height to 0.4" and the slide geometry to fit
  - or split into a two-line title with deliberate `breakLine` so the wrap is intentional, not crammed
- The two panels (memory supercycle, diSAASter) use different row spacings (0.33" vs 0.25") and different column x-positions inside the panel. Align them: use the same row height and same three x-positions for ticker / % / note.
- The source line mentions "Single-stock YTD figures TODO: verify." — this shouldn't ship. Either verify the YTD numbers (use the `update-equity-returns` skill) or move the TODO to a code comment, not into the visible source footnote.

### Slide 14 — "This is not 2000."

- Four test rows leave a lot of vertical whitespace in the left "TEST" column because the copy is 2–3 words each. Tighten the row height from 0.48" to 0.42" OR widen the left column and bold the test labels so they feel more substantial.
- The yellow callout band is good. Consider making the "Neither condition holds today." clause bold or in a different color — it's the payoff line.
- Source line collision — see S1.

### Slide 15 — "The chip supply chain is fragile."

- The dark "US RESHORING — ACTUAL STATUS" strip floats visually above the four fab cards — it reads as a separate banner. Tuck it tighter to the cards (reduce `y`-gap from 0.05 to 0.02).
- The fab cards at `2.125"` wide feel cramped; "Samsung Taylor" status wraps awkwardly. Either compress copy to "Samsung Taylor — 2nm; pushed to 2026" or widen cards and reduce to 3 cards per row with the fourth taking a larger role.
- The four big numbers at top use red-for-TSMC/Korea-share and gold-for-EUV/CHIPS — that's thoughtful color coding (red = concentration risk, gold = mitigant). Keep but make sure it's legible: the gold stats on white sometimes feel washed. Consider `C.orange` instead of `C.gold` for better contrast.

### Slide 16 — "Policy has cleaved the stack."

- The three columns mix a dollar stat ("$5.5B"), a date ("Aug 2026"), and a dollar stat ("~$36B") in the same visual slot. The text "Aug 2026" is narrower and visually different from a number — breaks rhythm. Pick one:
  - (a) replace "Aug 2026" with a number (e.g., the €35M fine cap or 7% revenue) and move the date into the sublabel
  - (b) accept the date and make the typography match more deliberately (same fontSize, same fontFace "Arial Black" weight)
- Bullet lists in each column are dense (3 bullets with 1–2 lines each). The middle "AI REGULATION" column has longer bullets and visibly wraps. Tighten each bullet to ≤12 words.
- The column card width (2.8") is tight for the copy. Consider widening to 2.95" and reducing the gap between columns.

### Slide 17 — "The public is turning."

- All three big numbers are red AND all three card headers below are red = visually exhausting. Apply S5 hierarchy: keep $64B red (the headline — blocked capex), move "26%" to `C.darkGray` with the subtitle in red, and "~480K" to `C.medGray` with the card header in red. The eye needs one dominant stat, not three.
- Consider reordering so the most-concrete/shocking number is leftmost.
- The three "NIMBY REVOLT / ANTI-AI SENTIMENT / LABOR SHORTAGE" card bodies all run to 3 lines of small (8.5pt) text. Either up the font size to 9.5pt (at the cost of some wrap) or tighten to 2 lines each.

### Slides 18, 19, 20 — FRONTIER trio

These three slides share almost identical layout (letterbox image strip + three pink-header cards + PLAYERS dark band). The repetition feels lazy; they all read as the same slide.

- Apply S4 to kill the letterbox image placeholders on all three. Use a different image treatment per slide:
  - **18 (Orbital)**: image placeholder on the right (~3.5w × 2.3h), cards stacked on the left in a narrow 1-column list
  - **19 (Physical AI)**: image placeholder as a hero below the headline (~7w × 2.2h centered), three cards as a narrow row below at smaller height
  - **20 (AVs)**: image placeholder as a strip on the left (~2.5w × 2.8h), three cards to its right in a tight vertical stack
- This variance keeps the section coherent but stops each slide feeling like a carbon copy.
- The three pink-header cards on each slide are identical in color, size, and tone. On at least one of these slides, try replacing the three-card format with a single bolder statement + two supporting points, or a timeline, or a pair of contrasting cards. The FRONTIER section deserves some formal variance.
- The dark "PLAYERS" band at the bottom is repeated verbatim three times. Consider making it thinner (h: 0.3") or moving it into the source line position (small muted text, `"Players: Starcloud · SpaceX · …"`) so it isn't a visual anchor that competes with the headline on each slide.

### Slide 21 — "Four takeaways."

After you restore the render loop from git (see "STOP" section above), review it:

- The "01" / "02" / "03" / "04" colored pill is a 0.6"-wide rectangle; the body text starts at `x: 1.2`. The gap feels tight. Bump body text to `x: 1.35`.
- Body copy fontSize is 9.5pt over ~8.3" wide — that wraps to ~2 lines. Comfortable. Keep.
- The sources line cites "iShares SOXX / IGV YTD (Apr 17, 2026)" — that's the systemic "as of" date the deck uses. Fine, but the line is long; consider breaking into two lines or trimming to the 3 most load-bearing sources.
- Source line collision — see S1.

### Slide 22 — Disclaimer

After you restore it from git, check:

- The disclaimer body is rendered inside a single `addText` with multiple `breakLine` items and spacer items — fine but dated. Consider switching to a cleaner block: just use `paraSpaceAfter: 8` and plain `\n` separators. Less fiddly.
- The "Important information" headline is 28pt Arial Black. Consider dropping to 22pt and using `fontFace: "Arial"` bold — the disclaimer shouldn't feel like a hero.
- Add a small tag line at the top-right mirroring the other slides' theme-tag position (e.g., a tiny "DISCLAIMER" in gray), so slide 22 feels like it belongs to the deck rather than being a bolt-on.

## Design quality bar

Every change should improve one or more of: **hierarchy, rhythm, whitespace, restraint, consistency**. When in doubt, remove rather than add.

- Use existing helpers. Don't introduce a new visual grammar.
- If you edit a helper (`addSource`, `addFooter`, `addImagePlaceholder`), spot-check at least four slides after rebuild to make sure you didn't regress anything.
- No text overflow, no awkward line breaks on headlines, no misaligned card grids.
- Theme-tag color on every content slide still matches the section's accent (LANDSCAPE teal, MARKET gold, SHIFTS orange, RISKS red, FRONTIER pink).

## Rebuild and verify

1. **First:** restore `build-deck.js` to a buildable state (see STOP section). `npm run build` must succeed before you start any design edits.
2. After edits, `npm run build` again.
3. Re-export all 22 slides to JPG. On Windows use `export-slides.ps1`. On other OS, use LibreOffice headless (`soffice --headless --convert-to pdf ai-markets-deck.pptx` then a pdf-to-image tool) or any pptx→image path you have. If re-export genuinely isn't possible, say so in the summary — don't leave stale JPGs pretending to be current.
4. Open every JPG and check: source line ≠ footer, no ghost footer, all theme-tag colors right, no weird wraps.
5. Confirm `index.html` still has `TOTAL = 22` and the "AI Markets — May 2026" strings are intact.

## Constraints

- Keep the BII visual language. Don't rebrand.
- `build-deck.js` stays the single source of truth.
- Don't touch `vercel.json`, `.vercel/`, or `index.html` (except to verify).
- Don't add runtime dependencies beyond `package.json` unless truly necessary; justify if you do.
- Slide count stays at 22. Page numbers in `addFooter` calls stay aligned.
- Don't redo slides 1, 2, 5, 6 — they were handled in a prior pass. But do apply the systemic fixes (S1–S5) to them too.

## Deliverable

Restored-and-updated `build-deck.js`, refreshed JPGs in `slides/` (or an explicit note if re-export wasn't possible), a rebuilt `ai-markets-deck.pptx`. End with a summary in this shape:

1. **Restoration** — one line confirming you restored the truncated tail from git and the script now builds cleanly.
2. **Systemic fixes (S1–S5)** — one short paragraph each describing what changed and which slides it affected.
3. **Per-slide notes** — one short paragraph per slide (3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22) describing what you did and the design logic.
4. **Anything flagged** — any issue you couldn't resolve (e.g., unexplained ghost footer, an export artifact) so the reviewer knows what to look at next.

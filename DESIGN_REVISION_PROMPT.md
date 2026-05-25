# Claude Code prompt — AI Markets deck, design revision pass

You're working on a slide-deck web app in this repo. Deliverable: targeted design improvements to four slides (1, 2, 5, 6). Treat this as a design-quality pass — prioritize restraint, hierarchy, and whitespace over decoration. Use the `bii-deck` skill; read it before you start.

## What the project is

A 22-slide presentation titled **"AI Markets — May 2026"**, built in a BII (BlackRock-inspired Institutional) visual style with pptxgenjs, served as a static Vercel site. The deck is meant to mirror the tone of https://ai-markets.vercel.app/ — a minimalist, typography-first reading experience. When making design calls, optimize for that sensibility: fewer elements, more whitespace, stronger hierarchy.

### Key files
- `build-deck.js` — the single source of truth; generates `ai-markets-deck.pptx`. All slide content, layout, and styling lives here. Each slide is its own `{ ... }` block, numbered in comments (`// SLIDE 1 — Cover`, etc.).
- `export-slides.ps1` — exports the .pptx to JPGs in `slides/Slide1.JPG` … `Slide22.JPG` via PowerPoint COM (Windows only).
- `index.html` — the static viewer. Loads JPGs by filename; hardcodes `TOTAL = 22`.
- `slides/` — exported JPGs served to the web viewer.
- `package.json` — `npm run build` runs `node build-deck.js`.
- `vercel.json`, `.vercel/` — deploy config; don't touch.

### Brand system in `build-deck.js`
- Colors: `C.yellow` (cover), `C.orange` (primary accent), `C.black`, `C.white`, `C.darkGray`, `C.medGray`, `C.lightGray`, `C.offWhite`, plus section-theme colors (`C.teal` LANDSCAPE, `C.gold` MARKET, `C.orange` SHIFTS, `C.red` RISKS, `C.pink` FRONTIER).
- Typography: Arial / Arial Black. 10" × 5.625" (16:9) layout.
- Helpers already defined: `addFooter`, `addThemeTag`, `addHeadline`, `addSubhead`, `addHeadlineRule`, `addImagePlaceholder`, `addChartTitle`, `addSource`, `makeBigNumber`, `barOpts`, `lineOpts`.
- Every non-cover slide has: theme tag (top-right), headline, subhead, hairline rule, source line, dark footer band with page number.

## What to change

### Slide 1 — Cover: strip it down to the wordmark

Currently the cover (yellow background) has six elements: a "May 2026" date eyebrow with an underline rule (top right), a large light-gray image placeholder on the right reading "IMAGE: Hero — abstract GPU / data-center close-up", a short orange accent rule, the "AI Markets" wordmark (66pt Arial Black), a bold tagline "The capex cycle repricing every layer of tech.", and a tag line "Strategy Note | Equity Research". It's too busy.

Pare it down so the cover is effectively **just "AI Markets"** on the yellow background:

- **Remove** the image placeholder entirely (delete the `addImagePlaceholder` call and don't replace it with anything).
- **Remove** the "The capex cycle repricing every layer of tech." tagline block.
- **Remove** the "Strategy Note | Equity Research" tag line.
- **Remove** the subtitle entirely.
- Keep the "AI Markets" wordmark. Consider making it larger (the slide now has room) and/or re-centering it vertically so the negative space feels intentional, not orphaned.
- The "May 2026" date eyebrow with its short rule can stay as a quiet anchor in the corner — or move/drop it if you think the cover reads better without any date. Use your judgment; the priority is that the slide feels composed, not cluttered.
- The small orange accent rule above the wordmark can stay if it earns its keep, or go if the slide reads cleaner without it.
- Footer stays (keep the `addFooter(s, "")` call).

The result should feel like the whole slide is one piece of typography. Whitespace doing the heavy lifting.

### Slide 2 — Agenda: rebuild it minimalist

Currently slide 2 is the densest layout in the deck. Above the fold there's a headline ("The argument, in five parts.") and subhead. Below there's a full-width dark-gray band (`x: 0, w: 10.0, h: 2.35`) containing a small gold "THE DECK AT A GLANCE" eyebrow and five filled dark-gray cards, each with a colored accent bar on top, a large colored numeral (01–05), a section label (LANDSCAPE / MARKET / SHIFTS / RISKS / FRONTIER), a subtitle line, and a page-range italic ("Slides 3–7" etc.). The overall effect is heavy and cramped.

Rebuild it to feel minimalist — matching the typography-first aesthetic of ai-markets.vercel.app:

- **Kill the full-width dark gray band.** No dark slab. The slide background should read as white/light, like the rest of the content slides.
- **Kill the filled dark cards.** Replace with a clean, airy arrangement — one good direction is five lightweight "columns" (no card chrome at all), each anchored by a thin colored top-rule or a small color square/dot in the section's accent color, followed by the numeral (01–05), the section name, and one short descriptor underneath. Generous vertical whitespace between the rule and the text.
- **Demote the numerals.** They can stay as an organizing device but lighter — smaller, muted color (medGray or light accent), not the dominant visual element.
- **Trim the text.** The page-range italics ("Slides 3–7") can be dropped or made very small and light. Subtitles should be very short — one phrase, not a full sentence. If you can get each card to 2–3 lines of copy max, that's right.
- **Drop the "THE DECK AT A GLANCE" eyebrow** — it's redundant with the headline.
- Keep the five section accent colors (teal / gold / orange / red / pink) but as **thin rules, small swatches, or colored numerals only** — never as filled blocks.
- Source line and footer stay as on other slides.

The whole slide should feel quieter than any content slide in the deck — it's a breath before the argument starts.

### Slide 5 — The AI stack: fix the right-hand side

Slide 5 lists 11 stack layers (Agents → Raw materials) as horizontal rows. Each row has: a small colored chip on the left, the layer name (bold), a description. For **two rows only** — Agents and Packaging — there's a rounded colored pill on the right ("FASTEST-GROWING" in pink, "DEEPEST BOTTLENECK" in red). The right third of the slide is dead space on 9 out of 11 rows, and the two pills that do appear feel loud and unbalanced next to that emptiness.

Fix the right side so it looks *intentional on every row*. Pick ONE of these directions and commit:

- **Option A (simplest): remove the pills entirely.** Let the headline/subhead carry the bottleneck/fastest-growing framing verbally. Tighten the whole table's horizontal footprint so the description column can breathe, or center the whole stack on the slide.
- **Option B: add a consistent right-aligned data point for every row.** Examples that would work: a representative ticker or company name ("NVDA/AMD", "TSMC", "ASML", etc.), a single-word descriptor, or a market-size number. Style it as small, right-aligned, muted gray text — not a pill. Keep Agents and Packaging distinguishable by color-coding or bolding their specific tags, but inside the same visual grammar as every other row.
- **Option C: narrow the whole stack to the left ~65% and use the right ~35% as a single unified element** — a vertical "closest to user → closest to atoms" axis label, a small illustrative diagram, or a pulled callout quote. Must feel composed, not like leftover space.

Whatever you choose, the two existing rounded-pill tags should go in their current form. The fix is rhythm: every row gets the same treatment.

### Slide 6 — Supply chain: fix the map proportions

Slide 6 currently places the world-map image placeholder at `x: 0.5, y: 1.6, w: 9.0, h: 0.85` — nearly full width but only 0.85 inches tall. That letterbox strip doesn't read as a map. It reads as a banner, and the six country cards sit below it feeling disconnected from the geography.

Redesign the layout so the map occupies natural-feeling proportions. Pick ONE:

- **Option A (recommended): map left, cards right.** Map placeholder roughly `x: 0.5, y: 1.6, w: 5.5–6.0, h: 2.5–3.0`. Six country cards stack on the right in a narrow 2-column × 3-row grid (or 1-column × 6-row list) occupying roughly `x: 6.3–6.5, w: 3.2–3.5`. Each card narrower than today but otherwise using the same visual treatment (off-white fill, colored top rule, country name + role + company names).
- **Option B: map hero, cards strip below.** Map placeholder roughly `x: 1.5, y: 1.6, w: 7.0, h: 2.7` (centered, real map proportions). Six country cards in a single row below, each ~1.5 wide, more compact styling.
- **Option C: cards top, map below.** Country cards in a single row along the top (`y: 1.6`, ~0.7 tall each), map as the visual anchor below (`y: 2.4, w: 9.0, h: 2.0`) — taller than today, still wide but no longer letterbox-thin.

Whichever you pick, the map's width-to-height ratio should be one a real world map could live in (roughly 16:9 or 2:1 max, not 10:1). The `addImagePlaceholder` helper still gets used so it reads as "drop art here." Keep all six countries, their color coding (USA teal, Taiwan red, S. Korea gold, Netherlands pink, Japan orange, China darkGray), and their copy unchanged. Source line and footer stay.

## Design quality bar

Every change should improve one or more of: **hierarchy, rhythm, whitespace, restraint**. When in doubt, remove rather than add. Match the minimalism of ai-markets.vercel.app.

- Use the existing helpers (`addHeadline`, `addSubhead`, `addHeadlineRule`, `addSource`, `addFooter`, `addThemeTag`, `addImagePlaceholder`). Don't introduce a new visual language — tighten the existing one.
- If you find yourself adding a new shape style, check whether an existing helper already does it.
- Source lines must not overlap the dark footer band. On slides that become less dense, the source line may move up — check visually after rebuild.
- Theme tag color on content slides must continue to match that section's accent (LANDSCAPE = teal on slides 5 & 6 — don't break this).
- No text overflow, no awkward line breaks on headlines, no misaligned repeated cards.

## Rebuild and verify

After edits:

1. `npm run build` — confirm `build-deck.js` runs cleanly and writes `ai-markets-deck.pptx`.
2. Re-export the four changed slides to JPG. On Windows run `export-slides.ps1`. If on another OS and you can't run PowerPoint COM, use LibreOffice soffice headless or another PPTX→image path. If re-export genuinely isn't possible, say so explicitly at the end of your summary — do NOT leave stale JPGs pretending to be current.
3. Open the refreshed `slides/Slide1.JPG`, `Slide2.JPG`, `Slide5.JPG`, `Slide6.JPG` and do a final visual pass: no text overflow, no misalignment, theme tag colors still correct, source line not colliding with the footer, no awkward headline wraps.
4. Spot-check at least two unrelated slides (e.g., Slide 3 and Slide 12) in case any shared-helper edit leaked.
5. Confirm `index.html` still has `TOTAL = 22` (slide count is unchanged) and the "AI Markets — May 2026" header is intact.

## Constraints

- Keep the BII visual language — don't rebrand.
- `build-deck.js` stays the single source of truth.
- Don't change `vercel.json`, `.vercel/`, or `index.html` except as noted.
- Don't add runtime dependencies beyond what's in `package.json` unless truly necessary; justify if you do.
- Slide count stays at 22 — don't add or remove slides. Page numbers in `addFooter` calls stay as they are.
- Only slides 1, 2, 5, and 6 should change content/layout. Helper functions may be edited if a change benefits the four slides without regressing others — if you do, verify visually.

## Deliverable

Updated `build-deck.js`, refreshed `slides/Slide1.JPG`, `slides/Slide2.JPG`, `slides/Slide5.JPG`, `slides/Slide6.JPG` (or an explicit note if re-export wasn't possible), and a rebuilt `ai-markets-deck.pptx`. End with a brief summary — one short paragraph per changed slide — describing what you removed, what you added, and the design logic behind the call.

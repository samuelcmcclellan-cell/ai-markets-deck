# Claude Code prompt — AI Markets deck, May 2026 revision

You're working on a slide-deck web app in this repo. Deliverable: a polished next draft with stronger design, tighter copy, fresher data, and image placeholders. Treat this as a design-quality pass, not just a text edit. Use the `bii-deck` and `update-equity-returns` skills — read both before you start.

## What the project is

A 22-slide presentation titled **"AI Markets — March 2026"**, built in a BII (BlackRock-inspired Institutional) visual style with pptxgenjs, served as a static Vercel site.

Key files:
- `build-deck.js` — the single source of truth; generates `ai-markets-deck.pptx`. All slide content, layout, and styling lives here.
- `export-slides.ps1` — exports the .pptx to JPGs in `slides/Slide1.JPG` … `Slide22.JPG` via PowerPoint COM (Windows).
- `index.html` — the viewer. Hardcodes `TOTAL = 22`, the title "AI Markets — March 2026", and the download link. Displays the JPGs.
- `slides/` — exported JPGs served to the web viewer.
- `package.json` — `npm run build` runs `node build-deck.js`.
- `vercel.json`, `.vercel/` — deploy config; don't touch unless necessary.

Brand system in `build-deck.js`:
- Colors: `C.yellow` (cover), `C.orange` (primary accent), `C.black`, plus section-theme colors — LANDSCAPE=teal, MARKET=gold, SHIFTS=orange, RISKS=red, FRONTIER=pink.
- Typography: Arial / Arial Black. 16:9 layout.
- Helpers: `addFooter`, `addThemeTag`, `addHeadline`, `addSubhead`, `addChartTitle`, `addSource`, `makeBigNumber`, `barOpts`, `lineOpts`.
- Every non-cover slide has a theme tag (top-right), headline, subhead, source line, and dark footer with the page number.

Current slide order:
1. Cover — "AI Markets" + March 2026
2. Agenda — 5 sections
3–7. LANDSCAPE (why AI matters, what AI is, the stack, supply chain, power)
8–11. MARKET (buyers, semi market, memory/HBM, the labs)
12–13. SHIFTS (agentic AI, the great divergence SOXX vs IGV)
14–17. RISKS (bubble test vs 2000, supply-chain fragility, policy, backlash)
18–20. FRONTIER (orbital compute, physical AI, autonomous vehicles)
21. Takeaways
22. Disclaimer

## What to change

### 1. Re-date everything to May 2026

This will be presented in May 2026. Find every date reference and update it. At minimum:
- Cover: "March 2026" → "May 2026"
- `pres.title` and `index.html` `<title>` / header / meta description
- The "March 2026" comment at the top of `build-deck.js`
- Every source line that says "Mar 25, 2026" / "Q1 2026" / "March 2026" etc. — shift to late-April or May 2026 as-of dates where the data supports it
- Any body copy that says "March" or references Q1 — reassess in light of what's now visible through April

Grep for `March`, `Mar 2026`, `Q1 2026`, `Mar 25` and handle each.

### 2. Refresh the data with real research

Run the `update-equity-returns` skill — it knows which figures live on which slides and how to pull fresh numbers. At minimum verify/update:
- Slide 3: SOXX YTD, IGV YTD, the 39-point spread headline
- Slide 9: 2026E semiconductor segment sizes, NVIDIA FY26 revenue
- Slide 10: HBM TAM curve, supplier shares
- Slide 11: private-lab valuations and events (OpenAI, Anthropic, xAI, Mistral) — check for any April/May 2026 rounds or news
- Slide 13: the SOXX vs Nasdaq vs IGV rebased chart — extend the x-axis through April (or May, if data supports)
- Slide 13 memory supercycle + diSAASter panels — refresh YTD %
- Slide 14: NVIDIA forward P/E, Mag 7 margins, hyperscaler debt/EBITDA
- Slide 15: CHIPS Act committed $, fab status updates
- Slide 16: export-control news, EU AI Act enforcement timing
- Slide 17: stalled-project $, AI sentiment polls, electrician shortage figures
- Slide 21 takeaways — align with the updated numbers

Also look for genuinely new developments from late March through April 2026 that would improve the narrative (earnings prints, major capex revisions, new hyperscaler announcements, regulatory actions, lab funding rounds). Don't pad; only swap in items that sharpen a slide.

If a number can't be verified, flag it in a comment rather than silently keeping a stale figure.

### 3. Trim the cover page

The current cover has four text blocks: "May 2026" eyebrow, "AI Markets" wordmark, a bold subtitle, a paragraph of stats, and a "Strategy Note | Equity Research" tag. Too much. Cut to roughly:
- Date eyebrow
- "AI Markets" wordmark
- A single short tagline (≤10 words) — pick the strongest line and kill the rest
- Tag line

Make the typography do more of the work. Consider a larger wordmark, more whitespace, and a single accent element (rule, color block, or image placeholder) to anchor it.

### 4. Fix formatting issues and improve design

Review every slide in the rendered JPGs (open `slides/Slide*.JPG`) and look for:
- Text overflow or clipping (tight boxes where copy runs to the edge)
- Awkward line breaks on headlines
- Inconsistent padding between cards
- Misaligned elements (check `x` coords across repeated card grids)
- Color-theme consistency (theme tag color should match the section's visual accents on that slide)
- Source lines that overlap the dark footer band
- Charts where data labels collide with the top of the plot area

Specific slides to scrutinize — these have had the most density complaints historically:
- Slide 2 (agenda) — 5 cards cramped; consider spacing tweaks
- Slide 5 (11-layer stack) — rows are tight; check vertical rhythm
- Slide 13 (divergence) — three panels stacked on the right, easy to get misaligned
- Slide 16 (policy) — three columns with bullets; bullets sometimes wrap oddly
- Slide 21 (takeaways) — four rows, 0.62 inches each; check body copy doesn't overflow

General design upgrades to consider:
- More generous whitespace around headlines
- A consistent subhead length limit (one line ideally, two max)
- Stronger visual hierarchy on big-number slides — the label text is often competing with the number
- Consider a subtle hairline divider under every headline for consistency

### 5. Add image placeholders

Several slides would benefit from imagery but currently have none. Add placeholder shapes (light gray rectangle with a centered "IMAGE: <brief description>" label in medium gray, something like fontSize 10, italic) wherever a photo, chart screenshot, product shot, or diagram would strengthen the slide. Candidates:
- Cover — a hero image placeholder anchored right side or full-bleed behind the wordmark
- Slide 6 (supply chain) — world map placeholder
- Slide 7 (power) — data-center / power-plant image
- Slide 12 (agentic AI) — agent UI screenshot or diagram
- Slide 18 (orbital compute) — orbital data-center render
- Slide 19 (physical AI) — humanoid robot photo
- Slide 20 (autonomous vehicles) — AV sensor-visualization or fleet photo

Use a consistent helper (add one to `build-deck.js` near the other helpers) so every placeholder looks identical. The placeholder should clearly read as "drop an image here" to a human reviewer — don't make it look like a finished design element.

### 6. Rebuild and verify

After edits:
1. `npm run build` — confirms `build-deck.js` runs cleanly and writes `ai-markets-deck.pptx`
2. Re-run `export-slides.ps1` if on Windows, OR use another PPTX→image path you have available, to refresh `slides/Slide*.JPG`. If you can't re-export, say so explicitly and skip that step — don't leave stale JPGs pretending to be current.
3. Open each refreshed JPG and visually check for formatting regressions
4. If you've changed the slide count, update `TOTAL` in `index.html` and the page-number arg in each `addFooter` call
5. Confirm `index.html` title, header text, and meta description all say "May 2026"

## Constraints

- Keep the BII visual language — don't rebrand.
- Keep the file layout. `build-deck.js` stays the single source of truth.
- Don't add runtime dependencies beyond what's in `package.json` unless necessary; if you do, explain why.
- Don't change `vercel.json` or deployment config.
- If any source can't be verified, leave a `// TODO: verify` comment rather than inventing a number.
- Placeholders should be visually obvious, not mistaken for final design.

## Deliverable

Updated `build-deck.js`, updated `index.html`, refreshed `slides/*.JPG` (or a clear note if they couldn't be re-exported), and a rebuilt `ai-markets-deck.pptx`. Summarize what changed at the end — date updates, data refreshes (with sources), cover rewrite, formatting fixes by slide, and placeholders added.

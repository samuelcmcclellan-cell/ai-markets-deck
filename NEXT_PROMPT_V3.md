# Claude Code prompt — AI Markets deck, design-quality revision pass

You're working on a slide-deck web app in this repo. Deliverable: a polished next draft with a rebuilt slide-9 valuation chart (backed by real data), and a broader set of image placeholders across the deck — each paired with an exact image-generation prompt I can run to produce the art. Treat this as a design-quality pass, not a text edit. Use the `bii-deck` and `update-equity-returns` skills — read both before you start.

## What the project is

A ~22-slide presentation titled **"AI Markets — May 2026"**, built in a BII (BlackRock-inspired Institutional) visual style with pptxgenjs, served as a static Vercel site.

Key files:
- `build-deck.js` — single source of truth; generates `ai-markets-deck.pptx`. All slide content, layout, and styling lives here.
- `export-slides.ps1` — exports the .pptx to JPGs in `slides/Slide1.JPG` … via PowerPoint COM (Windows).
- `index.html` — the viewer. Hardcodes `TOTAL`, the title, and the download link. Displays the JPGs.
- `slides/` — exported JPGs served to the web viewer.
- `package.json` — `npm run build` runs `node build-deck.js`.
- `vercel.json` — deploy config; don't touch.

Brand system in `build-deck.js`:
- Colors: `C.yellow` (cover), `C.orange` (primary accent), `C.black`, `C.gold`, `C.red`, `C.darkGray`, `C.medGray`, `C.lightGray`, plus section-theme colors — LANDSCAPE=teal, MARKET=gold, SHIFTS=orange, RISKS=red, FRONTIER=pink.
- Typography: Arial / Arial Black. 16:9 layout (10 × 5.625 in).
- Helpers already defined: `addFooter`, `addThemeTag`, `addHeadline`, `addSubhead`, `addHeadlineRule`, `addImagePlaceholder(slide, x, y, w, h, description)`, `addChartTitle`, `addSource`, `makeBigNumber`, `barOpts`, `lineOpts`.
- Every non-cover slide has a theme tag (top-right), headline, subhead, source line, and dark footer with the page number.

---

## Task 1 — Rebuild the slide 9 right-hand chart with real data

**Problem.** Slide 9 ("Earnings & valuations.") has two panels. The left bar chart (Tech vs Non-Tech on Revenue Growth / Op Margin / P/E) is fine — leave it. The right-hand scatter plot currently uses made-up indicative points, overlapping quadrant shading, axis-title collisions, white tech dots rendered on a white panel, and a clipped "Expensive for low growth" label. It reads poorly. Throw it out and replace with a cleanly designed chart built on **actual research**.

**Research requirement.** Identify the top 20 companies in the world by market cap (as of mid-April 2026 — use real numbers, not assumptions). For each, pull:
- **2026E revenue** and **2027E revenue** → compute **forward revenue growth** (2027E / 2026E − 1) as a percentage
- **2026E forward P/E** (price ÷ 2026E EPS consensus)
- Sector/category (Tech vs Non-Tech — define Tech as hardware/semis, software, internet platforms, cloud; everything else is Non-Tech)

Use Bloomberg/FactSet/Refinitiv consensus via web sources (company IR pages, YCharts, Koyfin, macrotrends, Seeking Alpha consensus tables, WSJ Markets estimates pages). Record the source for each data point in an inline JS object comment so I can spot-check. If a forward estimate is unavailable for a given firm, substitute the next-largest company by market cap and note the swap.

**Chart design.** Rebuild as a **labeled scatter**:
- X axis: Forward revenue growth (2026→2027), range −5% to +50%
- Y axis: Forward P/E (2026E), range 0 to 50 (clip outliers and label them at the edge)
- Two marker colors: Tech = `C.orange`, Non-Tech = `C.darkGray`. No white-on-white dots.
- Marker size scaled by market cap (min 6pt, max 14pt) — this adds an information dimension the current chart lacks
- Every point gets a small ticker label (e.g. "NVDA", "AAPL") rendered as an adjacent `addText` box, NOT inside the bubble. Use fontSize 8, Arial, color `C.darkGray`, offset +0.05 x / −0.02 y from the point. For points that would collide, nudge labels manually — hard-coded offsets are fine.
- Subtle quadrant shading only on the bottom-left (expensive for low growth) in `FBEAEA` at 60% alpha-equivalent (use a near-white tint). Remove the yellow top-right shading — it fights the orange markers.
- Axis titles BELOW the chart (x) and LEFT of the chart (y), not overlapping the legend. Use separate `addText` boxes rather than pptxgenjs' built-in axis titles if that's what's causing the collision.
- Chart title: "Top 20 global companies — forward P/E vs revenue growth"
- Source line: list the actual sources used, with an as-of date in late April 2026.

**Payoff band** (dark gray strip at bottom of slide): replace with a data-driven one-liner derived from what the chart actually shows — e.g. "Tech median fwd P/E {X}× on {Y}% growth; Non-Tech {A}× on {B}% growth." Fill in with real medians from the data.

Commit the data as a top-level `const TOP20 = [ … ]` array near the other data so it's auditable, and drive both the chart and the payoff band from it.

---

## Task 2 — Expand image placeholders AND emit the image prompts

**Goal.** The deck is text-heavy. Add more image placeholders across the deck, and for EACH placeholder, provide the exact text-to-image prompt I should run to produce the final art. Prompts should target a modern text-to-image model (Midjourney v7 / Flux / DALL·E 3 style syntax — rich, specific, cinematic when appropriate).

**Placeholder helper** already exists: `addImagePlaceholder(slide, x, y, w, h, description)`. Keep the visual treatment (dashed gray rectangle with "IMAGE: …" label) so human reviewers can tell it's a placeholder, not finished art. Widen the `description` string to include a one-line summary — the full prompt lives separately.

**Where to add placeholders.** Audit every slide. Add a placeholder wherever a photo, render, diagram, or product shot would materially strengthen the slide — don't stuff images where prose is working. At minimum consider:
- Slide 1 (cover) — already has one; review sizing and possibly expand to full-bleed behind the wordmark
- Slide 2 (agenda) — small section-thumbnail strip (5 small placeholders, one per section)
- Slide 3 / 4 (LANDSCAPE intro, what AI is) — conceptual hero image
- Slide 5 (the stack) — no image; consider a right-side rendered tower/stack motif
- Slide 6 (supply chain) — world map placeholder with flow arrows
- Slide 7 (power) — data-center / power-plant photo
- Slide 8 (semi market / buyers) — photographic placeholder if space allows
- Slide 10 / 11 (HBM, the labs) — product shot (HBM stack macro) or lab logo row
- Slide 12 (agentic AI) — already has one; review
- Slide 14 (bubble test) — archival dot-com era photo vs modern split
- Slide 15 (supply-chain fragility) — single hero: TSMC Fab 18 or Taiwan Strait
- Slide 16 (policy) — Capitol / Brussels skyline
- Slide 17 (backlash) — protest / op-ed montage
- Slide 18 (orbital compute) — already has one
- Slide 19 (physical AI) — already has one
- Slide 20 (autonomous vehicles) — already has one
- Slide 21 (takeaways) — optional tonal closer

Don't add a placeholder just because a slide lacks one; only add where a viewer would think "this slide would sing with imagery."

**Deliverable: image-prompt manifest.** Create a new file `IMAGE_PROMPTS.md` in the repo root with one entry per placeholder in the final deck. Format:

```
## Slide N — <short name> — <placeholder description>
**Location:** x=..., y=..., w=..., h=... (aspect ratio: …)
**Style:** <cinematic photo | editorial render | isometric illustration | map diagram | …>
**Prompt:**
<the full text-to-image prompt, 40–120 words, specific about composition, lighting, lens, color palette, mood, and what to exclude>
**Negative / avoid:** <anything to steer away from — e.g. "no text, no logos, no watermarks, no humans">
**Aspect ratio:** <16:9 | 1:1 | 4:5 | …> (match the placeholder box)
```

Prompt style guidance — each prompt should:
- Lead with medium ("Cinematic editorial photograph" / "High-detail 3D render" / "Flat isometric vector illustration")
- Specify composition and subject with concrete nouns
- Name a color palette that harmonizes with the deck (`orange` accent, muted grays, near-black shadows) — avoid competing primaries unless justified
- Specify lighting (dramatic side-lit, overcast softbox, warm golden-hour, sterile fluorescent)
- Include a camera or lens reference for photographs ("shot on Leica SL3, 50mm, f/1.8")
- Append aspect ratio flag if relevant ("--ar 16:9")
- End with negatives: "no text, no logos, no watermarks, no visible branding, no extra limbs"

Make the prompts consistent so the resulting images feel like one art direction, not a grab bag.

---

## Task 3 — Rebuild and verify

After edits:
1. `npm run build` — confirm `build-deck.js` runs cleanly and writes `ai-markets-deck.pptx`
2. If Windows is available, re-run `export-slides.ps1` to refresh `slides/Slide*.JPG`. If not, say so and skip — don't leave stale JPGs
3. Open the refreshed Slide9.JPG and confirm: no overlapping labels, no white dots on white background, axis titles readable, quadrant shading subtle, ticker labels legible, payoff band reflects real medians
4. If slide count changed, update `TOTAL` in `index.html` and the `addFooter` page-number arg on each slide
5. Summarize changes at the end: data sources used for slide 9, slide-by-slide placeholders added, and confirm `IMAGE_PROMPTS.md` exists

## Constraints

- Keep the BII visual language — don't rebrand
- `build-deck.js` stays the single source of truth
- No new runtime dependencies unless justified
- Don't touch `vercel.json`
- If a data point can't be verified, leave a `// TODO: verify` comment with the source you attempted — do NOT invent a number
- Placeholders must still read as placeholders, not finished design

## Deliverable

Updated `build-deck.js` (with `const TOP20 = [...]` data block + rebuilt slide 9 right-panel + new placeholders), new `IMAGE_PROMPTS.md` manifest, rebuilt `ai-markets-deck.pptx`, refreshed `slides/*.JPG` (or a note), and a summary report.

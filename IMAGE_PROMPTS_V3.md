# Image prompts — v5 deck (isometric)

Copy each prompt into ChatGPT (or any text-to-image model), generate a **16:9** image
(square-ish for the frontier cards), and save it to `slides-images/web/` under the
**exact filename** below. `build-deck.js` auto-detects each file: if present it places
the image; if missing it renders the prompt as an on-slide placeholder. So you can
build/preview at any point and fill in images incrementally. After dropping images in:

```
node build-deck.js          # picks up whatever images now exist
# …re-export the JPGs (export-slides.ps1 / inline PowerPoint COM)
node validate-deck.js       # must pass (writes slides/EXPORT_STAMP.txt)
git add -A && git commit && git push
```

**Shared style (already baked into each prompt):** isometric 3D illustration, clean
low-poly vector style, near-black background (#111114), soft studio lighting, subtle
floor grid, single centered subject, generous negative space, **no text, no words, no
logos, no watermark.**

> **Slides 4 (agentic loop + Jevons) and 8 (orchestrator → N agents) are now built as
> native, labeled infographics inside the deck — they need no image.** Text-to-image
> models garble labels, so those information-carrying diagrams are drawn natively for
> accuracy. The 10 prompts below are the illustrative/scene slots.

---

## Slide 1 — Cover → `cover.png`  (accent: yellow/orange)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A financial district at night where the skyscrapers are stacked GPU server-racks; a glowing candlestick stock-chart runs like a road along their base, and a curved arrow of capital flows from a domed bank building into the single tallest GPU tower. Orange and yellow glowing accents, soft studio lighting, subtle floor grid, 16:9. No text, no logos, no watermark.

## Slide 2 — Capability icon → `shift-capability.png`  (accent: teal)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A robotic arm on a small circular conveyor picking up a glowing cube, spotting a flaw in it, and placing it back to retry — a literal self-correcting work loop. Teal glowing accents, soft studio lighting, subtle floor grid, centered single subject, 16:9. No text, no logos, no watermark.

## Slide 2 — Economics icon → `shift-economics.png`  (accent: orange)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A coin-operated electricity meter wired into a GPU, its dial pushed near a red limit line, with a small rationed stack of glowing token-coins beside it (metered, scarce compute). Orange glowing accents, soft studio lighting, subtle floor grid, centered, 16:9. No text, no logos, no watermark.

## Slide 2 — Policy icon → `shift-policy.png`  (accent: purple)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A capitol dome beside a server-rack tower; a giant government hand plants a flag stamped with a percent sign on the tower while an official wax seal hovers over a glowing microchip (the state taking a stake). Purple glowing accents, soft studio lighting, subtle floor grid, centered, 16:9. No text, no logos, no watermark.

## Slide 5 — Token rationing → `token-budget.png`  (accent: orange/gold)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A guarded vault dispensing only a small rationed handful of glowing tokens onto a conveyor belt that feeds a row of waiting laptops; an "allocation" valve visibly throttles the flow (scarcity and rationing). Orange and gold glowing accents, soft studio lighting, subtle floor grid, 16:9. No text, no logos, no watermark.

## Slide 6 — Sovereign stake → `gov-stake.png`  (accent: purple)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A giant government hand planting a flag bearing a percentage symbol atop a glowing server-rack skyscraper, while a chute rains small dividend coins down onto a cluster of tiny suburban houses below. Purple glowing accents, soft studio lighting, subtle floor grid, 16:9. No text, no logos, no watermark.

## Slide 11 — Embodiment → `frontier-embodiment.png`  (accent: pink)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A humanoid robot carrying a labeled tote down a numbered warehouse aisle lined with shelving racks, captured mid-stride. Pink/magenta glowing accents, soft studio lighting, subtle floor grid, centered single subject, square-ish framing (card crop). No text, no logos, no watermark.

## Slide 11 — Wheels → `frontier-wheels.png`  (accent: pink)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A driverless robotaxi with a spinning lidar turret and glowing sensor cones, stopped at a small city intersection with a traffic light and crosswalk. Pink/magenta glowing accents, soft studio lighting, subtle floor grid, centered single subject, square-ish framing. No text, no logos, no watermark.

## Slide 11 — Orbit → `frontier-orbit.png`  (accent: pink)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A ring-shaped orbital data-center with unfolded solar-panel wings and stacked server modules, floating above the curved horizon of Earth with sparse stars behind it. Pink/magenta glowing accents, soft studio lighting, centered single subject, square-ish framing. No text, no logos, no watermark.

## Slide 11 — Proteins → `frontier-proteins.png`  (accent: pink)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A robotic pipette arm in a lab assembling a glowing folded-protein ribbon and double-helix on a sample platform, with small vials arranged around it. Pink/magenta glowing accents, soft studio lighting, subtle floor grid, centered single subject, square-ish framing. No text, no logos, no watermark.

---

### Notes
- Filenames are matched **exactly** by `build-deck.js` (`addArt` → `slides-images/web/<file>`). `.png` is assumed; if you save `.jpg`, update the filename in the matching `addArt({ file: ... })` call.
- **Native infographics (no image needed):** slide 4 (TRY→FAIL→FIX→SHIP loop + Jevons escalation ladder) and slide 8 (one orchestrator → RESEARCH/BUILD/TEST/SHIP agents) are drawn in-deck.
- **Chart/table-led (no image needed):** slide 3 (matrix), 7 (equities), 9 (bonds), 10 (portfolio), 12 (sources).
- The old photographic frontier images (`humanoid.jpg`, `robotaxi.jpg`, `orbital.jpg`, `protein.jpg`) are **no longer referenced** — the deck now points at the `frontier-*.png` isometric versions for a cohesive look.

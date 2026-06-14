# Image prompts — v5 deck (isometric)

Copy each prompt into ChatGPT (or any text-to-image model), generate a **16:9** image,
and save it to `slides-images/web/` under the **exact filename** below. `build-deck.js`
auto-detects each file: if present it places the image; if missing it renders the
prompt as an on-slide placeholder. So you can build/preview at any point and fill in
images incrementally. After dropping images in, run:

```
node build-deck.js          # picks up whatever images now exist
# …re-export the JPGs (export-slides.ps1 / inline PowerPoint COM)
node validate-deck.js       # must pass (writes slides/EXPORT_STAMP.txt)
git add -A && git commit && git push
```

**Shared style (already baked into each prompt below):** isometric 3D illustration,
clean low-poly vector style, near-black background (#111114), soft studio lighting,
subtle floor grid, single centered subject, generous negative space, 16:9 composition,
**no text, no words, no logos, no watermark.**

> The deck reads fine with the placeholders in place — images are an enhancement, not a blocker.

---

## Slide 1 — Cover → `cover.png`  (accent: yellow/orange)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A small financial district where the skyscrapers are built from stacked GPU and circuit-board blocks; glowing orange and yellow data streams flow between the towers like trading activity. Soft studio lighting, subtle floor grid, centered, generous negative space, 16:9. No text, no logos, no watermark.

## Slide 2 — Capability icon → `shift-capability.png`  (accent: teal)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A small robotic arm assembling a glowing cube inside a continuous looping track (an autonomous self-correcting work loop). Teal glowing accents, soft studio lighting, subtle floor grid, centered single subject, 16:9. No text, no logos, no watermark.

## Slide 2 — Economics icon → `shift-economics.png`  (accent: orange)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A utility/fuel meter dispensing glowing token-coins through a tube into a laptop — the feeling of metered, rationed compute. Orange glowing accents, soft studio lighting, subtle floor grid, centered, 16:9. No text, no logos, no watermark.

## Slide 2 — Policy icon → `shift-policy.png`  (accent: purple)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A neoclassical government/capitol building with a glowing microchip resting on its roof, and a small flag planted in a server rack beside it (the state taking a stake in compute). Purple glowing accents, soft studio lighting, subtle floor grid, centered, 16:9. No text, no logos, no watermark.

## Slide 4 — Loops + Jevons → `loops-jevons.png`  (accent: teal)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). On the left, an infinity-shaped pipeline made of four interlocking gears arranged in a loop (try → fail → fix → ship). On the right, an ascending staircase of stacked, glowing server-rack blocks that grows taller toward the right edge, suggesting runaway compute demand. Teal glowing accents, soft studio lighting, subtle floor grid, 16:9. No text, no logos, no watermark.

## Slide 5 — Token budget → `token-budget.png`  (accent: orange/gold)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A fuel-pump-style "token budget" dispenser with a glowing numeric meter, piping a controlled stream of light into a laptop, while a near-empty reservoir tank sits behind it conveying scarcity. Orange and gold glowing accents, soft studio lighting, subtle floor grid, centered, 16:9. No text, no logos, no watermark.

## Slide 6 — Sovereign stake → `gov-stake.png`  (accent: purple)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A government capitol building and a sleek corporate AI tower connected by a glowing bridge formed from equity/share certificates and a handshake; a single "dividend" coin rolls down a ramp toward a cluster of tiny houses. Purple glowing accents, soft studio lighting, subtle floor grid, 16:9. No text, no logos, no watermark.

## Slide 8 — Orchestrator + agents → `labor-orchestrator.png`  (accent: teal)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A single human figure at a control console, glowing connection lines fanning out to many small agent-robots working in parallel at separate stations (research, build, test, ship). One orchestrator directing a team of agents. Teal glowing accents, soft studio lighting, subtle floor grid, centered, 16:9. No text, no logos, no watermark.

## Slide 11 — Embodiment → `frontier-embodiment.png`  (accent: pink)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A humanoid robot working on a warehouse floor among shelving and totes, mid-task. Pink/magenta glowing accents, soft studio lighting, subtle floor grid, centered single subject, square-ish framing (card crop). No text, no logos, no watermark.

## Slide 11 — Wheels → `frontier-wheels.png`  (accent: pink)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). An autonomous robotaxi with a glowing sensor halo / lidar ring, parked on a small city block tile. Pink/magenta glowing accents, soft studio lighting, subtle floor grid, centered single subject, square-ish framing. No text, no logos, no watermark.

## Slide 11 — Orbit → `frontier-orbit.png`  (accent: pink)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). An orbital data-center satellite with large unfolded solar panels and server modules, floating above the curve of Earth. Pink/magenta glowing accents, soft studio lighting, stars sparse in background, centered single subject, square-ish framing. No text, no logos, no watermark.

## Slide 11 — Proteins → `frontier-proteins.png`  (accent: pink)
Isometric 3D illustration, clean low-poly vector style, near-black background (#111114). A robotic laboratory arm assembling a glowing folded-protein / molecular ribbon structure on a platform. Pink/magenta glowing accents, soft studio lighting, subtle floor grid, centered single subject, square-ish framing. No text, no logos, no watermark.

---

### Notes
- Filenames are matched **exactly** by `build-deck.js` (`addArt` → `slides-images/web/<file>`). `.png` is assumed above; if you save `.jpg`, update the filename in the matching `addArt({ file: ... })` call.
- The four old photographic frontier images (`humanoid.jpg`, `robotaxi.jpg`, `orbital.jpg`, `protein.jpg`) are **no longer referenced** — the deck now points at the `frontier-*.png` isometric versions for a cohesive look. Delete the old ones once you're happy, or reuse a name if you'd rather keep a photo.
- Slides 3 (matrix), 7 (equities), 9 (bonds), 10 (portfolio) and 12 (sources) are intentionally **chart/table-led** and need no images.

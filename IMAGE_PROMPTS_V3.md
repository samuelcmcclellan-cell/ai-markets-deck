# Image prompts — v5 deck

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

**Shared style (already baked into each prompt):** clean modern editorial illustration
with natural perspective (not isometric), near-black background (#111114), soft cinematic
studio lighting, minimal and polished, single centered subject, **no text, no words, no
logos, no watermark.**

> **Native diagrams (no image needed):** slide 2 (three "from → to" shift cards), slide 4
> (agentic loop + Jevons escalation ladder) and slide 8 (one orchestrator → N agents) are
> drawn in-deck with accurate labels. **Chart/table-led (no image):** slides 3, 7, 9, 10, 12.
> Only the 7 illustrative/scene slots below need generated images.

---

## Slide 1 — Cover → `cover.png`  (accent: yellow/orange)
Clean modern editorial illustration with natural perspective (not isometric), near-black background (#111114). A nighttime financial district where the skyscrapers are stacked GPU server-racks; a glowing candlestick stock-chart runs like a road along their base, and a luminous arrow of capital flows from a domed bank building into the single tallest GPU tower. Orange and yellow glowing accents, soft cinematic lighting, 16:9. No text, no logos, no watermark.

## Slide 5 — Token rationing → `token-budget.png`  (accent: orange/gold)
Clean modern editorial illustration with natural perspective (not isometric), near-black background (#111114). A guarded vault dispensing only a small rationed handful of glowing tokens onto a conveyor belt that feeds a row of waiting laptops; an "allocation" valve visibly throttles the flow, conveying scarcity and rationing. Orange and gold glowing accents, soft cinematic lighting, 16:9. No text, no logos, no watermark.

## Slide 6 — Sovereign stake → `gov-stake.png`  (accent: purple)
Clean modern editorial illustration with natural perspective (not isometric), near-black background (#111114). A giant government hand planting a flag bearing a percentage symbol atop a glowing server-rack skyscraper, while a chute rains small dividend coins down onto a cluster of tiny suburban houses below. Purple glowing accents, soft cinematic lighting, 16:9. No text, no logos, no watermark.

## Slide 11 — Embodiment → `frontier-embodiment.png`  (accent: pink)
Clean modern editorial illustration with natural perspective (not isometric), near-black background (#111114). A humanoid robot carrying a labeled tote down a numbered warehouse aisle lined with shelving racks, captured mid-stride. Pink/magenta glowing accents, soft cinematic lighting, single centered subject, square-ish framing (card crop). No text, no logos, no watermark.

## Slide 11 — Wheels → `frontier-wheels.png`  (accent: pink)
Clean modern editorial illustration with natural perspective (not isometric), near-black background (#111114). A driverless robotaxi with a spinning lidar turret and glowing sensor cones, stopped at a small city intersection with a traffic light and crosswalk. Pink/magenta glowing accents, soft cinematic lighting, single centered subject, square-ish framing. No text, no logos, no watermark.

## Slide 11 — Orbit → `frontier-orbit.png`  (accent: pink)
Clean modern editorial illustration with natural perspective (not isometric), near-black background (#111114). A ring-shaped orbital data-center with unfolded solar-panel wings and stacked server modules, floating above the curved horizon of Earth with sparse stars behind it. Pink/magenta glowing accents, soft cinematic lighting, single centered subject, square-ish framing. No text, no logos, no watermark.

## Slide 11 — Proteins → `frontier-proteins.png`  (accent: pink)
Clean modern editorial illustration with natural perspective (not isometric), near-black background (#111114). A robotic pipette arm in a lab assembling a glowing folded-protein ribbon and double-helix on a sample platform, with small vials arranged around it. Pink/magenta glowing accents, soft cinematic lighting, single centered subject, square-ish framing. No text, no logos, no watermark.

---

### Notes
- Filenames are matched **exactly** by `build-deck.js` (`addArt` → `slides-images/web/<file>`). `.png` is assumed; if you save `.jpg`, update the filename in the matching `addArt({ file: ... })` call.
- The old photographic frontier images (`humanoid.jpg`, `robotaxi.jpg`, `orbital.jpg`, `protein.jpg`) are **no longer referenced** — the deck now points at the `frontier-*.png` versions.
- Until you generate an image, its slot renders an on-slide placeholder showing the prompt — the deck is fully presentable in that state.

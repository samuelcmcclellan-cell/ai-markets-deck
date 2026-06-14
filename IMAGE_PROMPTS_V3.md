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

**House style (baked into every prompt):** detailed modern editorial 3D illustration,
polished semi-realistic render, slight three-quarter camera angle, deep near-black studio
background (#111114), soft volumetric lighting with gentle rim light, glossy and matte
materials, cinematic depth, premium financial-tech mood, single hero subject with generous
negative space, **no text, no words, no logos, no watermark.**

> **Native diagrams (no image needed):** slide 2 (three "from → to" shift cards), slide 4
> (agentic loop + Jevons escalation ladder), slide 8 (one orchestrator → N agents).
> **Chart/table-led (no image):** slides 3, 7, 9, 10, 12. Only the 7 slots below need art.

---

## Slide 1 — Cover → `cover.png`  (accent: yellow/orange)
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter aerial angle. A compact nighttime financial district where the skyscrapers are built from stacked GPU cards and server-rack modules studded with tiny glowing status LEDs; a luminous candlestick stock-chart winds through the streets like a glowing highway of green and red bars; a bright ribbon-arrow of capital arcs up from a domed classical bank building into the single tallest GPU tower at the center. Deep near-black backdrop (#111114), soft volumetric lighting and subtle atmospheric haze, glossy reflective streets, warm orange and gold glowing accents balanced by cool blue server light, cinematic depth, premium and polished. 16:9, balanced composition, single hero cityscape. No text, no words, no logos, no watermark.

## Slide 5 — Token rationing → `token-budget.png`  (accent: orange/gold)
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A heavy guarded bank-style vault with a thick round door; its small slot dispenses only a meager rationed handful of glowing coin-like tokens onto a conveyor belt that carries them downstream to a row of waiting open laptops; a prominent brass "allocation" valve mid-belt visibly throttles the flow, and a near-empty reservoir tank sits behind to convey scarcity. Deep near-black backdrop (#111114), soft volumetric lighting with gentle rim light, glossy metal and matte rubber materials, warm orange and gold glowing accents, cinematic and premium. 16:9, single clear focal scene. No text, no words, no logos, no watermark.

## Slide 6 — Sovereign stake → `gov-stake.png`  (accent: purple)
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A colossal stylized government hand emerging from soft shadow to plant a tall flag bearing a single glowing percentage symbol atop a luminous server-rack skyscraper; from a chute on the building's side, a steady stream of small dividend coins rains down onto a neat cluster of tiny suburban houses at the base. Deep near-black backdrop (#111114), soft volumetric lighting, glossy and matte surfaces, regal purple glowing accents with subtle gold coin highlights, cinematic depth, premium and editorial. 16:9, balanced composition. No text, no words, no logos, no watermark.

## Slide 11 — Embodiment → `frontier-embodiment.png`  (accent: pink)
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A sleek modern humanoid robot captured mid-stride down a numbered warehouse aisle, carrying a labeled storage tote; tall shelving racks stacked with boxes recede on either side under cool industrial lighting. Deep near-black backdrop (#111114), soft volumetric lighting with a rim light tracing the robot, glossy white-and-brushed-metal robot finish, pink/magenta glowing accents, cinematic and premium. Square-ish framing (card crop), single hero subject. No text, no words, no logos, no watermark.

## Slide 11 — Wheels → `frontier-wheels.png`  (accent: pink)
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A sleek driverless robotaxi stopped at a small city intersection, a spinning lidar turret on its roof emitting faint glowing scanning cones; a traffic light and a striped crosswalk anchor the scene, with soft reflections on damp asphalt. Deep near-black backdrop (#111114), soft volumetric lighting, glossy car paint and clear glass, pink/magenta glowing accents, cinematic and premium. Square-ish framing (card crop), single hero subject. No text, no words, no logos, no watermark.

## Slide 11 — Orbit → `frontier-orbit.png`  (accent: pink)
Detailed modern editorial 3D illustration, polished semi-realistic render. A ring-shaped orbital data-center with broad unfolded solar-panel wings and stacked server modules around its rim, floating in space above the gently curved, faintly glowing horizon of Earth, a sparse scattering of stars behind it. Deep near-black space backdrop (#111114), soft volumetric sunlight catching the panels and a rim light along Earth's atmosphere, glossy metallic and solar-cell materials, pink/magenta glowing accents, cinematic and premium. Square-ish framing (card crop), single hero subject. No text, no words, no logos, no watermark.

## Slide 11 — Proteins → `frontier-proteins.png`  (accent: pink)
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A precise robotic pipette arm in a clean lab assembling a glowing folded-protein ribbon and a luminous DNA double-helix on a sample platform; small glass vials and a subtle hex-grid lab surface surround it. Deep near-black backdrop (#111114), soft volumetric lighting, glossy lab equipment and translucent glowing biomolecules, pink/magenta glowing accents, cinematic and premium. Square-ish framing (card crop), single hero subject. No text, no words, no logos, no watermark.

---

### Notes
- Filenames are matched **exactly** by `build-deck.js` (`addArt` → `slides-images/web/<file>`). `.png` is assumed; if you save `.jpg`, update the filename in the matching `addArt({ file: ... })` call.
- The old photographic frontier images (`humanoid.jpg`, `robotaxi.jpg`, `orbital.jpg`, `protein.jpg`) are **no longer referenced** — the deck now points at the `frontier-*.png` versions.
- Until you generate an image, its slot renders an on-slide placeholder showing a short version of the prompt — the deck is fully presentable in that state.

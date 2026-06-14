# Image prompts — v5 deck

Copy each prompt into ChatGPT (or any text-to-image model), generate a **16:9** image
(square-ish for the frontier cards), and save it to `slides-images/web/` under the
**exact filename** below. `build-deck.js` auto-detects each file: if present it places
the image; if missing it renders the prompt as an on-slide placeholder. After dropping
images in:

```
node build-deck.js          # picks up whatever images now exist
# …re-export the JPGs (export-slides.ps1 / inline PowerPoint COM)
node validate-deck.js       # must pass (writes slides/EXPORT_STAMP.txt)
git add -A && git commit && git push
```

**House style (baked into every prompt):** detailed modern editorial 3D illustration,
polished semi-realistic render, slight three-quarter angle, deep near-black studio
background (#111114), brushed-silver and white materials, soft even lighting, **bright,
optimistic, BlackRock-style institutional palette — never dark or ominous**, single hero
subject, **no text, no words, no logos, no watermark.**

**Palette (BII):** warm orange `#F6693D` (signature) + amber-gold `#FFB800` carry most
images; market scenes add green `#00A854` / red `#CC0000` (up/down); the frontier cards use
magenta-pink `#E8478D` (a BII tertiary) over a warm-orange base.

> **Native diagrams (no image needed):** slide 2 (three "from → to" shift cards), slide 4
> (agentic loop + Jevons ladder), slide 8 (orchestrator → N agents). **Chart/table-led:**
> slides 3, 7, 9, 10, 12. Only the 7 slots below need art.

---

## Slide 1 — Cover → `cover.png`
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter aerial angle. A bright, optimistic financial district lit against a deep near-black sky, its skyscrapers built from stacked GPU cards and server-rack modules with tiny glowing status lights; a candlestick stock-chart winds through the streets like a lit highway, green (#00A854) up-bars and red (#CC0000) down-bars; a luminous ribbon-arrow of capital arcs up from a domed classical bank building into the single tallest tower. Deep near-black backdrop (#111114), brushed-silver and glass materials, warm orange (#F6693D) and amber-gold (#FFB800) glowing accents, soft even lighting, clean and confident. 16:9, balanced composition. No text, no words, no logos, no watermark.

## Slide 5 — Token rationing → `token-budget.png`
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A clean, orderly allocation / metering station that dispenses a measured handful of glowing coin-like tokens onto a conveyor belt feeding a tidy row of open laptops; a clear circular dial on the front shows a set budget level — modern, managed and calm, not grim or scarce. Deep near-black backdrop (#111114), brushed-silver and white materials, warm orange (#F6693D) and amber-gold (#FFB800) glowing accents, soft even lighting, premium and optimistic. 16:9. No text, no words, no logos, no watermark.

## Slide 6 — Sovereign stake → `gov-stake.png`
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A classical domed government building and a modern glass-and-server data-center tower standing side by side on a clean, sunny plaza, joined by a bright elevated walkway; along the walkway, small glowing "dividend" coins travel toward a tidy row of friendly little houses — an optimistic, balanced public-private partnership. Deep near-black backdrop (#111114), brushed-silver, glass and warm-stone materials, warm orange (#F6693D) and amber-gold (#FFB800) glowing accents, soft even lighting. 16:9, balanced composition. No text, no words, no logos, no watermark.

## Slide 11 — Embodiment → `frontier-embodiment.png`
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A friendly, sleek white-and-brushed-silver humanoid robot walking upright down a bright, well-lit numbered warehouse aisle, carrying a labeled storage tote; neat shelving stacked with boxes recedes on either side. Approachable and modern, not uncanny. Deep near-black backdrop (#111114), magenta-pink (#E8478D) and warm orange (#F6693D) glowing accents, soft even lighting. Square-ish framing (card crop), single hero subject. No text, no words, no logos, no watermark.

## Slide 11 — Wheels → `frontier-wheels.png`
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A sleek driverless robotaxi with a spinning lidar turret and soft glowing sensor cones, stopped at a clean, bright city intersection with a traffic light and a striped crosswalk; gentle reflections on smooth asphalt. Deep near-black backdrop (#111114), glossy car paint and clear glass, magenta-pink (#E8478D) and warm orange (#F6693D) glowing accents, soft even lighting. Square-ish framing (card crop), single hero subject. No text, no words, no logos, no watermark.

## Slide 11 — Orbit → `frontier-orbit.png`
Detailed modern editorial 3D illustration, polished semi-realistic render. A ring-shaped orbital data-center with broad unfolded solar-panel wings and stacked server modules around its rim, sunlit and gleaming above the bright, gently curved horizon of Earth, a sparse scattering of stars behind. Deep near-black space backdrop (#111114), glossy metallic and solar-cell materials, magenta-pink (#E8478D) and warm orange (#F6693D) glowing accents, soft sunlight. Square-ish framing (card crop), single hero subject. No text, no words, no logos, no watermark.

## Slide 11 — Proteins → `frontier-proteins.png`
Detailed modern editorial 3D illustration, polished semi-realistic render, slight three-quarter angle. A precise robotic lab arm assembling a glowing folded-protein ribbon and a luminous DNA double-helix on a bright, clean sample platform; small glass vials and a subtle hex-grid lab surface around it. Deep near-black backdrop (#111114), glossy lab equipment and translucent glowing biomolecules, magenta-pink (#E8478D) and warm orange (#F6693D) glowing accents, soft even lighting. Square-ish framing (card crop), single hero subject. No text, no words, no logos, no watermark.

---

### Notes
- Filenames are matched **exactly** by `build-deck.js` (`addArt` → `slides-images/web/<file>`). `.png` is assumed; if you save `.jpg`, update the filename in the matching `addArt({ file: ... })` call.
- The old photographic frontier images (`humanoid.jpg`, `robotaxi.jpg`, `orbital.jpg`, `protein.jpg`) are **no longer referenced** — the deck now points at the `frontier-*.png` versions.
- Until you generate an image, its slot renders an on-slide placeholder showing a short version of the prompt — the deck is fully presentable in that state.

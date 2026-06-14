# Image prompts — v6 deck (infographic style)

Copy each prompt into ChatGPT (or any text-to-image model), generate a **16:9** image
(square-ish for the frontier cards), and save it to `slides-images/web/` under the
**exact filename** below. `build-deck.js` auto-detects each file: if present it places
the image; if missing it renders the prompt as an on-slide placeholder. After dropping
images in:

```
node build-deck.js          # picks up whatever images now exist
# ...re-export the JPGs (export-slides.ps1 / inline PowerPoint COM)
node validate-deck.js       # must pass (writes slides/EXPORT_STAMP.txt)
git add -A && git commit && git push
```

**House style (baked into every prompt):** clean flat infographic illustration,
data-visualization aesthetic, modern and informational. Deep near-black background
(#111114), clean vector-style shapes with soft gradients, muted institutional palette
with selective bright accents, generous whitespace, organized layout with clear visual
hierarchy. **No photorealism, no dramatic lighting, no 3D renders.** No text, no words,
no logos, no watermark.

**Palette:** teal `#2BC4C4`, orange `#F6693D`, gold `#FFB800`, magenta-pink `#E8478D`
(frontier cards), muted gray `#3E3E46` for secondary elements. Deep near-black `#111114`
background, panel fills `#1C1C20`, dividers `#2A2A30`.

> **Data slides (no image needed):** slide 3 (diagnostic matrix table), slide 7
> (equity bar chart + stats), slide 9 (bond timeline + stats). **Only the 10 slots
> below need art.**

---

## Slide 1 — Cover → `cover.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: three large circular icons arranged in a gentle arc across the composition. Left icon: a chip/neural-network icon in teal (#2BC4C4) representing CAPABILITY. Center icon: a metered-gauge icon in orange (#F6693D) representing ECONOMICS. Right icon: a governance-shield icon in gold (#FFB800) representing POLICY. Thin flowing connector lines in muted gray (#2A2A30) converge from all three icons into a single bright diamond-shaped convergence point at bottom-center. Each icon sits inside a soft circular glow of its accent color. Deep near-black (#111114) background, generous whitespace, organized layout with clear visual hierarchy. 16:9 composition. No text, no words, no logos, no watermark.

## Slide 2 — Three shifts → `three-shifts.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: three equal vertical columns arranged horizontally, each showing a transformation. LEFT COLUMN (teal #2BC4C4 accent): a chat-bubble icon at top in muted gray (#3E3E46), a downward arrow in bright teal, a circular loop/cycle icon at bottom in bright teal — representing the shift from linear chat to autonomous loops. CENTER COLUMN (orange #F6693D accent): a coin/token icon with an infinity symbol at top in muted gray, a downward arrow in orange, a metered gauge showing limited supply at bottom in bright orange — representing the shift from token subsidy to token scarcity. RIGHT COLUMN (gold #FFB800 accent): a small building/company icon at top in muted gray, a downward arrow in gold, a government dome + shield icon at bottom in bright gold — representing the shift from private tech to sovereign asset. Thin vertical divider lines (#2A2A30) separate the columns. Each column has a subtle rounded-rectangle background panel (#1C1C20). Deep near-black (#111114) background, generous spacing between all elements, clean vector shapes. 16:9. No text, no words, no logos, no watermark.

## Slide 4 — Agentic loops + Jevons → `agentic-loops.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: split into two panels side by side. LEFT PANEL: a circular workflow loop with four nodes arranged clockwise — each node is a clean rounded icon: a play-button icon (try), an X-mark icon (fail), a wrench icon (fix), a rocket icon (ship). Smooth curved arrows in bright teal (#2BC4C4) connect them clockwise. A small infinity symbol sits at the center of the loop. RIGHT PANEL: four ascending bars forming a staircase from left to right, each taller than the last, in progressively brighter shades of teal from dark (#1C1C20) to bright (#2BC4C4). An upward-curving arrow in teal traces the top of the staircase, representing escalating compute demand. A thin vertical divider line (#2A2A30) separates the two panels. Deep near-black (#111114) background, clean vector shapes, generous whitespace between elements. 16:9. No text, no words, no logos, no watermark.

## Slide 5 — Token rationing → `token-budget.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: a horizontal token-flow pipeline reading left to right. On the left, a large server/cloud icon in muted gray (#3E3E46) dispenses small circular token shapes. In the center, a prominent metering gauge with a dial set to a budget level — the gauge glows orange (#F6693D) and the tokens glow gold (#FFB800). The gauge feeds a measured, controlled flow of tokens rightward into a neat row of four device/endpoint icons (laptops, phones). The flow is organized, clean, and left-to-right. The overall impression is orderly allocation, not scarcity. Deep near-black (#111114) background, clean vector shapes, generous spacing. 16:9. No text, no words, no logos, no watermark.

## Slide 6 — Sovereign stake → `gov-stake.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: a horizontal flow diagram reading left to right. On the left, a classical government-dome icon in gold (#FFB800) with a subtle shield overlay. A horizontal flow line connects it to a modern data-center/server-rack icon in orange (#F6693D) at center. From the data-center icon, branching distribution lines extend rightward, each carrying small glowing dividend-coin shapes, leading to a row of small house icons representing citizens/households. The overall composition conveys an organized public-private partnership and value distribution. Deep near-black (#111114) background, clean vector shapes, organized layout, generous spacing. 16:9. No text, no words, no logos, no watermark.

## Slide 8 — Orchestrator fan-out → `orchestrator-fanout.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: a single stylized human-silhouette icon inside a bright teal (#2BC4C4) circle positioned on the left side, representing an orchestrator. From this central node, four smooth curved lines fan out to the right, each ending at a smaller circular icon: a magnifying glass icon (research), a gear/cog icon (build), a checkmark inside a shield icon (test), and a paper airplane icon (ship). Each smaller icon is outlined in teal with a dark fill (#1C1C20). The fan-out pattern creates a clear visual of one-to-many delegation. Subtle concentric rings emanate from the central orchestrator icon, suggesting coordination and control. Deep near-black (#111114) background, clean vector shapes, generous spacing. 16:9. No text, no words, no logos, no watermark.

## Slide 10 — Embodiment → `frontier-embodiment.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: a simple robotic-arm icon in magenta-pink (#E8478D) connected by a curved directional arrow to a circular loop/cycle symbol, representing physical labor entering the compute economy. A small warehouse/factory icon sits in the background in muted gray (#3E3E46). The composition is abstract and diagrammatic, not photorealistic. Deep near-black (#111114) background, clean vector shapes, generous spacing. Square-ish framing (card crop). No text, no words, no logos, no watermark.

## Slide 10 — Wheels → `frontier-wheels.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: a minimal car silhouette icon in magenta-pink (#E8478D) with small radiating sensor-cone lines extending from its roof. Thin data-stream lines flow downward from a cloud/server icon above into the car, representing per-mile inference. A subtle road grid in muted gray (#2A2A30) lies beneath the car. The composition is abstract and diagrammatic, not photorealistic. Deep near-black (#111114) background, clean vector shapes. Square-ish framing (card crop). No text, no words, no logos, no watermark.

## Slide 10 — Orbit → `frontier-orbit.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: a simple ring/torus shape in magenta-pink (#E8478D) with small rectangular server modules arranged around its rim, floating above a gentle curved line representing Earth's horizon in muted gray (#3E3E46). Small solar-panel wing shapes extend from the ring. A power-bolt icon connects downward from the ring to a subtle grid below, representing compute escaping earth's power grid. The composition is abstract and diagrammatic. Deep near-black (#111114) background, clean vector shapes. Square-ish framing (card crop). No text, no words, no logos, no watermark.

## Slide 10 — Proteins → `frontier-proteins.png`
Clean flat infographic illustration, data-visualization aesthetic, modern and informational: a stylized folded-protein ribbon shape in magenta-pink (#E8478D) and warm orange (#F6693D), with a small DNA double-helix icon nearby. A subtle connection line leads from the protein to a compute/chip icon, representing discovery becoming compute-bound. The composition has a clean, abstract molecular-diagram aesthetic. Deep near-black (#111114) background, clean vector shapes. Square-ish framing (card crop). No text, no words, no logos, no watermark.

---

### Notes
- Filenames are matched **exactly** by `build-deck.js` (`addArt` → `slides-images/web/<file>`). `.png` is assumed; if you save `.jpg`, update the filename in the matching `addArt({ file: ... })` call.
- Until you generate an image, its slot renders an on-slide placeholder showing a short version of the prompt — the deck is fully presentable in that state.
- All prompts target a **flat infographic / data-viz** aesthetic, not the earlier 3D editorial style.

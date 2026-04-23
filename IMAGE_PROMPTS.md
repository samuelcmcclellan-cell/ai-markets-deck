# IMAGE_PROMPTS.md — "AI Markets — May 2026"

Seven images need to be generated for the deck. Each is positioned in a specific box on a specific slide, with a specific aspect ratio and mood tied to the slide's theme color:

- **SHIFTS** (slide 12) → orange accent `#F6693D`
- **RISKS** (slides 15, 17) → red `#CC0000` and amber restraint
- **FRONTIER** (slides 18, 19, 20, 21) → violet `#6B46C1`

Use ChatGPT's image tool and copy each prompt as-is. When asked for an aspect ratio, use the one noted under each prompt. Once generated, drop the JPGs or PNGs into `slides-images/` (filenames like `slide12.jpg`, `slide15.jpg`, etc.) and we'll wire them into the .pptx.

Overall art direction: **editorial research aesthetic — Bloomberg Businessweek / FT Weekend / The Atlantic cover stock, not slick corporate CGI.** Photographic realism or high-end cinematic render preferred over illustration or flat-vector. Restrained color palettes with one clear accent per image keyed to the slide theme.

---

## Shared negatives (apply to every prompt)

Neon rainbow gradients; plastic CGI sheen; "holographic brain" / "circuit-head" AI clichés; stock-photo poses and generic smiling professionals; visible text, typography, logos, or watermarks; low-res JPEG artifacts; HDR halos; lens-flare starbursts; generic "digital transformation" symbolism; AI-generated faces with garbled eyes or hands; recognizable faces of real public figures; real company branding on equipment or vehicles; readable slogans or language-specific text where the prompt calls for illegible.

---

## 1. Slide 12 — Agentic AI (SHIFTS / orange)

- **Placement on slide:** Left panel, `3.3" × 3.25"` at `(0.5, 1.85)`.
- **Aspect ratio:** 1:1 (square). Target ~1400×1400 px.
- **Accent color:** Electric orange `#F6693D`.
- **Mood:** High-fidelity product screenshot. Sleek, developer-centric, understated.

**Prompt:**

> A photorealistic screenshot of a modern code editor in dark mode, shot perfectly straight-on with no perspective distortion, as if captured by a screen-grab tool. The left sidebar shows a file tree in muted graphite; the center pane displays Python code being actively edited by an AI agent, with a subtle electric-orange glowing cursor on a line that is clearly being rewritten mid-keystroke. In the top-right of the window, a small status pill reads "Claude is editing" in white on a dark pill background. A split pane below the main code shows streaming terminal output in monospaced text — a passing test suite scrolling past with small green check marks next to each line. The programmer font is a clean typeface like JetBrains Mono or similar. The entire UI chrome is graphite (#1a1a1a to #2a2a2a) with a single accent color of electric orange (#F6693D) used only on the cursor, the "editing" pill, and one highlighted line number. No real company logos. No Claude face or avatar. No readable text beyond the intentional "Claude is editing" pill. The feel is high-fidelity and editorial — this should look like a genuine product screenshot, not an illustration. Subtle monitor glare implied by a very faint vignette at the corners. Square 1:1 composition, rendered at high resolution.

---

## 2. Slide 15 — Supply chain fragility (RISKS / red)

- **Placement on slide:** Left panel, `3.5" × 3.3"` at `(0.5, 1.85)`.
- **Aspect ratio:** Slightly portrait, roughly 11:10 (near-square). Target ~1500×1400 px.
- **Accent color:** Warm amber photolithography glow; restrained use of red only in shadow tone.
- **Mood:** Reverent industrial documentary. These are the most complex machines humans have ever built.

**Prompt:**

> A cinematic wide-medium photograph captured inside an advanced semiconductor fabrication plant — the kind of cleanroom where leading-edge chips are made. In the foreground, two or three technicians in full-body white "bunny suits" with face masks, hoods, and blue nitrile gloves stand in front of a large lithography machine the size of a small truck, with intricate optics and robotic wafer handlers visible through a glass access panel. The scene is lit from below and behind with a distinctive warm amber-orange photolithography glow — the real lighting color used inside fabs to prevent exposing light-sensitive photoresist on wafers. Surfaces are polished stainless steel and anodized aluminum; organized bundles of cables and gas lines run along the ceiling. Shallow depth of field puts the sharpest focus on the nearest technician's gloved hand as it adjusts a small touchscreen control on the machine. The mood is reverent and almost sacred — these are the most complex machines on Earth, operated by people who look small beside them. Color palette: deep blacks, dominant amber-orange lighting, muted whites on the suits, cool white highlights on the steel. Shot on a 35mm lens at f/2.8, ISO 800 photojournalistic feel — real visible grain, no plastic digital over-smoothing. No readable brand logos on the equipment. Near-square framing.

---

## 3. Slide 17 — AI backlash (RISKS / red)

- **Placement on slide:** Left panel, `3.5" × 3.5"` at `(0.5, 1.85)`.
- **Aspect ratio:** 1:1 (square). Target ~1500×1500 px.
- **Accent color:** Deep-red shadow tones and warm dusk oranges.
- **Mood:** Civic, earnest, grounded. Not a riot — a community showing up.

**Prompt:**

> A photojournalism-style color photograph of a dusk anti-AI protest rally, shot from inside the crowd at shoulder height, as if the photographer is a participant rather than an observer. Two or three hand-lettered protest signs dominate the frame — one reads "STOP THE AI RACE" in large, imperfect black hand-painted letters on white cardboard; another nearby reads "HUMANS OVER ALGORITHMS" or "WE ARE NOT YOUR TRAINING DATA" on brown kraft paper. The signs are the heroes of the composition, held high and rim-lit by the last golden-hour light. The protesters themselves — a diverse mix of ages, some with raised fists — are partly out of focus or in silhouette, their expressions serious but not angry. Behind them, a softly-blurred urban skyline with streetlamps and office windows just beginning to glow warm orange against a deep indigo dusk sky. The mood is civic, earnest, grounded — not a riot, not a stock-photo rally, but a real community gathering. Color palette: warm dusk oranges and reds in the sky and lamps, cool deep navy and black in the shadows, white and brown sign materials with stark black hand-lettering. Shot on a 35mm or 50mm lens at f/2.8, natural visible film grain, documentary photography aesthetic. No recognizable faces of real public figures, no real political party branding, no corporate logos. Square 1:1 composition.

---

## 4. Slide 18 — Beyond the grid / orbital compute (FRONTIER / violet)

- **Placement on slide:** Right panel, `3.65" × 3.8"` at `(5.85, 1.6)`.
- **Aspect ratio:** Slightly portrait, roughly 10:11 or 4:5. Target ~1400×1500 px.
- **Accent color:** Electric violet `#6B46C1`.
- **Mood:** Awe-inspiring but plausible — engineering, not fantasy.

**Prompt:**

> A cinematic hyperrealistic space render of a large orbital data-center satellite, photographed from just outside the spacecraft at dawn, with Earth's curvature filling the lower third of the frame. The satellite is a long modular structure — clearly a data center rather than a communications or imaging satellite — with gleaming server racks visible through a transparent pressurized habitat section amidships, and two massive mirror-bright solar panel wings spread out perhaps fifty meters end to end. The panels catch unfiltered sunlight and reflect a faint electric-violet (#6B46C1) tint back onto the satellite's body. Thruster nozzles, radiator fins, and antenna arrays are visible in quiet detail. Below, Earth's limb curves gracefully: swirls of white cloud over deep blue ocean, a thin band of warm orange atmospheric glow along the horizon, and above it the pure black of space scattered with sharp pinprick stars. A soft god-ray of low-angle sunlight angles in from the upper right, catching microscopic dust or a faint thruster plume. The lighting is awe-inspiring but plausible — this is engineering, not fantasy. Color palette: electric violet accents on the solar panels and subtle data-center window glow, deep indigo space, teal-blue Earth, warm orange atmospheric horizon. Hyperrealistic render quality, Octane or Unreal Engine 5 feel, shot with an 85mm equivalent lens for a compressed, cinematic look. Slightly portrait aspect ratio, roughly 10:11. No visible brand logos, no mission patches, no flag decals, no text.

---

## 5. Slide 19 — Physical AI / humanoid robots (FRONTIER / violet)

- **Placement on slide:** Top banner, `7.0" × 2.2"` at `(1.5, 1.6)`.
- **Aspect ratio:** Wide panoramic, roughly 16:5 or 3.2:1. Target ~2100×650 px.
- **Accent color:** Electric violet `#6B46C1`.
- **Mood:** Matter-of-fact industrial documentary. This is work, not sci-fi.

**Prompt:**

> A wide cinematic panoramic photograph of a humanoid robot mid-stride on an active factory or logistics floor, shot at shoulder height with visible motion blur on the robot's moving limbs and a rock-steady torso. The robot is sleek and matte-white with graphite-dark jointed sections at the elbows, knees, and hips, and thin strips of subtle violet (#6B46C1) accent lighting along the chest plate and finger joints — clearly a modern humanoid in the style of Tesla Optimus or Figure 02, but not a specific branded model (no visible logos, no distinctive silhouette copying). The robot walks purposefully, carrying a small parts tote or pallet box. Surrounding it: industrial racks, wrapped pallets, yellow painted safety floor markings, and a mix of warm overhead sodium work-lights creating pools of amber light between cooler blue-white LED fixtures higher up. In the far background, a human worker in a hi-vis orange safety vest is visible but softly blurred, suggesting coexistence rather than replacement. Color palette: warm amber work-lights dominant, cool violet accents on the robot, industrial grays, safety yellow floor tape, a touch of orange on the distant worker. Shot on a 35mm lens with shutter dragged to about 1/30 second for authentic motion blur on the limbs, shallow depth of field on the robot's mid-body. The mood is matter-of-fact industrial documentary, not science fiction — this is work. Very wide panoramic composition, roughly 3.2:1 aspect ratio.

---

## 6. Slide 20 — Autonomous mobility / robotaxi (FRONTIER / violet)

- **Placement on slide:** Left panel, `2.8" × 4.15"` at `(0.5, 1.6)`.
- **Aspect ratio:** Tall portrait, roughly 2:3. Target ~1200×1800 px.
- **Accent color:** Electric violet `#6B46C1` on the lidar halo.
- **Mood:** Contemplative, near-future, grounded in a real downtown — not Blade Runner fantasy.

**Prompt:**

> A tall portrait-oriented long-exposure photograph of a modern robotaxi on a rainy city street at dusk. The vehicle is a sleek white minivan-style autonomous shuttle with a prominent spinning roof-mounted lidar sensor pod that glows with a faint electric-violet (#6B46C1) LED halo from its rotating laser. The taxi sits in sharp focus in the center of the frame, slightly angled toward the camera. Around it, the headlights and taillights of passing traffic streak past in long red and white light trails from a 2-second exposure, suggesting the flow of a busy evening. The wet asphalt reflects neon storefront signage in smeared pools of purple, magenta, and cool blue. Fine rain is visible as soft diagonal streaks against the dark sky, and a few crossing pedestrians appear as ghostly silhouettes. The backdrop is a dense city canyon — office towers, a shallow perspective of traffic lights, maybe a bus shelter — grounded in the feel of a real American downtown rather than a Blade Runner fantasy. Color palette: cool wet-street blues, violet lidar accent, warm red-orange tail lights, magenta and turquoise neon reflections, deep navy sky. Shot on a tripod with a 35mm lens at f/8, 2-second exposure, ISO 200. Documentary photography aesthetic — crisp where it matters, beautifully motion-smeared everywhere else. Tall portrait 2:3 composition. No real vehicle brand logos, no readable street signs.

---

## 7. Slide 21 — AI in biology / protein structure (FRONTIER / violet)

- **Placement on slide:** Left panel, `3.3" × 3.67"` at `(0.5, 1.85)`.
- **Aspect ratio:** Slight portrait, roughly 9:10. Target ~1400×1550 px.
- **Accent color:** Electric violet `#6B46C1` into magenta into gold.
- **Mood:** Reverent and precise — the frontier of structural biology, not a stock science image.

**Prompt:**

> A high-end scientific render of a single complex protein structure in the classic ribbon-diagram style: alpha helices as tightly coiled ribbons, beta sheets as flat directional arrows, loops as thin curved strands connecting them. The protein is photographed against a deep graphite-black background with extremely shallow depth of field — the nearest part of the molecule is razor-sharp and the back half softly dissolves into bokeh, giving an almost sculptural quality. The ribbons are colored in a subtle gradient from electric violet (#6B46C1) on one end, through deep magenta-pink in the middle, into warm muted gold on the other — evoking AlphaFold's pLDDT confidence coloring but handled more editorially than the default PyMOL look. Surrounding the ribbon structure, a faint wireframe mesh of electron density or atomic positions hovers like a ghostly cloud, partially visible. A single soft key-light comes from the upper left, grazing the surface and picking up rim highlights on the ribbons. Color palette: graphite black dominant, violet and magenta mid-tones, small warm gold highlights, no saturated greens or blues. Octane or Blender Cycles render quality, 85mm macro lens feel, cinematic lighting. No text labels, no residue annotations, no coordinate axes, no scale bars. Slight portrait aspect ratio, roughly 9:10. The mood is reverent and precise — the frontier of structural biology, not a stock science image.

---

## Rendering notes

- **Model:** ChatGPT's image generator (GPT Image 1 / GPT-4o image), Midjourney v7, FLUX 1.1 Pro, or Imagen 4. Upscale to ≥300 DPI at final print size if needed.
- **Color grading:** after render, a subtle editorial pass can help — crush shadows ~8%, warm the highlights slightly, desaturate midtones ~10% — but the prompts are written to land close to the target already.
- **Consistency:** render all seven in one session if possible so the deck reads as a coherent art direction rather than seven separate commissions. The shared-negatives block should be appended to every prompt.
- **Aspect ratios:** some tools won't generate the extreme aspect ratios natively (particularly 3.2:1 for slide 19). Render at a close-but-generatable ratio (like 16:9) and crop the center band to match the placeholder box exactly.
- **Placement in deck:** once images are generated, save them as `slides-images/slide12.jpg`, `slide15.jpg`, `slide17.jpg`, `slide18.jpg`, `slide19.jpg`, `slide20.jpg`, `slide21.jpg`, then swap `addImagePlaceholder` calls for `s.addImage({ path: ..., x, y, w, h })` in `build-deck.js`.

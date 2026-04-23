# IMAGE_PROMPTS.md — "AI Markets — May 2026"

One entry per image placeholder currently in `build-deck.js`. Prompts are tuned for a cohesive art direction: **warm orange F6693D accent**, **graphite/near-black backgrounds**, **muted gunmetal grays**, **editorial lighting** (key + subtle rim), **shallow depth of field**, **high-mid contrast**, **a whisper of film grain**. Think Bloomberg Businessweek / FT Weekend cover stock, not shiny CGI stock.

## Shared negatives (apply to every prompt)

Neon cyan or purple glows, "holographic brain" / "circuit-head" AI clichés, oversaturated rainbow gradients, plastic CGI sheen, stock-photo poses, visible text/typography/logos/watermarks, low-res JPEG artifacts, HDR halos, lens flare starbursts, generic "digital transformation" symbolism, AI-generated faces with garbled eyes or hands.

---

## 1. Slide 1 — Cover hero

- **Location:** Slide 1 right side. `x=6.3, y=1.6, w=3.3, h=3.3` (square).
- **Style:** Macro product photography, editorial.
- **Aspect ratio:** 1:1 (square, ~3.3").
- **Prompt:**
  > Extreme macro photograph of a modern AI GPU silicon die on a graphite-black anodised package, shot through a 100mm macro lens at f/4, tilt-shift perspective. Warm orange rim light (F6693D) rakes across the die's etched geometry from the upper right; cool gunmetal fill light from the left; deep near-black background fading to pure black. Fine copper interconnects catch a subtle highlight. Shallow depth of field, crisp focus on the central die, soft falloff toward corners. Subtle film grain, editorial color grade — Bloomberg Businessweek cover feel. No text, no branding, no logos.
- **Negative/avoid:** visible GPU vendor logo, green PCB, rainbow RGB lighting, dust particles, any person in frame, neon glow.

---

## 2. Slide 2 — TOC thumbnail: LANDSCAPE

- **Location:** Slide 2, card 01. Card thumbnail strip at ~`x=card_x+0.1, y=2.55+2.1, w=1.5, h=0.55`.
- **Style:** Wide editorial infrastructure shot, muted.
- **Aspect ratio:** ~3:1 (1.5" × 0.55").
- **Prompt:**
  > Wide cinematic frame of a dim hyperscale data-center aisle. Two long rows of server racks recede to a vanishing point; the nearest LEDs glow a cool teal, distant racks fade to near-black. A faint floor reflection picks up the teal from the overhead cable trays. Shot on a 35mm lens at f/2.8, low ISO, slight atmospheric haze. Graphite walls, brushed aluminum doors. Editorial color grade with crushed blacks and a teal-to-black gradient. No people, no text.
- **Negative/avoid:** bright fluorescent white, Christmas-tree multicolor LEDs, visible brand logos, visible cables in foreground, clean marketing gloss.

---

## 3. Slide 2 — TOC thumbnail: MARKET

- **Location:** Slide 2, card 02. Card thumbnail strip.
- **Style:** Wide editorial financial-district shot, muted.
- **Aspect ratio:** ~3:1 (1.5" × 0.55").
- **Prompt:**
  > Wide cinematic frame of a financial ticker wall at dusk, slightly out of focus. Rows of scrolling numbers and sparklines render in a warm gold (FFB800) against a graphite-black background; tiny red and green blips punctuate the gold. Shot through a 50mm lens at f/1.8 — the ticker text is soft, unreadable, abstract. Subtle vignette, editorial grade, gentle film grain. Mood is "after the close." No legible numbers, no tickers, no brand names.
- **Negative/avoid:** sharp readable text, logos, stock-photo trader at desk, neon green/red saturated, oversharpened numbers.

---

## 4. Slide 2 — TOC thumbnail: SHIFTS

- **Location:** Slide 2, card 03. Card thumbnail strip.
- **Style:** Macro screen detail, editorial.
- **Aspect ratio:** ~3:1 (1.5" × 0.55").
- **Prompt:**
  > Extreme macro of a dark IDE editor — terminal-black background, a cursor blinking in warm orange (F6693D), slightly defocused rows of monospaced code below the blinking line rendered in muted grays. The screen pixel structure is just barely visible. Shot through a 100mm macro, shallow DOF, the cursor is the one sharp element. Subtle bloom around the cursor, everything else falling off to black. Editorial grade, high-contrast. No readable code, no language keywords, no IDE chrome or logos.
- **Negative/avoid:** recognizable framework/editor brand, colorful syntax highlighting, readable code snippets, stock "hacker typing" vibe.

---

## 5. Slide 2 — TOC thumbnail: RISKS

- **Location:** Slide 2, card 04. Card thumbnail strip.
- **Style:** Macro product photography, tense, muted.
- **Aspect ratio:** ~3:1 (1.5" × 0.55").
- **Prompt:**
  > Extreme macro of a cracked silicon wafer or fractured circuit board, backlit with a single warm red (CC0000) spotlight coming from screen-left. The fracture runs diagonally across the frame. Graphite-black background, dust motes floating in the red beam. Shot through a 100mm macro at f/5.6, sharp focus on the fracture edge. Editorial grade, crushed blacks, subtle grain. The mood is "something just broke." No text, no labels.
- **Negative/avoid:** cartoon sparks, explosion VFX, lightning bolts, red siren lights, stock-photo "warning" icons.

---

## 6. Slide 2 — TOC thumbnail: FRONTIER

- **Location:** Slide 2, card 05. Card thumbnail strip.
- **Style:** Cinematic space render, restrained.
- **Aspect ratio:** ~3:1 (1.5" × 0.55").
- **Prompt:**
  > Wide cinematic frame of a small satellite silhouetted against the curved limb of Earth at dawn. The Earth's thin atmospheric arc glows in a muted pink-magenta (E8478D) fading to near-black space above. The satellite is a dark silhouette with a single rim light catching its solar panels. Photorealistic CGI, ISS-photography aesthetic, restrained color, editorial grade. No lens flare, no typography, no mission patches or logos.
- **Negative/avoid:** cartoonish satellite, visible spacecraft brand, star-field speckle overload, neon auroras, "retro-futurist" styling.

---

## 7. Slide 10 — Agentic AI

- **Location:** Slide 10 right panel. `x=6.2, y=1.85, w=3.3, h=3.25`.
- **Style:** Macro screen photography, editorial.
- **Aspect ratio:** ~1:1 (3.3" × 3.25").
- **Prompt:**
  > Tight three-quarter macro photograph of a 14" laptop on a graphite desk, shallow DOF. On the dark IDE screen, a softly defocused coding session is visible — a sidebar of file names in muted gray, a main pane showing indented code in low-contrast grays, and a bright warm-orange (F6693D) cursor and selection block as the hero accent. Warm desk-lamp light rakes across the aluminum laptop body from the upper left. Subtle reflection on the screen bezel. 50mm lens at f/2, editorial color grade, gentle film grain. No readable code, no logos, no faces, no hands.
- **Negative/avoid:** visible Apple/Dell/Lenovo logo, keyboard keycaps in focus, RGB keyboard, readable function names, person's hand on keyboard.

---

## 8. Slide 13 — TSMC fab panorama strip

- **Location:** Slide 13, between stats and reshoring strip. `x=0.5, y=3.65, w=9.0, h=0.55`.
- **Style:** Cinematic industrial photography, wide panorama.
- **Aspect ratio:** ~16:1 cinematic letterbox (9.0" × 0.55").
- **Prompt:**
  > Ultra-wide cinematic panorama of a semiconductor fab cleanroom interior, shot from a low vantage along the aisle. Bunny-suited technicians in muted white suits move between yellow-lit photolithography bays; the photolith glow warms to a signature orange (F6693D) in the mid-ground. Rows of tool chambers recede in sharp perspective toward the vanishing point. Anamorphic feel, 35mm film grain, restrained color, cool graphite shadows contrasting the warm photolith bays. Editorial documentary aesthetic. No text, no vendor logos, no faces in focus.
- **Negative/avoid:** visible ASML/TSMC/Samsung branding, readable warning signs, a single hero character, stock-photo "futuristic lab" feel, neon blue UV glow.

---

## 9. Slide 15 — Protest banner strip

- **Location:** Slide 15, between stats and red notes. `x=0.5, y=3.6, w=9.0, h=0.55`.
- **Style:** Photojournalism, reportage.
- **Aspect ratio:** ~16:1 cinematic letterbox (9.0" × 0.55").
- **Prompt:**
  > Ultra-wide photojournalism frame of a dusk street rally. Protesters' hands hold up hand-lettered cardboard signs — the lettering is intentionally soft-focus, unreadable as actual slogans, rendered in warm marker on brown cardboard. A single sign near frame-center catches a streetlight and glows warm orange (F6693D). Crowd figures recede as silhouettes into graphite-blue dusk; a low sodium-vapor streetlight halo sits at the far right. Shot on a 35mm lens at f/2.8, tri-X grain, high-mid contrast. No readable text, no faces in focus, no flags or brand signage.
- **Negative/avoid:** legible slogans, recognizable political symbols, violent imagery, riot gear, visible brand logos, stock-photo "angry mob" pose.

---

## 10. Slide 16 — Orbital data-center

- **Location:** Slide 16 right panel. `x=5.85, y=1.6, w=3.65, h=3.8`.
- **Style:** Photorealistic space render, ISS-photography aesthetic.
- **Aspect ratio:** ~1:1 slightly portrait (3.65" × 3.8").
- **Prompt:**
  > Photorealistic CGI render of an orbital data-center satellite positioned in low Earth orbit at dawn. The spacecraft is a long cylindrical chassis with large unfolded solar arrays; one array catches a warm orange (F6693D) dawn rim light, the shadowed side falls into near-black space. Below, Earth's curved limb fills the lower third in a muted blue-gray, with a thin pink-magenta atmospheric glow at the horizon. Sharp focus on the spacecraft, slight motion parallax on the Earth below. Restrained color, cinematic grade, no lens flare. No mission logos, no text, no visible flag decals.
- **Negative/avoid:** cartoonish design, exposed Star Wars/Star Trek silhouette, visible brand (SpaceX, NASA), city lights on night side, exaggerated auroras, UFO vibe.

---

## 11. Slide 17 — Physical AI (humanoid robot)

- **Location:** Slide 17 top. `x=1.5, y=1.6, w=7.0, h=2.2`.
- **Style:** Cinematic industrial reportage.
- **Aspect ratio:** ~16:5 wide (7.0" × 2.2").
- **Prompt:**
  > Wide cinematic frame of a bipedal humanoid robot mid-stride along a warehouse floor, three-quarter angle. The robot's shell is matte graphite with a single warm orange (F6693D) accent line down the side of the torso. Warm overhead work-lights rake across its frame; motion blur on the trailing leg conveys walking pace. In the soft background, defocused pallet racks and a distant forklift. Shot on a 50mm lens at f/2.8, 1/60s shutter for motion blur, editorial film grade, subtle grain. Restrained color, crushed blacks. No human workers in frame, no visible branding on the robot, no Boston Dynamics-specific silhouette.
- **Negative/avoid:** toy-like proportions, glowing LED eyes, visible robot brand, sci-fi "Terminator" menace, clean CGI showroom.

---

## 12. Slide 18 — Autonomous vehicle

- **Location:** Slide 18 left panel. `x=0.5, y=1.6, w=2.8, h=4.15`.
- **Style:** Automotive editorial night photography.
- **Aspect ratio:** ~2:3 portrait (2.8" × 4.15").
- **Prompt:**
  > Tall editorial photograph of a robotaxi — generic silhouette, no brand identification — parked on a rain-slick urban street at dusk. The roof-mounted sensor pod catches a warm orange (F6693D) streetlight reflection. Wet pavement streaks a long reflection of the car's taillights toward camera. Background is a soft-focus crosswalk and graphite-blue dusk buildings. Long exposure on distant traffic creates faint warm light streaks. Shot on a 35mm lens at f/4, 2s exposure on a tripod, film grade, restrained color, crushed blacks. No visible brand, no readable street signs, no people, no logos.
- **Negative/avoid:** recognizable Waymo/Cruise/Zoox livery, neon billboard clutter, over-bright headlights blowing out the frame, cartoon rain, stock "autonomous car" feel.

---

## 13. Slide 19 — Biology (protein structure)

- **Location:** Slide 19 top. `x=0.5, y=1.6, w=9.0, h=1.6`.
- **Style:** Scientific visualization, cinematic.
- **Aspect ratio:** ~16:3 cinematic strip (9.0" × 1.6").
- **Prompt:**
  > Ultra-wide cinematic render of an AlphaFold-style protein ribbon diagram floating in near-black space. Alpha helices and beta sheets render in a warm orange (F6693D) gradient with subtle darker-orange shadowing; a few supporting strands fall into a muted gray. The structure coils from left to right across the frame with a shallow depth of field — the central motif is sharp, the periphery gently defocuses into near-black. Soft volumetric key light from the upper left, subtle bounce fill. Editorial scientific-viz aesthetic, not a game engine look. No text, no residue labels, no axis gizmos.
- **Negative/avoid:** PyMOL default colors (rainbow by chain), visible residue labels or scale bars, exaggerated bloom, "plasma ball" shader, cartoonish wavy ribbons.

---

## Rendering notes

- **Model:** whatever photorealistic text-to-image model you're using (Midjourney v6/v7, FLUX 1.1 Pro, Imagen 4, etc.). Upscale to ≥300 DPI at final print size.
- **Color:** after render, do a subtle editorial grade pass — crush shadows ~8%, warm the highlights ~5% toward F6693D, desaturate the midtones ~10%.
- **Consistency:** render all 13 in one session if possible, with the same "shared negatives" block appended, so the deck reads as a single art direction rather than 13 separate commissions.
- **Aspect ratios:** generate slightly larger than needed and crop to the exact `w×h` in the placeholder — don't let the model stretch to weird ratios (particularly for the 16:1 and 16:3 strips, which most models won't generate natively; render 16:9 and crop the center band).

# IMAGE PROMPTS V2 — "From Chatbots to Agentic Loops" deck (June 2026)

Prompts for AI-generated images to upgrade the 25-slide deck. The deck currently
embeds four existing renders (`slides-images/web/`: orbital, humanoid, protein,
robotaxi). The items below are *additive* — each entry says which slide it
slots into, the target placement/size, and the generation prompt.

Style anchors for ALL prompts (keep the set coherent):
- Cinematic, photoreal or high-end 3D render; dark backgrounds preferred (deck ink: #111114)
- Accent palette available: yellow #FFD100, teal #008B8B, orange #F6693D, gold #FFB800, purple #6B46C1, pink #E8478D
- No text, no logos, no watermarks, no human faces in close-up
- 16:9 unless noted; minimum 1600px wide

---

## 1. Cover backdrop (slide 1) — subtle, optional
**Slot:** full-bleed background behind the dark cover, heavily darkened (text must stay readable).
**Size:** 1920×1080.
**Prompt:** "Abstract visualization of autonomous AI agent loops: glowing teal and yellow light trails forming interlocking circular orbits over a near-black background, depth of field, faint circuit-board texture in shadow, cinematic, minimal, elegant — dark enough that white headline text remains readable over it."

## 2. Agentic loop hero (slide 5, replaces the drawn TRY/FAIL/FIX/SHIP diagram if desired)
**Slot:** left half of slide 5, ~4.3in × 2.6in region.
**Size:** 1200×800.
**Prompt:** "Clean 3D-rendered diagram-style illustration of a self-correcting machine loop: four glowing teal nodes connected in a circle by arrows of light, one node mid-repair with small sparks, dark charcoal background, isometric, minimal, technical-beautiful, no text."

## 3. Jevons curve backdrop (slide 6) — texture only
**Slot:** faint full-bleed texture behind the dark Jevons chart (current slide is flat ink).
**Size:** 1920×1080, must be VERY dark.
**Prompt:** "Extremely dark sci-fi engineering blueprint texture: faint teal circuit traces, server racks and pipeline silhouettes at 5–10% opacity on near-black, wide empty center for chart overlay, cinematic, subtle."

## 4. Token meter / enterprise budget (slide 7)
**Slot:** could replace the READ rail or sit behind it; portrait ~2.75in × 2.9in.
**Size:** 800×900.
**Prompt:** "Photoreal close-up of a sleek industrial utility meter reimagined for the AI era: glowing gold digits ticking upward, brushed dark metal, a faint stream of golden tokens flowing into it like data, dark background, shallow depth of field, no text."

## 5. HBM / memory crunch (slide 10)
**Slot:** optional right-rail image above the three cards; landscape ~4.3in × 1.2in.
**Size:** 1400×420.
**Prompt:** "Macro photograph style render of stacked high-bandwidth memory chips glowing faint orange under inspection light, silicon wafer bokeh background, industrial cleanroom mood, dark, cinematic, no text."

## 6. Neocloud supercluster (slide 11)
**Slot:** optional banner under the subhead; 10in × 1.1in strip.
**Size:** 1920×220 (or 1920×400 cropped).
**Prompt:** "Vast dark datacenter hall stretching to a vanishing point, hundreds of server racks with thin orange and teal status lights, slight haze, one small human silhouette for scale far away, cinematic wide shot, very dark, no text."

## 7. Capitol / sovereign asset (slide 19)
**Slot:** optional third-column visual or top-right corner motif; square ~1in.
**Size:** 600×600.
**Prompt:** "Minimal 3D render of a neoclassical government dome made of dark glass with faint purple circuit patterns glowing inside it, black background, centered, elegant, no text, no flags."

## 8. Whale / interspecies communication (slide 24 — replaces the drawn waveform)
**Slot:** the "Talking to animals" dark card; portrait ~2.9in × 1.0in image zone above the caption.
**Size:** 900×400.
**Prompt:** "A humpback whale underwater in deep blue-black ocean, its song visualized as elegant glowing pink sound-wave ribbons emanating from it, dark, bioluminescent mood, cinematic, scientific-beautiful, no text."

## 9. Act divider textures (slides 4, 8, 12, 18) — one per act, optional
**Slot:** right third of each dark divider, behind the ghost numeral, at very low brightness.
**Size:** 800×1080 each.
**Prompts:**
- SHIFT (teal): "Faint teal neural pathways branching like a circuit-river on near-black, abstract, very dark"
- CRUNCH (orange): "Faint orange silhouette of stacked silicon wafers and power pylons on near-black, abstract, very dark"
- MARKET (gold): "Faint gold candlestick-chart skyline silhouette on near-black, abstract, very dark"
- STAKES (purple): "Faint purple capitol dome and scales-of-justice silhouette on near-black, abstract, very dark"

---

### Integration notes
- Drop generated files into `slides-images/web/` as JPG (quality 85, keep under ~400KB each).
- Wire into `build-deck.js` with `s.addImage({ path, x, y, w, h, sizing: { type: "cover", w, h } })`.
- Dark-slide images: keep luminance low — footer and headline contrast is the constraint.
- After adding: `node build-deck.js`, re-export JPGs via inline PowerPoint COM, bump the cache-buster `V` in index.html, then `vercel deploy --yes`.

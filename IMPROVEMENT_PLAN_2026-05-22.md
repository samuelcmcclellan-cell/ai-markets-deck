# AI Markets — Improvement Plan **v2** (May 22, 2026)

**Author:** Strategy (with Claude Code)
**Inputs:** Visual review of all 24 rendered slides + `build-deck.js` + prior `REVIEW_2026-04-27.md`, plus **two deep research waves across nine sources**:
- *Wave 1:* Invest Like the Best · The Information · AI Daily Brief · company earnings.
- *Wave 2:* Marc Andreessen on Joe Rogan (#2501) · Jensen Huang at Stanford CS153 + GTC 2026 · The Compound / Ritholtz · The Information podcasts · Hard Fork · and a dedicated dig into "Mythos" + the US AI backlash.

**Verdict:** The deck's bones are excellent — keep the structure. But the evidence now justifies **two targeted redesigns** (the RISKS backlash slide → 2 slides; the BUBBLE slide → a named bull-vs-bear), **~10 data refreshes**, and **filling the 7 image placeholders**. This is not a teardown — it's a sharpening, plus the one section (RISKS) where reality has outrun the slide.

---

## ✅ IMPLEMENTED — build v2 (May 22, 2026 · now 25 slides · `node build-deck.js` clean · rendered & verified)

Per the go-aheads (compress RISKS · redesign bubble · footnote the violence · build the inference slide), these are **done in `build-deck.js` and verified in the rendered JPGs**:

- **NEW slide 14 (SHIFTS) — "The model is no longer the moat — distribution is":** token-cost ~99%-collapse chart + commoditizing-vs-compounding panels + the Ben Thompson counter-case. Deck grew 24 → **25 slides**; TOC, all footers, and both appendix pages renumbered.
- **Bubble (now slide 15):** retitled *"Stretched, not yet irrational — and supply is the reason"*; kept the 4-test table; added named **THE BULLS / THE BEARS** rails + a Howard Marks verdict band.
- **RISKS backlash (now slide 18), compressed to ONE slide:** rising-concern trend chart (Pew 37→50) + 70%+/31%/18% stat lines + NIMBY-quantified / political / labor cards. **"Mythos" not used; Echelon→Pew; the violence is a footnote.** (Its photo placeholder was replaced by the chart.)
- **Slide 12:** wired in the real IDE image (`slides-images/slide12.png`); added Huang "million-fold" quote; labelled 10–100× as analyst estimate.
- **Slide 11:** bars now driven from the median variables → **bar/band contradiction fixed** (17%/5%, 26×/23×); title → "~3× faster."
- **Slide 10 (labs):** Anthropic $380B → ~$900B (reported), Alphabet ~$4.6T, SpaceX S-1 ~$1.75T; date stamp → late-May 2026.
- **Slide 13:** SOXX +74% / software ~−15% chart through May 22 + SaaSpocalypse anchor.
- **Slides 3 / 9 / 22:** capex-on-credit (70%→90% of OCF, debt + leases); Huang energy quote; takeaway-01 enriched.
- **Slide 4:** "Seventy years"; "narrow scope"; current models (GPT-5.5 / Opus 4.7 / Gemini 3.5).

**Still open (needs an image model):** generate + wire the **4 remaining photo placeholders — slides 19, 20, 21, 22** (orbital, humanoid, robotaxi, protein); prompts in `IMAGE_PROMPTS.md`. **Slide 7 is now a code-drawn schematic (no image needed); slide 12 is done.**

> **Confidence tags** (High / Med / Low) carry through from the research. Many Wave-2 items are post-Apr-22 and partly from secondary sources — treat **Med/Low** as "verify the primary source before it goes on a slide." A consolidated verify-list is at the end.

---

## ⚠️ Read first — two corrections that protect the deck's credibility

1. **"Mythos" is NOT an anti-AI movement — it's Anthropic's new frontier model.** Codenamed "Capybara," confirmed in testing **Mar 26, 2026**, previewed **Apr 7** under Anthropic's "Project Glasswing" cybersecurity effort (it has found thousands of zero-day vulnerabilities; partners incl. Amazon, Apple, Cisco, CrowdStrike, Microsoft, Palo Alto). It is not an org, PAC, film, or campaign. **Do not cite "Mythos" as evidence of AI backlash — that would be a factual error.** (High; Fortune 3/26/26, TechCrunch 4/7/26, WEF 4/26.)
   - *Where it IS useful:* a model powerful enough to auto-discover zero-days is exactly the kind of capability jump fueling public alarm — so Mythos can appear on the **capability-fear** side of the backlash story, not as a "movement."
2. **The slide-17 "26% positive (Echelon, Mar 2026)" stat is unverifiable** across two independent research passes. Replace with **Pew (pub. Mar 12, 2026): 50% of US adults are more *concerned* than excited about AI vs. just 10% more excited** — far better sourced and part of a clean trend (see RISKS redesign). (High on Pew; Echelon attribution Low — do not present as-is.)

---

## Part A — Data refresh (slide-by-slide). "From" = on the slide today; "To" = refreshed.

### Slide 3 / 22 — Hyperscaler capex "~$750B" → keep the number, add the "on credit" hard data
The figure holds (~$745–775B; sum of MSFT ~$190B, AMZN ~$200B, GOOGL $180–190B, META $125–145B, ORCL ~$50B). The *upgrade* is turning Takeaway #1 ("capex on credit") from an assertion into a numbers slide, using Wave-2 reporting:
- Hyperscaler capex was **~70% of operating cash flow in 2025, headed >90% in 2026** (BofA, via Ritholtz/Compound). (High)
- **Amazon FY26 free cash flow −95% YoY**; **~$662B of off-balance-sheet lease commitments** across hyperscalers (Moody's, via Om Malik teardown, Apr 30). (Med-High)
- **~$175B of new hyperscaler debt** forecast for 2026 (Amazon alone ~$37B + €14.5B). (High)
- The **circular-financing loop** — Nvidia → OpenAI → Oracle → Nvidia — is now the bears' headline; WSJ reported Nvidia's $100B OpenAI investment "stalled" over OpenAI's "lack of financial discipline." (High) → this feeds the BUBBLE redesign (Part D), not slide 3.
- Sources: Om Malik (om.co, 4/30/26); Bloomberg "2026 AI circular deals"; CNBC "Big Tech's AI bond binge."

### Slide 10 — The labs (HIGHEST-PRIORITY REFRESH)
- **OpenAI $852B / ~35× ARR / $122B round (Mar 31, 2026): CONFIRMED — keep.** (Amazon $50B, Nvidia $30B, SoftBank $30B; ARR ~$24–25B.) The Information notes ~$115B cumulative burn through 2029 — useful tension. Add a primary-source link in the appendix. (High)
- **Anthropic $380B / ~13× ARR: STALE — most out-of-date number in the deck.** $30B Series G at $380B (Feb 12) + Google up-to-$40B (Apr 24) confirmed; **Bloomberg now reports a $30B+ round at ~$900B closing ≈ this week** (would top OpenAI). ARR ~$30B. → update to "$380B (Series G) → ~$900B reportedly closing late-May 2026." (High it's reported; verify the close.)
- **Alphabet $4.0T → ~$4.6–4.7T** (May 20–21); vying for world's most valuable company. (High)
- **xAI/SpaceX $1.25T merger (Feb 2): CONFIRMED — add the sequel.** **SpaceX filed its S-1 May 20** targeting **~$1.75T** (ticker SPCX, debut ~mid-June). Note it or the slide dates the moment SPCX prices. (High)
- **"Q1 2026 funding 2× all of 2025": CONFIRMED** (Crunchbase). (High)

### Slide 11 — Tech vs Non-Tech (FIX THE LIVE CONTRADICTION)
Bars still read Tech 23× / Non-Tech 27× & growth 22%/5%; band reads ~26× / ~23× on ~17%/~5%. The script medians (`MED_TECH_PE` 26.05, `MED_NONTECH_PE` 22.65; growth 17.0 / 5.3) match the **band**, so the **bars are the wrong series** — drive them from the median vars. Code fix, S effort. NVDA fwd P/E ~24–26× still holds (anchors slide 14). (High)

### Slide 12 — Agentic AI "10–100× compute per session" → anchor it to Jensen Huang
- **Lead with Huang (GTC 2026): "The inference inflection point has arrived," and "AI compute demand has increased roughly one-million-fold in the past two years."** (High) That million-fold line is a stronger, quotable demand driver than the bare multiplier.
- **Keep "10–100× per session" but label it as analyst framing, not a Huang quote** (the research could not confirm Huang says "10–100×"). Back it with **IDC ~1,000× inference-demand growth by 2027** and production proof: **Salesforce Agentforce ~$800M ARR; Microsoft 400,000+ custom agents across 160,000 orgs.** (High)
- *Reality check to keep it credible (Hard Fork / Newton):* consumer agents are still "closer to a party trick than a useful tool"; ~⅓ task-failure, ~10% of pilots scale, Gartner sees 40%+ agentic projects scrapped by 2027. A one-line "hype vs. reality" caveat raises the slide's IQ. (Med)

### Slide 13 — Semis up, software down (divergence got MORE dramatic)
- **From** +38% / −20% / Nasdaq +4% (Apr 17) **→ To (~May 21):** **SOXX ~+74% YTD**, IGV −12% to −20%, Nasdaq mid-single-digit. Spread nearly doubled. (High)
- **Dated anchor for "software down":** **"SaaSpocalypse," Feb 2026 — ~$285B wiped in ~48h** (Anthropic "Cowork" launch); **Atlassian's first-ever enterprise seat-count decline (Mar 2026)**; only **14% of CFOs report measurable AI ROI**; **Figma trades ~55× 2026 revenue vs ~13× software median** (The Information). (Med-High — verify $285B/Atlassian.)
- *Causal upgrade:* the **"multiple-compression, not revenue-decline"** frame (Animal Spirits #452, verbatim): *"You don't need revenue to decline for the stocks to crash. You need the multiple to compress"* — 15×→6× = −60% on flat sales. That's the mechanism behind "software down." (Med)

### Slide 9 — Power → anchor it to Jensen Huang's own words
- **Huang, Stanford CS153 (Apr 30, 2026), verbatim: "The amount of energy that we need for compute … is likely probably 1,000 times more than we currently have."** And GTC 2026: **"Power availability has … emerged as one of the most significant constraints,"** with **"tokens per watt"** as the governing economic metric, and data centers reframed as **"AI factories … that convert electricity into tokens."** (High) These quotes turn slide 9 from a stat slide into a thesis slide.
- Optional hard adds: AWS–Talen ~1.9 GW nuclear PPA; SMR offtake pipeline ~25 → ~45 GW; global DC electricity demand >1,000 TWh in 2026 (> Japan). (Med-High)

### Slide 4 — AI timeline → bring the right edge to May 2026
- Current frontier: **Claude Opus 4.7 (Apr 16), GPT-5.5 (Apr 23, agentic), Gemini 3.5 Flash (May 19), Grok 4.3, open-weight DeepSeek V4.** Add a small "where we are now (May 2026)" tag. (High)
- Optional: a "China pulls level" marker — **Chinese models' weekly tokens on OpenRouter passed US models (Feb 2026).** (High)

### Slides 18 / 21 — Frontier proof points (make "pilot stage today" concrete)
- **Orbital (18):** Starcloud **$1.1B valuation** ($170M Series A, Mar 30), trained first model in space (Nov 2025), Starcloud-2 w/ Blackwell B200 launching this year; Google Project Suncatcher prototypes ~early 2027. (Med-High)
- **Drug discovery (21):** Isomorphic Labs' IsoDDE **50% accuracy vs AlphaFold3's 23.3%** (Feb 2026); first AI-designed cancer drug → Phase 1 by end-2026. (Med-High)

---

## Part B — The named-voice quote bank (the deep-research payoff)

The deck argues in its own voice; institutional readers trust *named, dated* sources more. Curated, attribution-checked lines to drop in (verbatim unless tagged paraphrase):

**Bull / capex-is-rational**
- **Jensen Huang (GTC 2026):** *"Tokens are the new commodity. AI factories are the infrastructure that produces them."* (High)
- **Brad Gerstner (Altimeter, May 2026):** *"You have to make choices in this market."* — the real-investor mirror of Takeaway #4. Also: capex is *"locked in, not speculative,"* "still very early in the supercycle." (High)
- **Gavin Baker (Invest Like the Best, "Watts and Wafers," ~May 20, 2026):** the TSMC **wafer shortage is precisely what *prevents* a bubble** (supply can't run ahead of demand). Doubles as bottleneck + bubble support. (High)
- **Coatue (May 2026 report):** *"$6T of hyperscaler EBITDA is not speculative capital"* — ~$12T of funding available 2026–31 vs ~$1T/yr capex. (Med-High)
- **Josh Brown (The Compound, Dec 13 2025):** *"Every secular bull market in history has been accompanied by a popular wave of innovation"*; Mag 7 are *"horizontal conglomerates"* whose index weight is earned. (High)

**Bear / this-rhymes-with-2000**
- **Paul Tudor Jones (via O'Shaughnessy, Apr 28 2026):** *"We're 252% of stock-market cap to GDP. In 1929 we were 65% … in 2000, 170%."* (High)
- **Michael Burry / Jim Chanos:** shorting Nvidia; GPU useful-life 2–3 yrs vs 5–6 booked (understating depreciation); circular vendor-financing likened to dot-com. (High the positions exist.)
- **The Information / WSJ:** the Nvidia→OpenAI→Oracle→Nvidia loop; Nvidia's $100B OpenAI stake "stalled" over OpenAI's "lack of financial discipline." (High)

**The measured center (use as the deck's verdict)**
- **Howard Marks (Oaktree, "Is It a Bubble?", Dec 9 2025):** *"The question is whether [the exuberance] is irrational,"* and *"behavior based on the belief that it's different is what causes it to not be different."* (High, verbatim)

**Accelerationist pole (for the RISKS slide — quote AND rebut)**
- **Marc Andreessen (Joe Rogan #2501, ~May 19 2026):** *"The doomers have an excellent marketing campaign"*; *"a data center is … the most benign thing you could ever build, 'cause it doesn't do anything"*; *"50 years from now [the world] is going to be running on Chinese AI or American AI."* Launched the >$100M pro-AI super PAC "Leading the Future." (High–Med; note recap outlets observed he struggled to name concrete AI benefits — useful as the skeptics' exhibit. The "debanking" claims are **disputed by federal regulators** — flag as contested.)

---

## Part C — RISKS section **redesign** (the headline change)

**Why:** Today the entire backlash story is one slide (17) with three thin cards and an unfilled image. Since the deck's Apr anchor, the backlash became **physical, political, and quantified** — it now outweighs a single slide. Recommendation: **split slide 17 into two** (deck grows 24 → 25), reframed around hard data. (If you'd rather not add a slide, a 1-slide compression option is noted at the end.)

### New Slide 17a — "AI is losing the public — and that's now a market risk"
**Hero visual = a sentiment TREND line** (this is the single most defensible, most damning visual in the section):
- **Pew: % "more concerned than excited" 37% (2021) → 50% (2025)**; only 10% more excited; 57% rate AI's societal risks high vs 25% its benefits. (High)
- **YouGov: net-negative views 34% (2023) → ~50%+ (2026).** (High)
- **Economist/YouGov (May 9–11, 2026): >70% say AI is advancing too quickly** (68% R / 77% D — bipartisan). (High)
Supporting stat callouts (BII big-number treatment): **31%** trust government to regulate AI responsibly (Stanford AI Index 2026); **18%** of ages 14–29 feel hopeful (Gallup); **43%** say risks outweigh benefits (Politico/Public First, May 2026).
Escalation note (handle soberly, likely a footnote, not a headline): the **"Stop the AI Race" march (Mar 21, 2026)** — billed the largest US AI-safety protest — and, more gravely, **physical attacks** (the Apr 2026 firebombing attempt at Sam Altman's home; a data-center-rezoning shooting) reported by Hard Fork (Apr 17) and Fortune. *Judgment call: an institutional deck may prefer to cite the trend + protests and footnote the violence rather than feature it — recommend the restrained treatment.*

### New Slide 17b — "The permitting & politics layer is the new supply-chain layer"
Keeps the slide-17 takeaway band (the prior review rightly praised it) but backs it with two quantified columns:
- **NIMBY / data centers (the capex threat):** **$64B of projects blocked or delayed** ($18B blocked + $46B delayed) — and **accelerating: now 188 activist groups across 40 states** (was 142/24), with project cancellations **6 (2024) → 25 (2025) → 20+ in Q1 2026 alone.** **71% of Americans oppose a data center in their area** (Gallup, Mar 2026) — worse than nuclear (53%). Local **power bills up to +267% (2020–25)** in some grids. (High)
- **The political layer (new — absent from the current slide):** dueling money — **pro-AI "Leading the Future" super PAC raised $125M+ (≈$140M earmarked for the 2026 midterms; a16z, Brockman, Lonsdale)** vs. newly formed counter-PACs; a genuine **"Bernie-to-Bannon" coalition** (Bannon: AI "the most dangerous technology in history"). Near-term catalysts: **state moratoria** (Maine yearlong freeze vetoed Apr 29; Georgia 1-yr ban from 7/1/26; Vermont freeze to 2030) and the **Ohio citizen ballot measure** to ban ≥25 MW data centers (needs 413,488 signatures by 7/1 for the Nov 2026 ballot). (High)
- **Labor:** keep the existing ~480K data-center workforce-gap card; optionally add **Q1 2026 tech layoffs 78,557, ~48% attributed to AI/automation** (with the honest caveat that NBER finds little net employment impact in ~90% of firms — the "AI-washing" debate). (Med)

**1-slide alternative (if you won't add a slide):** make the sentiment trend line the hero, replace the three thin cards with two columns (Sentiment+Politics | NIMBY+Labor), and drop the protest photo to a small inset. You lose the breathing room but keep 24 slides.

---

## Part D — BUBBLE slide **redesign** (slide 14) → a named bull-vs-bear

Keep the excellent 4-test "Dotcom 2000 vs AI 2026" table, but evolve the slide from a one-sided "neither condition holds" into a **two-sided debate the reader resolves** — far more credible to a sophisticated audience:
- **Left rail "THE BULLS":** Huang ("AI factories / tokens are the new commodity"), Gerstner ("locked in, not speculative; still early"), Baker ("the wafer shortage prevents a bubble"), Coatue ("$6T EBITDA isn't speculative capital"), Brown ("concentration is earned"). 
- **Right rail "THE BEARS":** Burry/Chanos (depreciation + circular financing), The Information/WSJ (Nvidia→OpenAI→Oracle loop; $100B stake "stalled"), PTJ ("252% cap-to-GDP vs 170% in 2000"), the "multiple-compression" mechanism.
- **The verdict band (bottom):** Marks — *"The question is whether the exuberance is irrational"* — then the deck's own answer using the 4 tests (valuations ~24× vs 131×; supply constrained, not oversupplied). 
This also lets you retire the topic-label title "The bubble question." in favor of a takeaway headline (e.g., *"Stretched, not yet irrational — and supply is the reason."*).

---

## Part E — The image plan (7 placeholders) — unchanged from v1, still current

Seven slides render the gray brief box: **7, 12, 17, 18, 19, 20, 21.** `IMAGE_PROMPTS.md` already has coordinate-matched prompts for 12, 17, 18, 19, 20, 21; **slide 7 needs the new prompt below**; the file's slide-15 prompt is orphaned. **`slides-images/slide12.png` already exists and is production-quality — wire it in now (free win).** I can finalize prompts + write all wiring; pixel generation needs an image model (ChatGPT/Midjourney/FLUX/Imagen).

| Slide | Subject | Box `(x, y, w, h)` | Aspect | Prompt |
|------|---------|--------------------|--------|--------|
| 7 | AI accelerator package | `0.5, 1.70, 4.40, 4.30` | ~1:1 | **NEW (below)** |
| 12 | Dark IDE, agent editing | `0.5, 1.85, 3.3, 3.25` | ~1:1 | ✅ + PNG ready |
| 17(a/b) | Dusk anti-AI protest | `0.5, 1.85, 3.5, 3.5` | 1:1 | ✅ (now smaller/inset per redesign) |
| 18 | Orbital data center | `5.85, 1.6, 3.65, 3.8` | ~10:11 | ✅ |
| 19 | Humanoid on factory floor | `1.5, 1.6, 7.0, 2.2` | ~3.2:1 | ✅ |
| 20 | Robotaxi, rainy dusk | `0.5, 1.6, 2.8, 4.15` | ~2:3 | ✅ |
| 21 | Protein ribbon | `0.5, 1.85, 3.3, 3.67` | ~9:10 | ✅ |

**New slide-7 prompt** (matches the existing caption): *A photorealistic studio macro photograph of a modern AI accelerator package on a dark matte backdrop, shot slightly from above. A single large square processor die sits centered, flanked symmetrically by tall stacks of high-bandwidth memory chips on a green-gold interposer substrate with thousands of fine gold contact pads visible. Dramatic low-key lighting rakes across the surface, catching the metallic die lid and gold connectors; deep shadows fall to black. Extremely shallow depth of field — front edge razor-sharp, back softly blurred. Editorial product-photo register (Bloomberg Businessweek / FT Weekend), not slick CGI. No logos, no text. Graphite-black dominant, warm gold + muted green substrate, cool steel highlights. Square 1:1, high resolution.* — append the shared-negatives block.

**Wiring pattern** (use `cover` so photos fill without distortion; slide-10 logos prove `addImage` works):
```js
// Slide 12 — wire in the image that ALREADY exists (do this first):
s.addImage({ path: "slides-images/slide12.png", x: 0.5, y: 1.85, w: 3.3, h: 3.25,
  sizing: { type: "cover", w: 3.3, h: 3.25 } });
// Same pattern for 7,17,18,19,20,21 at their box coords once the JPGs land.
```
Then `node build-deck.js` and re-export `slides/` for review. Extreme ratios (19 at 3.2:1, 20 at 2:3): generate near-native and center-crop.

---

## Part F — New-slide candidates (beyond the RISKS split)
1. **Inference-cost collapse / "the model is no longer the moat — distribution is."** Token cost fell ~99% in 3 yrs while total AI bills rise; inference ≈85% of AI budgets. **This is the missing causal link between "semis up" and "software down."** Note the live debate: Ben Thompson ("Agents Over Bubbles," Mar 16) argues value accrues to *integrated* model+harness players, not modular layers. (High the narrative is live.) → best as a new SHIFTS slide or an addition to 13.
2. **Sovereign / China AI.** Chinese weekly tokens passed US on OpenRouter (Feb 2026); DeepSeek V4 open-weight; Andreessen's "Chinese AI or American AI" framing. Pairs with export-controls slide 16. (High)

---

## Prioritized punch list **v2**

| # | Action | Slides | Type | Effort | Why |
|---|--------|--------|------|--------|-----|
| 1 | Wire in the existing `slide12.png` | 12 | Code | XS | Free win |
| 2 | **RISKS redesign**: split 17 → 17a (sentiment trend) + 17b (NIMBY+politics); cut "Mythos"; swap Echelon→Pew | 17 | Redesign | M | Reality has outrun the slide; biggest analytical upgrade |
| 3 | Refresh the labs (Anthropic→~$900B, Alphabet→~$4.6T, +SpaceX S-1) | 10 | Data | S | Most-stale, highest-stakes numbers |
| 4 | Fix slide-11 bar/band contradiction (drive bars from medians) | 11 | Code | S | 5-second credibility hit |
| 5 | **BUBBLE redesign**: add named bull-vs-bear rails + Marks verdict; new takeaway title | 14 | Redesign | M | Turns a one-sided claim into a credible debate |
| 6 | Generate + wire the other 6 images | 7,17,18–21 | Image | M | Removes the "this is a draft" signal |
| 7 | "Capex on credit" hard data (70%→90% OCF; $662B leases; AMZN FCF −95%; circular loop) | 3,22 | Data | S | Proves Takeaway #1 with numbers |
| 8 | Anchor Power (9) & Agentic (12) to Huang's verbatim quotes; refresh semis/software (13) | 9,12,13 | Data/Narrative | S | Named-source authority; divergence widened |
| 9 | Timeline right-edge → May-2026 models + "China pulls level" | 4 | Data | XS | Stops it looking frozen |
| 10 | (Optional) New slide: inference-cost collapse / "model isn't the moat" | new | Narrative | M | The missing causal link |
| 11 | Carry-overs: slide-8 labels + % ; kill 3-strike repetition; date re-anchor to "late May 2026" | 6,8,12,13,1 | Code | S | Visible polish |

---

## Division of labor / decisions I need from you
- **I can do now, no deps:** #1, #4, #7, #8, #9, #11 (code/text in `build-deck.js`), draft all 7 image prompts, and build the **17a/17b** and **bubble** redesign layouts in code (placeholders where images go).
- **Needs your call:** (a) **add a slide (24→25) for the RISKS split, or compress to 1?** (b) the bubble redesign changes a flagship slide — green-light? (c) how to handle the **violence** data point (footnote vs feature — I recommend footnote). (d) build the inference-cost slide (#10) — yes/no?
- **Needs an image model:** the 6 remaining JPGs (#6). Drop them in `slides-images/` and I wire + re-render in one pass.
- **Verify before presenting (Med/Low):** Anthropic ~$900B close · SaaSpocalypse $285B / Atlassian seat decline · SpaceX ~$1.75T S-1 target · Starcloud/Isomorphic frontier figures · "Leading the Future" $125M vs $140M · the violence reports (sensitive — confirm primary sourcing). Andreessen "debanking" is **contested by regulators** — don't state as fact.

*Full source URLs are in the two research transcripts (this session). Mythos correction and the Pew swap are the two must-dos before any external use.*

// =============================================================================
// AI in the markets: the AI trade is evolving. June 2026
// BII visual style, ALL-DARK edition, PRESENTATION cut (v6).
// Run: node build-deck.js
//   -> outputs ai-markets-deck.pptx (11 slides)
//   -> outputs slides-data.js (title / slide count / detailed speaker notes for index.html)
//
// v6 redesign (2026-06-14):
//   - All concept slides are image-led via addArt(). No native pptxgenjs diagrams.
//   - Image aesthetic: clean flat infographic / data-viz style (not 3D cinematic).
//     Full prompts in IMAGE_PROMPTS_V3.md.
//   - Removed "index fund" slide (old slide 10). Four-gauges watchlist absorbed
//     into slide 9 (bonds) READ box.
//   - Narrative refocused on "AI trade is evolving, still early stages."
//   - 10 image slots, all infographic style.
//   - Data slides (diagnostic matrix, equities, bonds) keep native charts/tables.
//
// Data as of June 2026. Sources cited per slide and consolidated on the final slide.
// Canonical figures: semis +80% / software -10%; Big-4 capex ~$705B (+72%);
// issuance $105B+ over five mega-deals; ~$300B 2026 AI-linked IG supply.
// =============================================================================

const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Strategy";
pres.title = "AI in the markets: June 2026";

// ---------- Brand system ----------

const C = {
  yellow:    "FFD100",
  black:     "000000",
  white:     "FFFFFF",
  orange:    "F6693D",
  gold:      "FFB800",
  pink:      "E8478D",
  tealBright:   "2BC4C4",
  purpleBright: "9B7BE0",
  redBright:    "E5484D",
  ink:       "111114",
  inkPanel:  "1C1C20",
  inkLine:   "2A2A30",
  inkGhost:  "1E1E24",
  inkBar:    "3E3E46",
  inkText:   "E8E8EA",
  inkBody:   "C9C9CE",
  inkMuted:  "9A9AA0",
  inkFaint:  "8A8A90",
};

const PARTS = {
  NOW:    { num: "01", label: "THE SHIFT SO FAR" },
  IMPACT: { num: "02", label: "EARLY MARKET SIGNALS" },
};

const DATA_AS_OF = "Data as of June 2026";
const MD_SOURCE = "Internal strategic review, “The 2026 AI Frontier” (Jun 2026)";
const ART_DIR = "slides-images/web";

// ---------- Helpers (single dark code path) ----------

function newSlide() {
  const s = pres.addSlide();
  s.background = { color: C.ink };
  return s;
}

function addFooter(slide, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.95, w: 10.0, h: 0.675, fill: { color: C.black } });
  slide.addShape(pres.shapes.LINE, { x: 0, y: 4.95, w: 10.0, h: 0, line: { color: C.inkLine, width: 0.5 } });
  slide.addText(
    "FOR INFORMATIONAL PURPOSES ONLY. NOT INVESTMENT ADVICE. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.",
    { x: 1.5, y: 5.0, w: 7.2, h: 0.55, fontSize: 6.5, color: C.inkMuted, align: "center", fontFace: "Arial", valign: "middle", bold: true }
  );
  if (pageNum) {
    slide.addText(String(pageNum), {
      x: 9.3, y: 5.08, w: 0.5, h: 0.35, fontSize: 9, color: C.inkMuted, align: "right", fontFace: "Arial", margin: 0,
    });
  }
}

function addKicker(slide, part, topic, color, w) {
  slide.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.3, w: 0.3, h: 0.05, fill: { color: color } });
  slide.addText(part.num + "  ·  " + part.label + "  ·  " + topic, {
    x: 0.92, y: 0.17, w: w || 6.5, h: 0.3,
    fontSize: 9, color: color, bold: true, fontFace: "Arial", charSpacing: 3, valign: "middle", margin: 0,
  });
}

function addHeadline(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: (opts && opts.y) || 0.48, w: (opts && opts.w) || 9.0, h: (opts && opts.h) || 0.7,
    fontSize: (opts && opts.fontSize) || 30, color: (opts && opts.color) || C.white, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
}

function addSubhead(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: (opts && opts.y) || 1.18, w: (opts && opts.w) || 9.0, h: (opts && opts.h) || 0.5,
    fontSize: (opts && opts.fontSize) || 13, color: (opts && opts.color) || C.inkMuted, fontFace: "Arial", valign: "top", margin: 0,
  });
}

function addChartTitle(slide, text, x, w, color, y) {
  const yy = y || 1.7;
  slide.addText(text, {
    x: x, y: yy, w: w || 4.3, h: 0.28, fontSize: 13, color: C.inkText, bold: true, fontFace: "Arial", valign: "bottom", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, { x: x, y: yy + 0.33, w: w || 4.3, h: 0, line: { color: color || C.inkLine, width: 1 } });
}

function addSource(slide, text, y) {
  slide.addText("Source: " + text, {
    x: 0.5, y: y || 4.5, w: 9.0, h: 0.42, fontSize: 7, color: C.inkFaint, fontFace: "Arial", valign: "top", margin: 0,
  });
}

function addReadBox(slide, x, y, w, h, lead, body) {
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: C.inkPanel }, line: { color: C.inkLine, width: 0.75 } });
  slide.addText("READ", { x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.25, fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0 });
  slide.addText([
    { text: lead, options: { bold: true, color: C.white, breakLine: true, fontSize: 10 } },
    { text: body, options: { color: C.inkBody, fontSize: 9 } },
  ], { x: x + 0.15, y: y + 0.4, w: w - 0.3, h: h - 0.5, fontFace: "Arial", valign: "top", margin: 0 });
}

function addPointCard(slide, opts) {
  const { kicker, color, title, body, x, y, w, h } = opts;
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: C.inkPanel } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.07, h: h, fill: { color: color } });
  slide.addText(kicker, { x: x + 0.18, y: y + 0.08, w: w - 0.3, h: 0.2, fontSize: 7.5, color: color, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0 });
  slide.addText([
    { text: title + "  ", options: { bold: true, color: C.white, fontSize: 10.5 } },
    { text: body, options: { color: C.inkBody, fontSize: 9 } },
  ], { x: x + 0.18, y: y + 0.3, w: w - 0.36, h: h - 0.4, fontFace: "Arial", valign: "top", margin: 0 });
}

function addStat(slide, opts) {
  const { x, y, w, value, label, color, fontSize } = opts;
  slide.addText(value, { x: x, y: y, w: w, h: 0.42, fontSize: fontSize || 22, color: color || C.white, bold: true, fontFace: "Arial Black", margin: 0 });
  slide.addText(label, { x: x, y: y + 0.44, w: w, h: 0.48, fontSize: 7.5, color: C.inkMuted, fontFace: "Arial", valign: "top", margin: 0 });
}

function addArt(slide, opts) {
  const { file, x, y, w, h, label, prompt } = opts;
  const accent = opts.accent || C.yellow;
  const full = file ? path.join(ART_DIR, file) : null;

  if (full && fs.existsSync(full)) {
    slide.addImage({ path: full, x: x, y: y, w: w, h: h, sizing: { type: "cover", w: w, h: h } });
    slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: 0.045, fill: { color: accent } });
    return;
  }

  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: C.inkGhost }, line: { color: C.inkLine, width: 1, dashType: "dash" } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.34, h: 0.04, fill: { color: accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.04, h: 0.34, fill: { color: accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - 0.34, y: y + h - 0.04, w: 0.34, h: 0.04, fill: { color: accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - 0.04, y: y + h - 0.34, w: 0.04, h: 0.34, fill: { color: accent } });

  slide.addText("IMAGE  ·  " + (label || "art"), {
    x: x + 0.2, y: y + 0.16, w: w - 0.4, h: 0.24, fontSize: 9, color: accent, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  slide.addText([
    { text: "IMAGE PROMPT → save as " + (file || "image.png"), options: { italic: true, color: C.inkFaint, fontSize: 7, breakLine: true } },
    { text: prompt, options: { color: C.inkBody, fontSize: 8.5 } },
  ], { x: x + 0.2, y: y + 0.46, w: w - 0.4, h: h - 0.66, fontFace: "Arial", valign: "top", margin: 0 });
}

const BAR_DEFAULTS = {
  barDir: "col",
  showTitle: false,
  catAxisLabelColor: C.inkMuted,
  valAxisHidden: true,
  catAxisLabelFontSize: 9,
  valGridLine: { color: C.inkLine, size: 0.5 },
  catGridLine: { style: "none" },
  barGapWidthPct: 60,
  showValue: true,
  dataLabelPosition: "outEnd",
  dataLabelColor: C.inkText,
  dataLabelFontSize: 9,
  dataLabelFontBold: true,
  dataLabelFormatCode: "0",
  showLegend: false,
};

// Short on-slide prompts (full detailed versions live in IMAGE_PROMPTS_V3.md).
const STYLE = "Clean flat infographic illustration, data-visualization aesthetic, modern and informational: ";
const STYLE_TAIL = ". Deep near-black (#111114) background; clean vector-style shapes with soft gradients; muted institutional palette with selective bright accents; generous whitespace; organized layout with clear visual hierarchy; no photorealism, no dramatic lighting, no 3D renders; no text, no words, no logos, no watermark.";

// =============================================================================
// SLIDE 1: Cover (image-led, infographic)
// =============================================================================
{
  const s = newSlide();
  s.addText("JUNE 2026", { x: 7.0, y: 0.35, w: 2.5, h: 0.35, fontSize: 13, color: C.inkMuted, fontFace: "Arial", align: "right", margin: 0, charSpacing: 2 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.35, w: 1.4, h: 0.07, fill: { color: C.yellow } });
  s.addText("AI in the markets.", { x: 0.5, y: 1.6, w: 5.4, h: 1.1, fontSize: 40, color: C.white, bold: true, fontFace: "Arial Black", margin: 0 });
  s.addText("The AI trade is evolving. We are still in the early stages.", { x: 0.5, y: 2.95, w: 5.0, h: 0.9, fontSize: 18, color: C.yellow, bold: true, fontFace: "Arial Black", margin: 0 });
  s.addText("Strategy  |  Institutional", { x: 0.5, y: 4.25, w: 5.0, h: 0.35, fontSize: 12, color: C.inkMuted, bold: true, fontFace: "Arial", margin: 0 });

  addArt(s, { file: "cover.png", x: 6.0, y: 1.1, w: 3.5, h: 3.4, accent: C.yellow, label: "cover art",
    prompt: STYLE + "three large circular icons in a gentle arc across the composition: a chip/neural-network icon in teal (#2BC4C4) for CAPABILITY, a metered-gauge icon in orange (#F6693D) for ECONOMICS, a governance-shield icon in gold (#FFB800) for POLICY; thin flowing connector lines in muted gray (#2A2A30) converge from all three into a single bright diamond convergence point at bottom-center; each icon sits inside a soft circular glow of its accent color; generous negative space" + STYLE_TAIL });

  addFooter(s, "");
}

// =============================================================================
// SLIDE 2: Three shifts (thesis, image-led infographic)
// =============================================================================
{
  const s = newSlide();
  addHeadline(s, "Three shifts, happening now", { y: 0.35, fontSize: 30 });
  addSubhead(s, "Capability, economics, and policy are all moving at once — the reason this isn’t 2023’s hype cycle.", { y: 1.0 });

  addArt(s, { file: "three-shifts.png", x: 0.5, y: 1.62, w: 9.0, h: 2.7, accent: C.yellow, label: "three shifts",
    prompt: STYLE + "three equal vertical columns arranged horizontally, each showing a transformation. LEFT COLUMN (teal #2BC4C4 accent): a chat-bubble icon at top in muted gray, a downward arrow in teal, a circular loop/cycle icon at bottom in bright teal. CENTER COLUMN (orange #F6693D accent): a coin/token icon with infinity symbol at top in muted gray, a downward arrow in orange, a metered gauge showing limited supply at bottom in bright orange. RIGHT COLUMN (gold #FFB800 accent): a small building/company icon at top in muted gray, a downward arrow in gold, a government dome + shield icon at bottom in bright gold. Thin vertical divider lines (#2A2A30) separate the columns; each column has a subtle rounded-rectangle background panel (#1C1C20); generous spacing" + STYLE_TAIL });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.42, w: 10.0, h: 0.5, fill: { color: C.inkPanel } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.42, w: 0.07, h: 0.5, fill: { color: C.yellow } });
  s.addText("The chatbot’s economics are exhausted. The stack is reorganizing around token-burning agentic loops — and the repricing has only begun.", {
    x: 0.5, y: 4.42, w: 9.0, h: 0.5, fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
  });

  addFooter(s, 2);
}

// =============================================================================
// SLIDE 3: The AI Era Diagnostic Matrix (framework table, native)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.NOW, "DIAGNOSTIC MATRIX", C.tealBright);
  addHeadline(s, "The AI Era Diagnostic Matrix", { fontSize: 27 });
  addSubhead(s, "Four dimensions where the shift from assisted to agentic shows up — most enterprises are still between columns.");

  const tblX = 0.5, tblY = 1.85, labelW = 1.4, colW = 3.6, arrowW = 0.5, rowH = 0.62, headerH = 0.42;

  s.addShape(pres.shapes.RECTANGLE, { x: tblX + labelW, y: tblY, w: colW, h: headerH, fill: { color: C.inkPanel }, line: { color: C.inkLine, width: 0.75 } });
  s.addText("The Assisted Era (fading)", { x: tblX + labelW, y: tblY, w: colW, h: headerH, fontSize: 12, color: C.inkMuted, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: tblX + labelW + colW + arrowW, y: tblY, w: colW, h: headerH, fill: { color: C.inkPanel }, line: { color: C.tealBright, width: 1.5 } });
  s.addText("The Agentic Era (emerging)", { x: tblX + labelW + colW + arrowW, y: tblY, w: colW, h: headerH, fontSize: 12, color: C.tealBright, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0 });

  const rows = [
    { label: "Interface",       assisted: "Chat bubbles & sequential prompts",   agentic: "Background loops & parallel agents" },
    { label: "Cost\nstructure", assisted: "Flat seat-based subscriptions",        agentic: "Metered, usage-based token budgets" },
    { label: "Primary\noutput", assisted: "Text and code snippets",               agentic: "Disposable apps & whole architectures" },
    { label: "Bottleneck",      assisted: "Human attention & typing speed",       agentic: "Token limits & compute allocation" },
  ];
  rows.forEach((r, i) => {
    const ry = tblY + headerH + 0.1 + i * (rowH + 0.1);
    s.addText(r.label, { x: tblX, y: ry, w: labelW - 0.1, h: rowH, fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: tblX + labelW, y: ry, w: colW, h: rowH, fill: { color: C.inkPanel }, line: { color: C.inkLine, width: 0.75 } });
    s.addText(r.assisted, { x: tblX + labelW + 0.18, y: ry, w: colW - 0.36, h: rowH, fontSize: 10.5, color: C.inkBody, fontFace: "Arial", valign: "middle", margin: 0 });
    s.addText("→", { x: tblX + labelW + colW, y: ry, w: arrowW, h: rowH, fontSize: 13, color: C.inkMuted, fontFace: "Arial", align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: tblX + labelW + colW + arrowW, y: ry, w: colW, h: rowH, fill: { color: C.inkPanel }, line: { color: C.tealBright, width: 1.5 } });
    s.addText(r.agentic, { x: tblX + labelW + colW + arrowW + 0.18, y: ry, w: colW - 0.36, h: rowH, fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addFooter(s, 3);
}

// =============================================================================
// SLIDE 4: From prompts to loops (image-led infographic)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.NOW, "AGENTIC LOOPS", C.tealBright);
  addHeadline(s, "From prompts to loops: demand has no ceiling", { fontSize: 26 });
  addSubhead(s, "Agents try, fail, fix, and ship on their own — and a loop burns orders of magnitude more tokens than a chat.");

  addArt(s, { file: "agentic-loops.png", x: 0.5, y: 1.65, w: 5.5, h: 2.75, accent: C.tealBright, label: "agentic loop + jevons",
    prompt: STYLE + "split into two panels side by side. LEFT PANEL: a circular workflow loop with four nodes arranged clockwise, each a clean rounded icon — a play-button icon (try), an X-mark icon (fail), a wrench icon (fix), a rocket icon (ship); smooth curved arrows in bright teal (#2BC4C4) connect them clockwise; a small infinity symbol at the center. RIGHT PANEL: four ascending bars forming a staircase from left to right, each taller than the last, in progressively brighter shades of teal from dark (#1C1C20) to bright (#2BC4C4); an upward-curving arrow in teal traces the top. A thin vertical divider line (#2A2A30) separates the panels; generous whitespace" + STYLE_TAIL });

  s.addText("“My job is to write loops.”", { x: 6.3, y: 2.0, w: 3.2, h: 0.32, fontSize: 14, color: C.white, bold: true, fontFace: "Arial Black", margin: 0 });
  s.addText("Boris Cherny — the agentic workflow in one sentence", { x: 6.3, y: 2.35, w: 3.2, h: 0.2, fontSize: 7.5, color: C.inkMuted, fontFace: "Arial", margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 2.75, w: 3.2, h: 1.5, fill: { color: C.inkPanel } });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 2.75, w: 0.07, h: 1.5, fill: { color: C.tealBright } });
  s.addText([
    { text: "JEVONS PARADOX", options: { bold: true, color: C.tealBright, fontSize: 8, breakLine: true } },
    { text: "As agents make software free to produce, we don’t write the same software cheaper — we write categorically more of it. Efficiency expands compute demand, it doesn’t cap it.", options: { color: C.inkBody, fontSize: 9 } },
  ], { x: 6.48, y: 2.85, w: 2.92, h: 1.3, fontFace: "Arial", valign: "top", margin: 0 });

  addSource(s, MD_SOURCE + ". Cherny/Steinberger loop framing; Jevons paradox illustrative, not measured data.", 4.55);
  addFooter(s, 4);
}

// =============================================================================
// SLIDE 5: Tokens got a budget line (image-led infographic)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.NOW, "TOKEN RATIONING", C.orange);
  addHeadline(s, "Tokens got a budget line");
  addSubhead(s, "Major firms are abandoning unlimited access — rationing is what demand looks like when the input is scarce.");

  addArt(s, { file: "token-budget.png", x: 5.3, y: 1.75, w: 4.2, h: 2.65, accent: C.orange, label: "token flow",
    prompt: STYLE + "a horizontal token-flow pipeline: a large server/cloud icon on the left dispenses small circular token shapes through a central metering gauge with a dial set to a budget level (glowing orange #F6693D), which feeds measured amounts rightward into a neat row of device/endpoint icons; tokens glow gold (#FFB800); the flow is organized, clean, left-to-right; generous spacing" + STYLE_TAIL });

  const cases = [
    { kicker: "UBER", color: C.tealBright, t: "A hard $1,500/mo per-employee token cap replaced unlimited access." },
    { kicker: "WALMART", color: C.orange, t: "Killed unlimited “Code Puppy” access; moved to per-seat budgets." },
    { kicker: "THE CRUNCH", color: C.gold, t: "SK Hynix: no HBM relief before ~2030; Google rents GPUs at $920M/mo." },
  ];
  cases.forEach((c, i) => {
    const y = 1.78 + i * 0.74;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y, w: 0.07, h: 0.66, fill: { color: c.color } });
    s.addText([
      { text: c.kicker + "   ", options: { bold: true, color: c.color, fontSize: 9, breakLine: true } },
      { text: c.t, options: { color: C.inkBody, fontSize: 9.5 } },
    ], { x: 0.67, y: y, w: 4.4, h: 0.66, fontFace: "Arial", valign: "top", margin: 0 });
  });
  addReadBox(s, 0.5, 4.04, 4.57, 0.74, "Token rationing is the first real demand signal.", "Enterprise adoption is still in the early innings — watch token budgets the way retail analysts watch same-store sales.");

  addSource(s, MD_SOURCE + ". Uber & Walmart cost-management cases; SK Hynix HBM outlook; Google/SpaceX GPU rental.", 4.86);
  addFooter(s, 5);
}

// =============================================================================
// SLIDE 6: Governments want a stake (image-led infographic)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.NOW, "POLICY", C.purpleBright);
  addHeadline(s, "Governments want a stake");
  addSubhead(s, "From Washington to Seoul, the debate shifted from regulating AI to owning a piece of it.");

  addArt(s, { file: "gov-stake.png", x: 5.3, y: 1.75, w: 4.2, h: 2.65, accent: C.purpleBright, label: "sovereign stake",
    prompt: STYLE + "a horizontal flow diagram: a classical government-dome icon in gold (#FFB800) on the left, connected by a flow line to a modern data-center/server-rack icon in orange (#F6693D) at center, which distributes small dividend-coin shapes along branching lines to a row of small house icons on the right; organized left-to-right layout; generous spacing" + STYLE_TAIL });

  const pts = [
    { kicker: "UNITED STATES", color: C.purpleBright, t: "Voluntary 30-day NSA pre-release review, plus a floated 50% tax on AI-lab equity to seed a public “AI Dividends” fund." },
    { kicker: "SOUTH KOREA", color: C.tealBright, t: "Presidential adviser floated an AI “citizen dividend”; Samsung’s union demanded 15% of chip-division profit." },
    { kicker: "THE CRITIQUE", color: C.redBright, t: "Sacks: government equity risks “corporate-government fusion.” The debate is now ownership, not regulation." },
  ];
  pts.forEach((p, i) => {
    const y = 1.78 + i * 0.86;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y, w: 0.07, h: 0.82, fill: { color: p.color } });
    s.addText([
      { text: p.kicker + "   ", options: { bold: true, color: p.color, fontSize: 8.5, breakLine: true } },
      { text: p.t, options: { color: C.inkBody, fontSize: 9 } },
    ], { x: 0.67, y: y, w: 4.4, h: 0.82, fontFace: "Arial", valign: "top", margin: 0 });
  });

  s.addText([
    { text: "Investor read: ", options: { bold: true, color: C.white } },
    { text: "public-ownership is a dilution tail risk no equity model currently carries.", options: { color: C.inkBody } },
  ], { x: 0.5, y: 4.38, w: 4.6, h: 0.36, fontSize: 9.5, fontFace: "Arial", valign: "top", margin: 0 });

  addSource(s, MD_SOURCE + "; Korea Herald, Bloomberg, Nikkei Asia (May 2026); Executive Order provisions; Sacks critique.", 4.72);
  addFooter(s, 6);
}

// =============================================================================
// SLIDE 7: The market split the trade (EQUITIES, data slide)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "EQUITIES", C.gold);
  addHeadline(s, "The market split the trade");
  addSubhead(s, "Semis +80%, software −10%: a ~90-point spread inside one theme.");

  addChartTitle(s, "Total return, YTD 2026 (%)", 0.5, 5.6, C.gold);
  s.addChart(pres.charts.BAR, [{
    name: "YTD total return (%)",
    labels: ["Semis (SOXX)", "Equal-weight (RSP)", "S&P 500", "Mag 7 (MAGS)", "Software (IGV)"],
    values: [79.5, 14.3, 11.3, 5.9, -9.5],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.1, w: 5.6, h: 2.3,
    chartColors: [C.orange, C.tealBright, C.inkBar, C.gold, C.redBright],
    catAxisLabelFontSize: 8, valAxisMinVal: -20,
  });

  addStat(s, { x: 6.5, y: 2.0, w: 3.0, value: "37%", color: C.orange,
    label: "Top-10 share of S&P 500 market cap — double the 1990–2015 norm of 18–23%." });
  addStat(s, { x: 6.5, y: 3.1, w: 3.0, value: "21.1x", color: C.tealBright,
    label: "S&P 500 forward P/E vs a 19.0x 10-yr average: elevated, not extreme." });

  s.addText([
    { text: "Leadership is migrating from the platforms to their suppliers — and the reallocation is still underway. ", options: { bold: true, color: C.white } },
    { text: "Value accrues where AI spend is revenue; it erodes where AI is the threat.", options: { color: C.inkBody } },
  ], { x: 0.5, y: 4.46, w: 9.0, h: 0.26, fontSize: 10, fontFace: "Arial", margin: 0 });

  addSource(s, "YTD total returns through early Jun 2026: stockanalysis.com (SOXX, IGV); slickcharts (S&P 500); Morningstar/Yahoo (RSP, MAGS). Weights: S&P DJI. Fwd P/E: FactSet.", 4.74);
  addFooter(s, 7);
}

// =============================================================================
// SLIDE 8: One worker outputs like a team (LABOR, image-led infographic)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "LABOR", C.tealBright);
  addHeadline(s, "One worker now outputs like a team");
  addSubhead(s, "Agents change what a job is — and in 2026 the labor data started moving.");

  addArt(s, { file: "orchestrator-fanout.png", x: 0.5, y: 1.65, w: 4.3, h: 2.75, accent: C.tealBright, label: "orchestrator fanout",
    prompt: STYLE + "a single stylized human-silhouette icon inside a bright teal (#2BC4C4) circle on the left; from it, four smooth curved lines fan out to the right, each ending at a smaller circular icon: a magnifying glass (research), a gear/cog (build), a checkmark in a shield (test), a paper airplane (ship); each smaller icon outlined in teal with dark fill (#1C1C20); subtle concentric rings emanate from the central icon; generous spacing" + STYLE_TAIL });

  const rows = [
    { color: C.redBright, t: "AI is now the #1 stated reason for layoffs.", b: "Cited in ~40% of May’s announced US cuts; 87.7k AI-attributed YTD vs 54.8k in all of 2025 (Challenger; self-reported)." },
    { color: C.orange, t: "The entry level takes the hit.", b: "Recent-grad unemployment 5.6% vs 4.2% overall (NY Fed); the youngest AI-exposed cohort’s payrolls are declining." },
    { color: C.gold, t: "The job that remains is orchestration.", b: "Comp follows loop design, not task execution — and displacement fear fuels the slide-6 ownership debate." },
  ];
  rows.forEach((r, i) => {
    const y = 1.8 + i * 0.88;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: y, w: 0.07, h: 0.8, fill: { color: r.color } });
    s.addText([
      { text: r.t + "  ", options: { bold: true, color: C.white, fontSize: 9.5, breakLine: true } },
      { text: r.b, options: { color: C.inkBody, fontSize: 8.5 } },
    ], { x: 5.17, y: y, w: 4.33, h: 0.82, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addSource(s, "Challenger, Gray & Christmas via CNBC (Jun 5, 2026) & CBS News; NY Fed via CNBC; framing: internal strategic review (Jun 2026).", 4.55);
  addFooter(s, 8);
}

// =============================================================================
// SLIDE 9: The buildout moved to the bond market (MERGED bonds, data slide)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "FINANCING", C.orange);
  addHeadline(s, "The buildout moved to the bond market");
  addSubhead(s, "Capex outgrew cash flow — so $105B+ of IG mega-deals filled the gap in six months.");

  s.addText("THE GAP", { x: 0.5, y: 1.78, w: 2.4, h: 0.2, fontSize: 8, color: C.orange, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0 });
  addStat(s, { x: 0.5, y: 2.04, w: 2.5, value: "~$705B", color: C.orange, fontSize: 24,
    label: "Big-4 guided 2026 capex, +72% YoY — it consumes ~94% of operating cash flow." });
  s.addText("Big-4 FCF at a decade low; Amazon goes negative; Alphabet FCF ~−90%.", { x: 0.5, y: 3.0, w: 2.6, h: 0.7, fontSize: 8.5, color: C.inkMuted, fontFace: "Arial", valign: "top", margin: 0 });

  addChartTitle(s, "The issuance wave — $105B+ in six months", 3.35, 3.55, C.orange, 1.78);
  const deals = [
    { amt: "$18B", who: "Oracle", when: "Sep ’25" },
    { amt: "$30B", who: "Meta", when: "Oct ’25" },
    { amt: "$17.5B", who: "Alphabet", when: "Nov ’25" },
    { amt: "$15B", who: "Amazon", when: "Nov ’25" },
    { amt: "$25B", who: "Oracle", when: "Feb ’26" },
  ];
  s.addShape(pres.shapes.LINE, { x: 3.5, y: 2.95, w: 2.95, h: 0, line: { color: C.inkLine, width: 1.5 } });
  deals.forEach((d, i) => {
    const x = 3.35 + i * 0.63;
    s.addShape(pres.shapes.OVAL, { x: x + 0.24, y: 2.89, w: 0.12, h: 0.12, fill: { color: C.orange } });
    s.addText(d.amt, { x: x - 0.05, y: 2.46, w: 0.7, h: 0.34, fontSize: 11.5, color: C.orange, bold: true, fontFace: "Arial Black", align: "center", margin: 0 });
    s.addText([
      { text: d.who, options: { bold: true, color: C.white, fontSize: 7.5, breakLine: true } },
      { text: d.when, options: { color: C.inkMuted, fontSize: 7 } },
    ], { x: x - 0.05, y: 3.1, w: 0.7, h: 0.5, fontFace: "Arial", align: "center", valign: "top", margin: 0 });
  });

  addStat(s, { x: 6.7, y: 1.95, w: 2.8, value: "~$300B", color: C.gold, fontSize: 22,
    label: "AI-linked IG supply expected for full-year 2026 (UBS, Barclays via Reuters)." });
  addStat(s, { x: 6.7, y: 2.9, w: 2.8, value: ">125bp", color: C.tealBright, fontSize: 22,
    label: "Oracle 5-yr CDS despite light leverage — credit already discriminates by funding capacity." });

  addReadBox(s, 0.5, 3.86, 9.0, 0.9, "Credit reprices before equity. The financing infrastructure is being built in real time.", "Watch four gauges: demand (capex + token budgets), financing (CDS spreads), rates (~4.5% 10-yr), concentration (top-10 share). A failed mega-deal reprices AI equities in days.");

  addSource(s, "Capex: company reports via CNBC (Feb 6, 2026). Cash math: BofA via Breckinridge. Deals: Mawer, M&G, Fortune, CNBC. Supply: UBS & Barclays via Reuters. CDS: MUFG via CNBC.", 4.84);
  addFooter(s, 9);
}

// =============================================================================
// SLIDE 10: The frontier (image-led infographic cards)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "THE FRONTIER", C.pink, 4.3);
  s.addText("FRONTIER WATCH · SPECULATIVE", { x: 5.4, y: 0.17, w: 4.1, h: 0.3, fontSize: 8, color: C.inkMuted, bold: true, fontFace: "Arial", charSpacing: 2, valign: "middle", align: "right", margin: 0 });
  addHeadline(s, "Where the next decade of demand lives", { fontSize: 24 });
  addSubhead(s, "None of this is in 2026 guidance — all of it extends the Jevons demand curve by another decade.");

  const cards = [
    { file: "frontier-embodiment.png", t: "Embodiment.", b: "Agentic loops in a body — physical labor enters the token economy.",
      prompt: STYLE + "a simple robotic-arm icon in magenta-pink (#E8478D) connected by a curved arrow to a circular loop symbol; a small warehouse/factory icon in muted gray (#3E3E46) in the background; abstract and diagrammatic; generous spacing" + STYLE_TAIL },
    { file: "frontier-wheels.png", t: "Wheels.", b: "Robotaxis are inference on wheels — per-mile token economics.",
      prompt: STYLE + "a minimal car silhouette icon in magenta-pink (#E8478D) with small radiating sensor-cone lines; thin data-stream lines flow from a cloud/server icon above into the car; a subtle road grid in muted gray (#2A2A30) beneath; abstract and diagrammatic" + STYLE_TAIL },
    { file: "frontier-orbit.png", t: "Orbit.", b: "Orbital compute escapes the grid constraint behind token rationing.",
      prompt: STYLE + "a simple ring/torus shape in magenta-pink (#E8478D) with small rectangular modules around its rim, floating above a gentle curved line representing Earth’s horizon in muted gray; small solar-panel wing shapes extend from the ring; abstract and diagrammatic" + STYLE_TAIL },
    { file: "frontier-proteins.png", t: "Proteins.", b: "AI-designed proteins make discovery compute-bound; R&D looks like capex.",
      prompt: STYLE + "a stylized folded-protein ribbon shape in magenta-pink (#E8478D) and warm orange (#F6693D) with a small DNA helix icon nearby; a subtle connection line leads to a compute/chip icon; clean abstract molecular-diagram aesthetic" + STYLE_TAIL },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 2.25;
    addArt(s, { file: c.file, x: x, y: 1.7, w: 2.1, h: 1.35, accent: C.pink, label: c.t.replace(".", "").toLowerCase(), prompt: c.prompt });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 3.12, w: 2.1, h: 1.28, fill: { color: C.inkPanel } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 3.12, w: 2.1, h: 0.04, fill: { color: C.pink } });
    s.addText([
      { text: c.t + "  ", options: { bold: true, color: C.white, fontSize: 9.5, breakLine: true } },
      { text: c.b, options: { color: C.inkBody, fontSize: 8 } },
    ], { x: x + 0.12, y: 3.24, w: 1.86, h: 1.08, fontFace: "Arial", valign: "top", margin: 0 });
  });

  s.addText([
    { text: "These are not 2026 revenue items — they are the next decade’s demand curve, extending the early-stage thesis. ", options: { bold: true, color: C.white } },
    { text: "Watch them like markets, not memes: launch cadence, fleet miles, design wins.", options: { color: C.inkBody } },
  ], { x: 0.5, y: 4.5, w: 9.0, h: 0.26, fontSize: 10, fontFace: "Arial", margin: 0 });

  addSource(s, "Deck analysis building on " + MD_SOURCE + ". All frontier-watch items are speculative and appear in no company guidance.", 4.74);
  addFooter(s, 10);
}

// =============================================================================
// SLIDE 11: Sources & methodology
// =============================================================================
{
  const s = newSlide();
  addHeadline(s, "Sources & methodology", { fontSize: 22, y: 0.35 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.98, w: 2.6, h: 0.38, fill: { color: C.orange } });
  s.addText(DATA_AS_OF.toUpperCase(), { x: 0.5, y: 0.98, w: 2.6, h: 0.38, fontSize: 10.5, color: C.black, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1 });
  s.addText("All return figures are YTD total returns through the most recent available close (Jun 5–9, 2026, unless noted). Index and market-cap figures as of early June 2026.", {
    x: 3.3, y: 0.98, w: 6.2, h: 0.42, fontSize: 8.5, color: C.inkMuted, fontFace: "Arial", valign: "middle", margin: 0,
  });

  const cols = [
    { h: "MARKET DATA", color: C.gold, items: [
      "ETF returns & stats: stockanalysis.com (SOXX, IGV); Morningstar / Yahoo Finance (RSP, MAGS)",
      "Index returns & weights: slickcharts.com; S&P Dow Jones Indices; MacroMicro",
      "Market caps: companiesmarketcap.com; Motley Fool research (Jun 2026)",
      "Valuations: FactSet Earnings Insight; rates: US Treasury / FRED; CNBC (Jun 5, 2026)",
    ]},
    { h: "CAPEX & FINANCING", color: C.orange, items: [
      "Capex guidance: company reports via CNBC (Feb 6, 2026); Tom’s Hardware; Statista (midpoints)",
      "Cash-flow math: BofA via Breckinridge; CNBC; techtimes / beincrypto FCF estimates",
      "Bond issuance: Mawer; M&G Investments; Fortune (Mar 2026); CNBC (Feb 2026)",
      "Supply forecasts: UBS & Barclays via Reuters (Jan 2026); credit signals: MUFG CDS via CNBC",
    ]},
    { h: "LABOR & POLICY", color: C.tealBright, items: [
      "Layoffs: Challenger, Gray & Christmas via CNBC (Jun 5, 2026) & CBS News; AI cited in ~40% of May cuts",
      "Graduate unemployment: NY Fed recent-grad series (5.6% vs 4.2% overall) via CNBC",
      "Entry-level payrolls: academic working papers on AI-exposed occupations (22–25 cohort)",
      "Policy: Executive Order provisions, sovereign-wealth-fund proposals, Sacks critique",
    ]},
    { h: "AI FRONTIER REVIEW", color: C.purpleBright, items: [
      "Internal strategic review: “The 2026 AI Frontier” (Jun 2026)",
      "Agentic loops & token economics; enterprise caps (Uber, Walmart); Karpathy & Cherny commentary",
      "Compute: SK Hynix HBM outlook; SpaceX Colossus; Google GPU rental",
      "Frontier watch: embodiment, orbital compute, robotaxis, AI biology; speculative",
    ]},
  ];
  cols.forEach((c, i) => {
    const x = 0.5 + i * 2.325;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.58, w: 2.25, h: 0.24, fill: { color: c.color } });
    s.addText(c.h, { x: x, y: 1.58, w: 2.25, h: 0.24, fontSize: 7.5, color: C.black, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1 });
    s.addText(c.items.map((t, j) => ({
      text: t, options: { bullet: { code: "2022", indent: 7 }, breakLine: j < c.items.length - 1, fontSize: 7.2, color: C.inkBody },
    })), { x: x + 0.04, y: 1.9, w: 2.18, h: 2.4, fontFace: "Arial", valign: "top", paraSpaceAfter: 4, margin: 0 });
  });

  s.addText("Methodology: figures verified against at least one primary or institutional source; where sources disagreed, the more conservative figure was used. The Jevons relationship (slide 4) is illustrative, not measured data. Layoff attributions to AI are self-reported by employers (Challenger) and may overstate causation. Frontier items (slide 10) are speculative and appear in no company guidance. End of deck.", {
    x: 0.5, y: 4.34, w: 9.0, h: 0.56, fontSize: 7.5, color: C.inkFaint, italic: true, fontFace: "Arial", margin: 0,
  });

  addFooter(s, 11);
}

// =============================================================================
// Detailed speaker notes (SINGLE SOURCE: feeds both the .pptx and the viewer)
// =============================================================================
const NOTES = [
  // 1 - Cover
  "Open here. The deck in one breath: the AI trade is evolving and we are still in the early stages of this transformation. Part one is what’s shifted so far: models became loop-running agents, tokens became a rationed input, and governments moved from regulating AI to debating who owns it. Part two is how markets are beginning to reprice: equities split the trade, the labor data started moving, and financing moved into the bond market. Eleven slides, two parts, one question throughout: what does this do to portfolios. Keep the framing simple up top; the detail comes slide by slide.",
  // 2 - Three shifts
  "The thesis, and why this isn’t 2023’s hype cycle: three independent systems shifting in the same direction at once. CAPABILITY: Fable 5-class models swept functional SOTA; the unit of work moved from prompting outputs to designing self-correcting loops that run until done. Proof point: Anthropic’s run rate went from about $3B in 2025 to about $47B in 2026. ECONOMICS: labs stopped subsidizing tokens and enterprises started rationing them; compute is now priced like a scarce commodity at every layer. Proof point: Google pays SpaceX about $920M a month to rent 110k GPUs, the market-clearing price of scarcity. POLICY: equity-tax proposals and pre-release reviews mean foundation models are treated as sovereign assets. Proof point: a floated one-time 50% tax on AI-lab equity to seed a public ‘AI Dividends’ fund. The banner is the line to read aloud: the chatbot’s economics are exhausted, and the stack is reorganizing around token-burning agentic loops — and the repricing has only begun.",
  // 3 - Diagnostic matrix
  "Framework slide: four dimensions where the assisted-to-agentic transition shows up, and each reprices differently. Interface shifted from chat bubbles to background loops and parallel agents. Cost moved from flat seats to metered, usage-based token budgets. Output evolved from text and code snippets to disposable apps and whole software architectures. The bottleneck moved from human attention and typing speed to token limits and compute allocation. Most enterprises are between columns, not at the destination — the transition is still unfolding. Use this as the map: every market-signal slide that follows is one of these four dimensions showing up in the data.",
  // 4 - Loops + Jevons
  "The core slide of part one. The unit of work changed: from one-shot prompting to loops that try, fail, fix, and ship without a human in each cycle. Boris Cherny’s line, ‘my job is to write loops,’ is the cleanest articulation. Then the Jevons paradox, coal in 1865 applied to compute: as agents make software effectively free to produce, we don’t write the same software cheaper, we write categorically more of it: internal PDF summaries become dashboards become disposable single-use apps become giant research projects. The investment translation: efficiency improvements do not cap compute demand, they expand it. That is the demand engine behind everything in part two. Flag the curve as illustrative, not measured data.",
  // 5 - Tokens
  "Three data points, one message: enterprises now treat tokens as a metered input with a budget line. Uber put a hard $1,500-per-month per-employee cap in place, replacing unlimited access. Walmart killed unlimited access for its ‘Code Puppy’ agentic dev tool and moved to per-seat budgets plus efficiency training. The third point is the supply side: SK Hynix sees no HBM relief before about 2030 even after doubling capacity, and Google’s roughly $920M-a-month GPU rental is what scarcity costs when you don’t own the capacity. The read is the investability point: token rationing is the first real demand signal, and enterprise adoption is still in the early innings — watch token budgets the way retail analysts watch foot traffic.",
  // 6 - Policy
  "The policy slide, now global, and the KOSPI number lives here in the talk track rather than on the slide. United States: a voluntary 30-day NSA pre-release review (a calendar item before every frontier release), plus a floated one-time 50% tax on AI-lab equity to seed a public ‘AI Dividends’ fund, proposed by Sanders and echoed by Trump, which tells you the Overton window moved. South Korea: a presidential policy adviser, Kim Yong-beom, floated a ‘citizen dividend’ from AI and chip tax windfalls on May 12; the KOSPI dropped about 5.1% intraday before President Lee Jae-myung walked it back, and Samsung’s union had already demanded 15% of chip-division profit in April. Sacks completes the triangle, warning government equity risks corporate-government fusion. The investable point: public-ownership is now a dilution tail risk that belongs in any model of lab equity, the IPO pipeline, and the hyperscalers holding lab stakes.",
  // 7 - Equities
  "Part two opens with the equity scoreboard. Semis (SOXX) up about 80% year to date, the best run since 2000; equal-weight (RSP) up about 14%, beating cap-weight at about 11%; Mag-7 (MAGS) up about 6%, lagging; software (IGV) down about 10%, priced for disruption. That is roughly a 90-point spread inside one theme. The market is no longer trading ‘AI yes or no’; it is trading position in the chain. The right rail is the concentration story: 37% of the index sits in ten names, double the 25-year norm; the forward multiple at 21.1x is elevated but not extreme, provided the AI earnings stream keeps compounding. Takeaway: value accrues where AI spend is revenue and erodes where AI is the threat — and the reallocation is still underway.",
  // 8 - Labor
  "The labor slide, with verified June 2026 data. The structural story: a job stops being task execution and becomes orchestration of parallel agent loops; one person now outputs like a team. The data: Challenger’s May report made AI the number-one stated reason for layoffs for the first time, cited in about 40% of announced cuts, with 87.7k AI-attributed cuts year to date versus 54.8k in all of 2025, with the honest caveat that this is self-reported and some firms may be scapegoating AI. The entry level is where it bites: recent-grad unemployment at 5.6% versus 4.2% overall, per the NY Fed, with declining payrolls for the youngest AI-exposed cohort. Markets price labor twice: as a cost line agents deflate, and as the political trigger for the slide-6 ownership debate.",
  // 9 - Bonds + four gauges
  "Bonds, the whole arc on one slide. First the gap: Big-4 capex went from $410B to about $705B guided, up 72%, and that consumes roughly 94% of operating cash flow once you add dividends and buybacks; Big-4 free cash flow is at a decade low, Amazon goes outright negative ($200B capex versus about $140B operating cash flow), and Alphabet’s FCF falls about 90% to roughly $8B. The self-funding megacap contract broke in 2026. Then the wave that filled the gap: Oracle $18B (Sep ’25), Meta $30B (Oct ’25, the largest non-M&A IG deal on record), Alphabet $17.5B and Amazon $15B (Nov ’25), and Oracle again $25B across eight tranches (Feb ’26), totaling $105B-plus in six months, with Street consensus around $300B of AI-linked IG supply for full-year 2026. The signal layer: Oracle’s 5-year CDS above about 125bp despite light leverage, so credit is already discriminating by funding capacity. The read for equity holders: credit reprices before equity, spreads move before earnings revisions. Four gauges to watch: demand (capex + token budgets), financing (CDS and new-issue spreads), rates (~4.5% 10-year), concentration (top-10 share vs equal-weight spread). A failed mega-deal would reprice AI equities within days. Balance sheets are still lightly levered versus IG norms, so this is not 2008 telecom, but the funding model changed permanently.",
  // 10 - Frontier
  "The closer: the option value sitting behind the multiples, kept disciplined and flagged speculative. Embodiment: agentic loops in a body, walking a warehouse shift, so physical labor enters the token economy. Wheels: every robotaxi mile is metered inference and a city-scale demand pool for compute. Orbit: orbital compute removes the exact power-and-cooling constraints behind token rationing, and SpaceX is simultaneously the neocloud king and the launch monopolist, so if it happens it extends the most vertically integrated player in the stack. Proteins: frontier models lead biology benchmarks and AI-designed proteins make discovery compute-bound, so R&D starts to look like capex. Every card is new compute demand: the Jevons curve extended a decade. These are not 2026 revenue items — they are the next decade’s demand curve, extending the early-stage thesis. Watch them like markets, not memes: launch cadence, fleet miles, design wins; gauges, not guidance.",
  // 11 - Sources
  "Back matter. Canonical stamp: data as of June 2026, returns through the Jun 5–9 closes. Four source columns: market data, capex and financing, labor and policy, and the internal frontier review. Honesty notes to say out loud if asked: the Jevons relationship is illustrative, not measured; AI layoff attributions are self-reported by employers and may overstate causation; and the frontier items are speculative and appear in no company guidance. Where sources disagreed, the more conservative figure was used. End of deck.",
];

// =============================================================================
// Write the .pptx, then emit slides-data.js for the HTML viewer
// =============================================================================

const TITLES = [
  "Cover: AI in the markets",
  "Three shifts, happening now",
  "The AI Era Diagnostic Matrix",
  "From prompts to loops: demand has no ceiling",
  "Tokens got a budget line",
  "Governments want a stake",
  "The market split the trade",
  "One worker now outputs like a team",
  "The buildout moved to the bond market",
  "Where the next decade of demand lives",
  "Sources & methodology",
];

if (TITLES.length !== NOTES.length) {
  throw new Error("Slide count mismatch: " + TITLES.length + " titles vs " + NOTES.length + " notes; update both arrays together.");
}
if (TITLES.length !== pres.slides.length) {
  throw new Error("Slide count mismatch: " + TITLES.length + " titles vs " + pres.slides.length + " rendered slides.");
}

pres.slides.forEach((slide, idx) => slide.addNotes(NOTES[idx]));

const BUILD_STAMP = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);

const viewerData = {
  title: "AI in the markets",
  subtitle: "The AI trade is evolving. We are still in the early stages. June 2026",
  file: "ai-markets-deck.pptx",
  v: BUILD_STAMP,
  total: TITLES.length,
  sections: [
    { start: 1, label: "Intro" },
    { start: 3, label: "01 The shift so far" },
    { start: 7, label: "02 Early market signals" },
    { start: 11, label: "Sources" },
  ],
  titles: TITLES,
  notes: NOTES,
};

fs.writeFileSync("slides-data.js", "window.DECK = " + JSON.stringify(viewerData, null, 2) + ";\n");

pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name, "+ slides-data.js (" + viewerData.total + " slides, v=" + BUILD_STAMP + ")"); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

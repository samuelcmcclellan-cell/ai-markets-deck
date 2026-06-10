// =============================================================================
// AI in the Market — From Chatbots to Agentic Loops — June 2026
// BII visual style (refined): light base + dark emphasis slides, 16:9 (10" x 5.625")
// Run: node build-deck.js
//   → outputs ai-markets-deck.pptx (25 slides)
//   → outputs slides-data.js (title / slide count / speaker notes for index.html)
//
// Data as of June 2026. Sources cited per slide and consolidated on slide 25.
// Rebuilt 2026-06-09 (v3): "the show" edition —
//   • point-first cards & dividers (claims lead, numbers support)
//   • new openers: spring-2026 timeline + "three paradigms shifting in unison"
//   • Jevons-paradox dark showpiece chart (core message)
//   • Act 05 THE FRONTIER: orbital datacenters, embodiment, biology,
//     talking-to-animals callout — with embedded renders (slides-images/web)
// Canonical figures: semis +80% / software −10% / 90pp; Big-4 capex ~$705B (+72%).
// =============================================================================

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Strategy";
pres.title = "AI in the Market — From Chatbots to Agentic Loops — June 2026";

// ---------- Brand system ----------

const C = {
  yellow:    "FFD100", // brand accent — cover & divider rules only
  black:     "000000",
  white:     "FFFFFF",
  darkGray:  "333333",
  medGray:   "666666",
  lightGray: "E5E5E5",
  offWhite:  "F9F9F9",
  orange:    "F6693D",
  gold:      "FFB800",
  green:     "00A854",
  pink:      "E8478D",
  purple:    "6B46C1",
  teal:      "008B8B",
  red:       "CC0000",
  // dark-slide system
  ink:       "111114",
  inkPanel:  "1C1C20",
  inkLine:   "2A2A30",
  inkGhost:  "1E1E24",
  inkText:   "E8E8EA",
  inkMuted:  "9A9AA0",
};

// Five-act structure → typographic kickers
const ACTS = {
  SHIFT:    { num: "01", label: "THE SHIFT",    color: C.teal },
  CRUNCH:   { num: "02", label: "THE CRUNCH",   color: C.orange },
  MARKET:   { num: "03", label: "THE MARKET",   color: C.gold },
  STAKES:   { num: "04", label: "THE STAKES",   color: C.purple },
  FRONTIER: { num: "05", label: "THE FRONTIER", color: C.pink },
};

const DATA_AS_OF = "Data as of June 2026"; // single canonical stamp (slide 25)
const MD_SOURCE = "Internal strategic review, “The 2026 AI Frontier” (Jun 2026)";
const IMG = "slides-images/web";

// ---------- Helpers ----------

function addFooter(slide, pageNum, dark) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.95, w: 10.0, h: 0.675, fill: { color: dark ? C.black : C.darkGray },
  });
  if (dark) {
    slide.addShape(pres.shapes.LINE, { x: 0, y: 4.95, w: 10.0, h: 0, line: { color: C.inkLine, width: 0.5 } });
  }
  slide.addText(
    "FOR INFORMATIONAL PURPOSES ONLY. NOT INVESTMENT ADVICE. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.",
    { x: 1.5, y: 5.0, w: 7.2, h: 0.55, fontSize: 6.5, color: dark ? C.inkMuted : C.white, align: "center", fontFace: "Arial", valign: "middle", bold: true }
  );
  if (pageNum) {
    slide.addText(String(pageNum), {
      x: 9.3, y: 5.08, w: 0.5, h: 0.35, fontSize: 9, color: dark ? C.inkMuted : C.white, align: "right", fontFace: "Arial", margin: 0,
    });
  }
}

function addKicker(slide, act) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.3, w: 0.3, h: 0.05, fill: { color: act.color },
  });
  slide.addText(act.num + "  ·  " + act.label, {
    x: 0.92, y: 0.17, w: 5.0, h: 0.3,
    fontSize: 9, color: act.color, bold: true, fontFace: "Arial", charSpacing: 3, valign: "middle", margin: 0,
  });
}

function addHeadline(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: (opts && opts.y) || 0.48, w: (opts && opts.w) || 9.0, h: (opts && opts.h) || 0.62,
    fontSize: (opts && opts.fontSize) || 26, color: (opts && opts.color) || C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
}

function addSubhead(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: (opts && opts.y) || 1.12, w: (opts && opts.w) || 9.0, h: (opts && opts.h) || 0.45,
    fontSize: 12.5, color: (opts && opts.color) || C.medGray, fontFace: "Arial", valign: "top", margin: 0,
  });
}

function addChartTitle(slide, text, x, w, color, y) {
  const yy = y || 1.62;
  slide.addText(text, {
    x: x, y: yy, w: w || 4.3, h: 0.28,
    fontSize: 13, color: C.black, bold: true, fontFace: "Arial", valign: "bottom", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: x, y: yy + 0.33, w: w || 4.3, h: 0, line: { color: color || C.black, width: 1 },
  });
}

function addSource(slide, text, y) {
  slide.addText("Source: " + text, {
    x: 0.5, y: y || 4.46, w: 9.0, h: 0.42,
    fontSize: 7, color: "999999", fontFace: "Arial", valign: "top", margin: 0,
  });
}

// Dark "READ" rail (interpretation box).
function addReadBox(slide, x, y, w, h, lead, body) {
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: C.inkPanel } });
  slide.addText("READ", {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.25, fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  slide.addText([
    { text: lead, options: { bold: true, color: C.white, breakLine: true, fontSize: 10 } },
    { text: "\n" + body, options: { color: "CCCCCC", fontSize: 9 } },
  ], { x: x + 0.15, y: y + 0.4, w: w - 0.3, h: h - 0.5, fontFace: "Arial", valign: "top", margin: 0 });
}

// Point-first card: a small named kicker, a bold claim, evidence woven into the body.
function addPointCard(slide, opts) {
  const { kicker, color, title, body, x, y, w, h } = opts;
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: C.offWhite } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.07, h: h, fill: { color: color } });
  slide.addText(kicker, {
    x: x + 0.18, y: y + 0.08, w: w - 0.3, h: 0.2,
    fontSize: 7.5, color: color, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  slide.addText([
    { text: title + "  ", options: { bold: true, color: C.black, fontSize: 10.5 } },
    { text: body, options: { color: C.darkGray, fontSize: 9 } },
  ], { x: x + 0.18, y: y + 0.3, w: w - 0.36, h: h - 0.4, fontFace: "Arial", valign: "top", margin: 0 });
}

// Full dark divider slide — point-first: a thesis title plus two proof lines.
function addDividerSlide(pageNum, act, title, sub, proofs) {
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addText(act.num, {
    x: 5.7, y: 0.1, w: 4.1, h: 3.4,
    fontSize: 200, color: C.inkGhost, bold: true, fontFace: "Arial Black", align: "right", valign: "top", margin: 0,
  });
  s.addText("ACT " + act.num + "  ·  " + act.label, {
    x: 0.55, y: 0.95, w: 6.0, h: 0.3,
    fontSize: 10, color: act.color, bold: true, fontFace: "Arial", charSpacing: 4, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 1.42, w: 1.1, h: 0.06, fill: { color: C.yellow } });
  s.addText(title, {
    x: 0.55, y: 1.68, w: 8.4, h: 0.85,
    fontSize: 31, color: C.white, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
  s.addText(sub, {
    x: 0.55, y: 2.52, w: 7.4, h: 0.5,
    fontSize: 12, color: C.inkMuted, fontFace: "Arial", valign: "top", margin: 0,
  });
  (proofs || []).forEach((p, i) => {
    const y = 3.25 + i * 0.72;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: y + 0.05, w: 0.12, h: 0.12, fill: { color: act.color } });
    s.addText([
      { text: p.lead + "  ", options: { bold: true, color: C.white, fontSize: 11.5 } },
      { text: p.rest, options: { color: C.inkMuted, fontSize: 10 } },
    ], { x: 0.85, y: y - 0.06, w: 7.6, h: 0.66, fontFace: "Arial", valign: "top", margin: 0 });
  });
  addFooter(s, pageNum, true);
  return s;
}

const BAR_DEFAULTS = {
  barDir: "col",
  showTitle: false,
  catAxisLabelColor: "666666",
  valAxisHidden: true,
  catAxisLabelFontSize: 9,
  valGridLine: { color: "F0F0F0", size: 0.5 },
  catGridLine: { style: "none" },
  barGapWidthPct: 60,
  showValue: true,
  dataLabelPosition: "outEnd",
  dataLabelColor: "333333",
  dataLabelFontSize: 9,
  dataLabelFontBold: true,
  dataLabelFormatCode: "0", // whole-number labels — keeps labels & prose in sync
  showLegend: false,
};

// =============================================================================
// SLIDE 1 — Cover (DARK)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addText("JUNE 2026", {
    x: 7.4, y: 0.3, w: 2.1, h: 0.35,
    fontSize: 14, color: C.inkMuted, fontFace: "Arial", align: "right", margin: 0, charSpacing: 2,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 1.4, h: 0.07, fill: { color: C.yellow } });
  s.addText("AI in the Market.", {
    x: 0.5, y: 1.25, w: 9.0, h: 0.95,
    fontSize: 46, color: C.white, bold: true, fontFace: "Arial Black", margin: 0,
  });
  s.addText("From chatbots to agentic loops.", {
    x: 0.5, y: 2.3, w: 9.0, h: 0.6,
    fontSize: 25, color: C.yellow, bold: true, fontFace: "Arial Black", margin: 0,
  });
  s.addText("What changed this spring, why it's the most exciting stretch of the cycle — and how markets are repricing around it.", {
    x: 0.5, y: 3.15, w: 8.6, h: 0.4,
    fontSize: 14, color: C.inkText, fontFace: "Arial", margin: 0,
  });
  s.addText("Strategy  |  Institutional", {
    x: 0.5, y: 4.1, w: 5.0, h: 0.35,
    fontSize: 12, color: C.inkMuted, bold: true, fontFace: "Arial", margin: 0,
  });
  addFooter(s, "", true);
  s.addNotes("This version of the deck is built as a show: what just changed (slides 2–3), why the agentic shift matters (Act 1), the physical and financial machinery behind it (Acts 2–3), the political stakes (Act 4), and where it's heading — orbit, embodiment, biology, even talking to animals (Act 5). Every stop returns to one question: what does this do to equity markets and portfolios.");
}

// =============================================================================
// SLIDE 2 — The spring of 2026 changed the story (timeline)
// =============================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "The spring of 2026 changed the story", { y: 0.3 });
  addSubhead(s, "Six developments in four months moved AI from a chat product to a market regime — capability, infrastructure, and policy all at once.", { y: 0.95 });

  const events = [
    { when: "FEB", color: C.orange, t: "Capex goes vertical", d: "Big-4 2026 guidance lands at ~$705B (+72%); Oracle prints a $25B, eight-tranche bond deal." },
    { when: "SPRING", color: C.teal, t: "The “step change”", d: "Mythos/Fable 5-class models sweep functional SOTA — agentic coding, legal, cyber, biology (Karpathy)." },
    { when: "APR", color: C.gold, t: "Chips rip", d: "The chip index jumps +35% in a single month; ~$5.7T of market value added this rally (WSJ)." },
    { when: "SPRING", color: C.orange, t: "Scarcity gets a price", d: "Google rents 110k Nvidia GPUs from SpaceX at $920M/month while its own silicon catches up." },
    { when: "SPRING", color: C.purple, t: "Washington moves", d: "Executive Order: 30-day pre-release reviews; the sovereign-wealth-fund debate goes mainstream." },
    { when: "JUN", color: C.teal, t: "Demand shows up", d: "Anthropic's run rate hits $47B; memory shortages spill into autos and consumer goods." },
  ];
  s.addShape(pres.shapes.LINE, { x: 0.7, y: 2.78, w: 8.6, h: 0, line: { color: C.lightGray, width: 1.5 } });
  events.forEach((e, i) => {
    const x = 0.5 + i * 1.52;
    const above = i % 2 === 0;
    s.addShape(pres.shapes.OVAL, { x: x + 0.66, y: 2.71, w: 0.14, h: 0.14, fill: { color: e.color } });
    const ty = above ? 1.62 : 2.98;
    s.addText(e.when, {
      x: x, y: ty, w: 1.46, h: 0.2, fontSize: 8, color: e.color, bold: true, fontFace: "Arial", charSpacing: 2, align: "center", margin: 0,
    });
    s.addText([
      { text: e.t, options: { bold: true, color: C.black, fontSize: 9, breakLine: true } },
      { text: e.d, options: { color: C.darkGray, fontSize: 7.5 } },
    ], { x: x, y: ty + 0.2, w: 1.46, h: 0.85, fontFace: "Arial", align: "center", valign: "top", margin: 0 });
  });

  s.addText([
    { text: "Any one of these is a story. Together they're a regime change ", options: { bold: true, color: C.black } },
    { text: "— and they're moving in unison (next slide).", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.12, w: 9.0, h: 0.3, fontSize: 10.5, fontFace: "Arial", margin: 0 });

  // Act roadmap strip
  const strip = [
    { a: ACTS.SHIFT, range: "4–7" },
    { a: ACTS.CRUNCH, range: "8–11" },
    { a: ACTS.MARKET, range: "12–17" },
    { a: ACTS.STAKES, range: "18–21" },
    { a: ACTS.FRONTIER, range: "22–24" },
  ];
  strip.forEach((t, i) => {
    const x = 0.5 + i * 1.84;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 4.6, w: 0.12, h: 0.12, fill: { color: t.a.color } });
    s.addText([
      { text: t.a.num + " " + t.a.label + "  ", options: { bold: true, color: C.black, fontSize: 7.5 } },
      { text: t.range, options: { color: C.medGray, fontSize: 7.5 } },
    ], { x: x + 0.18, y: 4.53, w: 1.66, h: 0.26, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addSource(s, "CNBC (Feb 6, 2026); WSJ (April chip rally); " + MD_SOURCE + " — model releases, GPU rental, run rates, policy items.", 4.78);
  addFooter(s, 2);
  s.addNotes("The show opener. Walk the line left to right: February the money (capex guidance + Oracle's mega-print), spring the capability (functional SOTA sweep — the 'step change'), April the market reaction (chips +35% in a month), then scarcity priced in public ($920M/month rental), policy waking up, and June's demand proof ($47B run rate, memory shortages in the real economy). Items without hard dates in the source review are labeled 'spring' — don't overclaim precision. The punchline: these aren't six stories, they're one story arriving on every channel at once.");
}

// =============================================================================
// SLIDE 3 — Three paradigms shifting in unison
// =============================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Three paradigms shifting in unison", { y: 0.3 });
  addSubhead(s, "Capability, economics, and policy are moving together — that's what makes this moment different from every prior AI cycle.", { y: 0.95 });

  const cols = [
    {
      cat: "CAPABILITY & UX", color: C.teal,
      from: "Linear chat", to: "Autonomous loops",
      claim: "Fable 5-class benchmarks signal a permanent shift — from prompting finite outputs to designing self-prompting, self-correcting systems.",
    },
    {
      cat: "INFRASTRUCTURE & ECONOMICS", color: C.orange,
      from: "Token subsidy", to: "Token scarcity",
      claim: "SpaceX's 18-month datacenter payback and Google's $920M/month GPU rental prove massive compute is financially viable — and scarce.",
    },
    {
      cat: "MACRO POLICY", color: C.purple,
      from: "Private tech", to: "Sovereign asset",
      claim: "Government equity discussions and sovereign-wealth-fund proposals mean foundation models are now treated as too big to fail.",
    },
  ];
  cols.forEach((c, i) => {
    const x = 0.5 + i * 3.05;
    s.addText(c.cat, {
      x: x, y: 1.62, w: 2.95, h: 0.2, fontSize: 8, color: C.medGray, bold: true, fontFace: "Arial", charSpacing: 2, align: "center", margin: 0,
    });
    s.addText([
      { text: c.from + "  ", options: { color: C.darkGray, fontSize: 11.5, bold: true } },
      { text: "→  ", options: { color: c.color, fontSize: 12.5, bold: true } },
      { text: c.to, options: { color: C.black, fontSize: 11.5, bold: true } },
    ], { x: x, y: 1.84, w: 2.95, h: 0.3, fontFace: "Arial", align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.2, w: 2.95, h: 1.32, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.2, w: 2.95, h: 0.05, fill: { color: c.color } });
    s.addText(c.claim, {
      x: x + 0.14, y: 2.32, w: 2.67, h: 1.12, fontSize: 9.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  // Mini-motifs under each column
  // Col 1: prompt→response vs loop
  s.addShape(pres.shapes.RECTANGLE, { x: 0.72, y: 3.74, w: 0.78, h: 0.3, fill: { color: C.lightGray } });
  s.addText("PROMPT", { x: 0.72, y: 3.74, w: 0.78, h: 0.3, fontSize: 7, color: C.darkGray, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });
  s.addShape(pres.shapes.LINE, { x: 1.53, y: 3.89, w: 0.3, h: 0, line: { color: C.medGray, width: 1.5, endArrowType: "triangle" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 1.86, y: 3.74, w: 0.78, h: 0.3, fill: { color: C.lightGray } });
  s.addText("RESPONSE", { x: 1.86, y: 3.74, w: 0.78, h: 0.3, fontSize: 7, color: C.darkGray, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });
  s.addShape(pres.shapes.OVAL, { x: 2.78, y: 3.64, w: 0.62, h: 0.5, fill: { type: "none" }, line: { color: C.teal, width: 2 } });
  s.addText("LOOP", { x: 2.78, y: 3.64, w: 0.62, h: 0.5, fontSize: 7, color: C.teal, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });
  // Col 2: tokens → compute
  [0, 1, 2].forEach((j) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.95, y: 3.62 + j * 0.16, w: 0.55, h: 0.12, fill: { color: C.gold }, rectRadius: 0.05 });
  });
  s.addShape(pres.shapes.LINE, { x: 4.62, y: 3.89, w: 0.42, h: 0, line: { color: C.orange, width: 1.5, endArrowType: "triangle" } });
  [0, 1].forEach((r) => { [0, 1].forEach((cc) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.14 + cc * 0.3, y: 3.66 + r * 0.3, w: 0.26, h: 0.26, fill: { color: C.orange } });
  }); });
  s.addText("TOKENS", { x: 3.85, y: 4.12, w: 0.75, h: 0.18, fontSize: 6.5, color: C.medGray, bold: true, align: "center", fontFace: "Arial", margin: 0 });
  s.addText("COMPUTE", { x: 5.06, y: 4.26, w: 0.78, h: 0.18, fontSize: 6.5, color: C.medGray, bold: true, align: "center", fontFace: "Arial", margin: 0 });
  // Col 3: equity flows into the capitol
  s.addShape(pres.shapes.LINE, { x: 6.85, y: 3.89, w: 0.45, h: 0, line: { color: C.purple, width: 1.5, endArrowType: "triangle" } });
  s.addText("GOVT EQUITY", { x: 6.62, y: 4.06, w: 0.95, h: 0.18, fontSize: 6.5, color: C.medGray, bold: true, align: "center", fontFace: "Arial", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.45, y: 3.84, w: 0.9, h: 0.34, fill: { type: "none" }, line: { color: C.purple, width: 2 } });
  s.addShape(pres.shapes.OVAL, { x: 7.7, y: 3.62, w: 0.4, h: 0.28, fill: { type: "none" }, line: { color: C.purple, width: 2 } });
  s.addText("LABS", { x: 7.45, y: 3.84, w: 0.9, h: 0.34, fontSize: 7, color: C.purple, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.42, w: 10.0, h: 0.53, fill: { color: C.ink } });
  s.addText("The industry has exhausted the economic limits of the chatbot. The entire stack is reorganizing around high-margin, token-burning agentic loops.", {
    x: 0.5, y: 4.42, w: 9.0, h: 0.53, fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
  });

  addFooter(s, 3);
  s.addNotes("The thesis slide — and the reason this isn't 2023's hype cycle: three independent systems shifting in the same direction at once. Capability: models stopped being chat products and became loop-running systems (Act 1). Economics: the financial viability of massive compute is now demonstrated, not assumed — 18-month paybacks, nine-figure monthly rentals (Act 2–3). Policy: when governments discuss taking equity, the asset class has changed category (Act 4). The black banner is the line to read aloud: the chatbot era's economics are exhausted; the agentic era's economics are just starting to print.");
}

// =============================================================================
// SLIDE 4 — Divider: ACT 01 THE SHIFT (DARK)
// =============================================================================
{
  const s = addDividerSlide(4, ACTS.SHIFT,
    "Assisted became agentic.",
    "Models stopped drafting and started executing. The unit of value moved from the token to the completed task.",
    [
      { lead: "Tokens became a budget line.", rest: "Uber caps agent spend at $1,500/month per employee; Walmart ended unlimited access. Firms meter what is scarce." },
      { lead: "Reliability crossed the threshold.", rest: "Fable 5-class models sweep functional SOTA — agentic coding, legal, cybersecurity, biology." },
    ]);
  s.addNotes("Act One. Two proofs that the shift is real, not narrative: corporates are writing token budgets (you don't ration what's abundant), and the benchmark regime changed — models are now judged on functional reliability in high-consequence domains, not conversational quality. Both come from the strategic review.");
}

// =============================================================================
// SLIDE 5 — From prompts to loops
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.SHIFT);
  addHeadline(s, "From prompts to loops");
  addSubhead(s, "“My job is to write loops.” Agents now try, fail, fix, and ship on their own — and one worker starts to output like a team.");

  // Left: old vs new unit of work
  addChartTitle(s, "The unit of work changed", 0.5, 4.3, ACTS.SHIFT.color);
  s.addText("2023–25 · ONE SHOT, THEN STOP", { x: 0.5, y: 2.12, w: 4.3, h: 0.2, fontSize: 7.5, color: C.medGray, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.38, w: 1.15, h: 0.38, fill: { color: C.lightGray } });
  s.addText("PROMPT", { x: 0.6, y: 2.38, w: 1.15, h: 0.38, fontSize: 8.5, color: C.darkGray, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });
  s.addShape(pres.shapes.LINE, { x: 1.82, y: 2.57, w: 0.5, h: 0, line: { color: C.medGray, width: 2, endArrowType: "triangle" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 2.38, y: 2.38, w: 1.15, h: 0.38, fill: { color: C.lightGray } });
  s.addText("RESPONSE", { x: 2.38, y: 2.38, w: 1.15, h: 0.38, fontSize: 8.5, color: C.darkGray, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });

  s.addText("2026 · RUNS UNTIL THE TASK IS DONE", { x: 0.5, y: 2.98, w: 4.3, h: 0.2, fontSize: 7.5, color: C.teal, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0 });
  const loop = [
    { t: "TRY", x: 0.6, y: 3.28 }, { t: "FAIL", x: 2.0, y: 3.28 },
    { t: "FIX", x: 2.0, y: 3.92 }, { t: "SHIP", x: 0.6, y: 3.92 },
  ];
  loop.forEach((b) => {
    s.addShape(pres.shapes.RECTANGLE, { x: b.x, y: b.y, w: 0.95, h: 0.36, fill: { type: "none" }, line: { color: C.teal, width: 1.75 } });
    s.addText(b.t, { x: b.x, y: b.y, w: 0.95, h: 0.36, fontSize: 8.5, color: C.teal, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });
  });
  s.addShape(pres.shapes.LINE, { x: 1.58, y: 3.46, w: 0.39, h: 0, line: { color: C.teal, width: 1.5, endArrowType: "triangle" } });
  s.addShape(pres.shapes.LINE, { x: 2.47, y: 3.67, w: 0, h: 0.22, line: { color: C.teal, width: 1.5, endArrowType: "triangle" } });
  s.addShape(pres.shapes.LINE, { x: 1.58, y: 4.1, w: 0.39, h: 0, flipH: true, line: { color: C.teal, width: 1.5, endArrowType: "triangle" } });
  s.addShape(pres.shapes.LINE, { x: 1.08, y: 3.67, w: 0, h: 0.22, flipV: true, line: { color: C.teal, width: 1.5, endArrowType: "triangle" } });
  s.addText("agents self-correct: design the loop,\nnot the prompt (Cherny, Steinberger)", {
    x: 3.1, y: 3.45, w: 1.75, h: 0.85, fontSize: 7.5, color: C.medGray, italic: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  // Right: why it matters
  addChartTitle(s, "Why it matters", 5.2, 4.3, ACTS.SHIFT.color);
  const pts = [
    { t: "One worker, parallel workstreams.", b: "Power users run multiple research and execution loops at once — output scales like a team, and the “advantage gap” over casual users compounds." },
    { t: "Reliability is the unlock.", b: "Software now “comes out on a tap” (Karpathy) — good enough that skipping review is tempting. That's a step change in what gets delegated." },
    { t: "It's already infrastructure.", b: "Project Glasswing deploys agentic AI across 150 critical-infrastructure organizations in 15 countries — energy, water, healthcare." },
  ];
  pts.forEach((p, i) => {
    const y = 2.12 + i * 0.78;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y, w: 0.07, h: 0.7, fill: { color: C.teal } });
    s.addText([
      { text: p.t + "  ", options: { bold: true, color: C.black, fontSize: 10 } },
      { text: p.b, options: { color: C.darkGray, fontSize: 8.5 } },
    ], { x: 5.37, y: y, w: 4.13, h: 0.76, fontFace: "Arial", valign: "top", margin: 0 });
  });

  s.addText([
    { text: "Why markets care: ", options: { bold: true, color: C.black } },
    { text: "a loop burns orders of magnitude more tokens than a chat. The demand curve that follows is the next slide.", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.45, w: 9.0, h: 0.28, fontSize: 10, fontFace: "Arial", margin: 0 });

  addSource(s, MD_SOURCE + " — Cherny/Steinberger “loops” framing, Karpathy commentary, Project Glasswing.", 4.74);
  addFooter(s, 5);
  s.addNotes("The why-it-matters slide for the whole deck. Left: the unit of work changed — from one-shot prompting to loops that try, fail, fix, and ship without a human in each cycle. Boris Cherny's line — 'my job is to write loops' — is the cleanest articulation. Right: three consequences — individual output compounding (the advantage gap), the reliability threshold being crossed (Karpathy's tap), and deployment into critical infrastructure (Glasswing: 150 orgs, 15 countries — this is production, not demo). Bottom line connects to economics: loops are token furnaces, which is why demand goes exponential (next slide).");
}

// =============================================================================
// SLIDE 6 — The Jevons paradox (DARK showpiece)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  addKicker(s, ACTS.SHIFT);
  addHeadline(s, "The Jevons paradox: demand has no ceiling", { color: C.white, fontSize: 24 });
  addSubhead(s, "The Jevons paradox: as creation friction falls, total compute demanded expands geometrically. Efficiency gains don't satisfy demand — they multiply it.", { color: C.inkMuted });

  // Exponential area chart
  const xs = [];
  const vs = [];
  for (let i = 0; i <= 20; i++) {
    const x = i * 5;
    xs.push(x % 25 === 0 ? String(x) : "");
    vs.push(300 * (Math.exp(x / 22) - 1) / (Math.exp(100 / 22) - 1));
  }
  s.addChart(pres.charts.AREA, [{ name: "Compute demanded", labels: xs, values: vs }], {
    x: 0.6, y: 1.78, w: 6.5, h: 2.55,
    chartColors: [C.teal], chartColorsOpacity: 30,
    showTitle: false, showLegend: false, showValue: false,
    lineSize: 2.5, lineSmooth: true,
    catAxisLabelColor: C.inkMuted, catAxisLabelFontSize: 8,
    valAxisHidden: true,
    valGridLine: { color: C.inkLine, size: 0.5 },
    catGridLine: { style: "none" },
  });
  s.addText("EASE OF SOFTWARE CREATION  →", {
    x: 0.6, y: 4.38, w: 6.5, h: 0.22, fontSize: 8, color: C.inkMuted, bold: true, fontFace: "Arial", align: "center", charSpacing: 2, margin: 0,
  });
  s.addText("TOTAL COMPUTE CONSUMED →", {
    x: -0.85, y: 2.9, w: 2.2, h: 0.22, fontSize: 8, color: C.inkMuted, bold: true, fontFace: "Arial", align: "center", charSpacing: 2, margin: 0, rotate: 270,
  });

  // What gets built as friction falls — ladder annotations
  const ladder = [
    { t: "Internal PDF summaries", y: 3.92 },
    { t: "Custom dashboards", y: 3.45 },
    { t: "Disposable web apps", y: 2.95 },
    { t: "Giant custom research projects", y: 2.42 },
  ];
  ladder.forEach((l, i) => {
    s.addShape(pres.shapes.OVAL, { x: 7.32, y: l.y + 0.06, w: 0.1, h: 0.1, fill: { color: C.teal } });
    s.addText(l.t, {
      x: 7.5, y: l.y - 0.05, w: 2.4, h: 0.32, fontSize: 9.5, color: i === 3 ? C.white : C.inkText, bold: i === 3, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });
  s.addText("WHAT GETS BUILT AS FRICTION FALLS", {
    x: 7.32, y: 2.0, w: 2.5, h: 0.2, fontSize: 7.5, color: C.inkMuted, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0,
  });
  s.addShape(pres.shapes.LINE, { x: 7.32, y: 2.28, w: 2.4, h: 0, line: { color: C.inkLine, width: 1 } });

  s.addText([
    { text: "This is the core demand thesis: ", options: { bold: true, color: C.white } },
    { text: "“disposable software” — apps built for one use — and auto-research mean demand has no natural ceiling. Token scarcity is self-reinforcing.", options: { color: C.inkMuted } },
  ], { x: 0.6, y: 4.62, w: 8.9, h: 0.28, fontSize: 10, fontFace: "Arial", margin: 0 });

  addFooter(s, 6, true);
  s.addNotes("The core message slide — give it time. The Jevons paradox (coal, 1865): efficiency gains in using a resource increase total consumption of it. Applied here: as agents make software effectively free to produce, we don't write the same software cheaper — we write categorically more of it: PDF summaries become dashboards become disposable single-use apps become giant custom research projects. OpenAI's Codex Sites ('disposable software') is this curve productized. Investment translation: efficiency improvements in models do NOT cap compute demand — they expand it. That's why the capex sprint (Act 2) keeps accelerating even as cost-per-token falls.");
}

// =============================================================================
// SLIDE 7 — The enterprise token bill
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.SHIFT);
  addHeadline(s, "The enterprise token bill arrived");
  addSubhead(s, "Major firms are abandoning unlimited access and writing token budgets. Rationing is what demand looks like when supply is priced.");

  const cases = [
    { kicker: "UBER", color: C.teal, t: "Agents got a budget line.", b: "A hard $1,500/month token cap per employee replaced unlimited access — “eye-watering” agentic costs became a managed line item, not an experiment." },
    { kicker: "WALMART", color: C.orange, t: "Unlimited access is over.", b: "“Code Puppy,” its agentic dev tool, moved from unlimited tokens to individual budgets plus efficiency training — absorbing the cost of the agentic shift." },
    { kicker: "THE DEMAND POOL", color: C.gold, t: "Agents are priced against wasted time.", b: "Workers lose 20–25% of the week to coordination and retrieval (OpenAI's “strange abundance”) — that's the inefficiency enterprises are buying back." },
  ];
  cases.forEach((c, i) => {
    addPointCard(s, { ...c, kicker: c.kicker, title: c.t, body: c.b, x: 0.5, y: 1.66 + i * 0.98, w: 6.0, h: 0.9 });
  });

  addReadBox(s, 6.75, 1.66, 2.75, 2.86,
    "Token caps are demand evidence, not retreat.",
    "Firms ration what is scarce and valuable. Usage-based pricing is why lab revenue inflected (slide 13) — and why the capex sprint followed (slide 9). Watch enterprise token budgets the way retail analysts watch same-store sales.");

  addSource(s, MD_SOURCE + " — Uber and Walmart cost-management cases; OpenAI “strange abundance” framing.", 4.62);
  addFooter(s, 7);
  s.addNotes("Three data points, one message: enterprises now treat tokens as a metered input with a budget line. Uber: $1,500/month per employee. Walmart: killed unlimited access for Code Puppy, moved to budgets plus efficiency training. The 20–25% coordination-time figure is the demand side — the pool of working hours agents are bought to recover. The READ box carries the investability point: token budgets are the cleanest demand gauge the market has for agentic AI.");
}

// =============================================================================
// SLIDE 8 — Divider: ACT 02 THE CRUNCH (DARK)
// =============================================================================
{
  const s = addDividerSlide(8, ACTS.CRUNCH,
    "Compute is the binding constraint.",
    "The demand shock from Act One meets physical supply. Whoever owns the bottleneck prices the boom.",
    [
      { lead: "The shortage is structural.", rest: "SK Hynix is doubling HBM capacity and still sees no relief before ~2030 — that's pricing power with a decade-long tail." },
      { lead: "Scarcity already has a market price.", rest: "Google pays $920M/month to rent GPUs it doesn't own; SpaceX datacenters pay back in ~18 months." },
    ]);
  s.addNotes("Act Two. Two proofs again: the supply side (SK Hynix's own guidance says the HBM shortage outlasts the decade even after doubling capacity — structural, not cyclical) and the price side (nine-figure monthly rentals and 18-month paybacks are what a genuine shortage looks like in market terms).");
}

// =============================================================================
// SLIDE 9 — The capex sprint
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.CRUNCH);
  addHeadline(s, "A ~$705B sprint, guided in public");
  addSubhead(s, "Big-4 2026 capex guidance is up ~72% year over year — the rational response to scarcity. Morgan Stanley's five-platform total (incl. Oracle) is near $805B.");

  addChartTitle(s, "2026 capex guidance, $B (midpoints)", 0.5, 4.3, ACTS.CRUNCH.color);
  s.addChart(pres.charts.BAR, [{
    name: "2026E capex ($B)",
    labels: ["Amazon", "Microsoft", "Alphabet", "Meta"],
    values: [200, 190, 180, 135],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.05, w: 4.3, h: 2.25, chartColors: [C.orange],
  });

  addChartTitle(s, "Big-4 combined capex, $B", 5.2, 2.5, ACTS.CRUNCH.color);
  s.addChart(pres.charts.BAR, [{
    name: "Combined capex ($B)",
    labels: ["2025", "2026E"],
    values: [410, 705],
  }], {
    ...BAR_DEFAULTS, x: 5.2, y: 2.05, w: 2.5, h: 2.25, chartColors: [C.lightGray, C.orange],
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 7.9, y: 2.05, w: 1.7, h: 2.25, fill: { color: C.offWhite } });
  s.addShape(pres.shapes.RECTANGLE, { x: 7.9, y: 2.05, w: 1.7, h: 0.05, fill: { color: C.orange } });
  s.addText([
    { text: "Guidance accelerated — nobody flinched.", options: { bold: true, color: C.black, fontSize: 10, breakLine: true } },
    { text: "\nPlanned spend is up +72% YoY. Three of four raised guidance in the latest round; memory and component costs pushed the numbers higher, not lower.", options: { color: C.darkGray, fontSize: 8.5 } },
  ], { x: 8.0, y: 2.15, w: 1.5, h: 2.05, fontFace: "Arial", valign: "top", margin: 0 });

  addSource(s, "Company guidance: Microsoft $190B (CY26), Amazon $200B, Alphabet $175–185B, Meta $125–145B — via CNBC (Feb 6, 2026), Tom's Hardware, Statista. Midpoints sum to ~$705B; tops of ranges imply up to ~$725B. Morgan Stanley five-platform estimate via beincrypto.");
  addFooter(s, 9);
  s.addNotes("Guided, not projected — publicly committed numbers. Midpoints: MSFT $190B, AMZN $200B, GOOGL $180B, META $135B → ~$705B, +72% on 2025's record $410B; range-tops push toward $725B and Morgan Stanley's five-platform figure is ~$805B. Read it through the scarcity lens from the divider: when the binding input is scarce, overpaying for capacity is rational — underbuilding costs share. The point card replaces the old big-number callout: the story isn't the percentage, it's that guidance went UP into record spend.");
}

// =============================================================================
// SLIDE 10 — The physical squeeze: memory and power
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.CRUNCH);
  addHeadline(s, "The physical squeeze: memory and power");
  addSubhead(s, "Token scarcity is hardware scarcity. The constraint decides who captures the spend — a market question.");

  addChartTitle(s, "Global data-center electricity, TWh (IEA)", 0.5, 4.3, ACTS.CRUNCH.color);
  s.addChart(pres.charts.BAR, [{
    name: "TWh",
    labels: ["2025", "2030E"],
    values: [485, 950],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.05, w: 4.3, h: 2.25, chartColors: [C.lightGray, C.teal],
  });

  const cards = [
    { kicker: "MEMORY", color: C.orange, t: "HBM is the pinch point.", b: "SK Hynix is doubling capacity, yet relief isn't expected before ~2030 — shortage warnings and price hikes are spilling into autos and consumer goods (Reuters)." },
    { kicker: "SILICON", color: C.gold, t: "The hardware is being redesigned for agents.", b: "Nvidia's Vera Rubin architecture, now in production, pivots CPU-centric — engineered for the tool-calling workloads driving the crunch." },
    { kicker: "GRID", color: C.teal, t: "Power is the slowest input.", b: "85 GW of new US data-center capacity requested by 2030; ~100 GW of grid capacity needed to serve it reliably (S&P Global)." },
  ];
  cards.forEach((c, i) => {
    addPointCard(s, { kicker: c.kicker, color: c.color, title: c.t, body: c.b, x: 5.2, y: 1.68 + i * 0.92, w: 4.3, h: 0.84 });
  });

  addSource(s, "IEA Energy & AI (2026); S&P Global data-center power research; Reuters (Jun 3, 2026); SK Hynix & Nvidia Vera Rubin: " + MD_SOURCE + ".");
  addFooter(s, 10);
  s.addNotes("One slide of physics, by design. IEA: data-center electricity roughly doubles to ~950 TWh by 2030. Three bottlenecks, point-first: memory (structural to ~2030 per SK Hynix), silicon (Vera Rubin pivoting CPU-centric for agentic tool calls — the hardware is literally being redesigned around Act One's workload), and grid (85 GW requested vs ~100 GW needed). Investor takeaway: when the constraint is physical, moats shift to whoever controls memory supply, power, and interconnection. Keep this slide in mind for Act 5 — orbit is the escape hatch from exactly these constraints.");
}

// =============================================================================
// SLIDE 11 — The neocloud hierarchy
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.CRUNCH);
  addHeadline(s, "The neocloud hierarchy");
  addSubhead(s, "Scarcity created a new infrastructure market — and the rental price of compute is now a market-clearing signal.");

  const tiers = [
    { kicker: "SPACEX — THE NEOCLOUD KING", color: C.orange, t: "The buildout pays for itself.", b: "Colossus superclusters run 550k GPUs; the $40B datacenter investment paid back in ~18 months. These are the unit economics that validate the entire capex sprint." },
    { kicker: "GOOGLE — THE BRIDGE", color: C.gold, t: "Scarcity rents for nine figures a month.", b: "110,000 Nvidia GPUs rented from SpaceX at $920M/month to serve Gemini Enterprise demand while in-house silicon catches up — the cost of not owning capacity." },
    { kicker: "NVIDIA — THE EDGE", color: C.teal, t: "Inference is going local.", b: "RTX Spark — the “M1 moment for Windows” — brings high-performance inference to the desk, challenging Apple's M5 in the personal-AI segment." },
  ];
  tiers.forEach((t, i) => {
    addPointCard(s, { kicker: t.kicker, color: t.color, title: t.t, body: t.b, x: 0.5, y: 1.66 + i * 0.98, w: 6.0, h: 0.9 });
  });

  addReadBox(s, 6.75, 1.66, 2.75, 2.86,
    "Rental prices are the market-clearing price of scarcity.",
    "An 18-month payback on $40B validates the capex math better than any analyst model — and a $920M/month rental bill shows what the constraint costs when you don't own capacity. Both argue the spend (slide 9) is rational.");

  addSource(s, MD_SOURCE + " — SpaceX Colossus economics, Google GPU rental, Nvidia RTX Spark.", 4.62);
  addFooter(s, 11);
  s.addNotes("The scarcity market in three tiers, claims first. SpaceX as neocloud king: if the 18-month payback holds, the bear case that capex can't earn a return weakens badly. Google's $920M/month (~$11B/yr run rate) is the other side: the cost of NOT owning capacity. RTX Spark pushes inference to the edge — the prosumer release valve. Together: compute is priced like a scarce commodity at every layer, from supercluster to desktop. Note for Act 5: SpaceX owning both the rockets and the clusters is the setup for orbital datacenters.");
}

// =============================================================================
// SLIDE 12 — Divider: ACT 03 THE MARKET (DARK)
// =============================================================================
{
  const s = addDividerSlide(12, ACTS.MARKET,
    "How equities priced it.",
    "Concentration, rotation, a new debt complex — and the labs racing to the public market.",
    [
      { lead: "Revenue made it real.", rest: "Anthropic's run rate went $3B → $47B in a year on usage-based pricing — the token-scarcity era in income-statement form." },
      { lead: "The trade split.", rest: "Semis +80% while software fell 10% — and the buildout's bill moved into the bond market." },
    ]);
  s.addNotes("Act Three. The bridge from scarcity to securities. Proof one is the revenue inflection ($3B→$47B — that's what agentic demand looks like monetized). Proof two is dispersion: the market is no longer trading 'AI yes/no', it's trading position-in-the-chain — and the financing moved to credit markets, which gives equity investors a new dashboard.");
}

// =============================================================================
// SLIDE 13 — The lab race goes public
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.MARKET);
  addHeadline(s, "The lab race goes public");
  addSubhead(s, "OpenAI and Anthropic are converging on public listings with opposite narratives — and Microsoft is selling the budget alternative.");

  addChartTitle(s, "Anthropic annualized run rate, $B", 0.5, 2.9, ACTS.MARKET.color);
  s.addChart(pres.charts.BAR, [{
    name: "Run rate ($B)",
    labels: ["2025", "2026"],
    values: [3, 47],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.05, w: 2.9, h: 2.25, chartColors: [C.lightGray, C.gold],
  });

  addChartTitle(s, "Three strategies, one market", 3.8, 5.7, ACTS.MARKET.color);
  const rows = [
    [{ text: "Player", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } },
     { text: "Strategy", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } },
     { text: "The read", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } }],
    [{ text: "OpenAI", options: { bold: true } },
     { text: "“Swing for the fences” — consumer super-app, gateway to high-value products", options: { fontSize: 8.5 } },
     { text: "Scale first, monetize the funnel", options: { fontSize: 8.5 } }],
    [{ text: "Anthropic", options: { bold: true } },
     { text: "“Make money first” — enterprise focus, usage-based pricing; run rate $3B → $47B", options: { fontSize: 8.5 } },
     { text: "Cleanest read on agentic enterprise demand", options: { fontSize: 8.5 } }],
    [{ text: "Microsoft", options: { bold: true } },
     { text: "“Frontier Tuning” — MAI Thinking One; custom enterprise agents at ~10x lower cost", options: { fontSize: 8.5 } },
     { text: "The pragmatic choice — at a benchmark discount", options: { fontSize: 8.5 } }],
  ];
  s.addTable(rows, {
    x: 3.8, y: 2.1, w: 5.7, h: 2.1, colW: [0.95, 3.0, 1.75],
    fontSize: 9, fontFace: "Arial", color: C.darkGray, valign: "middle",
    border: { pt: 0.5, color: C.lightGray },
  });

  s.addText([
    { text: "Why it's a markets story: ", options: { bold: true, color: C.black } },
    { text: "lab IPOs would hand public markets their first direct claim on AI-lab economics — a supply event, and a new venue for repricing the entire theme.", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.3, w: 9.0, h: 0.3, fontSize: 9.5, fontFace: "Arial", margin: 0 });

  addSource(s, MD_SOURCE + "; lab strategies & run rates per Jenny Shia, Leona's Capital, as cited therein.", 4.72);
  addFooter(s, 13);
  s.addNotes("The supply side of the equity story. Anthropic $3B→$47B on usage-based pricing — enterprise agentic demand monetizing. OpenAI playing the consumer super-app game. Microsoft's Frontier Tuning is the margin threat: ~10x cheaper for company-specific agents, even if its agentic benchmarks (Terminal Bench 2.0) trail. For allocators the IPO race matters twice: as issuance supply, and as price discovery — public lab marks will reprice everything currently valued by proxy through Nvidia and the hyperscalers.");
}

// =============================================================================
// SLIDE 14 — Ten stocks are ~37% of the index
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.MARKET);
  addHeadline(s, "Ten stocks are ~37% of the index");
  addSubhead(s, "Concentration has eased from the 2025 record but remains roughly double its 1990–2015 range. The top of the index is the scarcity trade in benchmark form.");

  addChartTitle(s, "Top-10 share of S&P 500 market cap, %", 0.5, 4.3, ACTS.MARKET.color);
  s.addChart(pres.charts.BAR, [{
    name: "Top-10 share (%)",
    labels: ["2000", "2015", "2025 peak", "Jun 2026"],
    values: [23, 18, 40.7, 37],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.05, w: 4.3, h: 2.25,
    chartColors: [C.lightGray, C.lightGray, C.gold, C.orange],
  });

  addChartTitle(s, "The three largest, June 2026", 5.2, 4.3, ACTS.MARKET.color);
  const rows = [
    [{ text: "Company", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } },
     { text: "Mkt cap", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } },
     { text: "Index weight", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } }],
    ["Nvidia", { text: "~$5.0T", options: { bold: true, color: C.orange } }, "7.0%"],
    ["Apple", { text: "~$4.6T", options: { bold: true, color: C.orange } }, "6.3%"],
    ["Microsoft", { text: "~$3.3T", options: { bold: true, color: C.orange } }, "4.6%"],
  ];
  s.addTable(rows, {
    x: 5.2, y: 2.1, w: 4.3, h: 1.45, colW: [1.7, 1.3, 1.3],
    fontSize: 10, fontFace: "Arial", color: C.darkGray, valign: "middle",
    border: { pt: 0.5, color: C.lightGray }, fill: { color: C.white },
  });
  s.addText([
    { text: "~18% of the S&P 500 ", options: { bold: true, color: C.black } },
    { text: "sits in these three names — more than most full sectors. Nvidia alone outweighs energy or utilities.", options: { color: C.darkGray } },
  ], { x: 5.2, y: 3.7, w: 4.3, h: 0.6, fontSize: 10.5, fontFace: "Arial", valign: "top", margin: 0 });

  addSource(s, "S&P Dow Jones Indices; MacroMicro; finhacker.cz top-10 history; companiesmarketcap.com & Motley Fool market caps (Jun 2026); RBC Wealth Management on the 2026 “great narrowing.”");
  addFooter(s, 14);
  s.addNotes("Structural point: 18–23% top-10 share was the norm for 25 years; it's ~37% now, off the 40.7% 2025 peak. Two readings, both fair: concentration reflects genuine earnings concentration — or it leaves index returns hostage to a handful of AI-linked business models. We quantify rather than adjudicate; slide 20 shows what it does to a passive allocation. Nvidia ~$5T: first company ever through that mark — and the purest large-cap expression of the scarcity story.");
}

// =============================================================================
// SLIDE 15 — The AI trade rotated
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.MARKET);
  addHeadline(s, "The AI trade rotated");
  addSubhead(s, "Semis +80% vs software −10% — a 90-point spread inside one theme. Leadership migrated from the platforms to their suppliers.");

  addChartTitle(s, "Total return, YTD 2026 (%)", 0.5, 5.5, ACTS.MARKET.color);
  s.addChart(pres.charts.BAR, [{
    name: "YTD total return (%)",
    labels: ["Semis (SOXX)", "Equal-weight (RSP)", "S&P 500", "Mag 7 (MAGS)", "Software (IGV)"],
    values: [79.5, 14.3, 11.3, 5.9, -9.5],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.05, w: 5.5, h: 2.35,
    chartColors: [C.orange, C.teal, C.medGray, C.gold, C.red],
    catAxisLabelFontSize: 8,
    valAxisMinVal: -20,
  });

  const seg = [
    { t: "Value accruing", d: "Compute supply — memory, custom silicon, networking; power & grid infrastructure behind it", color: C.green },
    { t: "Contested middle", d: "Platforms: record revenues, but capex + debt now weigh on the equity story", color: C.gold },
    { t: "Value eroding", d: "Application software priced for disruption; adopters without pricing power", color: C.red },
  ];
  seg.forEach((g, i) => {
    const y = 2.0 + i * 0.82;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: y, w: 3.3, h: 0.74, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: y, w: 3.3, h: 0.05, fill: { color: g.color } });
    s.addText([
      { text: g.t.toUpperCase(), options: { bold: true, color: g.color, fontSize: 8.5, charSpacing: 1, breakLine: true } },
      { text: g.d, options: { color: C.darkGray, fontSize: 8.5 } },
    ], { x: 6.32, y: y + 0.06, w: 3.06, h: 0.66, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addSource(s, "YTD total returns through early Jun 2026: stockanalysis.com (SOXX, IGV); slickcharts (S&P 500); Morningstar/Yahoo (RSP, MAGS); WSJ ($5.7T chip rally); CNBC. Segment framing: deck analysis.");
  addFooter(s, 15);
  s.addNotes("The dispersion slide. SOXX +80% YTD (memory and custom silicon — Micron, AMD, Marvell are its biggest weights now), best run since 2000; chips added ~$5.7T of market value this rally. MAGS +6% LAGS equal-weight +14% — platforms are the contested middle: record revenues, but the market charges them for capex and debt. Software −10%: priced for disruption. The three buckets on the right are the chain map: value accrues where AI spend is revenue, erodes where AI is a competitive threat. Buckets rotated once already this cycle — map, not forecast.");
}

// =============================================================================
// SLIDE 16 — Valuations: rich index, uneven expectations
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.MARKET);
  addHeadline(s, "Rich index, uneven expectations");
  addSubhead(s, "The market is paying up for visible AI earnings and de-rating uncertain ones. The spread is the signal, not the average.");

  addChartTitle(s, "Forward P/E (next 12 months)", 0.5, 4.3, ACTS.MARKET.color);
  s.addChart(pres.charts.BAR, [{
    name: "Forward P/E",
    labels: ["S&P 500", "10-yr avg", "S&P Tech", "Nvidia"],
    values: [21.1, 19.0, 24.4, 22.5],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.05, w: 4.3, h: 2.25,
    chartColors: [C.orange, C.lightGray, C.gold, C.teal],
    dataLabelFormatCode: "0.0",
  });

  addChartTitle(s, "The dispersion underneath", 5.2, 4.3, ACTS.MARKET.color);
  const vrows = [
    [{ text: "Segment", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } },
     { text: "What's priced", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } }],
    ["Semis (SOXX)", { text: "Forward multiples elevated vs history — price ran ahead of even record earnings", options: { fontSize: 9 } }],
    ["Nvidia", { text: "22.5x forward — megacap multiple, hyperscaler-dependent earnings", options: { fontSize: 9 } }],
    ["Software", { text: "De-rated to pre-AI-boom levels (Apollo) — disruption discount", options: { fontSize: 9 } }],
  ];
  s.addTable(vrows, {
    x: 5.2, y: 2.1, w: 4.3, h: 1.7, colW: [1.5, 2.8],
    fontSize: 9.5, fontFace: "Arial", color: C.darkGray, valign: "middle",
    border: { pt: 0.5, color: C.lightGray },
  });
  s.addText([
    { text: "Neutral read: ", options: { bold: true, color: C.black } },
    { text: "nothing here screams 1999 in aggregate — but the index premium assumes the AI earnings stream keeps compounding.", options: { color: C.darkGray } },
  ], { x: 5.2, y: 3.95, w: 4.3, h: 0.5, fontSize: 10, fontFace: "Arial", valign: "top", margin: 0 });

  addSource(s, "FactSet Earnings Insight (fwd P/E 21.1 vs 19.0 10-yr avg); MacroMicro (tech sector 24.4, May 29); GuruFocus/stockanalysis.com (NVDA fwd 22.5x); Apollo Daily Spark (software de-rating).");
  addFooter(s, 16);
  s.addNotes("All multiples on this slide are forward — consistent basis. Nvidia at 22.5x forward is cheaper than the tech sector average because its E exploded; the multiple is unremarkable, the earnings durability is the entire question — and that durability now rests on token-scarcity economics holding. Semis: price ran ahead of even record earnings, so forward multiples sit elevated vs history. Software's de-rate is the mirror image: an uncertainty discount for whoever is on the wrong side of agents. Index 21x vs 19x 10-yr avg: elevated, not extreme.");
}

// =============================================================================
// SLIDE 17 — Capex outgrew cash flow. Bonds stepped in.
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.MARKET);
  addHeadline(s, "Capex outgrew cash flow. Bonds stepped in.", { fontSize: 24 });
  addSubhead(s, "The buildout was self-funded until it wasn't. 2026 opened the gap; nine months of mega-deals built a new IG supply complex to fill it.");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.6, w: 9.0, h: 1.38, fill: { color: C.darkGray } });
  s.addText("THE CASH MATH, 2026E", {
    x: 0.7, y: 1.68, w: 4.0, h: 0.22, fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  const cash = [
    { t: "Cash cover is gone.", label: "~94% of operating cash flow consumed by capex + dividends + buybacks (BofA)", color: C.orange },
    { t: "Leanest since 2014.", label: "Big-4 free cash flow at a decade low — at far larger revenue (CNBC)", color: C.gold },
    { t: "Amazon goes negative.", label: "2026E: $200B capex vs ~$140B operating cash flow", color: C.red },
    { t: "Alphabet drops −90%.", label: "FCF falls to ~$8B; Microsoft −~28% (2026E)", color: C.pink },
  ];
  cash.forEach((c, i) => {
    const x = 0.7 + i * 2.18;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.94, w: 2.0, h: 0.94, fill: { color: "444444" } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.94, w: 2.0, h: 0.05, fill: { color: c.color } });
    s.addText(c.t, {
      x: x + 0.08, y: 2.02, w: 1.84, h: 0.3, fontSize: 10.5, color: c.color, bold: true, fontFace: "Arial", align: "center", margin: 0,
    });
    s.addText(c.label, {
      x: x + 0.08, y: 2.34, w: 1.84, h: 0.5, fontSize: 7, color: C.white, fontFace: "Arial", align: "center", valign: "top", margin: 0,
    });
  });

  addChartTitle(s, "The issuance ledger — five mega-deals, nine months", 0.5, 9.0, ACTS.MARKET.color, 3.08);
  const deals = [
    { amt: "$18B", who: "Oracle", when: "Sep 25" },
    { amt: "$30B", who: "Meta — record non-M&A IG", when: "Oct 25" },
    { amt: "$17.5B", who: "Alphabet", when: "Nov 25" },
    { amt: "$15B", who: "Amazon", when: "Nov 25" },
    { amt: "$25B", who: "Oracle — 8 tranches", when: "Feb 26" },
  ];
  s.addShape(pres.shapes.LINE, { x: 0.7, y: 3.95, w: 8.6, h: 0, line: { color: C.lightGray, width: 1.5 } });
  deals.forEach((d, i) => {
    const x = 0.6 + i * 1.76;
    s.addShape(pres.shapes.OVAL, { x: x + 0.78, y: 3.89, w: 0.12, h: 0.12, fill: { color: C.orange } });
    s.addText(d.amt, {
      x: x, y: 3.52, w: 1.7, h: 0.36, fontSize: 15, color: C.orange, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText([
      { text: d.who, options: { bold: true, color: C.darkGray, fontSize: 8, breakLine: true } },
      { text: d.when, options: { color: C.medGray, fontSize: 7.5 } },
    ], { x: x, y: 4.06, w: 1.7, h: 0.45, fontFace: "Arial", align: "center", valign: "top", margin: 0 });
  });

  s.addText([
    { text: "What it signals: ", options: { bold: true, color: C.black } },
    { text: "~$300B of AI-linked IG supply expected in 2026; Oracle's 5-yr CDS above ~125bp despite light leverage — credit spreads are now a live early-warning gauge for AI equities.", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.46, w: 9.0, h: 0.24, fontSize: 8.5, fontFace: "Arial", margin: 0 });

  addSource(s, "BofA via Breckinridge; CNBC (Feb 6, 2026); techtimes/beincrypto FCF estimates; deal record: Mawer, M&G, Fortune, CNBC; CDS: MUFG via CNBC; supply forecasts: UBS & Barclays via Reuters.", 4.74);
  addFooter(s, 17);
  s.addNotes("Two stories, one slide, because they're one mechanism: capex ate the cash (top band — cash cover gone at ~94%, Big-4 FCF at a decade low, Amazon negative, Alphabet −90%, Microsoft down roughly 28%), so the buildout moved into the bond market (timeline — Oracle Sep '25 through Oracle again Feb '26, $105B+ across five prints, Meta's $30B the largest non-M&A IG deal ever). The 'unspoken contract' of self-funding megacaps broke. Balance sheets are still lightly levered vs IG norms — this is not 2008 telecom — but Oracle's CDS shows credit discriminates by funding capacity. For equity holders: spreads reprice before earnings revisions. Watch them.");
}

// =============================================================================
// SLIDE 18 — Divider: ACT 04 THE STAKES (DARK)
// =============================================================================
{
  const s = addDividerSlide(18, ACTS.STAKES,
    "Policy and portfolios.",
    "The debate moved from how to regulate AI to who owns it. Your benchmark already answered for you.",
    [
      { lead: "Washington wants equity.", rest: "A one-time 50% tax on AI-lab equity is on the table — proposed by Sanders, echoed by Trump. That pair agreeing is the tell." },
      { lead: "Your benchmark already voted.", rest: "Ten stocks are ~37% of the S&P 500, sharing one earnings driver — an AI position nobody sized deliberately." },
    ]);
  s.addNotes("Act Four. Two exposures nobody sized deliberately: Washington's claim on AI economics (the 50% equity-tax proposal — anchored by who backs it: when Sanders proposes and Trump echoes, the Overton window has genuinely moved), and the index's claim on AI risk (37% in ten names). Both are about ownership, not regulation.");
}

// =============================================================================
// SLIDE 19 — Washington enters the trade
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.STAKES);
  addHeadline(s, "Washington enters the trade");
  addSubhead(s, "A strange convergence — Trump, Bannon, and Sanders aligned on oversight and public participation in the AI upside.");

  const pillars = [
    { h: "THE EXECUTIVE ORDER", color: C.purple, b: "Voluntary but high-pressure 30-day pre-release review (down from 90) for models that are a “meaningful step change” in cyber capability. The NSA is the testing body; the focus is cybersecurity, not general safety. Mandatory licensing expressly forbidden — “mission creep” avoided, for now." },
    { h: "THE SOVEREIGN WEALTH FUND", color: C.gold, b: "Sanders' proposal, echoed by Trump as “a concept of a plan”: a one-time 50% tax on AI-lab equity (not profits) seeds a public fund paying “AI Dividends” to citizens — potentially via “Trump Accounts for Children.”" },
    { h: "THE CRITIQUE", color: C.red, b: "Sacks: government equity means “corporate-government fusion” and CCP-style social-credit risk; nationalization talk is a “stupidity tax” on the job-apocalypse narrative the labs themselves stoked." },
  ];
  pillars.forEach((p, i) => {
    const x = 0.5 + i * 3.05;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.66, w: 2.95, h: 2.42, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.66, w: 2.95, h: 0.05, fill: { color: p.color } });
    s.addText(p.h, {
      x: x + 0.14, y: 1.8, w: 2.7, h: 0.24, fontSize: 9, color: p.color, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0,
    });
    s.addText(p.b, {
      x: x + 0.14, y: 2.1, w: 2.7, h: 1.9, fontSize: 8.8, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  s.addText([
    { text: "Investor read: ", options: { bold: true, color: C.black } },
    { text: "the central debate of 2026 is no longer whether AI should be regulated, but whether the means of AI production should be publicly owned — a direct tail risk to lab equity and the IPO pipeline (slide 13).", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.18, w: 9.0, h: 0.4, fontSize: 9.5, fontFace: "Arial", margin: 0 });

  addSource(s, MD_SOURCE + " — Executive Order provisions, sovereign wealth fund proposals, Sacks critique.", 4.66);
  addFooter(s, 19);
  s.addNotes("The policy slide stays neutral by quoting all sides. EO: voluntary 30-day NSA review, cyber-focused, no licensing — lighter than feared, and a calendar item before every frontier release. SWF: 50% one-time equity tax to fund AI Dividends — dilution risk that no equity model currently carries. Sacks' critique is the third leg: nationalization as a threat to the property rights underpinning lab valuations. The investable point isn't picking a side — it's that public-ownership tail risk now belongs in any model of lab equity, IPO pricing, and by extension the hyperscalers that own lab stakes.");
}

// =============================================================================
// SLIDE 20 — Your index fund is an AI fund now
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.STAKES);
  addHeadline(s, "Your index fund is an AI fund now");
  addSubhead(s, "A passive S&P 500 allocation carries an embedded, undiversified AI position that no one sized deliberately.");

  addChartTitle(s, "Where $100 of S&P 500 exposure sits", 0.5, 4.3, ACTS.STAKES.color);
  s.addChart(pres.charts.DOUGHNUT, [{
    name: "Allocation",
    labels: ["Top 3 (Nvidia, Apple, Microsoft) — $18", "Rest of top 10 — $19", "Other 490 stocks — $63"],
    values: [18, 19, 63],
  }], {
    x: 0.5, y: 2.0, w: 4.3, h: 2.35,
    chartColors: [C.orange, C.gold, C.lightGray],
    showPercent: false, showValue: false, showTitle: false,
    showLegend: true, legendPos: "b", legendFontSize: 8,
    holeSize: 60,
  });

  addChartTitle(s, "Why it matters", 5.2, 4.3, ACTS.STAKES.color);
  const pts = [
    { h: "It's an active bet you didn't make.", b: "At ~37% in ten names, benchmark exposure embeds a view on one theme's earnings durability." },
    { h: "2026 made the cost visible — both directions.", b: "Equal-weight (+14%) beat cap-weight (+11%) YTD as megacaps lagged; in 2024–25 the same gap ran the other way." },
    { h: "Correlation is the multiplier.", b: "The top names share one earnings driver — AI infrastructure economics — so the position behaves like a single factor, not ten stocks." },
    { h: "Policy risk now sits inside the benchmark.", b: "From equity taxes to pre-release reviews, Washington's AI debate is a direct input to ten names' earnings power." },
  ];
  pts.forEach((p, i) => {
    const y = 2.05 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y, w: 0.07, h: 0.52, fill: { color: C.purple } });
    s.addText([
      { text: p.h + "  ", options: { bold: true, color: C.black, fontSize: 9 } },
      { text: p.b, options: { color: C.darkGray, fontSize: 8 } },
    ], { x: 5.37, y: y, w: 4.13, h: 0.56, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addSource(s, "Index weights: S&P Dow Jones Indices, slickcharts (Jun 2026); YTD returns: Morningstar (RSP), slickcharts (S&P 500).");
  addFooter(s, 20);
  s.addNotes("The hidden-active-risk slide. Nobody in this room would deliberately put 37% of an equity sleeve in ten correlated names — but a benchmark allocation does precisely that. Honest caveat on point two: equal-weight won 2026, lost 2024–25; the point is 'size the bet on purpose,' not 'sell megacaps.' Point four: with Washington debating equity taxes and ownership, policy risk is no longer exogenous to a passive allocation — it's embedded in the top ten names.");
}

// =============================================================================
// SLIDE 21 — What breaks it — and what to do
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.STAKES);
  addHeadline(s, "What breaks it — and what to do");
  addSubhead(s, "Four watchpoints, each with a visible gauge — paired with four takeaways that survive whichever way the AI debate resolves.");

  addChartTitle(s, "Watchpoints & gauges", 0.5, 4.4, ACTS.STAKES.color);
  const risks = [
    { t: "Demand air pocket", g: "capex guidance · token budgets", d: "~94% of op cash flow is committed; enterprise token budgets are the new same-store sales. Semis at +80% have the most altitude to lose.", color: C.red },
    { t: "Financing stress", g: "CDS · new-issue spreads", d: "Oracle's CDS above ~125bp shows credit already discriminates. A failed mega-deal would reprice AI equities within days.", color: C.orange },
    { t: "Rate sensitivity", g: "10-yr UST (~4.5%)", d: "Long-duration AI cash flows and record IG supply both lean on rates staying contained.", color: C.gold },
    { t: "Concentration unwind", g: "top-10 share (~37%)", d: "Mag 7 lagging equal-weight previewed it; the disorderly version is passive outflows meeting thin breadth.", color: C.purple },
  ];
  risks.forEach((r, i) => {
    const y = 2.08 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y, w: 0.07, h: 0.54, fill: { color: r.color } });
    s.addText([
      { text: r.t + "  ", options: { bold: true, color: C.black, fontSize: 9 } },
      { text: "(" + r.g + ")", options: { italic: true, color: C.medGray, fontSize: 7.5, breakLine: true } },
      { text: r.d, options: { color: C.darkGray, fontSize: 7.8 } },
    ], { x: 0.67, y: y, w: 4.25, h: 0.6, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addChartTitle(s, "What to do with it", 5.2, 4.3, ACTS.STAKES.color);
  const takes = [
    { t: "Know your AI beta.", d: "~37% of benchmark sits in ten names with one earnings driver. Size it deliberately — even if the answer is “keep it.”" },
    { t: "Trade the chain, not the theme.", d: "A 90-point intra-theme spread says segment selection — silicon, power, platforms, adopters — dominates the yes/no call." },
    { t: "Watch credit as the early warning.", d: "Hyperscaler CDS and new-issue spreads reprice before equity revisions arrive. Put them on the dashboard." },
    { t: "Respect the breadth shift.", d: "Equal-weight beating cap-weight while semis compound at a +80% pace: 2026 rewards structure, not just direction." },
  ];
  takes.forEach((t, i) => {
    const y = 2.08 + i * 0.62;
    s.addText([
      { text: (i + 1) + ".  " + t.t + "  ", options: { bold: true, color: C.black, fontSize: 9 } },
      { text: t.d, options: { color: C.darkGray, fontSize: 7.8 } },
    ], { x: 5.2, y: y, w: 4.3, h: 0.6, fontFace: "Arial", valign: "top", margin: 0 });
  });

  s.addText([
    { text: "Bottom line: ", options: { bold: true, color: C.black } },
    { text: "you don't need a view on AGI to manage this — you need to know what your portfolio already believes.", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.6, w: 9.0, h: 0.3, fontSize: 11, fontFace: "Arial", margin: 0 });

  addFooter(s, 21);
  s.addNotes("Risks and takeaways share a slide because they're mirror images. New gauge this quarter: enterprise token budgets (slide 7) as a demand indicator — the new same-store sales. Most likely stress path: financing stress and the demand air pocket are the same risk at different speeds — credit reprices faster than earnings revisions. Takeaways map back: #1 concentration (14, 20), #2 dispersion (15), #3 financing (17), #4 breadth (15). Closing line is the deck's thesis in one sentence.");
}

// =============================================================================
// SLIDE 22 — Divider: ACT 05 THE FRONTIER (DARK, humanoid banner)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addText("05", {
    x: 5.7, y: 0.05, w: 4.1, h: 2.6,
    fontSize: 170, color: C.inkGhost, bold: true, fontFace: "Arial Black", align: "right", valign: "top", margin: 0,
  });
  s.addText("ACT 05  ·  THE FRONTIER", {
    x: 0.55, y: 0.6, w: 6.0, h: 0.3,
    fontSize: 10, color: C.pink, bold: true, fontFace: "Arial", charSpacing: 4, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 1.05, w: 1.1, h: 0.06, fill: { color: C.yellow } });
  s.addText("Where this is heading.", {
    x: 0.55, y: 1.28, w: 8.4, h: 0.7,
    fontSize: 31, color: C.white, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
  s.addText("The loop is getting hands, wheels, wings — and ears. Orbit, embodiment, biology, and the sci-fi tail that markets quietly pay for.", {
    x: 0.55, y: 2.05, w: 7.6, h: 0.5,
    fontSize: 12, color: C.inkMuted, fontFace: "Arial", valign: "top", margin: 0,
  });
  s.addImage({ path: IMG + "/humanoid.jpg", x: 0, y: 2.75, w: 10.0, h: 2.2, sizing: { type: "cover", w: 10.0, h: 2.2 } });
  addFooter(s, 22, true);
  s.addNotes("Act Five — the dessert course, and the reason this deck is a show. Everything so far is in guidance and prices; this act is the option value sitting behind the multiples. The humanoid in a warehouse is the right image: not concept art — agentic loops in a body, walking a shift. Frame for the room: none of Act 5 is in 2026 numbers, all of it bears on what the 2030s demand curve looks like.");
}

// =============================================================================
// SLIDE 23 — Data centers in space (DARK, orbital image)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  s.addImage({ path: IMG + "/orbital.jpg", x: 6.1, y: 0, w: 3.9, h: 4.95, sizing: { type: "cover", w: 3.9, h: 4.95 } });
  addKicker(s, ACTS.FRONTIER);
  s.addText("FRONTIER WATCH — SPECULATIVE", {
    x: 0.5, y: 0.17, w: 5.4, h: 0.3, fontSize: 8, color: C.inkMuted, bold: true, fontFace: "Arial", charSpacing: 2, valign: "middle", align: "right", margin: 0,
  });
  addHeadline(s, "Compute leaves the grid", { color: C.white, w: 5.4, fontSize: 24 });
  addSubhead(s, "Orbit solves the exact constraint that defines Act 02: continuous solar power, radiative cooling, no interconnection queue.", { color: C.inkMuted, w: 5.4, h: 0.6 });

  const rows = [
    { t: "The physics flips in orbit's favor.", b: "Sunlight 24/7 with no weather or night; waste heat radiates straight to space. Power and cooling — the two costs that dominate terrestrial datacenters — get structurally cheaper." },
    { t: "One company owns the whole stack.", b: "SpaceX already runs 550k-GPU clusters and the rockets that launch them. Falling $/kg to orbit plus neocloud economics is vertical integration no terrestrial operator can match." },
    { t: "Watch it like a market, not a meme.", b: "Treat orbital compute as 2030s option value. The gauges: launch cadence, prototype performance in vacuum, and whether anyone signs an orbital-capacity offtake." },
  ];
  rows.forEach((r, i) => {
    const y = 2.02 + i * 0.88;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y + 0.04, w: 0.12, h: 0.12, fill: { color: C.pink } });
    s.addText([
      { text: r.t + "  ", options: { bold: true, color: C.white, fontSize: 10.5, breakLine: true } },
      { text: r.b, options: { color: C.inkMuted, fontSize: 9 } },
    ], { x: 0.78, y: y - 0.04, w: 5.15, h: 0.86, fontFace: "Arial", valign: "top", margin: 0 });
  });

  s.addText("Source: deck analysis building on " + MD_SOURCE + " (SpaceX Colossus economics). Orbital deployment is speculative — not in any company guidance.", {
    x: 0.5, y: 4.62, w: 5.4, h: 0.3, fontSize: 7, color: C.inkMuted, fontFace: "Arial", valign: "top", margin: 0,
  });
  addFooter(s, 23, true);
  s.addNotes("The sci-fi slide with the most near-term logic. Walk it from Act 2: the binding constraints are power and cooling (slide 10) — orbit removes both. The kicker is who's positioned: SpaceX is simultaneously the neocloud king (550k GPUs, 18-month paybacks) and the launch monopolist — if orbital compute happens, it's not a startup story, it's an extension of the most vertically integrated player in the stack. Then the discipline: this is 2030s option value, explicitly flagged speculative. Gauges, not guidance: launch cadence, vacuum-rated prototype performance, offtake agreements.");
}

// =============================================================================
// SLIDE 24 — The weird frontier (images + animals callout)
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.FRONTIER);
  addHeadline(s, "The loop gets wheels, proteins — and ears");
  addSubhead(s, "None of this is in 2026 guidance. All of it is in the option value markets are paying for.");

  // Card 1: robotaxi
  s.addImage({ path: IMG + "/robotaxi.jpg", x: 0.5, y: 1.66, w: 2.9, h: 1.55, sizing: { type: "cover", w: 2.9, h: 1.55 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.21, w: 2.9, h: 1.05, fill: { color: C.offWhite } });
  s.addText([
    { text: "Autonomy at fleet scale.  ", options: { bold: true, color: C.black, fontSize: 9.5 } },
    { text: "Robotaxis are inference on wheels — per-mile token economics, city-scale loops, and a physical-world demand pool for compute.", options: { color: C.darkGray, fontSize: 8 } },
  ], { x: 0.62, y: 3.3, w: 2.66, h: 0.9, fontFace: "Arial", valign: "top", margin: 0 });

  // Card 2: protein
  s.addImage({ path: IMG + "/protein.jpg", x: 3.55, y: 1.66, w: 2.9, h: 1.55, sizing: { type: "cover", w: 2.9, h: 1.55 } });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.55, y: 3.21, w: 2.9, h: 1.05, fill: { color: C.offWhite } });
  s.addText([
    { text: "Biology becomes a compute story.  ", options: { bold: true, color: C.black, fontSize: 9.5 } },
    { text: "Frontier models now lead biology benchmarks; AI-designed proteins compress discovery pipelines — biotech R&D starts to look like chip capex.", options: { color: C.darkGray, fontSize: 8 } },
  ], { x: 3.67, y: 3.3, w: 2.66, h: 0.9, fontFace: "Arial", valign: "top", margin: 0 });

  // Card 3: talking to animals (dark, waveform)
  s.addShape(pres.shapes.RECTANGLE, { x: 6.6, y: 1.66, w: 2.9, h: 2.6, fill: { color: C.ink } });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.6, y: 1.66, w: 2.9, h: 0.05, fill: { color: C.pink } });
  s.addText("FRONTIER WATCH", {
    x: 6.78, y: 1.78, w: 2.6, h: 0.2, fontSize: 7.5, color: C.pink, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  const wave = [0.12, 0.28, 0.5, 0.34, 0.62, 0.4, 0.22, 0.46, 0.3, 0.14, 0.36, 0.2];
  wave.forEach((h, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.85 + i * 0.2, y: 2.42 - h / 2, w: 0.09, h: h, fill: { color: C.pink }, rectRadius: 0.04,
    });
  });
  s.addText([
    { text: "Talking to animals.  ", options: { bold: true, color: C.white, fontSize: 10.5, breakLine: true } },
    { text: "Foundation models trained on whale and dolphin vocalizations are the cleanest demo that these systems generalize beyond human language — the kind of result that resets public imagination (and policy attention) overnight.", options: { color: C.inkMuted, fontSize: 8.5 } },
  ], { x: 6.78, y: 2.82, w: 2.56, h: 1.38, fontFace: "Arial", valign: "top", margin: 0 });

  s.addText([
    { text: "Why it's in a markets deck: ", options: { bold: true, color: C.black } },
    { text: "each of these converts compute into a new revenue pool — extending the Jevons demand curve (slide 6) by another decade.", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.4, w: 9.0, h: 0.26, fontSize: 9.5, fontFace: "Arial", margin: 0 });

  addSource(s, "Deck analysis; biology benchmark leadership: " + MD_SOURCE + ". Frontier-watch items are speculative and not in company guidance.", 4.7);
  addFooter(s, 24);
  s.addNotes("The closer before sources — keep it fun but disciplined. Robotaxis: autonomy is agentic loops with wheels; every mile is metered inference. Biology: frontier models now lead biology/health benchmarks (the review's SOTA table) — protein design makes drug discovery a compute-bound industry. And the showstopper: interspecies communication. Whale and dolphin vocalization models are real research programs; the market relevance is indirect but powerful — it's the demo that proves 'language models' generalize beyond language, and it's the kind of result that moves public sentiment and policy overnight. End the section on the Jevons callback: every frontier item is new compute demand.");
}

// =============================================================================
// SLIDE 25 — Sources & methodology
// =============================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Sources & methodology", { fontSize: 22, y: 0.3 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.95, w: 2.6, h: 0.38, fill: { color: C.orange } });
  s.addText(DATA_AS_OF.toUpperCase(), {
    x: 0.5, y: 0.95, w: 2.6, h: 0.38, fontSize: 10.5, color: C.black, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1,
  });
  s.addText("Returns are total returns YTD through the most recent available close (Jun 5–9, 2026, unless noted). Index and market-cap figures as of early June 2026.", {
    x: 3.3, y: 0.95, w: 6.2, h: 0.42, fontSize: 8.5, color: C.medGray, fontFace: "Arial", valign: "middle", margin: 0,
  });

  const cols = [
    { h: "MARKET DATA", color: C.gold, items: [
      "ETF returns & stats: stockanalysis.com (SOXX, IGV); Morningstar / Yahoo Finance (RSP, MAGS)",
      "Index returns & weights: slickcharts.com; S&P Dow Jones Indices; MacroMicro; finhacker.cz",
      "Market caps: companiesmarketcap.com; Motley Fool research (Jun 2026)",
      "Valuations: FactSet Earnings Insight; GuruFocus; Apollo Daily Spark",
      "Rates: US Treasury / FRED; CNBC (Jun 5, 2026)",
    ]},
    { h: "CAPEX & FINANCING", color: C.orange, items: [
      "Capex guidance: company reports via CNBC (Feb 6, 2026); Tom's Hardware; Statista; Morgan Stanley est.",
      "Cash-flow math: BofA via Breckinridge; CNBC; techtimes / beincrypto FCF estimates",
      "Bond issuance: Mawer; M&G Investments; Fortune (Mar 2026); CNBC (Feb 2026)",
      "Supply forecasts: UBS & Barclays via Reuters (Jan 2026); credit signals: MUFG CDS via CNBC",
    ]},
    { h: "PHYSICAL CONTEXT", color: C.teal, items: [
      "Power demand: IEA, Energy & AI (485→950 TWh, 2025–2030)",
      "Grid constraint: S&P Global (85 GW US pipeline)",
      "Silicon: Reuters (memory shortage, Jun 3, 2026); WSJ ($5.7T chip rally)",
      "ETF tickers referenced: SOXX, IGV, RSP, MAGS; iShares funds preferred as primary ETF sources per house data policy",
    ]},
    { h: "AI FRONTIER REVIEW", color: C.purple, items: [
      "Internal strategic review: “The 2026 AI Frontier” (Jun 2026)",
      "Agentic shift, loops & token economics; enterprise caps (Uber, Walmart); Karpathy, Cherny commentary",
      "Compute: SK Hynix HBM outlook; Nvidia Vera Rubin & RTX Spark; SpaceX Colossus; Google GPU rental",
      "Labs & policy: run rates via Leona's Capital; Executive Order provisions; sovereign wealth fund proposals; Project Glasswing",
    ]},
  ];
  cols.forEach((c, i) => {
    const x = 0.5 + i * 2.325;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.55, w: 2.25, h: 0.24, fill: { color: c.color } });
    s.addText(c.h, {
      x: x, y: 1.55, w: 2.25, h: 0.24, fontSize: 7.5, color: i === 3 ? C.white : C.black, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1,
    });
    s.addText(c.items.map((t, j) => ({
      text: t, options: { bullet: { code: "2022", indent: 7 }, breakLine: j < c.items.length - 1, fontSize: 7.2, color: C.darkGray },
    })), { x: x + 0.04, y: 1.87, w: 2.18, h: 2.5, fontFace: "Arial", valign: "top", paraSpaceAfter: 4, margin: 0 });
  });

  s.addText("Methodology: figures verified against at least one primary or institutional source; where sources disagreed, the more conservative figure was used. Chart labels are rounded to whole numbers; exact plotted values: SOXX +79.5%, IGV −9.5% YTD. Act 05 frontier-watch items (orbital compute, embodied agents, interspecies communication) are speculative and flagged as such — they appear in no company guidance. The Jevons chart (slide 6) is illustrative, not measured data. End of deck.", {
    x: 0.5, y: 4.38, w: 9.0, h: 0.52, fontSize: 7.5, color: "999999", italic: true, fontFace: "Arial", margin: 0,
  });

  addFooter(s, 25);
  s.addNotes("Back matter. Canonical stamp: data as of June 2026; returns through Jun 5–9 closes. The AI Frontier review column covers everything review-sourced (run rates, neocloud economics, policy provisions, Glasswing) — flag those as review-sourced rather than exchange-verified. Two explicit honesty notes new this version: the Jevons curve is illustrative (it's a concept chart, not measured data), and all Act 05 items are speculative, in no guidance.");
}

// =============================================================================
// Write the .pptx, then emit slides-data.js for the HTML viewer
// =============================================================================

const VIEWER_NOTES = [
  "Built as a show: what changed (2–3), why agentic matters (Act 1), the machinery (Acts 2–3), the stakes (Act 4), the frontier — orbit, embodiment, biology, talking to animals (Act 5). Every stop: what does it do to markets.",
  "The opener: six developments in four months — capex +72% & Oracle's $25B (Feb), the functional-SOTA 'step change' (spring), chips +35% in April, $920M/mo GPU rental, Washington moving, $47B run rate (Jun). One story on every channel at once.",
  "The thesis: three paradigms shifting in unison — linear chat → autonomous loops; token subsidy → token scarcity; private tech → sovereign asset. Banner line: the chatbot's economics are exhausted; the stack is reorganizing around token-burning agentic loops.",
  "Act One divider. Proofs: tokens became a budget line (Uber $1,500/mo cap, Walmart); reliability crossed the threshold (functional SOTA sweep).",
  "The unit of work changed: from one-shot prompts to try-fail-fix-ship loops ('my job is to write loops' — Cherny). Consequences: parallel workstreams per worker, the reliability unlock (Karpathy's tap), already in critical infrastructure (Glasswing: 150 orgs, 15 countries). Loops burn tokens → demand.",
  "CORE SLIDE — the Jevons paradox: as creation friction falls, compute demanded expands geometrically. PDF summaries → dashboards → disposable apps → giant research projects. Efficiency gains multiply demand; scarcity is self-reinforcing. (Curve is illustrative.)",
  "Enterprise token bill: Uber $1,500/mo per employee; Walmart ended unlimited 'Code Puppy'; the demand pool is the 20–25% of the week lost to coordination. Token budgets = the new same-store sales.",
  "Act Two divider. Proofs: the shortage is structural (SK Hynix — no HBM relief before ~2030 even after doubling capacity); scarcity has a market price ($920M/mo rentals, 18-month paybacks).",
  "Capex ~$705B (+72% YoY), guided in public; range-tops ~$725B, MS five-platform ~$805B. Point card: guidance accelerated — nobody flinched. Under scarcity, overpaying for capacity is rational.",
  "Three bottlenecks, point-first: HBM structural to ~2030; Vera Rubin redesigning silicon CPU-centric for agentic tool calls; grid 85 GW requested vs ~100 GW needed. IEA: DC power ~doubles to 950 TWh by 2030. Remember for Act 5: orbit escapes exactly these constraints.",
  "Neocloud hierarchy: SpaceX pays back $40B in ~18 months (the buildout pays for itself); Google rents at $920M/mo (the cost of not owning); RTX Spark takes inference local. Rental prices = market-clearing price of scarcity.",
  "Act Three divider. Proofs: revenue made it real ($3B → $47B run rate); the trade split (semis +80% / software −10%; the bill moved to bonds).",
  "Lab race: OpenAI consumer super-app vs Anthropic 'make money first' ($47B) vs Microsoft Frontier Tuning (~10x cheaper, benchmark discount). IPOs = issuance supply AND first direct price discovery on lab economics.",
  "Top-10 share ~37% (norm was 18–23% for 25 years; 2025 peak 40.7%). NVDA ~$5T + AAPL $4.6T + MSFT $3.3T ≈ 18% of the index. The top of the index is the scarcity trade in benchmark form.",
  "Dispersion: SOXX +80% (best since 2000, ~$5.7T added), equal-weight +14% beats S&P +11% and MAGS +6%; software −10%. Value accrues where AI spend is revenue, erodes where AI is the threat. Map, not forecast.",
  "All forward multiples: index 21.1x vs 19.0x 10-yr avg — elevated, not extreme. NVDA 22.5x forward: unremarkable multiple, durability is the question. Software de-rated to pre-AI levels.",
  "One mechanism: cash cover gone (~94% consumed, decade-low FCF, Amazon negative, Alphabet −90%) → $105B+ of IG mega-deals in nine months (META $30B = record non-M&A). Oracle CDS >125bp: credit discriminates, spreads reprice before earnings.",
  "Act Four divider. Proofs: Washington wants equity (50% one-time tax proposal — Sanders proposed, Trump echoed); your benchmark already voted (~37% in ten names).",
  "Three pillars, all sides quoted: EO (voluntary 30-day NSA review, cyber focus, no licensing), sovereign wealth fund (50% equity tax → AI Dividends), Sacks critique (corporate-government fusion). Public-ownership tail risk now belongs in lab-equity and IPO models.",
  "Hidden active risk: 37% in ten correlated names via a benchmark. Equal-weight won 2026, lost 2024–25 — 'size the bet on purpose.' Policy risk is now embedded in the benchmark's top ten.",
  "Four gauges (capex guidance + token budgets, CDS/spreads, rates, top-10 share) × four takeaways (know your AI beta; trade the chain; watch credit; respect breadth). Credit reprices faster than earnings.",
  "Act Five divider — the dessert course. The loop gets hands, wheels, wings, ears. None of it is in 2026 numbers; all of it shapes the 2030s demand curve. (Humanoid-in-warehouse image: agentic loops in a body.)",
  "Data centers in space: orbit removes the Act-2 constraints (24/7 solar, radiative cooling, no grid queue); SpaceX owns rockets AND 550k-GPU clusters — unmatched vertical integration. Discipline: 2030s option value, speculative; gauges are launch cadence, vacuum prototypes, offtakes.",
  "The weird frontier: robotaxis (inference on wheels, per-mile tokens), AI-designed biology (discovery becomes compute-bound), and talking to animals — whale/dolphin vocalization models as the demo that LLMs generalize beyond language. Jevons callback: every item extends the demand curve a decade.",
  "Back matter. Data as of June 2026. Review-sourced items flagged; Jevons chart illustrative; Act 05 speculative and in no guidance.",
];

const viewerData = {
  title: "AI in the Market",
  subtitle: "From chatbots to agentic loops — June 2026",
  file: "ai-markets-deck.pptx",
  total: 25,
  sections: [
    { start: 1, label: "Intro" },
    { start: 4, label: "01 The shift" },
    { start: 8, label: "02 The crunch" },
    { start: 12, label: "03 The market" },
    { start: 18, label: "04 The stakes" },
    { start: 22, label: "05 The frontier" },
    { start: 25, label: "Sources" },
  ],
  titles: [
    "Cover — From chatbots to agentic loops",
    "The spring of 2026 changed the story",
    "Three paradigms shifting in unison",
    "Divider — 01 The shift",
    "From prompts to loops",
    "The Jevons paradox (core demand thesis)",
    "The enterprise token bill arrived",
    "Divider — 02 The crunch",
    "The capex sprint (~$705B)",
    "The physical squeeze: memory and power",
    "The neocloud hierarchy",
    "Divider — 03 The market",
    "The lab race goes public",
    "Ten stocks are ~37% of the index",
    "The AI trade rotated",
    "Rich index, uneven expectations",
    "Capex outgrew cash flow — bonds stepped in",
    "Divider — 04 The stakes",
    "Washington enters the trade",
    "Your index fund is an AI fund now",
    "What breaks it — and what to do",
    "Divider — 05 The frontier",
    "Data centers in space",
    "The weird frontier: wheels, proteins, ears",
    "Sources & methodology",
  ],
  notes: VIEWER_NOTES,
};

fs.writeFileSync("slides-data.js", "window.DECK = " + JSON.stringify(viewerData, null, 2) + ";\n");

pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name, "+ slides-data.js (25 slides)"); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

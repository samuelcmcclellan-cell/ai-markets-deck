// =============================================================================
// AI in the Market — From Token Subsidy to Token Scarcity — June 2026
// BII visual style (refined): light base + dark emphasis slides, 16:9 (10" x 5.625")
// Run: node build-deck.js
//   → outputs ai-markets-deck.pptx (20 slides)
//   → outputs slides-data.js (title / slide count / speaker notes for index.html)
//
// Data as of June 2026. Sources cited per slide and consolidated on slide 20.
// Rebuilt 2026-06-09: full narrative rebuild around "The 2026 AI Frontier"
// strategic review (agentic shift / token scarcity), five acts with dark
// dividers; removes trailing-P/E references; canonical figures: semis +80% /
// software −10% / 90pp spread; Big-4 capex ~$705B (+72%).
// =============================================================================

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Strategy";
pres.title = "AI in the Market — From Token Subsidy to Token Scarcity — June 2026";

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

// Five-act structure → typographic kickers (replaces the old corner pill)
const ACTS = {
  SHIFT:  { num: "01", label: "THE SHIFT",  color: C.teal },
  CRUNCH: { num: "02", label: "THE CRUNCH", color: C.orange },
  MARKET: { num: "03", label: "THE MARKET", color: C.gold },
  STAKES: { num: "04", label: "THE STAKES", color: C.purple },
};

const DATA_AS_OF = "Data as of June 2026"; // single canonical stamp (slide 20)
const MD_SOURCE = "Internal strategic review, “The 2026 AI Frontier” (Jun 2026)";

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

// Small-caps overline above the headline — act identity lives in typography now.
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
    x: 0.5, y: (opts && opts.y) || 0.48, w: 9.0, h: (opts && opts.h) || 0.62,
    fontSize: (opts && opts.fontSize) || 26, color: (opts && opts.color) || C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
}

function addSubhead(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: (opts && opts.y) || 1.12, w: 9.0, h: (opts && opts.h) || 0.45,
    fontSize: 12.5, color: C.medGray, fontFace: "Arial", valign: "top", margin: 0,
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

function makeBigNumber(slide, number, label, x, y, w, color, numSize) {
  slide.addText(number, {
    x: x, y: y, w: w, h: 0.7,
    fontSize: numSize || 40, color: color || C.orange, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
  });
  slide.addText(label, {
    x: x, y: y + 0.68, w: w, h: 0.62,
    fontSize: 10.5, color: C.medGray, fontFace: "Arial", align: "center", valign: "top", margin: 0,
  });
}

// Dark "READ" rail (interpretation box) — generalized from the old slide 7.
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

// Numbered narrative card — powers the new slide 2; reused for case cards.
function addNarrativeCard(slide, opts) {
  const { n, kicker, lead, body, color, x, y, w, h } = opts;
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: C.offWhite } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: 0.05, fill: { color: color } });
  slide.addText(n, {
    x: x + w - 1.05, y: y + h - 0.95, w: 1.0, h: 0.95,
    fontSize: 52, color: C.lightGray, bold: true, fontFace: "Arial Black", align: "right", valign: "bottom", margin: 0,
  });
  slide.addText(kicker, {
    x: x + 0.18, y: y + 0.14, w: w - 0.4, h: 0.22,
    fontSize: 8, color: color, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  slide.addText([
    { text: lead + "  ", options: { bold: true, color: C.black, fontSize: 10.5 } },
    { text: body, options: { color: C.darkGray, fontSize: 9.5 } },
  ], { x: x + 0.18, y: y + 0.38, w: w - 0.5, h: h - 0.5, fontFace: "Arial", valign: "top", margin: 0 });
}

// Full dark divider slide — one per act, with a single anchor stat.
function addDividerSlide(pageNum, act, title, sub, stat, statLabel, statSize) {
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
  s.addText(stat, {
    x: 0.55, y: 3.25, w: 7.5, h: 0.85,
    fontSize: statSize || 48, color: act.color, bold: true, fontFace: "Arial Black", valign: "bottom", margin: 0,
  });
  s.addText(statLabel, {
    x: 0.55, y: 4.18, w: 6.6, h: 0.55,
    fontSize: 9.5, color: C.inkMuted, fontFace: "Arial", valign: "top", margin: 0,
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
  s.addText("From token subsidy to token scarcity.", {
    x: 0.5, y: 2.3, w: 9.0, h: 0.6,
    fontSize: 25, color: C.yellow, bold: true, fontFace: "Arial Black", margin: 0,
  });
  s.addText("Agentic AI made compute scarce. Markets are repricing around the constraint.", {
    x: 0.5, y: 3.15, w: 8.6, h: 0.4,
    fontSize: 14, color: C.inkText, fontFace: "Arial", margin: 0,
  });
  s.addText("Strategy  |  Institutional", {
    x: 0.5, y: 4.1, w: 5.0, h: 0.35,
    fontSize: 12, color: C.inkMuted, bold: true, fontFace: "Arial", margin: 0,
  });
  addFooter(s, "", true);
  s.addNotes("Frame for the room: this is a markets deck, not an AI explainer. The new spine: AI shifted from assisted to agentic, which ended the token-subsidy era and made compute the scarce input. Everything else — the capex sprint, semis leadership, the bond wave, the policy fight — follows from that scarcity. Four acts: the shift, the crunch, the market, the stakes.");
}

// =============================================================================
// SLIDE 2 — The argument (narrative summary)
// =============================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "The argument", { y: 0.3 });
  addSubhead(s, "Four moves, one conclusion: the AI trade is now a market-structure story — and your benchmark is in it.", { y: 0.95 });

  const cards = [
    { n: "1", kicker: "THE SHIFT", color: C.teal, lead: "Assisted became agentic.",
      body: "AI now executes whole workstreams, not drafts. The subsidy era of cheap unlimited tokens is over — usage is metered, and enterprises are already rationing it." },
    { n: "2", kicker: "THE CRUNCH", color: C.orange, lead: "Compute is the binding constraint.",
      body: "Memory and grid power are structurally scarce into ~2030. The ~$705B capex sprint is the rational response — and 18-month neocloud paybacks say it can pay." },
    { n: "3", kicker: "THE MARKET", color: C.gold, lead: "Equities already chose sides.",
      body: "Ten stocks are ~37% of the S&P 500; semis are +80% YTD while software is −10%; the buildout's bill moved into the bond market — and the labs are racing to IPO." },
    { n: "4", kicker: "THE STAKES", color: C.purple, lead: "Policy and portfolios are exposed.",
      body: "Washington now debates public ownership of AI, and a passive index already carries an undiversified AI bet. The job is sizing what you already own — on purpose." },
  ];
  cards.forEach((c, i) => {
    addNarrativeCard(s, {
      ...c,
      x: 0.5 + (i % 2) * 4.65, y: 1.52 + Math.floor(i / 2) * 1.48, w: 4.35, h: 1.4,
    });
  });

  // Act strip — absorbs the old roadmap slide.
  const strip = [
    { a: ACTS.SHIFT, range: "Slides 3–5" },
    { a: ACTS.CRUNCH, range: "Slides 6–9" },
    { a: ACTS.MARKET, range: "Slides 10–15" },
    { a: ACTS.STAKES, range: "Slides 16–19" },
  ];
  strip.forEach((t, i) => {
    const x = 0.5 + i * 2.33;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 4.56, w: 0.14, h: 0.14, fill: { color: t.a.color } });
    s.addText([
      { text: t.a.num + " " + t.a.label + "   ", options: { bold: true, color: C.black, fontSize: 8 } },
      { text: t.range, options: { color: C.medGray, fontSize: 8 } },
    ], { x: x + 0.22, y: 4.49, w: 2.1, h: 0.28, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addFooter(s, 2);
  s.addNotes("The whole deck in four sentences. (1) The agentic shift is the demand shock. (2) Scarcity is the supply constraint — capex is a rational response, not exuberance, and SpaceX's 18-month payback is the proof point bulls lean on. (3) The market has priced the chain unevenly: suppliers up, software down, platforms contested. (4) The tail risks are political as much as financial. Strip at the bottom replaces the old roadmap slide.");
}

// =============================================================================
// SLIDE 3 — Divider: ACT 01 THE SHIFT (DARK)
// =============================================================================
{
  const s = addDividerSlide(3, ACTS.SHIFT,
    "Assisted became agentic.",
    "Models stopped drafting and started executing. The unit of value moved from the token to the completed task.",
    "$1,500", "Uber's monthly token cap per employee — rationing is the tell: firms meter what is scarce.");
  s.addNotes("Act One. The 'vibe shift': from passive drafting partners to autonomous orchestration of workstreams. The anchor stat is deliberately mundane — a corporate budget line. When a company the size of Uber writes a per-employee token cap, AI usage has become a metered utility. That's the demand signal that drives every chart in this deck.");
}

// =============================================================================
// SLIDE 4 — From token subsidy to token scarcity
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.SHIFT);
  addHeadline(s, "From token subsidy to token scarcity");
  addSubhead(s, "Labs once burned venture capital to give tokens away. Agentic workloads ended that — usage is now priced, metered, and scarce.");

  const eras = [
    { h: "THE TOKEN SUBSIDY ERA  ·  2023–25", color: C.medGray, hText: C.white, items: [
      "Labs subsidize adoption with VC-funded tokens",
      "Seat-based pricing; unlimited chat",
      "AI as drafting partner — linear productivity gains",
      "Models judged as general-purpose chatbots",
    ]},
    { h: "THE TOKEN SCARCITY ERA  ·  2026 →", color: C.teal, hText: C.white, items: [
      "Usage-based pricing — tokens metered like a utility",
      "Agentic loops orchestrate whole workstreams",
      "Power users compound; the “advantage gap” widens",
      "Models judged on functional reliability — coding, legal, science",
    ]},
  ];
  eras.forEach((e, i) => {
    const x = 0.5 + i * 4.65;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.66, w: 4.35, h: 0.36, fill: { color: e.color } });
    s.addText(e.h, {
      x: x + 0.14, y: 1.66, w: 4.1, h: 0.36, fontSize: 9, color: e.hText, bold: true, fontFace: "Arial", charSpacing: 1.5, valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.02, w: 4.35, h: 1.62, fill: { color: C.offWhite } });
    s.addText(e.items.map((t, j) => ({
      text: t, options: { bullet: { code: "2022", indent: 10 }, breakLine: j < e.items.length - 1, fontSize: 9.5, color: C.darkGray },
    })), { x: x + 0.14, y: 2.12, w: 4.1, h: 1.45, fontFace: "Arial", valign: "top", paraSpaceAfter: 6, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.82, w: 9.0, h: 0.62, fill: { color: C.offWhite } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.82, w: 0.07, h: 0.62, fill: { color: C.teal } });
  s.addText([
    { text: "The Jevons paradox is the demand engine:  ", options: { bold: true, color: C.black } },
    { text: "working software now “comes out on a tap” (Karpathy's “step change”) — and the cheaper software is to produce, the more of it we demand. Inference demand outruns supply.", options: { color: C.darkGray } },
  ], { x: 0.7, y: 3.86, w: 8.6, h: 0.54, fontSize: 10, fontFace: "Arial", valign: "middle", margin: 0 });

  addSource(s, MD_SOURCE + "; Karpathy commentary as cited therein.");
  addFooter(s, 4);
  s.addNotes("The era table is the deck's vocabulary lesson. Left column is 2023–25: subsidized tokens, seat pricing, drafting. Right column is now: metered usage, agentic loops, functional reliability as the SOTA bar. Two second-order effects to voice: the advantage gap (power users get compounding returns, casual users get linear ones — economic capture is diverging), and Jevons — cheaper software production increases total software demand, which is why scarcity persists despite capacity growth.");
}

// =============================================================================
// SLIDE 5 — The enterprise token bill
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.SHIFT);
  addHeadline(s, "The enterprise token bill arrived");
  addSubhead(s, "Major firms are abandoning unlimited access and writing token budgets. Rationing is what demand looks like when supply is priced.");

  const cases = [
    { big: "$1,500/mo", color: C.teal, h: "Uber caps the agent bill", b: "A hard monthly token budget per employee replaced unlimited access — agentic workloads made “eye-watering” costs a line item worth managing." },
    { big: "Ended", color: C.orange, h: "Walmart pulls unlimited “Code Puppy”", b: "Unlimited token access for its agentic dev tool is gone — individual budgets plus efficiency training, to absorb the cost of the agentic shift." },
    { big: "20–25%", color: C.gold, h: "The demand pool is coordination time", b: "Share of the knowledge-work week lost to coordination and retrieval (OpenAI's “strange abundance”) — the inefficiency agents are priced against." },
  ];
  cases.forEach((c, i) => {
    const y = 1.66 + i * 0.98;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y, w: 6.0, h: 0.9, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y, w: 0.07, h: 0.9, fill: { color: c.color } });
    s.addText(c.big, {
      x: 0.64, y: y, w: 1.55, h: 0.9, fontSize: 15, color: c.color, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
    });
    s.addText([
      { text: c.h, options: { bold: true, color: C.black, fontSize: 10, breakLine: true } },
      { text: c.b, options: { color: C.darkGray, fontSize: 8.5 } },
    ], { x: 2.25, y: y + 0.08, w: 4.15, h: 0.78, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addReadBox(s, 6.75, 1.66, 2.75, 2.86,
    "Token caps are demand evidence, not retreat.",
    "Firms ration what is scarce and valuable. Usage-based pricing is why lab revenue inflected (slide 11) — and why the capex sprint followed (slide 7). Watch enterprise token budgets the way retail analysts watch same-store sales.");

  addSource(s, MD_SOURCE + " — Uber and Walmart cost-management cases; OpenAI “strange abundance” framing.", 4.62);
  addFooter(s, 5);
  s.addNotes("Three data points, one message: enterprises now treat tokens as a metered input with a budget line. Uber: $1,500/month per employee. Walmart: killed unlimited access for Code Puppy, moved to budgets plus efficiency training. The 20–25% coordination-time figure is the demand side — that's the pool of working hours agents are being bought to recover. The READ box carries the investability point: token budgets are the cleanest demand gauge the market has for agentic AI.");
}

// =============================================================================
// SLIDE 6 — Divider: ACT 02 THE CRUNCH (DARK)
// =============================================================================
{
  const s = addDividerSlide(6, ACTS.CRUNCH,
    "Compute is the binding constraint.",
    "Memory, power, and GPUs are scarce. Whoever owns the bottleneck prices the boom.",
    "2030", "when SK Hynix expects HBM supply relief, even after doubling capacity — the shortage is structural, not cyclical.");
  s.addNotes("Act Two. The demand shock from Act One meets physical supply. SK Hynix's own guidance is the anchor: doubling HBM capacity and still not catching up before the end of the decade. 'Structural, not cyclical' is the phrase that matters for multiples — it changes how long the supply chain's pricing power lasts.");
}

// =============================================================================
// SLIDE 7 — The capex sprint
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

  makeBigNumber(s, "+72%", "YoY growth in\nplanned spend", 7.9, 2.3, 1.7, C.orange, 32);
  s.addText("Three of four raised guidance in the most recent reporting round; memory and component costs pushed numbers higher.", {
    x: 7.9, y: 3.5, w: 1.7, h: 0.95, fontSize: 8.5, color: C.medGray, fontFace: "Arial", valign: "top", margin: 0,
  });

  addSource(s, "Company guidance: Microsoft $190B (CY26), Amazon $200B, Alphabet $175–185B, Meta $125–145B — via CNBC (Feb 6, 2026), Tom's Hardware, Statista. Midpoints sum to ~$705B; tops of ranges imply up to ~$725B. Morgan Stanley five-platform estimate via beincrypto.");
  addFooter(s, 7);
  s.addNotes("Guided, not projected — publicly committed numbers. Midpoints: MSFT $190B, AMZN $200B, GOOGL $180B, META $135B → ~$705B, +72% on 2025's record $410B; range-tops push toward $725B and Morgan Stanley's five-platform figure is ~$805B. Read it through the scarcity lens from slide 6: when the binding input is scarce, overpaying for capacity is rational — underbuilding costs share. Earnings visibility flows up the supply chain; cash-flow pressure stays with the spenders (Act Three's bridge).");
}

// =============================================================================
// SLIDE 8 — The physical squeeze: memory and power
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
    { big: "HBM", small: "is the pinch point: SK Hynix is doubling capacity, yet relief isn't expected before ~2030 — shortage warnings and price hikes are spilling into autos and consumer goods (Reuters)", color: C.orange },
    { big: "Vera Rubin", small: "Nvidia's next architecture is in production — a CPU-centric design engineered for the agentic tool-calling workloads driving the crunch", color: C.gold },
    { big: "85 GW", small: "of new US data-center capacity requested by 2030; ~100 GW of grid capacity needed to serve it reliably (S&P Global)", color: C.teal },
  ];
  cards.forEach((c, i) => {
    const y = 1.68 + i * 0.92;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y, w: 4.3, h: 0.84, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y, w: 0.07, h: 0.84, fill: { color: c.color } });
    s.addText(c.big, {
      x: 5.35, y: y, w: 1.35, h: 0.84, fontSize: 13, color: c.color, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
    });
    s.addText(c.small, {
      x: 6.75, y: y + 0.06, w: 2.65, h: 0.72, fontSize: 8, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  addSource(s, "IEA Energy & AI (2026); S&P Global data-center power research; Reuters (Jun 3, 2026); SK Hynix & Nvidia Vera Rubin: " + MD_SOURCE + ".");
  addFooter(s, 8);
  s.addNotes("One slide of physics, by design. IEA: data-center electricity roughly doubles to ~950 TWh by 2030. The three cards are the three bottlenecks: HBM memory (structural to ~2030 per SK Hynix — that's the new piece), silicon architecture (Vera Rubin pivoting CPU-centric for agentic tool calls — the hardware is being redesigned around Act One's workload), and grid (85 GW requested vs ~100 GW needed). Investor takeaway: when the constraint is physical, moats shift to whoever controls memory supply, power, and interconnection.");
}

// =============================================================================
// SLIDE 9 — The neocloud hierarchy
// =============================================================================
{
  const s = pres.addSlide();
  addKicker(s, ACTS.CRUNCH);
  addHeadline(s, "The neocloud hierarchy");
  addSubhead(s, "Scarcity created a new infrastructure market — and the rental price of compute is now a market-clearing signal.");

  const tiers = [
    { big: "18 mo", color: C.orange, h: "SpaceX Colossus — the neocloud king", b: "550k-GPU superclusters; a $40B data-center investment paid back in ~18 months. The unit economics that validate the buildout." },
    { big: "$920M/mo", color: C.gold, h: "Google rents the bridge", b: "110,000 Nvidia GPUs rented from SpaceX to serve Gemini Enterprise demand while in-house hardware catches up." },
    { big: "RTX Spark", color: C.teal, h: "Nvidia goes local — the “M1 moment for Windows”", b: "A prosumer super chip brings high-performance inference to the desk, challenging Apple's M5 in the personal-AI segment." },
  ];
  tiers.forEach((t, i) => {
    const y = 1.66 + i * 0.98;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y, w: 6.0, h: 0.9, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: y, w: 0.07, h: 0.9, fill: { color: t.color } });
    s.addText(t.big, {
      x: 0.64, y: y, w: 1.55, h: 0.9, fontSize: 14, color: t.color, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
    });
    s.addText([
      { text: t.h, options: { bold: true, color: C.black, fontSize: 10, breakLine: true } },
      { text: t.b, options: { color: C.darkGray, fontSize: 8.5 } },
    ], { x: 2.25, y: y + 0.08, w: 4.15, h: 0.78, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addReadBox(s, 6.75, 1.66, 2.75, 2.86,
    "Rental prices are the market-clearing price of scarcity.",
    "An 18-month payback on $40B validates the capex math better than any analyst model — and a $920M/month rental bill shows what the constraint costs when you don't own capacity. Both argue the spend (slide 7) is rational.");

  addSource(s, MD_SOURCE + " — SpaceX Colossus economics, Google GPU rental, Nvidia RTX Spark.", 4.62);
  addFooter(s, 9);
  s.addNotes("The scarcity market in three tiers. SpaceX as neocloud: 550k GPUs, $40B in, paid back in ~18 months — if that number holds, the bear case that capex can't earn a return weakens badly. Google paying $920M/month in rent (~$11B/yr run rate) is the other side: the cost of NOT owning capacity. RTX Spark pushes inference to the edge — the prosumer release valve. Together: compute is being priced like a scarce commodity at every layer, from supercluster to desktop.");
}

// =============================================================================
// SLIDE 10 — Divider: ACT 03 THE MARKET (DARK)
// =============================================================================
{
  const s = addDividerSlide(10, ACTS.MARKET,
    "How equities priced it.",
    "Concentration, rotation, a new debt complex — and the labs racing to the public market.",
    "$3B → $47B", "Anthropic's annualized run rate, 2025 → 2026 — the revenue inflection behind the repricing.", 40);
  s.addNotes("Act Three. The bridge from scarcity to securities. The anchor: Anthropic's run rate went from $3B to $47B in roughly a year on usage-based pricing — that is what the token-scarcity era looks like in revenue terms, and it's the kind of number public markets will soon get to price directly via the IPO race.");
}

// =============================================================================
// SLIDE 11 — The lab race goes public
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
  addFooter(s, 11);
  s.addNotes("The supply side of the equity story. Anthropic $3B→$47B on usage-based pricing — enterprise agentic demand monetizing. OpenAI playing the consumer super-app game. Microsoft's Frontier Tuning is the margin threat: ~10x cheaper for company-specific agents, even if its agentic benchmarks (Terminal Bench 2.0) trail. For allocators the IPO race matters twice: as issuance supply, and as price discovery — public lab marks will reprice everything currently valued by proxy through Nvidia and the hyperscalers.");
}

// =============================================================================
// SLIDE 12 — Ten stocks are ~37% of the index
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
  addFooter(s, 12);
  s.addNotes("Structural point: 18–23% top-10 share was the norm for 25 years; it's ~37% now, off the 40.7% 2025 peak. Two readings, both fair: concentration reflects genuine earnings concentration — or it leaves index returns hostage to a handful of AI-linked business models. We quantify rather than adjudicate; slide 18 shows what it does to a passive allocation. Nvidia ~$5T: first company ever through that mark — and the purest large-cap expression of the scarcity story.");
}

// =============================================================================
// SLIDE 13 — The AI trade rotated
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
  addFooter(s, 13);
  s.addNotes("The dispersion slide. SOXX +80% YTD (memory and custom silicon — Micron, AMD, Marvell are its biggest weights now), best run since 2000; chips added ~$5.7T of market value this rally. MAGS +6% LAGS equal-weight +14% — platforms are the contested middle: record revenues, but the market charges them for capex and debt. Software −10%: priced for disruption. The three buckets on the right are the chain map: value accrues where AI spend is revenue, erodes where AI is a competitive threat. Buckets rotated once already this cycle — map, not forecast.");
}

// =============================================================================
// SLIDE 14 — Valuations: rich index, uneven expectations
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
  addFooter(s, 14);
  s.addNotes("All multiples on this slide are forward — consistent basis. Nvidia at 22.5x forward is cheaper than the tech sector average because its E exploded; the multiple is unremarkable, the earnings durability is the entire question — and that durability now rests on token-scarcity economics holding. Semis: price ran ahead of even record earnings, so forward multiples sit elevated vs history. Software's de-rate is the mirror image: an uncertainty discount for whoever is on the wrong side of agents. Index 21x vs 19x 10-yr avg: elevated, not extreme.");
}

// =============================================================================
// SLIDE 15 — The bill: capex > cash flow, bonds step in
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
    { big: "~94%", label: "of hyperscaler operating cash flow consumed by capex + dividends + buybacks (BofA)", color: C.orange },
    { big: "Lowest", label: "Big-4 free cash flow since 2014 — at far larger revenue (CNBC)", color: C.gold },
    { big: "< $0", label: "Amazon 2026E FCF: $200B capex vs ~$140B operating cash flow", color: C.red },
    { big: "−90%", label: "Alphabet 2026E FCF decline, to ~$8B; Microsoft −~28%", color: C.pink },
  ];
  cash.forEach((c, i) => {
    const x = 0.7 + i * 2.18;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.94, w: 2.0, h: 0.94, fill: { color: "444444" } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.94, w: 2.0, h: 0.05, fill: { color: c.color } });
    s.addText(c.big, {
      x: x, y: 2.0, w: 2.0, h: 0.34, fontSize: 17, color: c.color, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(c.label, {
      x: x + 0.08, y: 2.35, w: 1.84, h: 0.5, fontSize: 7, color: C.white, fontFace: "Arial", align: "center", valign: "top", margin: 0,
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
  addFooter(s, 15);
  s.addNotes("Two stories, one slide, because they're one mechanism: capex ate the cash (top band — ~94% of operating cash flow consumed, Big-4 FCF lowest since 2014, Amazon negative, Alphabet −90%, Microsoft down roughly 28%), so the buildout moved into the bond market (timeline — Oracle Sep '25 through Oracle again Feb '26, $105B+ across five prints, Meta's $30B the largest non-M&A IG deal ever). The 'unspoken contract' of self-funding megacaps broke. Balance sheets are still lightly levered vs IG norms — this is not 2008 telecom — but Oracle's CDS shows credit discriminates by funding capacity. For equity holders: spreads reprice before earnings revisions. Watch them.");
}

// =============================================================================
// SLIDE 16 — Divider: ACT 04 THE STAKES (DARK)
// =============================================================================
{
  const s = addDividerSlide(16, ACTS.STAKES,
    "Policy and portfolios.",
    "The debate moved from how to regulate AI to who owns it. Your benchmark already answered for you.",
    "50%", "proposed one-time tax on AI-lab equity — not profits — to seed a sovereign wealth fund paying “AI Dividends.”");
  s.addNotes("Act Four. Two exposures nobody sized deliberately: Washington's claim on AI economics, and the index's claim on AI risk. The 50% equity-tax proposal is the anchor because of who backs it — Sanders proposed it, Trump echoed it. When that pair agrees on anything, the Overton window has genuinely moved.");
}

// =============================================================================
// SLIDE 17 — Washington enters the trade
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
    { text: "the central debate of 2026 is no longer whether AI should be regulated, but whether the means of AI production should be publicly owned — a direct tail risk to lab equity and the IPO pipeline (slide 11).", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.18, w: 9.0, h: 0.4, fontSize: 9.5, fontFace: "Arial", margin: 0 });

  addSource(s, MD_SOURCE + " — Executive Order provisions, sovereign wealth fund proposals, Sacks critique.", 4.66);
  addFooter(s, 17);
  s.addNotes("The policy slide stays neutral by quoting all sides. EO: voluntary 30-day NSA review, cyber-focused, no licensing — lighter than feared, and a calendar item before every frontier release. SWF: 50% one-time equity tax to fund AI Dividends — dilution risk that no equity model currently carries. Sacks' critique is the third leg: nationalization as a threat to the property rights underpinning lab valuations. The investable point isn't picking a side — it's that public-ownership tail risk now belongs in any model of lab equity, IPO pricing, and by extension the hyperscalers that own lab stakes.");
}

// =============================================================================
// SLIDE 18 — Your index fund is an AI fund now
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
  addFooter(s, 18);
  s.addNotes("The hidden-active-risk slide. Nobody in this room would deliberately put 37% of an equity sleeve in ten correlated names — but a benchmark allocation does precisely that. Honest caveat on point two: equal-weight won 2026, lost 2024–25; the point is 'size the bet on purpose,' not 'sell megacaps.' Point four is new this quarter: with Washington debating equity taxes and ownership, policy risk is no longer exogenous to a passive allocation — it's embedded in the top ten names.");
}

// =============================================================================
// SLIDE 19 — What breaks it — and what to do
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

  addFooter(s, 19);
  s.addNotes("Risks and takeaways share a slide because they're mirror images. New gauge this quarter: enterprise token budgets (slide 5) as a demand indicator — the new same-store sales. Most likely stress path: financing stress and the demand air pocket are the same risk at different speeds — credit reprices faster than earnings revisions. Takeaways map back: #1 concentration (12, 18), #2 dispersion (13), #3 financing (15), #4 breadth (13). Closing line is the deck's thesis in one sentence.");
}

// =============================================================================
// SLIDE 20 — Sources & methodology
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
      "Agentic shift & token economics; enterprise caps (Uber, Walmart); Karpathy commentary",
      "Compute: SK Hynix HBM outlook; Nvidia Vera Rubin & RTX Spark",
      "Neoclouds: SpaceX Colossus economics; Google GPU rental",
      "Labs & policy: run rates via Leona's Capital; Executive Order provisions; sovereign wealth fund proposals",
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

  s.addText("Methodology: figures verified against at least one primary or institutional source; where sources disagreed, the more conservative figure was used. Chart labels are rounded to whole numbers; exact plotted values: SOXX +79.5%, IGV −9.5% YTD. No figures are extrapolated or modeled. End of deck.", {
    x: 0.5, y: 4.42, w: 9.0, h: 0.45, fontSize: 7.5, color: "999999", italic: true, fontFace: "Arial", margin: 0,
  });

  addFooter(s, 20);
  s.addNotes("Back matter. Canonical stamp: data as of June 2026; returns through Jun 5–9 closes. The AI Frontier review column covers everything sourced from the internal strategic review — flag to the room that those items (run rates, neocloud economics, policy provisions) are review-sourced rather than exchange-verified market data. Rounding note covers the chart-label convention: labels are whole numbers, exact plotted values footnoted here.");
}

// =============================================================================
// Write the .pptx, then emit slides-data.js for the HTML viewer
// =============================================================================

// Speaker notes for the viewer's presenter mode (condensed from slide.addNotes).
const VIEWER_NOTES = [
  "Markets deck, not an AI explainer. New spine: assisted → agentic ended the token-subsidy era and made compute scarce. Four acts: the shift, the crunch, the market, the stakes.",
  "The whole deck in four cards: (1) agentic shift = demand shock; (2) scarcity makes the ~$705B capex sprint rational; (3) the market priced the chain unevenly — semis +80%, software −10%; (4) the tail risks are political as much as financial.",
  "Act One divider. Uber's $1,500/mo per-employee token cap is the anchor: firms meter what is scarce. That budget line is the demand signal behind every chart that follows.",
  "Vocabulary lesson: subsidy era (2023–25, seat pricing, drafting) vs scarcity era (2026→, metered usage, agentic loops). Advantage gap widens; Jevons paradox — cheaper software production raises total demand — keeps scarcity persistent.",
  "Uber $1,500/mo cap; Walmart ended unlimited 'Code Puppy' access; 20–25% of the knowledge-work week lost to coordination is the demand pool. Token budgets = the cleanest demand gauge for agentic AI.",
  "Act Two divider. SK Hynix: doubling HBM capacity, relief still not before ~2030. 'Structural, not cyclical' is what matters for supply-chain pricing power and multiples.",
  "Guided, not projected: MSFT $190B, AMZN $200B, GOOGL $180B, META $135B → ~$705B, +72% YoY (range-tops ~$725B; MS five-platform ~$805B). Under scarcity, overpaying for capacity is rational — underbuilding costs share.",
  "Three bottlenecks: HBM (structural to ~2030), architecture (Vera Rubin pivots CPU-centric for agentic tool calls), grid (85 GW requested vs ~100 GW needed; IEA power ~doubles to 950 TWh by 2030). Moats shift to whoever controls the constraint.",
  "The scarcity market: SpaceX Colossus 550k GPUs, $40B, ~18-month payback — the bull case's best number. Google pays $920M/mo renting 110k GPUs — the cost of not owning capacity. RTX Spark pushes inference to the edge.",
  "Act Three divider. Anthropic run rate $3B → $47B on usage-based pricing — token scarcity in revenue form, soon to be priced directly by public markets via the IPO race.",
  "Lab strategies: OpenAI consumer super-app vs Anthropic 'make money first' ($47B run rate) vs Microsoft Frontier Tuning (~10x cheaper, weaker agentic benchmarks). IPOs = issuance supply AND price discovery for the whole theme.",
  "Top-10 share ~37% vs 18–23% 1990–2015 norm; 40.7% 2025 peak. NVDA ~$5T (first ever), AAPL $4.6T, MSFT $3.3T ≈ 18% of index. The top of the index is the scarcity trade in benchmark form.",
  "Dispersion: SOXX +80% (best since 2000, ~$5.7T added), equal-weight +14% beats S&P +11% and MAGS +6%; software −10%. Value accrues where AI spend is revenue, erodes where AI is the threat. Map, not forecast.",
  "All forward multiples: index 21.1x vs 19.0x 10-yr avg — elevated, not extreme. NVDA 22.5x forward: unremarkable multiple, the question is earnings durability under scarcity economics. Software de-rated to pre-AI levels.",
  "One mechanism, two halves: ~94% of op cash flow consumed, Big-4 FCF lowest since 2014 → $105B+ of IG mega-deals in nine months (META $30B = record non-M&A print). Leverage still light, but Oracle CDS >125bp: credit discriminates, and spreads reprice before earnings.",
  "Act Four divider. The 50% equity-tax proposal anchors the act: Sanders proposed, Trump echoed. When that pair converges, the Overton window has moved — from regulating AI to owning it.",
  "Three pillars, all sides quoted: EO (voluntary 30-day NSA review, cyber focus, no licensing), sovereign wealth fund (50% equity tax → AI Dividends), Sacks critique (corporate-government fusion). Public-ownership tail risk now belongs in lab-equity and IPO models.",
  "Hidden active risk: 37% in ten correlated names via a benchmark. Equal-weight won 2026, lost 2024–25 — message is 'size the bet on purpose.' New: policy risk is embedded in the benchmark's top ten, not exogenous.",
  "Four gauges (capex guidance + token budgets, CDS/spreads, rates, top-10 share) × four takeaways (know your AI beta; trade the chain; watch credit; respect breadth). Credit reprices faster than earnings — most likely stress path.",
  "Back matter. Data as of June 2026; returns through Jun 5–9 closes. AI Frontier review column = review-sourced items, flagged separately from exchange-verified market data. Chart labels rounded; exact values footnoted.",
];

const viewerData = {
  title: "AI in the Market",
  subtitle: "From token subsidy to token scarcity — June 2026",
  file: "ai-markets-deck.pptx",
  total: 20,
  sections: [
    { start: 1, label: "Intro" },
    { start: 3, label: "01 The shift" },
    { start: 6, label: "02 The crunch" },
    { start: 10, label: "03 The market" },
    { start: 16, label: "04 The stakes" },
    { start: 20, label: "Sources" },
  ],
  titles: [
    "Cover — From token subsidy to token scarcity",
    "The argument",
    "Divider — 01 The shift",
    "From token subsidy to token scarcity",
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
    "The bill: capex > cash flow, bonds step in",
    "Divider — 04 The stakes",
    "Washington enters the trade",
    "Your index fund is an AI fund now",
    "What breaks it — and what to do",
    "Sources & methodology",
  ],
  notes: VIEWER_NOTES,
};

fs.writeFileSync("slides-data.js", "window.DECK = " + JSON.stringify(viewerData, null, 2) + ";\n");

pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name, "+ slides-data.js (20 slides)"); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

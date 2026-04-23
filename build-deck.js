// AI Markets deck — BII visual style, 4:3 standard (10" x 7.5")
// Mirrors https://ai-markets.vercel.app/ — May 2026
// Run: node build-deck.js  →  outputs ai-markets-deck.pptx

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_4x3";
pres.author = "Strategy";
pres.title = "AI Markets — May 2026";

// ---------- Brand system ----------

const C = {
  yellow:    "FFD100",
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
  teal:      "008B8B",
  red:       "CC0000",
  navy:      "051A3D",
};

const THEMES = {
  LANDSCAPE: { color: C.teal,   textColor: C.white },
  MARKET:    { color: C.gold,   textColor: C.black },
  SHIFTS:    { color: C.orange, textColor: C.black },
  RISKS:     { color: C.red,    textColor: C.white },
  FRONTIER:  { color: C.pink,   textColor: C.white },
};

// 4:3 canvas anchors — everything below the headline rule reflows against these.
const FOOTER_Y = 6.875;
const SOURCE_Y = 6.425;

// ---------- Helpers ----------

function addFooter(slide, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: FOOTER_Y, w: 10.0, h: 0.625,
    fill: { color: C.black }, line: { color: C.black, width: 0 },
  });
  slide.addText(
    "FOR INFORMATIONAL PURPOSES ONLY. NOT INVESTMENT ADVICE. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.",
    { x: 1.5, y: FOOTER_Y + 0.05, w: 7.0, h: 0.5, fontSize: 6.5, color: C.white, align: "center", fontFace: "Arial", valign: "middle", bold: true, margin: 0 }
  );
  if (pageNum !== "" && pageNum != null) {
    slide.addText(String(pageNum), {
      x: 9.1, y: FOOTER_Y + 0.13, w: 0.6, h: 0.3, fontSize: 9, color: C.white, align: "right", fontFace: "Arial", valign: "middle", margin: 0,
    });
  }
}

function addThemeTag(slide, label) {
  const t = THEMES[label];
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.8, y: 0.18, w: 1.9, h: 0.32,
    fill: { color: t.color }, line: { color: t.color, width: 0 }, rectRadius: 0.05,
  });
  slide.addText(label, {
    x: 7.8, y: 0.18, w: 1.9, h: 0.32,
    fontSize: 10, color: t.textColor, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
    charSpacing: 1,
  });
}

function addHeadline(slide, text, opts) {
  const h = (opts && opts.h) || 0.75;
  const w = (opts && opts.w) || 7.2;
  slide.addText(text, {
    x: 0.5, y: 0.2, w: w, h: h,
    fontSize: 24, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
}

function addSubhead(slide, text, opts) {
  const y = (opts && opts.y) || 1.0;
  const h = (opts && opts.h) || 0.5;
  slide.addText(text, {
    x: 0.5, y: y, w: 9.0, h: h,
    fontSize: 13.5, color: C.medGray, fontFace: "Arial", valign: "top", margin: 0,
  });
}

function addHeadlineRule(slide, y) {
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: y != null ? y : 1.45, w: 9.0, h: 0,
    line: { color: C.lightGray, width: 0.75 },
  });
}

function addImagePlaceholder(slide, x, y, w, h, description) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: h,
    fill: { color: "EEEEEE" },
    line: { color: "BBBBBB", width: 0.75, dashType: "dash" },
  });
  slide.addText(`IMAGE: ${description}`, {
    x: x + 0.1, y: y, w: w - 0.2, h: h,
    fontSize: 10, color: "888888", italic: true, fontFace: "Arial",
    align: "center", valign: "middle", margin: 0,
  });
}

function addChartTitle(slide, text, x, y) {
  const ty = y != null ? y : 1.55;
  slide.addText(text, {
    x: x, y: ty, w: 4.3, h: 0.3,
    fontSize: 14, color: C.black, bold: true, fontFace: "Arial", valign: "bottom", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: x, y: ty + 0.3, w: 4.3, h: 0,
    line: { color: C.black, width: 1.5 },
  });
}

function addSource(slide, text, x, y, w) {
  slide.addText(text, {
    x: x != null ? x : 0.5, y: y || SOURCE_Y, w: w || 9.0, h: 0.35,
    fontSize: 7, color: "999999", fontFace: "Arial", valign: "top", margin: 0,
  });
}

function makeBigNumber(slide, number, label, x, y, w, color) {
  slide.addText(number, {
    x: x, y: y, w: w, h: 0.75,
    fontSize: 40, color: color || C.orange, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
  });
  slide.addText(label, {
    x: x, y: y + 0.8, w: w, h: 0.55,
    fontSize: 11, color: C.medGray, fontFace: "Arial", align: "center", valign: "top", margin: 0,
  });
}

function barOpts(extra) {
  return Object.assign({
    barDir: "col",
    showTitle: false,
    chartColors: [C.orange],
    catAxisLabelColor: "666666",
    valAxisLabelColor: "999999",
    catAxisLabelFontSize: 9,
    valAxisLabelFontSize: 9,
    catAxisLabelFontFace: "Arial",
    valAxisLabelFontFace: "Arial",
    valGridLine: { color: "E5E5E5", size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: "333333",
    dataLabelFontSize: 9,
    dataLabelFontFace: "Arial",
    showLegend: false,
    chartArea: { fill: { color: C.white } },
  }, extra || {});
}

function lineOpts(extra) {
  return Object.assign({
    showTitle: false,
    chartColors: [C.orange, C.darkGray, C.red],
    lineSize: 3,
    catAxisLabelColor: "999999",
    valAxisLabelColor: "999999",
    catAxisLabelFontSize: 9,
    valAxisLabelFontSize: 9,
    valGridLine: { color: "E5E5E5", size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true,
    legendPos: "b",
    legendFontSize: 9,
    legendColor: "666666",
    showValue: false,
    chartArea: { fill: { color: C.white } },
  }, extra || {});
}

// ===================================================================
// SLIDE 1 — Cover
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.yellow };

  // Hero image placeholder — square-ish so it doesn't look stretched.
  addImagePlaceholder(s, 6.3, 1.6, 3.3, 3.3, "Hero — abstract GPU / data-center close-up");

  // Date eyebrow, top right above the hero image
  s.addText("May 2026", {
    x: 7.9, y: 0.6, w: 1.7, h: 0.35,
    fontSize: 14, color: C.black, fontFace: "Arial", align: "right", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 7.9, y: 1.0, w: 1.7, h: 0,
    line: { color: C.black, width: 1 },
  });

  // Accent block — short orange rule anchoring the wordmark
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.1, w: 0.8, h: 0.1,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });

  // Wordmark — fits on one line at fontSize 60
  s.addText("AI Markets", {
    x: 0.5, y: 2.4, w: 5.8, h: 1.2,
    fontSize: 60, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  // Single short tagline
  s.addText("The capex cycle repricing every layer of tech.", {
    x: 0.5, y: 3.75, w: 5.8, h: 0.6,
    fontSize: 18, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  // Tag
  s.addText("Strategy Note  |  Equity Research", {
    x: 0.5, y: 6.0, w: 6, h: 0.35,
    fontSize: 11, color: C.black, bold: true, fontFace: "Arial", valign: "top", margin: 0,
  });

  addFooter(s, "");
}

// ===================================================================
// SLIDE 2 — Table of contents (Agenda)
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "The argument, in five parts.");
  addSubhead(s, "Landscape, Market, Shifts, Risks, Frontier. Each answers a different question about the same ~$750B capex cycle.");
  addHeadlineRule(s);

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.85, w: 10.0, h: 4.1,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("THE DECK AT A GLANCE", {
    x: 0.5, y: 2.0, w: 9.0, h: 0.28,
    fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 3, margin: 0,
  });

  const cards = [
    { label: "LANDSCAPE", accent: C.teal,   stat: "01", sub: "What AI is, where it runs, why it matters.",   pages: "Slides 3–6" },
    { label: "MARKET",    accent: C.gold,   stat: "02", sub: "Semis, labs, and how AI has repriced earnings.", pages: "Slides 7–9" },
    { label: "SHIFTS",    accent: C.orange, stat: "03", sub: "The agent era and the great divergence.",       pages: "Slides 10–11" },
    { label: "RISKS",     accent: C.red,    stat: "04", sub: "Bubble, supply chain, policy, backlash.",       pages: "Slides 12–15" },
    { label: "FRONTIER",  accent: C.pink,   stat: "05", sub: "Orbital, physical, autonomy, biology.",         pages: "Slides 16–19" },
  ];

  const cardY = 2.45, cardW = 1.7, cardH = 3.2, gap = 0.18;
  const totalW = cards.length * cardW + (cards.length - 1) * gap;
  const startX = (10 - totalW) / 2;

  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: "444444" }, line: { color: "444444", width: 0 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: 0.06,
      fill: { color: c.accent }, line: { color: c.accent, width: 0 },
    });
    s.addText(c.stat, {
      x: x, y: cardY + 0.3, w: cardW, h: 0.7,
      fontSize: 30, color: c.accent, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(c.label, {
      x: x, y: cardY + 1.1, w: cardW, h: 0.3,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", charSpacing: 2, margin: 0,
    });
    s.addText(c.sub, {
      x: x + 0.12, y: cardY + 1.55, w: cardW - 0.24, h: 0.8,
      fontSize: 9, color: "CCCCCC", fontFace: "Arial", align: "center", margin: 0,
    });
    s.addText(c.pages, {
      x: x, y: cardY + 2.8, w: cardW, h: 0.22,
      fontSize: 8, color: "AAAAAA", fontFace: "Arial", align: "center", italic: true, margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research. 20 slides, read top to bottom.");
  addFooter(s, 2);
}

// ===================================================================
// SLIDE 3 — Why AI matters to markets (LANDSCAPE hero)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "Why AI matters to markets.");
  addSubhead(s, "AI is the largest capex cycle in history, it touches every layer of the economy, and it is repricing everything — in both directions.");
  addHeadlineRule(s);

  const stats = [
    { n: "$750B", lbl: "2026E hyperscaler capex — Big 5 combined",         color: C.orange },
    { n: "$4T",   lbl: "cumulative AI data-center spend through 2030",     color: C.orange },
    { n: "+38%",  lbl: "semiconductors (SOXX) YTD",                        color: C.green },
    { n: "–20%",  lbl: "software (IGV) YTD",                               color: C.red },
  ];
  const y = 2.3, w = 2.1, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  // Yellow payoff band — sits just above source in 4:3 canvas.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.6, w: 9.0, h: 0.6,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("A ~58-point spread between semis and software. The same AI wave is creating winners and losers simultaneously.", {
    x: 0.7, y: 5.6, w: 8.6, h: 0.6,
    fontSize: 13, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: CreditSights / MUFG hyperscaler capex 2026 estimates; Jensen Huang (Sept 2025); Deutsche Bank; iShares SOXX & IGV YTD total return as of Apr 17, 2026.");
  addFooter(s, 3);
}

// ===================================================================
// SLIDE 4 — AI evolution from chatbots to agents (6-phase timeline)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "AI evolution from chatbots to agents.");
  addSubhead(s, "Software that learns from data, reasons through problems, and — increasingly — takes action without human direction.");
  addHeadlineRule(s);

  const phases = [
    { date: "1950s–80s",   title: "Symbolic AI",       desc: "Hand-coded rules. Expert systems with narrow recall.",          color: C.medGray, hero: false },
    { date: "1990s–2000s", title: "Machine Learning",  desc: "Systems learn patterns from data, not rules.",                  color: C.teal,    hero: false },
    { date: "2012",        title: "Deep Learning",     desc: "Neural networks go deep. AlexNet, the first breakthrough.",     color: C.gold,    hero: false },
    { date: "2022–24",     title: "LLM chatbots",      desc: "ChatGPT hits 100M users in 2 months. Claude, Gemini follow.",   color: C.orange,  hero: true  },
    { date: "2023–24",     title: "Reasoning",         desc: "Multi-step logic, chain-of-thought. o1, DeepSeek R1.",          color: C.pink,    hero: false },
    { date: "2025+",       title: "Agentic AI",        desc: "AI that uses tools and acts autonomously. Claude Code, agents.", color: C.red,     hero: true  },
  ];

  const lineY = 2.2;
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: lineY, w: 8.6, h: 0,
    line: { color: C.medGray, width: 2.5 },
  });
  const colW = 8.6 / phases.length;
  phases.forEach((ev, i) => {
    const cx = 0.7 + colW * (i + 0.5);
    const dotR = 0.13;
    s.addShape(pres.shapes.OVAL, {
      x: cx - dotR, y: lineY - dotR, w: dotR * 2, h: dotR * 2,
      fill: { color: ev.color }, line: { color: C.white, width: 1.5 },
    });
    const cardX = cx - colW * 0.48;
    const cardW = colW * 0.96;
    const cardFill = ev.hero ? "FFF8F3" : C.offWhite;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: cardW, h: 3.6,
      fill: { color: cardFill }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: 0.06, h: 3.6,
      fill: { color: ev.color }, line: { color: ev.color, width: 0 },
    });
    s.addText(ev.date, {
      x: cardX + 0.14, y: lineY + 0.35, w: cardW - 0.2, h: 0.28,
      fontSize: 9, color: C.medGray, fontFace: "Arial", margin: 0,
    });
    s.addText(ev.title, {
      x: cardX + 0.14, y: lineY + 0.68, w: cardW - 0.2, h: 0.45,
      fontSize: ev.hero ? 13 : 12, color: C.black, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(ev.desc, {
      x: cardX + 0.14, y: lineY + 1.2, w: cardW - 0.2, h: 2.55,
      fontSize: 9.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research.");
  addFooter(s, 4);
}

// ===================================================================
// SLIDE 5 — The AI stack (11 layers)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "The AI stack.");
  addSubhead(s, "From rare earths in the ground to agents that act on your behalf. Eleven layers, each investable, each with its own constraint.");
  addHeadlineRule(s);

  const layers = [
    { name: "Agents",        desc: "Autonomous AI that acts on your behalf",           tag: "FASTEST-GROWING",    color: C.pink },
    { name: "Apps",          desc: "Products built on foundation models",              tag: "",                   color: C.orange },
    { name: "Models",        desc: "The intelligence layer",                           tag: "",                   color: C.orange },
    { name: "Data centers",  desc: "Warehouses of compute",                            tag: "",                   color: C.gold },
    { name: "Power",         desc: "The hidden constraint",                            tag: "",                   color: C.gold },
    { name: "Networking",    desc: "Moving data at terabit speed",                     tag: "",                   color: C.teal },
    { name: "Packaging",     desc: "Stacking chiplets (CoWoS, HBM)",                   tag: "DEEPEST BOTTLENECK", color: C.red },
    { name: "Chip design",   desc: "GPUs, TPUs, ASICs",                                tag: "",                   color: C.teal },
    { name: "Foundry",       desc: "Fabricating at nanometer scale",                   tag: "",                   color: C.teal },
    { name: "Equipment",     desc: "Machines that make machines",                      tag: "",                   color: C.medGray },
    { name: "Raw materials", desc: "Silicon, neon, rare earths",                       tag: "",                   color: C.medGray },
  ];
  const startY = 1.7, rowH = 0.4;
  layers.forEach((l, i) => {
    const y = startY + i * rowH;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.15, h: rowH - 0.08,
      fill: { color: l.color }, line: { color: l.color, width: 0 },
    });
    s.addText(l.name, {
      x: 0.75, y: y, w: 2.2, h: rowH - 0.08,
      fontSize: 12, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    });
    s.addText(l.desc, {
      x: 2.95, y: y, w: 4.2, h: rowH - 0.08,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
    if (l.tag) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 7.2, y: y + 0.04, w: 2.25, h: rowH - 0.16,
        fill: { color: l.color }, line: { color: l.color, width: 0 }, rectRadius: 0.03,
      });
      s.addText(l.tag, {
        x: 7.2, y: y + 0.04, w: 2.25, h: rowH - 0.16,
        fontSize: 8, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
      });
    }
  });

  addSource(s, "Source: Strategy Research. Layers ordered top (closest to user) to bottom (closest to atoms).");
  addFooter(s, 5);
}

// ===================================================================
// SLIDE 6 — AI growth rates are unprecedented
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "AI growth rates are unprecedented.");
  addSubhead(s, "User adoption and revenue growth for AI far eclipse prior technologies — a once-in-a-generation S-curve, compressed into a handful of years.");
  addHeadlineRule(s);

  addChartTitle(s, "User adoption after first mass-market launch", 0.5, 1.7);
  const adoptYears = ["Y0", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15"];
  s.addChart(pres.charts.LINE,
    [
      { name: "AI",       labels: adoptYears, values: [0, 18, 38, 56, null, null, null, null, null, null, null, null, null, null, null, null] },
      { name: "Internet", labels: adoptYears, values: [0, 2, 5, 10, 16, 24, 32, 40, 47, 53, 58, 62, 64, 66, 67, 68] },
      { name: "PC",       labels: adoptYears, values: [0, 1, 3, 6, 9, 13, 18, 23, 28, 32, 36, 40, 43, 46, 48, 49] },
    ],
    lineOpts({ x: 0.5, y: 2.2, w: 4.3, h: 3.6,
               chartColors: [C.orange, C.teal, C.medGray],
               valAxisMinVal: 0, valAxisMaxVal: 100,
               valAxisLabelFormatCode: "0\"%\"" })
  );
  s.addText("% of US population", {
    x: 0.5, y: 2.1, w: 4.3, h: 0.18,
    fontSize: 8, color: C.medGray, italic: true, fontFace: "Arial", margin: 0,
  });

  addChartTitle(s, "Revenue after first $1B year ($B)", 5.2, 1.7);
  const revYears = ["Y0", "Y1", "Y2", "Y3", "Y4 (2026E)"];
  s.addChart(pres.charts.BAR,
    [
      { name: "AI",       labels: revYears, values: [1, 5, 16, 42, 82] },
      { name: "Cloud",    labels: revYears, values: [1, 2, 4, 7, 12] },
      { name: "Internet", labels: revYears, values: [1, 2, 3, 5, 8] },
    ],
    barOpts({ x: 5.2, y: 2.2, w: 4.3, h: 3.6,
              chartColors: [C.orange, C.gold, C.teal],
              barGrouping: "clustered",
              showLegend: true, legendPos: "b", legendFontSize: 8, legendColor: "666666",
              valAxisMinVal: 0, valAxisMaxVal: 100,
              dataLabelFontSize: 7 })
  );
  s.addText("Revenue ($B)", {
    x: 5.2, y: 2.1, w: 4.3, h: 0.18,
    fontSize: 8, color: C.medGray, italic: true, fontFace: "Arial", margin: 0,
  });

  // Players strip
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.9, w: 9.0, h: 0.24,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "AI ",       options: { bold: true, color: C.orange, fontSize: 8.5, charSpacing: 2 } },
    { text: "OpenAI · Anthropic    ",   options: { color: C.white, fontSize: 9, bold: true } },
    { text: "CLOUD ",    options: { bold: true, color: C.gold, fontSize: 8.5, charSpacing: 2 } },
    { text: "AWS · Azure · Google Cloud    ", options: { color: C.white, fontSize: 9, bold: true } },
    { text: "INTERNET ", options: { bold: true, color: C.teal, fontSize: 8.5, charSpacing: 2 } },
    { text: "Meta · Google",             options: { color: C.white, fontSize: 9, bold: true } },
  ], {
    x: 0.7, y: 5.9, w: 8.6, h: 0.24,
    fontFace: "Arial", valign: "middle", margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 6.18, w: 9.0, h: 0.22,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("User adoption and revenue growth for AI far eclipse prior technologies.", {
    x: 0.7, y: 6.18, w: 8.6, h: 0.22,
    fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Mary Meeker (Bond Capital / KPCB Internet Trends 2019); company filings and consensus estimates. Cloud and Internet trajectories are illustrative. 2026E shown for AI.");
  addFooter(s, 6);
}

// ===================================================================
// SLIDE 7 — The semiconductor market (MARKET opener; merges old 10 + 11)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "The semiconductor market.");
  addSubhead(s, "A ~$975B market. Logic and memory drive the engine; HBM is the bottleneck on its way to a $100B TAM — and the HBM oligopoly is a Korean story.");
  addHeadlineRule(s);

  // --- LEFT: revenue by segment ---
  addChartTitle(s, "Semi revenue by segment, 2026E ($B)", 0.5, 1.7);
  s.addChart(pres.charts.BAR,
    [{
      name: "2026E $B",
      labels: ["Logic", "Memory", "Analog", "Micro", "Discrete"],
      values: [302, 295, 95, 85, 45],
    }],
    barOpts({ x: 0.5, y: 2.2, w: 4.3, h: 2.7, chartColors: [C.orange],
              dataLabelPosition: "inEnd", dataLabelColor: "FFFFFF" })
  );

  // --- RIGHT: HBM TAM ---
  addChartTitle(s, "HBM TAM ($B) — 25× growth, 2023 → 2028E", 5.2, 1.7);
  s.addChart(pres.charts.BAR,
    [{
      name: "HBM TAM $B",
      labels: ["2023", "2024", "2025", "2026E", "2027E", "2028E"],
      values: [4, 16, 35, 55, 80, 100],
    }],
    barOpts({ x: 5.2, y: 2.2, w: 4.3, h: 2.7, chartColors: [C.orange] })
  );

  // --- KOREA CALLOUT STRIP ---
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.0, w: 9.0, h: 0.8,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("THE KOREAN OLIGOPOLY", {
    x: 0.5, y: 5.05, w: 9.0, h: 0.25,
    fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", align: "center", charSpacing: 3, margin: 0,
  });
  s.addText([
    { text: "SK Hynix + Samsung = ~78% of HBM, ~76% of DRAM. ", options: { color: C.white, fontSize: 11, bold: true } },
    { text: "SK Hynix's 2025 operating profit hit ₩47.2T (~$33B) — an all-time record that ", options: { color: "CCCCCC", fontSize: 10.5 } },
    { text: "overtook Samsung for the first time. ", options: { color: C.white, fontSize: 10.5, bold: true } },
    { text: "HBM revenue more than doubled YoY.", options: { color: "CCCCCC", fontSize: 10.5 } },
  ], {
    x: 0.7, y: 5.32, w: 8.6, h: 0.46,
    fontFace: "Arial", valign: "middle", margin: 0,
  });

  // --- YELLOW PAYOFF BANNER ---
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.9, w: 9.0, h: 0.45,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("$975B total, +26% YoY. Logic + memory = ~$600B, tracking hyperscaler capex almost dollar-for-dollar.", {
    x: 0.7, y: 5.9, w: 8.6, h: 0.45,
    fontSize: 11.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: WSTS Fall 2025 forecast; SIA; BofA 2026 HBM TAM; SK Hynix FY25 results (₩97.1T rev, ₩47.2T op profit, Jan 2026); Samsung Q4 2025 filings; TrendForce; Counterpoint Research.");
  addFooter(s, 7);
}

// ===================================================================
// SLIDE 8 — The labs (private valuations)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "The labs.");
  addSubhead(s, "Four frontier labs now worth ~$1.5T in aggregate private value. Q1 2026 doubled all of 2025's foundational-AI VC funding — and VCs are still chasing.");
  addHeadlineRule(s);

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 11, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 11.5, fontFace: "Arial", valign: "middle", align: "center", color: C.darkGray }, opts || {}) });
  const rows = [
    { name: "OpenAI",    val: "$852B", mult: "~35× ARR",  event: "$122B round · AMZN / NVDA / SoftBank · Apr 2026" },
    { name: "Anthropic", val: "$380B", mult: "~13× ARR",  event: "$30B Series G (Feb); VCs now offering $800B+" },
    { name: "xAI",       val: "$230B", mult: "~77× ARR*", event: "$20B Nvidia-led Series E · Q1 2026" },
    { name: "Mistral",   val: "$14B",  mult: "~14× ARR",  event: "€1.7B Series C · Jun 2024" },
  ];
  const tableData = [
    [hdr("Lab"), hdr("Valuation"), hdr("Multiple"), hdr("Latest event")],
    ...rows.map((r, i) => {
      const fill = i % 2 === 1 ? { fill: { color: C.offWhite } } : { fill: { color: C.white } };
      return [
        cell(r.name, Object.assign({ bold: true, color: C.black, align: "left" }, fill)),
        cell(r.val,  Object.assign({ bold: true, color: C.orange }, fill)),
        cell(r.mult, fill),
        cell(r.event, Object.assign({ align: "left", fontSize: 10.5 }, fill)),
      ];
    }),
  ];
  s.addTable(tableData, {
    x: 0.5, y: 1.9, w: 9.0,
    colW: [1.3, 1.4, 1.5, 4.8],
    rowH: 0.55,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.8, w: 9.0, h: 0.55,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Q1 2026 funding to foundational AI startups was 2× all of 2025.", {
    x: 0.7, y: 5.8, w: 8.6, h: 0.55,
    fontSize: 13.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: TechCrunch, CNBC, Tech-Insider (Apr 2026); Crunchbase Q1 2026 VC data; Sacra ARR run-rates; Bloomberg. *xAI ARR estimated.");
  addFooter(s, 8);
}

// ===================================================================
// SLIDE 9 — Earnings & valuations (Tech vs Non-Tech)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Earnings & valuations.");
  addSubhead(s, "Top 10 Tech firms are growing 4× faster than the top 10 Non-Tech — at a lower multiple. The divergence in fundamentals has not been priced into valuations.");
  addHeadlineRule(s);

  // --- LEFT PANEL: three mini grouped bars (Rev Growth / Op Margin / P/E) ---
  addChartTitle(s, "Top 10 Tech vs Top 10 Non-Tech — 2026E", 0.5, 1.7);

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.2, w: 4.3, h: 3.2,
    fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
  });

  const metrics = [
    { key: "Revenue Growth", tech: 22, non: 5,  suffix: "%", max: 50 },
    { key: "Op Margin",      tech: 41, non: 20, suffix: "%", max: 50 },
    { key: "P/E",            tech: 23, non: 27, suffix: "x", max: 35 },
  ];
  const panelX = 0.5, panelY = 2.2, panelW = 4.3, panelH = 3.2;
  const colGap = 0.1;
  const cellW = (panelW - colGap * (metrics.length + 1)) / metrics.length;
  const maxBarH = panelH - 1.2;
  const barBaseY = panelY + 0.4 + maxBarH;

  metrics.forEach((m, i) => {
    const cx = panelX + colGap + i * (cellW + colGap);
    const barW = (cellW - 0.18) / 2;
    const techH = (m.tech / m.max) * maxBarH;
    const nonH  = (m.non  / m.max) * maxBarH;

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.06, y: barBaseY - techH, w: barW, h: techH,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 },
    });
    s.addText(m.tech + m.suffix, {
      x: cx + 0.06, y: barBaseY - techH - 0.3, w: barW, h: 0.25,
      fontSize: 10.5, color: C.orange, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.12 + barW, y: barBaseY - nonH, w: barW, h: nonH,
      fill: { color: C.medGray }, line: { color: C.medGray, width: 0 },
    });
    s.addText(m.non + m.suffix, {
      x: cx + 0.12 + barW, y: barBaseY - nonH - 0.3, w: barW, h: 0.25,
      fontSize: 10.5, color: C.medGray, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });

    s.addShape(pres.shapes.LINE, {
      x: cx + 0.04, y: barBaseY, w: cellW - 0.08, h: 0,
      line: { color: C.darkGray, width: 0.75 },
    });
    s.addText(m.key, {
      x: cx, y: barBaseY + 0.12, w: cellW, h: 0.28,
      fontSize: 10, color: C.black, bold: true, fontFace: "Arial", align: "center", margin: 0,
    });
  });

  // Legend swatches below the panel
  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 5.55, w: 0.18, h: 0.12, fill: { color: C.orange }, line: { color: C.orange, width: 0 } });
  s.addText("Top 10 Tech", {
    x: 1.22, y: 5.51, w: 1.4, h: 0.2, fontSize: 9, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 2.7, y: 5.55, w: 0.18, h: 0.12, fill: { color: C.medGray }, line: { color: C.medGray, width: 0 } });
  s.addText("Top 10 Non-Tech", {
    x: 2.92, y: 5.51, w: 1.7, h: 0.2, fontSize: 9, color: C.darkGray, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  // --- RIGHT PANEL: scatter of 2026 P/E vs Rev Growth ---
  addChartTitle(s, "2026E P/E vs 2026E Revenue Growth", 5.2, 1.7);

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 2.2, w: 4.3, h: 3.2,
    fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 3.8, w: 2.15, h: 1.6,
    fill: { color: "FBEAEA" }, line: { color: "FBEAEA", width: 0 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.35, y: 2.2, w: 2.15, h: 1.6,
    fill: { color: "FFF6D6" }, line: { color: "FFF6D6", width: 0 },
  });
  s.addText("Expensive for low growth", {
    x: 5.25, y: 5.15, w: 2.05, h: 0.22,
    fontSize: 8.5, color: C.red, bold: true, italic: true, fontFace: "Arial", margin: 0,
  });
  s.addText("Inexpensive for high growth", {
    x: 7.4, y: 2.25, w: 2.05, h: 0.22,
    fontSize: 8.5, color: C.darkGray, bold: true, italic: true, fontFace: "Arial", align: "right", margin: 0,
  });

  const techPts = [
    { t: "NVDA",    x: 55, y: 28 },
    { t: "Meta",    x: 18, y: 22 },
    { t: "MSFT",    x: 15, y: 28 },
    { t: "Alphabet",x: 13, y: 20 },
    { t: "Amazon",  x: 12, y: 28 },
    { t: "Broadcom",x: 22, y: 24 },
    { t: "TSMC",    x: 28, y: 19 },
    { t: "Oracle",  x: 17, y: 22 },
    { t: "JD",      x: 11, y: 10 },
    { t: "Tencent", x: 12, y: 18 },
    { t: "Samsung", x: 14, y: 14 },
  ];
  const nonTechPts = [
    { t: "Lilly",    x: 18, y: 34 },
    { t: "Costco",   x: 8,  y: 48 },
    { t: "Walmart",  x: 5,  y: 32 },
    { t: "Home Depot", x: 4, y: 24 },
    { t: "JPM",      x: 5,  y: 15 },
    { t: "Berkshire",x: 4,  y: 22 },
    { t: "CAT",      x: 3,  y: 18 },
    { t: "Exxon",    x: -2, y: 14 },
  ];

  s.addChart(pres.charts.SCATTER,
    [
      { name: "X Axis", values: [-5, 0, 10, 20, 30, 40, 50, 60, 70] },
      { name: "Top 10 Tech",     values: techPts.map(p => p.y) },
      { name: "Top 10 Non-Tech", values: nonTechPts.map(p => p.y) },
    ],
    {
      x: 5.2, y: 2.2, w: 4.3, h: 3.2,
      chartColors: [C.white, C.gold, C.red],
      lineSize: 0,
      lineDataSymbol: "circle",
      lineDataSymbolSize: 9,
      catAxisTitle: "Revenue growth, 2026E",
      showCatAxisTitle: true,
      catAxisTitleFontSize: 8,
      catAxisTitleColor: "666666",
      catAxisTitleFontFace: "Arial",
      valAxisTitle: "P/E, 2026E",
      showValAxisTitle: true,
      valAxisTitleFontSize: 8,
      valAxisTitleColor: "666666",
      valAxisTitleFontFace: "Arial",
      catAxisLabelFontSize: 8,
      valAxisLabelFontSize: 8,
      catAxisLabelColor: "999999",
      valAxisLabelColor: "999999",
      valAxisMinVal: 0,
      valAxisMaxVal: 55,
      valAxisMajorUnit: 10,
      valGridLine: { color: "EEEEEE", size: 0.5 },
      catGridLine: { style: "none" },
      showLegend: true,
      legendPos: "b",
      legendFontSize: 8,
      legendColor: "666666",
    }
  );

  // Dark-gray payoff band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.9, w: 9.0, h: 0.45,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("Top 10 Tech growing ~4× faster than top 10 Non-Tech — at a cheaper multiple.", {
    x: 0.7, y: 5.9, w: 8.6, h: 0.45,
    fontSize: 11.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Bloomberg consensus estimates (2026E); company filings. Top 10 defined by 2026E revenue within each group. Individual P/E / growth points are indicative.");
  addFooter(s, 9);
}

// ===================================================================
// SLIDE 10 — What is agentic AI? (with image placeholder)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "What is agentic AI?");
  addSubhead(s, "Agents set goals, use tools, and complete tasks end-to-end. Each session uses 10–100× the compute of a chatbot query.");
  addHeadlineRule(s);

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9.5, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 10, fontFace: "Arial", valign: "middle", color: C.darkGray, margin: 0.05 }, opts || {}) });
  const tableData = [
    [hdr("Dimension"), hdr("Chatbot (2023–24)"), hdr("Agent (2025+)")],
    [cell("Interaction",      { bold: true, color: C.black, align: "left", fill: { color: C.offWhite } }),
     cell("You ask, it answers",            { fill: { color: C.offWhite }, align: "left" }),
     cell("Sets goals, executes autonomously", { fill: { color: C.offWhite }, align: "left", bold: true, color: C.orange })],
    [cell("Tokens per session", { bold: true, color: C.black, align: "left" }),
     cell("1K – 5K",            { align: "left" }),
     cell("50K – 500K+",        { align: "left", bold: true, color: C.black })],
    [cell("Compute per user",   { bold: true, color: C.black, align: "left", fill: { color: C.offWhite } }),
     cell("1×",                  { fill: { color: C.offWhite }, align: "left" }),
     cell("10 – 100×",          { fill: { color: C.offWhite }, align: "left", bold: true, color: C.black })],
    [cell("Tools",              { bold: true, color: C.black, align: "left" }),
     cell("None",                { align: "left" }),
     cell("Code, APIs, browsers, databases", { align: "left", bold: true, color: C.black })],
  ];
  s.addTable(tableData, {
    x: 0.5, y: 1.85, w: 5.5,
    colW: [1.4, 2.0, 2.1],
    rowH: 0.65,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  // Image placeholder on the right
  addImagePlaceholder(s, 6.2, 1.85, 3.3, 3.25, "Agent UI — terminal / IDE with an AI coworker session (e.g. Claude Code)");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.85, w: 9.0, h: 0.5,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("Labs are buying dev-tool companies (Bun, Astral) to lock the coding stack.", {
    x: 0.7, y: 5.85, w: 8.6, h: 0.5,
    fontSize: 13, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Anthropic, OpenAI, GitHub Trending; company announcements; TechCrunch acquisition reporting.");
  addFooter(s, 10);
}

// ===================================================================
// SLIDE 11 — The divergence (SOXX vs IGV, diSAASter)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "The divergence.");
  addSubhead(s, "AI stock correlation collapsed from ~80% to ~20%. Semis are up, software is down — a ~58-point YTD spread inside one theme.");
  addHeadlineRule(s);

  addChartTitle(s, "YTD price return, rebased to 100", 0.5, 1.7);
  s.addChart(pres.charts.LINE,
    [
      { name: "Semis (SOXX)",   labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100, 110, 118, 128, 138] },
      { name: "Nasdaq",         labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100,  98,  96,  99, 104] },
      { name: "Software (IGV)", labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100,  88,  78,  76,  80] },
    ],
    lineOpts({ x: 0.5, y: 2.2, w: 4.3, h: 3.6 })
  );

  const ROW_H = 0.4;
  const X_TICKER = 1.0;
  const X_PCT    = 0.9;
  const drawPanel = (x, y, title, color, rows, pctColor) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 4.3, h: 0.32,
      fill: { color: color }, line: { color: color, width: 0 },
    });
    s.addText(title, {
      x: x, y: y, w: 4.3, h: 0.32,
      fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    rows.forEach((r, i) => {
      const ry = y + 0.4 + i * ROW_H;
      s.addText(r.ticker, {
        x: x, y: ry, w: X_TICKER, h: ROW_H,
        fontSize: 11, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0.05,
      });
      s.addText(r.pct, {
        x: x + X_TICKER, y: ry, w: X_PCT, h: ROW_H,
        fontSize: 13, color: pctColor, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
      });
      s.addText(r.note, {
        x: x + X_TICKER + X_PCT, y: ry, w: 4.3 - X_TICKER - X_PCT, h: ROW_H,
        fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
      });
    });
  };

  drawPanel(5.2, 2.2, "MEMORY SUPERCYCLE", C.green, [
    { ticker: "Samsung",  pct: "+72%", note: "HBM capacity +50% in 2026" },
    { ticker: "Micron",   pct: "+68%", note: "HBM sold out; $8B run-rate" },
    { ticker: "SK Hynix", pct: "+62%", note: "60% HBM share; HBM4 ramp" },
  ], C.green);

  drawPanel(5.2, 3.9, "THE diSAAS-ter", C.red, [
    { ticker: "Salesforce", pct: "–22%", note: "Seat model under agent threat" },
    { ticker: "Adobe",      pct: "–24%", note: "Gen-AI erodes content moat" },
    { ticker: "ServiceNow", pct: "–19%", note: "Workflows disrupted by agents" },
  ], C.red);

  addSource(s, "Sources: iShares SOXX / IGV / QQQ YTD total return, Apr 17, 2026; Yahoo Finance; Counterpoint Research; Morgan Stanley CIO Survey. Single-stock YTDs indicative.");
  addFooter(s, 11);
}

// ===================================================================
// SLIDE 12 — The bubble question (vs 2000)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "The bubble question.");
  addSubhead(s, "Four tests. Same questions investors asked about Cisco and the dotcoms. Different answers today.");
  addHeadlineRule(s);

  const tests = [
    { test: "PRICE PER DOLLAR OF EARNINGS",  y2000: "131×", y2000sub: "Cisco fwd P/E, Mar 2000",       y2026: "~24×",   y2026sub: "NVIDIA fwd P/E, Apr 17, 2026" },
    { test: "LEADER PROFITABILITY",          y2000: "14%",  y2000sub: "of tech IPOs were profitable",  y2026: "26%",    y2026sub: "Mag 7 avg net margin (2× S&P)" },
    { test: "SUPPLY VS. DEMAND",             y2000: "Oversupply", y2000sub: "$500B dark fiber unused", y2026: "Sold out", y2026sub: "GPU 2nd market 90–95% of list" },
    { test: "BUYER BALANCE SHEETS",          y2000: "20+",  y2000sub: "major telcos went bankrupt",    y2026: "~48%",   y2026sub: "hyperscaler net debt/EBITDA (vs ~80% S&P)" },
  ];

  // Header row
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.9, w: 3.4, h: 0.35, fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 } });
  s.addText("TEST", { x: 0.5, y: 1.9, w: 3.4, h: 0.35, fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.95, y: 1.9, w: 2.7, h: 0.35, fill: { color: C.red }, line: { color: C.red, width: 0 } });
  s.addText("DOTCOM 2000", { x: 3.95, y: 1.9, w: 2.7, h: 0.35, fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.7, y: 1.9, w: 2.8, h: 0.35, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addText("AI 2026", { x: 6.7, y: 1.9, w: 2.8, h: 0.35, fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });

  tests.forEach((t, i) => {
    const y = 2.3 + i * 0.72;
    if (i % 2 === 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: y, w: 9.0, h: 0.72,
        fill: { color: C.offWhite }, line: { color: C.offWhite, width: 0 },
      });
    }
    s.addText(t.test, {
      x: 0.5, y: y, w: 3.4, h: 0.72,
      fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0.12,
    });
    s.addText([{ text: t.y2000 + "  ", options: { bold: true, color: C.red, fontSize: 16 } }, { text: t.y2000sub, options: { color: C.medGray, fontSize: 9 } }], {
      x: 3.95, y: y, w: 2.7, h: 0.72, fontFace: "Arial", valign: "middle", margin: 0.08,
    });
    s.addText([{ text: t.y2026 + "  ", options: { bold: true, color: C.green, fontSize: 16 } }, { text: t.y2026sub, options: { color: C.medGray, fontSize: 9 } }], {
      x: 6.7, y: y, w: 2.8, h: 0.72, fontFace: "Arial", valign: "middle", margin: 0.08,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.85, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText([
    { text: "Corrections happen. Bubbles require stretched valuations AND supply exceeding demand. ", options: { color: C.black, fontSize: 11.5 } },
    { text: "Neither condition holds today.", options: { color: C.red, fontSize: 12, bold: true } },
  ], {
    x: 0.7, y: 5.85, w: 8.6, h: 0.5,
    fontFace: "Arial", bold: true, valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Harding Loevner (Cisco); GuruFocus (NVDA fwd P/E Apr 17, 2026); Jay Ritter / UF; Bloomberg; CoreWeave 2nd market; FCC dark fiber data.");
  addFooter(s, 12);
}

// ===================================================================
// SLIDE 13 — Supply chain fragility
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Supply chain fragility.");
  addSubhead(s, "Four countries control the advanced semiconductor stack. US reshoring is real but slow — most leading-edge fabs come online 2027+.");
  addHeadlineRule(s);

  const stats = [
    { n: "~90%",  lbl: "TSMC share of advanced-node chips",        color: C.red },
    { n: "76%",   lbl: "SK Hynix + Samsung combined DRAM share",    color: C.red },
    { n: "<100",  lbl: "EUV machines ASML builds per year",         color: C.orange },
    { n: "~$36B", lbl: "CHIPS Act committed (of $52.7B)",           color: C.orange },
  ];
  const y = 2.2, w = 2.1, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  // US reshoring strip
  const fabs = [
    { name: "TSMC Arizona",   status: "Fab 1 at 4nm; Fab 2 online ~2026–27" },
    { name: "Samsung Taylor", status: "2nm fab, pushed to 2026" },
    { name: "Micron Clay NY", status: "Broke ground; online ~2028–30" },
    { name: "Intel Ohio",     status: "Two fabs under build; online ~2027–28" },
  ];
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.3, w: 9.0, h: 0.35,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("US RESHORING — ACTUAL STATUS", {
    x: 0.5, y: 4.3, w: 9.0, h: 0.35,
    fontSize: 10, color: C.orange, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });
  fabs.forEach((f, i) => {
    const x = 0.5 + (i % 4) * 2.225;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.05, y: 4.7, w: 2.125, h: 1.1,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(f.name, {
      x: x + 0.1, y: 4.78, w: 2.0, h: 0.3,
      fontSize: 11, color: C.black, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(f.status, {
      x: x + 0.1, y: 5.1, w: 2.0, h: 0.6,
      fontSize: 9.5, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.95, w: 9.0, h: 0.35,
    fill: { color: C.red }, line: { color: C.red, width: 0 },
  });
  s.addText("A single leading-edge chip crosses 70+ borders and six countries before reaching a data center.", {
    x: 0.7, y: 5.95, w: 8.6, h: 0.35,
    fontSize: 11, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: TSMC, Samsung, Micron, Intel filings; US Commerce Dept CHIPS Program Office (Nov 2025 — $36B+ committed of $52.7B); SIA.");
  addFooter(s, 13);
}

// ===================================================================
// SLIDE 14 — Policy & regulation
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Policy & regulation.");
  addSubhead(s, "Export controls, EU compliance, and reshoring subsidies now decide who can sell what, to whom, from where.");
  addHeadlineRule(s);

  const cols = [
    {
      x: 0.5, accent: C.red, title: "EXPORT CONTROLS", stat: "$5.5B",
      statLbl: "NVIDIA H20 writedown",
      items: [
        "H100/H200/Blackwell banned from China.",
        "H20 reinstated with a 15% Treasury fee.",
        "ASML DUV banned; China share ~20%.",
      ],
    },
    {
      x: 3.6, accent: C.orange, title: "AI REGULATION", stat: "7%",
      statLbl: "EU AI Act fine cap (of global revenue) — Aug 2 enforcement",
      items: [
        "Fines up to €35M or 7% of global revenue.",
        "Initial compliance: $8–15M per system.",
        "36% of enterprises feel prepared.",
      ],
    },
    {
      x: 6.7, accent: C.gold, title: "TRADE & RESHORING", stat: "~$36B",
      statLbl: "CHIPS Act committed (of $52.7B authorized)",
      items: [
        "China controls ~90% of rare-earth processing.",
        "Gallium / germanium controls since Jul 2023.",
        "SMIC 5nm yield ~20% vs >70% threshold.",
      ],
    },
  ];

  cols.forEach((col) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.95, w: 2.8, h: 0.45,
      fill: { color: col.accent }, line: { color: col.accent, width: 0 },
    });
    s.addText(col.title, {
      x: col.x, y: 1.95, w: 2.8, h: 0.45,
      fontSize: 11.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 2.4, w: 2.8, h: 3.8,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.stat, {
      x: col.x, y: 2.55, w: 2.8, h: 0.7,
      fontSize: 28, color: col.accent, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(col.statLbl, {
      x: col.x + 0.1, y: 3.3, w: 2.6, h: 0.55,
      fontSize: 9.5, color: C.medGray, fontFace: "Arial", align: "center", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: col.x + 0.2, y: 3.9, w: 2.4, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.items.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < col.items.length - 1 },
    })), {
      x: col.x + 0.15, y: 4.0, w: 2.55, h: 2.15,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 4,
    });
  });

  addSource(s, "Sources: NVIDIA 10-Q; ASML filings; EU AI Act Article 99 / Chapter V (Aug 2, 2026 enforcement); US Bureau of Industry and Security; Commerce Dept (Nov 2025).");
  addFooter(s, 14);
}

// ===================================================================
// SLIDE 15 — AI backlash
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "AI backlash.");
  addSubhead(s, "NIMBY revolt, anti-AI sentiment, and a labor shortage are each capable of pricing the infrastructure bet lower.");
  addHeadlineRule(s);

  const stats = [
    { n: "$64B",  lbl: "in data-center projects blocked or delayed",  color: C.red },
    { n: "26%",   lbl: "of Americans view AI positively",              color: C.darkGray },
    { n: "~480K", lbl: "data-center workforce gap (US)",               color: C.medGray },
  ];
  const y = 2.2, w = 2.85, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  const notes = [
    { title: "NIMBY REVOLT",      body: "$18B halted, $46B delayed. 142 activist groups across 24 states — Virginia is the epicenter with 42 groups." },
    { title: "ANTI-AI SENTIMENT", body: "Mar 21, 2026 \"Stop the AI Race\" protests targeted Anthropic, OpenAI, xAI HQs. 56% of Americans are anxious about AI." },
    { title: "LABOR SHORTAGE",    body: "Core ops roles short 467K–498K workers. 400+ data centers under construction; talent, not capital, is binding." },
  ];
  notes.forEach((n, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 4.2, w: 2.95, h: 0.35,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    s.addText(n.title, {
      x: x, y: 4.2, w: 2.95, h: 0.35,
      fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addText(n.body, {
      x: x + 0.05, y: 4.6, w: 2.85, h: 1.6,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Sources: Data Center Watch ($18B halted, $46B delayed, 142 groups); Echelon Insights; Stop the AI Race; Fortune; TIME; CNN; NBC News; Data Center Frontier.");
  addFooter(s, 15);
}

// ===================================================================
// SLIDE 16 — Beyond the grid (orbital compute)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Beyond the grid.");
  addSubhead(s, "No interconnection queue. No permits. No water. 1,361 W/m² of unfiltered solar, 24/7. Orbital compute sidesteps Earth's bottlenecks.");
  addHeadlineRule(s);

  // Hero image on the right
  addImagePlaceholder(s, 5.85, 1.6, 3.65, 3.8, "Render — orbital data-center satellite (solar wings, Earth below)");

  const cards = [
    { title: "NO GRID QUEUE",   body: "Earth's interconnection backlogs, zoning battles, and cooling constraints don't exist in orbit." },
    { title: "UNLIMITED SOLAR", body: "1,361 W/m² of unfiltered sunlight, 24/7 — no intermittency, no capacity-factor limits." },
    { title: "BEYOND BORDERS",  body: "Sidesteps data-localization laws, export controls, and the jurisdictional patchwork." },
  ];
  cards.forEach((c, i) => {
    const y = 1.6 + i * 1.3;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 5.15, h: 0.35,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: 0.5, y: y, w: 5.15, h: 0.35,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "left", valign: "middle", charSpacing: 2, margin: 0.15,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y + 0.35, w: 5.15, h: 0.8,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: 0.65, y: y + 0.4, w: 4.85, h: 0.72,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.85, w: 9.0, h: 0.4,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 9.5, charSpacing: 3 } },
    { text: "Starcloud · SpaceX · Google Suncatcher · Aetherflux", options: { color: C.white, fontSize: 11, bold: true } },
  ], {
    x: 0.7, y: 5.85, w: 8.6, h: 0.4, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: FCC filings; Starcloud, Google, SpaceX announcements; CNBC.");
  addFooter(s, 16);
}

// ===================================================================
// SLIDE 17 — Physical AI
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Physical AI.");
  addSubhead(s, "Humanoids enter manufacturing, logistics, and healthcare at pilot scale. Every robot is a walking inference endpoint.");
  addHeadlineRule(s);

  addImagePlaceholder(s, 1.5, 1.6, 7.0, 2.2, "Photo — humanoid robot on a factory / warehouse floor");

  const cards = [
    { title: "PHYSICAL WORK",         body: "Manufacturing, logistics, warehousing, agriculture, healthcare — pilots are underway." },
    { title: "TIRELESS COWORKERS",    body: "Humanoids take hazardous and ergonomically punishing tasks. Humans keep judgment." },
    { title: "INFERENCE AT THE EDGE", body: "Every robot runs foundation models in real time. At scale, rivals LLM compute." },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 4.0, w: 2.95, h: 0.35,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: x, y: 4.0, w: 2.95, h: 0.35,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 4.35, w: 2.95, h: 1.3,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: x + 0.15, y: 4.45, w: 2.65, h: 1.15,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.85, w: 9.0, h: 0.4,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 9.5, charSpacing: 3 } },
    { text: "Tesla Optimus · Figure · Boston Dynamics · Unitree · Agility", options: { color: C.white, fontSize: 11, bold: true } },
  ], {
    x: 0.7, y: 5.85, w: 8.6, h: 0.4, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Goldman Sachs; Figure AI, Tesla, Hyundai, NVIDIA; company announcements.");
  addFooter(s, 17);
}

// ===================================================================
// SLIDE 18 — Autonomous mobility
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Autonomous mobility.");
  addSubhead(s, "More miles → better models → more deployments. Every vehicle is a rolling inference machine consuming frontier-scale compute.");
  addHeadlineRule(s);

  addImagePlaceholder(s, 0.5, 1.6, 2.8, 4.15, "AV sensor-visualization or fleet photo (Waymo / Tesla FSD)");

  const cards = [
    { title: "THE SAFETY CASE",  body: "Human drivers cause ~1.35M deaths a year. Autonomous systems don't tire or lose focus." },
    { title: "DATA FLYWHEEL",    body: "Every mile generates training data. Better models unlock more cities. Flywheel self-reinforces." },
    { title: "EDGE INFERENCE",   body: "Each AV runs thousands of AI ops / second across cameras, lidar, radar — frontier-scale compute." },
  ];
  cards.forEach((c, i) => {
    const y = 1.6 + i * 1.4;
    const cx = 3.5, cw = 6.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: y, w: cw, h: 0.35,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: cx, y: y, w: cw, h: 0.35,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "left", valign: "middle", charSpacing: 2, margin: 0.15,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: y + 0.35, w: cw, h: 0.9,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: cx + 0.15, y: y + 0.4, w: cw - 0.3, h: 0.8,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.9, w: 9.0, h: 0.35,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 9.5, charSpacing: 3 } },
    { text: "Waymo · Tesla FSD · Baidu Apollo · Aurora", options: { color: C.white, fontSize: 11, bold: true } },
  ], {
    x: 0.7, y: 5.9, w: 8.6, h: 0.35, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Waymo, Tesla, Baidu, Aurora; WHO Global Road Safety; NVIDIA FY2026.");
  addFooter(s, 18);
}

// ===================================================================
// SLIDE 19 — AI in biology (drug discovery — NEW)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "AI is rewriting drug discovery.");
  addSubhead(s, "AlphaFold solved protein folding. AI-designed drugs are in Phase 1/2 trials. The pharma R&D cycle is compressing from a decade to under two years.");
  addHeadlineRule(s);

  // Hero image
  addImagePlaceholder(s, 0.5, 1.6, 9.0, 1.6, "Protein structure render / AI drug-design visual (AlphaFold-style ribbon diagram)");

  // Three big-number stats
  const stats = [
    { n: "240M",  lbl: "protein structures in AlphaFold DB (nearly all known)", color: C.pink },
    { n: "$3B",   lbl: "Isomorphic Labs' combined deals with Lilly + Novartis", color: C.pink },
    { n: "60PB",  lbl: "Recursion's proprietary biological data (post-Exscientia merger)", color: C.pink },
  ];
  const y = 3.35, w = 2.85, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  // Three concept cards
  const cards = [
    { title: "PROTEIN FOLDING",     body: "A 50-year structure-prediction problem, solved. 3M+ researchers across 190 countries use the DB." },
    { title: "AI-NATIVE PHARMA",    body: "Isomorphic, Recursion + Exscientia, Insitro. AI-designed small molecules already in Phase 1/2 trials." },
    { title: "R&D COMPRESSION",     body: "Discovery → IND shrinking from ~10 years to ~18 months on the fastest platforms." },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 5.2, w: 2.95, h: 0.3,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: x, y: 5.2, w: 2.95, h: 0.3,
      fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 5.5, w: 2.95, h: 0.45,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: x + 0.1, y: 5.52, w: 2.75, h: 0.41,
      fontSize: 8.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  // Players strip
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 6.05, w: 9.0, h: 0.3,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 9, charSpacing: 3 } },
    { text: "DeepMind / Isomorphic Labs · Recursion + Exscientia · Insitro · Generate Biomedicines · Moderna", options: { color: C.white, fontSize: 10, bold: true } },
  ], {
    x: 0.7, y: 6.05, w: 8.6, h: 0.3, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: DeepMind AlphaFold DB (Feb 2026 — 240M structures, 3M researchers); Isomorphic Labs / Fierce Biotech (Jan 2024, Feb 2025 partnerships); Recursion FY25 filings (Exscientia merger Jul 2025); CNBC; Nature.");
  addFooter(s, 19);
}

// ===================================================================
// SLIDE 20 — Key takeaways
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Key takeaways.");
  addSubhead(s, "The thesis, distilled. Each with the number that makes it investable.");
  addHeadlineRule(s);

  const items = [
    { n: "01", title: "The largest capex cycle in history — and it's going on credit.",
      body: "~$750B hyperscaler capex in 2026, up ~$300B YoY. Amazon FCF turns negative; Meta FCF down ~90%. ~75% of that capex is AI-specific. The story has shifted from cash flow to balance sheet.",
      accent: C.teal },
    { n: "02", title: "The market is picking winners — the basket trade is over.",
      body: "AI stock correlation collapsed from ~80% to ~20%. Semis (SOXX) +38% YTD, software (IGV) –20% YTD — a 58-point spread. Memory oligopolies with pricing power outperform cloud providers burning cash.",
      accent: C.gold },
    { n: "03", title: "The bottleneck keeps moving — and that is the opportunity.",
      body: "CoWoS packaging (2023–24) → HBM / silicon wafer supply (now) → EUV lithography (<100 machines/yr) by 2028. Each shift reprices a different part of the stack. HBM TAM on a path from $35B (2025) to $100B (2028).",
      accent: C.red },
    { n: "04", title: "The question isn't whether you have AI exposure — it's whether you chose it.",
      body: "AI-linked stocks are ~30%+ of US large-cap benchmarks. Passive exposure to a ~$750B capex cycle is not neutral — it's a thesis. Own the layer with pricing power for today's bottleneck.",
      accent: C.pink },
  ];

  const y0 = 1.7, rowH = 1.05;
  items.forEach((it, i) => {
    const y = y0 + i * rowH;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.7, h: rowH - 0.12,
      fill: { color: it.accent }, line: { color: it.accent, width: 0 },
    });
    s.addText(it.n, {
      x: 0.5, y: y, w: 0.7, h: rowH - 0.12,
      fontSize: 20, color: C.white, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
    });
    s.addText(it.title, {
      x: 1.3, y: y, w: 8.2, h: 0.3,
      fontSize: 13, color: C.black, bold: true, fontFace: "Arial", valign: "top", margin: 0,
    });
    s.addText(it.body, {
      x: 1.3, y: y + 0.3, w: 8.2, h: rowH - 0.42,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Sources: company filings; CreditSights / MUFG hyperscaler capex 2026 (Apr 2026); Goldman Sachs correlation data; iShares SOXX / IGV YTD (Apr 17, 2026); SemiAnalysis; BofA HBM TAM; TrendForce.", 0.5, 6.15, 9.0);
  addFooter(s, 20);
}

// ---------- Write ----------
pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

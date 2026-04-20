// AI Markets deck — BII visual style
// Mirrors https://ai-markets.vercel.app/ — March 2026
// Run: node build-deck.js  →  outputs ai-markets-deck.pptx

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Strategy";
pres.title = "AI Markets — March 2026";

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

// ---------- Helpers ----------

function addFooter(slide, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.95, w: 10.0, h: 0.675,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  slide.addText(
    "FOR INFORMATIONAL PURPOSES ONLY. NOT INVESTMENT ADVICE. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.",
    { x: 1.5, y: 5.0, w: 7.2, h: 0.55, fontSize: 6.5, color: C.white, align: "center", fontFace: "Arial", valign: "middle", bold: true, margin: 0 }
  );
  if (pageNum !== "" && pageNum != null) {
    slide.addText(String(pageNum), {
      x: 9.3, y: 5.08, w: 0.5, h: 0.35, fontSize: 9, color: C.white, align: "right", fontFace: "Arial", margin: 0,
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
  const h = (opts && opts.h) || 0.7;
  const w = (opts && opts.w) || 7.2;
  slide.addText(text, {
    x: 0.5, y: 0.2, w: w, h: h,
    fontSize: 27, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
}

function addSubhead(slide, text, opts) {
  const y = (opts && opts.y) || 0.95;
  const h = (opts && opts.h) || 0.5;
  slide.addText(text, {
    x: 0.5, y: y, w: 9.0, h: h,
    fontSize: 13.5, color: C.medGray, fontFace: "Arial", valign: "top", margin: 0,
  });
}

function addChartTitle(slide, text, x) {
  slide.addText(text, {
    x: x, y: 1.55, w: 4.3, h: 0.3,
    fontSize: 14, color: C.black, bold: true, fontFace: "Arial", valign: "bottom", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: x, y: 1.85, w: 4.3, h: 0,
    line: { color: C.black, width: 1.5 },
  });
}

function addSource(slide, text, x, y, w) {
  slide.addText(text, {
    x: x != null ? x : 0.5, y: y || 4.4, w: w || 9.0, h: 0.4,
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

  s.addText("March 2026", {
    x: 7.9, y: 0.35, w: 1.7, h: 0.35,
    fontSize: 14, color: C.black, bold: false, fontFace: "Arial", align: "right", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 7.9, y: 0.75, w: 1.7, h: 0,
    line: { color: C.black, width: 1 },
  });

  s.addText("AI Markets", {
    x: 0.5, y: 1.6, w: 9.0, h: 1.2,
    fontSize: 72, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  s.addText("The largest capex cycle in history — and the market picking winners inside it.", {
    x: 0.5, y: 2.75, w: 9.0, h: 0.6,
    fontSize: 22, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  s.addText("$685B in 2026 hyperscaler capex. A 39-point YTD spread between semis and software. A market that has stopped trading AI as a basket.", {
    x: 0.5, y: 3.55, w: 8.4, h: 0.9,
    fontSize: 13, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
  });

  s.addText("Strategy Note  |  Equity Research", {
    x: 0.5, y: 4.4, w: 6, h: 0.35,
    fontSize: 11, color: C.black, bold: true, fontFace: "Arial", valign: "top", margin: 0,
  });

  addFooter(s, "");
}

// ===================================================================
// SLIDE 2 — Agenda (5 sections)
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "The argument, in five parts.");
  addSubhead(s, "Landscape, Market, Shifts, Risks, Frontier. Each answers a different question about the same $685B capex cycle.");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.05, w: 10.0, h: 2.35,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("THE DECK AT A GLANCE", {
    x: 0.5, y: 2.2, w: 9.0, h: 0.3,
    fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 3, margin: 0,
  });

  const cards = [
    { label: "LANDSCAPE", accent: C.teal,   stat: "01", sub: "What AI is, where it runs, who fabs it.",          pages: "Slides 3–7" },
    { label: "MARKET",    accent: C.gold,   stat: "02", sub: "Who buys the chips and who builds the models.",     pages: "Slides 8–11" },
    { label: "SHIFTS",    accent: C.orange, stat: "03", sub: "The agent era and the great divergence in tech.",   pages: "Slides 12–13" },
    { label: "RISKS",     accent: C.red,    stat: "04", sub: "Bubble, supply chain, policy, backlash.",           pages: "Slides 14–17" },
    { label: "FRONTIER",  accent: C.pink,   stat: "05", sub: "Orbital, physical, autonomous, biology.",           pages: "Slides 18–21" },
  ];

  const cardY = 2.65, cardW = 1.78, cardH = 1.55, gap = 0.12;
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
      x: x, y: cardY + 0.15, w: cardW, h: 0.5,
      fontSize: 24, color: c.accent, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(c.label, {
      x: x, y: cardY + 0.62, w: cardW, h: 0.3,
      fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", charSpacing: 2, margin: 0,
    });
    s.addText(c.sub, {
      x: x + 0.08, y: cardY + 0.93, w: cardW - 0.16, h: 0.5,
      fontSize: 8, color: "CCCCCC", fontFace: "Arial", align: "center", margin: 0,
    });
    s.addText(c.pages, {
      x: x, y: cardY + 1.34, w: cardW, h: 0.2,
      fontSize: 7.5, color: "AAAAAA", fontFace: "Arial", align: "center", italic: true, margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research. 22 slides, read top to bottom.", 0.5, 4.5, 9.0);
  addFooter(s, 2);
}

// ===================================================================
// SLIDE 3 — Why AI matters (LANDSCAPE hero)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "Why AI matters to markets.");
  addSubhead(s, "AI is the largest capex cycle in history, it touches every layer of the economy, and it is repricing everything — in both directions.");

  const stats = [
    { n: "$685B",  lbl: "2026 hyperscaler capex (Amazon, Alphabet, Microsoft, Meta, Oracle)", color: C.orange },
    { n: "$4T",    lbl: "cumulative AI data-center investment through 2030 (Huang; DB est.)", color: C.orange },
    { n: "+15%",   lbl: "semiconductors (SOXX) YTD",  color: C.green },
    { n: "–24%",   lbl: "software (IGV) YTD",         color: C.red },
  ];
  const y = 2.05, w = 2.1, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("A 39-point spread between semis and software. The same AI wave is creating winners and losers simultaneously.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Amazon, Alphabet, Microsoft, Meta, Oracle Q4 2025 guidance; Jensen Huang (Sept 2025); Deutsche Bank; Bloomberg YTD as of Mar 25, 2026.", 0.5, 4.45, 9.0);
  addFooter(s, 3);
}

// ===================================================================
// SLIDE 4 — What is AI (6-phase evolution)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "What is AI.");
  addSubhead(s, "Software that learns from data, reasons through problems, and — increasingly — takes action without human direction.");

  const phases = [
    { date: "1950s–80s",  title: "Symbolic AI",    desc: "Hand-coded rules and expert systems.",                          color: C.medGray },
    { date: "1990s–2000s",title: "Machine Learning", desc: "Systems learn patterns from data.",                            color: C.teal },
    { date: "2012",       title: "Deep Learning",  desc: "Neural networks go deep. AlexNet moment.",                      color: C.gold },
    { date: "2022–24",    title: "LLM chatbots",   desc: "ChatGPT hits 100M users in 2 months. Claude, Gemini, Copilot.", color: C.orange },
    { date: "2023–24",    title: "Reasoning",      desc: "Multi-step logic and chain-of-thought. o1, DeepSeek R1.",       color: C.pink },
    { date: "2025+",      title: "Agentic AI",     desc: "AI that acts autonomously with tools. Claude Code, agents.",    color: C.red },
  ];

  const lineY = 2.5;
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: lineY, w: 8.6, h: 0,
    line: { color: C.darkGray, width: 3 },
  });
  const colW = 8.6 / phases.length;
  phases.forEach((ev, i) => {
    const cx = 0.7 + colW * (i + 0.5);
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.09, y: lineY - 0.09, w: 0.18, h: 0.18,
      fill: { color: ev.color }, line: { color: ev.color, width: 0 },
    });
    const cardX = cx - colW * 0.48;
    const cardW = colW * 0.96;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: cardW, h: 1.55,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: 0.06, h: 1.55,
      fill: { color: ev.color }, line: { color: ev.color, width: 0 },
    });
    s.addText(ev.date, {
      x: cardX + 0.14, y: lineY + 0.3, w: cardW - 0.2, h: 0.25,
      fontSize: 8.5, color: C.medGray, fontFace: "Arial", margin: 0,
    });
    s.addText(ev.title, {
      x: cardX + 0.14, y: lineY + 0.55, w: cardW - 0.2, h: 0.32,
      fontSize: 11.5, color: C.black, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(ev.desc, {
      x: cardX + 0.14, y: lineY + 0.9, w: cardW - 0.2, h: 0.9,
      fontSize: 8.5, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research.", 0.5, 4.4, 9.0);
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

  const layers = [
    { name: "Agents",        desc: "Autonomous AI that acts on your behalf",           tag: "FASTEST-GROWING", color: C.pink },
    { name: "Apps",          desc: "Products built on foundation models",              tag: "",                color: C.orange },
    { name: "Models",        desc: "The intelligence layer",                           tag: "",                color: C.orange },
    { name: "Data centers",  desc: "Warehouses of compute",                            tag: "",                color: C.gold },
    { name: "Power",         desc: "The hidden constraint",                            tag: "",                color: C.gold },
    { name: "Networking",    desc: "Moving data at terabit speed",                     tag: "",                color: C.teal },
    { name: "Packaging",     desc: "Stacking chiplets (CoWoS, HBM)",                   tag: "DEEPEST BOTTLENECK", color: C.red },
    { name: "Chip design",   desc: "GPUs, TPUs, ASICs",                                tag: "",                color: C.teal },
    { name: "Foundry",       desc: "Fabricating at nanometer scale",                   tag: "",                color: C.teal },
    { name: "Equipment",     desc: "Machines that make machines",                      tag: "",                color: C.medGray },
    { name: "Raw materials", desc: "Silicon, neon, rare earths",                       tag: "",                color: C.medGray },
  ];
  const startY = 1.55, rowH = 0.27;
  layers.forEach((l, i) => {
    const y = startY + i * rowH;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.15, h: rowH - 0.04,
      fill: { color: l.color }, line: { color: l.color, width: 0 },
    });
    s.addText(l.name, {
      x: 0.75, y: y, w: 2.2, h: rowH - 0.04,
      fontSize: 11, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    });
    s.addText(l.desc, {
      x: 2.95, y: y, w: 4.2, h: rowH - 0.04,
      fontSize: 9.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
    if (l.tag) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x: 7.2, y: y + 0.02, w: 2.25, h: rowH - 0.08,
        fill: { color: l.color }, line: { color: l.color, width: 0 }, rectRadius: 0.03,
      });
      s.addText(l.tag, {
        x: 7.2, y: y + 0.02, w: 2.25, h: rowH - 0.08,
        fontSize: 8, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
      });
    }
  });

  addSource(s, "Source: Strategy Research. Layers ordered top (closest to user) to bottom (closest to atoms).", 0.5, 4.55, 9.0);
  addFooter(s, 5);
}

// ===================================================================
// SLIDE 6 — Global supply chain
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "No single country makes an advanced chip.");
  addSubhead(s, "A single leading-edge chip crosses 70+ borders and six countries before it reaches a data center. There is no domestic alternative.");

  const nodes = [
    { flag: "USA",         role: "Design & software",        names: "NVDA, AMD, AVGO",      color: C.teal },
    { flag: "Taiwan",      role: "Leading-edge fabs",        names: "TSMC (~90% advanced)", color: C.red },
    { flag: "S. Korea",    role: "DRAM & HBM",               names: "SK Hynix, Samsung",    color: C.gold },
    { flag: "Netherlands", role: "EUV lithography",          names: "ASML (<100/yr)",       color: C.pink },
    { flag: "Japan",       role: "Materials & equipment",    names: "Tokyo Electron, Shin-Etsu", color: C.orange },
    { flag: "China",       role: "Mature-node fabs, rare earths", names: "SMIC, Huawei",    color: C.darkGray },
  ];
  const y0 = 1.85, cardW = 2.85, cardH = 1.05, gapX = 0.1, gapY = 0.15;
  nodes.forEach((n, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.5 + col * (cardW + gapX);
    const y = y0 + row * (cardH + gapY);
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: 0.06,
      fill: { color: n.color }, line: { color: n.color, width: 0 },
    });
    s.addText(n.flag, {
      x: x + 0.15, y: y + 0.12, w: cardW - 0.3, h: 0.32,
      fontSize: 14, color: C.black, bold: true, fontFace: "Arial Black", margin: 0,
    });
    s.addText(n.role, {
      x: x + 0.15, y: y + 0.45, w: cardW - 0.3, h: 0.3,
      fontSize: 10, color: n.color, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(n.names, {
      x: x + 0.15, y: y + 0.72, w: cardW - 0.3, h: 0.3,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Source: TSMC, ASML, SK Hynix, Samsung, Tokyo Electron filings; SIA.", 0.5, 4.4, 9.0);
  addFooter(s, 6);
}

// ===================================================================
// SLIDE 7 — Power
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "Power is part of the stack now.");
  addSubhead(s, "Global data-center electricity demand is on track to more than double by 2030 (IEA). Where the electrons come from is now a market call.");

  const cols = [
    { x: 0.5, title: "NATURAL GAS", tag: "Fast & firm",    desc: "Turbines can power a data center in under a year — the near-term backbone of the buildout.", accent: C.red },
    { x: 3.6, title: "SOLAR & PPAs", tag: "Scalable",      desc: "Hyperscalers are the largest corporate buyers of renewable energy. Long-term PPAs lock in clean power.", accent: C.gold },
    { x: 6.7, title: "GRID & INTERCONNECT", tag: "Bottleneck", desc: "Interconnection queues take years. Grid build is the binding constraint on deployment speed.", accent: C.darkGray },
  ];
  cols.forEach((col) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.85, w: 2.8, h: 0.4,
      fill: { color: col.accent }, line: { color: col.accent, width: 0 },
    });
    s.addText(col.title, {
      x: col.x, y: 1.85, w: 2.8, h: 0.4,
      fontSize: 12, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 2.25, w: 2.8, h: 1.35,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.tag, {
      x: col.x + 0.15, y: 2.32, w: 2.55, h: 0.25,
      fontSize: 9, color: col.accent, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
    });
    s.addText(col.desc, {
      x: col.x + 0.15, y: 2.58, w: 2.55, h: 0.95,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.75, w: 9.0, h: 0.55,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("EMERGING: Small modular reactors (SMR pipeline) and geothermal sit behind gas and solar — but they are the only sources that credibly scale past 2030 without constraining grid reliability.", {
    x: 0.7, y: 3.75, w: 8.6, h: 0.55,
    fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: IEA World Energy Outlook 2025; EIA; utility interconnection-queue data.", 0.5, 4.4, 9.0);
  addFooter(s, 7);
}

// ===================================================================
// SLIDE 8 — Who is buying (MARKET opener)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "The buyer base is broadening.");
  addSubhead(s, "The Big 5 hyperscalers drive $685B. But neoclouds, sovereigns, labs, and enterprises are now material — not just the original four.");

  const groups = [
    { title: "HYPERSCALERS",  stat: "$685B",   sub: "2026E combined capex", names: "AMZN $200B · GOOGL $175–185B · MSFT $120–145B · META $115–135B · ORCL ~$50B", color: C.orange },
    { title: "AI LABS",       stat: "4 names", sub: "driving demand",       names: "OpenAI · Anthropic · xAI · Mistral",                                            color: C.pink },
    { title: "NEOCLOUDS",     stat: "~4×",     sub: "cheaper than hypers",  names: "CoreWeave · Lambda · Crusoe · Vultr",                                           color: C.teal },
    { title: "SOVEREIGNS",    stat: "$100B+",  sub: "announced sovereign AI",names: "Saudi Arabia · UAE · France · Japan",                                           color: C.gold },
    { title: "ENTERPRISES",   stat: "Big 4",   sub: "with in-house fleets", names: "JPMorgan · Tesla · Apple · ByteDance",                                           color: C.green },
  ];
  const y = 1.85, cardW = 1.78, cardH = 1.95, gap = 0.12;
  const totalW = groups.length * cardW + (groups.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  groups.forEach((g, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: 0.06,
      fill: { color: g.color }, line: { color: g.color, width: 0 },
    });
    s.addText(g.title, {
      x: x + 0.08, y: y + 0.12, w: cardW - 0.16, h: 0.28,
      fontSize: 10, color: g.color, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
    });
    s.addText(g.stat, {
      x: x + 0.08, y: y + 0.42, w: cardW - 0.16, h: 0.55,
      fontSize: 22, color: C.black, bold: true, fontFace: "Arial Black", margin: 0,
    });
    s.addText(g.sub, {
      x: x + 0.08, y: y + 0.98, w: cardW - 0.16, h: 0.3,
      fontSize: 8.5, color: C.medGray, fontFace: "Arial", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.08, y: y + 1.27, w: cardW - 0.16, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(g.names, {
      x: x + 0.08, y: y + 1.32, w: cardW - 0.16, h: 0.55,
      fontSize: 8, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Source: Q4 2025 company earnings calls; sovereign AI announcements; CoreWeave, Lambda, Crusoe, Vultr filings.", 0.5, 4.45, 9.0);
  addFooter(s, 8);
}

// ===================================================================
// SLIDE 9 — The semiconductor market
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Anatomy of a $975B market.");
  addSubhead(s, "AI has flipped the engine. Logic and memory — 70% of the industry — now drive the whole thing. Analog and micros are along for the ride.");

  addChartTitle(s, "Semiconductor revenue by segment, 2026E ($B)", 0.5);
  s.addChart(pres.charts.BAR,
    [{
      name: "2026E $B",
      labels: ["Logic / AI accel.", "Memory", "Analog", "Micro / MCU", "Discrete & Power"],
      values: [390, 295, 95, 85, 45],
    }],
    barOpts({ x: 0.5, y: 1.95, w: 4.3, h: 2.3, chartColors: [C.orange] })
  );

  addChartTitle(s, "Value captured by node", 5.2);
  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 9.5, fontFace: "Arial", valign: "middle", color: C.darkGray, margin: 0.03 }, opts || {}) });
  const rows = [
    ["NVIDIA",    "$216B",   "FY26 rev, +65% YoY"],
    ["TSMC",      "~$122B",  "~90% of advanced-node supply"],
    ["SK Hynix",  "58%",     "Q4'25 op margin; HBM leader"],
    ["ASML",      "<100/yr", "EUV machines built per year"],
    ["Broadcom",  "Leader",  "Custom ASIC for hyperscalers"],
  ];
  const tableData = [
    [hdr("Name"), hdr("Datapoint"), hdr("Context")],
    ...rows.map((r, i) => {
      const fill = i % 2 === 1 ? { fill: { color: C.offWhite } } : { fill: { color: C.white } };
      return [
        cell(r[0], Object.assign({ bold: true, color: C.black, align: "left" }, fill)),
        cell(r[1], Object.assign({ bold: true, color: C.orange, align: "center" }, fill)),
        cell(r[2], Object.assign({ align: "left" }, fill)),
      ];
    }),
  ];
  s.addTable(tableData, {
    x: 5.2, y: 1.95, w: 4.3,
    colW: [1.2, 1.1, 2.0],
    rowH: 0.36,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("$975B total revenue, +25% YoY. Logic + memory = $685B — the same number as hyperscaler capex. Not a coincidence.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: NVIDIA FY2026 10-K; TSMC, SK Hynix filings; TrendForce; ASML annual capacity guidance.", 0.5, 4.45, 9.0);
  addFooter(s, 9);
}

// ===================================================================
// SLIDE 10 — Memory & HBM
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Memory is the bottleneck.");
  addSubhead(s, "GPUs wait on memory. Context windows are exploding. HBM is a three-supplier oligopoly on its way to a $100B TAM.");

  addChartTitle(s, "HBM TAM ($B) — 25× growth, 2023 → 2028E", 0.5);
  s.addChart(pres.charts.BAR,
    [{
      name: "HBM TAM $B",
      labels: ["2023", "2024", "2025", "2026E", "2027E", "2028E"],
      values: [4, 16, 38, 60, 82, 100],
    }],
    barOpts({ x: 0.5, y: 1.95, w: 4.3, h: 2.3, chartColors: [C.orange] })
  );

  addChartTitle(s, "HBM supplier share, 2025", 5.2);
  s.addChart(pres.charts.BAR,
    [{
      name: "Share %",
      labels: ["SK Hynix", "Micron", "Samsung"],
      values: [62, 21, 17],
    }],
    barOpts({ x: 5.2, y: 1.95, w: 4.3, h: 2.3, chartColors: [C.gold] })
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("HBM4 = 56× the bandwidth of DDR5 (2.8 TB/s vs 50 GB/s). HBM demand sold out through 2026. SK Hynix targets 70% HBM4 share for NVIDIA Rubin.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 11, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: TrendForce, Counterpoint Research Q1 2026; SK Hynix, Micron, Samsung Q4 2025 filings.", 0.5, 4.45, 9.0);
  addFooter(s, 10);
}

// ===================================================================
// SLIDE 11 — The labs (private valuations)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "The labs are a market.");
  addSubhead(s, "Four frontier labs. $1.48T in aggregate private value. Feb 2026 was the largest VC month in history — $189B deployed.");

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 10, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 10.5, fontFace: "Arial", valign: "middle", align: "center", color: C.darkGray }, opts || {}) });
  const rows = [
    { name: "OpenAI",    val: "$840B", mult: "~34× ARR", event: "$110B raise, for-profit conversion · Feb 2026" },
    { name: "Anthropic", val: "$380B", mult: "~20× ARR", event: "$30B Series G · Feb 2026 · projects $70B rev by 2028" },
    { name: "xAI",       val: "$250B", mult: "~83× ARR*",event: "Merged with SpaceX · Feb 2026" },
    { name: "Mistral",   val: "$14B",  mult: "~14× ARR", event: "€1.7B Series C · Jun 2024" },
  ];
  const tableData = [
    [hdr("Lab"), hdr("Valuation"), hdr("Multiple"), hdr("Latest event")],
    ...rows.map((r, i) => {
      const fill = i % 2 === 1 ? { fill: { color: C.offWhite } } : { fill: { color: C.white } };
      return [
        cell(r.name, Object.assign({ bold: true, color: C.black, align: "left" }, fill)),
        cell(r.val,  Object.assign({ bold: true, color: C.orange }, fill)),
        cell(r.mult, fill),
        cell(r.event, Object.assign({ align: "left", fontSize: 9.5 }, fill)),
      ];
    }),
  ];
  s.addTable(tableData, {
    x: 0.5, y: 1.9, w: 9.0,
    colW: [1.5, 1.6, 1.7, 4.2],
    rowH: 0.4,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("$189B raised in a single month (OpenAI $110B · Anthropic $30B · Waymo $16B). The labs consume compute at a rate that reprices every cloud P&L.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 11.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: The Information, Sacra (Feb 2026 run-rate), Bloomberg, Morgan Stanley TMT conf. *xAI ARR estimated.", 0.5, 4.45, 9.0);
  addFooter(s, 11);
}

// ===================================================================
// SLIDE 12 — What is agentic AI
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "From chatbots to coworkers.");
  addSubhead(s, "Agents set goals, use tools, and complete tasks end-to-end. Each session uses 10–100× the compute of a chatbot query.");

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 10, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 11, fontFace: "Arial", valign: "middle", color: C.darkGray, margin: 0.05 }, opts || {}) });
  const tableData = [
    [hdr("Dimension"), hdr("Chatbot (2023–24)"), hdr("Agent (2025+)")],
    [cell("Interaction",      { bold: true, color: C.black, align: "left", fill: { color: C.offWhite } }),
     cell("You ask, it answers",            { fill: { color: C.offWhite }, align: "left" }),
     cell("Sets goals, executes autonomously", { fill: { color: C.offWhite }, align: "left", bold: true, color: C.orange })],
    [cell("Tokens per session", { bold: true, color: C.black, align: "left" }),
     cell("1K – 5K",            { align: "left" }),
     cell("50K – 500K+",        { align: "left", bold: true, color: C.orange })],
    [cell("Compute per user",   { bold: true, color: C.black, align: "left", fill: { color: C.offWhite } }),
     cell("1×",                  { fill: { color: C.offWhite }, align: "left" }),
     cell("10 – 100×",          { fill: { color: C.offWhite }, align: "left", bold: true, color: C.orange })],
    [cell("Tools",              { bold: true, color: C.black, align: "left" }),
     cell("None",                { align: "left" }),
     cell("Code, APIs, browsers, databases", { align: "left", bold: true, color: C.orange })],
  ];
  s.addTable(tableData, {
    x: 0.5, y: 1.85, w: 9.0,
    colW: [2.5, 3.2, 3.3],
    rowH: 0.42,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.0, w: 9.0, h: 0.45,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("The agent era turns every user into an infrastructure customer. Labs are buying developer-tool companies (Anthropic → Bun, OpenAI → Astral) to lock in the coding stack.", {
    x: 0.7, y: 4.0, w: 8.6, h: 0.45,
    fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Anthropic, OpenAI, GitHub Trending; company announcements.", 0.5, 4.5, 9.0);
  addFooter(s, 12);
}

// ===================================================================
// SLIDE 13 — The Great Divergence (SOXX vs IGV, DiSAASter)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "The basket trade is over.");
  addSubhead(s, "AI stock correlation collapsed from ~80% to ~20%. Semis are up, software is down — a 39-point YTD spread inside one theme.");

  addChartTitle(s, "YTD price return, rebased to 100", 0.5);
  s.addChart(pres.charts.LINE,
    [
      { name: "Semis (SOXX)",   labels: ["Jan 1", "Jan 17", "Jan 31", "Feb 14", "Feb 28", "Mar 14"], values: [100, 106, 110, 112, 114, 115] },
      { name: "Nasdaq",         labels: ["Jan 1", "Jan 17", "Jan 31", "Feb 14", "Feb 28", "Mar 14"], values: [100,  99,  97,  96,  95,  95] },
      { name: "Software (IGV)", labels: ["Jan 1", "Jan 17", "Jan 31", "Feb 14", "Feb 28", "Mar 14"], values: [100,  93,  86,  80,  78,  76] },
    ],
    lineOpts({ x: 0.5, y: 1.95, w: 4.3, h: 2.3 })
  );

  // Memory supercycle + diSAASter
  const panel = (x, title, color, rows) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.95, w: 4.3, h: 0.3,
      fill: { color: color }, line: { color: color, width: 0 },
    });
    s.addText(title, {
      x: x, y: 1.95, w: 4.3, h: 0.3,
      fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    rows.forEach((r, i) => {
      const y = 2.3 + i * 0.33;
      s.addText(r.ticker, {
        x: x, y: y, w: 1.1, h: 0.3,
        fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0.05,
      });
      s.addText(r.pct, {
        x: x + 1.1, y: y, w: 0.9, h: 0.3,
        fontSize: 12, color: r.pos ? C.green : C.red, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
      });
      s.addText(r.note, {
        x: x + 2.0, y: y, w: 2.3, h: 0.3,
        fontSize: 8.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
      });
    });
  };
  panel(5.2, "MEMORY SUPERCYCLE — DRAM +40% Q2", C.green, [
    { ticker: "Samsung",   pct: "+57%", pos: true,  note: "HBM production doubling" },
    { ticker: "Micron",    pct: "+54%", pos: true,  note: "HBM3E ramp, NY megafab" },
    { ticker: "SK Hynix",  pct: "+49%", pos: true,  note: "62% HBM share; HBM4 Q4" },
  ]);
  // diSAASter panel below
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 3.35, w: 4.3, h: 0.3,
    fill: { color: C.red }, line: { color: C.red, width: 0 },
  });
  s.addText("THE diSAASter — $1T WIPED IN A MONTH", {
    x: 5.2, y: 3.35, w: 4.3, h: 0.3,
    fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
  });
  const saas = [
    { ticker: "Salesforce",  pct: "–26%", note: "Seat model under agent threat" },
    { ticker: "Adobe",       pct: "–28%", note: "Gen-AI content erodes moat" },
    { ticker: "ServiceNow",  pct: "–23%", note: "Workflows disrupted by agents" },
  ];
  saas.forEach((r, i) => {
    const y = 3.7 + i * 0.25;
    s.addText(r.ticker, {
      x: 5.2, y: y, w: 1.2, h: 0.22,
      fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0.05,
    });
    s.addText(r.pct, {
      x: 6.4, y: y, w: 0.9, h: 0.22,
      fontSize: 11, color: C.red, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
    });
    s.addText(r.note, {
      x: 7.3, y: y, w: 2.2, h: 0.22,
      fontSize: 8.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  addSource(s, "Source: Bloomberg YTD through Mar 25, 2026; Yahoo Finance; Counterpoint Research; Morgan Stanley CIO Survey.", 0.5, 4.45, 9.0);
  addFooter(s, 13);
}

// ===================================================================
// SLIDE 14 — The Bubble Question (vs. 2000)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "This is not 2000.");
  addSubhead(s, "Four tests. Same questions investors asked about Cisco and the dotcoms. Different answers today.");

  const tests = [
    { test: "PRICE PER DOLLAR OF EARNINGS",  y2000: "131×", y2000sub: "Cisco fwd P/E, Mar 2000",      y2026: "~21×",   y2026sub: "NVIDIA fwd P/E, Mar 2026" },
    { test: "LEADER PROFITABILITY",          y2000: "14%",  y2000sub: "of tech IPOs were profitable", y2026: "26%",    y2026sub: "Mag 7 avg net margin (2× S&P)" },
    { test: "SUPPLY VS. DEMAND",             y2000: "Oversupply", y2000sub: "$500B dark fiber unused",  y2026: "Sold out", y2026sub: "GPU 2nd market 90–95% of list" },
    { test: "BUYER BALANCE SHEETS",          y2000: "20+",  y2000sub: "major telcos went bankrupt",    y2026: "~48%",   y2026sub: "hyperscaler net debt/EBITDA (vs ~80% S&P)" },
  ];

  // Header row
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.85, w: 3.4, h: 0.3, fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 } });
  s.addText("TEST", { x: 0.5, y: 1.85, w: 3.4, h: 0.3, fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.95, y: 1.85, w: 2.7, h: 0.3, fill: { color: C.red }, line: { color: C.red, width: 0 } });
  s.addText("DOTCOM 2000", { x: 3.95, y: 1.85, w: 2.7, h: 0.3, fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.7, y: 1.85, w: 2.8, h: 0.3, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addText("AI 2026", { x: 6.7, y: 1.85, w: 2.8, h: 0.3, fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });

  tests.forEach((t, i) => {
    const y = 2.2 + i * 0.48;
    s.addText(t.test, {
      x: 0.5, y: y, w: 3.4, h: 0.44,
      fontSize: 9.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0.05,
    });
    s.addText([{ text: t.y2000 + "  ", options: { bold: true, color: C.red, fontSize: 14 } }, { text: t.y2000sub, options: { color: C.medGray, fontSize: 8.5 } }], {
      x: 3.95, y: y, w: 2.7, h: 0.44, fontFace: "Arial", valign: "middle", margin: 0.05,
    });
    s.addText([{ text: t.y2026 + "  ", options: { bold: true, color: C.green, fontSize: 14 } }, { text: t.y2026sub, options: { color: C.medGray, fontSize: 8.5 } }], {
      x: 6.7, y: y, w: 2.8, h: 0.44, fontFace: "Arial", valign: "middle", margin: 0.05,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.15, w: 9.0, h: 0.3,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Corrections happen. Bubbles require valuations detached from fundamentals AND supply exceeding demand. Neither condition holds today.", {
    x: 0.7, y: 4.15, w: 8.6, h: 0.3,
    fontSize: 11, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Harding Loevner (Cisco); GuruFocus (NVDA); Jay Ritter / UF; Bloomberg; CoreWeave 2nd market; FCC dark fiber data.", 0.5, 4.5, 9.0);
  addFooter(s, 14);
}

// ===================================================================
// SLIDE 15 — Supply chain fragility
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Concentrated supply chain, systemic risk.");
  addSubhead(s, "Four countries control the advanced semiconductor stack. US reshoring is real but slow — most fabs come online after 2028.");

  const stats = [
    { n: "~90%", lbl: "TSMC share of advanced-node chips",     color: C.red },
    { n: "76%",  lbl: "SK Hynix + Samsung combined DRAM share", color: C.red },
    { n: "<100", lbl: "EUV machines ASML builds per year",      color: C.gold },
    { n: "$52.7B", lbl: "CHIPS Act authorized; ~$33.7B committed", color: C.gold },
  ];
  const y = 1.95, w = 2.1, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  // US fab status row
  const fabs = [
    { name: "TSMC Arizona",    status: "Fab 1 producing; Fab 2 under construction" },
    { name: "Samsung Taylor",  status: "$17B Texas fab, delayed to 2026" },
    { name: "Micron Clay NY",  status: "Broke ground; online ~2028–2030" },
    { name: "Intel Ohio",      status: "Two fabs under construction" },
  ];
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.35, w: 9.0, h: 0.3,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("US RESHORING — ACTUAL STATUS", {
    x: 0.5, y: 3.35, w: 9.0, h: 0.3,
    fontSize: 9.5, color: C.gold, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });
  fabs.forEach((f, i) => {
    const x = 0.5 + (i % 4) * 2.225;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.05, y: 3.7, w: 2.125, h: 0.55,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(f.name, {
      x: x + 0.1, y: 3.72, w: 2.0, h: 0.22,
      fontSize: 10, color: C.black, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(f.status, {
      x: x + 0.1, y: 3.95, w: 2.0, h: 0.3,
      fontSize: 8, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Source: TSMC, Samsung, Micron, Intel filings; US Commerce Dept CHIPS Program Office; SIA.", 0.5, 4.4, 9.0);
  addFooter(s, 15);
}

// ===================================================================
// SLIDE 16 — Policy & regulation
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Policy has cleaved the stack.");
  addSubhead(s, "Export controls, EU compliance, and reshoring subsidies now decide who can sell what, to whom, from where.");

  const cols = [
    {
      x: 0.5, accent: C.red, title: "EXPORT CONTROLS", stat: "$5.5B",
      statLbl: "NVIDIA H20 writedown",
      items: [
        "H100/H200/Blackwell banned from China.",
        "H20 reinstated with a 15% Treasury fee.",
        "ASML advanced DUV banned Sept 2024; China fell from 49% → ~20% of ASML sales.",
      ],
    },
    {
      x: 3.6, accent: C.orange, title: "AI REGULATION", stat: "Aug 2026",
      statLbl: "EU AI Act high-risk enforcement",
      items: [
        "EU fines up to €35M or 7% of global revenue.",
        "Initial compliance: $8–15M per system.",
        "Only 36% of enterprises feel prepared. No US federal AI law.",
      ],
    },
    {
      x: 6.7, accent: C.gold, title: "TRADE & RESHORING", stat: "~20%",
      statLbl: "SMIC 5nm yield vs >70% threshold",
      items: [
        "China controls ~90% of rare earth processing.",
        "Gallium/germanium controls since July 2023.",
        "CHIPS Act: $52.7B authorized, ~$33.7B committed.",
      ],
    },
  ];

  cols.forEach((col) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.85, w: 2.8, h: 0.4,
      fill: { color: col.accent }, line: { color: col.accent, width: 0 },
    });
    s.addText(col.title, {
      x: col.x, y: 1.85, w: 2.8, h: 0.4,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 2.25, w: 2.8, h: 2.05,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.stat, {
      x: col.x, y: 2.32, w: 2.8, h: 0.45,
      fontSize: 22, color: col.accent, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(col.statLbl, {
      x: col.x + 0.1, y: 2.78, w: 2.6, h: 0.3,
      fontSize: 9, color: C.medGray, fontFace: "Arial", align: "center", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: col.x + 0.2, y: 3.12, w: 2.4, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.items.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < col.items.length - 1 },
    })), {
      x: col.x + 0.15, y: 3.18, w: 2.55, h: 1.05,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 3,
    });
  });

  addSource(s, "Source: NVIDIA 10-Q; ASML filings; EU AI Act text; US Bureau of Industry and Security; Commerce Dept.", 0.5, 4.4, 9.0);
  addFooter(s, 16);
}

// ===================================================================
// SLIDE 17 — The Backlash
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "The public is turning.");
  addSubhead(s, "NIMBY revolt, anti-AI sentiment, and a labor shortage are each capable of pricing the infrastructure bet lower.");

  const stats = [
    { n: "$98B",      lbl: "in data-center projects stalled",     color: C.red },
    { n: "26%",       lbl: "of Americans view AI positively",      color: C.red },
    { n: "439,000",   lbl: "electrician shortage (US)",            color: C.red },
  ];
  const y = 1.95, w = 2.85, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  const notes = [
    { title: "NIMBY REVOLT",      body: "142 activist groups across 24 states are blocking data-center builds. Data-center delays are \"the defining theme of 2026.\"" },
    { title: "ANTI-AI SENTIMENT", body: "March 21, 2026: \"Stop the AI Race\" protests target Anthropic, OpenAI, and xAI HQs. Anthropic dropped its safety-pause commitment in Feb. 56% of Americans are anxious about AI." },
    { title: "LABOR SHORTAGE",    body: "Electricians are 45–70% of data-center build cost — and critically scarce. 400+ data centers under construction; talent, not capital, is the binding constraint." },
  ];
  notes.forEach((n, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 3.4, w: 2.95, h: 0.25,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    s.addText(n.title, {
      x: x, y: 3.4, w: 2.95, h: 0.25,
      fontSize: 9, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addText(n.body, {
      x: x + 0.05, y: 3.7, w: 2.85, h: 0.7,
      fontSize: 8.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Source: The Information, TIME, CNN, NBC News, Echelon Insights, Stop The AI Race, Fortune, Data Center Watch.", 0.5, 4.45, 9.0);
  addFooter(s, 17);
}

// ===================================================================
// SLIDE 18 — Orbital compute (FRONTIER opener)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Computing beyond Earth.");
  addSubhead(s, "No grid queue. No permits. No water. 1,361 W/m² of unfiltered solar, 24/7. Orbital compute sidesteps Earth's bottlenecks.");

  const cards = [
    { title: "NO GRID QUEUE",    body: "Earth's interconnection backlogs, zoning battles, and cooling constraints don't exist in orbit." },
    { title: "UNLIMITED SOLAR",  body: "1,361 W/m² of unfiltered sunlight, 24/7, with no intermittency and no capacity-factor limits." },
    { title: "BEYOND BORDERS",   body: "Sidesteps data-localization laws, export controls, and the jurisdictional patchwork that slows terrestrial deployment." },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.85, w: 2.95, h: 0.4,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: x, y: 1.85, w: 2.95, h: 0.4,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.25, w: 2.95, h: 1.3,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: x + 0.15, y: 2.35, w: 2.65, h: 1.1,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  // Players
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.75, w: 9.0, h: 0.55,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 10, charSpacing: 3 } },
    { text: "Starcloud · SpaceX · Google Suncatcher · Aetherflux", options: { color: C.white, fontSize: 12, bold: true } },
  ], {
    x: 0.7, y: 3.75, w: 8.6, h: 0.55, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: FCC filings; Starcloud, Google, SpaceX announcements; CNBC.", 0.5, 4.4, 9.0);
  addFooter(s, 18);
}

// ===================================================================
// SLIDE 19 — Physical AI
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "AI gets a body.");
  addSubhead(s, "Humanoids enter manufacturing, logistics, and healthcare at pilot scale. Every robot is a walking inference endpoint.");

  const cards = [
    { title: "PHYSICAL WORK",   body: "Manufacturing, logistics, warehousing, agriculture, healthcare — anywhere repetitive or dangerous labor exists, pilots are underway." },
    { title: "TIRELESS COWORKERS", body: "Humanoids handle hazardous and ergonomically punishing tasks. Humans keep judgment, creativity, and coordination." },
    { title: "INFERENCE AT THE EDGE", body: "Every humanoid runs foundation models for perception, planning, and manipulation in real time. At scale, rivals LLM compute." },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.85, w: 2.95, h: 0.4,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: x, y: 1.85, w: 2.95, h: 0.4,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.25, w: 2.95, h: 1.3,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: x + 0.15, y: 2.35, w: 2.65, h: 1.1,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.75, w: 9.0, h: 0.55,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 10, charSpacing: 3 } },
    { text: "Tesla Optimus · Figure · Boston Dynamics · Unitree · Agility", options: { color: C.white, fontSize: 12, bold: true } },
  ], {
    x: 0.7, y: 3.75, w: 8.6, h: 0.55, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Goldman Sachs; Figure AI, Tesla, Hyundai, NVIDIA; company announcements.", 0.5, 4.4, 9.0);
  addFooter(s, 19);
}

// ===================================================================
// SLIDE 20 — Autonomous vehicles
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Autonomy is a flywheel.");
  addSubhead(s, "More miles → better models → more deployments. Every vehicle is a rolling inference machine consuming frontier-scale compute.");

  const cards = [
    { title: "THE SAFETY CASE",    body: "Human drivers cause ~1.35M deaths per year globally. Autonomous systems don't tire or lose focus — and regulators are beginning to recognize the math." },
    { title: "DATA FLYWHEEL",      body: "Every mile generates training data. Better models unlock more cities. More cities generate more miles. The flywheel self-reinforces." },
    { title: "EDGE INFERENCE",     body: "Each AV runs thousands of AI ops per second across cameras, lidar, and radar — 24/7, at the edge, consuming frontier-scale compute." },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 1.85, w: 2.95, h: 0.4,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: x, y: 1.85, w: 2.95, h: 0.4,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 2.25, w: 2.95, h: 1.3,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: x + 0.15, y: 2.35, w: 2.65, h: 1.1,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.75, w: 9.0, h: 0.55,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 10, charSpacing: 3 } },
    { text: "Waymo · Tesla FSD · Baidu Apollo · Aurora", options: { color: C.white, fontSize: 12, bold: true } },
  ], {
    x: 0.7, y: 3.75, w: 8.6, h: 0.55, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Waymo, Tesla, Baidu, Aurora; WHO Global Road Safety; NVIDIA FY2026.", 0.5, 4.4, 9.0);
  addFooter(s, 20);
}

// ===================================================================
// SLIDE 21 — Takeaways
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Four takeaways.");
  addSubhead(s, "The thesis, distilled. Each with the number that makes it investable.");

  const items = [
    { n: "01", title: "The largest capex cycle in history — financed differently than you think.",
      body: "$685B hyperscaler capex in 2026. Morgan Stanley projects $400B+ in borrowing — 2× 2025. Companies spending ~90% of operating cash flow on capex, up from ~65%. This is no longer a cash-flow story — it's a credit story.",
      accent: C.teal },
    { n: "02", title: "The market is picking winners — the basket trade is over.",
      body: "AI stock correlation collapsed from ~80% to ~20%. Semis (SOXX) +15% YTD, software (IGV) –24% YTD. Memory oligopolies with pricing power outperform cloud providers burning cash.",
      accent: C.gold },
    { n: "03", title: "The bottleneck keeps moving — and that is the opportunity.",
      body: "CoWoS packaging (2023–24) → silicon wafer supply (now) → EUV lithography (<100 machines/yr) by 2028. Each shift reprices a different part of the stack. DRAM prices +30–50% QoQ.",
      accent: C.red },
    { n: "04", title: "The question isn't whether you have AI exposure — it's whether you chose it.",
      body: "AI-linked stocks are now 30%+ of US large-cap benchmarks. Passive exposure to a $685B capex cycle is not neutral — it's a thesis. Own the layer with pricing power for today's bottleneck.",
      accent: C.pink },
  ];

  const y0 = 1.75, rowH = 0.62;
  items.forEach((it, i) => {
    const y = y0 + i * rowH;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.6, h: rowH - 0.08,
      fill: { color: it.accent }, line: { color: it.accent, width: 0 },
    });
    s.addText(it.n, {
      x: 0.5, y: y, w: 0.6, h: rowH - 0.08,
      fontSize: 18, color: C.white, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
    });
    s.addText(it.title, {
      x: 1.2, y: y, w: 8.3, h: 0.24,
      fontSize: 12, color: C.black, bold: true, fontFace: "Arial", valign: "top", margin: 0,
    });
    s.addText(it.body, {
      x: 1.2, y: y + 0.24, w: 8.3, h: rowH - 0.32,
      fontSize: 9.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Sources: company filings; Morgan Stanley (Feb 2026); Goldman Sachs correlation data (Jan 2026); Bloomberg YTD; SemiAnalysis; Morningstar / S&P Dow Jones; TrendForce.", 0.5, 4.45, 9.0);
  addFooter(s, 21);
}

// ===================================================================
// SLIDE 22 — Disclaimer
// ===================================================================
{
  const s = pres.addSlide();
  s.addText("Important information", {
    x: 0.5, y: 0.4, w: 9.0, h: 0.55,
    fontSize: 28, color: C.black, bold: true, fontFace: "Arial Black", margin: 0,
  });

  s.addText([
    { text: "This presentation is for informational and illustrative purposes only. It does not constitute investment advice, a recommendation, an offer, or a solicitation to buy or sell any security or financial instrument in any jurisdiction.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "Figures in this deck are drawn from publicly disclosed sources including company filings, sell-side research, Bloomberg, and the sources cited on each slide. They are provided for narrative purposes; verify against primary sources before acting on them.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "Forward-looking statements involve inherent uncertainty and actual results may differ materially. Past performance is not indicative of future results. Any reference to specific securities or sectors is for illustration only and should not be construed as a recommendation.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "Investors should consult their own financial, tax, and legal advisors before making any investment decision. No representation or warranty is made as to the accuracy or completeness of the information contained herein.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "© 2026 — Prepared for internal strategy discussion.", options: {} },
  ], {
    x: 0.5, y: 1.1, w: 9.0, h: 3.7,
    fontSize: 10, color: C.medGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 2,
  });

  addFooter(s, 22);
}

// ---------- Write ----------
pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

// AI Markets deck — BII visual style
// Mirrors https://ai-markets.vercel.app/ — May 2026
// Run: node build-deck.js  →  outputs ai-markets-deck.pptx

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
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

// ---------- Helpers ----------

function addFooter(slide, pageNum) {
  // Pure black for maximum contrast with the white disclaimer and page number —
  // dark-gray exports occasionally read as medium-gray and wash the footer text.
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.0, w: 10.0, h: 0.625,
    fill: { color: C.black }, line: { color: C.black, width: 0 },
  });
  slide.addText(
    "FOR INFORMATIONAL PURPOSES ONLY. NOT INVESTMENT ADVICE. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.",
    { x: 1.5, y: 5.05, w: 7.0, h: 0.5, fontSize: 6.5, color: C.white, align: "center", fontFace: "Arial", valign: "middle", bold: true, margin: 0 }
  );
  if (pageNum !== "" && pageNum != null) {
    slide.addText(String(pageNum), {
      x: 9.1, y: 5.13, w: 0.6, h: 0.3, fontSize: 9, color: C.white, align: "right", fontFace: "Arial", valign: "middle", margin: 0,
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

// Hairline divider under the headline — called once per content slide for
// consistent visual hierarchy.
function addHeadlineRule(slide, y) {
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: y != null ? y : 1.45, w: 9.0, h: 0,
    line: { color: C.lightGray, width: 0.75 },
  });
}

// Obvious "drop an image here" placeholder: light fill, dashed border, italic label.
// Intentionally unfinished so reviewers read it as a placeholder, not final art.
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
  // Default y raised to 4.55 with a tight h of 0.35. Clears the callout-band
  // area above and leaves ~0.1" of breathing room to the footer at y=5.0.
  slide.addText(text, {
    x: x != null ? x : 0.5, y: y || 4.55, w: w || 9.0, h: 0.35,
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
// SLIDE 1 — Cover (trim: eyebrow + wordmark + tagline + tag + hero image)
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.yellow };

  // Hero image placeholder — right-side anchor, behind the wordmark visually
  addImagePlaceholder(s, 6.55, 0.9, 3.0, 3.05, "Hero — abstract GPU / data-center close-up");

  // Date eyebrow, top right
  s.addText("May 2026", {
    x: 7.9, y: 0.35, w: 1.7, h: 0.35,
    fontSize: 14, color: C.black, fontFace: "Arial", align: "right", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 7.9, y: 0.75, w: 1.7, h: 0,
    line: { color: C.black, width: 1 },
  });

  // Accent block — short orange rule anchoring the wordmark
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.55, w: 0.8, h: 0.1,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });

  // Wordmark
  s.addText("AI Markets", {
    x: 0.5, y: 1.8, w: 6.2, h: 1.4,
    fontSize: 66, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  // Single short tagline (≤10 words)
  s.addText("The capex cycle repricing every layer of tech.", {
    x: 0.5, y: 3.25, w: 6.0, h: 0.5,
    fontSize: 17, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  // Tag
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
  addSubhead(s, "Landscape, Market, Shifts, Risks, Frontier. Each answers a different question about the same ~$750B capex cycle.");
  addHeadlineRule(s);

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.05, w: 10.0, h: 2.35,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("THE DECK AT A GLANCE", {
    x: 0.5, y: 2.18, w: 9.0, h: 0.28,
    fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 3, margin: 0,
  });

  const cards = [
    { label: "LANDSCAPE", accent: C.teal,   stat: "01", sub: "What AI is, where it runs, who fabs it.",          pages: "Slides 3–8" },
    { label: "MARKET",    accent: C.gold,   stat: "02", sub: "Who buys the chips and who builds the models.",     pages: "Slides 9–12" },
    { label: "SHIFTS",    accent: C.orange, stat: "03", sub: "The agent era, the divergence, the repricing.",     pages: "Slides 13–15" },
    { label: "RISKS",     accent: C.red,    stat: "04", sub: "Bubble, narrative, supply chain, policy, backlash.", pages: "Slides 16–20" },
    { label: "FRONTIER",  accent: C.pink,   stat: "05", sub: "Orbital, physical, autonomous vehicles.",           pages: "Slides 21–23" },
  ];

  const cardY = 2.58, cardW = 1.7, cardH = 1.65, gap = 0.18;
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
      x: x, y: cardY + 0.18, w: cardW, h: 0.5,
      fontSize: 24, color: c.accent, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(c.label, {
      x: x, y: cardY + 0.68, w: cardW, h: 0.3,
      fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", charSpacing: 2, margin: 0,
    });
    s.addText(c.sub, {
      x: x + 0.1, y: cardY + 1.02, w: cardW - 0.2, h: 0.45,
      fontSize: 8.5, color: "CCCCCC", fontFace: "Arial", align: "center", margin: 0,
    });
    s.addText(c.pages, {
      x: x, y: cardY + 1.4, w: cardW, h: 0.22,
      fontSize: 7.5, color: "AAAAAA", fontFace: "Arial", align: "center", italic: true, margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research. 24 slides, read top to bottom.", 0.5, 4.55, 9.0);
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
  addHeadlineRule(s);

  const stats = [
    { n: "$750B", lbl: "2026E hyperscaler capex — Big 5 combined",         color: C.orange },
    { n: "$4T",   lbl: "cumulative AI data-center spend through 2030",     color: C.orange },
    { n: "+38%",  lbl: "semiconductors (SOXX) YTD",                        color: C.green },
    { n: "–20%",  lbl: "software (IGV) YTD",                               color: C.red },
  ];
  const y = 2.05, w = 2.1, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  // Yellow payoff band — tucked tight under the stats so it reads as conclusion, not afterthought.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.55, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("A ~58-point spread between semis and software. The same AI wave is creating winners and losers simultaneously.", {
    x: 0.7, y: 3.55, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: CreditSights / MUFG hyperscaler capex 2026 estimates; Jensen Huang (Sept 2025); Deutsche Bank; iShares SOXX & IGV YTD total return as of Apr 17, 2026.", 0.5, 4.55, 9.0);
  addFooter(s, 3);
}

// ===================================================================
// SLIDE 4 — AI Growth Rates are Unprecedented (NEW — LANDSCAPE)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "AI growth rates are unprecedented.");
  addSubhead(s, "User adoption and revenue growth for AI far eclipse prior technologies — a once-in-a-generation S-curve, compressed into a handful of years.");
  addHeadlineRule(s);

  // --- LEFT PANEL: User adoption, AI vs PC vs Internet ---
  // Adoption values are % of US population. AI curve is shown for Y0–Y3 only
  // (real data); later years left as null so the line terminates at Y3.
  addChartTitle(s, "User adoption after first mass-market launch", 0.5);
  const adoptYears = ["Y0", "Y1", "Y2", "Y3", "Y4", "Y5", "Y6", "Y7", "Y8", "Y9", "Y10", "Y11", "Y12", "Y13", "Y14", "Y15"];
  s.addChart(pres.charts.LINE,
    [
      // AI: 0 → 56% by Y3. Null after so the line ends cleanly at Y3.
      { name: "AI",       labels: adoptYears, values: [0, 18, 38, 56, null, null, null, null, null, null, null, null, null, null, null, null] },
      // Internet (teal in legend via chartColors ordering): S-curve ending 68% by Y15.
      { name: "Internet", labels: adoptYears, values: [0, 2, 5, 10, 16, 24, 32, 40, 47, 53, 58, 62, 64, 66, 67, 68] },
      // PC: slower S-curve ending 49% by Y15.
      { name: "PC",       labels: adoptYears, values: [0, 1, 3, 6, 9, 13, 18, 23, 28, 32, 36, 40, 43, 46, 48, 49] },
    ],
    lineOpts({ x: 0.5, y: 1.95, w: 4.3, h: 2.3,
               chartColors: [C.orange, C.teal, C.medGray],
               valAxisMinVal: 0, valAxisMaxVal: 100,
               valAxisLabelFormatCode: "0\"%\"" })
  );
  // Y-axis caption
  s.addText("% of US population", {
    x: 0.5, y: 1.85, w: 4.3, h: 0.18,
    fontSize: 8, color: C.medGray, italic: true, fontFace: "Arial", margin: 0,
  });

  // --- RIGHT PANEL: Revenue after first $1B year ---
  addChartTitle(s, "Revenue after first $1B year ($B)", 5.2);
  const revYears = ["Y0", "Y1", "Y2", "Y3", "Y4 (2026E)"];
  s.addChart(pres.charts.BAR,
    [
      // AI ramp — user-supplied trajectory.
      { name: "AI",       labels: revYears, values: [1, 5, 16, 42, 82] },
      // Cloud (nominal placeholder — user to refine): hyperscaler infra.
      { name: "Cloud",    labels: revYears, values: [1, 2, 4, 7, 12] },
      // Internet (nominal placeholder — user to refine): ad-era web.
      { name: "Internet", labels: revYears, values: [1, 2, 3, 5, 8] },
    ],
    barOpts({ x: 5.2, y: 1.95, w: 4.3, h: 2.3,
              chartColors: [C.orange, C.gold, C.teal],
              barGrouping: "clustered",
              showLegend: true, legendPos: "b", legendFontSize: 8, legendColor: "666666",
              valAxisMinVal: 0, valAxisMaxVal: 100,
              dataLabelFontSize: 7 })
  );
  s.addText("Revenue ($B)", {
    x: 5.2, y: 1.85, w: 4.3, h: 0.18,
    fontSize: 8, color: C.medGray, italic: true, fontFace: "Arial", margin: 0,
  });

  // PLAYERS strip — per-series company set, same treatment as Slides 18/19/20.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.3, w: 9.0, h: 0.2,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "AI ",       options: { bold: true, color: C.orange, fontSize: 8, charSpacing: 2 } },
    { text: "OpenAI · Anthropic    ",   options: { color: C.white, fontSize: 8.5, bold: true } },
    { text: "CLOUD ",    options: { bold: true, color: C.gold, fontSize: 8, charSpacing: 2 } },
    { text: "AWS · Azure · Google Cloud    ", options: { color: C.white, fontSize: 8.5, bold: true } },
    { text: "INTERNET ", options: { bold: true, color: C.teal, fontSize: 8, charSpacing: 2 } },
    { text: "Meta · Google",             options: { color: C.white, fontSize: 8.5, bold: true } },
  ], {
    x: 0.7, y: 4.3, w: 8.6, h: 0.2,
    fontFace: "Arial", valign: "middle", margin: 0,
  });

  // Yellow payoff band — matches Slide 3 / 9 / 11 / 14 treatment.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.35,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("User adoption and revenue growth rates for AI far eclipse those of prior technologies.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.35,
    fontSize: 11.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Mary Meeker (Bond Capital / KPCB Internet Trends 2019); company filings and consensus estimates. Cloud and Internet revenue trajectories are illustrative — refine before publication. 2026E shown for AI.", 0.5, 4.55, 9.0);
  addFooter(s, 4);
}

// ===================================================================
// SLIDE 5 — What is AI (6-phase evolution)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "What is AI.");
  addSubhead(s, "Software that learns from data, reasons through problems, and — increasingly — takes action without human direction.");
  addHeadlineRule(s);

  // Evened description lengths so all six cards carry similar visual weight.
  // Flagged (hero) = the last two phases that matter for the thesis.
  const phases = [
    { date: "1950s–80s",   title: "Symbolic AI",       desc: "Hand-coded rules. Expert systems with narrow recall.",          color: C.medGray, hero: false },
    { date: "1990s–2000s", title: "Machine Learning",  desc: "Systems learn patterns from data, not rules.",                  color: C.teal,    hero: false },
    { date: "2012",        title: "Deep Learning",     desc: "Neural networks go deep. AlexNet, the first breakthrough.",     color: C.gold,    hero: false },
    { date: "2022–24",     title: "LLM chatbots",      desc: "ChatGPT hits 100M users in 2 months. Claude, Gemini follow.",    color: C.orange,  hero: true  },
    { date: "2023–24",     title: "Reasoning",         desc: "Multi-step logic, chain-of-thought. o1, DeepSeek R1.",          color: C.pink,    hero: false },
    { date: "2025+",       title: "Agentic AI",        desc: "AI that uses tools and acts autonomously. Claude Code, agents.", color: C.red,     hero: true  },
  ];

  const lineY = 1.85;
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
    // Hero phases get a subtle tinted fill to signal emphasis.
    const cardFill = ev.hero ? "FFF8F3" : C.offWhite;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: cardW, h: 2.2,
      fill: { color: cardFill }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: 0.06, h: 2.2,
      fill: { color: ev.color }, line: { color: ev.color, width: 0 },
    });
    s.addText(ev.date, {
      x: cardX + 0.14, y: lineY + 0.32, w: cardW - 0.2, h: 0.25,
      fontSize: 8.5, color: C.medGray, fontFace: "Arial", margin: 0,
    });
    s.addText(ev.title, {
      x: cardX + 0.14, y: lineY + 0.58, w: cardW - 0.2, h: 0.38,
      fontSize: ev.hero ? 12 : 11.5, color: C.black, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(ev.desc, {
      x: cardX + 0.14, y: lineY + 1.0, w: cardW - 0.2, h: 1.35,
      fontSize: 8.8, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research.", 0.5, 4.55, 9.0);
  addFooter(s, 5);
}

// ===================================================================
// SLIDE 6 — The AI stack (11 layers)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "The AI stack.");
  addSubhead(s, "From rare earths in the ground to agents that act on your behalf. Eleven layers, each investable, each with its own constraint.");
  addHeadlineRule(s);

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
  const startY = 1.55, rowH = 0.265;
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
  addFooter(s, 6);
}

// ===================================================================
// SLIDE 7 — Global supply chain
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "No one makes an AI chip alone.");
  addSubhead(s, "A single leading-edge chip crosses 70+ borders and six countries before it reaches a data center. There is no domestic alternative.");
  addHeadlineRule(s);

  // World map placeholder, spanning the full width above the country cards
  addImagePlaceholder(s, 0.5, 1.6, 9.0, 0.85, "World map — chip supply-chain flows between US / Taiwan / Korea / NL / Japan / China");

  const nodes = [
    { flag: "USA",         role: "Design & software",        names: "NVDA, AMD, AVGO",      color: C.teal },
    { flag: "Taiwan",      role: "Leading-edge fabs",        names: "TSMC (~90% advanced)", color: C.red },
    { flag: "S. Korea",    role: "DRAM & HBM",               names: "SK Hynix, Samsung",    color: C.gold },
    { flag: "Netherlands", role: "EUV lithography",          names: "ASML (<100/yr)",       color: C.pink },
    { flag: "Japan",       role: "Materials & equipment",    names: "Tokyo Electron, Shin-Etsu", color: C.orange },
    { flag: "China",       role: "Mature-node fabs, rare earths", names: "SMIC, Huawei",    color: C.darkGray },
  ];
  const y0 = 2.6, cardW = 2.85, cardH = 0.8, gapX = 0.1, gapY = 0.12;
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
      x: x + 0.15, y: y + 0.08, w: cardW - 0.3, h: 0.24,
      fontSize: 13, color: C.black, bold: true, fontFace: "Arial Black", margin: 0,
    });
    s.addText(n.role, {
      x: x + 0.15, y: y + 0.33, w: cardW - 0.3, h: 0.22,
      fontSize: 9.5, color: n.color, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(n.names, {
      x: x + 0.15, y: y + 0.54, w: cardW - 0.3, h: 0.22,
      fontSize: 8.5, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Source: TSMC, ASML, SK Hynix, Samsung, Tokyo Electron filings; SIA.", 0.5, 4.55, 9.0);
  addFooter(s, 7);
}

// ===================================================================
// SLIDE 8 — Power
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "Power is part of the stack now.");
  addSubhead(s, "Global data-center electricity demand is on track to more than double by 2030 (IEA). Where the electrons come from is now a market call.");
  addHeadlineRule(s);

  // Hero image — centered, proper 6×1.2 proportion (no more awkward letterbox).
  addImagePlaceholder(s, 2.0, 1.55, 6.0, 1.2, "Data-center with turbines / solar array / transmission lines");

  // Three power-source cards in a compact row below the hero.
  // SOLAR & PPAs header renders black on gold (better contrast than white on gold).
  const cols = [
    { x: 0.5, title: "NATURAL GAS",         tag: "Fast & firm", desc: "Turbines can power a data center in under a year — the near-term backbone of the buildout.", accent: C.red,      hdrColor: C.white },
    { x: 3.6, title: "SOLAR & PPAs",        tag: "Scalable",    desc: "Hyperscalers are the largest corporate buyers of renewable energy. Long-term PPAs lock in clean power.",         accent: C.gold,     hdrColor: C.black },
    { x: 6.7, title: "GRID & INTERCONNECT", tag: "Bottleneck",  desc: "Interconnection queues take years. Grid build is the binding constraint on deployment speed.",                   accent: C.darkGray, hdrColor: C.white },
  ];
  cols.forEach((col) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 2.9, w: 2.8, h: 0.35,
      fill: { color: col.accent }, line: { color: col.accent, width: 0 },
    });
    s.addText(col.title, {
      x: col.x, y: 2.9, w: 2.8, h: 0.35,
      fontSize: 11.5, color: col.hdrColor, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 3.25, w: 2.8, h: 0.95,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.tag, {
      x: col.x + 0.15, y: 3.3, w: 2.55, h: 0.22,
      fontSize: 9, color: col.accent, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
    });
    s.addText(col.desc, {
      x: col.x + 0.15, y: 3.52, w: 2.55, h: 0.67,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.25, w: 9.0, h: 0.22,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("EMERGING · SMR pipeline and geothermal — the only sources credibly scaling past 2030 without straining grids.", {
    x: 0.7, y: 4.25, w: 8.6, h: 0.22,
    fontSize: 8.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: IEA World Energy Outlook 2025; EIA; utility interconnection-queue data.", 0.5, 4.55, 9.0);
  addFooter(s, 8);
}

// ===================================================================
// SLIDE 9 — Who is buying (MARKET opener)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "The buyer base is broadening.");
  addSubhead(s, "The Big 5 hyperscalers drive ~$750B. But neoclouds, sovereigns, labs, and enterprises are now material — not just the original four.");
  addHeadlineRule(s);

  const groups = [
    { title: "HYPERSCALERS", stat: "~$750B",  sub: "2026E combined capex",     hook: "Big 5 — all top-10 S&P names",  names: "AMZN · GOOGL · MSFT · META · ORCL",        color: C.orange },
    { title: "AI LABS",      stat: "4 names", sub: "driving demand",           hook: "Where the round sizes live",    names: "OpenAI · Anthropic · xAI · Mistral",       color: C.pink },
    { title: "NEOCLOUDS",    stat: "~4×",     sub: "cheaper than hypers",      hook: "GPU-as-a-service, rented short", names: "CoreWeave · Lambda · Crusoe · Vultr",      color: C.teal },
    { title: "SOVEREIGNS",   stat: "$100B+",  sub: "announced sovereign AI",   hook: "Gulf + G7 pools of capital",    names: "Saudi · UAE · France · Japan",             color: C.gold },
    { title: "ENTERPRISES",  stat: "Big 4",   sub: "with in-house fleets",     hook: "Buying chips, not API seats",   names: "JPMorgan · Tesla · Apple · ByteDance",     color: C.green },
  ];
  const y = 1.85, cardW = 1.72, cardH = 2.0, gap = 0.18;
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
      x: x + 0.08, y: y + 0.14, w: cardW - 0.16, h: 0.26,
      fontSize: 9.5, color: g.color, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
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
      x: x + 0.08, y: y + 1.28, w: cardW - 0.16, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(g.hook, {
      x: x + 0.08, y: y + 1.34, w: cardW - 0.16, h: 0.26,
      fontSize: 8, color: g.color, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(g.names, {
      x: x + 0.08, y: y + 1.6, w: cardW - 0.16, h: 0.35,
      fontSize: 7.5, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Sources: CreditSights / MUFG hyperscaler capex 2026 estimates (Apr 2026 consensus); sovereign AI announcements; CoreWeave, Lambda, Crusoe, Vultr filings.", 0.5, 4.55, 9.0);
  addFooter(s, 9);
}

// ===================================================================
// SLIDE 10 — The semiconductor market
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Anatomy of a ~$975B market.");
  addSubhead(s, "AI has flipped the engine. Logic and memory — ~60% of the industry — now drive the whole thing. Analog and micros are along for the ride.");
  addHeadlineRule(s);

  addChartTitle(s, "Semi revenue by segment, 2026E ($B)", 0.5);
  s.addChart(pres.charts.BAR,
    [{
      name: "2026E $B",
      labels: ["Logic", "Memory", "Analog", "Micro", "Discrete"],
      values: [302, 295, 95, 85, 45],
    }],
    // Inside-top labels (white on orange) — avoids the 302/295 collision at outEnd.
    barOpts({ x: 0.5, y: 1.95, w: 4.3, h: 1.95, chartColors: [C.orange],
              dataLabelPosition: "inEnd", dataLabelColor: "FFFFFF" })
  );

  addChartTitle(s, "Value captured by node", 5.2);
  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 9.5, fontFace: "Arial", valign: "middle", color: C.darkGray, margin: 0.03 }, opts || {}) });
  const rows = [
    ["NVIDIA",    "$216B",   "FY26 rev, +65% YoY"],
    ["NVIDIA",    "$78B",    "Q1 FY27 rev guide (Feb)"],
    ["TSMC",      "~90%",    "of advanced-node supply"],
    ["SK Hynix",  "62%",     "HBM share; 70% for Rubin"],
    ["ASML",      "<100/yr", "EUV machines built per year"],
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
    colW: [1.1, 1.0, 2.2],
    rowH: 0.3,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.95, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("$975B total revenue, +26% YoY. Logic + memory = ~$600B — tracking hyperscaler capex almost dollar-for-dollar.", {
    x: 0.7, y: 3.95, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: WSTS Fall 2025 forecast; SIA; NVIDIA FY2026 10-K (Jan 2026); TSMC, SK Hynix filings; TrendForce; ASML annual capacity guidance.", 0.5, 4.55, 9.0);
  addFooter(s, 10);
}

// ===================================================================
// SLIDE 11 — Memory & HBM
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Memory is the bottleneck.");
  addSubhead(s, "GPUs wait on memory. Context windows are exploding. HBM is a three-supplier oligopoly on its way to a $100B TAM.");
  addHeadlineRule(s);

  addChartTitle(s, "HBM TAM ($B) — 25× growth, 2023 → 2028E", 0.5);
  s.addChart(pres.charts.BAR,
    [{
      name: "HBM TAM $B",
      labels: ["2023", "2024", "2025", "2026E", "2027E", "2028E"],
      values: [4, 16, 35, 55, 80, 100],
    }],
    barOpts({ x: 0.5, y: 1.95, w: 4.3, h: 2.3, chartColors: [C.orange] })
  );

  addChartTitle(s, "HBM supplier share, Q1 2026 (%)", 5.2);
  // Horizontal bar: three suppliers read more cleanly stacked. Same orange
  // as the TAM chart — both panels are the same story (memory scarcity).
  s.addChart(pres.charts.BAR,
    [{
      name: "Share %",
      labels: ["SK Hynix", "Micron", "Samsung"],
      values: [60, 22, 18],
    }],
    barOpts({ x: 5.2, y: 1.95, w: 4.3, h: 2.3, chartColors: [C.orange],
              barDir: "bar", dataLabelPosition: "outEnd" })
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("HBM4 = 56× the bandwidth of DDR5. All three suppliers sold out for 2026.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Bank of America 2026 HBM TAM forecast; TrendForce; Counterpoint Research; SK Hynix, Micron, Samsung Q4 2025 filings; UBS (HBM4 share est.).", 0.5, 4.55, 9.0);
  addFooter(s, 11);
}

// ===================================================================
// SLIDE 12 — The labs (private valuations)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "The labs are a market.");
  addSubhead(s, "Four frontier labs now worth ~$1.5T in aggregate private value. Q1 2026 doubled all of 2025's foundational-AI VC funding — and VCs are still chasing.");
  addHeadlineRule(s);

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 10, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 10.5, fontFace: "Arial", valign: "middle", align: "center", color: C.darkGray }, opts || {}) });
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
        cell(r.event, Object.assign({ align: "left", fontSize: 9.5 }, fill)),
      ];
    }),
  ];
  s.addTable(tableData, {
    x: 0.5, y: 1.9, w: 9.0,
    colW: [1.3, 1.4, 1.5, 4.8],
    rowH: 0.4,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Q1 2026 funding to foundational AI startups was 2× all of 2025.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 13, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: TechCrunch, CNBC, Tech-Insider (Apr 2026); Crunchbase Q1 2026 VC data; Sacra ARR run-rates; Bloomberg. *xAI ARR estimated.", 0.5, 4.55, 9.0);
  addFooter(s, 12);
}

// ===================================================================
// SLIDE 13 — What is agentic AI
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "From chatbots to coworkers.");
  addSubhead(s, "Agents set goals, use tools, and complete tasks end-to-end. Each session uses 10–100× the compute of a chatbot query.");
  addHeadlineRule(s);

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 10, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 11, fontFace: "Arial", valign: "middle", color: C.darkGray, margin: 0.05 }, opts || {}) });
  // Orange only on the most important differentiator — the autonomy shift.
  // Remaining "Agent" cells stay bold black so the eye lands on the one
  // that matters instead of fighting four competing oranges.
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
    x: 0.5, y: 1.85, w: 9.0,
    colW: [2.5, 3.2, 3.3],
    rowH: 0.42,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.95, w: 9.0, h: 0.5,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("Labs are buying dev-tool companies (Bun, Astral) to lock the coding stack.", {
    x: 0.7, y: 3.95, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Anthropic, OpenAI, GitHub Trending; company announcements.", 0.5, 4.55, 9.0);
  addFooter(s, 13);
}

// ===================================================================
// SLIDE 14 — The Great Divergence (SOXX vs IGV, DiSAASter)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "The basket trade is over.");
  addSubhead(s, "AI stock correlation collapsed from ~80% to ~20%. Semis are up, software is down — a ~58-point YTD spread inside one theme.");
  addHeadlineRule(s);

  addChartTitle(s, "YTD price return, rebased to 100", 0.5);
  s.addChart(pres.charts.LINE,
    [
      { name: "Semis (SOXX)",   labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100, 110, 118, 128, 138] },
      { name: "Nasdaq",         labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100,  98,  96,  99, 104] }, // TODO: verify Nasdaq YTD Apr 17
      { name: "Software (IGV)", labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100,  88,  78,  76,  80] },
    ],
    lineOpts({ x: 0.5, y: 1.95, w: 4.3, h: 2.3 })
  );

  // Single panel helper, reused for both Memory and diSAASter so row spacing and
  // column x-positions line up across the two lists.
  const ROW_H = 0.27;
  const X_TICKER = 1.0;   // ticker column width
  const X_PCT    = 0.9;   // pct column width
  const drawPanel = (x, y, title, color, rows, pctColor) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 4.3, h: 0.3,
      fill: { color: color }, line: { color: color, width: 0 },
    });
    s.addText(title, {
      x: x, y: y, w: 4.3, h: 0.3,
      fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    rows.forEach((r, i) => {
      const ry = y + 0.35 + i * ROW_H;
      s.addText(r.ticker, {
        x: x, y: ry, w: X_TICKER, h: ROW_H,
        fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0.05,
      });
      s.addText(r.pct, {
        x: x + X_TICKER, y: ry, w: X_PCT, h: ROW_H,
        fontSize: 12, color: pctColor, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
      });
      s.addText(r.note, {
        x: x + X_TICKER + X_PCT, y: ry, w: 4.3 - X_TICKER - X_PCT, h: ROW_H,
        fontSize: 8.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
      });
    });
  };

  drawPanel(5.2, 1.95, "MEMORY SUPERCYCLE", C.green, [
    { ticker: "Samsung",  pct: "+72%", note: "HBM capacity +50% in 2026" },
    { ticker: "Micron",   pct: "+68%", note: "HBM sold out; $8B run-rate" },
    { ticker: "SK Hynix", pct: "+62%", note: "60% HBM share; HBM4 ramp" },
  ], C.green);

  drawPanel(5.2, 3.2, "THE diSAAS-ter", C.red, [
    { ticker: "Salesforce", pct: "–22%", note: "Seat model under agent threat" },
    { ticker: "Adobe",      pct: "–24%", note: "Gen-AI erodes content moat" },
    { ticker: "ServiceNow", pct: "–19%", note: "Workflows disrupted by agents" },
  ], C.red);

  addSource(s, "Sources: iShares SOXX / IGV / QQQ YTD total return, Apr 17, 2026; Yahoo Finance; Counterpoint Research; Morgan Stanley CIO Survey. Single-stock YTDs indicative.", 0.5, 4.55, 9.0);
  addFooter(s, 14);
}

// ===================================================================
// SLIDE 15 — Tech Investors Pay Less, For More (NEW — SHIFTS)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "Tech investors pay less, for more.");
  addSubhead(s, "Top 10 Tech firms are growing 4× faster than the top 10 Non-Tech — at a lower multiple. The divergence in fundamentals has not been priced into valuations.");
  addHeadlineRule(s);

  // --- LEFT PANEL: three mini grouped bars (Rev Growth / Op Margin / P/E) ---
  addChartTitle(s, "Top 10 Tech vs Top 10 Non-Tech — 2026E", 0.5);

  // Panel frame so the three mini bars read as one coherent block.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.95, w: 4.3, h: 2.3,
    fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
  });

  // Three metrics, side-by-side. Each is a tiny paired-bar block drawn manually —
  // this keeps the data-label format consistent (% vs x) without fighting pptxgen.
  const metrics = [
    { key: "Revenue Growth", tech: 22, non: 5,  suffix: "%", max: 50 },
    { key: "Op Margin",      tech: 41, non: 20, suffix: "%", max: 50 },
    { key: "P/E",            tech: 23, non: 27, suffix: "x", max: 35 },
  ];
  const panelX = 0.5, panelY = 1.95, panelW = 4.3, panelH = 2.3;
  const colGap = 0.1;
  const cellW = (panelW - colGap * (metrics.length + 1)) / metrics.length;
  const maxBarH = panelH - 0.95; // reserve space for title + labels + metric caption
  const barBaseY = panelY + 0.3 + maxBarH;

  metrics.forEach((m, i) => {
    const cx = panelX + colGap + i * (cellW + colGap);
    const barW = (cellW - 0.18) / 2;
    const techH = (m.tech / m.max) * maxBarH;
    const nonH  = (m.non  / m.max) * maxBarH;

    // Tech bar (orange)
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.06, y: barBaseY - techH, w: barW, h: techH,
      fill: { color: C.orange }, line: { color: C.orange, width: 0 },
    });
    s.addText(m.tech + m.suffix, {
      x: cx + 0.06, y: barBaseY - techH - 0.28, w: barW, h: 0.25,
      fontSize: 10, color: C.orange, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });

    // Non-Tech bar (medGray)
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx + 0.12 + barW, y: barBaseY - nonH, w: barW, h: nonH,
      fill: { color: C.medGray }, line: { color: C.medGray, width: 0 },
    });
    s.addText(m.non + m.suffix, {
      x: cx + 0.12 + barW, y: barBaseY - nonH - 0.28, w: barW, h: 0.25,
      fontSize: 10, color: C.medGray, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });

    // Baseline rule + metric caption
    s.addShape(pres.shapes.LINE, {
      x: cx + 0.04, y: barBaseY, w: cellW - 0.08, h: 0,
      line: { color: C.darkGray, width: 0.75 },
    });
    s.addText(m.key, {
      x: cx, y: barBaseY + 0.08, w: cellW, h: 0.26,
      fontSize: 9.5, color: C.black, bold: true, fontFace: "Arial", align: "center", margin: 0,
    });
  });

  // Legend swatches below the panel
  s.addShape(pres.shapes.RECTANGLE, { x: 1.0, y: 4.0, w: 0.18, h: 0.12, fill: { color: C.orange }, line: { color: C.orange, width: 0 } });
  s.addText("Top 10 Tech", {
    x: 1.22, y: 3.96, w: 1.4, h: 0.2, fontSize: 9, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 2.7, y: 4.0, w: 0.18, h: 0.12, fill: { color: C.medGray }, line: { color: C.medGray, width: 0 } });
  s.addText("Top 10 Non-Tech", {
    x: 2.92, y: 3.96, w: 1.7, h: 0.2, fontSize: 9, color: C.darkGray, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  // --- RIGHT PANEL: scatter of 2026 P/E vs Rev Growth ---
  addChartTitle(s, "2026E P/E vs 2026E Revenue Growth", 5.2);

  // Faint backing zones so the eye reads "cheap+growth" vs "expensive+slow" before
  // it reads individual points. Upper-right highlights the Tech cluster.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.95, w: 4.3, h: 2.3,
    fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
  });
  // Lower-left zone (Non-Tech quadrant) — pale red tint
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 3.1, w: 2.15, h: 1.15,
    fill: { color: "FBEAEA" }, line: { color: "FBEAEA", width: 0 },
  });
  // Upper-right zone (Tech quadrant) — pale gold tint
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.35, y: 1.95, w: 2.15, h: 1.15,
    fill: { color: "FFF6D6" }, line: { color: "FFF6D6", width: 0 },
  });
  s.addText("Expensive for low growth", {
    x: 5.25, y: 4.0, w: 2.05, h: 0.22,
    fontSize: 8.5, color: C.red, bold: true, italic: true, fontFace: "Arial", margin: 0,
  });
  s.addText("Inexpensive for high growth", {
    x: 7.4, y: 1.98, w: 2.05, h: 0.22,
    fontSize: 8.5, color: C.darkGray, bold: true, italic: true, fontFace: "Arial", align: "right", margin: 0,
  });

  // Scatter via pptxgenjs. X = revenue growth %, Y = P/E.
  // Coordinates are deck-ready approximations (consensus figures, rounded).
  // User asked us to approximate — these will need a pass against Bloomberg consensus.
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
      { name: "X Axis", values: [-5, 0, 10, 20, 30, 40, 50, 60, 70] }, // category/X baseline
      { name: "Top 10 Tech",     values: techPts.map(p => p.y) },
      { name: "Top 10 Non-Tech", values: nonTechPts.map(p => p.y) },
    ],
    {
      x: 5.2, y: 1.95, w: 4.3, h: 2.3,
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

  // Dark-gray payoff band — matches Slide 10 treatment.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.3, w: 9.0, h: 0.2,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("Top 10 Tech growing ~4× faster than top 10 Non-Tech — at a cheaper multiple.", {
    x: 0.7, y: 4.3, w: 8.6, h: 0.2,
    fontSize: 9.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Bloomberg consensus estimates (2026E); company filings. Top 10 defined by 2026E revenue within each group. Individual P/E / growth points are indicative — refine before publication.", 0.5, 4.55, 9.0);
  addFooter(s, 15);
}

// ===================================================================
// SLIDE 16 — The Bubble Question (vs. 2000)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "This is not 2000.");
  addSubhead(s, "Four tests. Same questions investors asked about Cisco and the dotcoms. Different answers today.");
  addHeadlineRule(s);

  const tests = [
    { test: "PRICE PER DOLLAR OF EARNINGS",  y2000: "131×", y2000sub: "Cisco fwd P/E, Mar 2000",      y2026: "~24×",   y2026sub: "NVIDIA fwd P/E, Apr 17, 2026" },
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

  // Row zebra stripes under the test column — gives the four rows their own
  // visual rhythm and lets us drop the row height from 0.48 to 0.44 without
  // feeling cramped.
  tests.forEach((t, i) => {
    const y = 2.2 + i * 0.44;
    if (i % 2 === 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: y, w: 9.0, h: 0.44,
        fill: { color: C.offWhite }, line: { color: C.offWhite, width: 0 },
      });
    }
    s.addText(t.test, {
      x: 0.5, y: y, w: 3.4, h: 0.44,
      fontSize: 9.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0.1,
    });
    s.addText([{ text: t.y2000 + "  ", options: { bold: true, color: C.red, fontSize: 14 } }, { text: t.y2000sub, options: { color: C.medGray, fontSize: 8.5 } }], {
      x: 3.95, y: y, w: 2.7, h: 0.44, fontFace: "Arial", valign: "middle", margin: 0.05,
    });
    s.addText([{ text: t.y2026 + "  ", options: { bold: true, color: C.green, fontSize: 14 } }, { text: t.y2026sub, options: { color: C.medGray, fontSize: 8.5 } }], {
      x: 6.7, y: y, w: 2.8, h: 0.44, fontFace: "Arial", valign: "middle", margin: 0.05,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.05, w: 9.0, h: 0.4,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  // "Neither condition holds today." is the payoff — make it unmissable.
  s.addText([
    { text: "Corrections happen. Bubbles require stretched valuations AND supply exceeding demand. ", options: { color: C.black, fontSize: 11 } },
    { text: "Neither condition holds today.", options: { color: C.red, fontSize: 11.5, bold: true } },
  ], {
    x: 0.7, y: 4.05, w: 8.6, h: 0.4,
    fontFace: "Arial", bold: true, valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Harding Loevner (Cisco); GuruFocus (NVDA fwd P/E Apr 17, 2026); Jay Ritter / UF; Bloomberg; CoreWeave 2nd market; FCC dark fiber data.", 0.5, 4.55, 9.0);
  addFooter(s, 16);
}

// ===================================================================
// SLIDE 17 — Media narrative has moved from underinvestment to overreach (NEW — RISKS)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "From underinvestment to overreach.");
  addSubhead(s, "Media narratives lead to misconception — the same commentariat that once demanded more capex now warns of too much. Capital allocation is the CEO's job.");
  addHeadlineRule(s);

  // --- LEFT PANEL: narrative timeline + headline callouts + Thorndike quote ---

  // Left-panel frame (offWhite, thin border) to match the deck's panel treatment.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.6, w: 4.55, h: 2.65,
    fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
  });

  // Timeline spine — a horizontal arrow-ish bar, 2019 on the left, 2026 on the right.
  const tlY = 1.85;
  s.addShape(pres.shapes.LINE, {
    x: 0.75, y: tlY, w: 4.05, h: 0,
    line: { color: C.darkGray, width: 2 },
  });
  // End dots
  s.addShape(pres.shapes.OVAL, { x: 0.70, y: tlY - 0.06, w: 0.12, h: 0.12, fill: { color: C.red },    line: { color: C.white, width: 1 } });
  s.addShape(pres.shapes.OVAL, { x: 4.73, y: tlY - 0.06, w: 0.12, h: 0.12, fill: { color: C.orange }, line: { color: C.white, width: 1 } });
  // End labels (year + narrative)
  s.addText("2019", {
    x: 0.55, y: tlY + 0.08, w: 0.8, h: 0.2,
    fontSize: 9, color: C.medGray, bold: true, fontFace: "Arial", margin: 0,
  });
  s.addText('"Too much cash & buybacks,\nnot enough CAPEX"', {
    x: 0.55, y: tlY + 0.28, w: 2.0, h: 0.42,
    fontSize: 8, color: C.red, italic: true, fontFace: "Arial", margin: 0,
  });
  s.addText("2026", {
    x: 4.15, y: tlY + 0.08, w: 0.8, h: 0.2,
    fontSize: 9, color: C.medGray, bold: true, fontFace: "Arial", align: "right", margin: 0,
  });
  s.addText('"Too much CAPEX"', {
    x: 3.05, y: tlY + 0.28, w: 1.95, h: 0.2,
    fontSize: 8, color: C.orange, italic: true, fontFace: "Arial", align: "right", margin: 0,
  });

  // Four headline callout cards — compact, tight body in italics, citation on its
  // own line. 2x2 grid. Intentionally small so they read as newspaper snippets.
  const callouts = [
    { hl: "\"Big Tech's Plunk Is Costing a Lot More Than the Stock Lending\"", cite: "Financial press, 2019" },
    { hl: "\"Big Tech's Buyback Spree Runs Its Limits\"",                       cite: "Financial press, 2019" },
    { hl: "\"Companies have been buying back massive amounts of stock this year\"", cite: "Financial press, 2019" },
    { hl: "\"Tech AI spending may approach $700B this year, but the blow to cash raises red flags\"", cite: "Financial press, 2026" },
  ];
  const coY0 = 2.85, coW = 2.2, coH = 0.58, coGapX = 0.07, coGapY = 0.06;
  callouts.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const cx = 0.6 + col * (coW + coGapX);
    const cy = coY0 + row * (coH + coGapY);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: coW, h: coH,
      fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
    });
    // Orange left rule — signals "press quote" treatment.
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 0.04, h: coH,
      fill: { color: i === callouts.length - 1 ? C.orange : C.red },
      line: { color: i === callouts.length - 1 ? C.orange : C.red, width: 0 },
    });
    s.addText(c.hl, {
      x: cx + 0.08, y: cy + 0.02, w: coW - 0.12, h: coH - 0.22,
      fontSize: 7.2, color: C.darkGray, italic: true, fontFace: "Arial", valign: "top", margin: 0,
    });
    s.addText(c.cite, {
      x: cx + 0.08, y: cy + coH - 0.2, w: coW - 0.12, h: 0.18,
      fontSize: 6.5, color: C.medGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  // Thorndike pull-quote — sits under the left panel, full width, italic.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.3, w: 4.55, h: 0.22,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText([
    { text: "\"Capital allocation is the CEO's most important job.\" ", options: { italic: true, bold: true, color: C.black, fontSize: 8.5 } },
    { text: "— The Outsiders, W. Thorndike II", options: { color: C.darkGray, fontSize: 7.5 } },
  ], {
    x: 0.6, y: 4.3, w: 4.45, h: 0.22,
    fontFace: "Arial", valign: "middle", margin: 0,
  });

  // --- RIGHT PANEL: IBM vs Microsoft — market cap & cumulative CAPEX, 2010 → 2026 ---

  addChartTitle(s, "IBM vs Microsoft, 2010 → 2026 ($B)", 5.2);

  s.addChart(pres.charts.BAR,
    [
      { name: "IBM",       labels: ["2010 Mkt Cap", "Cumulative CAPEX", "2026 Mkt Cap"], values: [175, 275, 44] },
      { name: "Microsoft", labels: ["2010 Mkt Cap", "Cumulative CAPEX", "2026 Mkt Cap"], values: [250, 550, 424] }, // CAPEX ~$550B is a placeholder
    ],
    barOpts({ x: 5.2, y: 1.95, w: 4.3, h: 2.0,
              chartColors: [C.medGray, C.orange],
              barGrouping: "clustered",
              showLegend: true, legendPos: "b", legendFontSize: 8, legendColor: "666666",
              valAxisMinVal: 0,
              dataLabelFontSize: 7 })
  );

  // Annotation strip — "10x larger CAPEX" and "13x larger shareholder return"
  // Positioned below the chart so callouts read as footnote-style insight, not
  // competing with the bars.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 3.95, w: 2.1, h: 0.25,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("~2× larger CAPEX", {
    x: 5.2, y: 3.95, w: 2.1, h: 0.25,
    fontSize: 9, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.4, y: 3.95, w: 2.1, h: 0.25,
    fill: { color: C.green }, line: { color: C.green, width: 0 },
  });
  s.addText("~10× larger mkt cap", {
    x: 7.4, y: 3.95, w: 2.1, h: 0.25,
    fontSize: 9, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
  });
  s.addText("NOT investing may have severe consequences", {
    x: 5.2, y: 4.25, w: 4.3, h: 0.22,
    fontSize: 9, color: C.red, bold: true, italic: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
  });

  // Dark-gray payoff band — keeps the Slide-10 pattern for the new "dark banner"
  // slides A/B/C so the three insertions feel like a family.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.55, w: 9.0, h: 0, // placeholder — banner would overlap source; instead put it above source
    fill: { color: C.white }, line: { color: C.white, width: 0 },
  });

  addSource(s, "Sources: Company filings (IBM, Microsoft); Bloomberg; financial press archive (2019); W. Thorndike, \"The Outsiders\" (2012). Microsoft cumulative CAPEX ~$550B is a placeholder — refine before publication.", 0.5, 4.55, 9.0);
  addFooter(s, 17);
}

// ===================================================================
// SLIDE 18 — Supply chain fragility
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "The chip supply chain is fragile.");
  addSubhead(s, "Four countries control the advanced semiconductor stack. US reshoring is real but slow — most leading-edge fabs come online 2027+.");
  addHeadlineRule(s);

  const stats = [
    { n: "~90%",  lbl: "TSMC share of advanced-node chips",        color: C.red },
    { n: "76%",   lbl: "SK Hynix + Samsung combined DRAM share",    color: C.red },
    { n: "<100",  lbl: "EUV machines ASML builds per year",         color: C.orange },
    { n: "~$36B", lbl: "CHIPS Act committed (of $52.7B)",           color: C.orange },
  ];
  const y = 1.95, w = 2.1, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  // US fab status row — tucked tight against the US-reshoring strip above.
  const fabs = [
    { name: "TSMC Arizona",   status: "Fab 1 at 4nm; Fab 2 online ~2026–27" },
    { name: "Samsung Taylor", status: "2nm fab, pushed to 2026" },
    { name: "Micron Clay NY", status: "Broke ground; online ~2028–30" },
    { name: "Intel Ohio",     status: "Two fabs under build; online ~2027–28" },
  ];
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.4, w: 9.0, h: 0.3,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("US RESHORING — ACTUAL STATUS", {
    x: 0.5, y: 3.4, w: 9.0, h: 0.3,
    fontSize: 9.5, color: C.orange, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });
  fabs.forEach((f, i) => {
    const x = 0.5 + (i % 4) * 2.225;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.05, y: 3.72, w: 2.125, h: 0.65,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(f.name, {
      x: x + 0.1, y: 3.76, w: 2.0, h: 0.24,
      fontSize: 10, color: C.black, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(f.status, {
      x: x + 0.1, y: 4.02, w: 2.0, h: 0.32,
      fontSize: 8.5, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Sources: TSMC, Samsung, Micron, Intel filings; US Commerce Dept CHIPS Program Office (Nov 2025 — $36B+ committed of $52.7B); SIA.", 0.5, 4.55, 9.0);
  addFooter(s, 18);
}

// ===================================================================
// SLIDE 19 — Policy & regulation
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Policy has cleaved the stack.");
  addSubhead(s, "Export controls, EU compliance, and reshoring subsidies now decide who can sell what, to whom, from where.");
  addHeadlineRule(s);

  // All three hero stats are now numeric-dollar-or-percent — keeps the typographic
  // rhythm consistent across the three columns.
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

  addSource(s, "Sources: NVIDIA 10-Q; ASML filings; EU AI Act Article 99 / Chapter V (Aug 2, 2026 enforcement); US Bureau of Industry and Security; Commerce Dept (Nov 2025).", 0.5, 4.55, 9.0);
  addFooter(s, 19);
}

// ===================================================================
// SLIDE 20 — The Backlash
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "The public is turning.");
  addSubhead(s, "NIMBY revolt, anti-AI sentiment, and a labor shortage are each capable of pricing the infrastructure bet lower.");
  addHeadlineRule(s);

  // Hierarchy: one dominant red stat (the capex block — concrete dollars),
  // two supporting stats in gray so the eye lands first on $64B.
  const stats = [
    { n: "$64B",  lbl: "in data-center projects blocked or delayed",  color: C.red },
    { n: "26%",   lbl: "of Americans view AI positively",              color: C.darkGray },
    { n: "~480K", lbl: "data-center workforce gap (US)",               color: C.medGray },
  ];
  const y = 1.95, w = 2.85, gap = 0.2;
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
      x: x, y: 3.4, w: 2.95, h: 0.25,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    s.addText(n.title, {
      x: x, y: 3.4, w: 2.95, h: 0.25,
      fontSize: 9, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addText(n.body, {
      x: x + 0.05, y: 3.72, w: 2.85, h: 0.7,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Sources: Data Center Watch ($18B halted, $46B delayed, 142 groups); Echelon Insights; Stop the AI Race; Fortune; TIME; CNN; NBC News; Data Center Frontier.", 0.5, 4.55, 9.0);
  addFooter(s, 20);
}

// ===================================================================
// SLIDE 21 — Orbital compute (FRONTIER opener)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Computing beyond Earth.");
  addSubhead(s, "No grid queue. No permits. No water. 1,361 W/m² of unfiltered solar, 24/7. Orbital compute sidesteps Earth's bottlenecks.");
  addHeadlineRule(s);

  // Proper-proportion image on the right, cards stacked as a single column left.
  addImagePlaceholder(s, 5.85, 1.55, 3.65, 2.3, "Render — orbital data-center satellite (solar wings, Earth below)");

  const cards = [
    { title: "NO GRID QUEUE",   body: "Earth's interconnection backlogs, zoning battles, and cooling constraints don't exist in orbit." },
    { title: "UNLIMITED SOLAR", body: "1,361 W/m² of unfiltered sunlight, 24/7 — no intermittency, no capacity-factor limits." },
    { title: "BEYOND BORDERS",  body: "Sidesteps data-localization laws, export controls, and the jurisdictional patchwork." },
  ];
  cards.forEach((c, i) => {
    const y = 1.55 + i * 0.8;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 5.15, h: 0.32,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: 0.5, y: y, w: 5.15, h: 0.32,
      fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "left", valign: "middle", charSpacing: 2, margin: 0.15,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y + 0.32, w: 5.15, h: 0.4,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: 0.65, y: y + 0.34, w: 4.85, h: 0.36,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  // Thinner Players strip — no longer competes with the headline.
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.05, w: 9.0, h: 0.32,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 9, charSpacing: 3 } },
    { text: "Starcloud · SpaceX · Google Suncatcher · Aetherflux", options: { color: C.white, fontSize: 10.5, bold: true } },
  ], {
    x: 0.7, y: 4.05, w: 8.6, h: 0.32, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: FCC filings; Starcloud, Google, SpaceX announcements; CNBC.", 0.5, 4.55, 9.0);
  addFooter(s, 21);
}

// ===================================================================
// SLIDE 22 — Physical AI
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "AI gets a body.");
  addSubhead(s, "Humanoids enter manufacturing, logistics, and healthcare at pilot scale. Every robot is a walking inference endpoint.");
  addHeadlineRule(s);

  // Hero image centered below the headline — proper 7×1.4 proportion.
  addImagePlaceholder(s, 1.5, 1.55, 7.0, 1.4, "Photo — humanoid robot on a factory / warehouse floor");

  const cards = [
    { title: "PHYSICAL WORK",        body: "Manufacturing, logistics, warehousing, agriculture, healthcare — pilots are underway." },
    { title: "TIRELESS COWORKERS",   body: "Humanoids take hazardous and ergonomically punishing tasks. Humans keep judgment." },
    { title: "INFERENCE AT THE EDGE",body: "Every robot runs foundation models in real time. At scale, rivals LLM compute." },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 3.1, w: 2.95, h: 0.3,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: x, y: 3.1, w: 2.95, h: 0.3,
      fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 3.4, w: 2.95, h: 0.65,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: x + 0.15, y: 3.45, w: 2.65, h: 0.55,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.15, w: 9.0, h: 0.3,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 9, charSpacing: 3 } },
    { text: "Tesla Optimus · Figure · Boston Dynamics · Unitree · Agility", options: { color: C.white, fontSize: 10.5, bold: true } },
  ], {
    x: 0.7, y: 4.15, w: 8.6, h: 0.3, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Goldman Sachs; Figure AI, Tesla, Hyundai, NVIDIA; company announcements.", 0.5, 4.55, 9.0);
  addFooter(s, 22);
}

// ===================================================================
// SLIDE 23 — Autonomous vehicles
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Autonomy is a flywheel.");
  addSubhead(s, "More miles → better models → more deployments. Every vehicle is a rolling inference machine consuming frontier-scale compute.");
  addHeadlineRule(s);

  // Vertical image strip on the left, cards stacked tight on the right.
  addImagePlaceholder(s, 0.5, 1.55, 2.8, 2.5, "AV sensor-visualization or fleet photo (Waymo / Tesla FSD)");

  const cards = [
    { title: "THE SAFETY CASE",  body: "Human drivers cause ~1.35M deaths a year. Autonomous systems don't tire or lose focus." },
    { title: "DATA FLYWHEEL",    body: "Every mile generates training data. Better models unlock more cities. Flywheel self-reinforces." },
    { title: "EDGE INFERENCE",   body: "Each AV runs thousands of AI ops / second across cameras, lidar, radar — frontier-scale compute." },
  ];
  cards.forEach((c, i) => {
    const y = 1.55 + i * 0.83;
    const cx = 3.5, cw = 6.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: y, w: cw, h: 0.3,
      fill: { color: C.pink }, line: { color: C.pink, width: 0 },
    });
    s.addText(c.title, {
      x: cx, y: y, w: cw, h: 0.3,
      fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "left", valign: "middle", charSpacing: 2, margin: 0.15,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: y + 0.3, w: cw, h: 0.45,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: cx + 0.15, y: y + 0.33, w: cw - 0.3, h: 0.4,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 4.18, w: 9.0, h: 0.28,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText([
    { text: "PLAYERS   ", options: { bold: true, color: C.pink, fontSize: 9, charSpacing: 3 } },
    { text: "Waymo · Tesla FSD · Baidu Apollo · Aurora", options: { color: C.white, fontSize: 10.5, bold: true } },
  ], {
    x: 0.7, y: 4.18, w: 8.6, h: 0.28, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Waymo, Tesla, Baidu, Aurora; WHO Global Road Safety; NVIDIA FY2026.", 0.5, 4.55, 9.0);
  addFooter(s, 23);
}

// ===================================================================
// SLIDE 24 — Takeaways
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Four takeaways.");
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

  const y0 = 1.55, rowH = 0.7;
  items.forEach((it, i) => {
    const y = y0 + i * rowH;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 0.6, h: rowH - 0.1,
      fill: { color: it.accent }, line: { color: it.accent, width: 0 },
    });
    s.addText(it.n, {
      x: 0.5, y: y, w: 0.6, h: rowH - 0.1,
      fontSize: 18, color: C.white, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
    });
    s.addText(it.title, {
      x: 1.2, y: y, w: 8.3, h: 0.25,
      fontSize: 12, color: C.black, bold: true, fontFace: "Arial", valign: "top", margin: 0,
    });
    s.addText(it.body, {
      x: 1.2, y: y + 0.25, w: 8.3, h: rowH - 0.32,
      fontSize: 9.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Sources: company filings; CreditSights / MUFG hyperscaler capex 2026 (Apr 2026); Goldman Sachs correlation data; iShares SOXX / IGV YTD (Apr 17, 2026); SemiAnalysis; BofA HBM TAM; TrendForce.", 0.5, 4.4, 9.0);
  addFooter(s, 24);
}

// ---------- Write ----------
pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });
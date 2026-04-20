// AI Markets deck — BII visual style
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
};

const THEMES = {
  LANDSCAPE:      { color: C.teal,   textColor: C.white },
  "MARKET SHIFTS":{ color: C.orange, textColor: C.black },
  RISKS:          { color: C.red,    textColor: C.white },
  FRONTIER:       { color: C.pink,   textColor: C.white },
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

function addFullChartTitle(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 1.55, w: 9.0, h: 0.3,
    fontSize: 14, color: C.black, bold: true, fontFace: "Arial", valign: "bottom", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: 0.5, y: 1.85, w: 9.0, h: 0,
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

function makeSmallStat(slide, number, label, x, y, w, color) {
  slide.addText(number, {
    x: x, y: y, w: w, h: 0.55,
    fontSize: 30, color: color || C.orange, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
  });
  slide.addText(label, {
    x: x, y: y + 0.58, w: w, h: 0.4,
    fontSize: 9.5, color: C.medGray, fontFace: "Arial", align: "center", valign: "top", margin: 0,
  });
}

// Chart style presets (return fresh objects each call — pptxgenjs mutates options)
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
    chartColors: [C.orange, C.darkGray],
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

  // Thin black accent rule under date
  s.addShape(pres.shapes.LINE, {
    x: 7.9, y: 0.75, w: 1.7, h: 0,
    line: { color: C.black, width: 1 },
  });

  s.addText("AI Markets", {
    x: 0.5, y: 1.6, w: 9.0, h: 1.2,
    fontSize: 72, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  s.addText("Concentration, capex, and the frontier ahead.", {
    x: 0.5, y: 2.75, w: 9.0, h: 0.6,
    fontSize: 24, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  s.addText("A data-driven read of the four currents shaping equity markets in 2026: the landscape, the shifts, the risks, and what sits on the frontier.", {
    x: 0.5, y: 3.45, w: 8.4, h: 0.9,
    fontSize: 13, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
  });

  s.addText("Strategy Note  |  Equity Research", {
    x: 0.5, y: 4.35, w: 6, h: 0.35,
    fontSize: 11, color: C.black, bold: true, fontFace: "Arial", valign: "top", margin: 0,
  });

  addFooter(s, "");
}

// ===================================================================
// SLIDE 2 — Agenda (stat cards on dark banner)
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Four currents shaping the market");
  addSubhead(s, "The story of AI in equities, told in four parts — with the data that underpins each.");

  // Dark banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.05, w: 10.0, h: 2.35,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });

  // Section label
  s.addText("THE DECK AT A GLANCE", {
    x: 0.5, y: 2.2, w: 9.0, h: 0.3,
    fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 3, margin: 0,
  });

  const cards = [
    { label: "LANDSCAPE",     accent: C.teal,   stat: "01",  sub: "The size, shape, and leaders of the AI complex.", pages: "Slides 3–7" },
    { label: "MARKET SHIFTS", accent: C.orange, stat: "02",  sub: "Capex, concentration, and valuations in 2026.",    pages: "Slides 8–12" },
    { label: "RISKS",         accent: C.red,    stat: "03",  sub: "Bull vs. bear, scenarios, and structural cautions.", pages: "Slides 13–17" },
    { label: "FRONTIER",      accent: C.pink,   stat: "04",  sub: "Agentic, physical, and scientific frontiers.",     pages: "Slides 18–21" },
  ];

  const cardY = 2.65, cardW = 2.15, cardH = 1.55, gap = 0.15;
  const totalW = cards.length * cardW + (cards.length - 1) * gap;
  const startX = (10 - totalW) / 2;

  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: cardH,
      fill: { color: "444444" }, line: { color: "444444", width: 0 },
    });
    // accent top line
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: 0.06,
      fill: { color: c.accent }, line: { color: c.accent, width: 0 },
    });
    s.addText(c.stat, {
      x: x, y: cardY + 0.15, w: cardW, h: 0.5,
      fontSize: 26, color: c.accent, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(c.label, {
      x: x, y: cardY + 0.65, w: cardW, h: 0.3,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", charSpacing: 2, margin: 0,
    });
    s.addText(c.sub, {
      x: x + 0.12, y: cardY + 0.95, w: cardW - 0.24, h: 0.45,
      fontSize: 8.5, color: "CCCCCC", fontFace: "Arial", align: "center", margin: 0,
    });
    s.addText(c.pages, {
      x: x, y: cardY + 1.32, w: cardW, h: 0.2,
      fontSize: 8, color: "AAAAAA", fontFace: "Arial", align: "center", italic: true, margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research.  |  22 slides, read top to bottom.", 0.5, 4.5, 9.0);
  addFooter(s, 2);
}

// ===================================================================
// SLIDE 3 — Section divider: LANDSCAPE (big number hero)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "AI is the index now.");
  addSubhead(s, "Part one of four. A baseline for what investors are actually buying when they buy the index.");

  // Large stat in center
  s.addText("$4.7T", {
    x: 0.5, y: 1.95, w: 9.0, h: 1.6,
    fontSize: 140, color: C.orange, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
  });
  s.addText("Combined market cap of the ten largest AI-exposed equities — roughly 12× the value of the entire S&P 500 energy sector.", {
    x: 1.0, y: 3.75, w: 8.0, h: 0.7,
    fontSize: 14, color: C.darkGray, bold: true, fontFace: "Arial", align: "center", valign: "top", margin: 0,
  });

  addSource(s, "Source: Strategy Research (illustrative, reconstructed figures). Data as of March 2026.", 0.5, 4.5, 9.0);
  addFooter(s, 3);
}

// ===================================================================
// SLIDE 4 — Market sizing (big numbers)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "The AI market, by the numbers");
  addSubhead(s, "Spending, index exposure, and labor — four datapoints that frame the scale of the shift.");

  const stats = [
    { n: "$540B",  lbl: "2026E global AI spend",            color: C.orange },
    { n: "42%",    lbl: "S&P 500 weight in AI-exposed names", color: C.orange },
    { n: "$620B",  lbl: "hyperscaler 2026E capex",          color: C.orange },
    { n: "1.6M",   lbl: "AI/ML roles open globally",        color: C.orange },
  ];
  const y = 2.2, w = 2.05, gap = 0.25;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  // Takeaway card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Takeaway: AI is no longer a sector bet — it's an index exposure. Underweighting it is an active call.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Strategy Research, IDC, company filings. Reconstructed figures for illustrative purposes.", 0.5, 4.45, 9.0);
  addFooter(s, 4);
}

// ===================================================================
// SLIDE 5 — Performance dual-panel
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "AI has carried the tape.");
  addSubhead(s, "The AI basket is up 34% YTD against a 9% index return — and sector dispersion is the widest since 2020.");

  addChartTitle(s, "AI basket vs. S&P 500, YTD (rebased to 100)", 0.5);
  s.addChart(pres.charts.LINE,
    [
      { name: "AI basket", labels: ["Jan", "Feb", "Mar"], values: [100, 118, 134] },
      { name: "S&P 500",   labels: ["Jan", "Feb", "Mar"], values: [100, 104, 109] },
    ],
    lineOpts({ x: 0.5, y: 1.95, w: 4.3, h: 2.3 })
  );

  addChartTitle(s, "S&P 500 sector returns, YTD (%)", 5.2);
  s.addChart(pres.charts.BAR,
    [{
      name: "YTD %",
      labels: ["Tech", "Comms", "Cons Disc", "Industrials", "Energy", "Utilities", "Financials", "Staples"],
      values: [22, 17, 11, 7, 4, 3, 2, -1],
    }],
    barOpts({ x: 5.2, y: 1.95, w: 4.3, h: 2.3, catAxisLabelFontSize: 8 })
  );

  addSource(s, "Source: Strategy Research, illustrative reconstruction. Data through March 2026.", 0.5, 4.4, 9.0);
  addFooter(s, 5);
}

// ===================================================================
// SLIDE 6 — Leaders table
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "Ten names drive most of the move.");
  addSubhead(s, "The top-10 AI-exposed equities account for ~28% of S&P 500 cap and ~55% of YTD index return contribution.");

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 9, fontFace: "Arial", valign: "middle", color: C.darkGray, margin: 0.03 }, opts || {}) });

  const zebra = (i) => (i % 2 === 1 ? { fill: { color: C.offWhite } } : { fill: { color: C.white } });

  const rows = [
    ["NVDA",  "$4.2T", "+68%", "42x", "+39%"],
    ["MSFT",  "$3.9T", "+22%", "34x", "+14%"],
    ["GOOGL", "$2.6T", "+19%", "26x", "+11%"],
    ["META",  "$2.1T", "+24%", "27x", "+18%"],
    ["AMZN",  "$2.4T", "+15%", "38x", "+12%"],
    ["TSM",   "$1.3T", "+31%", "23x", "+28%"],
    ["AVGO",  "$1.1T", "+44%", "32x", "+26%"],
    ["AMD",   "$0.4T", "+36%", "41x", "+22%"],
    ["ORCL",  "$0.6T", "+18%", "28x", "+16%"],
    ["PLTR",  "$0.3T", "+52%", "96x", "+33%"],
  ];

  const tableData = [
    [hdr("Company"), hdr("Mkt Cap"), hdr("Rev Growth"), hdr("Forward P/E"), hdr("YTD Return")],
    ...rows.map((r, i) => {
      const z = zebra(i);
      return [
        cell(r[0], Object.assign({ bold: true, color: C.black }, z)),
        cell(r[1], z),
        cell(r[2], Object.assign({ color: C.green, bold: true }, z)),
        cell(r[3], z),
        cell(r[4], Object.assign({ color: C.orange, bold: true }, z)),
      ];
    }),
  ];

  s.addTable(tableData, {
    x: 0.5, y: 1.9, w: 9.0,
    colW: [1.3, 1.6, 1.8, 2.0, 2.3],
    rowH: 0.2,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
    align: "center",
    valign: "middle",
  });

  addSource(s, "Source: Strategy Research, company filings. Reconstructed illustrative figures as of March 2026.", 0.5, 4.45, 9.0);
  addFooter(s, 6);
}

// ===================================================================
// SLIDE 7 — Timeline
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "Three years. Six inflection points.");
  addSubhead(s, "A compressed history of the AI cycle — from the first consumer moment to the agentic phase shift.");

  const events = [
    { date: "Mar 2023", title: "GPT-4",            desc: "Foundation models break benchmarks; enterprise adoption starts.",       color: C.orange },
    { date: "Feb 2024", title: "Text-to-video",    desc: "Sora-class models land; media workflows reprice.",                      color: C.gold },
    { date: "Sep 2024", title: "Reasoning models", desc: "o1/Claude-class reasoners shift costs toward inference.",               color: C.teal },
    { date: "Jun 2025", title: "Agentic browsers", desc: "Agents that act, not answer, cross the utility threshold.",             color: C.pink },
    { date: "Nov 2025", title: "Physical AI",      desc: "Robotics/foundation-model fusion reaches pilot scale in logistics.",    color: C.green },
    { date: "Mar 2026", title: "Regulatory floor", desc: "US/EU frameworks finalize — compliance becomes a moat and a tax.",      color: C.red },
  ];

  const lineY = 2.5;
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: lineY, w: 8.6, h: 0,
    line: { color: C.darkGray, width: 3 },
  });

  const colW = 8.6 / events.length;
  events.forEach((ev, i) => {
    const cx = 0.7 + colW * (i + 0.5);
    // Dot
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.09, y: lineY - 0.09, w: 0.18, h: 0.18,
      fill: { color: ev.color }, line: { color: ev.color, width: 0 },
    });
    // Card
    const cardX = cx - colW * 0.48;
    const cardW = colW * 0.96;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: cardW, h: 1.5,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    // Left accent
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: 0.06, h: 1.5,
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
      x: cardX + 0.14, y: lineY + 0.9, w: cardW - 0.2, h: 0.82,
      fontSize: 8.5, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research. Illustrative milestones; dates compressed for narrative.", 0.5, 4.4, 9.0);
  addFooter(s, 7);
}

// ===================================================================
// SLIDE 8 — Section divider: MARKET SHIFTS
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET SHIFTS");
  addHeadline(s, "What the money is doing.");
  addSubhead(s, "Part two of four. The capex cycle, the concentration trade, and the multiples that support both.");

  s.addText("$620B", {
    x: 0.5, y: 1.95, w: 9.0, h: 1.6,
    fontSize: 140, color: C.orange, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
  });
  s.addText("Committed 2026 capex across the four largest US hyperscalers — 48% above 2024 and ~1.1% of US GDP.", {
    x: 1.0, y: 3.75, w: 8.0, h: 0.7,
    fontSize: 14, color: C.darkGray, bold: true, fontFace: "Arial", align: "center", valign: "top", margin: 0,
  });

  addSource(s, "Source: Strategy Research, company guidance (illustrative, reconstructed).", 0.5, 4.5, 9.0);
  addFooter(s, 8);
}

// ===================================================================
// SLIDE 9 — Capex surge big numbers
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET SHIFTS");
  addHeadline(s, "Capex is eating the cash flow.");
  addSubhead(s, "Hyperscaler spend now rivals mid-2010s oil-major investment cycles — but with steeper depreciation and shorter payback windows.");

  const stats = [
    { n: "$620B",  lbl: "2026E hyperscaler capex",       color: C.orange },
    { n: "+48%",   lbl: "YoY growth vs. 2024 actual",    color: C.orange },
    { n: "1.1%",   lbl: "of US GDP",                     color: C.gold },
    { n: "82 GW",  lbl: "new AI data-center power by '28", color: C.red },
  ];
  const y = 2.2, w = 2.05, gap = 0.25;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Takeaway: the AI capex cycle is real cash. Whether it earns an adequate return is the central debate of 2026.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Strategy Research, hyperscaler guidance, IEA power projections. Reconstructed illustrative figures.", 0.5, 4.45, 9.0);
  addFooter(s, 9);
}

// ===================================================================
// SLIDE 10 — Concentration dual-panel
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET SHIFTS");
  addHeadline(s, "Concentration is extreme.");
  addSubhead(s, "Top-5 names are 29% of the S&P 500 — wider than 1999, wider than 1972. Breadth is narrow, and narrowing.");

  addChartTitle(s, "Top-5 S&P 500 weight (%) — historical peaks", 0.5);
  s.addChart(pres.charts.BAR,
    [{
      name: "Top-5 %",
      labels: ["1972", "1999", "2020", "2024", "2026"],
      values: [24, 18, 22, 26, 29],
    }],
    barOpts({ x: 0.5, y: 1.95, w: 4.3, h: 2.3, chartColors: [C.red] })
  );

  addChartTitle(s, "Equal- vs. cap-weight S&P 500, YTD (%)", 5.2);
  s.addChart(pres.charts.BAR,
    [{
      name: "YTD %",
      labels: ["Cap-weight", "Equal-weight"],
      values: [9, 2],
    }],
    barOpts({ x: 5.2, y: 1.95, w: 4.3, h: 2.3, chartColors: [C.orange] })
  );

  addSource(s, "Source: Strategy Research, historical index data. Reconstructed illustrative figures.", 0.5, 4.4, 9.0);
  addFooter(s, 10);
}

// ===================================================================
// SLIDE 11 — Valuations stat cards on dark banner
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET SHIFTS");
  addHeadline(s, "Rich, but not 2000-rich.");
  addSubhead(s, "AI-complex multiples are rich versus the index, but PEG ratios remain anchored by real earnings growth.");

  // Dark banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 2.0, w: 10.0, h: 2.4,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("AI COMPLEX — KEY MULTIPLES", {
    x: 0.5, y: 2.15, w: 9.0, h: 0.3,
    fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 3, margin: 0,
  });

  const cards = [
    { n: "32x",  lbl: "Forward P/E",     sub: "vs. 21x for S&P 500",  accent: C.orange },
    { n: "1.4",  lbl: "PEG ratio",       sub: "in line with 10yr avg", accent: C.green },
    { n: "2.6%", lbl: "FCF yield",       sub: "below 3.4% index avg",  accent: C.gold },
    { n: "9.8x", lbl: "EV / NTM sales",  sub: "vs. 2000 peak of 22x",  accent: C.pink },
  ];
  const cardY = 2.55, cardW = 2.15, cardH = 1.65, gap = 0.15;
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
    s.addText(c.n, {
      x: x, y: cardY + 0.2, w: cardW, h: 0.7,
      fontSize: 34, color: c.accent, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(c.lbl, {
      x: x, y: cardY + 0.9, w: cardW, h: 0.3,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", margin: 0,
    });
    s.addText(c.sub, {
      x: x + 0.1, y: cardY + 1.22, w: cardW - 0.2, h: 0.4,
      fontSize: 8.5, color: "AAAAAA", fontFace: "Arial", align: "center", margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research, consensus estimates. Reconstructed illustrative figures.", 0.5, 4.5, 9.0);
  addFooter(s, 11);
}

// ===================================================================
// SLIDE 12 — Capex leaders side-by-side
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET SHIFTS");
  addHeadline(s, "Where the $620B lands.");
  addSubhead(s, "Five companies carry the bulk of 2026 AI infrastructure spend. The revenue that offsets it is still being underwritten.");

  const rows = [
    { n: "$115B", name: "Microsoft", desc: "Azure AI capacity build; OpenAI + enterprise demand." },
    { n: "$110B", name: "Amazon",    desc: "AWS chip + rack expansion; Anthropic compute commitments." },
    { n: "$95B",  name: "Meta",      desc: "Training clusters for Llama; Reality Labs compute." },
    { n: "$85B",  name: "Alphabet",  desc: "TPU fleet and Google Cloud infrastructure." },
    { n: "$55B",  name: "Nvidia",    desc: "Internal R&D, co-investments, and dedicated supply." },
  ];

  const startY = 2.0;
  const rowH = 0.48;
  rows.forEach((r, i) => {
    const y = startY + i * rowH;
    s.addText(r.n, {
      x: 0.6, y: y, w: 1.5, h: rowH - 0.05,
      fontSize: 22, color: C.orange, bold: true, fontFace: "Arial Black", align: "right", valign: "middle", margin: 0,
    });
    s.addText(r.name, {
      x: 2.25, y: y, w: 1.7, h: rowH - 0.05,
      fontSize: 13, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    });
    s.addText(r.desc, {
      x: 4.0, y: y, w: 5.5, h: rowH - 0.05,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
    // row divider
    if (i < rows.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: 0.6, y: y + rowH - 0.04, w: 8.9, h: 0,
        line: { color: C.lightGray, width: 0.5 },
      });
    }
  });

  addSource(s, "Source: Strategy Research, company capex guidance FY2026. Reconstructed illustrative figures.", 0.5, 4.5, 9.0);
  addFooter(s, 12);
}

// ===================================================================
// SLIDE 13 — Section divider: RISKS
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "The asymmetry is not free.");
  addSubhead(s, "Part three of four. Where the consensus could be wrong — and what the tape would look like if it is.");

  s.addText("29%", {
    x: 0.5, y: 1.95, w: 9.0, h: 1.6,
    fontSize: 160, color: C.red, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
  });
  s.addText("Share of the S&P 500 in the top five names. A single drawdown in AI leadership is now a drawdown in the whole index.", {
    x: 1.0, y: 3.75, w: 8.0, h: 0.7,
    fontSize: 14, color: C.darkGray, bold: true, fontFace: "Arial", align: "center", valign: "top", margin: 0,
  });

  addSource(s, "Source: Strategy Research. Reconstructed illustrative figures as of March 2026.", 0.5, 4.5, 9.0);
  addFooter(s, 13);
}

// ===================================================================
// SLIDE 14 — Bull vs. Bear (pro/con)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Both cases are honest.");
  addSubhead(s, "Bull vs. bear. The disagreement isn't about the technology — it's about when, and to whom, the cash flows show up.");

  // Left (green)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.9, w: 4.3, h: 0.4,
    fill: { color: C.green }, line: { color: C.green, width: 0 },
  });
  s.addText("BULL CASE", {
    x: 0.5, y: 1.9, w: 4.3, h: 0.4,
    fontSize: 12, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });
  s.addText([
    { text: "Productivity gains flow to margins (2026–28).",        options: { bullet: true, breakLine: true } },
    { text: "Inference monetization scales with agent deployments.", options: { bullet: true, breakLine: true } },
    { text: "Compute moat compounds — incumbents capture economics.", options: { bullet: true, breakLine: true } },
    { text: "Physical AI opens a second adoption S-curve.",          options: { bullet: true, breakLine: true } },
    { text: "EPS growth outpaces multiple compression risk.",        options: { bullet: true } },
  ], {
    x: 0.7, y: 2.45, w: 4.0, h: 1.85,
    fontSize: 11.5, color: C.darkGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 4,
  });

  // Right (red)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.9, w: 4.3, h: 0.4,
    fill: { color: C.red }, line: { color: C.red, width: 0 },
  });
  s.addText("BEAR CASE", {
    x: 5.2, y: 1.9, w: 4.3, h: 0.4,
    fontSize: 12, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });
  s.addText([
    { text: "Capex glut — ROICs compress before revenues materialize.", options: { bullet: true, breakLine: true } },
    { text: "Power and permitting cap effective compute growth.",         options: { bullet: true, breakLine: true } },
    { text: "Regulatory drag — US/EU frameworks slow deployment.",        options: { bullet: true, breakLine: true } },
    { text: "Circular financing unwinds (vendor → customer loops).",      options: { bullet: true, breakLine: true } },
    { text: "Concentration reverses — rotation into the other 495.",      options: { bullet: true } },
  ], {
    x: 5.4, y: 2.45, w: 4.0, h: 1.85,
    fontSize: 11.5, color: C.darkGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 4,
  });

  addSource(s, "Source: Strategy Research synthesis. Positions adapted from sell-side and buy-side consensus ranges.", 0.5, 4.45, 9.0);
  addFooter(s, 14);
}

// ===================================================================
// SLIDE 15 — Scenarios table
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Three 2026 scenarios.");
  addSubhead(s, "Base case assumes consensus EPS and flat multiples. Bull/bear move EPS and multiples together.");

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 10, fontFace: "Arial", align: "center", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 10, fontFace: "Arial", valign: "middle", align: "center", color: C.darkGray }, opts || {}) });

  const tableData = [
    [hdr("Metric"), hdr("Bear"), hdr("Base"), hdr("Bull")],

    [cell("S&P 500 2026E EPS",       { bold: true, color: C.black, align: "left", fill: { color: C.offWhite } }),
     cell("$245", { fill: { color: C.offWhite }, color: C.red,    bold: true }),
     cell("$275", { fill: { color: C.offWhite } }),
     cell("$298", { fill: { color: C.offWhite }, color: C.green,  bold: true })],

    [cell("Forward P/E",              { bold: true, color: C.black, align: "left" }),
     cell("17x", { color: C.red,    bold: true }),
     cell("21x"),
     cell("24x", { color: C.green,  bold: true })],

    [cell("S&P 500 YE 2026 level",    { bold: true, color: C.black, align: "left", fill: { color: C.offWhite } }),
     cell("4,165", { fill: { color: C.offWhite }, color: C.red,    bold: true }),
     cell("5,775", { fill: { color: C.offWhite } }),
     cell("7,150", { fill: { color: C.offWhite }, color: C.green,  bold: true })],

    [cell("Return from today",        { bold: true, color: C.black, align: "left" }),
     cell("-27%", { color: C.red,    bold: true }),
     cell("+1%"),
     cell("+25%", { color: C.green,  bold: true })],

    [cell("AI capex 2026E",           { bold: true, color: C.black, align: "left", fill: { color: C.offWhite } }),
     cell("$490B", { fill: { color: C.offWhite }, color: C.red,    bold: true }),
     cell("$620B", { fill: { color: C.offWhite } }),
     cell("$710B", { fill: { color: C.offWhite }, color: C.green,  bold: true })],
  ];

  s.addTable(tableData, {
    x: 0.5, y: 1.9, w: 9.0,
    colW: [3.6, 1.8, 1.8, 1.8],
    rowH: 0.4,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  addSource(s, "Source: Strategy Research scenario framework. All figures illustrative and for discussion.", 0.5, 4.55, 9.0);
  addFooter(s, 15);
}

// ===================================================================
// SLIDE 16 — Concentration / financing risk (big numbers)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Four numbers to watch.");
  addSubhead(s, "Specific, measurable, and — if they turn — fast-moving sources of risk in the current AI complex.");

  const stats = [
    { n: "87%",   lbl: "NVDA share of hyperscaler GPU spend", color: C.red },
    { n: "$180B", lbl: "vendor-customer financing loops",     color: C.red },
    { n: "$320B", lbl: "private credit AI / data-center AUM", color: C.gold },
    { n: "14 mo", lbl: "median AI infra payback assumption",  color: C.gold },
  ];
  const y = 2.2, w = 2.05, gap = 0.25;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.85, w: 9.0, h: 0.5,
    fill: { color: C.red }, line: { color: C.red, width: 0 },
  });
  s.addText("Takeaway: the tails are fatter than the headline multiples suggest. Size positions accordingly.", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.5,
    fontSize: 12.5, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Strategy Research, Preqin, company filings. Reconstructed illustrative figures.", 0.5, 4.45, 9.0);
  addFooter(s, 16);
}

// ===================================================================
// SLIDE 17 — Risk taxonomy three-column
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Three risk surfaces to watch.");
  addSubhead(s, "Each category moves through different indicators — and each has a different signal that the cycle is breaking.");

  const cols = [
    {
      x: 0.5, accent: C.gold,
      title: "MACRO",
      items: [
        "Long-end yields above 5% reprice long-duration growth.",
        "Dollar strength compresses overseas AI revenue.",
        "Recession risk collides with capex commitments.",
        "Power availability becomes binding constraint.",
      ],
    },
    {
      x: 3.6, accent: C.orange,
      title: "REGULATORY",
      items: [
        "US/EU AI liability frameworks shape deployment pace.",
        "Antitrust action on AI infrastructure bundling.",
        "Export controls on advanced chips tighten further.",
        "Data/copyright regimes force model retraining.",
      ],
    },
    {
      x: 6.7, accent: C.red,
      title: "COMPETITIVE",
      items: [
        "Open-source parity on key benchmarks erodes moats.",
        "Chinese model ecosystem undercuts on price.",
        "Vertical-specific AI rewrites enterprise software TAMs.",
        "Agent platforms disintermediate SaaS incumbents.",
      ],
    },
  ];

  cols.forEach((col) => {
    // Header bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.9, w: 2.8, h: 0.4,
      fill: { color: col.accent }, line: { color: col.accent, width: 0 },
    });
    s.addText(col.title, {
      x: col.x, y: 1.9, w: 2.8, h: 0.4,
      fontSize: 12, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 3, margin: 0,
    });
    // Column body
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 2.3, w: 2.8, h: 2.0,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.items.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < col.items.length - 1 },
    })), {
      x: col.x + 0.15, y: 2.4, w: 2.55, h: 1.85,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 4,
    });
  });

  addSource(s, "Source: Strategy Research taxonomy. Illustrative, not exhaustive.", 0.5, 4.4, 9.0);
  addFooter(s, 17);
}

// ===================================================================
// SLIDE 18 — Section divider: FRONTIER
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "What comes next.");
  addSubhead(s, "Part four of four. The categories where the next decade of compounding happens — and where the next surprises come from.");

  s.addText("3", {
    x: 0.5, y: 1.95, w: 9.0, h: 1.6,
    fontSize: 200, color: C.pink, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
  });
  s.addText("Frontiers that matter: agentic, physical, and scientific AI. Each rewires a different slice of the economy.", {
    x: 1.0, y: 3.75, w: 8.0, h: 0.7,
    fontSize: 14, color: C.darkGray, bold: true, fontFace: "Arial", align: "center", valign: "top", margin: 0,
  });

  addSource(s, "Source: Strategy Research framework.", 0.5, 4.5, 9.0);
  addFooter(s, 18);
}

// ===================================================================
// SLIDE 19 — Frontier themes three-column
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Three frontiers to watch.");
  addSubhead(s, "Agentic is scaling now. Physical is crossing from pilot to pilot-fleet. Scientific is early but compounding fast.");

  const cols = [
    {
      x: 0.5, accent: C.orange,
      title: "AGENTIC AI",
      tag: "Now → 2027",
      items: [
        "Browser agents complete multi-step tasks end-to-end.",
        "Enterprise agents replace outsourced workflows.",
        "Revenue scales with inference, not seats.",
      ],
      stat: "$85B",
      statLbl: "2026E agent revenue",
    },
    {
      x: 3.6, accent: C.green,
      title: "PHYSICAL AI",
      tag: "2026 → 2029",
      items: [
        "Foundation models + robotics enter logistics at scale.",
        "Humanoid pilots in manufacturing, warehouse, retail.",
        "New TAM — blue-collar workflows, trillion-dollar scale.",
      ],
      stat: "42k",
      statLbl: "units deployed in pilots",
    },
    {
      x: 6.7, accent: C.pink,
      title: "SCIENTIFIC AI",
      tag: "2027 → 2030",
      items: [
        "AI-native drug discovery shortens development cycles.",
        "Materials design + fusion modeling accelerate.",
        "Compounds the returns to compute in new industries.",
      ],
      stat: "11",
      statLbl: "AI-discovered Phase II drugs",
    },
  ];

  cols.forEach((col) => {
    // Header bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.9, w: 2.8, h: 0.4,
      fill: { color: col.accent }, line: { color: col.accent, width: 0 },
    });
    s.addText(col.title, {
      x: col.x, y: 1.9, w: 2.8, h: 0.4,
      fontSize: 12, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 3, margin: 0,
    });
    // Body
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 2.3, w: 2.8, h: 2.0,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.tag, {
      x: col.x + 0.15, y: 2.38, w: 2.55, h: 0.28,
      fontSize: 9, color: col.accent, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
    });
    s.addText(col.items.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < col.items.length - 1 },
    })), {
      x: col.x + 0.15, y: 2.68, w: 2.55, h: 1.1,
      fontSize: 9.5, color: C.darkGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 3,
    });
    // Stat footer in card
    s.addShape(pres.shapes.LINE, {
      x: col.x + 0.15, y: 3.85, w: 2.5, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.stat, {
      x: col.x + 0.15, y: 3.9, w: 1.2, h: 0.35,
      fontSize: 20, color: col.accent, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
    });
    s.addText(col.statLbl, {
      x: col.x + 1.35, y: 3.94, w: 1.35, h: 0.3,
      fontSize: 8.5, color: C.medGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research. Reconstructed illustrative figures.", 0.5, 4.4, 9.0);
  addFooter(s, 19);
}

// ===================================================================
// SLIDE 20 — Watch list timeline
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "What to watch, 2026–2028.");
  addSubhead(s, "Specific, datable catalysts. Positions should be right-sized to their asymmetry.");

  const events = [
    { date: "Q2 2026",  title: "Agent revenue disclosure",   desc: "Hyperscalers begin breaking out agent-related revenue lines.",           color: C.orange },
    { date: "Q4 2026",  title: "Humanoid pilot-to-fleet",    desc: "First humanoid programs cross 10k-unit deployment thresholds.",           color: C.green },
    { date: "Q1 2027",  title: "AI capex peak watch",        desc: "First signs of capex growth moderation across the big four.",             color: C.gold },
    { date: "Q3 2027",  title: "Power build completion",     desc: "Major new data-center campuses come online; bottleneck eases.",           color: C.teal },
    { date: "Q1 2028",  title: "Frontier model regulation",  desc: "Regulatory frameworks fully in force across US/EU/UK jurisdictions.",     color: C.red },
    { date: "Q4 2028",  title: "AI-discovered drug approval",desc: "First fully AI-designed drug reaches regulatory approval milestone.",      color: C.pink },
  ];

  const lineY = 2.5;
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: lineY, w: 8.6, h: 0,
    line: { color: C.darkGray, width: 3 },
  });

  const colW = 8.6 / events.length;
  events.forEach((ev, i) => {
    const cx = 0.7 + colW * (i + 0.5);
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.09, y: lineY - 0.09, w: 0.18, h: 0.18,
      fill: { color: ev.color }, line: { color: ev.color, width: 0 },
    });
    const cardX = cx - colW * 0.48;
    const cardW = colW * 0.96;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: cardW, h: 1.5,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX, y: lineY + 0.22, w: 0.06, h: 1.5,
      fill: { color: ev.color }, line: { color: ev.color, width: 0 },
    });
    s.addText(ev.date, {
      x: cardX + 0.14, y: lineY + 0.3, w: cardW - 0.2, h: 0.25,
      fontSize: 8.5, color: C.medGray, fontFace: "Arial", margin: 0,
    });
    s.addText(ev.title, {
      x: cardX + 0.14, y: lineY + 0.55, w: cardW - 0.2, h: 0.32,
      fontSize: 11, color: C.black, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(ev.desc, {
      x: cardX + 0.14, y: lineY + 0.9, w: cardW - 0.2, h: 0.82,
      fontSize: 8.5, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research watch list. Illustrative catalysts, not forecasts.", 0.5, 4.4, 9.0);
  addFooter(s, 20);
}

// ===================================================================
// SLIDE 21 — Summary takeaways table
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Four currents, four calls.");
  addSubhead(s, "What we see, and what it means for positioning in the next twelve months.");

  const hdr = (t) => ({ text: t, options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 10, fontFace: "Arial", align: "left", valign: "middle" } });
  const cell = (t, opts) => ({ text: t, options: Object.assign({ fontSize: 10, fontFace: "Arial", valign: "middle", align: "left", color: C.darkGray }, opts || {}) });

  const tint = {
    land:   "E6F5F5",
    shift:  "FEE9E0",
    risk:   "FDECEC",
    front:  "FCE5EE",
  };

  const tableData = [
    [hdr("Theme"), hdr("What we see"), hdr("Implication")],

    [cell("LANDSCAPE",    { bold: true, color: C.teal,   fill: { color: tint.land },  charSpacing: 2 }),
     cell("AI is now an index exposure — ten names = 28% of cap.",  { fill: { color: tint.land } }),
     cell("Underweight AI = active call; rebalance discipline matters.", { fill: { color: tint.land }, bold: true, color: C.black })],

    [cell("MARKET SHIFTS",{ bold: true, color: C.orange, fill: { color: tint.shift }, charSpacing: 2 }),
     cell("$620B capex cycle, 29% top-5 concentration, rich multiples.", { fill: { color: tint.shift } }),
     cell("Barbell: own leaders, hedge with equal-weight and breadth.",   { fill: { color: tint.shift }, bold: true, color: C.black })],

    [cell("RISKS",        { bold: true, color: C.red,    fill: { color: tint.risk },  charSpacing: 2 }),
     cell("Circular financing, power limits, regulatory drag.",           { fill: { color: tint.risk } }),
     cell("Size positions to asymmetry; price tail hedges cheaply now.",  { fill: { color: tint.risk }, bold: true, color: C.black })],

    [cell("FRONTIER",     { bold: true, color: C.pink,   fill: { color: tint.front }, charSpacing: 2 }),
     cell("Agentic now, physical next, scientific compounds later.",       { fill: { color: tint.front } }),
     cell("Stage exposure by clock; don't pay for 2030 at 2026 multiples.", { fill: { color: tint.front }, bold: true, color: C.black })],
  ];

  s.addTable(tableData, {
    x: 0.5, y: 1.85, w: 9.0,
    colW: [1.8, 3.8, 3.4],
    rowH: 0.42,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addText("Base case: modest positive returns, higher dispersion, and a premium on position sizing discipline.", {
    x: 0.5, y: 4.05, w: 9.0, h: 0.32,
    fontSize: 12, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Strategy Research synthesis. All figures illustrative.", 0.5, 4.45, 9.0);
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
    { text: "Figures, charts, and company-level statistics throughout this deck are reconstructed illustrative estimates compiled for narrative purposes. They are not claimed to match any specific data source, consensus estimate, or company disclosure. Do not rely on them for investment decisions.", options: { breakLine: true } },
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

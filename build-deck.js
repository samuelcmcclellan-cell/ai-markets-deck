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
  purple:    "6B46C1",
  teal:      "008B8B",
  red:       "CC0000",
  navy:      "051A3D",
};

const THEMES = {
  LANDSCAPE: { color: C.teal,   textColor: C.white },
  MARKET:    { color: C.gold,   textColor: C.black },
  SHIFTS:    { color: C.orange, textColor: C.black },
  RISKS:     { color: C.red,    textColor: C.white },
  FRONTIER:  { color: C.purple, textColor: C.white },
};

// 4:3 canvas anchors — everything below the headline rule reflows against these.
const FOOTER_Y = 6.875;
const SOURCE_Y = 6.425;

// ---------- Top-20 global companies by market cap (as of Apr 22, 2026) ----------
// Columns: ticker, company, sector, mcap ($B), rev26 ($B), rev27 ($B), pe (forward, 2026E)
// Sector split: Tech = semis, hardware, software, internet platforms, cloud. Everything
// else Non-Tech, including Tesla (auto), Visa (payments), Aramco (energy).
// Sources (all retrieved Apr 22, 2026 — one trading day off the target date of Apr 17):
//   - Market caps: companiesmarketcap.com
//   - US-listed consensus rev + fwd P/E: stockanalysis.com/stocks/{ticker}/forecast/
//   - Saudi Aramco: 2025 actual $448.6B TTM (companiesmarketcap.com); 2026E $497B
//     company guidance; P/E TTM 17.0 (companiesmarketcap.com)
//   - Samsung 005930.KS: 2026 consensus ~₩348T (Quartr, SiliconANGLE Q1 2026); fwd P/E
//     from P/E TTM 39.7 (Mar 2026 SiliconANGLE) scaled to fwd earnings — treat as Med
//     confidence.
//   - SK Hynix 000660.KS: FY2026 consensus ~₩100T (annualized Q1 2026 ₩24.6T × 4 +
//     memory supercycle ramp); P/E fwd 4.49 (gurufocus, Apr 5 2026).
//   - Tencent 0700.HK: 2026 consensus CNY 834B (Simply Wall St); fwd P/E 14.15 (same).
//   - TSMC: 2026 consensus $161B (Zacks Research Mar 2026). FY27 derived from mgmt
//     commentary of sustained 20-22% USD growth through 2027.
//   - ASML: consensus in EUR (€38.5B 2026, €46.0B 2027), converted at ~1.07 USD/EUR.
// Clipping: NVDA growth 73% and AVGO 54% are clipped at the +50% chart edge and labeled
// with their true value. TSLA P/E 190× is clipped at 50 and labeled with true value.
const TOP20 = [
  { ticker: "NVDA",  company: "NVIDIA",    sector: "Tech",     mcap: 4921, rev26: 216,  rev27: 374,  pe:  24.0 },
  { ticker: "GOOGL", company: "Alphabet",  sector: "Tech",     mcap: 4085, rev26: 487,  rev27: 561,  pe:  28.7 },
  { ticker: "AAPL",  company: "Apple",     sector: "Tech",     mcap: 4015, rev26: 475,  rev27: 508,  pe:  31.5 },
  { ticker: "MSFT",  company: "Microsoft", sector: "Tech",     mcap: 3217, rev26: 335,  rev27: 387,  pe:  25.6 },
  { ticker: "AMZN",  company: "Amazon",    sector: "Tech",     mcap: 2746, rev26: 822,  rev27: 919,  pe:  32.1 },
  { ticker: "TSM",   company: "TSMC",      sector: "Tech",     mcap: 2009, rev26: 161,  rev27: 196,  pe:  26.5 },
  { ticker: "AVGO",  company: "Broadcom",  sector: "Tech",     mcap: 2003, rev26: 107,  rev27: 165,  pe:  36.7 },
  { ticker: "ARMCO", company: "S. Aramco", sector: "Non-Tech", mcap: 1758, rev26: 497,  rev27: 500,  pe:  17.0 },
  { ticker: "META",  company: "Meta",      sector: "Tech",     mcap: 1712, rev26: 255,  rev27: 302,  pe:  22.2 },
  { ticker: "TSLA",  company: "Tesla",     sector: "Non-Tech", mcap: 1454, rev26: 105,  rev27: 122,  pe: 189.9 },
  { ticker: "WMT",   company: "Walmart",   sector: "Non-Tech", mcap: 1036, rev26: 713,  rev27: 756,  pe:  44.2 },
  { ticker: "BRK.B", company: "Berkshire", sector: "Non-Tech", mcap: 1003, rev26: 368,  rev27: 380,  pe:  21.6 },
  { ticker: "005930",company: "Samsung",   sector: "Tech",     mcap:  977, rev26: 320,  rev27: 345,  pe:  20.0 },
  { ticker: "JPM",   company: "JPMorgan",  sector: "Non-Tech", mcap:  844, rev26: 199,  rev27: 208,  pe:  14.3 },
  { ticker: "LLY",   company: "Eli Lilly", sector: "Non-Tech", mcap:  825, rev26:  83,  rev27:  96,  pe:  26.4 },
  { ticker: "XOM",   company: "Exxon",     sector: "Non-Tech", mcap:  621, rev26: 377,  rev27: 365,  pe:  18.8 },
  { ticker: "V",     company: "Visa",      sector: "Non-Tech", mcap:  600, rev26:  46,  rev27:  50,  pe:  23.7 },
  { ticker: "TCEHY", company: "Tencent",   sector: "Tech",     mcap:  583, rev26: 115,  rev27: 127,  pe:  14.2 },
  { ticker: "000660",company: "SK Hynix",  sector: "Tech",     mcap:  574, rev26:  72,  rev27:  90,  pe:   5.0 },
  { ticker: "ASML",  company: "ASML",      sector: "Tech",     mcap:  567, rev26:  41,  rev27:  49,  pe:  40.8 },
].map(c => Object.assign(c, { growth: (c.rev27 / c.rev26 - 1) * 100 }));

// Medians drive the payoff band.
function _median(arr) {
  const s = arr.slice().sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}
const TECH     = TOP20.filter(c => c.sector === "Tech");
const NONTECH  = TOP20.filter(c => c.sector === "Non-Tech");
const MED_TECH_PE     = _median(TECH.map(c => c.pe));         // 26.05
const MED_TECH_GROW   = _median(TECH.map(c => c.growth));     // 17.03
const MED_NONTECH_PE  = _median(NONTECH.map(c => c.pe));      // 22.65
const MED_NONTECH_GROW= _median(NONTECH.map(c => c.growth));  //  5.26

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
// SLIDE 1 — Cover (minimal: wordmark + date only)
// ===================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.yellow };

  // Short orange accent rule anchoring the wordmark
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.05, w: 1.1, h: 0.14,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });

  // Wordmark — huge, centered vertically on the canvas
  s.addText("AI Markets", {
    x: 0.5, y: 3.35, w: 9.0, h: 1.5,
    fontSize: 88, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });

  // Date
  s.addText("May 2026", {
    x: 0.5, y: 4.85, w: 9.0, h: 0.5,
    fontSize: 22, color: C.black, fontFace: "Arial", valign: "top", margin: 0,
  });

  addFooter(s, "");
}

// ===================================================================
// SLIDE 2 — Table of contents (clean vertical list)
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Contents.");
  addHeadlineRule(s);

  const items = [
    { n: "01", label: "LANDSCAPE", accent: C.teal,   pages: "3 – 6"  },
    { n: "02", label: "MARKET",    accent: C.gold,   pages: "7 – 10" },
    { n: "03", label: "SHIFTS",    accent: C.orange, pages: "11 – 12" },
    { n: "04", label: "RISKS",     accent: C.red,    pages: "13 – 16" },
    { n: "05", label: "FRONTIER",  accent: C.purple, pages: "17 – 20" },
    { n: "06", label: "TAKEAWAYS", accent: C.black,  pages: "21"      },
  ];

  const rowY0 = 1.9, rowH = 0.72, rowW = 9.0, rowX = 0.5;
  items.forEach((it, i) => {
    const y = rowY0 + i * rowH;
    // Accent block on the left
    s.addShape(pres.shapes.RECTANGLE, {
      x: rowX, y: y, w: 0.12, h: rowH - 0.08,
      fill: { color: it.accent }, line: { color: it.accent, width: 0 },
    });
    // Section number
    s.addText(it.n, {
      x: rowX + 0.3, y: y, w: 0.9, h: rowH - 0.08,
      fontSize: 22, color: it.accent, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
    });
    // Section name
    s.addText(it.label, {
      x: rowX + 1.3, y: y, w: 6.5, h: rowH - 0.08,
      fontSize: 22, color: C.black, bold: true, fontFace: "Arial Black", valign: "middle", charSpacing: 3, margin: 0,
    });
    // Page range
    s.addText(it.pages, {
      x: rowX + 7.5, y: y, w: 1.5, h: rowH - 0.08,
      fontSize: 14, color: C.medGray, fontFace: "Arial", align: "right", valign: "middle", margin: 0,
    });
    // Divider line below each row (except last)
    if (i < items.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: rowX + 0.3, y: y + rowH - 0.04, w: rowW - 0.3, h: 0,
        line: { color: C.lightGray, width: 0.5 },
      });
    }
  });

  addSource(s, "Source: Strategy Research. 21 slides, read top to bottom.");
  addFooter(s, 2);
}

// ===================================================================
// SLIDE 3 — Why AI matters to markets (LANDSCAPE hero)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "Why AI matters to markets.");
  addHeadlineRule(s);

  const points = [
    {
      n: "01",
      title: "The largest capex cycle in history.",
      body: "Big 5 hyperscalers are pouring roughly $750B into AI infrastructure in 2026 alone — more than the entire US energy buildout at its peak.",
      accent: C.orange,
    },
    {
      n: "02",
      title: "It touches every layer of the economy.",
      body: "From raw silicon and power generation through data centers, models, and the apps on your phone — AI is now the connective tissue of modern business.",
      accent: C.teal,
    },
    {
      n: "03",
      title: "It is repricing everything — in both directions.",
      body: "The same wave that lifts semis, memory, and power is cracking software seat models, content moats, and legacy services. Winners and losers, inside one theme.",
      accent: C.gold,
    },
  ];

  const y0 = 1.95, rowH = 1.45, rowX = 0.5, rowW = 9.0;
  points.forEach((p, i) => {
    const y = y0 + i * rowH;
    // Big number block
    s.addShape(pres.shapes.RECTANGLE, {
      x: rowX, y: y, w: 1.2, h: rowH - 0.2,
      fill: { color: p.accent }, line: { color: p.accent, width: 0 },
    });
    s.addText(p.n, {
      x: rowX, y: y, w: 1.2, h: rowH - 0.2,
      fontSize: 42, color: C.white, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
    });
    // Title
    s.addText(p.title, {
      x: rowX + 1.45, y: y + 0.05, w: rowW - 1.45, h: 0.45,
      fontSize: 18, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
    });
    // Body
    s.addText(p.body, {
      x: rowX + 1.45, y: y + 0.55, w: rowW - 1.45, h: rowH - 0.75,
      fontSize: 12.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addSource(s, "Sources: CreditSights / MUFG hyperscaler capex 2026 estimates; Jensen Huang (Sept 2025); Strategy Research.");
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
// SLIDE 5 — The AI stack (11 layers, clean grouped visual)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "LANDSCAPE");
  addHeadline(s, "The AI stack.");
  addHeadlineRule(s);

  // Left rail — group labels
  const groups = [
    { label: "USER",       y: 1.75, h: 1.2, color: C.orange },
    { label: "COMPUTE",    y: 3.0,  h: 1.2, color: C.gold   },
    { label: "SILICON",    y: 4.25, h: 1.2, color: C.teal   },
    { label: "MATERIALS",  y: 5.5,  h: 0.8, color: C.medGray },
  ];
  groups.forEach(g => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: g.y, w: 0.28, h: g.h,
      fill: { color: g.color }, line: { color: g.color, width: 0 },
    });
    s.addText(g.label, {
      x: 0.85, y: g.y, w: 1.4, h: g.h,
      fontSize: 10, color: g.color, bold: true, fontFace: "Arial", valign: "middle", charSpacing: 3, margin: 0,
    });
  });

  const layers = [
    { name: "Agents",        desc: "Autonomous AI that acts on your behalf",      color: C.orange, y: 1.80 },
    { name: "Apps",          desc: "Products built on foundation models",         color: C.orange, y: 2.20 },
    { name: "Models",        desc: "The intelligence layer",                      color: C.orange, y: 2.60 },
    { name: "Data centers",  desc: "Warehouses of compute",                       color: C.gold,   y: 3.05 },
    { name: "Power",         desc: "The hidden constraint",                       color: C.gold,   y: 3.45 },
    { name: "Networking",    desc: "Moving data at terabit speed",                color: C.gold,   y: 3.85 },
    { name: "Packaging",     desc: "Stacking chiplets (CoWoS, HBM)",              color: C.teal,   y: 4.30 },
    { name: "Chip design",   desc: "GPUs, TPUs, ASICs",                           color: C.teal,   y: 4.70 },
    { name: "Foundry",       desc: "Fabricating at nanometer scale",              color: C.teal,   y: 5.10 },
    { name: "Equipment",     desc: "Machines that make machines",                 color: C.medGray,y: 5.55 },
    { name: "Raw materials", desc: "Silicon, neon, rare earths",                  color: C.medGray,y: 5.95 },
  ];

  layers.forEach((l) => {
    // Row background (alternating subtle tint)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 2.3, y: l.y, w: 7.2, h: 0.35,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.3 },
    });
    // Colored dot
    s.addShape(pres.shapes.OVAL, {
      x: 2.45, y: l.y + 0.1, w: 0.15, h: 0.15,
      fill: { color: l.color }, line: { color: l.color, width: 0 },
    });
    s.addText(l.name, {
      x: 2.7, y: l.y, w: 2.3, h: 0.35,
      fontSize: 12, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    });
    s.addText(l.desc, {
      x: 5.0, y: l.y, w: 4.4, h: 0.35,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  addSource(s, "Source: Strategy Research. Ordered top (closest to user) to bottom (closest to atoms).");
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
// SLIDE 7 — Semiconductor primer (market structure, 6 categories)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Inside the $975B chip market.");
  addSubhead(s, "Six categories of silicon. Memory and logic take 68% of the market — and virtually all of the AI capex. Logic isn't just CPUs: GPUs, AI accelerators, ASICs, FPGAs, and networking chips all live here.");
  addHeadlineRule(s);

  // ---- Market-share stacked bar (visual scale) ----
  const segments = [
    { name: "MEMORY",    pct: 38, color: C.gold,    label: "MEMORY 38%",    labelColor: C.black },
    { name: "LOGIC",     pct: 30, color: C.orange,  label: "LOGIC 30%",     labelColor: C.white },
    { name: "PROCESSORS",pct: 11, color: C.teal,    label: "MPU/MCU 11%",   labelColor: C.white },
    { name: "ANALOG",    pct: 10, color: C.navy,    label: "ANALOG 10%",    labelColor: C.white },
    { name: "SENSORS",   pct:  6, color: C.green,   label: "",              labelColor: C.white },
    { name: "DISCRETE",  pct:  5, color: C.medGray, label: "",              labelColor: C.white },
  ];
  const BAR_X = 0.5, BAR_Y = 1.85, BAR_W = 9.0, BAR_H = 0.45;
  let cx = BAR_X;
  segments.forEach(seg => {
    const w = BAR_W * (seg.pct / 100);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: BAR_Y, w: w, h: BAR_H,
      fill: { color: seg.color }, line: { color: seg.color, width: 0 },
    });
    if (seg.label) {
      s.addText(seg.label, {
        x: cx, y: BAR_Y, w: w, h: BAR_H,
        fontSize: 10, color: seg.labelColor, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 1, margin: 0,
      });
    }
    cx += w;
  });
  s.addText("$975B total semiconductor market, 2026E", {
    x: 0.5, y: 2.32, w: 9.0, h: 0.22,
    fontSize: 8.5, color: C.medGray, italic: true, fontFace: "Arial", align: "right", margin: 0,
  });

  // ---- Six category cards (2 rows × 3 cols) ----
  const types = [
    { name: "LOGIC",            share: "$295B", pct: "30%", desc: "GPUs, AI accelerators, ASICs, FPGAs, networking ICs — where computation happens",     players: "NVIDIA · AMD · Broadcom · TSMC",    color: C.orange },
    { name: "MEMORY",           share: "$371B", pct: "38%", desc: "DRAM, HBM, NAND, NOR — stores data and feeds logic at terabit speeds",               players: "SK Hynix · Samsung · Micron",        color: C.gold },
    { name: "PROCESSORS",       share: "$107B", pct: "11%", desc: "CPUs and application processors — general-purpose silicon in phones and PCs",        players: "Intel · AMD · Apple · Qualcomm",     color: C.teal },
    { name: "ANALOG",           share: "$98B",  pct: "10%", desc: "Power management, RF, data converters — the bridge between silicon and the real world", players: "TI · Analog Devices · Infineon",     color: C.navy },
    { name: "SENSORS + OPTO",   share: "$58B",  pct: "6%",  desc: "CMOS image sensors, MEMS, LEDs, photonics — how chips see, hear, and communicate",   players: "Sony · Samsung · STMicro",            color: C.green },
    { name: "DISCRETE + POWER", share: "$48B",  pct: "5%",  desc: "SiC, GaN, power transistors — heavy-current switching for EVs, grids, and industrial", players: "Infineon · ON Semi · Wolfspeed",      color: C.medGray },
  ];
  const GRID_X = 0.5, GRID_Y = 2.65;
  const cardW = 2.90, cardH = 1.44, hgap = 0.15, vgap = 0.10;

  types.forEach((t, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = GRID_X + col * (cardW + hgap);
    const y = GRID_Y + row * (cardH + vgap);

    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: cardH,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: cardW, h: 0.3,
      fill: { color: t.color }, line: { color: t.color, width: 0 },
    });
    s.addText(t.name, {
      x: x, y: y, w: cardW, h: 0.3,
      fontSize: 10, color: t.color === C.gold ? C.black : C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    // Share + pct row
    s.addText([
      { text: t.share,       options: { fontSize: 17, color: C.black,   bold: true, fontFace: "Arial Black" } },
      { text: "   " + t.pct, options: { fontSize: 11, color: C.medGray, fontFace: "Arial" } },
    ], {
      x: x, y: y + 0.38, w: cardW, h: 0.32, align: "center", valign: "middle", margin: 0,
    });
    // Description
    s.addText(t.desc, {
      x: x + 0.14, y: y + 0.78, w: cardW - 0.28, h: 0.42,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "top", align: "center", margin: 0,
    });
    // Players divider + line
    s.addShape(pres.shapes.LINE, {
      x: x + 0.2, y: y + cardH - 0.28, w: cardW - 0.4, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(t.players, {
      x: x, y: y + cardH - 0.26, w: cardW, h: 0.22,
      fontSize: 7.5, color: C.medGray, italic: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
    });
  });

  // Bottom payoff banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.75, w: 9.0, h: 0.45,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Memory + logic = ~$666B, or 68% of the market — and where virtually every dollar of AI capex lands.", {
    x: 0.7, y: 5.75, w: 8.6, h: 0.45,
    fontSize: 12, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: WSTS Fall 2025 forecast ($975B 2026E); SIA market-structure breakdown; company 10-Ks; TrendForce memory data. Segment shares rounded.");
  addFooter(s, 7);
}

// ===================================================================
// SLIDE 8 — Power (MARKET, NEW)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Power is the new bottleneck.");
  addSubhead(s, "A single hyperscale AI campus now draws as much electricity as a mid-sized city. The grid, not the chip, is starting to set the pace of buildouts.");
  addHeadlineRule(s);

  // Three stat cards
  const stats = [
    { n: "~12%", lbl: "of US electricity demand will go to data centers by 2028 — up from ~4% in 2023", color: C.orange },
    { n: "1 GW",  lbl: "typical new AI campus — the draw of ~750K US homes",                             color: C.orange },
    { n: "~5 yr", lbl: "avg wait for a new grid interconnection in PJM & ERCOT",                         color: C.red },
  ];
  const y = 2.1, w = 2.85, gap = 0.2;
  const totalW = stats.length * w + (stats.length - 1) * gap;
  const startX = (10 - totalW) / 2;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, startX + i * (w + gap), y, w, st.color);
  });

  // Three power-source columns
  const cols = [
    { title: "GAS",      color: C.gold,   body: "Fastest to build, dispatchable. New CCGT contracts up sharply; GE Vernova backlog at record highs.", players: "GE Vernova · Siemens Energy" },
    { title: "NUCLEAR",  color: C.teal,   body: "Three Mile Island reopening for Microsoft. SMRs (Oklo, X-Energy) signed to hyperscaler PPAs.",      players: "Constellation · Oklo · NuScale" },
    { title: "RENEWABLES + STORAGE", color: C.green, body: "Solar + battery hybrids now the cheapest new capacity. Hyperscalers signing 24/7 PPAs.", players: "NextEra · AES · Fluence" },
  ];
  cols.forEach((col, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 3.8, w: 2.95, h: 0.4,
      fill: { color: col.color }, line: { color: col.color, width: 0 },
    });
    s.addText(col.title, {
      x: x, y: 3.8, w: 2.95, h: 0.4,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 4.2, w: 2.95, h: 1.55,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.body, {
      x: x + 0.15, y: 4.3, w: 2.65, h: 1.05,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.15, y: 5.38, w: 2.65, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(col.players, {
      x: x + 0.15, y: 5.45, w: 2.65, h: 0.25,
      fontSize: 8.5, color: C.medGray, italic: true, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  // Bottom payoff banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.9, w: 9.0, h: 0.45,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("GPUs are useless without electrons. Power names are trading like semis.", {
    x: 0.7, y: 5.9, w: 8.6, h: 0.45,
    fontSize: 12.5, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: EPRI (US data-center load forecast, 2024); DOE; Lawrence Berkeley National Lab; Microsoft / Constellation TMI announcement (Sep 2024); PJM, ERCOT interconnection queues.");
  addFooter(s, 8);
}

// ===================================================================
// SLIDE 9 — The labs (private valuations)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "The labs.");
  addSubhead(s, "Two independent private labs, one public giant, and xAI — now inside SpaceX after February's $1.25T all-stock merger.");
  addHeadlineRule(s);

  const rows = [
    { name: "OpenAI",    logo: "logos/openai.png",    val: "$852B",  mult: "~35× ARR",  event: "$122B round · AMZN / NVDA / SoftBank · Apr 2026" },
    { name: "Anthropic", logo: "logos/anthropic.png", val: "$380B",  mult: "~13× ARR",  event: "$30B Series G (Feb); VCs now offering $800B+" },
    { name: "Google",    logo: "logos/google.png",    val: "$2.3T",  mult: "~20× P/E",  event: "Alphabet (public) · Gemini 3 / DeepMind · ~$85B 2026 capex" },
    { name: "xAI / SpaceX", logo: "logos/xai.png",    val: "$1.25T", mult: "combined",  event: "All-stock merger closed Feb 2, 2026 — xAI now a SpaceX subsidiary" },
  ];

  // Larger, airier layout — each row is its own card with more breathing room
  const TABLE_X = 0.5, TABLE_Y = 1.85, ROW_H = 0.88, LOGO_SIZE = 0.55;
  rows.forEach((r, i) => {
    const y = TABLE_Y + i * ROW_H;
    // Zebra background
    s.addShape(pres.shapes.RECTANGLE, {
      x: TABLE_X, y: y, w: 9.0, h: ROW_H - 0.05,
      fill: { color: i % 2 === 1 ? C.offWhite : C.white },
      line: { color: C.lightGray, width: 0.5 },
    });
    // Logo
    s.addImage({
      path: r.logo,
      x: TABLE_X + 0.2,
      y: y + (ROW_H - LOGO_SIZE) / 2 - 0.025,
      w: LOGO_SIZE, h: LOGO_SIZE,
      sizing: { type: "contain", w: LOGO_SIZE, h: LOGO_SIZE },
    });
    // Name
    s.addText(r.name, {
      x: TABLE_X + 0.95, y: y, w: 2.0, h: ROW_H - 0.05,
      fontSize: 15, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    });
    // Valuation
    s.addText(r.val, {
      x: TABLE_X + 3.0, y: y, w: 1.4, h: ROW_H - 0.05,
      fontSize: 20, color: C.orange, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
    });
    // Multiple
    s.addText(r.mult, {
      x: TABLE_X + 4.4, y: y, w: 1.3, h: ROW_H - 0.05,
      fontSize: 12, color: C.medGray, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
    });
    // Event
    s.addText(r.event, {
      x: TABLE_X + 5.8, y: y, w: 3.1, h: ROW_H - 0.05,
      fontSize: 11, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.65, w: 9.0, h: 0.6,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Q1 2026 funding to foundational AI startups was 2× all of 2025.", {
    x: 0.7, y: 5.65, w: 8.6, h: 0.6,
    fontSize: 14, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: TechCrunch, CNBC (Feb 2, 2026 xAI/SpaceX merger); Crunchbase Q1 2026 VC data; Sacra ARR run-rates; Bloomberg; Alphabet 10-K & 2026 capex guide.");
  addFooter(s, 9);
}

// ===================================================================
// SLIDE 10 — Earnings & valuations (Tech vs Non-Tech)
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

  // --- RIGHT PANEL: Top US companies — P/E vs revenue growth (US only, uniform bubbles) ---
  addChartTitle(s, "Top US — P/E vs revenue growth", 5.2, 1.7);

  const plotX = 5.55, plotY = 2.30, plotW = 3.85, plotH = 2.80;
  const xMin = -5, xMax = 50, yMin = 0, yMax = 50;
  const mapX = (g) => plotX + (Math.min(Math.max(g, xMin), xMax) - xMin) / (xMax - xMin) * plotW;
  const mapY = (pe) => plotY + plotH - (Math.min(Math.max(pe, yMin), yMax) - yMin) / (yMax - yMin) * plotH;

  // Panel background
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 2.2, w: 4.3, h: 3.2,
    fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
  });

  // US-only subset of TOP20 (exclude TSM, ARMCO, Samsung, Tencent, SK Hynix, ASML)
  const US_TICKERS = ["NVDA","GOOGL","AAPL","MSFT","AMZN","AVGO","META","TSLA","WMT","BRK.B","JPM","LLY","XOM","V"];
  const US_SET = TOP20.filter(c => US_TICKERS.includes(c.ticker));

  // Gridlines + axis lines
  [10, 20, 30, 40].forEach(v => {
    s.addShape(pres.shapes.LINE, {
      x: plotX, y: mapY(v), w: plotW, h: 0,
      line: { color: "EEEEEE", width: 0.5 },
    });
  });
  s.addShape(pres.shapes.LINE, {
    x: plotX, y: mapY(0), w: plotW, h: 0,
    line: { color: C.medGray, width: 0.75 },
  });
  s.addShape(pres.shapes.LINE, {
    x: plotX, y: plotY, w: 0, h: plotH,
    line: { color: C.medGray, width: 0.75 },
  });

  // X-axis tick labels
  [-5, 0, 10, 20, 30, 40, 50].forEach(v => {
    s.addText((v > 0 ? "+" : "") + v + "%", {
      x: mapX(v) - 0.22, y: mapY(0) + 0.03, w: 0.44, h: 0.16,
      fontSize: 7, color: "999999", fontFace: "Arial", align: "center", margin: 0,
    });
  });
  // Y-axis tick labels
  [0, 10, 20, 30, 40, 50].forEach(v => {
    s.addText(v + "×", {
      x: plotX - 0.38, y: mapY(v) - 0.07, w: 0.33, h: 0.14,
      fontSize: 7, color: "999999", fontFace: "Arial", align: "right", margin: 0,
    });
  });

  // Axis titles
  s.addText("Forward revenue growth, 2026E → 2027E", {
    x: plotX, y: 5.24, w: plotW, h: 0.16,
    fontSize: 8, color: C.medGray, italic: true, fontFace: "Arial", align: "center", margin: 0,
  });
  s.addText("Forward P/E (2026E)", {
    x: 5.2, y: 1.97, w: 4.3, h: 0.14,
    fontSize: 8, color: C.medGray, italic: true, fontFace: "Arial", margin: 0,
  });

  // Uniform bubble size for all companies
  const BUBBLE_D = 0.13;

  // Company-name labels (just the company name, no growth/P/E annotations)
  const NAME_OFFSETS = {
    "NVDA":  { dx: -0.72, dy: -0.07 },
    "AVGO":  { dx: -0.82, dy: -0.07 },
    "TSLA":  { dx:  0.08, dy:  0.04 },
    "MSFT":  { dx:  0.08, dy:  0.06 },
    "GOOGL": { dx:  0.08, dy: -0.15 },
    "LLY":   { dx: -0.52, dy:  0.05 },
    "META":  { dx: -0.40, dy: -0.07 },
    "AAPL":  { dx: -0.42, dy: -0.07 },
    "AMZN":  { dx:  0.08, dy: -0.07 },
    "WMT":   { dx:  0.08, dy:  0.06 },
    "BRK.B": { dx:  0.08, dy:  0.06 },
    "JPM":   { dx:  0.08, dy: -0.07 },
    "XOM":   { dx: -0.40, dy: -0.07 },
    "V":     { dx:  0.08, dy:  0.06 },
  };

  // Draw uniform bubbles
  US_SET.forEach(c => {
    const px = mapX(c.growth);
    const py = mapY(c.pe);
    const fill = c.sector === "Tech" ? C.orange : C.darkGray;
    s.addShape(pres.shapes.OVAL, {
      x: px - BUBBLE_D / 2, y: py - BUBBLE_D / 2, w: BUBBLE_D, h: BUBBLE_D,
      fill: { color: fill }, line: { color: C.white, width: 0.5 },
    });
  });

  // Company-name labels
  US_SET.forEach(c => {
    const px = mapX(c.growth);
    const py = mapY(c.pe);
    const off = NAME_OFFSETS[c.ticker] || { dx: 0.08, dy: -0.07 };
    s.addText(c.company, {
      x: px + off.dx, y: py + off.dy, w: 0.9, h: 0.13,
      fontSize: 7, color: c.sector === "Tech" ? C.orange : C.darkGray,
      bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  // In-plot legend
  const lgX = 8.55, lgY = 2.36;
  s.addShape(pres.shapes.OVAL, {
    x: lgX, y: lgY, w: 0.10, h: 0.10,
    fill: { color: C.orange }, line: { color: C.white, width: 0.5 },
  });
  s.addText("Tech", {
    x: lgX + 0.13, y: lgY - 0.03, w: 0.6, h: 0.16,
    fontSize: 7.5, color: C.darkGray, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.OVAL, {
    x: lgX, y: lgY + 0.18, w: 0.10, h: 0.10,
    fill: { color: C.darkGray }, line: { color: C.white, width: 0.5 },
  });
  s.addText("Non-Tech", {
    x: lgX + 0.13, y: lgY + 0.15, w: 0.85, h: 0.16,
    fontSize: 7.5, color: C.darkGray, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  // Dark-gray payoff band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.9, w: 9.0, h: 0.45,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText(
    "Tech median: ~" + MED_TECH_PE.toFixed(0) + "× fwd P/E on ~" + MED_TECH_GROW.toFixed(0) +
    "% forward revenue growth. Non-Tech: ~" + MED_NONTECH_PE.toFixed(0) + "× on ~" +
    MED_NONTECH_GROW.toFixed(0) + "%. The divergence is in the engine, not the multiple.",
    {
      x: 0.7, y: 5.9, w: 8.6, h: 0.45,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    }
  );

  addSource(s, "Sources: stockanalysis.com analyst consensus (AAPL/MSFT/GOOGL/AMZN/NVDA/META/AVGO/TSLA/LLY/JPM/V/XOM/BRK.B/WMT, as of Apr 22, 2026); companiesmarketcap.com (mkt caps, Apr 22, 2026). NVDA, AVGO clipped at +50% growth; TSLA at 50× fwd P/E.");
  addFooter(s, 10);
}

// ===================================================================
// SLIDE 11 — What is agentic AI? (with image placeholder)
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
  // Image placeholder on the left
  addImagePlaceholder(s, 0.5, 1.85, 3.3, 3.25, "Screenshot — dark-themed IDE with AI coworker editing code, orange accents");

  // Table on the right
  s.addTable(tableData, {
    x: 3.95, y: 1.85, w: 5.55,
    colW: [1.45, 2.05, 2.05],
    rowH: 0.65,
    border: { pt: 0.5, color: C.lightGray },
    fontFace: "Arial",
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.85, w: 9.0, h: 0.5,
    fill: { color: C.orange }, line: { color: C.orange, width: 0 },
  });
  s.addText("The 10–100× compute step-up per session is what every AI capex forecast is pricing in.", {
    x: 0.7, y: 5.85, w: 8.6, h: 0.5,
    fontSize: 13, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Anthropic, OpenAI, GitHub Trending; Morgan Stanley CIO Survey; Strategy Research.");
  addFooter(s, 11);
}

// ===================================================================
// SLIDE 12 — The divergence (semis vs software + PE/credit spillover)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "The divergence.");
  addSubhead(s, "Semis are up, software is down — a ~58-point spread inside one theme. Private credit and PE-owned software names are now selling off in sympathy.");
  addHeadlineRule(s);

  addChartTitle(s, "YTD price return, rebased to 100", 0.5, 1.7);
  s.addChart(pres.charts.LINE,
    [
      { name: "Semis",    labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100, 110, 118, 128, 138] },
      { name: "Nasdaq",   labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100,  98,  96,  99, 104] },
      { name: "Software", labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100,  88,  78,  76,  80] },
    ],
    lineOpts({ x: 0.5, y: 1.9, w: 4.3, h: 3.75 })
  );

  // ---- Right-side panels: cleaner container + consistent spacing ----
  const P_X = 5.2, P_W = 4.3;
  const HEAD_H = 0.30, ROW_H = 0.30;
  const drawPanel = (y, title, headerColor, rows, pctColor) => {
    const h = HEAD_H + rows.length * ROW_H + 0.05;
    // Container
    s.addShape(pres.shapes.RECTANGLE, {
      x: P_X, y: y, w: P_W, h: h,
      fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
    });
    // Colored header bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: P_X, y: y, w: P_W, h: HEAD_H,
      fill: { color: headerColor }, line: { color: headerColor, width: 0 },
    });
    s.addText(title, {
      x: P_X, y: y, w: P_W, h: HEAD_H,
      fontSize: 9.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    // Rows with aligned columns and subtle row dividers
    rows.forEach((r, i) => {
      const ry = y + HEAD_H + 0.04 + i * ROW_H;
      s.addText(r.ticker, {
        x: P_X + 0.18, y: ry, w: 1.3, h: ROW_H,
        fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
      });
      s.addText(r.pct, {
        x: P_X + 1.48, y: ry, w: 0.82, h: ROW_H,
        fontSize: 12, color: pctColor, bold: true, fontFace: "Arial Black", align: "right", valign: "middle", margin: 0,
      });
      s.addText(r.note, {
        x: P_X + 2.42, y: ry, w: 1.72, h: ROW_H,
        fontSize: 8.5, color: C.medGray, fontFace: "Arial", valign: "middle", margin: 0,
      });
      if (i < rows.length - 1) {
        s.addShape(pres.shapes.LINE, {
          x: P_X + 0.18, y: ry + ROW_H - 0.005, w: P_W - 0.36, h: 0,
          line: { color: C.lightGray, width: 0.4 },
        });
      }
    });
    return h;
  };

  const PANEL_GAP = 0.10;
  let py = 1.9;
  py += drawPanel(py, "MEMORY SUPERCYCLE", C.green, [
    { ticker: "Samsung",  pct: "+72%", note: "HBM capacity +50% in 2026" },
    { ticker: "Micron",   pct: "+68%", note: "HBM sold out; $8B run-rate" },
    { ticker: "SK Hynix", pct: "+62%", note: "60% HBM share; HBM4 ramp" },
  ], C.green) + PANEL_GAP;

  py += drawPanel(py, "SOFTWARE UNDER PRESSURE", C.red, [
    { ticker: "Salesforce", pct: "–22%", note: "Seat model under agent threat" },
    { ticker: "Adobe",      pct: "–24%", note: "Gen-AI erodes content moat" },
    { ticker: "ServiceNow", pct: "–19%", note: "Workflows disrupted by agents" },
  ], C.red) + PANEL_GAP;

  py += drawPanel(py, "PRIVATE CREDIT & PE", C.darkGray, [
    { ticker: "BDC index", pct: "–11%", note: "Software loan books re-marked" },
    { ticker: "PE SaaS",   pct: "–15%", note: "2021 marks written down in Q1" },
  ], C.red);

  // Bottom payoff banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.78, w: 9.0, h: 0.42,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("The software sell-off is now a private-credit problem — PE shops are writing down 2021-marked SaaS.", {
    x: 0.7, y: 5.78, w: 8.6, h: 0.42,
    fontSize: 11, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Yahoo Finance YTD total returns (Apr 17, 2026); Counterpoint Research; Morgan Stanley CIO Survey; Bloomberg BDC and PE secondary marks; PitchBook. Single-stock YTDs indicative.");
  addFooter(s, 12);
}

// ===================================================================
// SLIDE 13 — The bubble question (vs 2000, with icons)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "The bubble question.");
  addSubhead(s, "Four tests. Same questions investors asked about Cisco and the dotcoms. Different answers today.");
  addHeadlineRule(s);

  const tests = [
    { icon: "$",  test: "PRICE PER DOLLAR OF EARNINGS",  y2000: "131×", y2000sub: "Cisco fwd P/E, Mar 2000",       y2026: "~24×",   y2026sub: "NVIDIA fwd P/E, Apr 17, 2026" },
    { icon: "%",  test: "LEADER PROFITABILITY",          y2000: "14%",  y2000sub: "of tech IPOs were profitable",  y2026: "26%",    y2026sub: "Mag 7 avg net margin (2× S&P)" },
    { icon: "⇅",  test: "SUPPLY VS. DEMAND",             y2000: "Oversupply", y2000sub: "$500B dark fiber unused", y2026: "Sold out", y2026sub: "GPU 2nd market 90–95% of list" },
    { icon: "◨",  test: "BUYER BALANCE SHEETS",          y2000: "20+",  y2000sub: "major telcos went bankrupt",    y2026: "~48%",   y2026sub: "hyperscaler net debt/EBITDA (vs ~80% S&P)" },
  ];

  // Header row
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.9, w: 3.4, h: 0.35, fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 } });
  s.addText("TEST", { x: 0.5, y: 1.9, w: 3.4, h: 0.35, fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 3.95, y: 1.9, w: 2.7, h: 0.35, fill: { color: C.red }, line: { color: C.red, width: 0 } });
  s.addText("✗  DOTCOM 2000", { x: 3.95, y: 1.9, w: 2.7, h: 0.35, fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.7, y: 1.9, w: 2.8, h: 0.35, fill: { color: C.green }, line: { color: C.green, width: 0 } });
  s.addText("✓  AI 2026", { x: 6.7, y: 1.9, w: 2.8, h: 0.35, fontSize: 10.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0 });

  tests.forEach((t, i) => {
    const y = 2.3 + i * 0.72;
    if (i % 2 === 1) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: y, w: 9.0, h: 0.72,
        fill: { color: C.offWhite }, line: { color: C.offWhite, width: 0 },
      });
    }
    // Icon circle
    s.addShape(pres.shapes.OVAL, {
      x: 0.65, y: y + 0.16, w: 0.4, h: 0.4,
      fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
    });
    s.addText(t.icon, {
      x: 0.65, y: y + 0.16, w: 0.4, h: 0.4,
      fontSize: 14, color: C.gold, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
    });
    s.addText(t.test, {
      x: 1.15, y: y, w: 2.75, h: 0.72,
      fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
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
  addFooter(s, 13);
}

// ===================================================================
// SLIDE 14 — Supply chain fragility (redesigned: 2 hero numbers, taller image, fab grid)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Supply chain fragility.");
  addSubhead(s, "Four countries control the advanced semiconductor stack. US reshoring is real but slow — most leading-edge fabs come online 2027+.");
  addHeadlineRule(s);

  // LEFT: taller-aspect image anchor (~4:3 vertical)
  addImagePlaceholder(s, 0.5, 1.85, 3.5, 3.3, "Cinematic — bunny-suited techs on fab floor, orange photolith glow, tall aspect");

  // RIGHT: two hero stats + concentration narrative
  const stats = [
    { n: "~90%",  lbl: "TSMC share of advanced-node chips",     color: C.red },
    { n: "76%",   lbl: "SK Hynix + Samsung DRAM share",          color: C.red },
  ];
  const statY = 1.95, statW = 2.6, statGap = 0.2;
  const statsStartX = 4.25;
  stats.forEach((st, i) => {
    makeBigNumber(s, st.n, st.lbl, statsStartX + i * (statW + statGap), statY, statW, st.color);
  });

  // Short narrative
  s.addText("A single leading-edge chip crosses 70+ borders and six countries before reaching a data center. ASML builds fewer than 100 EUV machines a year.", {
    x: 4.25, y: 3.7, w: 5.25, h: 1.2,
    fontSize: 12, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
  });

  // BOTTOM: US reshoring strip (full width)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.25, w: 9.0, h: 0.35,
    fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
  });
  s.addText("US RESHORING — ACTUAL STATUS", {
    x: 0.5, y: 5.25, w: 9.0, h: 0.35,
    fontSize: 10, color: C.orange, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 3, margin: 0,
  });
  const fabs = [
    { name: "TSMC Arizona",   status: "Fab 1 at 4nm; Fab 2 ~2026–27" },
    { name: "Samsung Taylor", status: "2nm fab, pushed to 2026" },
    { name: "Micron Clay NY", status: "Ground broken; online ~2028–30" },
    { name: "Intel Ohio",     status: "Two fabs; online ~2027–28" },
  ];
  fabs.forEach((f, i) => {
    const x = 0.5 + (i % 4) * 2.225;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.05, y: 5.6, w: 2.125, h: 0.75,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(f.name, {
      x: x + 0.1, y: 5.62, w: 2.0, h: 0.3,
      fontSize: 10.5, color: C.black, bold: true, fontFace: "Arial", margin: 0,
    });
    s.addText(f.status, {
      x: x + 0.1, y: 5.9, w: 2.0, h: 0.45,
      fontSize: 9, color: C.darkGray, fontFace: "Arial", margin: 0,
    });
  });

  addSource(s, "Sources: TSMC, Samsung, Micron, Intel filings; US Commerce Dept CHIPS Program Office (Nov 2025 — $36B+ committed of $52.7B); SIA.");
  addFooter(s, 14);
}

// ===================================================================
// SLIDE 15 — Policy & regulation (redesigned: icon + items, no hero stats per column)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Policy & regulation.");
  addSubhead(s, "Export controls, EU compliance, and reshoring subsidies now decide who can sell what, to whom, from where.");
  addHeadlineRule(s);

  const cols = [
    {
      x: 0.5, accent: C.red, title: "EXPORT CONTROLS", icon: "▣",
      items: [
        "H100 / H200 / Blackwell banned from China.",
        "H20 reinstated with a 15% Treasury fee.",
        "$5.5B NVIDIA H20 writedown.",
        "ASML DUV banned; China ~20% of revenue.",
      ],
    },
    {
      x: 3.6, accent: C.orange, title: "AI REGULATION", icon: "§",
      items: [
        "EU AI Act enforcement: Aug 2, 2026.",
        "Fines up to €35M or 7% of global revenue.",
        "Initial compliance: $8–15M per system.",
        "Only 36% of enterprises feel prepared.",
      ],
    },
    {
      x: 6.7, accent: C.gold, title: "TRADE & RESHORING", icon: "⚒",
      items: [
        "CHIPS Act: ~$36B committed of $52.7B.",
        "China controls ~90% of rare-earth processing.",
        "Gallium / germanium controls since Jul 2023.",
        "SMIC 5nm yield ~20% vs >70% threshold.",
      ],
    },
  ];

  cols.forEach((col) => {
    // Colored header bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 1.95, w: 2.8, h: 0.45,
      fill: { color: col.accent }, line: { color: col.accent, width: 0 },
    });
    s.addText(col.title, {
      x: col.x, y: 1.95, w: 2.8, h: 0.45,
      fontSize: 11.5, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    // Body card
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: 2.4, w: 2.8, h: 3.8,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    // Large icon glyph
    s.addText(col.icon, {
      x: col.x, y: 2.55, w: 2.8, h: 1.0,
      fontSize: 48, color: col.accent, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: col.x + 0.4, y: 3.6, w: 2.0, h: 0,
      line: { color: col.accent, width: 1.5 },
    });
    // Bulleted items
    s.addText(col.items.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < col.items.length - 1 },
    })), {
      x: col.x + 0.2, y: 3.75, w: 2.45, h: 2.35,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 5,
    });
  });

  addSource(s, "Sources: NVIDIA 10-Q; ASML filings; EU AI Act Article 99 / Chapter V (Aug 2, 2026 enforcement); US Bureau of Industry and Security; Commerce Dept (Nov 2025).");
  addFooter(s, 15);
}

// ===================================================================
// SLIDE 16 — AI backlash (redesigned: taller image, 1 hero stat, 3 short cards)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "AI backlash.");
  addSubhead(s, "NIMBY revolt, anti-AI sentiment, and a labor shortage are each capable of pricing the infrastructure bet lower.");
  addHeadlineRule(s);

  // LEFT: taller-aspect protest banner image
  addImagePlaceholder(s, 0.5, 1.85, 3.5, 3.3, "Photojournalism — 'STOP THE AI RACE' hand-lettered signs at a dusk rally, tall aspect");

  // RIGHT: one hero stat anchors the right column
  makeBigNumber(s, "$64B", "in data-center projects blocked or delayed across 24 states", 4.25, 1.95, 5.25, C.red);

  // Three short narrative cards stacked in the right column
  const notes = [
    { title: "NIMBY REVOLT",      body: "$18B halted, $46B delayed. 142 activist groups across 24 states — Virginia leads with 42." },
    { title: "ANTI-AI SENTIMENT", body: "Only 26% of Americans view AI positively. Mar 21, 2026 \"Stop the AI Race\" protests hit lab HQs." },
    { title: "LABOR SHORTAGE",    body: "~480K data-center workforce gap. 400+ sites under build — talent is now binding, not capital." },
  ];
  notes.forEach((n, i) => {
    const y = 3.55 + i * 0.68;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 4.25, y: y, w: 5.25, h: 0.3,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    s.addText(n.title, {
      x: 4.25, y: y, w: 5.25, h: 0.3,
      fontSize: 9.5, color: C.white, bold: true, fontFace: "Arial", align: "left", valign: "middle", charSpacing: 2, margin: 0.12,
    });
    s.addText(n.body, {
      x: 4.3, y: y + 0.32, w: 5.2, h: 0.3,
      fontSize: 9.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  // Red payoff band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.9, w: 9.0, h: 0.4,
    fill: { color: C.red }, line: { color: C.red, width: 0 },
  });
  s.addText("The permitting layer is the new supply-chain layer — and it is politically, not technically, constrained.", {
    x: 0.7, y: 5.9, w: 8.6, h: 0.4,
    fontSize: 11, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Data Center Watch ($18B halted, $46B delayed, 142 groups); Echelon Insights; Stop the AI Race; Fortune; TIME; CNN; NBC News; Data Center Frontier.");
  addFooter(s, 16);
}

// ===================================================================
// SLIDE 17 — Beyond the grid (orbital compute)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Beyond the grid.");
  addSubhead(s, "No interconnection queue. No permits. No water. 1,361 W/m² of unfiltered solar, 24/7. Orbital compute sidesteps Earth's bottlenecks.");
  addHeadlineRule(s);

  // Hero image on the right
  addImagePlaceholder(s, 5.85, 1.6, 3.65, 3.8, "Render — orbital data-center satellite with solar wings above Earth's limb at dawn");

  const cards = [
    { title: "NO GRID QUEUE",   body: "Earth's interconnection backlogs, zoning battles, and cooling constraints don't exist in orbit." },
    { title: "UNLIMITED SOLAR", body: "1,361 W/m² of unfiltered sunlight, 24/7 — no intermittency, no capacity-factor limits." },
    { title: "BEYOND BORDERS",  body: "Sidesteps data-localization laws, export controls, and the jurisdictional patchwork." },
  ];
  cards.forEach((c, i) => {
    const y = 1.6 + i * 1.3;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: 5.15, h: 0.35,
      fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
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
    { text: "PLAYERS   ", options: { bold: true, color: C.gold, fontSize: 9.5, charSpacing: 3 } },
    { text: "Starcloud · SpaceX · Google Suncatcher · Aetherflux", options: { color: C.white, fontSize: 11, bold: true } },
  ], {
    x: 0.7, y: 5.85, w: 8.6, h: 0.4, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: FCC filings; Starcloud, Google, SpaceX announcements; CNBC.");
  addFooter(s, 17);
}

// ===================================================================
// SLIDE 18 — Physical AI
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Physical AI.");
  addSubhead(s, "Humanoids enter manufacturing, logistics, and healthcare at pilot scale. Every robot is a walking inference endpoint.");
  addHeadlineRule(s);

  addImagePlaceholder(s, 1.5, 1.6, 7.0, 2.2, "Photo — humanoid robot mid-stride on a factory floor, warm work-light, motion blur");

  const cards = [
    { title: "PHYSICAL WORK",         body: "Manufacturing, logistics, warehousing, agriculture, healthcare — pilots are underway." },
    { title: "TIRELESS COWORKERS",    body: "Humanoids take hazardous and ergonomically punishing tasks. Humans keep judgment." },
    { title: "INFERENCE AT THE EDGE", body: "Every robot runs foundation models in real time. At scale, rivals LLM compute." },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 4.0, w: 2.95, h: 0.35,
      fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
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
    { text: "PLAYERS   ", options: { bold: true, color: C.gold, fontSize: 9.5, charSpacing: 3 } },
    { text: "Tesla Optimus · Figure · Boston Dynamics · Unitree · Agility", options: { color: C.white, fontSize: 11, bold: true } },
  ], {
    x: 0.7, y: 5.85, w: 8.6, h: 0.4, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Goldman Sachs; Figure AI, Tesla, Hyundai, NVIDIA; company announcements.");
  addFooter(s, 18);
}

// ===================================================================
// SLIDE 19 — Autonomous mobility
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Autonomous mobility.");
  addSubhead(s, "More miles → better models → more deployments. Every vehicle is a rolling inference machine consuming frontier-scale compute.");
  addHeadlineRule(s);

  addImagePlaceholder(s, 0.5, 1.6, 2.8, 4.15, "Photo — Waymo robotaxi on a rainy city street at dusk, sensor pod lit, long exposure");

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
      fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
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
    { text: "PLAYERS   ", options: { bold: true, color: C.gold, fontSize: 9.5, charSpacing: 3 } },
    { text: "Waymo · Tesla FSD · Baidu Apollo · Aurora", options: { color: C.white, fontSize: 11, bold: true } },
  ], {
    x: 0.7, y: 5.9, w: 8.6, h: 0.35, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Source: Waymo, Tesla, Baidu, Aurora; WHO Global Road Safety; NVIDIA FY2026.");
  addFooter(s, 19);
}

// ===================================================================
// SLIDE 20 — AI in biology (educational: 3 mechanisms, no hero stat)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "AI is rewriting drug discovery.");
  addSubhead(s, "Three mechanisms compress the R&D cycle's earliest stages from years to hours. Clinical trials still take years — AI collapses the design stage, not the regulatory one.");
  addHeadlineRule(s);

  // Image on the left, taller
  addImagePlaceholder(s, 0.5, 1.85, 3.3, 3.67, "Render — ribbon-diagram protein structure against graphite black, shallow DOF");

  // Three educational mechanism cards stacked on the right
  const stages = [
    {
      num: "01",
      title: "STRUCTURE PREDICTION",
      body: "Predicting a protein's 3D shape from its amino-acid sequence was a 50-year unsolved problem. Crystallography took months per protein. Deep learning now infers structure in seconds — unlocking every drug target at once.",
    },
    {
      num: "02",
      title: "GENERATIVE MOLECULE DESIGN",
      body: "There are ~10⁶⁰ drug-like small molecules. Wet labs can screen millions. Generative models search the rest — proposing novel binders optimized for selectivity, potency, and drug-like properties.",
    },
    {
      num: "03",
      title: "IN SILICO VALIDATION",
      body: "Molecular dynamics and binding-affinity prediction filter candidates before synthesis. Weeks of bench work become hours of GPU compute. Far fewer molecules reach animal testing.",
    },
  ];

  const CARD_X = 4.0, CARD_W = 5.5, CARD_H = 1.17, CARD_GAP = 0.08;
  const CARD_Y0 = 1.85;
  stages.forEach((c, i) => {
    const y = CARD_Y0 + i * (CARD_H + CARD_GAP);
    // Card body
    s.addShape(pres.shapes.RECTANGLE, {
      x: CARD_X, y: y, w: CARD_W, h: CARD_H,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    // Header bar (neutral darkGray — no purple)
    s.addShape(pres.shapes.RECTANGLE, {
      x: CARD_X, y: y, w: CARD_W, h: 0.32,
      fill: { color: C.darkGray }, line: { color: C.darkGray, width: 0 },
    });
    s.addText([
      { text: c.num + "   ", options: { bold: true, color: C.gold, fontSize: 10.5, charSpacing: 2 } },
      { text: c.title,       options: { bold: true, color: C.white, fontSize: 10.5, charSpacing: 2 } },
    ], {
      x: CARD_X + 0.18, y: y, w: CARD_W - 0.3, h: 0.32,
      fontFace: "Arial", valign: "middle", margin: 0,
    });
    // Body copy
    s.addText(c.body, {
      x: CARD_X + 0.2, y: y + 0.37, w: CARD_W - 0.4, h: CARD_H - 0.42,
      fontSize: 9.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  // Bottom context strip (replaces PLAYERS row — education, not examples)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.68, w: 9.0, h: 0.42,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Traditional pharma: 10–15 years, ~$2.6B per approved drug, <10% Phase I success. AI collapses the design stage — clinical trials are still bound by biology and the FDA.", {
    x: 0.7, y: 5.68, w: 8.6, h: 0.42,
    fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: Jumper et al. (AlphaFold, Nature 2020); Tufts CSDD drug-development cost and timeline studies; Hughes et al., Br. J. Pharmacol. on screening scale; Strategy Research.");
  addFooter(s, 20);
}

// ===================================================================
// SLIDE 21 — Key takeaways
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
      body: "AI stock correlation collapsed from ~80% to ~20%. Semis +38% YTD, software –20% YTD — a 58-point spread. Memory oligopolies with pricing power outperform cloud providers burning cash.",
      accent: C.gold },
    { n: "03", title: "The bottleneck keeps moving — and that is the opportunity.",
      body: "CoWoS packaging (2023–24) → HBM / silicon wafer supply (now) → EUV lithography (<100 machines/yr) by 2028. Each shift reprices a different part of the stack. HBM TAM on a path from $35B (2025) to $100B (2028).",
      accent: C.red },
    { n: "04", title: "The question isn't whether you have AI exposure — it's whether you chose it.",
      body: "AI-linked stocks are ~30%+ of US large-cap benchmarks. Passive exposure to a ~$750B capex cycle is not neutral — it's a thesis. Own the layer with pricing power for today's bottleneck.",
      accent: C.purple },
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

  addSource(s, "Sources: company filings; CreditSights / MUFG hyperscaler capex 2026 (Apr 2026); Goldman Sachs correlation data; Yahoo Finance YTD (Apr 17, 2026); SemiAnalysis; BofA HBM TAM; TrendForce.", 0.5, 6.15, 9.0);
  addFooter(s, 21);
}

// ---------- Write ----------
pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

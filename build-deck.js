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

// Numbered citation block — single inline wrapped paragraph, 7pt gray.
// items: [{ n: "1", text: "Source string without trailing punctuation" }, ...]
// Renders as: "(1) Source, (2) Source, (3) Source." Bold parenthesized numeral, plain text.
function addCitations(slide, items, opts) {
  const o = opts || {};
  const y = o.y != null ? o.y : 6.425;
  const h = o.h != null ? o.h : 0.5;
  const runs = [];
  items.forEach((it, i) => {
    runs.push({ text: "(" + it.n + ") ", options: { color: "999999", bold: true, fontSize: 7 } });
    const sep = i < items.length - 1 ? ", " : ".";
    runs.push({ text: it.text + sep, options: { color: "999999", fontSize: 7 } });
  });
  slide.addText(runs, {
    x: 0.5, y: y, w: 9.0, h: h, fontFace: "Arial", valign: "top", margin: 0,
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
    { n: "01", label: "LANDSCAPE", accent: C.teal,    pages: "3 – 6"   },
    { n: "02", label: "MARKET",    accent: C.gold,    pages: "7 – 11"  },
    { n: "03", label: "SHIFTS",    accent: C.orange,  pages: "12 – 13" },
    { n: "04", label: "RISKS",     accent: C.red,     pages: "14 – 17" },
    { n: "05", label: "FRONTIER",  accent: C.purple,  pages: "18 – 21" },
    { n: "06", label: "TAKEAWAYS", accent: C.black,   pages: "22"      },
    { n: "07", label: "APPENDIX",  accent: C.medGray, pages: "23 – 24" },
  ];

  const rowY0 = 1.9, rowH = 0.62, rowW = 9.0, rowX = 0.5;
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

  addSource(s, "Source: Strategy Research. 24 slides, read top to bottom.");
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
  addHeadline(s, "Sixty years of AI in six steps — and we are now in step six");
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
  addHeadline(s, "Eleven layers, four power blocs — your exposure depends on which layer you own");
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
// SLIDE 7: How an AI chip is made (educational primer)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "How an AI chip is made");
  addSubhead(s, "Every AI accelerator inside a data center, from training GPUs to custom inference silicon, passes through the same four stages.");
  addHeadlineRule(s);

  // ---- Left: photo placeholder ----
  addImagePlaceholder(s, 0.5, 1.70, 4.40, 4.30,
    "Photo: AI accelerator package close-up, NVIDIA H100/H200 or Blackwell style. Large central logic die surrounded by HBM memory stacks on a CoWoS substrate, gold contact pads visible, dramatic studio lighting on dark backdrop, square framing.");
  s.addText("An AI accelerator package: a large processor chip surrounded by high-speed memory chips, all wired into one unit.", {
    x: 0.5, y: 6.08, w: 4.40, h: 0.30,
    fontSize: 8, color: C.medGray, italic: true, fontFace: "Arial", valign: "top", margin: 0,
  });

  // ---- Right: four-stage list ----
  const stages = [
    { n: "01", name: "DESIGN",      color: C.purple,
      desc: "Engineers draft the chip's blueprint in software, mapping where each of tens of billions of microscopic switches will sit." },
    { n: "02", name: "EQUIPMENT",   color: C.pink,
      desc: "Highly specialized machines are built to print circuit patterns at near-atomic scale using ultraviolet light." },
    { n: "03", name: "FABRICATION", color: C.teal,
      desc: "Silicon wafers pass through more than a thousand precise steps inside ultra-clean factories that take years to build." },
    { n: "04", name: "PACKAGING",   color: C.navy,
      desc: "The finished chip is bonded with high-speed memory into a single package ready to plug into a server." },
  ];

  const RIGHT_X = 5.05;
  const RIGHT_W = 4.45;

  // Mini header
  s.addText("THE FOUR STAGES", {
    x: RIGHT_X, y: 1.70, w: RIGHT_W, h: 0.24,
    fontSize: 9, color: C.medGray, bold: true, fontFace: "Arial", valign: "middle", charSpacing: 2, margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: RIGHT_X, y: 1.95, w: RIGHT_W, h: 0,
    line: { color: C.lightGray, width: 0.5 },
  });

  const ROW_Y0 = 2.05;
  const rowH = 1.05;
  const circleSize = 0.42;

  stages.forEach((st, i) => {
    const ry = ROW_Y0 + i * rowH;

    // Number circle
    s.addShape(pres.shapes.OVAL, {
      x: RIGHT_X, y: ry + 0.04, w: circleSize, h: circleSize,
      fill: { color: st.color }, line: { color: st.color, width: 0 },
    });
    s.addText(st.n, {
      x: RIGHT_X, y: ry + 0.04, w: circleSize, h: circleSize,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0,
    });

    // Stage name
    const TX = RIGHT_X + circleSize + 0.18;
    const TW = RIGHT_W - circleSize - 0.18;
    s.addText(st.name, {
      x: TX, y: ry, w: TW, h: 0.30,
      fontSize: 13, color: C.black, bold: true, fontFace: "Arial",
      valign: "middle", charSpacing: 1.5, margin: 0,
    });
    // Description
    s.addText(st.desc, {
      x: TX, y: ry + 0.30, w: TW, h: 0.65,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });

    // Subtle divider between rows (skip last)
    if (i < stages.length - 1) {
      s.addShape(pres.shapes.LINE, {
        x: RIGHT_X, y: ry + rowH - 0.02, w: RIGHT_W, h: 0,
        line: { color: C.lightGray, width: 0.5 },
      });
    }
  });

  addSource(s, "Source: SIA / SEMI industry taxonomy; SEMI World Fab Forecast; TSMC, NVIDIA, ASML disclosures. Process descriptions are plain-English simplifications.");
  addFooter(s, 7);
}

// ===================================================================
// SLIDE 8 — Who's buying the chips (MARKET, demand-side primer)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Five hyperscalers fund ~60% of AI chip demand — their capex IS the market");
  addSubhead(s, "Five hyperscalers fund roughly 60% of advanced-AI chip demand — sovereigns, enterprise, and edge devices split the rest.");
  addHeadlineRule(s);

  // ---- Horizontal stacked-share bar ----
  const buyers = [
    { name: "HYPERSCALERS",     pct: 58, color: C.gold,    labelColor: C.black, showLabel: true  },
    { name: "SOVEREIGNS",       pct: 12, color: C.teal,    labelColor: C.white, showLabel: true  },
    { name: "ENTERPRISE",       pct: 10, color: C.medGray, labelColor: C.white, showLabel: true  },
    { name: "CONSUMER + EDGE",  pct: 20, color: C.orange,  labelColor: C.white, showLabel: true  },
  ];
  const BAR_X = 0.5, BAR_Y = 1.9, BAR_W = 9.0, BAR_H = 0.5;
  let cx = BAR_X;
  buyers.forEach(seg => {
    const w = BAR_W * (seg.pct / 100);
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: BAR_Y, w: w, h: BAR_H,
      fill: { color: seg.color }, line: { color: seg.color, width: 0 },
    });
    if (seg.showLabel) {
      s.addText(seg.name, {
        x: cx, y: BAR_Y, w: w, h: BAR_H,
        fontSize: 10, color: seg.labelColor, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
      });
    }
    cx += w;
  });
  s.addText("Estimated share of advanced-AI chip demand, 2026E", {
    x: 0.5, y: 2.42, w: 9.0, h: 0.2,
    fontSize: 8.5, color: C.medGray, italic: true, fontFace: "Arial", align: "right", margin: 0,
  });

  // ---- Four buyer cards (1 row × 4 cols) ----
  const cards = [
    {
      name: "HYPERSCALERS", color: C.gold,
      why: "Training frontier models and renting compute to everyone else.",
      buyers: "AWS · Azure · Google · Meta · Oracle",
    },
    {
      name: "SOVEREIGNS", color: C.teal,
      why: "National AI programs building sovereign access to frontier compute.",
      buyers: "UAE G42 · Saudi HUMAIN · UK AIRR · Japan METI",
    },
    {
      name: "ENTERPRISE", color: C.medGray,
      why: "Banks, pharma, and Fortune 500s deploying on-prem for regulated data.",
      buyers: "JPMorgan · Novartis · Walmart",
    },
    {
      name: "CONSUMER + EDGE", color: C.orange,
      why: "AI inference moves into phones, PCs, cars, and factory robots.",
      buyers: "Apple · Samsung · Tesla · humanoid OEMs",
    },
  ];
  const GRID_X = 0.5, GRID_Y = 2.80;
  const cardW = 2.175, cardH = 2.85, hgap = 0.10;

  cards.forEach((c, i) => {
    const x = GRID_X + i * (cardW + hgap);
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: GRID_Y, w: cardW, h: cardH,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: GRID_Y, w: cardW, h: 0.32,
      fill: { color: c.color }, line: { color: c.color, width: 0 },
    });
    s.addText(c.name, {
      x: x, y: GRID_Y, w: cardW, h: 0.32,
      fontSize: 9.5, color: c.color === C.gold ? C.black : C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });
    // Why (body)
    s.addText(c.why, {
      x: x + 0.14, y: GRID_Y + 0.42, w: cardW - 0.28, h: 1.5,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
    // Divider above buyers list
    s.addShape(pres.shapes.LINE, {
      x: x + 0.2, y: GRID_Y + cardH - 0.8, w: cardW - 0.4, h: 0,
      line: { color: C.lightGray, width: 0.5 },
    });
    s.addText("TOP BUYERS", {
      x: x + 0.14, y: GRID_Y + cardH - 0.72, w: cardW - 0.28, h: 0.22,
      fontSize: 7.5, color: C.medGray, bold: true, fontFace: "Arial", charSpacing: 2, valign: "top", margin: 0,
    });
    s.addText(c.buyers, {
      x: x + 0.14, y: GRID_Y + cardH - 0.48, w: cardW - 0.28, h: 0.42,
      fontSize: 9, color: C.black, bold: true, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  // Yellow payoff band
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.75, w: 9.0, h: 0.45,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText("Five buyers fund most of the AI compute cycle — their capex IS the market.", {
    x: 0.7, y: 5.75, w: 8.6, h: 0.45,
    fontSize: 12, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addSource(s, "Sources: SemiAnalysis and Omdia estimates of AI accelerator end-demand; TrendForce; hyperscaler 2026 capex guides (AWS, Microsoft, Google, Meta, Oracle); IDC. Shares are directional 2026E estimates.");
  addFooter(s, 8);
}

// ===================================================================
// SLIDE 9 — Power (MARKET)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Power is the new bottleneck.");
  addSubhead(s, "A single hyperscale AI campus now draws as much electricity as a mid-sized city. The grid, not the chip, is starting to set the pace of buildouts.");
  addHeadlineRule(s);

  // Three stat cards
  const stats = [
    { n: "~12%", lbl: "of US electricity demand will go to data centers by 2028 — up from ~4% in 2023 (EPRI high case, 2024)", color: C.orange },
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
  addFooter(s, 9);
}

// ===================================================================
// SLIDE 10 — The labs (private valuations)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Q1 funding doubled all of 2025 — two giants, one public, one merger");
  addSubhead(s, "Two independent private labs, one public giant, and xAI — now inside SpaceX after February's $1.25T all-stock merger.");
  addHeadlineRule(s);

  const rows = [
    { name: "OpenAI",    logo: "logos/openai.png",    val: "$852B",  mark: "1", mult: "~35× ARR",  event: "$122B round · AMZN / NVDA / SoftBank · Apr 2026" },
    { name: "Anthropic", logo: "logos/anthropic.png", val: "$380B",  mark: "2", mult: "~13× ARR",  event: "$30B Series G (Feb); VCs now offering $800B+" },
    { name: "Google",    logo: "logos/google.png",    val: "$2.3T",  mark: "3", mult: "~20× P/E",  event: "Alphabet (public) · Gemini 3 / DeepMind · ~$85B 2026 capex" },
    { name: "xAI / SpaceX", logo: "logos/xai.png",    val: "$1.25T", mark: "4", mult: "combined",  event: "All-stock merger closed Feb 2, 2026 — xAI now a SpaceX subsidiary" },
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
    s.addText([
      { text: r.val },
      { text: " " + r.mark, options: { superscript: true, fontSize: 10, bold: false, color: C.orange } },
    ], {
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

  s.addText("All valuations as of Apr 22, 2026.", {
    x: 0.5, y: 5.38, w: 9.0, h: 0.20,
    fontSize: 8, color: C.medGray, italic: true, fontFace: "Arial", align: "right", valign: "top", margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.65, w: 9.0, h: 0.55,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText([
    { text: "Q1 2026 funding to foundational AI startups was 2× all of 2025." },
    { text: " 5", options: { superscript: true, fontSize: 8 } },
  ], {
    x: 0.7, y: 5.65, w: 8.6, h: 0.55,
    fontSize: 14, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addCitations(s, [
    { n: "1", text: "Bloomberg / CNBC — OpenAI $122B round, Apr 2026" },
    { n: "2", text: "Sacra / Bloomberg — Anthropic Series G, Feb 2026" },
    { n: "3", text: "Alphabet 10-K + 2026 capex guide" },
    { n: "4", text: "TechCrunch / CNBC — xAI-SpaceX merger, Feb 2, 2026" },
    { n: "5", text: "Crunchbase Q1 2026 VC data" },
  ]);
  addFooter(s, 10);
}

// ===================================================================
// SLIDE 11 — Earnings & valuations (Tech vs Non-Tech)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "MARKET");
  addHeadline(s, "Top 10 Tech grow 4× faster than Top 10 Non-Tech — at a similar multiple");
  addSubhead(s, "Top 10 Tech firms are growing 4× faster than the top 10 Non-Tech — at a similar multiple. The divergence in fundamentals has not been priced into valuations.");
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
    MED_NONTECH_GROW.toFixed(0) + "% (consensus, Apr 22, 2026). The divergence is in the engine, not the multiple.",
    {
      x: 0.7, y: 5.9, w: 8.6, h: 0.45,
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    }
  );

  addSource(s, "Sources: stockanalysis.com analyst consensus (AAPL/MSFT/GOOGL/AMZN/NVDA/META/AVGO/TSLA/LLY/JPM/V/XOM/BRK.B/WMT, as of Apr 22, 2026); companiesmarketcap.com (mkt caps, Apr 22, 2026). NVDA, AVGO clipped at +50% growth; TSLA at 50× fwd P/E.");
  addFooter(s, 11);
}

// ===================================================================
// SLIDE 12 — What is agentic AI? (with image placeholder)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "Agentic AI uses 10–100× the compute per session — that's the capex thesis");
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
  addImagePlaceholder(s, 0.5, 1.85, 3.3, 3.25, "Screenshot — dark-mode IDE, AI agent editing Python code live, glowing orange cursor, 'Claude is editing' pill, streaming test output in a terminal pane, square framing");

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
  addFooter(s, 12);
}

// ===================================================================
// SLIDE 13 — The divergence (semis vs software)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "SHIFTS");
  addHeadline(s, "Semis up, software down — one theme, two outcomes");
  addSubhead(s, "A 50+ point spread inside a single theme — and the pain is now bleeding into private credit and PE-held SaaS.");
  addHeadlineRule(s);

  // LEFT: line chart (unchanged anchor)
  addChartTitle(s, "YTD price return, rebased to 100", 0.5, 1.55);
  s.addChart(pres.charts.LINE,
    [
      { name: "Semis",    labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100, 110, 118, 128, 138] },
      { name: "Nasdaq",   labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100,  98,  96,  99, 104] },
      { name: "Software", labels: ["Jan 1", "Jan 31", "Feb 28", "Mar 31", "Apr 17"], values: [100,  88,  78,  76,  80] },
    ],
    lineOpts({ x: 0.5, y: 1.95, w: 4.3, h: 3.75 })
  );

  // RIGHT: two stacked qualitative panels — language + iconography, no hero stat
  const panelX = 5.2, panelW = 4.3, panelH = 1.80;
  const drawPanel = (panelY, accent, eyebrow, thesis, drivers) => {
    // Card chrome — white fill, light border, accent bar flush along the top
    s.addShape(pres.shapes.RECTANGLE, {
      x: panelX, y: panelY, w: panelW, h: panelH,
      fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: panelX, y: panelY, w: panelW, h: 0.06,
      fill: { color: accent }, line: { color: accent, width: 0 },
    });
    // Eyebrow
    s.addText(eyebrow, {
      x: panelX + 0.20, y: panelY + 0.10, w: panelW - 0.40, h: 0.20,
      fontSize: 10, color: C.medGray, bold: true, fontFace: "Arial",
      align: "left", valign: "middle", charSpacing: 3, margin: 0,
    });
    // Thesis sentence (qualitative headline for the panel)
    s.addText(thesis, {
      x: panelX + 0.20, y: panelY + 0.30, w: panelW - 0.40, h: 0.38,
      fontSize: 12, color: C.darkGray, bold: true, fontFace: "Arial",
      align: "left", valign: "middle", margin: 0,
    });
    // Driver rows: accent-colored circle + white glyph on left, prose on right
    drivers.forEach((d, i) => {
      const rowY = panelY + 0.72 + i * 0.36;
      s.addShape(pres.shapes.OVAL, {
        x: panelX + 0.20, y: rowY + 0.03, w: 0.30, h: 0.30,
        fill: { color: accent }, line: { color: accent, width: 0 },
      });
      s.addText(d.icon, {
        x: panelX + 0.20, y: rowY + 0.03, w: 0.30, h: 0.30,
        fontSize: 11, color: C.white, bold: true, fontFace: "Arial Black",
        align: "center", valign: "middle", margin: 0,
      });
      s.addText(d.text, {
        x: panelX + 0.60, y: rowY, w: panelW - 0.80, h: 0.36,
        fontSize: 9.5, color: C.darkGray, fontFace: "Arial",
        align: "left", valign: "middle", margin: 0,
      });
    });
  };

  drawPanel(1.95, C.orange, "WHY SEMIS ARE UP",
    "Sold out, with demand still building.",
    [
      { icon: "⚙", text: [
        { text: "HBM sold out through 2026; hyperscalers are locking in every GB of memory they can secure.", options: {} },
        { text: " 1", options: { color: C.orange, fontSize: 7, superscript: true } },
      ] },
      { icon: "⚡", text: "Data-center power demand keeps pulling forward; each new model generation wants more silicon." },
      { icon: "↑", text: "ASPs and margins are expanding across memory and advanced-node logic." },
    ]
  );

  drawPanel(3.85, C.red, "WHY SOFTWARE IS DOWN",
    "Per-seat pricing is under attack.",
    [
      { icon: "◉", text: "Agentic AI threatens per-seat pricing; 2026 CIO surveys flag displacement risk on horizontal SaaS." },
      { icon: "✕", text: [
        { text: "Public SaaS multiples re-rated lower as buyers underwrite slower seat growth and pricing pressure.", options: {} },
        { text: " 2", options: { color: C.red, fontSize: 7, superscript: true } },
      ] },
      { icon: "↓", text: "Renewals slowing and deal cycles stretching as customers wait for vendor AI roadmaps to settle." },
    ]
  );

  // Italic synthesis strip — divergence summary + private-market spillover
  s.addText("One theme, two outcomes — and software's pain is now bleeding into private equity and private credit, both anchored in SaaS.", {
    x: 0.5, y: 5.85, w: 9.0, h: 0.3,
    fontSize: 9.5, color: C.medGray, italic: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
  });

  addCitations(s, [
    { n: "1", text: "TrendForce via Data Center Dynamics, 2026" },
    { n: "2", text: "multiples.vc public software multiples, Apr 2026" },
  ]);

  addFooter(s, 13);
}

// ===================================================================
// SLIDE 14 — The bubble question (vs 2000, with icons)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "The bubble question.");
  addSubhead(s, "Four tests. Same questions investors asked about Cisco and the dotcoms. Different answers today.");
  addHeadlineRule(s);

  const tests = [
    { icon: "$",  test: "PRICE PER DOLLAR OF EARNINGS",  y2000: "131×", y2000mark: "1", y2000sub: "Cisco fwd P/E, Mar 2000",       y2026: "~24×",   y2026mark: "2", y2026sub: "NVIDIA fwd P/E, Apr 17, 2026" },
    { icon: "%",  test: "LEADER PROFITABILITY",          y2000: "14%",  y2000mark: "3", y2000sub: "of tech IPOs were profitable",  y2026: "26%",    y2026mark: "4", y2026sub: "Mag 7 avg net margin (2× S&P)" },
    { icon: "⇅",  test: "SUPPLY VS. DEMAND",             y2000: "Oversupply", y2000mark: "5", y2000sub: "$500B dark fiber unused", y2026: "Sold out", y2026mark: "6", y2026sub: "GPU 2nd market 90–95% of list" },
    { icon: "◨",  test: "BUYER BALANCE SHEETS",          y2000: "20+",  y2000mark: "7", y2000sub: "major telcos went bankrupt",    y2026: "~48%",   y2026mark: "8", y2026sub: "hyperscaler net debt/EBITDA (vs ~80% S&P)" },
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
    s.addText([
      { text: t.y2000, options: { bold: true, color: C.red, fontSize: 16 } },
      { text: " " + t.y2000mark, options: { color: C.red, fontSize: 9, superscript: true } },
      { text: "  " + t.y2000sub, options: { color: C.medGray, fontSize: 9 } },
    ], {
      x: 3.95, y: y, w: 2.7, h: 0.72, fontFace: "Arial", valign: "middle", margin: 0.08,
    });
    s.addText([
      { text: t.y2026, options: { bold: true, color: C.green, fontSize: 16 } },
      { text: " " + t.y2026mark, options: { color: C.green, fontSize: 9, superscript: true } },
      { text: "  " + t.y2026sub, options: { color: C.medGray, fontSize: 9 } },
    ], {
      x: 6.7, y: y, w: 2.8, h: 0.72, fontFace: "Arial", valign: "middle", margin: 0.08,
    });
  });

  // Summary banner — pushed up slightly to make room for citation block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.55, w: 9.0, h: 0.4,
    fill: { color: C.yellow }, line: { color: C.yellow, width: 0 },
  });
  s.addText([
    { text: "Corrections happen. Bubbles require stretched valuations AND supply exceeding demand. ", options: { color: C.black, fontSize: 11 } },
    { text: "Neither condition holds today.", options: { color: C.red, fontSize: 11.5, bold: true } },
  ], {
    x: 0.7, y: 5.55, w: 8.6, h: 0.4,
    fontFace: "Arial", bold: true, valign: "middle", margin: 0,
  });

  // Numbered citation list — source attribution only; the stat being cited is visible
  // next to each superscript marker above.
  addCitations(s, [
    { n: "1", text: "Harding Loevner retrospective" },
    { n: "2", text: "GuruFocus (Apr 17, 2026)" },
    { n: "3", text: "Jay Ritter, Univ. of Florida IPO data" },
    { n: "4", text: "Bloomberg / company filings, 2025 TTM" },
    { n: "5", text: "FCC / industry retrospectives" },
    { n: "6", text: "CoreWeave / 2nd-market trackers, 2026" },
    { n: "7", text: "Public filings / press retrospectives, 2001–02" },
    { n: "8", text: "Bloomberg, 2025 YE" },
  ]);

  addFooter(s, 14);
}

// ===================================================================
// SLIDE 15 — Supply chain fragility (redesigned: 4-link chain + reshoring timeline, no hero stats)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Four single points of failure.");
  addSubhead(s, "Three of the four sit in Asia, and all four are single-sourced. US reshoring is real — but most leading-edge capacity doesn't ship until 2027+.");
  addHeadlineRule(s);

  // CHAIN — four chokepoint cards across the top
  const links = [
    {
      country: "NETHERLANDS", icon: "▲", layer: "EUV Litho",
      prose: "Only firm in the world building EUV scanners — new machines ship in dozens per year, not hundreds.",
      mark: "1",
    },
    {
      country: "TAIWAN", icon: "▦", layer: "Leading Logic",
      prose: "Virtually every advanced-node chip runs through TSMC fabs in Hsinchu and Tainan — no real volume alternative exists.",
      mark: "2",
    },
    {
      country: "KOREA", icon: "☰", layer: "HBM Memory",
      prose: "Two Korean firms supply nearly all the high-bandwidth memory AI accelerators depend on — both booked through 2026.",
      mark: "3",
    },
    {
      country: "TAIWAN", icon: "◫", layer: "Advanced Packaging",
      prose: "TSMC's CoWoS step fuses the GPU die to its HBM stack — the only volume supplier, sold out through 2026.",
      mark: "4",
    },
  ];

  const cardW = 2.10, cardH = 2.10, cardGap = 0.10;
  const cardStartX = 0.5;
  const cardY = 1.95;
  links.forEach((lk, i) => {
    const x = cardStartX + i * (cardW + cardGap);
    // Header bar — country code in white on red
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY, w: cardW, h: 0.30,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    s.addText(lk.country, {
      x: x, y: cardY, w: cardW, h: 0.30,
      fontSize: 10, color: C.white, bold: true, fontFace: "Arial",
      align: "center", valign: "middle", charSpacing: 3, margin: 0,
    });
    // Body card
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: cardY + 0.30, w: cardW, h: cardH - 0.30,
      fill: { color: C.white }, line: { color: C.lightGray, width: 0.5 },
    });
    // Big icon glyph
    s.addText(lk.icon, {
      x: x, y: cardY + 0.35, w: cardW, h: 0.50,
      fontSize: 36, color: C.red, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0,
    });
    // Layer name
    s.addText(lk.layer, {
      x: x, y: cardY + 0.88, w: cardW, h: 0.30,
      fontSize: 13, color: C.darkGray, bold: true, fontFace: "Arial",
      align: "center", valign: "middle", margin: 0,
    });
    // Accent rule under layer name
    s.addShape(pres.shapes.LINE, {
      x: x + 0.55, y: cardY + 1.23, w: 1.00, h: 0,
      line: { color: C.red, width: 1.5 },
    });
    // Qualitative prose with citation marker
    s.addText([
      { text: lk.prose, options: {} },
      { text: " " + lk.mark, options: { color: C.red, fontSize: 7, superscript: true } },
    ], {
      x: x + 0.12, y: cardY + 1.33, w: cardW - 0.24, h: 0.70,
      fontSize: 9, color: C.darkGray, fontFace: "Arial",
      align: "left", valign: "top", margin: 0,
    });
  });

  // RESHORING TIMELINE — horizontal year axis with US fab milestones
  s.addText("US RESHORING — WHEN LEADING-EDGE CAPACITY COMES ONLINE", {
    x: 0.5, y: 4.30, w: 9.0, h: 0.25,
    fontSize: 10, color: C.darkGray, bold: true, fontFace: "Arial",
    align: "left", valign: "middle", charSpacing: 3, margin: 0,
  });

  const axisY = 5.00;
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: axisY, w: 8.6, h: 0,
    line: { color: C.darkGray, width: 1.5 },
  });

  const fabs = [
    { name: "TSMC AZ Fab 1",   year: "2025",  x: 0.70 },
    { name: "Samsung Taylor",  year: "2026",  x: 2.85 },
    { name: "TSMC AZ Fab 2",   year: "2027",  x: 5.00 },
    { name: "Intel Ohio",      year: "2028",  x: 7.15 },
    { name: "Micron Clay NY",  year: "2030+", x: 9.30 },
  ];

  fabs.forEach((f, i) => {
    // Dot marker straddling the axis
    s.addShape(pres.shapes.OVAL, {
      x: f.x - 0.08, y: axisY - 0.08, w: 0.16, h: 0.16,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    // Fab name above the axis (asymmetric alignment so end labels stay in margins)
    let labelX, labelW, labelAlign;
    if (i === 0) { labelX = 0.50; labelW = 1.40; labelAlign = "left"; }
    else if (i === fabs.length - 1) { labelX = 8.10; labelW = 1.40; labelAlign = "right"; }
    else { labelX = f.x - 0.85; labelW = 1.70; labelAlign = "center"; }
    s.addText(f.name, {
      x: labelX, y: 4.60, w: labelW, h: 0.30,
      fontSize: 10, color: C.darkGray, bold: true, fontFace: "Arial",
      align: labelAlign, valign: "bottom", margin: 0,
    });
    // Year label below the axis
    let yearX, yearW, yearAlign;
    if (i === 0) { yearX = 0.40; yearW = 0.70; yearAlign = "left"; }
    else if (i === fabs.length - 1) { yearX = 8.70; yearW = 0.80; yearAlign = "right"; }
    else { yearX = f.x - 0.40; yearW = 0.80; yearAlign = "center"; }
    s.addText(f.year, {
      x: yearX, y: 5.15, w: yearW, h: 0.25,
      fontSize: 10, color: C.red, bold: true, fontFace: "Arial",
      align: yearAlign, valign: "top", margin: 0,
    });
  });

  // Italic synthesis strip
  s.addText("Each link is single-sourced — and there is no spare capacity in the chain to absorb a shock at any one of them.", {
    x: 0.5, y: 5.85, w: 9.0, h: 0.3,
    fontSize: 9.5, color: C.medGray, italic: true, fontFace: "Arial",
    align: "center", valign: "middle", margin: 0,
  });

  addCitations(s, [
    { n: "1", text: "ASML 2025 annual report" },
    { n: "2", text: "TrendForce / Counterpoint, 2025" },
    { n: "3", text: "TrendForce HBM tracker; SK Hynix Q1 2026 commentary" },
    { n: "4", text: "TSMC Q4 2025 earnings commentary" },
  ]);

  addFooter(s, 15);
}

// ===================================================================
// SLIDE 16 — Policy & regulation (redesigned: icon + items, no hero stats per column)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Export controls, EU rules, and rare-earths decide who sells what");
  addSubhead(s, "Export controls, EU compliance, and reshoring subsidies now decide who can sell what, to whom, from where.");
  addHeadlineRule(s);

  const cols = [
    {
      x: 0.5, accent: C.red, title: "EXPORT CONTROLS", icon: "▣",
      items: [
        { text: "H100 / H200 / Blackwell banned from China.", mark: "1" },
        { text: "H20 reinstated with a 15% Treasury fee.",     mark: "2" },
        { text: "$5.5B NVIDIA H20 writedown.",                  mark: "3" },
        { text: "ASML DUV banned; China ~20% of revenue.",      mark: "4" },
      ],
    },
    {
      x: 3.6, accent: C.orange, title: "AI REGULATION", icon: "§",
      items: [
        { text: "EU AI Act enforcement: Aug 2, 2026.",          mark: "5" },
        { text: "Fines up to €35M or 7% of global revenue.",    mark: "6" },
        { text: "Initial compliance: $8–15M per system.",       mark: "7" },
        { text: "Only 36% of enterprises feel prepared.",       mark: "8" },
      ],
    },
    {
      x: 6.7, accent: C.gold, title: "TRADE & RESHORING", icon: "⚒",
      items: [
        { text: "CHIPS Act: ~$36B committed of $52.7B.",        mark: "9"  },
        { text: "China controls ~90% of rare-earth processing.", mark: "10" },
        { text: "Gallium / germanium controls since Jul 2023.", mark: "11" },
        { text: "SMIC 5nm yield ~20% vs >70% threshold.",       mark: "12" },
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
    // Bulleted items with inline superscript citation markers
    const runs = [];
    col.items.forEach((it, i) => {
      runs.push({ text: it.text, options: { bullet: true } });
      runs.push({
        text: " " + it.mark,
        options: { superscript: true, fontSize: 7, breakLine: i < col.items.length - 1 },
      });
    });
    s.addText(runs, {
      x: col.x + 0.2, y: 3.75, w: 2.45, h: 2.05,
      fontSize: 10, color: C.darkGray, fontFace: "Arial", valign: "top", paraSpaceAfter: 5,
    });
  });

  addCitations(s, [
    { n: "1",  text: "US BIS export rules, 2023–25" },
    { n: "2",  text: "US Treasury / NVIDIA, Jul 2025" },
    { n: "3",  text: "NVIDIA 10-Q, FY26 Q1" },
    { n: "4",  text: "ASML 2025 annual report" },
    { n: "5",  text: "EU AI Act, Article 99" },
    { n: "6",  text: "EU AI Act, Article 99" },
    { n: "7",  text: "EU Commission / law firm analyses, 2025" },
    { n: "8",  text: "Gartner enterprise AI readiness, 2026" },
    { n: "9",  text: "US Commerce Dept CHIPS Office, Nov 2025" },
    { n: "10", text: "IEA / USGS rare-earth reports, 2025" },
    { n: "11", text: "China MOFCOM, Jul 2023" },
    { n: "12", text: "TechInsights / trade press, 2025–26" },
  ]);

  addFooter(s, 16);
}

// ===================================================================
// SLIDE 17 — AI backlash (redesigned: taller image, 3 narrative cards, framing paragraph)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "RISKS");
  addHeadline(s, "Communities, voters, and labor are pricing the AI infrastructure bet lower");
  addSubhead(s, "NIMBY revolt, anti-AI sentiment, and a labor shortage are each capable of pricing the infrastructure bet lower.");
  addHeadlineRule(s);

  // LEFT: taller-aspect protest banner image (slightly taller to match right column)
  addImagePlaceholder(s, 0.5, 1.85, 3.5, 3.5, "Photojournalism — 'STOP THE AI RACE' hand-lettered protest signs at a dusk rally, shoulder-height crowd POV, warm golden-hour sky, faces in shadow, signs in sharp focus, square");

  // RIGHT: short framing paragraph above three narrative cards
  s.addText("Three forces now price the AI infrastructure bet lower: communities blocking the builds, voters souring on the technology, and a shortage of the skilled workers who wire it all up.", {
    x: 4.25, y: 1.95, w: 5.25, h: 0.75,
    fontSize: 11.5, color: C.medGray, fontFace: "Arial", valign: "top", margin: 0,
  });

  // Three narrative cards — taller, better spaced
  const supMark = (n) => ({ text: " " + n, options: { superscript: true, fontSize: 7 } });
  const notes = [
    { title: "NIMBY REVOLT", body: [
      { text: "$18B halted, $46B delayed. 142 activist groups across 24 states — Virginia leads with 42 chapters." },
      supMark("1"),
    ]},
    { title: "ANTI-AI SENTIMENT", body: [
      { text: "Only 26%" }, supMark("2"),
      { text: " (Echelon Insights, Mar 2026) of Americans view AI positively. March 2026 \"Stop the AI Race\" protests" }, supMark("3"),
      { text: " hit lab HQs in SF and DC." },
    ]},
    { title: "LABOR SHORTAGE", body: [
      { text: "A ~480K data-center workforce gap against 400+ sites under construction." }, supMark("4"),
      { text: " Talent, not capital, is binding." },
    ]},
  ];
  const CARD_X = 4.25, CARD_W = 5.25, CARD_Y0 = 2.75, CARD_H = 0.95, CARD_GAP = 0.08;
  notes.forEach((n, i) => {
    const y = CARD_Y0 + i * (CARD_H + CARD_GAP);
    // Card body
    s.addShape(pres.shapes.RECTANGLE, {
      x: CARD_X, y: y, w: CARD_W, h: CARD_H,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    // Red title bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: CARD_X, y: y, w: CARD_W, h: 0.32,
      fill: { color: C.red }, line: { color: C.red, width: 0 },
    });
    s.addText(n.title, {
      x: CARD_X, y: y, w: CARD_W, h: 0.32,
      fontSize: 10, color: C.white, bold: true, fontFace: "Arial", align: "left", valign: "middle", charSpacing: 2, margin: 0.15,
    });
    s.addText(n.body, {
      x: CARD_X + 0.15, y: y + 0.4, w: CARD_W - 0.3, h: CARD_H - 0.48,
      fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
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

  addCitations(s, [
    { n: "1", text: "Data Center Watch, 2026 NIMBY tracker" },
    { n: "2", text: "Echelon Insights, Mar 2026 AI sentiment poll" },
    { n: "3", text: "Fortune / TIME / CNN / NBC News — Stop the AI Race coverage" },
    { n: "4", text: "Data Center Frontier — workforce gap analysis" },
  ]);
  addFooter(s, 17);
}

// ===================================================================
// SLIDE 18 — Beyond the grid (orbital compute)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Orbital compute sidesteps Earth-bound bottlenecks — pilot stage today");
  addSubhead(s, [
    { text: "No interconnection queue. No permits. No water. 1,361 W/m²" },
    { text: " 1", options: { superscript: true, fontSize: 7 } },
    { text: " of unfiltered solar, 24/7. Orbital compute sidesteps Earth's bottlenecks." },
  ]);
  addHeadlineRule(s);

  // Hero image on the right
  addImagePlaceholder(s, 5.85, 1.6, 3.65, 3.8, "Render — modular orbital data-center satellite with 50-meter solar wings catching a violet tint, above Earth's dawn limb with atmospheric glow, deep indigo space, hyperrealistic Octane quality, slightly portrait");

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
      fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "left", valign: "middle", charSpacing: 3, margin: 0.30,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y + 0.35, w: 5.15, h: 0.8,
      fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
    });
    s.addText(c.body, {
      x: 0.75, y: y + 0.4, w: 4.75, h: 0.72,
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
    { text: " 2", options: { color: C.white, fontSize: 8, superscript: true } },
  ], {
    x: 0.7, y: 5.85, w: 8.6, h: 0.4, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addCitations(s, [
    { n: "1", text: "NASA solar constant, 1,361 W/m² at 1 AU" },
    { n: "2", text: "FCC filings; Starcloud, SpaceX, Google Suncatcher, Aetherflux announcements; CNBC" },
  ]);
  addFooter(s, 18);
}

// ===================================================================
// SLIDE 19 — Physical AI
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Humanoids hit pilot scale — every robot is a walking inference endpoint");
  addSubhead(s, "Humanoids enter manufacturing, logistics, and healthcare at pilot scale. Every robot is a walking inference endpoint.");
  addHeadlineRule(s);

  addImagePlaceholder(s, 1.5, 1.6, 7.0, 2.2, "Panoramic photo — humanoid robot mid-stride on a factory floor, matte-white body with violet joint accents, motion blur on limbs, amber work-lights, a blurred human worker in a safety vest in the background");

  const supMark19 = (n) => ({ text: " " + n, options: { superscript: true, fontSize: 6.5 } });
  const cards = [
    { title: "PHYSICAL WORK", body: [
      { text: "Manufacturing, logistics, warehousing, agriculture, healthcare — pilots are underway." },
      supMark19("1"),
    ]},
    { title: "TIRELESS COWORKERS", body: [
      { text: "Humanoids take hazardous and ergonomically punishing tasks. Humans keep judgment." },
    ]},
    { title: "INFERENCE AT THE EDGE", body: [
      { text: "Every robot runs foundation models in real time. At scale, rivals LLM compute." },
      supMark19("2"),
    ]},
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
    { text: " 3", options: { color: C.white, fontSize: 8, superscript: true } },
  ], {
    x: 0.7, y: 5.85, w: 8.6, h: 0.4, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addCitations(s, [
    { n: "1", text: "Goldman Sachs — humanoid robotics market outlook" },
    { n: "2", text: "NVIDIA FY2026 — robotics compute keynotes" },
    { n: "3", text: "Tesla, Figure AI, Hyundai/Boston Dynamics, Unitree, Agility — company announcements" },
  ]);
  addFooter(s, 19);
}

// ===================================================================
// SLIDE 20 — Autonomous mobility
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "Every autonomous mile compounds — every AV runs frontier edge compute");
  addSubhead(s, "More miles → better models → more deployments. Every vehicle is a rolling inference machine consuming frontier-scale compute.");
  addHeadlineRule(s);

  addImagePlaceholder(s, 0.5, 1.6, 2.8, 4.15, "Long-exposure photo — white minivan robotaxi with a violet-glowing roof lidar on a rainy dusk city street, red and white traffic light trails, wet asphalt reflecting neon storefronts, tall portrait");

  const supMark20 = (n) => ({ text: " " + n, options: { superscript: true, fontSize: 7 } });
  const cards = [
    { title: "THE SAFETY CASE", body: [
      { text: "Human drivers cause ~1.35M deaths a year." }, supMark20("1"),
      { text: " Autonomous systems don't tire or lose focus." },
    ]},
    { title: "DATA FLYWHEEL", body: [
      { text: "Every mile generates training data. Better models unlock more cities. Flywheel self-reinforces." },
    ]},
    { title: "EDGE INFERENCE", body: [
      { text: "Each AV runs thousands of AI ops / second across cameras, lidar, radar — frontier-scale compute." },
      supMark20("2"),
    ]},
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
    { text: " 3", options: { color: C.white, fontSize: 8, superscript: true } },
  ], {
    x: 0.7, y: 5.9, w: 8.6, h: 0.35, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addCitations(s, [
    { n: "1", text: "WHO Global Road Safety report" },
    { n: "2", text: "NVIDIA FY2026 — automotive/DRIVE platform" },
    { n: "3", text: "Waymo, Tesla, Baidu Apollo, Aurora — company disclosures" },
  ]);
  addFooter(s, 20);
}

// ===================================================================
// SLIDE 21 — AI in biology (educational: 3 mechanisms, no hero stat)
// ===================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, "FRONTIER");
  addHeadline(s, "AI is rewriting drug discovery.");
  addSubhead(s, "Three mechanisms compress the R&D cycle's earliest stages from years to hours. Clinical trials still take years — AI collapses the design stage, not the regulatory one.");
  addHeadlineRule(s);

  // Image on the left, taller
  addImagePlaceholder(s, 0.5, 1.85, 3.3, 3.67, "Render — protein ribbon diagram in a violet-to-magenta-to-gold gradient on graphite black, razor-sharp front with softly-blurred back, faint electron-density mesh around the structure, no labels or annotations");

  // Three educational mechanism cards stacked on the right
  const supMark21 = (n) => ({ text: " " + n, options: { superscript: true, fontSize: 6.5 } });
  const stages = [
    {
      num: "01",
      title: "STRUCTURE PREDICTION",
      body: [
        { text: "Predicting a protein's 3D shape from its amino-acid sequence was a 50-year unsolved problem. Crystallography took months per protein. Deep learning now infers structure in seconds" },
        supMark21("1"),
        { text: " — unlocking every drug target at once." },
      ],
    },
    {
      num: "02",
      title: "GENERATIVE MOLECULE DESIGN",
      body: [
        { text: "There are ~10⁶⁰ drug-like small molecules." },
        supMark21("2"),
        { text: " Wet labs can screen millions. Generative models search the rest — proposing novel binders optimized for selectivity, potency, and drug-like properties." },
      ],
    },
    {
      num: "03",
      title: "IN SILICO VALIDATION",
      body: [
        { text: "Molecular dynamics and binding-affinity prediction filter candidates before synthesis. Weeks of bench work become hours of GPU compute. Far fewer molecules reach animal testing." },
      ],
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
  s.addText([
    { text: "Traditional pharma: 10–15 years, ~$2.6B per approved drug, <10% Phase I success." },
    { text: " 3", options: { superscript: true, fontSize: 7 } },
    { text: " AI collapses the design stage — clinical trials are still bound by biology and the FDA." },
  ], {
    x: 0.7, y: 5.68, w: 8.6, h: 0.42,
    fontSize: 10, color: C.black, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  addCitations(s, [
    { n: "1", text: "Jumper et al., AlphaFold, Nature 2020" },
    { n: "2", text: "Hughes et al., Br. J. Pharmacol. — screening scale" },
    { n: "3", text: "Tufts CSDD — drug-development cost and timeline" },
  ]);
  addFooter(s, 21);
}

// ===================================================================
// SLIDE 22: Big-picture takeaways
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Generational scale. Winners diverge. Trade evolves. Exposure is a thesis.", { w: 9.0 });
  addSubhead(s, "Four big-picture takeaways.");
  addHeadlineRule(s);

  const items = [
    { n: "01", accent: C.teal,
      statement: "AI is the defining capital-allocation event of this decade.",
      support: "A handful of hyperscalers are deploying capital fast enough to reshape power grids, real estate, and global supply chains all at once. AI capex has become the dominant driver of US business investment, and the scale itself is the story." },
    { n: "02", accent: C.gold,
      statement: "The AI buildout is producing sharp winners and sharp losers.",
      support: "Foundries, memory, and the picks-and-shovels of AI infrastructure are surging, while parts of legacy software and SaaS are getting cannibalized by AI-native competitors. Returns inside the AI complex have dispersed sharply, and the spread keeps widening." },
    { n: "03", accent: C.red,
      statement: "The AI trade keeps evolving as bottlenecks shift through the stack.",
      support: "Yesterday it was foundry capacity. Today it is memory and advanced packaging. Tomorrow it will be power and the grid. The binding constraint keeps moving, and the names that lead the trade move with it." },
    { n: "04", accent: C.purple,
      statement: "The question isn't whether you have AI exposure. It's whether you chose it.",
      support: "US large-cap indices already embed AI capex exposure at concentrated weights. Recognize that exposure, size it, or hedge it, but the position should be a deliberate choice rather than a default." },
  ];

  const y0 = 1.60;
  const rowH = 1.12;
  const blockW = 0.95;
  const blockH = 0.95;

  items.forEach((it, i) => {
    const y = y0 + i * rowH;

    // Number block (left)
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: y, w: blockW, h: blockH,
      fill: { color: it.accent }, line: { color: it.accent, width: 0 },
    });
    s.addText(it.n, {
      x: 0.5, y: y, w: blockW, h: blockH,
      fontSize: 26, color: C.white, bold: true, fontFace: "Arial Black",
      align: "center", valign: "middle", margin: 0,
    });

    // Statement (top of right column)
    s.addText(it.statement, {
      x: 1.65, y: y + 0.02, w: 7.85, h: 0.36,
      fontSize: 15, color: C.darkGray, bold: true, fontFace: "Arial",
      valign: "top", margin: 0,
    });
    // Supporting paragraph (below statement)
    s.addText(it.support, {
      x: 1.65, y: y + 0.40, w: 7.85, h: 0.68,
      fontSize: 10.5, color: C.medGray, fontFace: "Arial",
      valign: "top", margin: 0,
    });
  });

  addSource(s, "Sources: company filings; Goldman Sachs; SemiAnalysis; BofA; TrendForce. See appendix for figure-by-figure citations.", 0.5, 6.15, 9.0);
  addFooter(s, 22);
}

// ===================================================================
// SLIDE A1 — Appendix: sources (LANDSCAPE · MARKET · SHIFTS)
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Appendix — sources (1 of 2).");
  addSubhead(s, "Every figure, where to find it. LANDSCAPE · MARKET · SHIFTS.");
  addHeadlineRule(s);

  // Legend / retrieval-date note
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.55, w: 9.0, h: 0.35,
    fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
  });
  s.addText("All figures retrieved as of Apr 2026 unless noted. Market caps & consensus: companiesmarketcap.com · stockanalysis.com. YTD returns: Yahoo Finance (Apr 17, 2026).", {
    x: 0.7, y: 1.55, w: 8.6, h: 0.35,
    fontSize: 8.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
  });

  const COL_Y = 2.05, COL_H = 4.25;
  const COL_W = 2.87, GAP = 0.20;
  const appendixCols1 = [
    {
      x: 0.5, label: "LANDSCAPE  ·  3–6", color: C.teal,
      entries: [
        { slide: "Slide 3",  fig: "\"~$750B hyperscaler capex, 2026\"",  src: "CreditSights / MUFG estimates (Apr 2026)" },
        { slide: "Slide 3",  fig: "Jensen Huang \"most important\" remarks", src: "public appearance, Sept 2025" },
        { slide: "Slide 4",  fig: "Six-phase evolution timeline",        src: "Strategy Research synthesis" },
        { slide: "Slide 5",  fig: "11-layer AI stack",                   src: "Strategy Research" },
        { slide: "Slide 6",  fig: "Internet / PC adoption curves",       src: "Mary Meeker, Bond / KPCB Internet Trends 2019" },
        { slide: "Slide 6",  fig: "AI revenue Y0–Y4 trajectory",         src: "company filings and consensus estimates" },
      ],
    },
    {
      x: 0.5 + COL_W + GAP, label: "MARKET  ·  7–11", color: C.gold,
      entries: [
        { slide: "Slide 7",  fig: "Four-stage AI chipmaking process",     src: "SIA / SEMI industry taxonomy" },
        { slide: "Slide 7",  fig: "\"$20B fab\" cost benchmark",           src: "SEMI World Fab Forecast; TSMC / Samsung capex disclosures" },
        { slide: "Slide 7",  fig: "HBM + CoWoS advanced packaging",        src: "TrendForce; TSMC CoWoS capacity disclosures" },
        { slide: "Slide 8",  fig: "\"~60% hyperscaler share of AI chips\"", src: "SemiAnalysis / Omdia 2026E estimates" },
        { slide: "Slide 8",  fig: "Hyperscaler 2026 capex guides",        src: "AWS, MSFT, GOOGL, META, ORCL filings" },
        { slide: "Slide 9",  fig: "\"~12% US electricity by 2028\"",      src: "EPRI (2024) data-center load forecast" },
        { slide: "Slide 9",  fig: "\"1 GW typical AI campus\"",           src: "LBNL, DOE" },
        { slide: "Slide 9",  fig: "\"~5 yr interconnection wait\"",       src: "PJM, ERCOT interconnection queues" },
        { slide: "Slide 9",  fig: "TMI reopening",                        src: "Microsoft / Constellation (Sept 2024)" },
        { slide: "Slide 10", fig: "OpenAI $852B @ ~35× ARR",              src: "TechCrunch, Sacra ARR run-rates" },
        { slide: "Slide 10", fig: "Anthropic $380B",                      src: "TechCrunch, Bloomberg (Feb 2026)" },
        { slide: "Slide 10", fig: "Alphabet $2.3T / ~$85B 2026 capex",    src: "Alphabet 10-K and 2026 capex guide" },
        { slide: "Slide 10", fig: "xAI / SpaceX $1.25T merger",           src: "CNBC, TechCrunch (Feb 2, 2026)" },
        { slide: "Slide 10", fig: "Q1 2026 funding 2× all of 2025",       src: "Crunchbase Q1 2026 VC data" },
        { slide: "Slide 11", fig: "Top 10 Tech vs Non-Tech metrics",      src: "stockanalysis.com consensus (Apr 22, 2026)" },
        { slide: "Slide 11", fig: "Market caps",                          src: "companiesmarketcap.com (Apr 22, 2026)" },
      ],
    },
    {
      x: 0.5 + 2 * (COL_W + GAP), label: "SHIFTS  ·  12–13", color: C.orange,
      entries: [
        { slide: "Slide 12", fig: "\"10–100× compute per session\"",       src: "Anthropic, OpenAI; Morgan Stanley CIO Survey" },
        { slide: "Slide 12", fig: "Chatbot vs agent token counts",         src: "Anthropic, OpenAI; GitHub Trending" },
        { slide: "Slide 13", fig: "YTD prices rebased to 100",             src: "Yahoo Finance (Apr 17, 2026)" },
        { slide: "Slide 13", fig: "Memory supercycle single-stock YTDs",   src: "Yahoo Finance; Counterpoint Research" },
        { slide: "Slide 13", fig: "Software single-stock YTDs",            src: "Yahoo Finance; Morgan Stanley CIO Survey" },
        { slide: "Slide 13", fig: "BDC index / PE SaaS marks",             src: "Bloomberg BDC; PitchBook secondary marks" },
      ],
    },
  ];

  appendixCols1.forEach(col => {
    // Colored section bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: COL_Y, w: COL_W, h: 0.22,
      fill: { color: col.color }, line: { color: col.color, width: 0 },
    });
    s.addText(col.label, {
      x: col.x, y: COL_Y, w: COL_W, h: 0.22,
      fontSize: 9, color: col.color === C.gold ? C.black : C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });

    // Entries
    const runs = [];
    col.entries.forEach((e, i) => {
      const last = i === col.entries.length - 1;
      runs.push({ text: e.slide + "  ·  ", options: { bold: true, color: C.black, fontSize: 8.5, fontFace: "Arial" } });
      runs.push({ text: e.fig,             options: { color: C.black, fontSize: 8.5, fontFace: "Arial" } });
      runs.push({ text: "  —  ",           options: { color: C.medGray, fontSize: 8.5, fontFace: "Arial" } });
      runs.push({ text: e.src,             options: { color: C.medGray, italic: true, fontSize: 8.5, fontFace: "Arial", breakLine: !last } });
    });
    s.addText(runs, {
      x: col.x + 0.05, y: COL_Y + 0.30, w: COL_W - 0.1, h: COL_H - 0.35,
      fontFace: "Arial", valign: "top", paraSpaceAfter: 2, margin: 0,
    });
  });

  addSource(s, "Appendix 1 of 2 — continues on the next page with RISKS, FRONTIER, and TAKEAWAYS.");
  addFooter(s, 23);
}

// ===================================================================
// SLIDE A2 — Appendix: sources (RISKS · FRONTIER · TAKEAWAYS)
// ===================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Appendix — sources (2 of 2).");
  addSubhead(s, "Every figure, where to find it. RISKS · FRONTIER · TAKEAWAYS.");
  addHeadlineRule(s);

  // Legend / retrieval-date note
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.55, w: 9.0, h: 0.35,
    fill: { color: C.offWhite }, line: { color: C.lightGray, width: 0.5 },
  });
  s.addText("All figures retrieved as of Apr 2026 unless noted. Market caps & consensus: companiesmarketcap.com · stockanalysis.com. YTD returns: Yahoo Finance (Apr 17, 2026).", {
    x: 0.7, y: 1.55, w: 8.6, h: 0.35,
    fontSize: 8.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
  });

  const COL_Y = 2.05, COL_H = 4.25;
  const COL_W = 2.87, GAP = 0.20;
  const appendixCols2 = [
    {
      x: 0.5, label: "RISKS  ·  14–17", color: C.red,
      entries: [
        { slide: "Slide 14", fig: "\"131× Cisco fwd P/E, Mar 2000\"",   src: "Harding Loevner" },
        { slide: "Slide 14", fig: "\"~24× NVDA fwd P/E, Apr 17 2026\"", src: "GuruFocus" },
        { slide: "Slide 14", fig: "\"14% of 2000 tech IPOs profitable\"", src: "Jay Ritter, University of Florida" },
        { slide: "Slide 14", fig: "\"$500B dark fiber unused\"",        src: "FCC dark-fiber data" },
        { slide: "Slide 14", fig: "\"GPU 2nd market 90–95% list\"",     src: "CoreWeave 2nd-market pricing" },
        { slide: "Slide 14", fig: "\"Hyperscaler net debt/EBITDA ~48%\"", src: "Bloomberg" },
        { slide: "Slide 15", fig: "\"TSMC ~90% advanced-node share\"",  src: "TSMC filings; SIA" },
        { slide: "Slide 15", fig: "\"SK Hynix + Samsung ~76% DRAM\"",   src: "TrendForce; SIA" },
        { slide: "Slide 15", fig: "\"ASML <100 EUV / yr\"",             src: "ASML filings" },
        { slide: "Slide 15", fig: "US reshoring fab timelines",         src: "TSMC, Samsung, Micron, Intel filings" },
        { slide: "Slide 15", fig: "\"CHIPS $36B of $52.7B committed\"", src: "US Commerce Dept (Nov 2025)" },
        { slide: "Slide 16", fig: "H100/H200/Blackwell export ban",     src: "US Bureau of Industry and Security" },
        { slide: "Slide 16", fig: "\"NVIDIA $5.5B H20 writedown\"",     src: "NVIDIA 10-Q" },
        { slide: "Slide 16", fig: "ASML DUV ban; China ~20% revenue",   src: "ASML filings" },
        { slide: "Slide 16", fig: "\"EU AI Act Aug 2, 2026 enforcement\"", src: "EU AI Act Article 99 / Chapter V" },
        { slide: "Slide 16", fig: "\"SMIC 5nm yield ~20%\"",            src: "public industry reports" },
        { slide: "Slide 17", fig: "\"$18B halted / $46B delayed\"",     src: "Data Center Watch" },
        { slide: "Slide 17", fig: "\"142 activist groups, 24 states\"", src: "Data Center Watch" },
        { slide: "Slide 17", fig: "\"26% of Americans positive on AI\"", src: "Echelon Insights" },
        { slide: "Slide 17", fig: "\"Stop the AI Race\" Mar 2026 protests", src: "Stop the AI Race; TIME; CNN" },
        { slide: "Slide 17", fig: "\"~480K data-center workforce gap\"", src: "Data Center Frontier" },
      ],
    },
    {
      x: 0.5 + COL_W + GAP, label: "FRONTIER  ·  18–21", color: C.purple,
      entries: [
        { slide: "Slide 18", fig: "\"1,361 W/m² unfiltered solar\"",    src: "solar constant (physical)" },
        { slide: "Slide 18", fig: "Orbital compute players",            src: "FCC filings; Starcloud, SpaceX, Google Suncatcher, Aetherflux; CNBC" },
        { slide: "Slide 19", fig: "Humanoid deployments in pilots",     src: "Goldman Sachs humanoid research" },
        { slide: "Slide 19", fig: "Player list",                        src: "Tesla, Figure, Boston Dynamics, Unitree, Agility announcements" },
        { slide: "Slide 20", fig: "\"~1.35M road deaths / year\"",      src: "WHO Global Road Safety" },
        { slide: "Slide 20", fig: "AV inference compute scale",         src: "NVIDIA FY2026" },
        { slide: "Slide 21", fig: "AlphaFold structure prediction",     src: "Jumper et al., Nature 2020" },
        { slide: "Slide 21", fig: "\"~10⁶⁰ drug-like small molecules\"", src: "Hughes et al., Br. J. Pharmacol." },
        { slide: "Slide 21", fig: "\"10–15 yrs / ~$2.6B per drug\"",    src: "Tufts CSDD drug-development studies" },
        { slide: "Slide 21", fig: "\"<10% Phase I success\"",           src: "Hughes et al., Br. J. Pharmacol." },
      ],
    },
    {
      x: 0.5 + 2 * (COL_W + GAP), label: "TAKEAWAYS  ·  22", color: C.black,
      entries: [
        { slide: "Slide 22", fig: "\"~$750B hyperscaler 2026 capex\"",  src: "CreditSights / MUFG (Apr 2026)" },
        { slide: "Slide 22", fig: "\"AI correlation 80% → 20%\"",       src: "Goldman Sachs correlation data" },
        { slide: "Slide 22", fig: "\"Semis +38% / software –20% YTD\"", src: "Yahoo Finance (Apr 17, 2026)" },
        { slide: "Slide 22", fig: "\"HBM TAM $35B → $100B, 2025–28\"",  src: "BofA HBM TAM; TrendForce" },
        { slide: "Slide 22", fig: "Hyperscaler FCF impact",             src: "Amazon, Meta 10-Qs" },
      ],
    },
  ];

  appendixCols2.forEach(col => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: col.x, y: COL_Y, w: COL_W, h: 0.22,
      fill: { color: col.color }, line: { color: col.color, width: 0 },
    });
    s.addText(col.label, {
      x: col.x, y: COL_Y, w: COL_W, h: 0.22,
      fontSize: 9, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", charSpacing: 2, margin: 0,
    });

    const runs = [];
    col.entries.forEach((e, i) => {
      const last = i === col.entries.length - 1;
      runs.push({ text: e.slide + "  ·  ", options: { bold: true, color: C.black, fontSize: 8.5, fontFace: "Arial" } });
      runs.push({ text: e.fig,             options: { color: C.black, fontSize: 8.5, fontFace: "Arial" } });
      runs.push({ text: "  —  ",           options: { color: C.medGray, fontSize: 8.5, fontFace: "Arial" } });
      runs.push({ text: e.src,             options: { color: C.medGray, italic: true, fontSize: 8.5, fontFace: "Arial", breakLine: !last } });
    });
    s.addText(runs, {
      x: col.x + 0.05, y: COL_Y + 0.30, w: COL_W - 0.1, h: COL_H - 0.35,
      fontFace: "Arial", valign: "top", paraSpaceAfter: 2, margin: 0,
    });
  });

  addSource(s, "Appendix 2 of 2. End of deck.");
  addFooter(s, 24);
}

// ---------- Write ----------
pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

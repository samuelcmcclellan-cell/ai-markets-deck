// =============================================================================
// AI in the Market — June 2026
// BII visual style, 16:9 (10" x 5.625"), built with pptxgenjs
// Run: node build-deck.js
//   → outputs ai-markets-deck.pptx (15 slides)
//   → outputs slides-data.js (title / slide count / speaker notes for index.html)
//
// Data as of June 2026. Sources cited per slide and consolidated on slide 15.
// Rebuilt 2026-06-09 per OUTLINE_2026-06-09.md (fixes REVIEW_2026-04-27 issues:
// corrupt .pptx, truncated script, IMAGE: placeholders, date stamps, count).
// =============================================================================

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Strategy";
pres.title = "AI in the Market — June 2026";

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
};

// Four narrative beats → theme tags
const THEMES = {
  HAPPENING: { label: "WHAT'S HAPPENING", color: C.teal,   text: C.white },
  EQUITIES:  { label: "EQUITY MARKETS",   color: C.gold,   text: C.black },
  FINANCING: { label: "FINANCING",        color: C.orange, text: C.black },
  PORTFOLIO: { label: "PORTFOLIO",        color: C.purple, text: C.white },
};

const DATA_AS_OF = "Data as of June 2026"; // single canonical stamp (slide 15)

// ---------- Helpers ----------

function addFooter(slide, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.95, w: 10.0, h: 0.675, fill: { color: C.darkGray },
  });
  slide.addText(
    "FOR INFORMATIONAL PURPOSES ONLY. NOT INVESTMENT ADVICE. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.",
    { x: 1.5, y: 5.0, w: 7.2, h: 0.55, fontSize: 6.5, color: C.white, align: "center", fontFace: "Arial", valign: "middle", bold: true }
  );
  if (pageNum) {
    slide.addText(String(pageNum), {
      x: 9.3, y: 5.08, w: 0.5, h: 0.35, fontSize: 9, color: C.white, align: "right", fontFace: "Arial", margin: 0,
    });
  }
}

function addThemeTag(slide, theme) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 7.8, y: 0.18, w: 1.9, h: 0.32, fill: { color: theme.color }, rectRadius: 0.05,
  });
  slide.addText(theme.label, {
    x: 7.8, y: 0.18, w: 1.9, h: 0.32,
    fontSize: 9, color: theme.text, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1,
  });
}

function addHeadline(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: 0.2, w: 7.2, h: (opts && opts.h) || 0.7,
    fontSize: (opts && opts.fontSize) || 27, color: C.black, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
}

function addSubhead(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: (opts && opts.y) || 0.95, w: 9.0, h: (opts && opts.h) || 0.5,
    fontSize: 13.5, color: C.medGray, fontFace: "Arial", valign: "top", margin: 0,
  });
}

function addChartTitle(slide, text, x, w) {
  slide.addText(text, {
    x: x, y: 1.55, w: w || 4.3, h: 0.3,
    fontSize: 14, color: C.black, bold: true, fontFace: "Arial", valign: "bottom", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: x, y: 1.9, w: w || 4.3, h: 0, line: { color: C.black, width: 1.5 },
  });
}

function addSource(slide, text, y) {
  slide.addText("Source: " + text, {
    x: 0.5, y: y || 4.42, w: 9.0, h: 0.45,
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

const BAR_DEFAULTS = {
  barDir: "col",
  showTitle: false,
  catAxisLabelColor: "666666",
  valAxisLabelColor: "999999",
  catAxisLabelFontSize: 9,
  valAxisLabelFontSize: 9,
  valGridLine: { color: "E5E5E5", size: 0.5 },
  catGridLine: { style: "none" },
  showValue: true,
  dataLabelPosition: "outEnd",
  dataLabelColor: "333333",
  dataLabelFontSize: 9,
  showLegend: false,
};

// =============================================================================
// SLIDE 1 — Cover
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.yellow };
  s.addText("AI in the Market.", {
    x: 0.5, y: 1.05, w: 9.0, h: 1.0,
    fontSize: 50, color: C.black, bold: true, fontFace: "Arial Black", margin: 0,
  });
  s.addText("What the AI buildout means for\nequity markets and portfolios.", {
    x: 0.5, y: 2.15, w: 9.0, h: 1.1,
    fontSize: 27, color: C.black, bold: true, fontFace: "Arial Black", margin: 0,
  });
  s.addText("The spend is real, the financing is changing, and your index has already taken a position.", {
    x: 0.5, y: 3.45, w: 8.6, h: 0.4,
    fontSize: 15, color: C.darkGray, fontFace: "Arial", margin: 0,
  });
  s.addText("JUNE 2026", {
    x: 7.4, y: 0.3, w: 2.1, h: 0.35,
    fontSize: 16, color: C.black, fontFace: "Arial", align: "right", margin: 0, charSpacing: 2,
  });
  s.addText("Strategy  |  Institutional", {
    x: 0.5, y: 4.15, w: 5.0, h: 0.35,
    fontSize: 13, color: C.black, bold: true, fontFace: "Arial", margin: 0,
  });
  addFooter(s, "");
  s.addNotes("Frame for the room: this is not an AI explainer. It is a markets deck. Every AI fact in here exists to answer one question — what does the buildout do to equity returns, index structure, and portfolio risk. Four beats: what's happening, how it shows up in equities, how it's financed, what it means for positioning.");
}

// =============================================================================
// SLIDE 2 — The thesis (executive summary, big numbers)
// =============================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "AI spend is a market event");
  addSubhead(s, "AI infrastructure spend is at record scale, increasingly debt-financed, and embedded in benchmark portfolios — whether investors chose it or not.");

  makeBigNumber(s, "~$725B", "Big-4 hyperscaler capex guided for 2026 — up ~77% from 2025's record $410B", 0.5, 1.75, 2.9);
  makeBigNumber(s, "~37%", "of S&P 500 market cap sits in the top 10 names, near the 2025 record of 40.7%", 3.55, 1.75, 2.9, C.gold);
  makeBigNumber(s, "89pp", "YTD return spread inside the AI trade: semis +79% vs. software −10%", 6.6, 1.75, 2.9, C.teal);

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.45, w: 9.0, h: 0.85, fill: { color: C.offWhite } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.45, w: 0.08, h: 0.85, fill: { color: C.orange } });
  s.addText([
    { text: "The “so what” in three parts:  ", options: { bold: true, color: C.black } },
    { text: "(1) AI demand is real and enormous — the constraint is physical, not financial. (2) The spend has outgrown cash flow and moved into the bond market. (3) Index concentration has turned passive portfolios into active AI positions.", options: { color: C.darkGray } },
  ], { x: 0.7, y: 3.5, w: 8.6, h: 0.75, fontSize: 11.5, fontFace: "Arial", valign: "middle", margin: 0 });

  addSource(s, "Company guidance via CNBC / Tom's Hardware (Feb 2026); S&P Dow Jones Indices, MacroMicro; iShares SOXX & IGV via stockanalysis.com.");
  addFooter(s, 2);
  s.addNotes("Three numbers carry the thesis. $725B: Microsoft $190B, Amazon $200B, Alphabet $175–185B, Meta $125–145B — guided, not projected. 37%: concentration has eased off the 2025 peak of 40.7% but remains far above the 18–23% range that held from 1990–2015. 89 points: the AI trade is no longer one trade — semis up ~79% YTD while software is down ~10%. Dispersion, not direction, is the story of 2026.");
}

// =============================================================================
// SLIDE 3 — Roadmap
// =============================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Four beats, one destination");
  addSubhead(s, "The deck moves from the physical buildout to the financial system that funds it — and lands on positioning.");

  const beats = [
    { n: "1", t: "What's happening", d: "The capex supercycle and the physical constraints that shape it.", theme: THEMES.HAPPENING, slides: "Slides 4–5" },
    { n: "2", t: "How it shows up in equities", d: "Concentration, returns, and what's priced in.", theme: THEMES.EQUITIES, slides: "Slides 6–8" },
    { n: "3", t: "How it's financed", d: "Cash flow, bonds, and the new AI debt complex.", theme: THEMES.FINANCING, slides: "Slides 9–10" },
    { n: "4", t: "What it means for portfolios", d: "Concentration risk, dispersion, and implications.", theme: THEMES.PORTFOLIO, slides: "Slides 11–14" },
  ];
  beats.forEach((b, i) => {
    const x = 0.5 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.75, w: 2.1, h: 0.42, fill: { color: b.theme.color } });
    s.addText(b.n + ".  " + b.t.toUpperCase(), {
      x: x + 0.08, y: 1.75, w: 1.98, h: 0.42, fontSize: 8.5, color: b.theme.text, bold: true, fontFace: "Arial", valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.17, w: 2.1, h: 1.55, fill: { color: C.offWhite } });
    s.addText(b.d, {
      x: x + 0.1, y: 2.27, w: 1.9, h: 1.1, fontSize: 10.5, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
    s.addText(b.slides, {
      x: x + 0.1, y: 3.4, w: 1.9, h: 0.25, fontSize: 8.5, color: C.medGray, italic: true, fontFace: "Arial", margin: 0,
    });
  });

  s.addText([
    { text: "Throughline: ", options: { bold: true, color: C.black } },
    { text: "every AI development in this deck is read through one lens — equity market structure and investor positioning.", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.0, w: 9.0, h: 0.35, fontSize: 11.5, fontFace: "Arial", margin: 0 });

  addFooter(s, 3);
  s.addNotes("Quick orientation slide. Note the compression: the physical compute story — chips, power, datacenters — is deliberately one context slide. The deep version lives in the standalone briefings. This deck spends its time where the audience lives: equities and portfolio construction.");
}

// =============================================================================
// SLIDE 4 — The buildout in numbers
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.HAPPENING);
  addHeadline(s, "A ~$725B sprint, guided in public");
  addSubhead(s, "Big-4 2026 capex guidance is up ~77% year over year. Morgan Stanley puts the five-platform total (incl. Oracle) near $805B.");

  addChartTitle(s, "2026 capex guidance, $B (midpoints)", 0.5);
  s.addChart(pres.charts.BAR, [{
    name: "2026E capex ($B)",
    labels: ["Amazon", "Microsoft", "Alphabet", "Meta"],
    values: [200, 190, 180, 135],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.0, w: 4.3, h: 2.3, chartColors: [C.orange],
  });

  addChartTitle(s, "Big-4 combined capex, $B", 5.2);
  s.addChart(pres.charts.BAR, [{
    name: "Combined capex ($B)",
    labels: ["2025", "2026E"],
    values: [410, 725],
  }], {
    ...BAR_DEFAULTS, x: 5.2, y: 2.0, w: 2.5, h: 2.3, chartColors: [C.lightGray, C.orange],
  });

  makeBigNumber(s, "+77%", "YoY growth in\nplanned spend", 7.9, 2.25, 1.7, C.orange, 32);
  s.addText("Three of four raised guidance in the most recent reporting round; memory and component costs pushed numbers higher.", {
    x: 7.9, y: 3.45, w: 1.7, h: 0.95, fontSize: 8.5, color: C.medGray, fontFace: "Arial", valign: "top", margin: 0,
  });

  addSource(s, "Company guidance: Microsoft $190B (CY26), Amazon $200B, Alphabet $175–185B, Meta $125–145B — via CNBC (Feb 6, 2026), Tom's Hardware, Statista; Morgan Stanley estimate via beincrypto.");
  addFooter(s, 4);
  s.addNotes("Market relevance, not gee-whiz: this is guided spending, publicly committed, which makes it an earnings-visibility machine for everything upstream — semis, memory, networking, power equipment. It is also the single biggest swing factor in those companies' own cash flow statements, which is where the financing story (Part 3) begins. The 77% acceleration came WITH guidance raises — the bear case of capex cuts has not shown up in the numbers.");
}

// =============================================================================
// SLIDE 5 — The constraint backdrop (single context slide)
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.HAPPENING);
  addHeadline(s, "Power is the new bottleneck");
  addSubhead(s, "Compute demand now outruns the power system that hosts it. Constraints decide who captures the spend — a market question.");

  addChartTitle(s, "Global data-center electricity, TWh (IEA)", 0.5);
  s.addChart(pres.charts.BAR, [{
    name: "TWh",
    labels: ["2025", "2030E"],
    values: [485, 950],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.0, w: 4.3, h: 2.3, chartColors: [C.lightGray, C.teal],
  });

  const cards = [
    { big: "85 GW", small: "of new US data-center capacity requested by 2030; ~100 GW of grid capacity needed to serve it reliably (S&P Global)", color: C.teal },
    { big: "~2x", small: "growth in data-center power use by 2030 — to ~3% of global electricity; AI-specific load triples (IEA)", color: C.gold },
    { big: "Memory", small: "is the silicon pinch point: the AI shift in chip supply is driving shortage warnings and price hikes in autos and consumer goods (Reuters, Jun 2026)", color: C.orange },
  ];
  cards.forEach((c, i) => {
    const y = 1.62 + i * 0.92;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y, w: 4.3, h: 0.84, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y, w: 0.07, h: 0.84, fill: { color: c.color } });
    s.addText(c.big, {
      x: 5.35, y: y, w: 1.15, h: 0.84, fontSize: 16, color: c.color, bold: true, fontFace: "Arial Black", valign: "middle", margin: 0,
    });
    s.addText(c.small, {
      x: 6.55, y: y + 0.06, w: 2.85, h: 0.72, fontSize: 8.5, color: C.darkGray, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });

  addSource(s, "IEA Energy & AI (2026); S&P Global data-center power research; World Economic Forum (May 2026); Reuters (Jun 3, 2026).");
  addFooter(s, 5);
  s.addNotes("One slide of physics, by design. The investor takeaway: when the binding constraint is grid access rather than capital, moats shift to whoever controls power, land, and interconnection — and the revenue visibility extends to utilities, grid equipment, and cooling. The IEA view: data-center electricity roughly doubles to ~950 TWh by 2030. Per the WEF, grid connectivity — not chips, capital, or algorithms — is increasingly the binding constraint. That's why constraint analysis is market analysis.");
}

// =============================================================================
// SLIDE 6 — Market leadership & concentration
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.EQUITIES);
  addHeadline(s, "Ten stocks are ~37% of the index");
  addSubhead(s, "Concentration has eased from the 2025 record but remains roughly double its 1990–2015 range. The top of the index is an AI bet.");

  addChartTitle(s, "Top-10 share of S&P 500 market cap, %", 0.5);
  s.addChart(pres.charts.BAR, [{
    name: "Top-10 share (%)",
    labels: ["2000", "2015", "2025 peak", "Jun 2026"],
    values: [23, 18, 40.7, 37],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.0, w: 4.3, h: 2.3,
    chartColors: [C.lightGray, C.lightGray, C.gold, C.orange],
  });

  addChartTitle(s, "The three largest, June 2026", 5.2);
  const rows = [
    [{ text: "Company", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } },
     { text: "Mkt cap", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } },
     { text: "Index weight", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } }],
    ["Nvidia", { text: "~$5.0T", options: { bold: true, color: C.orange } }, "7.0%"],
    ["Apple", { text: "~$4.6T", options: { bold: true, color: C.orange } }, "6.3%"],
    ["Microsoft", { text: "~$3.3T", options: { bold: true, color: C.orange } }, "4.6%"],
  ];
  s.addTable(rows, {
    x: 5.2, y: 2.05, w: 4.3, h: 1.45, colW: [1.7, 1.3, 1.3],
    fontSize: 10, fontFace: "Arial", color: C.darkGray, valign: "middle",
    border: { pt: 0.5, color: C.lightGray }, fill: { color: C.white },
  });
  s.addText([
    { text: "~18% of the S&P 500 ", options: { bold: true, color: C.black } },
    { text: "sits in these three names — more than most full sectors. Nvidia alone outweighs energy or utilities.", options: { color: C.darkGray } },
  ], { x: 5.2, y: 3.65, w: 4.3, h: 0.65, fontSize: 10.5, fontFace: "Arial", valign: "top", margin: 0 });

  addSource(s, "S&P Dow Jones Indices; MacroMicro; finhacker.cz top-10 history; companiesmarketcap.com & Motley Fool market caps (Jun 2026); RBC Wealth Management on the 2026 “great narrowing.”");
  addFooter(s, 6);
  s.addNotes("Structural point: 18–23% top-10 share was the norm for 25 years; it's ~37% now, having peaked at 40.7% in 2025. Two readings, both fair: (1) concentration reflects genuine earnings concentration — these are the most profitable companies in history; (2) it leaves index returns hostage to a handful of AI-linked business models. We don't adjudicate — we quantify, and slide 11 shows what it does to a passive allocation. Nvidia ~$5T: first company ever through that mark.");
}

// =============================================================================
// SLIDE 7 — Returns & performance (data refresh)
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.EQUITIES);
  addHeadline(s, "The AI trade rotated");
  addSubhead(s, "Semis are having their best run since 2000 while the Magnificent 7 lag the equal-weight index. Breadth is back — selectively.");

  addChartTitle(s, "Total return, YTD 2026 (%)", 0.5, 9.0);
  s.addChart(pres.charts.BAR, [{
    name: "YTD total return (%)",
    labels: ["Semis (SOXX)", "Nasdaq Comp.", "Equal-weight S&P (RSP)", "S&P 500", "Mag 7 (MAGS)", "Software (IGV)"],
    values: [79.5, 16.3, 14.3, 11.3, 5.9, -9.5],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.0, w: 6.6, h: 2.35,
    chartColors: [C.orange, C.medGray, C.teal, C.medGray, C.gold, C.red],
    valAxisMinVal: -20,
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 7.35, y: 2.0, w: 2.15, h: 2.35, fill: { color: C.darkGray } });
  s.addText("READ", {
    x: 7.5, y: 2.1, w: 1.85, h: 0.25, fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  s.addText([
    { text: "Leadership migrated from the platforms to their suppliers.", options: { bold: true, color: C.white, breakLine: true, fontSize: 10 } },
    { text: "\nChips added ~$5.7T of market value this rally; April alone saw the chip index up 35%. Meanwhile equal-weight beats cap-weight — the index broadened even as the AI bet narrowed in sector terms.", options: { color: "CCCCCC", fontSize: 9 } },
  ], { x: 7.5, y: 2.4, w: 1.85, h: 1.85, fontFace: "Arial", valign: "top", margin: 0 });

  addSource(s, "YTD total returns through early Jun 2026: stockanalysis.com (SOXX, IGV); slickcharts (S&P, Nasdaq, May 29 close); Morningstar/Yahoo (RSP, MAGS); WSJ ($5.7T chip rally); CNBC (April chip index +35%).");
  addFooter(s, 7);
  s.addNotes("This slide replaced the outline's assumption that AI leaders were pulling the index up while everything else lagged. The June 2026 reality is more interesting: SOXX +79% YTD (Micron, AMD, Marvell are now its biggest weights — it's a memory-and-custom-silicon story, not just Nvidia), while MAGS at +5.9% trails RSP at +14.3%. Software is negative on AI-disruption fears and enterprise budget shifts toward compute. Mention: retail piled into semis in May — a sentiment flag. The 'rest of the market' is participating: that's the breadth improvement bulls wanted, but it came with a new concentration inside semis.");
}

// =============================================================================
// SLIDE 8 — Valuations: what's priced in
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.EQUITIES);
  addHeadline(s, "Rich index, uneven expectations");
  addSubhead(s, "The market is paying up for visible AI earnings and de-rating uncertain ones. The spread is the signal, not the average.");

  addChartTitle(s, "Forward P/E (next 12 months)", 0.5);
  s.addChart(pres.charts.BAR, [{
    name: "Forward P/E",
    labels: ["S&P 500", "10-yr avg", "S&P Tech", "Nvidia"],
    values: [21.1, 19.0, 24.4, 22.5],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.0, w: 4.3, h: 2.3,
    chartColors: [C.orange, C.lightGray, C.gold, C.teal],
  });

  addChartTitle(s, "The dispersion underneath", 5.2);
  const vrows = [
    [{ text: "Segment", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } },
     { text: "What's priced", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9 } }],
    ["Semis (SOXX)", { text: "57x trailing — earnings racing to catch the move", options: { fontSize: 9 } }],
    ["Nvidia", { text: "~22x forward — megacap multiple, hyperscaler-dependent earnings", options: { fontSize: 9 } }],
    ["Software", { text: "De-rated to pre-AI-boom levels (Apollo) — disruption discount", options: { fontSize: 9 } }],
  ];
  s.addTable(vrows, {
    x: 5.2, y: 2.05, w: 4.3, h: 1.7, colW: [1.5, 2.8],
    fontSize: 9.5, fontFace: "Arial", color: C.darkGray, valign: "middle",
    border: { pt: 0.5, color: C.lightGray },
  });
  s.addText([
    { text: "Neutral read: ", options: { bold: true, color: C.black } },
    { text: "nothing here screams 1999 in aggregate — but the index premium assumes the AI earnings stream keeps compounding.", options: { color: C.darkGray } },
  ], { x: 5.2, y: 3.9, w: 4.3, h: 0.5, fontSize: 10, fontFace: "Arial", valign: "top", margin: 0 });

  addSource(s, "FactSet Earnings Insight (fwd P/E 21.1 vs 19.0 10-yr avg); MacroMicro (tech sector 24.4, May 29); GuruFocus/stockanalysis.com (NVDA fwd ~22x, SOXX trailing 57x); Apollo Daily Spark (software de-rating).");
  addFooter(s, 8);
  s.addNotes("This fixes the old slide-11 contradiction (which claimed both 'bubble valuations' and 'reasonable multiples'). The honest picture is dispersion: Nvidia at ~22x forward is cheaper than the tech sector average because its E has exploded — the multiple is unremarkable, the earnings durability is the entire question. SOXX at 57x trailing reflects the price moving faster than even record earnings. Software's de-rate is the mirror image: the market charging an uncertainty discount on whoever might be on the wrong side of AI. Index at 21x vs 19x 10-yr average: elevated, not extreme.");
}

// =============================================================================
// SLIDE 9 — Paying for the buildout
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.FINANCING);
  addHeadline(s, "Capex has outgrown cash flow");
  addSubhead(s, "The buildout was self-funded until it wasn't. 2026 is the year the gap opened — and external financing stepped in.");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.7, w: 9.0, h: 1.65, fill: { color: C.darkGray } });
  s.addText("THE CASH MATH, 2026E", {
    x: 0.7, y: 1.8, w: 4.0, h: 0.25, fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  const cash = [
    { big: "~94%", label: "of hyperscaler operating cash flow consumed by capex + dividends + buybacks (BofA)", color: C.orange },
    { big: "Lowest", label: "Big-4 free cash flow since 2014 — at far larger revenue (CNBC)", color: C.gold },
    { big: "< $0", label: "Amazon 2026E FCF: $200B capex vs ~$140B operating cash flow", color: C.red },
    { big: "−90%", label: "Alphabet 2026E FCF decline, to ~$8B; Microsoft −~28%", color: C.pink },
  ];
  cash.forEach((c, i) => {
    const x = 0.7 + i * 2.18;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.12, w: 2.0, h: 1.08, fill: { color: "444444" } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.12, w: 2.0, h: 0.05, fill: { color: c.color } });
    s.addText(c.big, {
      x: x, y: 2.2, w: 2.0, h: 0.4, fontSize: 19, color: c.color, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(c.label, {
      x: x + 0.08, y: 2.6, w: 1.84, h: 0.56, fontSize: 7.5, color: C.white, fontFace: "Arial", align: "center", valign: "top", margin: 0,
    });
  });

  const funnel = [
    { t: "1. Internal cash", d: "Still the base layer — but fully spoken for", color: C.lightGray, tc: C.black },
    { t: "2. Bond markets", d: "IG mega-deals; ~$300B AI-linked supply expected in 2026", color: C.orange, tc: C.black },
    { t: "3. Off balance sheet", d: "SPVs, JVs, vendor financing & leases — less visible leverage", color: C.darkGray, tc: C.white },
  ];
  funnel.forEach((f, i) => {
    const x = 0.5 + i * 3.05;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 3.55, w: 2.95, h: 0.75, fill: { color: f.color } });
    s.addText([
      { text: f.t, options: { bold: true, fontSize: 10.5, color: f.tc, breakLine: true } },
      { text: f.d, options: { fontSize: 8.5, color: f.tc } },
    ], { x: x + 0.12, y: 3.6, w: 2.7, h: 0.65, fontFace: "Arial", valign: "middle", margin: 0 });
  });

  addSource(s, "BofA via Breckinridge (94% of op. cash flow); CNBC (Feb 6, 2026); techtimes/beincrypto FCF estimates (Amazon, Alphabet, Microsoft); UBS/Barclays issuance forecasts via Reuters.");
  addFooter(s, 9);
  s.addNotes("The equity-relevant shift: for a decade, the megacap pitch was 'compounders that self-fund growth and return cash.' At ~94% of operating cash flow consumed, that model is paused. CNBC called it the breaking of an 'unspoken contract' with shareholders. Equity holders now carry execution risk (will the spend earn returns?) AND financing risk (what if debt markets reprice?). That's a different risk profile from 2023–24, and it's why the next slide — the bond wave — is an equity slide wearing a credit costume.");
}

// =============================================================================
// SLIDE 10 — The bond-issuance wave
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.FINANCING);
  addHeadline(s, "AI came to the bond market");
  addSubhead(s, "Nine months of mega-deals created a new IG supply complex — and credit markets are now pricing AI risk in real time.");

  addChartTitle(s, "The issuance ledger", 0.5);
  const deals = [
    { amt: "$18B", who: "Oracle — Sep 2025; its 5-yr CDS has roughly tripled since", },
    { amt: "$30B", who: "Meta — Oct 2025; largest non-M&A IG deal on record" },
    { amt: "$17.5B", who: "Alphabet — Nov 2025, incl. long-dated tranches" },
    { amt: "$15B", who: "Amazon — Nov 2025" },
    { amt: "$25B", who: "Oracle again — Feb 2026, eight tranches" },
  ];
  deals.forEach((d, i) => {
    const y = 2.05 + i * 0.46;
    s.addText(d.amt, {
      x: 0.5, y: y, w: 1.05, h: 0.4, fontSize: 17, color: C.orange, bold: true, fontFace: "Arial Black", align: "right", margin: 0,
    });
    s.addText(d.who, {
      x: 1.7, y: y + 0.03, w: 3.1, h: 0.4, fontSize: 9, color: C.darkGray, fontFace: "Arial", valign: "top", margin: 0,
    });
  });

  addChartTitle(s, "What it signals", 5.2);
  const sig = [
    { h: "Scale: ~$300B", b: "of AI-related IG supply expected in 2026 (street estimates); hyperscaler public debt ~$230–240B (UBS). Total IG supply seen at a record ~$2.5T (Barclays)." },
    { h: "Credit: watching Oracle", b: "5-yr CDS above ~125bp — crisis-era levels — despite IG ratings (Baa2). Most issuers remain lightly levered: ~0.4–0.7x vs ~3x IG average." },
    { h: "Equity link", b: "Debt-funded capex shifts who bears AI disappointment risk. Credit spreads are now a live early-warning gauge for AI equities." },
  ];
  sig.forEach((g, i) => {
    const y = 2.05 + i * 0.78;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y, w: 0.07, h: 0.7, fill: { color: C.orange } });
    s.addText([
      { text: g.h, options: { bold: true, color: C.black, fontSize: 10, breakLine: true } },
      { text: g.b, options: { color: C.darkGray, fontSize: 8.5 } },
    ], { x: 5.37, y: y, w: 4.13, h: 0.76, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addSource(s, "Deal record: Mawer, M&G, Fortune, CNBC (Feb 2026); CDS: MUFG via CNBC, Fortune (Feb 2026); supply forecasts: UBS & Barclays via Reuters (Jan 2026); leverage: Breckinridge.");
  addFooter(s, 10);
  s.addNotes("The requested recent-news slide. Sequence matters: Oracle Sep '25 ($18B) → Meta Oct '25 ($30B — record non-M&A IG print) → Alphabet + Amazon Nov '25 → Oracle again Feb '26 ($25B, 8 tranches). Two-sided read for a neutral room: balance sheets remain lightly levered vs IG norms (0.4–0.7x vs ~3x) — this is not 2008 telecom; but Oracle's CDS tripling shows the market discriminates by funding capacity, and Fortune's framing — a '$1 trillion borrowing spree' — captures the trajectory question. For equity investors the practical use is the signal: hyperscaler spreads and CDS are now the cleanest real-time read on whether the market believes the AI capex math.");
}

// =============================================================================
// SLIDE 11 — Concentration risk in your portfolio
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.PORTFOLIO);
  addHeadline(s, "Your index fund is an AI fund now");
  addSubhead(s, "A passive S&P 500 allocation carries an embedded, undiversified AI position that no one sized deliberately.");

  addChartTitle(s, "Where $100 of S&P 500 exposure sits", 0.5);
  s.addChart(pres.charts.DOUGHNUT, [{
    name: "Allocation",
    labels: ["Top 3 (Nvidia, Apple, Microsoft) — $18", "Rest of top 10 — $19", "Other 490 stocks — $63"],
    values: [18, 19, 63],
  }], {
    x: 0.5, y: 1.95, w: 4.3, h: 2.4,
    chartColors: [C.orange, C.gold, C.lightGray],
    showPercent: false, showValue: false, showTitle: false,
    showLegend: true, legendPos: "b", legendFontSize: 8,
    holeSize: 60,
  });

  addChartTitle(s, "Why it matters", 5.2);
  const pts = [
    { h: "It's an active bet you didn't make.", b: "At ~37% in ten names, benchmark exposure embeds a view on one theme's earnings durability." },
    { h: "2026 made the cost visible — in both directions.", b: "Equal-weight (+14.3%) beat cap-weight (+11.3%) YTD as megacaps lagged; in 2024–25 the same gap ran the other way." },
    { h: "Correlation is the multiplier.", b: "The top names share one earnings driver — AI infrastructure economics — so the position behaves like a single factor, not ten stocks." },
  ];
  pts.forEach((p, i) => {
    const y = 2.05 + i * 0.78;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: y, w: 0.07, h: 0.7, fill: { color: C.purple } });
    s.addText([
      { text: p.h, options: { bold: true, color: C.black, fontSize: 10, breakLine: true } },
      { text: p.b, options: { color: C.darkGray, fontSize: 8.5 } },
    ], { x: 5.37, y: y, w: 4.13, h: 0.76, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addSource(s, "Index weights: S&P Dow Jones Indices, slickcharts (Jun 2026); YTD returns: Morningstar (RSP), slickcharts (S&P 500).");
  addFooter(s, 11);
  s.addNotes("The hidden-active-risk slide. The framing that lands with allocators: nobody in this room would deliberately put 37% of an equity sleeve in ten correlated names — but a benchmark allocation does precisely that. The donut is deliberately simple. Note the honesty in point two: equal-weight winning in 2026 is evidence of the cost of concentration, but the same logic punished equal-weight in 2024–25. The point is not 'sell megacaps' — it's 'size the bet on purpose.'");
}

// =============================================================================
// SLIDE 12 — Dispersion: winners and losers along the chain
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.PORTFOLIO);
  addHeadline(s, "The AI trade is four trades");
  addSubhead(s, "An 89-point return spread separates segments of the same theme. Positioning along the chain matters more than exposure to it.");

  addChartTitle(s, "Same theme, different outcomes — YTD 2026 (%)", 0.5, 9.0);
  s.addChart(pres.charts.BAR, [{
    name: "YTD (%)",
    labels: ["Compute supply\n(semis, SOXX)", "Broad market\n(equal-weight, RSP)", "Platforms\n(Mag 7, MAGS)", "Application software\n(IGV)"],
    values: [79.5, 14.3, 5.9, -9.5],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.0, w: 5.4, h: 2.35,
    chartColors: [C.orange, C.teal, C.gold, C.red],
    catAxisLabelFontSize: 8,
    valAxisMinVal: -20,
  });

  const seg = [
    { t: "Value accruing", d: "Compute supply — memory, custom silicon, networking; power & grid infrastructure behind it", color: C.green },
    { t: "Contested middle", d: "Platforms: record revenues, but capex + debt now weigh on the equity story", color: C.gold },
    { t: "Value eroding", d: "Application software priced for disruption; adopters without pricing power", color: C.red },
  ];
  seg.forEach((g, i) => {
    const y = 1.98 + i * 0.82;
    s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: y, w: 3.3, h: 0.74, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: y, w: 3.3, h: 0.05, fill: { color: g.color } });
    s.addText([
      { text: g.t.toUpperCase(), options: { bold: true, color: g.color, fontSize: 8.5, charSpacing: 1, breakLine: true } },
      { text: g.d, options: { color: C.darkGray, fontSize: 8.5 } },
    ], { x: 6.32, y: y + 0.06, w: 3.06, h: 0.66, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addSource(s, "YTD total returns through early Jun 2026: stockanalysis.com (SOXX, IGV), Morningstar/Yahoo (RSP, MAGS). Segment framing: deck analysis.");
  addFooter(s, 12);
  s.addNotes("The actionable middle of Part 4. 2026's lesson: intra-theme dispersion (89 points!) dwarfs the index's return. Three buckets, deliberately neutral: value accruing where AI spend is revenue (compute supply, power); contested where AI spend is cost (platforms — their revenue is real but the market is charging them for the capex); value eroding where AI is a competitive threat (software's de-rate). Caveat to voice: these buckets rotated once already this cycle — Mag 7 led 2023–25, semis lead 2026 — so this is a map, not a forecast.");
}

// =============================================================================
// SLIDE 13 — Risks to watch
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.PORTFOLIO);
  addHeadline(s, "What breaks the trade");
  addSubhead(s, "Four watchpoints, each with a visible market gauge. None requires an AI opinion — only attention to the tape.");

  const risks = [
    { t: "Demand air pocket", g: "Gauge: hyperscaler capex guidance", d: "With ~94% of operating cash flow committed, even a pause in guided spend cascades up the supply chain. Semis at +79% YTD have the most altitude to lose.", color: C.red },
    { t: "Financing stress", g: "Gauge: hyperscaler CDS & new-issue spreads", d: "Oracle's CDS above ~125bp shows credit markets already discriminate. A failed mega-deal or spread blowout would reprice AI equities within days.", color: C.orange },
    { t: "Rate sensitivity", g: "Gauge: 10-yr UST (~4.5%), front-end repricing", d: "Hot jobs data pushed the 2-yr to its highest since early 2025 as cut hopes faded. Long-duration AI cash flows and record IG supply both lean on rates staying contained.", color: C.gold },
    { t: "Concentration unwind", g: "Gauge: top-10 index share (~37%)", d: "2026 already previewed it: Mag 7 lagging equal-weight. A disorderly version — passive outflows meeting thin breadth — is the systemic scenario.", color: C.purple },
  ];
  risks.forEach((r, i) => {
    const x = 0.5 + (i % 2) * 4.6;
    const y = 1.7 + Math.floor(i / 2) * 1.38;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 4.4, h: 1.28, fill: { color: C.offWhite } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.07, h: 1.28, fill: { color: r.color } });
    s.addText([
      { text: r.t + "   ", options: { bold: true, color: C.black, fontSize: 11 } },
      { text: r.g, options: { italic: true, color: C.medGray, fontSize: 8.5, breakLine: true } },
      { text: r.d, options: { color: C.darkGray, fontSize: 8.5 } },
    ], { x: x + 0.18, y: y + 0.08, w: 4.1, h: 1.14, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addSource(s, "CDS: MUFG via CNBC; rates: Treasury/FRED, CNBC (Jun 5, 2026 jobs report); cash-flow math: BofA via Breckinridge; index share: S&P DJI/MacroMicro.");
  addFooter(s, 13);
  s.addNotes("Each risk is paired with a watchable gauge — that's the institutional ask. Tie back: risk 1 connects to slide 4 (guided capex), risk 2 to slide 10 (the bond wave — and note it's the leverage/financing risk the outline flagged), risk 3 to the rate backdrop (10-yr ~4.54%, 2-yr 4.17%), risk 4 to slides 6 and 11. If pressed for the most likely stress path: financing stress and the demand air pocket are the same risk at different speeds — credit reprices faster than earnings revisions.");
}

// =============================================================================
// SLIDE 14 — Implications for investors
// =============================================================================
{
  const s = pres.addSlide();
  addThemeTag(s, THEMES.PORTFOLIO);
  addHeadline(s, "Implications for investors");
  addSubhead(s, "Four takeaways that survive whichever way the AI debate resolves.");

  const rows2 = [
    [{ text: "Takeaway", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9.5 } },
     { text: "What to do with it", options: { fill: { color: C.black }, color: C.white, bold: true, fontSize: 9.5 } }],
    [{ text: "1. Know your AI beta", options: { bold: true } },
     "Measure the embedded AI exposure across passive sleeves — ~37% of benchmark sits in ten names with one shared earnings driver. Size it deliberately, even if the answer is “keep it.”"],
    [{ text: "2. Trade the chain, not the theme", options: { bold: true } },
     "An 89-point intra-theme spread says segment selection (silicon, power, platforms, adopters) dominates the yes/no call. Diversify across the chain's stages."],
    [{ text: "3. Watch credit as the early warning", options: { bold: true } },
     "AI is now a bond-market story. Hyperscaler CDS and new-issue spreads will likely reprice before equity earnings revisions arrive. Put them on the dashboard."],
    [{ text: "4. Respect the breadth shift", options: { bold: true } },
     "Equal-weight beating cap-weight while semis triple-digit-pace: 2026 rewards being right on structure, not just direction. Complements to cap-weight exposure have re-earned their place."],
  ];
  s.addTable(rows2, {
    x: 0.5, y: 1.65, w: 9.0, h: 2.65, colW: [2.7, 6.3],
    fontSize: 9.5, fontFace: "Arial", color: C.darkGray, valign: "middle",
    border: { pt: 0.5, color: C.lightGray },
    autoPage: false,
  });

  s.addText([
    { text: "Bottom line: ", options: { bold: true, color: C.black } },
    { text: "you don't need a view on AGI to manage this — you need to know what your portfolio already believes.", options: { color: C.darkGray } },
  ], { x: 0.5, y: 4.42, w: 9.0, h: 0.35, fontSize: 12, fontFace: "Arial", margin: 0 });

  addFooter(s, 14);
  s.addNotes("The synthesis. Each takeaway maps to a section: #1 to concentration (slides 6, 11), #2 to dispersion (7, 12), #3 to financing (9, 10), #4 to the 2026 breadth story (7). Closing line is the deck's thesis in one sentence — benchmark portfolios already hold a large, correlated AI position; the job is to make it intentional. Neutral to the end: this is positioning hygiene, not an AI bull or bear call.");
}

// =============================================================================
// SLIDE 15 — Sources & methodology
// =============================================================================
{
  const s = pres.addSlide();
  addHeadline(s, "Sources & methodology", { fontSize: 24 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.95, w: 2.6, h: 0.4, fill: { color: C.orange } });
  s.addText(DATA_AS_OF.toUpperCase(), {
    x: 0.5, y: 0.95, w: 2.6, h: 0.4, fontSize: 11, color: C.black, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1,
  });
  s.addText("Returns are total returns YTD through the most recent available close (Jun 5–9, 2026, unless noted). Index and market-cap figures as of early June 2026.", {
    x: 3.3, y: 0.95, w: 6.2, h: 0.45, fontSize: 9, color: C.medGray, fontFace: "Arial", valign: "middle", margin: 0,
  });

  const cols = [
    { h: "MARKET DATA", color: C.gold, items: [
      "ETF returns & stats: stockanalysis.com (SOXX, IGV); Morningstar / Yahoo Finance (RSP, MAGS)",
      "Index returns: slickcharts.com (S&P 500, Nasdaq)",
      "Index weights & concentration: S&P Dow Jones Indices; MacroMicro; finhacker.cz; slickcharts",
      "Market caps: companiesmarketcap.com; Motley Fool research (Jun 2026)",
      "Valuations: FactSet Earnings Insight; GuruFocus; Apollo Daily Spark",
      "Rates: US Treasury / FRED; CNBC (Jun 5, 2026)",
    ]},
    { h: "CAPEX & FINANCING", color: C.orange, items: [
      "Capex guidance: company reports via CNBC (Feb 6, 2026); Tom's Hardware; Statista; Morgan Stanley est.",
      "Cash-flow math: BofA via Breckinridge; CNBC; techtimes / beincrypto FCF estimates",
      "Bond issuance: Mawer; M&G Investments; Fortune (Mar 2026); CNBC (Feb 2026)",
      "Supply forecasts: UBS & Barclays via Reuters (Jan 2026)",
      "Credit signals: MUFG CDS data via CNBC; Fortune",
    ]},
    { h: "PHYSICAL CONTEXT", color: C.teal, items: [
      "Power demand: IEA, Energy & AI (485→950 TWh, 2025–2030)",
      "Grid constraint: S&P Global (85 GW US pipeline); World Economic Forum (May 2026)",
      "Silicon: Reuters (memory shortage, Jun 3, 2026); WSJ ($5.7T chip rally)",
      "ETF tickers referenced: SOXX, IGV, RSP, MAGS (plus S&P 500 / Nasdaq Composite indices)",
      "iShares funds are preferred as primary ETF sources per house data policy",
    ]},
  ];
  cols.forEach((c, i) => {
    const x = 0.5 + i * 3.05;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.6, w: 2.95, h: 0.24, fill: { color: c.color } });
    s.addText(c.h, {
      x: x, y: 1.6, w: 2.95, h: 0.24, fontSize: 8.5, color: C.black, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1,
    });
    s.addText(c.items.map((t, j) => ({
      text: t, options: { bullet: { code: "2022", indent: 8 }, breakLine: j < c.items.length - 1, fontSize: 7.8, color: C.darkGray },
    })), { x: x + 0.05, y: 1.92, w: 2.85, h: 2.4, fontFace: "Arial", valign: "top", paraSpaceAfter: 4, margin: 0 });
  });

  s.addText("Methodology: every figure verified against at least one primary or institutional source; where sources disagreed, the more conservative figure was used. No figures are extrapolated or modeled. End of deck.", {
    x: 0.5, y: 4.15, w: 9.0, h: 0.4, fontSize: 8, color: "999999", italic: true, fontFace: "Arial", margin: 0,
  });

  addFooter(s, 15);
  s.addNotes("Single consolidated back-matter slide (replaces the old two appendix slides). The one canonical date stamp lives here: data as of June 2026, returns through the Jun 5–9 closes. If asked about figure discrepancies: YTD figures have slightly different as-of dates (May 29 for index closes via slickcharts, Jun 5–8 for ETFs) — directionally consistent, flagged here rather than scattered across slides.");
}

// =============================================================================
// Write the .pptx, then emit slides-data.js for the HTML viewer
// =============================================================================

// Speaker notes for the viewer's presenter mode (condensed from slide.addNotes).
const VIEWER_NOTES = [
  "Frame for the room: this is not an AI explainer — it's a markets deck. Four beats: what's happening, how it shows up in equities, how it's financed, what it means for positioning.",
  "Three numbers carry the thesis: $725B guided capex (+77%); top-10 at ~37% of index (vs 40.7% 2025 peak, 18–23% historic norm); 89pp semis-vs-software spread. Dispersion, not direction, is 2026's story.",
  "Orientation. The physical compute story is deliberately one context slide — the deep version lives in the standalone briefings.",
  "Guided, not projected: MSFT $190B, AMZN $200B, GOOGL $175–185B, META $125–145B. Earnings visibility for the supply chain; cash-flow pressure for the spenders. Bear case of capex cuts hasn't shown up.",
  "One slide of physics. IEA: DC electricity ~doubles to 950 TWh by 2030. WEF: grid access — not chips or capital — is the binding constraint. Constraint analysis is market analysis: moats shift to whoever holds power and interconnection.",
  "Top-10 share ~37% vs 18–23% 1990–2015 norm; peaked 40.7% in 2025. NVDA ~$5T (first ever), AAPL $4.6T, MSFT $3.3T — three names ≈ 18% of index. Both readings fair: earnings concentration vs structural fragility.",
  "2026's surprise: leadership migrated from platforms to suppliers. SOXX +79% (memory & custom silicon, best run since 2000, $5.7T added); MAGS +5.9% LAGS equal-weight +14.3%; software −9.5%. Breadth is back — with a new concentration inside semis. Retail piling into semis in May is a sentiment flag.",
  "Fixes the old slide-11 contradiction. Index 21.1x fwd vs 19.0x 10-yr avg: elevated, not extreme. NVDA ~22x fwd — unremarkable multiple, the question is earnings durability. SOXX 57x trailing; software de-rated to pre-AI levels. The spread is the signal.",
  "The 'unspoken contract' broke: ~94% of op cash flow consumed; Big-4 FCF lowest since 2014; AMZN negative; GOOGL −90% to ~$8B. Equity holders now carry execution risk AND financing risk.",
  "The ledger: ORCL $18B (Sep 25) → META $30B (Oct 25, record non-M&A IG) → GOOGL $17.5B + AMZN $15B (Nov 25) → ORCL $25B (Feb 26). ~$300B AI-linked IG supply expected 2026. Two-sided: leverage still light (0.4–0.7x vs ~3x IG), but Oracle CDS >125bp shows credit discriminates. Spreads = real-time gauge of AI capex belief.",
  "Hidden active risk: no allocator would deliberately put 37% in ten correlated names — a benchmark does. Honest caveat: equal-weight won 2026, lost 2024–25. Message is 'size the bet on purpose,' not 'sell megacaps.'",
  "Intra-theme dispersion (89pp) dwarfs the index return. Value accruing: compute supply, power. Contested: platforms (revenue real, capex charged). Eroding: software priced for disruption. Map, not forecast — buckets rotated once already this cycle.",
  "Each risk has a watchable gauge: capex guidance; hyperscaler CDS/spreads; rates (10-yr ~4.54%, 2-yr highest since early 2025); top-10 share. Financing stress and demand air pocket are the same risk at different speeds — credit reprices first.",
  "Synthesis: (1) know your AI beta; (2) trade the chain, not the theme; (3) credit is the early-warning channel; (4) respect the breadth shift. Closing line: you don't need a view on AGI — you need to know what your portfolio already believes.",
  "Back matter. Canonical stamp: data as of June 2026; returns through Jun 5–9 closes (index closes May 29 via slickcharts). Conservative figure used where sources disagreed; nothing extrapolated.",
];

const viewerData = {
  title: "AI in the Market",
  subtitle: "June 2026",
  file: "ai-markets-deck.pptx",
  total: 15,
  sections: [
    { start: 1, label: "Intro" },
    { start: 4, label: "What's happening" },
    { start: 6, label: "Equity markets" },
    { start: 9, label: "Financing" },
    { start: 11, label: "Portfolio" },
    { start: 15, label: "Sources" },
  ],
  titles: [
    "Cover — AI in the Market",
    "The thesis: the buildout is now a market event",
    "Roadmap: four beats",
    "The buildout in numbers (~$725B)",
    "The constraint backdrop: chips → grid",
    "Concentration: ten stocks ≈ 37%",
    "Returns: the AI trade rotated",
    "Valuations: rich index, uneven expectations",
    "Paying for the buildout: capex > cash flow",
    "The bond-issuance wave",
    "Your index fund is an AI fund now",
    "Dispersion along the chain",
    "Risks to watch",
    "Implications for investors",
    "Sources & methodology",
  ],
  notes: VIEWER_NOTES,
};

fs.writeFileSync("slides-data.js", "window.DECK = " + JSON.stringify(viewerData, null, 2) + ";\n");

pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name, "+ slides-data.js (15 slides)"); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

// =============================================================================
// AI in the Market — What’s happening now, and how markets reprice — June 2026
// BII visual style, ALL-DARK edition: every slide on ink (#111114), 16:9 (10" x 5.625")
// Run: node build-deck.js
//   → outputs ai-markets-deck.pptx (12 slides)
//   → outputs slides-data.js (title / slide count / speaker notes for index.html)
//
// Data as of June 2026. Sources cited per slide and consolidated on slide 12.
// Rebuilt 2026-06-10 (v4): tightened 25 → 12 slides on user feedback —
//   • two-part arc: 01 WHAT’S HAPPENING (loops, rationing, Washington)
//     → 02 MARKET IMPACT (equities, labor, bonds ×2, portfolio, frontier)
//   • all slides dark; bright accent variants for contrast on ink
//   • image/infographic PLACEHOLDERS: addImagePlaceholder() renders a labeled
//     slot with the intended art described in situ. To drop in real art later,
//     replace the call with s.addImage({ path, x, y, w, h,
//     sizing: { type: "cover", w, h } }) at the SAME geometry.
//   • labor slide (7) uses web-verified June 2026 data (Challenger, NY Fed)
// Canonical figures: semis +80% / software −10%; Big-4 capex ~$705B (+72%);
// issuance $105B+ over five mega-deals; ~$300B 2026 AI-linked IG supply.
// =============================================================================

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Strategy";
pres.title = "AI in the Market — June 2026";

// ---------- Brand system ----------

const C = {
  yellow:    "FFD100", // brand accent — cover rule + banner bars only
  black:     "000000",
  white:     "FFFFFF",
  orange:    "F6693D",
  gold:      "FFB800",
  pink:      "E8478D",
  // bright accent variants — required for contrast on ink at small sizes
  tealBright:   "2BC4C4",
  purpleBright: "9B7BE0",
  redBright:    "E5484D",
  // dark system (universal background = ink)
  ink:       "111114",
  inkPanel:  "1C1C20",
  inkLine:   "2A2A30",
  inkGhost:  "1E1E24",
  inkBar:    "3E3E46", // comparison bars in charts (the "gray bar" on dark)
  inkText:   "E8E8EA",
  inkBody:   "C9C9CE",
  inkMuted:  "9A9AA0",
  inkFaint:  "8A8A90", // source lines & methodology fine print
};

// Two-part structure → typographic kickers
const PARTS = {
  NOW:    { num: "01", label: "WHAT’S HAPPENING" },
  IMPACT: { num: "02", label: "MARKET IMPACT" },
};

const DATA_AS_OF = "Data as of June 2026"; // single canonical stamp (slide 12)
const MD_SOURCE = "Internal strategic review, “The 2026 AI Frontier” (Jun 2026)";
const IMG = "slides-images/web";

// ---------- Helpers (single dark code path) ----------

function newSlide() {
  const s = pres.addSlide();
  s.background = { color: C.ink };
  return s;
}

function addFooter(slide, pageNum) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.95, w: 10.0, h: 0.675, fill: { color: C.black },
  });
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
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.3, w: 0.3, h: 0.05, fill: { color: color },
  });
  slide.addText(part.num + "  ·  " + part.label + "  —  " + topic, {
    x: 0.92, y: 0.17, w: w || 6.5, h: 0.3,
    fontSize: 9, color: color, bold: true, fontFace: "Arial", charSpacing: 3, valign: "middle", margin: 0,
  });
}

function addHeadline(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: (opts && opts.y) || 0.48, w: (opts && opts.w) || 9.0, h: (opts && opts.h) || 0.62,
    fontSize: (opts && opts.fontSize) || 26, color: (opts && opts.color) || C.white, bold: true, fontFace: "Arial Black", valign: "top", margin: 0,
  });
}

function addSubhead(slide, text, opts) {
  slide.addText(text, {
    x: 0.5, y: (opts && opts.y) || 1.12, w: (opts && opts.w) || 9.0, h: (opts && opts.h) || 0.45,
    fontSize: 12.5, color: (opts && opts.color) || C.inkMuted, fontFace: "Arial", valign: "top", margin: 0,
  });
}

function addChartTitle(slide, text, x, w, color, y) {
  const yy = y || 1.62;
  slide.addText(text, {
    x: x, y: yy, w: w || 4.3, h: 0.28,
    fontSize: 13, color: C.inkText, bold: true, fontFace: "Arial", valign: "bottom", margin: 0,
  });
  slide.addShape(pres.shapes.LINE, {
    x: x, y: yy + 0.33, w: w || 4.3, h: 0, line: { color: color || C.inkLine, width: 1 },
  });
}

function addSource(slide, text, y) {
  slide.addText("Source: " + text, {
    x: 0.5, y: y || 4.46, w: 9.0, h: 0.42,
    fontSize: 7, color: C.inkFaint, fontFace: "Arial", valign: "top", margin: 0,
  });
}

// Dark "READ" rail (interpretation box).
function addReadBox(slide, x, y, w, h, lead, body) {
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: C.inkPanel }, line: { color: C.inkLine, width: 0.75 } });
  slide.addText("READ", {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: 0.25, fontSize: 9, color: C.gold, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  slide.addText([
    { text: lead, options: { bold: true, color: C.white, breakLine: true, fontSize: 10 } },
    { text: "\n" + body, options: { color: C.inkBody, fontSize: 9 } },
  ], { x: x + 0.15, y: y + 0.4, w: w - 0.3, h: h - 0.5, fontFace: "Arial", valign: "top", margin: 0 });
}

// Point-first card: a small named kicker, a bold claim, evidence woven into the body.
function addPointCard(slide, opts) {
  const { kicker, color, title, body, x, y, w, h } = opts;
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: w, h: h, fill: { color: C.inkPanel } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.07, h: h, fill: { color: color } });
  slide.addText(kicker, {
    x: x + 0.18, y: y + 0.08, w: w - 0.3, h: 0.2,
    fontSize: 7.5, color: color, bold: true, fontFace: "Arial", charSpacing: 2, margin: 0,
  });
  slide.addText([
    { text: title + "  ", options: { bold: true, color: C.white, fontSize: 10.5 } },
    { text: body, options: { color: C.inkBody, fontSize: 9 } },
  ], { x: x + 0.18, y: y + 0.3, w: w - 0.36, h: h - 0.4, fontFace: "Arial", valign: "top", margin: 0 });
}

// Big stat callout: Arial Black number over a small-caps muted label.
function addStat(slide, opts) {
  const { x, y, w, value, label, color, fontSize } = opts;
  slide.addText(value, {
    x: x, y: y, w: w, h: 0.42,
    fontSize: fontSize || 22, color: color || C.white, bold: true, fontFace: "Arial Black", margin: 0,
  });
  slide.addText(label, {
    x: x, y: y + 0.44, w: w, h: 0.48,
    fontSize: 7.5, color: C.inkMuted, fontFace: "Arial", valign: "top", margin: 0,
  });
}

// Image / infographic placeholder: labeled slot with the intended art described.
// Swap for real art with s.addImage({ path, x, y, w, h, sizing:{type:"cover",w,h} })
// at the same geometry.
function addImagePlaceholder(slide, opts) {
  const { x, y, w, h, label, prompt } = opts;
  const kind = opts.kind || "IMAGE";
  const accent = opts.accent || C.yellow;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: x, y: y, w: w, h: h, fill: { color: C.inkGhost }, line: { color: C.inkLine, width: 1, dashType: "dash" },
  });
  // accent corner brackets — the "intentional placeholder" cue
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.3, h: 0.035, fill: { color: accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.035, h: 0.3, fill: { color: accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - 0.3, y: y + h - 0.035, w: 0.3, h: 0.035, fill: { color: accent } });
  slide.addShape(pres.shapes.RECTANGLE, { x: x + w - 0.035, y: y + h - 0.3, w: 0.035, h: 0.3, fill: { color: accent } });

  const cx = x + w / 2;
  const tall = h >= 1.2;
  if (tall) {
    const gy = y + h / 2 - 0.62;
    if (kind === "INFOGRAPHIC") {
      [0.22, 0.38, 0.52].forEach((bh, i) => {
        slide.addShape(pres.shapes.RECTANGLE, {
          x: cx - 0.33 + i * 0.24, y: gy + 0.52 - bh, w: 0.16, h: bh,
          fill: { type: "none" }, line: { color: C.inkMuted, width: 1.5 },
        });
      });
    } else {
      slide.addShape(pres.shapes.ISOSCELES_TRIANGLE, {
        x: cx - 0.35, y: gy + 0.14, w: 0.7, h: 0.38, fill: { type: "none" }, line: { color: C.inkMuted, width: 1.5 },
      });
      slide.addShape(pres.shapes.OVAL, {
        x: cx + 0.14, y: gy, w: 0.16, h: 0.16, fill: { type: "none" }, line: { color: C.inkMuted, width: 1.5 },
      });
    }
  }
  slide.addText(kind + " — " + label, {
    x: x + 0.1, y: tall ? y + h / 2 + 0.02 : y + h / 2 - 0.22, w: w - 0.2, h: 0.24,
    fontSize: 8, color: accent, bold: true, fontFace: "Arial", charSpacing: 2, align: "center", valign: "middle", margin: 0,
  });
  if (prompt) {
    slide.addText(prompt, {
      x: x + 0.2, y: tall ? y + h / 2 + 0.3 : y + h / 2 + 0.02, w: w - 0.4, h: tall ? 0.65 : 0.4,
      fontSize: 7, color: C.inkMuted, italic: true, fontFace: "Arial", align: "center", valign: "top", margin: 0,
    });
  }
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
  dataLabelFormatCode: "0", // whole-number labels — keeps labels & prose in sync
  showLegend: false,
};

// =============================================================================
// SLIDE 1 — Cover
// =============================================================================
{
  const s = newSlide();
  s.addText("JUNE 2026", {
    x: 7.4, y: 0.3, w: 2.1, h: 0.35,
    fontSize: 14, color: C.inkMuted, fontFace: "Arial", align: "right", margin: 0, charSpacing: 2,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.0, w: 1.4, h: 0.07, fill: { color: C.yellow } });
  s.addText("AI in the Market.", {
    x: 0.5, y: 1.25, w: 6.2, h: 1.7,
    fontSize: 40, color: C.white, bold: true, fontFace: "Arial Black", margin: 0,
  });
  s.addText("What’s happening now — and how markets reprice.", {
    x: 0.5, y: 2.55, w: 6.2, h: 1.0,
    fontSize: 20, color: C.yellow, bold: true, fontFace: "Arial Black", margin: 0,
  });
  s.addText("Agentic loops, token rationing, and Washington’s entry — then the repricing: equities, labor, and a $300B bond wave.", {
    x: 0.5, y: 3.6, w: 6.0, h: 0.6,
    fontSize: 13, color: C.inkText, fontFace: "Arial", margin: 0,
  });
  s.addText("Strategy  |  Institutional", {
    x: 0.5, y: 4.35, w: 5.0, h: 0.35,
    fontSize: 12, color: C.inkMuted, bold: true, fontFace: "Arial", margin: 0,
  });
  addImagePlaceholder(s, {
    x: 6.9, y: 0.85, w: 2.6, h: 3.85,
    label: "AGENTIC LOOP LIGHT TRAILS", accent: C.yellow,
    prompt: "Glowing teal and yellow light trails forming interlocking orbits on near-black — abstract agent loops, cinematic, minimal.",
  });
  addFooter(s, "");
  s.addNotes("The deck in one breath: part one is what’s happening right now — models became loop-running agents, tokens became a rationed input, and Washington moved from regulating AI to debating who owns it. Part two is how markets reprice all of it: equities split the trade, the labor data started moving, the financing moved into the bond market, and your benchmark quietly became an AI fund. Twelve slides, two parts, one question throughout: what does this do to portfolios.");
}

// =============================================================================
// SLIDE 2 — Three shifts, happening now (thesis)
// =============================================================================
{
  const s = newSlide();
  addHeadline(s, "Three shifts, happening now", { y: 0.3 });
  addSubhead(s, "Capability, economics, and policy are moving at once. First what’s changing (slides 3–5) — then how markets are repricing it (slides 6–11).", { y: 0.95 });

  const cols = [
    {
      cat: "CAPABILITY", color: C.tealBright,
      from: "Linear chat", to: "Autonomous loops",
      claim: "Fable 5-class models swept functional SOTA. The unit of work moved from prompting outputs to designing self-correcting loops that run until the task is done.",
      stat: "$47B", statLabel: "Anthropic run rate, 2026 — was $3B in 2025. Agentic capability, monetized at scale.",
    },
    {
      cat: "ECONOMICS", color: C.orange,
      from: "Token subsidy", to: "Token scarcity",
      claim: "Labs stopped subsidizing tokens; enterprises started rationing them. Compute is priced like a scarce commodity at every layer of the stack.",
      stat: "$920M/mo", statLabel: "What Google pays SpaceX to rent 110k GPUs — the market-clearing price of scarcity.",
    },
    {
      cat: "POLICY", color: C.purpleBright,
      from: "Private tech", to: "Sovereign asset",
      claim: "Equity-tax proposals and pre-release reviews mean foundation models are now treated as sovereign assets — too important to leave private.",
      stat: "50%", statLabel: "Proposed one-time tax on AI-lab equity to seed a public fund paying “AI Dividends.”",
    },
  ];
  cols.forEach((c, i) => {
    const x = 0.5 + i * 3.05;
    s.addText(c.cat, {
      x: x, y: 1.55, w: 2.95, h: 0.2, fontSize: 8, color: c.color, bold: true, fontFace: "Arial", charSpacing: 2, align: "center", margin: 0,
    });
    s.addText([
      { text: c.from + "  ", options: { color: C.inkBody, fontSize: 11.5, bold: true } },
      { text: "→  ", options: { color: c.color, fontSize: 12.5, bold: true } },
      { text: c.to, options: { color: C.white, fontSize: 11.5, bold: true } },
    ], { x: x, y: 1.77, w: 2.95, h: 0.3, fontFace: "Arial", align: "center", valign: "middle", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.14, w: 2.95, h: 1.16, fill: { color: C.inkPanel } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.14, w: 2.95, h: 0.05, fill: { color: c.color } });
    s.addText(c.claim, {
      x: x + 0.14, y: 2.26, w: 2.67, h: 0.98, fontSize: 9, color: C.inkBody, fontFace: "Arial", valign: "top", margin: 0,
    });
    s.addText(c.stat, {
      x: x, y: 3.42, w: 2.95, h: 0.42, fontSize: 24, color: c.color, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    s.addText(c.statLabel, {
      x: x + 0.2, y: 3.86, w: 2.55, h: 0.42, fontSize: 7.5, color: C.inkMuted, fontFace: "Arial", align: "center", valign: "top", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.38, w: 10.0, h: 0.5, fill: { color: C.inkPanel } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 4.38, w: 0.07, h: 0.5, fill: { color: C.yellow } });
  s.addText("The chatbot’s economics are exhausted. The stack is reorganizing around token-burning agentic loops — and markets are repricing around it.", {
    x: 0.5, y: 4.38, w: 9.0, h: 0.5, fontSize: 11, color: C.white, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0,
  });

  addFooter(s, 2);
  s.addNotes("The thesis slide — and why this isn’t 2023’s hype cycle: three independent systems shifting in the same direction at once. Capability: models became loop-running systems (slide 3). Economics: tokens went from subsidized to rationed (slide 4). Policy: when governments debate taking equity, the asset class changed category (slide 5). Each column carries one proof stat: $47B of run rate, $920M/month of rental, a 50% equity-tax proposal. The banner is the line to read aloud.");
}

// =============================================================================
// SLIDE 3 — From prompts to loops — demand has no ceiling (loops + Jevons)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.NOW, "AGENTIC LOOPS", C.tealBright);
  addHeadline(s, "From prompts to loops — demand has no ceiling", { fontSize: 24 });
  addSubhead(s, "Agents try, fail, fix, and ship on their own. A loop burns orders of magnitude more tokens than a chat — and the Jevons curve does the rest.");

  // Left: the unit of work changed
  addChartTitle(s, "The unit of work changed", 0.5, 4.1, C.tealBright);
  s.addText("2023–25 · ONE SHOT, THEN STOP", { x: 0.5, y: 2.08, w: 4.1, h: 0.2, fontSize: 7.5, color: C.inkMuted, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.32, w: 1.1, h: 0.36, fill: { color: C.inkPanel }, line: { color: C.inkLine, width: 1 } });
  s.addText("PROMPT", { x: 0.6, y: 2.32, w: 1.1, h: 0.36, fontSize: 8.5, color: C.inkBody, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });
  s.addShape(pres.shapes.LINE, { x: 1.77, y: 2.5, w: 0.45, h: 0, line: { color: C.inkMuted, width: 2, endArrowType: "triangle" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 2.28, y: 2.32, w: 1.1, h: 0.36, fill: { color: C.inkPanel }, line: { color: C.inkLine, width: 1 } });
  s.addText("RESPONSE", { x: 2.28, y: 2.32, w: 1.1, h: 0.36, fontSize: 8.5, color: C.inkBody, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });

  s.addText("2026 · RUNS UNTIL THE TASK IS DONE", { x: 0.5, y: 2.86, w: 4.1, h: 0.2, fontSize: 7.5, color: C.tealBright, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0 });
  const loop = [
    { t: "TRY", x: 0.6, y: 3.12 }, { t: "FAIL", x: 2.0, y: 3.12 },
    { t: "FIX", x: 2.0, y: 3.74 }, { t: "SHIP", x: 0.6, y: 3.74 },
  ];
  loop.forEach((b) => {
    s.addShape(pres.shapes.RECTANGLE, { x: b.x, y: b.y, w: 0.95, h: 0.34, fill: { type: "none" }, line: { color: C.tealBright, width: 1.75 } });
    s.addText(b.t, { x: b.x, y: b.y, w: 0.95, h: 0.34, fontSize: 8.5, color: C.tealBright, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });
  });
  s.addShape(pres.shapes.LINE, { x: 1.58, y: 3.29, w: 0.39, h: 0, line: { color: C.tealBright, width: 1.5, endArrowType: "triangle" } });
  s.addShape(pres.shapes.LINE, { x: 2.47, y: 3.49, w: 0, h: 0.22, line: { color: C.tealBright, width: 1.5, endArrowType: "triangle" } });
  s.addShape(pres.shapes.LINE, { x: 1.58, y: 3.91, w: 0.39, h: 0, flipH: true, line: { color: C.tealBright, width: 1.5, endArrowType: "triangle" } });
  s.addShape(pres.shapes.LINE, { x: 1.08, y: 3.49, w: 0, h: 0.22, flipV: true, line: { color: C.tealBright, width: 1.5, endArrowType: "triangle" } });
  s.addText("agents self-correct: design the\nloop, not the prompt", {
    x: 3.1, y: 3.2, w: 1.4, h: 0.8, fontSize: 7.5, color: C.inkMuted, italic: true, fontFace: "Arial", valign: "middle", margin: 0,
  });

  s.addText("“My job is to write loops.”", {
    x: 0.5, y: 4.22, w: 4.3, h: 0.3, fontSize: 13, color: C.white, bold: true, fontFace: "Arial Black", margin: 0,
  });
  s.addText("Boris Cherny — the agentic workflow in one sentence", {
    x: 0.5, y: 4.54, w: 4.3, h: 0.18, fontSize: 7, color: C.inkMuted, fontFace: "Arial", margin: 0,
  });

  // Right: Jevons curve with build-out ladder overlaid in the empty top-left
  addChartTitle(s, "The Jevons paradox: efficiency multiplies demand", 4.95, 4.55, C.tealBright);
  const xs = [];
  const vs = [];
  for (let i = 0; i <= 20; i++) {
    const x = i * 5;
    xs.push(x % 25 === 0 ? String(x) : "");
    vs.push(300 * (Math.exp(x / 22) - 1) / (Math.exp(100 / 22) - 1));
  }
  s.addChart(pres.charts.AREA, [{ name: "Compute demanded", labels: xs, values: vs }], {
    x: 4.95, y: 2.05, w: 4.55, h: 2.3,
    chartColors: [C.tealBright], chartColorsOpacity: 30,
    showTitle: false, showLegend: false, showValue: false,
    lineSize: 2.5, lineSmooth: true,
    catAxisLabelColor: C.inkMuted, catAxisLabelFontSize: 8,
    valAxisHidden: true,
    valGridLine: { color: C.inkLine, size: 0.5 },
    catGridLine: { style: "none" },
  });
  const ladder = ["Internal PDF summaries", "Custom dashboards", "Disposable web apps", "Giant research projects"];
  s.addText("WHAT GETS BUILT AS FRICTION FALLS", {
    x: 5.15, y: 2.18, w: 2.6, h: 0.18, fontSize: 7, color: C.inkMuted, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0,
  });
  ladder.forEach((t, i) => {
    s.addShape(pres.shapes.OVAL, { x: 5.18, y: 2.46 + i * 0.27, w: 0.08, h: 0.08, fill: { color: C.tealBright } });
    s.addText(t, {
      x: 5.34, y: 2.36 + i * 0.27, w: 2.5, h: 0.26, fontSize: 8.5, color: i === 3 ? C.white : C.inkText, bold: i === 3, fontFace: "Arial", valign: "middle", margin: 0,
    });
  });
  s.addText("EASE OF CREATION  →", {
    x: 4.95, y: 4.36, w: 4.55, h: 0.2, fontSize: 7.5, color: C.inkMuted, bold: true, fontFace: "Arial", align: "center", charSpacing: 2, margin: 0,
  });

  addSource(s, MD_SOURCE + " — Cherny/Steinberger loops framing, Karpathy commentary, Codex “disposable software.” Jevons curve illustrative, not measured data.", 4.74);
  addFooter(s, 3);
  s.addNotes("The core slide of part one. Left: the unit of work changed — from one-shot prompting to loops that try, fail, fix, and ship without a human in each cycle. Cherny’s line is the cleanest articulation. Right: the Jevons paradox (coal, 1865) applied — as agents make software effectively free to produce, we don’t write the same software cheaper, we write categorically more of it: PDF summaries become dashboards become disposable single-use apps become giant research projects. Investment translation: efficiency improvements do NOT cap compute demand — they expand it. That’s the demand engine behind everything in part two.");
}

// =============================================================================
// SLIDE 4 — Tokens got a budget line (rationing + the crunch behind it)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.NOW, "TOKEN RATIONING", C.orange);
  addHeadline(s, "Tokens got a budget line");
  addSubhead(s, "Major firms are abandoning unlimited access and writing token budgets — rationing is what demand looks like when the input is scarce.");

  const cases = [
    { kicker: "UBER", color: C.tealBright, t: "Agents got a budget line.", b: "A hard $1,500/month token cap per employee replaced unlimited access — “eye-watering” agentic costs became a managed line item, not an experiment." },
    { kicker: "WALMART", color: C.orange, t: "Unlimited access is over.", b: "“Code Puppy,” its agentic dev tool, moved from unlimited tokens to individual budgets plus efficiency training — absorbing the cost of the agentic shift." },
    { kicker: "THE CRUNCH BEHIND IT", color: C.gold, t: "Scarcity is structural — and priced.", b: "SK Hynix is doubling HBM capacity and still sees no relief before ~2030; Google rents 110k Nvidia GPUs from SpaceX at $920M/month while its own silicon catches up." },
  ];
  cases.forEach((c, i) => {
    addPointCard(s, { kicker: c.kicker, color: c.color, title: c.t, body: c.b, x: 0.5, y: 1.66 + i * 0.98, w: 5.9, h: 0.9 });
  });

  addImagePlaceholder(s, {
    x: 6.65, y: 1.66, w: 2.85, h: 1.4,
    label: "TOKEN METER", accent: C.gold,
    prompt: "Industrial utility meter for the AI era — glowing gold digits, a stream of tokens flowing in, dark brushed metal.",
  });
  addReadBox(s, 6.65, 3.16, 2.85, 1.36,
    "Token caps are demand evidence, not retreat.",
    "Firms ration what is scarce and valuable. Watch token budgets the way retail analysts watch same-store sales.");

  addSource(s, MD_SOURCE + " — Uber and Walmart cost-management cases; SK Hynix HBM outlook; Google/SpaceX GPU rental.", 4.62);
  addFooter(s, 4);
  s.addNotes("Three data points, one message: enterprises now treat tokens as a metered input with a budget line. Uber: $1,500/month per employee. Walmart: killed unlimited access for Code Puppy. The third card is the supply side — SK Hynix sees no HBM relief before ~2030 even after doubling capacity, and Google’s $920M/month rental is what scarcity costs when you don’t own capacity. The READ box carries the investability point: token budgets are the new same-store sales.");
}

// =============================================================================
// SLIDE 5 — Washington enters the trade
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.NOW, "POLICY", C.purpleBright);
  addHeadline(s, "Washington wants a stake");
  addSubhead(s, "Trump, Bannon, and Sanders converge on oversight and public participation in the AI upside — ownership, not regulation, is now the debate.");

  const pillars = [
    { kicker: "THE EXECUTIVE ORDER", color: C.purpleBright, t: "A 30-day federal checkpoint.", b: "Voluntary but high-pressure NSA review — 30 days, down from 90 — before releasing models with a “meaningful step change” in cyber capability. Mandatory licensing expressly forbidden — for now." },
    { kicker: "THE SOVEREIGN WEALTH FUND", color: C.gold, t: "A 50% claim on lab equity.", b: "Sanders’ proposal, echoed by Trump as “a concept of a plan”: a one-time 50% tax on AI-lab equity (not profits) seeds a public fund paying “AI Dividends” to citizens." },
    { kicker: "THE CRITIQUE", color: C.redBright, t: "“Corporate-government fusion.”", b: "Sacks: government equity risks a CCP-style social-credit state — and nationalization talk is a “stupidity tax” on the job-apocalypse narrative the labs themselves stoked." },
  ];
  pillars.forEach((p, i) => {
    addPointCard(s, { kicker: p.kicker, color: p.color, title: p.t, body: p.b, x: 0.5, y: 1.6 + i * 0.92, w: 6.0, h: 0.84 });
  });

  addImagePlaceholder(s, {
    x: 6.65, y: 1.6, w: 2.85, h: 2.6,
    label: "CAPITOL IN DARK GLASS", accent: C.purpleBright,
    prompt: "Neoclassical government dome rendered in dark glass, faint purple circuit patterns glowing inside, black background, centered.",
  });

  s.addText([
    { text: "Investor read: ", options: { bold: true, color: C.white } },
    { text: "the 2026 debate is no longer whether AI is regulated — it’s whether the means of AI production are publicly owned. That’s a dilution tail risk no equity model carries.", options: { color: C.inkBody } },
  ], { x: 0.5, y: 4.3, w: 9.0, h: 0.38, fontSize: 10, fontFace: "Arial", margin: 0 });

  addSource(s, MD_SOURCE + " — Executive Order provisions, sovereign wealth fund proposals, Sacks critique.", 4.7);
  addFooter(s, 5);
  s.addNotes("The policy slide stays neutral by quoting all sides. EO: voluntary 30-day NSA review, cyber-focused, no licensing — lighter than feared, but a calendar item before every frontier release. SWF: a one-time 50% equity tax to fund AI Dividends — when Sanders proposes and Trump echoes, the Overton window has genuinely moved. Sacks' critique is the third leg: nationalization as a threat to the property rights underpinning lab valuations. The investable point: public-ownership tail risk now belongs in any model of lab equity, the IPO pipeline, and the hyperscalers holding lab stakes. This slide is also the political receiving end of the labor story on slide 7.");
}

// =============================================================================
// SLIDE 6 — The market split the trade (equity repricing)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "EQUITIES", C.gold);
  addHeadline(s, "The market split the trade");
  addSubhead(s, "Semis +80%, software −10% — a ~90-point spread inside one theme, while ten stocks hold ~37% of the index.");

  addChartTitle(s, "Total return, YTD 2026 (%)", 0.5, 5.4, C.gold);
  s.addChart(pres.charts.BAR, [{
    name: "YTD total return (%)",
    labels: ["Semis (SOXX)", "Equal-weight (RSP)", "S&P 500", "Mag 7 (MAGS)", "Software (IGV)"],
    values: [79.5, 14.3, 11.3, 5.9, -9.5],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.05, w: 5.4, h: 2.35,
    chartColors: [C.orange, C.tealBright, C.inkBar, C.gold, C.redBright],
    catAxisLabelFontSize: 8,
    valAxisMinVal: -20,
  });

  addStat(s, { x: 6.2, y: 1.85, w: 3.3, value: "37%", color: C.orange,
    label: "Top-10 share of S&P 500 market cap — the 1990–2015 norm was 18–23%; the 2025 peak 40.7%." });
  addStat(s, { x: 6.2, y: 2.78, w: 3.3, value: "~$5.0T", color: C.gold,
    label: "Nvidia market cap, 7.0% of the index — Apple $4.6T and Microsoft $3.3T behind it; three names ≈ 18%." });
  addStat(s, { x: 6.2, y: 3.71, w: 3.3, value: "21.1x", color: C.tealBright,
    label: "S&P 500 forward P/E vs a 19.0x 10-yr average — elevated, not extreme. The spread is the signal." });

  s.addText([
    { text: "Leadership migrated from the platforms to their suppliers. ", options: { bold: true, color: C.white } },
    { text: "Value accrues where AI spend is revenue — and erodes where AI is the threat.", options: { color: C.inkBody } },
  ], { x: 0.5, y: 4.48, w: 9.0, h: 0.26, fontSize: 10, fontFace: "Arial", margin: 0 });

  addSource(s, "YTD total returns through early Jun 2026: stockanalysis.com (SOXX, IGV); slickcharts (S&P 500); Morningstar/Yahoo (RSP, MAGS). Weights: S&P DJI, slickcharts. Caps: companiesmarketcap.com. Fwd P/E: FactSet.", 4.72);
  addFooter(s, 6);
  s.addNotes("Part two opens with the equity scoreboard. SOXX +80% YTD (best run since 2000, ~$5.7T added in the April rally alone); equal-weight +14% beats cap-weight +11%; MAGS +6% lags; software −10%, priced for disruption. The market is no longer trading 'AI yes/no' — it’s trading position in the chain. The right rail is the concentration story: 37% of the index in ten names (double the 25-year norm), Nvidia alone at 7%, and a forward multiple that’s elevated but not extreme — provided the AI earnings stream keeps compounding.");
}

// =============================================================================
// SLIDE 7 — One worker now outputs like a team (LABOR)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "LABOR", C.tealBright);
  addHeadline(s, "One worker now outputs like a team");
  addSubhead(s, "Agents change what a job is — and in 2026 the labor data started moving. Markets price both: deflated cost lines and the policy risk that displacement fuels.");

  // Left: the shape of a job changed (coded infographic) + hero stat
  addChartTitle(s, "The shape of a job changed", 0.5, 4.1, C.tealBright);
  addStat(s, { x: 0.5, y: 1.98, w: 4.1, value: "20–25%", color: C.tealBright, fontSize: 24,
    label: "of the work week goes to coordination and retrieval (OpenAI’s “strange abundance”) — the labor pool agents are bought to recover." });

  s.addText("2023–25 · ONE PERSON, ONE TASK", { x: 0.5, y: 2.95, w: 4.1, h: 0.2, fontSize: 7.5, color: C.inkMuted, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0 });
  s.addShape(pres.shapes.OVAL, { x: 0.78, y: 3.18, w: 0.16, h: 0.16, fill: { type: "none" }, line: { color: C.inkBody, width: 1.5 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 3.36, w: 0.32, h: 0.2, fill: { type: "none" }, line: { color: C.inkBody, width: 1.5 }, rectRadius: 0.05 });
  s.addShape(pres.shapes.LINE, { x: 1.18, y: 3.36, w: 0.4, h: 0, line: { color: C.inkMuted, width: 1.5, endArrowType: "triangle" } });
  s.addShape(pres.shapes.RECTANGLE, { x: 1.66, y: 3.2, w: 1.0, h: 0.32, fill: { color: C.inkPanel }, line: { color: C.inkLine, width: 1 } });
  s.addText("ONE TASK", { x: 1.66, y: 3.2, w: 1.0, h: 0.32, fontSize: 7, color: C.inkBody, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });

  s.addText("2026 · ONE ORCHESTRATOR, N AGENTS", { x: 0.5, y: 3.68, w: 4.1, h: 0.2, fontSize: 7.5, color: C.tealBright, bold: true, fontFace: "Arial", charSpacing: 1.5, margin: 0 });
  s.addShape(pres.shapes.OVAL, { x: 0.78, y: 3.92, w: 0.16, h: 0.16, fill: { type: "none" }, line: { color: C.tealBright, width: 1.5 } });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 4.1, w: 0.32, h: 0.2, fill: { type: "none" }, line: { color: C.tealBright, width: 1.5 }, rectRadius: 0.05 });
  s.addShape(pres.shapes.LINE, { x: 1.18, y: 4.1, w: 0.4, h: 0, line: { color: C.tealBright, width: 1.5, endArrowType: "triangle" } });
  [
    { t: "RESEARCH", x: 1.66, y: 3.86 }, { t: "BUILD", x: 2.72, y: 3.86 },
    { t: "TEST", x: 1.66, y: 4.26 }, { t: "SHIP", x: 2.72, y: 4.26 },
  ].forEach((a) => {
    s.addShape(pres.shapes.OVAL, { x: a.x, y: a.y, w: 0.96, h: 0.32, fill: { type: "none" }, line: { color: C.tealBright, width: 1.25 } });
    s.addText(a.t, { x: a.x, y: a.y, w: 0.96, h: 0.32, fontSize: 6.5, color: C.tealBright, bold: true, align: "center", valign: "middle", fontFace: "Arial", margin: 0 });
  });

  // Right: 2026 — the data starts to move
  addChartTitle(s, "2026: the data starts to move", 4.95, 4.55, C.tealBright);
  const rows = [
    { color: C.redBright, t: "AI is now the #1 stated reason for layoffs.", b: "Challenger: AI was cited in ~40% of May’s announced US job cuts (38.6k of 97k) — the first month it beat “market conditions.” 87.7k AI-attributed cuts YTD vs 54.8k in all of 2025. (Self-reported; some firms may be scapegoating AI.)" },
    { color: C.orange, t: "The entry level takes the hit.", b: "Recent-grad unemployment 5.6% vs 4.2% overall (NY Fed, Mar 2026) — one of the worst readings in a decade outside the pandemic. Payrolls for 22–25-year-olds in AI-exposed roles are declining while senior cohorts hold." },
    { color: C.gold, t: "The job that remains is orchestration.", b: "Power users running parallel loops compound their advantage over casual users; comp follows loop design, not task execution. And displacement fear is the political fuel behind slide 5’s equity-tax debate." },
  ];
  rows.forEach((r, i) => {
    const y = 2.05 + i * 0.82;
    s.addShape(pres.shapes.RECTANGLE, { x: 4.95, y: y, w: 0.07, h: 0.76, fill: { color: r.color } });
    s.addText([
      { text: r.t + "  ", options: { bold: true, color: C.white, fontSize: 9.5 } },
      { text: r.b, options: { color: C.inkBody, fontSize: 7.8 } },
    ], { x: 5.12, y: y, w: 4.38, h: 0.8, fontFace: "Arial", valign: "top", margin: 0 });
  });

  addSource(s, "Challenger, Gray & Christmas via CNBC (Jun 5, 2026) & CBS News; NY Fed via CNBC; entry-level payrolls: academic working papers; framing: internal strategic review (Jun 2026).", 4.74);
  addFooter(s, 7);
  s.addNotes("The labor slide — new this version, with verified June 2026 data. Left: the structural story — a job stops being task execution and becomes orchestration of parallel agent loops; the 20–25% coordination figure is the pool agents are bought to recover. Right: the data — Challenger’s May report made AI the #1 stated layoff reason for the first time (~40% of announced cuts, with the honest caveat that it’s self-reported and partly scapegoating); the entry level is where it bites (grad unemployment 5.6% vs 4.2%, declining payrolls for the youngest AI-exposed cohort); and the advantage gap stratifies pay within surviving roles. Markets price labor twice: as a cost line agents deflate, and as the political trigger for slide 5’s ownership debate.");
}

// =============================================================================
// SLIDE 8 — Capex outgrew cash flow (BONDS I: the financing gap)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "FINANCING — THE GAP", C.orange);
  addHeadline(s, "Capex outgrew cash flow");
  addSubhead(s, "The buildout was self-funded until it wasn’t. ~$705B of guided 2026 capex consumes the cash machine — and opens a funding gap.");

  addChartTitle(s, "Big-4 combined capex, $B", 0.5, 3.2, C.orange);
  s.addChart(pres.charts.BAR, [{
    name: "Combined capex ($B)",
    labels: ["2025", "2026E"],
    values: [410, 705],
  }], {
    ...BAR_DEFAULTS, x: 0.5, y: 2.05, w: 3.2, h: 2.3, chartColors: [C.inkBar, C.orange],
  });
  s.addText("+72% YoY — raised into record spend", {
    x: 0.5, y: 4.38, w: 3.2, h: 0.3, fontSize: 8, color: C.orange, bold: true, fontFace: "Arial", align: "center", valign: "top", margin: 0,
  });

  addChartTitle(s, "The cash math, 2026E", 4.1, 5.4, C.orange);
  const cash = [
    { t: "Cash cover is gone.", label: "~94% of operating cash flow consumed by capex + dividends + buybacks (BofA)", color: C.orange },
    { t: "Leanest since 2014.", label: "Big-4 free cash flow at a decade low — at far larger revenue (CNBC)", color: C.gold },
    { t: "Amazon goes negative.", label: "2026E: $200B capex vs ~$140B operating cash flow", color: C.redBright },
    { t: "Alphabet FCF −90%.", label: "FCF falls to ~$8B; Microsoft down ~28% (2026E)", color: C.pink },
  ];
  cash.forEach((c, i) => {
    const x = 4.1 + (i % 2) * 2.8;
    const y = 2.05 + Math.floor(i / 2) * 1.2;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 2.6, h: 1.08, fill: { color: C.inkPanel } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 2.6, h: 0.05, fill: { color: c.color } });
    s.addText(c.t, {
      x: x + 0.1, y: y + 0.12, w: 2.4, h: 0.3, fontSize: 11, color: c.color, bold: true, fontFace: "Arial", align: "center", margin: 0,
    });
    s.addText(c.label, {
      x: x + 0.12, y: y + 0.46, w: 2.36, h: 0.56, fontSize: 7.5, color: C.inkBody, fontFace: "Arial", align: "center", valign: "top", margin: 0,
    });
  });

  s.addText([
    { text: "The “self-funding megacap” contract broke in 2026. ", options: { bold: true, color: C.white } },
    { text: "What filled the gap is on the next slide.", options: { color: C.inkBody } },
  ], { x: 4.1, y: 4.36, w: 5.4, h: 0.32, fontSize: 10, fontFace: "Arial", margin: 0 });

  addSource(s, "BofA via Breckinridge; CNBC (Feb 6, 2026); techtimes/beincrypto FCF estimates; capex guidance via CNBC, Tom’s Hardware, Statista (midpoints).", 4.72);
  addFooter(s, 8);
  s.addNotes("Bonds, part one: the gap. Capex went from $410B to ~$705B guided (+72%) — and three of four raised guidance in the latest round. The cash math: ~94% of operating cash flow committed to capex, dividends, and buybacks; Big-4 FCF at a decade low; Amazon outright negative ($200B capex vs ~$140B operating cash flow); Alphabet’s FCF down ~90% to ~$8B. For a decade the megacap social contract was self-funding plus buybacks. It broke in 2026 — and something had to fill the gap. Next slide.");
}

// =============================================================================
// SLIDE 9 — The buildout moved into the bond market (BONDS II: the wave)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "FINANCING — THE BOND WAVE", C.orange);
  addHeadline(s, "The buildout moved into the bond market");
  addSubhead(s, "$105B+ of investment-grade mega-deals in six months — record prints, a live CDS signal, and ~$300B of supply expected for full-year 2026.");

  addChartTitle(s, "The issuance ledger", 0.5, 5.9, C.orange);
  const deals = [
    { amt: "$18B", who: "Oracle", note: "", when: "Sep ’25" },
    { amt: "$30B", who: "Meta", note: "record non-M&A IG", when: "Oct ’25" },
    { amt: "$17.5B", who: "Alphabet", note: "", when: "Nov ’25" },
    { amt: "$15B", who: "Amazon", note: "", when: "Nov ’25" },
    { amt: "$25B", who: "Oracle", note: "8 tranches", when: "Feb ’26" },
  ];
  s.addShape(pres.shapes.LINE, { x: 0.7, y: 3.02, w: 5.5, h: 0, line: { color: C.inkLine, width: 1.5 } });
  deals.forEach((d, i) => {
    const x = 0.5 + i * 1.18;
    s.addShape(pres.shapes.OVAL, { x: x + 0.51, y: 2.96, w: 0.12, h: 0.12, fill: { color: C.orange } });
    s.addText(d.amt, {
      x: x, y: 2.5, w: 1.14, h: 0.36, fontSize: 14, color: C.orange, bold: true, fontFace: "Arial Black", align: "center", margin: 0,
    });
    const runs = [{ text: d.who, options: { bold: true, color: C.white, fontSize: 8, breakLine: true } }];
    if (d.note) runs.push({ text: d.note, options: { color: C.inkMuted, fontSize: 6.8, breakLine: true } });
    runs.push({ text: d.when, options: { color: C.inkMuted, fontSize: 7.5 } });
    s.addText(runs, { x: x, y: 3.2, w: 1.14, h: 0.62, fontFace: "Arial", align: "center", valign: "top", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.0, w: 5.9, h: 0.55, fill: { color: C.inkPanel } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.0, w: 0.07, h: 0.55, fill: { color: C.orange } });
  s.addText([
    { text: "$105B+ in six months. ", options: { bold: true, color: C.white, fontSize: 11 } },
    { text: "The marginal dollar of AI capex is now priced daily by the bond market.", options: { color: C.inkBody, fontSize: 9.5 } },
  ], { x: 0.68, y: 4.0, w: 5.6, h: 0.55, fontFace: "Arial", valign: "middle", margin: 0 });

  addStat(s, { x: 6.65, y: 1.75, w: 2.85, value: "~$300B", color: C.orange,
    label: "AI-linked investment-grade supply expected in 2026 (UBS, Barclays via Reuters)." });
  addStat(s, { x: 6.65, y: 2.55, w: 2.85, value: ">125bp", color: C.gold,
    label: "Oracle 5-yr CDS despite light leverage — credit already discriminates by funding capacity (MUFG)." });
  addReadBox(s, 6.65, 3.5, 2.85, 1.12,
    "Credit reprices before equity.",
    "Spreads move before earnings revisions — the early-warning gauge for AI equities.");

  addSource(s, "Deal record: Mawer; M&G Investments; Fortune (Mar 2026); CNBC. CDS: MUFG via CNBC. Supply forecasts: UBS & Barclays via Reuters (Jan 2026).", 4.72);
  addFooter(s, 9);
  s.addNotes("Bonds, part two: the wave. Five mega-deals in six months — Oracle $18B (Sep ’25), Meta $30B (Oct ’25, the largest non-M&A IG deal on record), Alphabet $17.5B and Amazon $15B (Nov ’25), Oracle again $25B across eight tranches (Feb ’26). Street consensus: ~$300B of AI-linked IG supply in 2026. The signal layer: Oracle’s 5-yr CDS above ~125bp despite light leverage — credit is already discriminating by funding capacity, not just rating. The READ box is the takeaway for equity holders: spreads reprice before earnings revisions. Balance sheets are still lightly levered vs IG norms — this is not 2008 telecom — but the funding model changed permanently.");
}

// =============================================================================
// SLIDE 10 — Your index fund is an AI fund now (portfolio implications)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "PORTFOLIO", C.purpleBright);
  addHeadline(s, "Your index fund is an AI fund now");
  addSubhead(s, "A passive S&P 500 allocation embeds an undiversified AI bet no one sized deliberately — manage it with four gauges.");

  addChartTitle(s, "Where $100 of S&P 500 exposure sits", 0.5, 3.9, C.purpleBright);
  s.addChart(pres.charts.DOUGHNUT, [{
    name: "Allocation",
    labels: ["Top 3 — $18", "Rest of top 10 — $19", "Other 490 — $63"],
    values: [18, 19, 63],
  }], {
    x: 0.5, y: 2.0, w: 3.9, h: 2.5,
    chartColors: [C.orange, C.gold, C.inkBar],
    showPercent: false, showValue: false, showTitle: false,
    showLegend: true, legendPos: "b", legendFontSize: 8, legendColor: C.inkText,
    holeSize: 60,
  });
  s.addText("$37", {
    x: 1.7, y: 2.78, w: 1.5, h: 0.4, fontSize: 16, color: C.white, bold: true, fontFace: "Arial Black", align: "center", valign: "middle", margin: 0,
  });
  s.addText("in ten names", {
    x: 1.7, y: 3.16, w: 1.5, h: 0.2, fontSize: 7, color: C.inkMuted, fontFace: "Arial", align: "center", margin: 0,
  });

  addChartTitle(s, "Four gauges — and what to do with them", 4.7, 4.8, C.purpleBright);
  const pts = [
    { color: C.redBright, t: "Demand air pocket.", g: "capex guidance · enterprise token budgets", b: "~94% of op cash flow is committed; token budgets are the new same-store sales. Know your AI beta — size the 37% deliberately." },
    { color: C.orange, t: "Financing stress.", g: "CDS · new-issue spreads", b: "A failed mega-deal would reprice AI equities within days. Watch credit as the early warning." },
    { color: C.gold, t: "Rate sensitivity.", g: "10-yr UST ~4.5%", b: "Long-duration AI cash flows and record IG supply both lean on rates staying contained." },
    { color: C.purpleBright, t: "Concentration unwind.", g: "top-10 share · equal-weight spread", b: "Equal-weight beat cap-weight in 2026; the disorderly version is passive outflows meeting thin breadth. Trade the chain, not the theme." },
  ];
  pts.forEach((p, i) => {
    const y = 2.02 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x: 4.7, y: y, w: 0.07, h: 0.56, fill: { color: p.color } });
    s.addText([
      { text: p.t + "  ", options: { bold: true, color: C.white, fontSize: 9 } },
      { text: "(" + p.g + ")", options: { italic: true, color: C.inkMuted, fontSize: 7.5, breakLine: true } },
      { text: p.b, options: { color: C.inkBody, fontSize: 7.8 } },
    ], { x: 4.87, y: y, w: 4.63, h: 0.6, fontFace: "Arial", valign: "top", margin: 0 });
  });

  s.addText([
    { text: "Bottom line: ", options: { bold: true, color: C.white } },
    { text: "you don’t need a view on AGI — you need to know what your portfolio already believes.", options: { color: C.inkBody } },
  ], { x: 0.5, y: 4.5, w: 9.0, h: 0.26, fontSize: 10.5, fontFace: "Arial", margin: 0 });

  addSource(s, "Index weights: S&P Dow Jones Indices, slickcharts (Jun 2026); YTD returns: Morningstar (RSP), slickcharts (S&P 500).", 4.76);
  addFooter(s, 10);
  s.addNotes("The so-what slide. Nobody in this room would deliberately put 37% of an equity sleeve in ten correlated names sharing one earnings driver — but a benchmark allocation does precisely that ($37 of every $100). Four gauges, each paired with an action: demand (capex guidance + token budgets — the new same-store sales), financing (CDS and new-issue spreads, per slide 9), rates (long-duration cash flows + record supply), and concentration (equal-weight vs cap-weight as the orderly preview of the disorderly version). Honest caveat: equal-weight won 2026 but lost 2024–25 — the message is 'size the bet on purpose,' not 'sell megacaps.' Closing line is the deck’s thesis in one sentence.");
}

// =============================================================================
// SLIDE 11 — The frontier (closing; real images)
// =============================================================================
{
  const s = newSlide();
  addKicker(s, PARTS.IMPACT, "THE FRONTIER", C.pink, 4.3);
  s.addText("FRONTIER WATCH — SPECULATIVE", {
    x: 5.4, y: 0.17, w: 4.1, h: 0.3, fontSize: 8, color: C.inkMuted, bold: true, fontFace: "Arial", charSpacing: 2, valign: "middle", align: "right", margin: 0,
  });
  addHeadline(s, "The loop gets hands, wheels, wings — and proteins", { fontSize: 23 });
  addSubhead(s, "None of this is in 2026 guidance. All of it extends the Jevons demand curve (slide 3) by another decade — the option value markets quietly pay for.");

  const cards = [
    { img: "humanoid.jpg", t: "Embodiment.", b: "Agentic loops in a body — warehouse shifts, not concept art. Physical labor enters the token economy." },
    { img: "robotaxi.jpg", t: "Wheels.", b: "Robotaxis are inference on wheels — per-mile token economics and a city-scale demand pool for compute." },
    { img: "orbital.jpg", t: "Orbit.", b: "24/7 solar and radiative cooling escape the grid constraint behind token rationing. SpaceX owns the rockets and 550k-GPU clusters." },
    { img: "protein.jpg", t: "Proteins.", b: "Frontier models lead biology benchmarks; AI-designed proteins make discovery compute-bound. R&D starts to look like capex." },
  ];
  cards.forEach((c, i) => {
    const x = 0.5 + i * 2.38;
    s.addImage({ path: IMG + "/" + c.img, x: x, y: 1.66, w: 2.28, h: 1.4, sizing: { type: "cover", w: 2.28, h: 1.4 } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 3.06, w: 2.28, h: 1.3, fill: { color: C.inkPanel } });
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 3.06, w: 2.28, h: 0.04, fill: { color: C.pink } });
    s.addText([
      { text: c.t + "  ", options: { bold: true, color: C.white, fontSize: 9.5 } },
      { text: c.b, options: { color: C.inkBody, fontSize: 7.5 } },
    ], { x: x + 0.12, y: 3.18, w: 2.04, h: 1.12, fontFace: "Arial", valign: "top", margin: 0 });
  });

  s.addText([
    { text: "Watch these like markets, not memes: ", options: { bold: true, color: C.white } },
    { text: "launch cadence, fleet miles, design wins — gauges, not guidance.", options: { color: C.inkBody } },
  ], { x: 0.5, y: 4.48, w: 9.0, h: 0.26, fontSize: 10, fontFace: "Arial", margin: 0 });

  addSource(s, "Deck analysis building on " + MD_SOURCE + ". All frontier-watch items are speculative and appear in no company guidance.", 4.72);
  addFooter(s, 11);
  s.addNotes("The closer — the option value sitting behind the multiples, kept disciplined. Embodiment: agentic loops in a body, walking a shift. Orbit: it removes the exact power-and-cooling constraints behind token rationing (slide 4), and SpaceX is simultaneously the neocloud king and the launch monopolist — if orbital compute happens it’s an extension of the most vertically integrated player in the stack. Wheels: every robotaxi mile is metered inference. Proteins: frontier models lead biology benchmarks; discovery becomes compute-bound. Every card is new compute demand — the Jevons curve extended a decade. Flagged speculative; gauges, not guidance.");
}

// =============================================================================
// SLIDE 12 — Sources & methodology
// =============================================================================
{
  const s = newSlide();
  addHeadline(s, "Sources & methodology", { fontSize: 22, y: 0.3 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.95, w: 2.6, h: 0.38, fill: { color: C.orange } });
  s.addText(DATA_AS_OF.toUpperCase(), {
    x: 0.5, y: 0.95, w: 2.6, h: 0.38, fontSize: 10.5, color: C.black, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1,
  });
  s.addText("All return figures are YTD total returns through the most recent available close (Jun 5–9, 2026, unless noted). Index and market-cap figures as of early June 2026.", {
    x: 3.3, y: 0.95, w: 6.2, h: 0.42, fontSize: 8.5, color: C.inkMuted, fontFace: "Arial", valign: "middle", margin: 0,
  });

  const cols = [
    { h: "MARKET DATA", color: C.gold, items: [
      "ETF returns & stats: stockanalysis.com (SOXX, IGV); Morningstar / Yahoo Finance (RSP, MAGS)",
      "Index returns & weights: slickcharts.com; S&P Dow Jones Indices; MacroMicro; finhacker.cz",
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
      "Layoffs: Challenger, Gray & Christmas via CNBC (Jun 5, 2026) & CBS News — AI cited in ~40% of May cuts; 87.7k YTD",
      "Graduate unemployment: NY Fed recent-grad series (5.6% vs 4.2% overall, Mar 2026) via CNBC",
      "Entry-level payrolls: academic working papers on AI-exposed occupations (22–25 cohort)",
      "Policy: Executive Order provisions, sovereign-wealth-fund proposals, Sacks critique — per the strategic review",
    ]},
    { h: "AI FRONTIER REVIEW", color: C.purpleBright, items: [
      "Internal strategic review: “The 2026 AI Frontier” (Jun 2026)",
      "Agentic loops & token economics; enterprise caps (Uber, Walmart); Karpathy & Cherny commentary",
      "Compute: SK Hynix HBM outlook; SpaceX Colossus; Google GPU rental; run rates via Leona’s Capital",
      "Frontier watch: embodiment, orbital compute, robotaxis, AI biology — speculative",
    ]},
  ];
  cols.forEach((c, i) => {
    const x = 0.5 + i * 2.325;
    s.addShape(pres.shapes.RECTANGLE, { x: x, y: 1.55, w: 2.25, h: 0.24, fill: { color: c.color } });
    s.addText(c.h, {
      x: x, y: 1.55, w: 2.25, h: 0.24, fontSize: 7.5, color: C.black, bold: true, fontFace: "Arial", align: "center", valign: "middle", margin: 0, charSpacing: 1,
    });
    s.addText(c.items.map((t, j) => ({
      text: t, options: { bullet: { code: "2022", indent: 7 }, breakLine: j < c.items.length - 1, fontSize: 7.2, color: C.inkBody },
    })), { x: x + 0.04, y: 1.87, w: 2.18, h: 2.4, fontFace: "Arial", valign: "top", paraSpaceAfter: 4, margin: 0 });
  });

  s.addText("Methodology: figures verified against at least one primary or institutional source; where sources disagreed, the more conservative figure was used. The Jevons chart (slide 3) is illustrative, not measured data. Layoff attributions to AI are self-reported by employers (Challenger) and may overstate causation. Frontier items (slide 11) are speculative and appear in no company guidance. Image placeholders are labeled in situ and pending final art. End of deck.", {
    x: 0.5, y: 4.34, w: 9.0, h: 0.56, fontSize: 7.5, color: C.inkFaint, italic: true, fontFace: "Arial", margin: 0,
  });

  addFooter(s, 12);
  s.addNotes("Back matter. Canonical stamp: data as of June 2026; returns through Jun 5–9 closes. New LABOR & POLICY column covers the web-verified Challenger and NY Fed figures. Honesty notes: the Jevons curve is illustrative; AI layoff attributions are self-reported and may overstate causation; frontier items are speculative; the three image placeholders (cover, token meter, capitol) are pending final art and labeled as such on-slide.");
}

// =============================================================================
// Write the .pptx, then emit slides-data.js for the HTML viewer
// =============================================================================

const VIEWER_NOTES = [
  "Twelve slides, two parts. 01 WHAT’S HAPPENING: models became loop-running agents, tokens became a rationed input, Washington moved from regulating AI to debating who owns it. 02 MARKET IMPACT: equities split the trade, labor data moved, financing went to the bond market, your benchmark became an AI fund. One question throughout: what does this do to portfolios.",
  "The thesis: three shifts at once — linear chat → autonomous loops ($47B run rate); token subsidy → token scarcity ($920M/mo GPU rental); private tech → sovereign asset (50% equity-tax proposal). Banner: the chatbot’s economics are exhausted; the stack is reorganizing around token-burning agentic loops.",
  "The unit of work changed: one-shot prompts → try-fail-fix-ship loops ('My job is to write loops' — Cherny). Right: the Jevons paradox — as creation friction falls, compute demanded expands geometrically: PDF summaries → dashboards → disposable apps → giant research projects. Efficiency multiplies demand. (Curve illustrative.)",
  "Token rationing: Uber capped agents at $1,500/mo per employee; Walmart killed unlimited Code Puppy access; behind it, SK Hynix sees no HBM relief before ~2030 and Google rents 110k GPUs at $920M/mo. READ: token caps are demand evidence — the new same-store sales.",
  "Washington: a 30-day NSA pre-release checkpoint (EO), a proposed 50% one-time tax on lab equity funding 'AI Dividends' (Sanders proposed, Trump echoed), and Sacks' corporate-government-fusion critique. The debate is ownership, not regulation — dilution tail risk no equity model carries.",
  "The equity scoreboard: SOXX +80% / RSP +14% / S&P +11% / MAGS +6% / IGV −10% — a ~90-point spread inside one theme. Right rail: top-10 share 37% (norm 18–23%), Nvidia ~$5T (7%), index 21.1x forward vs 19.0x avg. Trade the chain, not the theme.",
  "LABOR (new): one orchestrator, N agents — the 20–25% coordination pool is what agents are bought to recover. The 2026 data: Challenger — AI now the #1 stated layoff reason (~40% of May cuts, 87.7k YTD; self-reported); NY Fed — grad unemployment 5.6% vs 4.2%; the entry level takes the hit. Comp follows loop design. Displacement fear fuels the slide-5 policy debate.",
  "BONDS I — the gap: capex $410B → ~$705B (+72%), ~94% of op cash flow consumed, Big-4 FCF at a decade low, Amazon negative, Alphabet −90%. The self-funding megacap contract broke in 2026.",
  "BONDS II — the wave: Oracle $18B, Meta $30B (record non-M&A IG), Alphabet $17.5B, Amazon $15B, Oracle $25B (8 tranches) = $105B+ in six months; ~$300B expected for full-year 2026. Oracle CDS >125bp: credit discriminates by funding capacity. READ: credit reprices before equity.",
  "Portfolio: $37 of every $100 of S&P exposure sits in ten names. Four gauges × actions: demand (capex + token budgets), financing (CDS/spreads), rates (~4.5% 10-yr), concentration (equal-weight spread). You don’t need a view on AGI — you need to know what your portfolio already believes.",
  "The frontier (speculative, flagged): embodiment (loops in a body), orbit (escapes the grid constraint; SpaceX owns rockets + clusters), wheels (inference per mile), proteins (discovery becomes compute-bound). Every card extends the Jevons curve a decade. Gauges, not guidance.",
  "Back matter. Data as of June 2026. New LABOR & POLICY sources column (Challenger, NY Fed). Honesty notes: Jevons illustrative; AI layoff attributions self-reported; frontier speculative; three image placeholders pending final art.",
];

// Build stamp doubles as the viewer cache-buster (index.html: const V = D.v) —
// every rebuild invalidates the immutable-cached /slides/*.JPG URLs automatically.
const BUILD_STAMP = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);

const viewerData = {
  title: "AI in the Market",
  subtitle: "What’s happening now — and how markets reprice — June 2026",
  file: "ai-markets-deck.pptx",
  v: BUILD_STAMP,
  total: 0, // derived from titles.length below — do not hand-edit
  sections: [
    { start: 1, label: "Intro" },
    { start: 3, label: "01 What’s happening" },
    { start: 6, label: "02 Market impact" },
    { start: 12, label: "Sources" },
  ],
  titles: [
    "Cover — AI in the Market",
    "Three shifts, happening now",
    "From prompts to loops — demand has no ceiling",
    "Tokens got a budget line",
    "Washington wants a stake",
    "The market split the trade",
    "One worker now outputs like a team",
    "Capex outgrew cash flow",
    "The buildout moved into the bond market",
    "Your index fund is an AI fund now",
    "The loop gets hands, wheels, wings — and proteins",
    "Sources & methodology",
  ],
  notes: VIEWER_NOTES,
};

viewerData.total = viewerData.titles.length;
if (viewerData.notes.length !== viewerData.total) {
  throw new Error("Slide count mismatch: " + viewerData.total + " titles vs " + viewerData.notes.length + " notes — update both arrays together.");
}

fs.writeFileSync("slides-data.js", "window.DECK = " + JSON.stringify(viewerData, null, 2) + ";\n");

pres.writeFile({ fileName: "ai-markets-deck.pptx" })
  .then((name) => { console.log("Wrote:", name, "+ slides-data.js (" + viewerData.total + " slides, v=" + BUILD_STAMP + ")"); })
  .catch((err) => { console.error("Write failed:", err); process.exit(1); });

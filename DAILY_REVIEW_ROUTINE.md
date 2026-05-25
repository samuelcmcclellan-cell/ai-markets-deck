# Daily "AI Markets" deck review — Routine

A ready-to-use **Routine** (Anthropic's cloud-scheduled Claude Code agent) that, every
day, reviews the AI Markets deck and commits a dated review + prioritized update plan to
`main`. It reviews and plans only — it never edits `build-deck.js` or rebuilds the deck.

- **Runs:** remotely on Anthropic's cloud (works when your computer is off), against a
  fresh clone of `samuelcmcclellan-cell/ai-markets-deck`.
- **Produces:** `reviews/REVIEW_<YYYY-MM-DD>.md`, committed to `main`.
- **Set up at:** [claude.ai/code/routines](https://claude.ai/code/routines).

---

## Section 1 — The routine prompt

Paste everything in the box below verbatim into the Routines **Instructions** field.

```text
You are reviewing an institutional investor presentation and producing a daily review
plus a prioritized plan to update it. Work entirely from the cloned repository and
current web data. Be specific, sourced, and incremental.

REPOSITORY CONTEXT
- This repo builds a ~25-slide institutional deck titled "AI Markets" via
  `node build-deck.js`, which writes `ai-markets-deck.pptx`. `build-deck.js` is the
  SINGLE SOURCE OF TRUTH for every slide's text, numbers, and charts.
- Rendered slide images are in `slides/Slide*.JPG` (what the audience sees). Source
  illustrations are in `slides-images/`.
- Prior reviews/plans may exist in `reviews/` or the repo root (`REVIEW_*.md`,
  `IMPROVEMENT_PLAN_*.md`). The deck uses the BII (BlackRock-inspired) style:
  full-sentence takeaway titles, big stat callouts, orange/violet accents.

EACH RUN
1. ORIENT. Read `build-deck.js` in full. View the rendered slides in `slides/` to assess
   the current visual state. Find and read the most recent prior review/plan. Today's
   output must be INCREMENTAL — emphasize what changed and what is still open, and mark
   previously-flagged issues resolved when the source shows they're fixed. If no prior
   review exists, do a full first pass.

2. VERIFY THE MARKET DATA (core daily task). Locate each time-sensitive figure in
   `build-deck.js` by searching (do not assume line numbers) and verify it against
   current data with WebSearch, plus WebFetch of primary sources where reachable. Check
   at minimum:
   - The TOP20 companies table (market caps, forward P/E, FY2026/FY2027 revenue).
   - The YTD series on the divergence slide (semis/SOXX, software/IGV, Nasdaq) — the
     numeric arrays feeding that line chart.
   - Private-lab valuations and funding (OpenAI, Anthropic, xAI/SpaceX, Alphabet) and the
     "Q1 funding vs 2025" claim.
   - Hyperscaler capex (~$750B) and the "capex on credit" stats (% of operating cash
     flow, debt, leases).
   - Inference / token-cost figures.
   - The cover date and every "as of" date stamp.
   For each figure record: the value ON THE SLIDE, the CURRENT value, a CONFIDENCE tag
   (High/Med/Low), a DATED SOURCE, and the DRIFT (how far off, material or not). If a
   source can't be reached, label it "unverified — network blocked" rather than guessing.

3. COMPREHENSIVE CONTENT & DESIGN QA. Scan every slide for the issue classes prior
   reviews track: unfilled `IMAGE:` placeholders, internal contradictions (a chart series
   disagreeing with a callout band), titles that are topic labels instead of takeaway
   sentences, text wrapping/clipping, weak or missing sourcing, date inconsistencies, and
   TOC/appendix mismatches. Note new issues and the status of previously-flagged ones.

4. WRITE THE OUTPUT FILE `reviews/REVIEW_<YYYY-MM-DD>.md` using TODAY'S run date, with two
   parts:
   Part 1 — Review:
     - Header: date, files reviewed (`build-deck.js` + rendered slides), method.
     - Deck Map table: # | Section | Title (as shown) | Purpose.
     - Executive Summary: the day's issues ranked P0 (ship-blocker) / P1 (high) /
       P2 (polish).
     - Data-Freshness table: Figure | On slide | Current | Confidence | Source (dated) |
       Drift.
     - Slide-by-slide notes: concise; lead with what changed since the last review.
   Part 2 — Update Plan:
     - A. Data refreshes: each as `From -> To`, with confidence, dated source, and WHERE
       IN `build-deck.js` to change it (name the variable/array/slide block). Order by
       materiality.
     - B. Content & design fixes: concrete, each with effort (S/M/L) and priority.
     - A short verify-before-shipping checklist for any Med/Low-confidence items.

5. COMMIT. Stage only the new `reviews/REVIEW_<YYYY-MM-DD>.md`, commit it to `main` with
   message "Daily deck review — <YYYY-MM-DD>", and push. DO NOT modify `build-deck.js`,
   rebuild the .pptx, or change any slide or image — this run produces the review and
   plan only.

SUCCESS CRITERIA
- A new `reviews/REVIEW_<date>.md` is committed to `main`.
- Every stale-prone figure has a `From -> To` with a confidence tag and dated source, or
  an explicit "unverified" note.
- The Update Plan is concrete enough to execute directly: each data refresh names the
  exact value and where it lives in `build-deck.js`.
- The review is incremental — it doesn't re-litigate issues the source shows are already
  resolved.
```

---

## Section 2 — Setup guide

One-time setup at [claude.ai/code/routines](https://claude.ai/code/routines):

1. **Push first.** Make sure `main` is pushed with the current committed `build-deck.js`
   and rendered `slides/`. The cloud clones `main`, so uncommitted local edits are not
   visible to the routine.
   - *Optional:* commit `IMPROVEMENT_PLAN_2026-05-22.md` (and a recent `REVIEW_*.md`) so
     the first cloud run starts with history. Otherwise the first run does a full pass.
2. **New routine** → **Name:** `daily-ai-markets-deck-review`. Paste **Section 1** into
   the **Instructions** box. **Model:** Opus (for review quality).
3. **Repositories:** add `samuelcmcclellan-cell/ai-markets-deck`.
4. **Environment:** set **Network access → Full** so WebFetch can reach financial data
   sources. No setup script is needed — this routine only reads and writes Markdown, it
   does not run `node`/`npm`.
5. **Trigger:** **Schedule → Daily** at a chosen local time. (Consider **Weekdays** —
   markets are closed on weekends, so weekend runs mostly re-confirm Friday's numbers.)
6. **Permissions:** enable **"Allow unrestricted branch pushes"** for the repo. This is
   required for the routine to commit to `main` (routines otherwise push only to
   `claude/`-prefixed branches).
7. **Connectors:** remove all — none are needed.
8. **Create**, then click **Run now** to test the first run.

### Verify the first run

- Open the run session and confirm Claude read `build-deck.js` + the slides, ran web
  lookups, and committed `reviews/REVIEW_<today>.md`.
- Locally run `git pull`, then open `reviews/REVIEW_<today>.md`. Confirm both parts are
  present, the Data-Freshness table has `From -> To` + confidence + dated sources, and the
  Update Plan names where each change lives in `build-deck.js`.
- Confirm `build-deck.js` and the slides are unchanged.
- If sources show "unverified — network blocked," recheck the environment is set to
  **Full** network access.

### Notes

- The daily value is the **market-data freshness diff**; design/content is comparatively
  stable, so the prompt keeps the review incremental rather than repeating the same notes
  each day.
- Daily routine run caps apply (Pro 5/day, Max 15/day); one run/day is well within them.
- This routine is **plan-only** by design. To have it also apply verified numbers and
  rebuild the deck, you'd add `npm install` to the environment and change the prompt to
  edit `build-deck.js` and open a PR.

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const JSZip = require("jszip");
const imageSizeModule = require("image-size");

const imageSize = imageSizeModule.imageSize || imageSizeModule;
const ROOT = __dirname;
const PPTX = path.join(ROOT, "ai-markets-deck.pptx");
const SLIDES_DIR = path.join(ROOT, "slides");
const DATA_FILE = path.join(ROOT, "slides-data.js");

function fail(message) {
  throw new Error(message);
}

function readViewerData() {
  if (!fs.existsSync(DATA_FILE)) fail("Missing slides-data.js");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(DATA_FILE, "utf8"), sandbox, { filename: DATA_FILE });
  if (!sandbox.window.DECK) fail("slides-data.js did not assign window.DECK");
  return sandbox.window.DECK;
}

function numberedSlideFiles() {
  if (!fs.existsSync(SLIDES_DIR)) fail("Missing slides/ directory");
  return fs.readdirSync(SLIDES_DIR)
    .map((name) => {
      const match = /^Slide(\d+)\.JPG$/i.exec(name);
      return match ? { name, number: Number(match[1]), file: path.join(SLIDES_DIR, name) } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.number - b.number);
}

async function pptxSlideCount() {
  if (!fs.existsSync(PPTX)) fail("Missing ai-markets-deck.pptx");
  const zip = await JSZip.loadAsync(fs.readFileSync(PPTX));
  return Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .length;
}

async function main() {
  const data = readViewerData();
  const pptSlides = await pptxSlideCount();
  const slideFiles = numberedSlideFiles();
  const errors = [];

  if (data.total !== data.titles.length) errors.push(`viewer total ${data.total} != titles ${data.titles.length}`);
  if (data.total !== data.notes.length) errors.push(`viewer total ${data.total} != notes ${data.notes.length}`);
  if (data.total !== pptSlides) errors.push(`viewer total ${data.total} != pptx slides ${pptSlides}`);
  if (slideFiles.length !== data.total) errors.push(`exported JPG count ${slideFiles.length} != viewer total ${data.total}`);

  for (let n = 1; n <= data.total; n++) {
    const found = slideFiles.find((slide) => slide.number === n);
    if (!found) {
      errors.push(`missing slides/Slide${n}.JPG`);
      continue;
    }
    if (fs.statSync(found.file).size === 0) errors.push(`${found.name} is empty`);
    const dims = imageSize(found.file);
    if (dims.width !== 1920 || dims.height !== 1080) {
      errors.push(`${found.name} is ${dims.width}x${dims.height}, expected 1920x1080`);
    }
  }

  if (errors.length) {
    console.error("Deck validation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(`Deck validation passed: ${data.total} slides, ${slideFiles.length} JPGs, ${pptSlides} PPTX slides.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

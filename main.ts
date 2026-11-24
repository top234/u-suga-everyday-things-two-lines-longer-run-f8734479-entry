import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Two lines explaining a traffic jam to a 10-year-old.
// Line 1: the analogy. Line 2: what it maps and what it leaves out.
const TEXT =
  "A traffic jam is a parking lot that forgot it was a road, where hundreds of cars stand bumper to bumper, engines running and drivers waiting, yet nobody moves.\n" +
  "It maps the standing-still part — cars packed tight like parked cars — but leaves out that nobody chose to park, and one slow car far ahead can freeze the whole road.";

const lines = TEXT.split("\n");
if (lines.length !== 2 || lines.some((line) => line.trim().length === 0)) {
  throw new Error("entry must be exactly two non-empty lines");
}
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 400) {
  throw new Error(`entry must be 1-400 code points, got ${codePoints}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== TEXT) {
  throw new Error("verification failed: entry.txt does not match the entry text");
}

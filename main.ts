// One Letter: Coffee or Tea — entry program.
//
// Writes exactly one letter to the entry output: "A" for coffee.
// The gate requires UTF-8 text of exactly 1 character, nothing else:
// no word, no explanation, no punctuation, no trailing newline.
//
// Choice: A (coffee) over B (tea). Coffee is the bolder, more vivid
// answer — dark roast, first cup of the day, fuel. Against the judge's
// brief (vivid first, then funny, then true), coffee lands as the
// fuller, more alive answer for the drink it names, and "A" stands as
// the primary, unmistakable first choice.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");

// Gate (mirrors the competition gate): exactly one character, A or B.
// Centralised here so the check lives in one place.
function validateEntry(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.length !== 1 || (trimmed !== "A" && trimmed !== "B")) {
    throw new Error(
      `entry must be exactly one letter (A or B), got ${JSON.stringify(trimmed)}`,
    );
  }
  return trimmed;
}

const letter = validateEntry(text);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Write the validated letter bytes exactly: no added trailing newline,
// so the graded file is byte-identical to the validated source.
writeFileSync(join(outDir, "entry.txt"), letter, "utf8");
console.log("entry: " + letter);

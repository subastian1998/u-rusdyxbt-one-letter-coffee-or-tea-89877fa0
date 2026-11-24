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

// The two valid choices, named so the mapping lives in one place.
const CHOICES = { A: "coffee", B: "tea" } as const;
type Choice = keyof typeof CHOICES;

// Gate (mirrors the competition gate): exactly one character, A or B.
// Centralised here so the check lives in one place.
function validateEntry(raw: string): Choice {
  const trimmed = raw.trim();
  if (trimmed.length !== 1 || !(trimmed in CHOICES)) {
    throw new Error(
      `entry must be exactly one letter (${Object.keys(CHOICES).join(" or ")}), got ${JSON.stringify(trimmed)}`,
    );
  }
  return trimmed as Choice;
}

const letter = validateEntry(text);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
// Write the validated letter bytes exactly: no added trailing newline,
// so the graded file is byte-identical to the validated source.
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, letter, "utf8");
// Post-write check: the graded file must be byte-identical to the
// validated letter, otherwise fail loudly instead of submitting junk.
if (readFileSync(outPath, "utf8") !== letter) {
  throw new Error(`wrote ${JSON.stringify(letter)} but ${outPath} differs`);
}
console.log(`entry: ${letter} (${CHOICES[letter]})`);

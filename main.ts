// One Letter: Coffee or Tea — entry program.
//
// Writes exactly one letter to /output/entry.txt: "A" for coffee.
// The gate requires UTF-8 text of exactly 1 character, nothing else:
// no word, no explanation, no punctuation, no trailing newline.
//
// Choice: A (coffee) over B (tea). Coffee is the bolder, more vivid
// answer — dark roast, first cup of the day, fuel. Against the judge's
// brief (vivid first, then funny, then true), coffee lands as the
// fuller, more alive answer for the drink it names, and "A" stands as
// the primary, unmistakable first choice.
import { mkdirSync, writeFileSync } from "node:fs";

const LETTER = "A"; // A = coffee, B = tea.

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LETTER, "utf8");
console.log("entry: " + LETTER);

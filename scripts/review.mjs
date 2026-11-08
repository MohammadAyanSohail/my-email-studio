#!/usr/bin/env node
// Usage: node scripts/review.mjs <campaign-folder>
// Runs Claude Code headless to review a campaign's emails.
// Saves structured findings to review/findings.json.
// Exit code 1 if any finding is high severity, 2 if the review itself failed.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const folder = process.argv[2];
if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign-folder>");
  process.exit(2);
}

const schemaPath = resolve(root, "review/findings.schema.json");
const schemaText = JSON.stringify(JSON.parse(readFileSync(schemaPath, "utf8")));
const norm = (p) => p.replace(/\\/g, "/").replace(/\/+$/, "");
const findingsPath = resolve(root, "review/findings.json");

// If the last review was for the same folder, pass its findings to Claude.
let earlier = null;
try {
  const prev = JSON.parse(readFileSync(findingsPath, "utf8"));
  if (prev.folder && norm(prev.folder) === norm(folder) && Array.isArray(prev.findings)) {
    earlier = prev.findings;
  }
} catch {
  // No earlier findings file, or it could not be read. Do a fresh review.
}

let prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;
if (earlier) {
  prompt +=
    `\n\nEarlier findings:\n${JSON.stringify(earlier, null, 2)}\n\n` +
    "These are findings from the last review. Report only problems that are new or still not fixed. Don't repeat ones that have been fixed.";
}

const args = [
  "-p", prompt,
  "--output-format", "json",
  "--json-schema", schemaText,
  "--allowedTools", "Read,Glob,Grep",
];

const run = spawnSync("claude", args, {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 64 * 1024 * 1024,
});

if (run.error || !run.stdout) {
  console.error("Review failed to run:", run.error?.message ?? run.stderr);
  process.exit(2);
}

let parsed;
try {
  parsed = JSON.parse(run.stdout);
} catch (e) {
  console.error("Could not parse Claude output as JSON:", e.message);
  console.error(run.stdout.slice(0, 500));
  process.exit(2);
}

// Output may be one object, or a list whose last item is the result.
const result = Array.isArray(parsed) ? parsed[parsed.length - 1] : parsed;
const out = result?.structured_output;
if (!out || !Array.isArray(out.findings)) {
  console.error("No structured_output in result:", JSON.stringify(result).slice(0, 500));
  process.exit(2);
}

mkdirSync(resolve(root, "review"), { recursive: true });
writeFileSync(
  findingsPath,
  JSON.stringify({ folder: norm(folder), findings: out.findings }, null, 2) + "\n"
);

const count = (s) => out.findings.filter((f) => f.severity === s).length;
const high = count("high");
console.log(
  `Review of ${folder}: ${out.findings.length} finding(s) — ${high} high, ${count("medium")} medium, ${count("low")} low. Saved to review/findings.json`
);
process.exit(high > 0 ? 1 : 0);

#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY not set");
  process.exit(1);
}

function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, "utf-8") : "";
}

function getRecentCommits() {
  try {
    const kalebLastModified = execSync(
      'git log -1 --format="%H" -- KALEB.md 2>/dev/null',
      { encoding: "utf-8" }
    ).trim();
    if (kalebLastModified) {
      return execSync(`git log --oneline ${kalebLastModified}..HEAD 2>/dev/null`, {
        encoding: "utf-8",
      }).trim();
    }
  } catch {}
  return execSync("git log --oneline -20", { encoding: "utf-8" }).trim();
}

const kaleb = readIfExists("KALEB.md");
const claude = readIfExists("CLAUDE.md");
const vercelJson = readIfExists("vercel.json");
const packageJson = readIfExists("package.json");
const envExample = readIfExists(".env.example");
const recentCommits = getRecentCommits();

if (!recentCommits && kaleb) {
  console.log("No new commits since last KALEB.md update. Skipping.");
  process.exit(0);
}

const prompt = `You are updating a KALEB.md continuity document for a business.
This document is written for a non-technical person (Kaleb) who may need to manage,
sell, or shut down this business. Write at a sixth-grade reading level.

Here is the current KALEB.md:
<current_kaleb>
${kaleb}
</current_kaleb>

Here are the current source files to check for changes:

<claude_md>
${claude.slice(0, 3000)}
</claude_md>

<vercel_json>
${vercelJson.slice(0, 4000)}
</vercel_json>

<package_json>
${packageJson.slice(0, 2000)}
</package_json>

<env_example>
${envExample}
</env_example>

<recent_commits>
${recentCommits}
</recent_commits>

Compare the current KALEB.md against these source files. Update ONLY the sections
that have materially changed (new crons added, integrations added/removed, etc.).
Do not rewrite sections that are still accurate.

Always update the "Last Updated" line at the bottom with today's date.

Return the COMPLETE updated KALEB.md file. Keep the same structure and tone.
Use em-dashes, never double-hyphens.`;

const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6-20250514",
    max_tokens: 8000,
    messages: [{ role: "user", content: prompt }],
  }),
});

if (!response.ok) {
  const err = await response.text();
  console.error(`Anthropic API error: ${response.status} ${err}`);
  process.exit(1);
}

const data = await response.json();
const updated = data.content[0].text;

writeFileSync("KALEB.md", updated);
console.log("KALEB.md updated successfully.");

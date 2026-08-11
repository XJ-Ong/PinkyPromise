#!/usr/bin/env node
/**
 * Phase 1 verification: scenario image references must be canonical lowercase.
 *
 * Plain Node text-parse of data/scenarios.ts + data/deals.ts (no TS import,
 * no tsx, no dependencies). Exits 0 on success, 1 on any failure.
 */
import fs from "node:fs";
import path from "node:path";

let failed = false;

function fail(message) {
  failed = true;
  console.error(message);
}

const scenariosPath = path.join(process.cwd(), "data", "scenarios.ts");
const dealsPath = path.join(process.cwd(), "data", "deals.ts");

// ---------- Scenarios: lowercase image reference invariant ----------
const scenariosText = fs.readFileSync(scenariosPath, "utf8");
const thumbnails = [...scenariosText.matchAll(/thumbnail:\s*"([^"]+)"/g)].map((m) => m[1]);
const images = [...scenariosText.matchAll(/image:\s*"([^"]+)"/g)].map((m) => m[1]);

if (thumbnails.length !== 10) {
  fail(`Expected 10 thumbnail references, found ${thumbnails.length}`);
}
if (images.length !== 10) {
  fail(`Expected 10 product.image references, found ${images.length}`);
}

for (let i = 0; i < Math.min(thumbnails.length, images.length); i++) {
  if (thumbnails[i] !== images[i]) {
    fail(`Mismatch: scenario ${i + 1} thumbnail !== product.image (${thumbnails[i]} vs ${images[i]})`);
  }
}

const pathPattern = /^\/images\/scenarios\/[a-j]-product\.png$/;
for (const p of new Set([...thumbnails, ...images])) {
  if (!pathPattern.test(p)) {
    fail(`Non-canonical scenario path (must be /images/scenarios/[a-j]-product.png, lowercase): ${p}`);
    continue;
  }
  const abs = path.join("public", p.replace(/^\//, ""));
  if (!fs.existsSync(abs)) {
    fail(`Missing file: ${abs}`);
  }
}

// ---------- Deals: price > 0 finite, discountPercent in [0, 99] ----------
const dealsText = fs.readFileSync(dealsPath, "utf8");
const prices = [...dealsText.matchAll(/price:\s*([0-9.]+)/g)].map((m) => Number(m[1]));
const discountPercents = [...dealsText.matchAll(/discountPercent:\s*(\d+)/g)].map((m) => Number(m[1]));

for (let i = 0; i < prices.length; i++) {
  if (!Number.isFinite(prices[i]) || prices[i] <= 0) {
    fail(`Deal ${i + 1}: price must be finite and > 0, got ${prices[i]}`);
  }
}
for (let i = 0; i < discountPercents.length; i++) {
  if (!Number.isFinite(discountPercents[i]) || discountPercents[i] < 0 || discountPercents[i] > 99) {
    fail(`Deal ${i + 1}: discountPercent must be in [0, 99], got ${discountPercents[i]}`);
  }
}

console.log(`Scenarios: ${thumbnails.length} thumbnails / ${images.length} images (must match, lowercase, files exist)`);
console.log(`Deals: ${prices.length} prices, ${discountPercents.length} discountPercent values checked`);
if (failed) {
  console.error("FAILED: see errors above.");
} else {
  console.log("OK: all scenario image references are canonical lowercase and resolve on disk.");
}
process.exit(failed ? 1 : 0);

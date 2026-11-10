import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const files = [
  "hero-mumbai.png",
  "service-mumbai.png",
  "about-mumbai.png",
  "benefit-home.png",
  "benefit-subjects.png",
  "benefit-questions.png",
];
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const largeFiles = new Set(["hero-mumbai.png", "service-mumbai.png", "about-mumbai.png"]);

for (const name of files) {
  const file = path.resolve("public/images", name);
  const [data, info] = await Promise.all([readFile(file), stat(file)]);
  assert(data.subarray(0, 8).equals(signature), `${name} must be PNG`);
  const minSize = largeFiles.has(name) ? 500 : 100;
  const maxSize = largeFiles.has(name) ? 800 : 150;
  assert(info.size >= minSize * 1024 && info.size <= maxSize * 1024, `${name} must be ${minSize}–${maxSize} KiB (got ${info.size} bytes)`);
  const width = data.readUInt32BE(16);
  const height = data.readUInt32BE(20);
  assert(width >= (largeFiles.has(name) ? 1200 : 500) && height >= 300, `${name} is too small to display cleanly`);
  console.log(`${name}: ${width}×${height}, ${(info.size / 1024).toFixed(1)} KiB`);
}

import fs from "fs";
import path from "path";

function findTests(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let tests = [];

  for (const e of entries) {
    const full = path.join(dir, e.name);

    if (e.isDirectory()) {
      tests = tests.concat(findTests(full));
    }

    if (e.isFile() && e.name.endsWith(".test.js")) {
      tests.push(full);
    }
  }

  return tests;
}

const ROOT = path.resolve("./tests");

const tests = findTests(ROOT);

console.log(`Running ${tests.length} test files...\n`);

for (const t of tests) {
  console.log("▶", t);

  // ESM-safe import
  await import(path.resolve(t));
}
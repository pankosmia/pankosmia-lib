import fs from "fs";
import path from "path";
import os from "os";

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

// Current user
const user = os.userInfo().username;
console.log(`Running as user: ${user}`);

// ~/pankosmia_repos/_local_/_local_/plt
const targetPlt = path.join(
  os.homedir(),
  "pankosmia_repos",
  "_local_",
  "_local_",
  "plt"
);

// plt is next to this script/repo
const sourcePlt = path.resolve("./plt");

console.log(`Copying plt:`);
console.log(`  From: ${sourcePlt}`);
console.log(`  To:   ${targetPlt}`);

if (!fs.existsSync(sourcePlt)) {
  throw new Error(`plt folder not found: ${sourcePlt}`);
}

// Remove existing plt
if (fs.existsSync(targetPlt)) {
  console.log(`Removing existing plt: ${targetPlt}`);

  fs.rmSync(targetPlt, {
    recursive: true,
    force: true
  });
}

// Make sure parent directory exists
fs.mkdirSync(path.dirname(targetPlt), {
  recursive: true
});

// Copy fresh plt
fs.cpSync(sourcePlt, targetPlt, {
  recursive: true
});

console.log("✓ plt copied successfully\n");

// Run tests
const ROOT = path.resolve("./tests");
const tests = findTests(ROOT);

console.log(`Running ${tests.length} test files...\n`);

for (const t of tests) {
  console.log("▶", t);

  await import(path.resolve(t));
}


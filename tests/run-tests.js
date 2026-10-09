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

const user = os.userInfo().username;
console.log(`Running as user: ${user}`);

const targetPlt = path.join(
  os.homedir(),
  "pankosmia_repos",
  "_local_",
  "_local_",
  "plt",
);

const sourcePlt = path.resolve("./plt");

console.log(`Copying plt:`);
console.log(`  From: ${sourcePlt}`);
console.log(`  To:   ${targetPlt}`);

if (!fs.existsSync(sourcePlt)) {
  throw new Error(`plt folder not found: ${sourcePlt}`);
}

if (fs.existsSync(targetPlt)) {
  console.log(`Removing existing plt: ${targetPlt}`);

  fs.rmSync(targetPlt, {
    recursive: true,
    force: true,
  });
}

fs.mkdirSync(path.dirname(targetPlt), {
  recursive: true,
});

fs.cpSync(sourcePlt, targetPlt, {
  recursive: true,
});

console.log("✓ plt copied successfully\n");

const ROOT = path.resolve("./tests");
const tests = findTests(ROOT);

console.log(`Running ${tests.length} test files...\n`);

try {
  for (const testFile of tests) {
    console.log("▶", testFile);
    await import(path.resolve(testFile));
  }

  // Give Tape's asynchronous tests time to finish.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("\n✓ Tests completed");
} finally {
  if (fs.existsSync(targetPlt)) {
    console.log(`\nRemoving test plt: ${targetPlt}`);

    fs.rmSync(targetPlt, {
      recursive: true,
      force: true,
    });

    console.log("✓ test plt removed");
  }
}
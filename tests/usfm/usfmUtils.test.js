
import test from "tape";
import { getBookCode } from "../../src/usfm/usfmUtils.js";

// 1. valid case
test("getBookCode returns valid book code", (t) => {
  const usfm = `\\id GEN something here`;

  const result = getBookCode(usfm);

  t.equal(result.ok, true);
  t.equal(result.value, "GEN");
  t.end();
});

// 2. missing id line
test("getBookCode returns error if no \\id line", (t) => {
  const usfm = `\\c 1 verse text`;

  const result = getBookCode(usfm);

  t.equal(result.ok, false);
  t.equal(result.error, "NO_USFM_ID_FOUND");
  t.end();
});

// 3. invalid book code length
test("getBookCode returns error for invalid book code", (t) => {
  const usfm = `\\id GENE something`;

  const result = getBookCode(usfm);

  t.equal(result.ok, false);
  t.equal(result.error, "BAD_USFM_ID_LINE");
  t.end();
});
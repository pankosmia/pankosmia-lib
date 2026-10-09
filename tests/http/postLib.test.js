import test from "tape";
import {
  postEmpty,
  postJson,
  postText,
  postBytes,
} from "../../src/http/index.js";

const path = "_local_/_local_/plt";
const URLEmpty = "http://127.0.0.1:19119/api/settings/languages/";
const URLIngredient = "http://127.0.0.1:19119/api/burrito/ingredient/raw/";
const URLIngredientBytes =
  "http://127.0.0.1:19119/api/burrito/ingredient/bytes/";

/**
 * -------------------------
 * postEmpty
 * -------------------------
 */

test("postEmpty - real success", async (t) => {
  const res = await postEmpty(URLEmpty + "en");

  t.equal(res.ok, true);
  t.ok(res.status >= 0);

  if (res.ok) {
    t.ok(res.json, "should return json");
  } else {
    t.ok(res.error, "should return error text");
  }

  t.end();
});

/**
 * -------------------------
 * postJson
 * -------------------------
 */

test("postJson - real success", async (t) => {
  const body = JSON.stringify({
    payload: JSON.stringify({
      language: "en",
    }),
  });
  const res = await postJson(URLIngredient + path + "?ipath=test.json", body);

  t.equal(res.ok, true);
  t.ok(res.status >= 0);

  if (res.ok) {
    t.ok(res.json, "should return json");
  } else {
    t.ok(res.error, "should return error text");
  }

  t.end();
});

// /**
//  * -------------------------
//  * postText
//  * -------------------------
//  */

test("postText - real success", async (t) => {
  const body = JSON.stringify({ payload: "this is a test" });
  const res = await postText(
    URLIngredient + path + "?ipath=textTest.usfm",
    body,
  );

  t.equal(res.ok, true);
  if (res.ok) {
    t.ok(res.text, "should return text");
  } else {
    t.ok(res.error, "should return error text");
  }

  t.end();
});

// /**
//  * -------------------------
//  * postBytes
//  * -------------------------
//  */

test("postBytes - real success", async (t) => {
  const form = new FormData();

  form.append(
    "file",
    new Blob(["this is a test"], {
      type: "application/octet-stream",
    }),
    "bytesTest.usfm",
  );


  const res = await postBytes(
    URLIngredientBytes + path + "?ipath=bytesTest.usfm",
    form,
  );

  t.equal(res.ok,true);

  if (res.ok) {
    t.ok(res.text, "should contain text");
  } else {
    t.ok(res.error, "should return error text");
  }

  t.end();
});

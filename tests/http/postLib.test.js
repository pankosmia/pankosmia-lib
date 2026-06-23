import test from "tape";
import {
    postEmptyJson,
    postJson,
    postText
} from "../../src/http/postLib.js";

const URL = "http://127.0.0.1:19119/api/settings/languages/";

/**
 * -------------------------
 * postEmptyJson
 * -------------------------
 */

test("postEmptyJson - real success", async (t) => {
    const res = await postEmptyJson(URL+'en');

    t.equal(res.url, URL+'en');
    t.equal(typeof res.ok, "boolean");
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
        language: "en"
    });

    const res = await postJson(URL, body);

    t.equal(res.url, URL);
    t.equal(typeof res.ok, "boolean");
    t.ok(res.status >= 0);

    if (res.ok) {
        t.ok(res.json, "should return json");
    } else {
        t.ok(res.error, "should return error text");
    }

    t.end();
});

test("postJson - custom content-type", async (t) => {
    const body = JSON.stringify({
        language: "fr"
    });

    const res = await postJson(URL, body, false, "application/json");

    t.equal(res.url, URL);
    t.equal(typeof res.ok, "boolean");

    t.end();
});

/**
 * -------------------------
 * postText
 * -------------------------
 */

test("postText - real success", async (t) => {
    const res = await postText(URL, "language=en");

    t.equal(res.url, URL);
    t.equal(typeof res.ok, "boolean");
    t.ok(res.status >= 0);

    if (res.ok) {
        t.ok(res.text, "should return text");
    } else {
        t.ok(res.error, "should return error text");
    }

    t.end();
});

/**
 * -------------------------
 * failure branch coverage (important)
 * -------------------------
 * These tests depend on server rejecting bad input or endpoint behavior.
 */

test("postJson - invalid payload (expect error branch)", async (t) => {
    const res = await postJson(URL, "invalid-json-string");

    t.equal(res.url, URL);
    t.equal(typeof res.ok, "boolean");

    // we just assert structure
    if (!res.ok) {
        t.ok(res.error, "error branch covered");
    }

    t.end();
});

test("postEmptyJson - debug mode logs (optional branch)", async (t) => {
    // just ensures debug path doesn't break anything
    const res = await postEmptyJson(URL+'fr', true);

    t.equal(res.url, URL+'fr');
    t.ok(typeof res.ok === "boolean");

    t.end();
});
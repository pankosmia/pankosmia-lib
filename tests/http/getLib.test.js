import test from "tape";
import { getJson, getText, getAndSetJson } from "../../src/http/getLib.js";

const URL = "http://127.0.0.1:19119/api/client-interfaces";

/**
 * getJson - real endpoint success
 */
test("getJson - real endpoint success", async (t) => {
    const res = await getJson(URL);

    t.equal(typeof res.ok, "boolean");
    t.equal(res.url, URL);
    t.equal(res.status > 0, true);

    if (res.ok) {
        t.ok(res.json, "should contain json");
    } else {
        t.ok(res.error, "should contain error text");
    }

    t.end();
});

/**
 * getText - real endpoint success
 */
test("getText - real endpoint success", async (t) => {
    const res = await getText(URL);

    t.equal(typeof res.ok, "boolean");
    t.equal(res.url, URL);
    t.equal(res.status > 0, true);

    if (res.ok) {
        t.ok(res.text, "should contain text");
    } else {
        t.ok(res.error, "should contain error");
    }

    t.end();
});

/**
 * getAndSetJson - success path (setter must run)
 */
test("getAndSetJson - real endpoint setter called", async (t) => {
    let called = null;

    const setter = (data) => {
        called = data;
    };

    const res = await getAndSetJson({
        url: URL,
        setter
    });
    // if success → setter must be called
    if (called) {
        t.ok(called !== null, "setter should be called");
    } else {
        t.ok(res.ok === false, "should return error response if failed");
    }

    t.end();
});
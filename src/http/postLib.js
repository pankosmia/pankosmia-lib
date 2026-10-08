/**
 * Sends an HTTP POST request without a request body.
 *
 * The server response is expected to contain JSON.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {boolean} [debug=false] - If true, logs the request result to the console.
 *
 * @returns {Promise<PostEmptyResult>} The HTTP response result.
 *
 * @example
 * // POST /api/settings/languages/en
 * const result = await postEmpty(
 *   "http://127.0.0.1:19119/api/settings/languages/en"
 * );
 *
 * if (result.ok) {
 *   console.log(result.status);
 *   console.log(result.json);
 * } else {
 *   console.error(result.error);
 * }
 */
async function postEmpty(url, debug = false) {
  try {
    const response = await fetch(url, { method: "POST" });

    if (!response.ok) {
      const result = {
        url,
        ok: false,
        status: response.status,
        error: JSON.parse(await response.text()),
      };

      if (debug) {
        console.log("postEmpty", result);
      }

      return result;
    }

    const result = {
      url,
      ok: true,
      status: response.status,
      json: await response.json(),
    };

    if (debug) {
      console.log("postEmpty", result);
    }

    return result;
  } catch (err) {
    const result = {
      url,
      ok: false,
      status: 0,
      error: err.message,
    };

    if (debug) {
      console.log("postEmpty", result);
    }

    return result;
  }
}

/**
 * Sends an HTTP POST request with a JSON request body.
 *
 * The request body is sent using the specified Content-Type.
 * By default, the Content-Type is `application/json`.
 *
 * The server response is expected to contain JSON.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {string|object} body - The request body. When using an object,
 *   convert it to JSON with JSON.stringify() before passing it.
 * @param {boolean} [debug=false] - If true, logs the request result to the console.
 * @param {string} [contentType="application/json"] - The Content-Type
 *   header sent with the request.
 *
 * @returns {Promise<PostJsonResult>} The HTTP response result.
 *
 * @example
 * const body = JSON.stringify({
 *   payload: JSON.stringify({
 *     language: "en",
 *   }),
 * });
 *
 * const result = await postJson(
 *   "http://127.0.0.1:19119/api/burrito/ingredient/raw/_local_/_local_/plt?ipath=test.json",
 *   body
 * );
 *
 * if (result.ok) {
 *   console.log(result.json);
 * } else {
 *   console.error(result.error);
 * }
 *
 * @example
 * // Custom Content-Type
 * const result = await postJson(
 *   "https://example.com/api/data",
 *   JSON.stringify({ hello: "world" }),
 *   false,
 *   "application/custom+json"
 * );
 */
async function postJson(
  url,
  body,
  debug = false,
  contentType = "application/json",
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
    });

    if (!response.ok) {
      const result = {
        url,
        ok: false,
        status: response.status,
        error: JSON.parse(await response.text()),
      };

      if (debug) {
        console.log("postJson", result);
      }

      return result;
    }

    const result = {
      url,
      ok: true,
      status: response.status,
      json: await response.json(),
    };

    if (debug) {
      console.log("postJson", result);
    }

    return result;
  } catch (err) {
    const result = {
      url,
      ok: false,
      status: 0,
      error: err.message,
    };

    if (debug) {
      console.log("postJson", result);
    }

    return result;
  }
}

/**
 * Sends an HTTP POST request with a text request body.
 *
 * The request body is sent using the specified Content-Type.
 * By default, the Content-Type is `application/json`.
 *
 * Unlike {@link postJson}, the response body is returned as text.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {string} body - The text request body.
 * @param {boolean} [debug=false] - If true, logs the request result to the console.
 * @param {string} [contentType="application/json"] - The Content-Type
 *   header sent with the request.
 *
 * @returns {Promise<PostTextResult>} The HTTP response result.
 *
 * @example
 * const body = JSON.stringify({
 *   payload: "this is a test",
 * });
 *
 * const result = await postText(
 *   "http://127.0.0.1:19119/api/burrito/ingredient/raw/_local_/_local_/plt?ipath=textTest.usfm",
 *   body
 * );
 *
 * if (result.ok) {
 *   console.log(result.text);
 * } else {
 *   console.error(result.error);
 * }
 *
 * @example
 * // Sending plain text instead of JSON
 * const result = await postText(
 *   "https://example.com/api/text",
 *   "this is a test",
 *   false,
 *   "text/plain"
 * );
 */
async function postText(
  url,
  body,
  debug = false,
  contentType = "application/json",
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
    });

    if (!response.ok) {
      const result = {
        url,
        ok: false,
        status: response.status,
        error: JSON.parse(await response.text()),
      };

      if (debug) {
        console.log("postText", result);
      }

      return result;
    }

    const result = {
      url,
      ok: true,
      status: response.status,
      text: await response.text(),
    };

    if (debug) {
      console.log("postText", result);
    }

    return result;
  } catch (err) {
    const result = {
      url,
      ok: false,
      status: 0,
      error: err.message,
    };

    if (debug) {
      console.log("postText", result);
    }

    return result;
  }
}

/**
 * Sends an HTTP POST request containing binary data or multipart FormData.
 *
 * When using FormData, the Content-Type header is intentionally not set
 * manually. The browser/runtime automatically creates the required
 * multipart boundary.
 *
 * This is useful for uploading files or binary content to an API.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {BodyInit} body - The request body. This can be FormData,
 *   Uint8Array, ArrayBuffer, Blob, or another valid fetch BodyInit.
 * @param {boolean} [debug=false] - If true, logs the request result to the console.
 * @param {string|null} [contentType=null] - Optional Content-Type.
 *   This is ignored when `body` is a FormData instance.
 *
 * @returns {Promise<PostBytesResult>} The HTTP response result.
 *
 * @example
 * // Upload a file using multipart/form-data.
 * const form = new FormData();
 *
 * form.append(
 *   "file",
 *   new Blob(["this is a test"], {
 *     type: "application/octet-stream",
 *   }),
 *   "bytesTest.usfm"
 * );
 *
 * const result = await postBytes(
 *   "http://127.0.0.1:19119/api/burrito/ingredient/bytes/_local_/_local_/plt?ipath=bytesTest.usfm",
 *   form
 * );
 *
 * if (result.ok) {
 *   console.log(result.text);
 * } else {
 *   console.error(result.error);
 * }
 *
 * @example
 * // Send raw binary data.
 * const body = new TextEncoder().encode("this is a test");
 *
 * const result = await postBytes(
 *   "https://example.com/api/upload",
 *   body,
 *   true,
 *   "application/octet-stream"
 * );
 */
async function postBytes(url, body, debug = false, contentType = null) {
  try {
    const headers = {};

    if (!(body instanceof FormData) && contentType) {
      headers["Content-Type"] = contentType;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      const result = {
        url,
        ok: false,
        status: response.status,
        error: JSON.parse(await response.text()),
      };

      if (debug) {
        console.log("postBytes", result);
      }

      return result;
    }

    const result = {
      url,
      ok: true,
      status: response.status,
      text: await response.text(),
    };

    if (debug) {
      console.log("postBytes", result);
    }

    return result;
  } catch (err) {
    const result = {
      url,
      ok: false,
      status: 0,
      error: err.message,
    };

    if (debug) {
      console.log("postBytes", result);
    }

    return result;
  }
}

export {
  postEmpty,
  postJson,
  postText,
  postBytes,
};


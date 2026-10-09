/**
 * @typedef {Object} GetSuccess
 * @property {string} url - The requested URL.
 * @property {true} ok - Indicates that the request succeeded.
 * @property {number} status - The HTTP response status code.
 */

/**
 * @typedef {GetSuccess & {
 *   json: any
 * }} GetJsonResult
 *
 * @typedef {GetSuccess & {
 *   text: string
 * }} GetTextResult
 *
 * @typedef {GetSuccess & {
 *   bytes: ArrayBuffer
 * }} GetBytesResult
 *
 * @typedef {Object} GetError
 * @property {string} url - The requested URL.
 * @property {false} ok - Indicates that the request failed.
 * @property {number} status - The HTTP status code, or 0 when the request
 *   failed before receiving an HTTP response.
 * @property {any|string} error - The server error or JavaScript error message.
 */

/**
 * Performs an HTTP GET request and parses the response as JSON.
 *
 * Use this function when the API endpoint returns a JSON response.
 *
 * @param {string} url - The URL to request.
 * @param {boolean} [debug=false] - If true, logs the result to the console.
 *
 * @returns {Promise<GetJsonResult|GetError>} The HTTP response result.
 *
 * @example
 * const result = await getJson(
 *   "http://127.0.0.1:19119/api/settings/languages/en"
 * );
 *
 * if (result.ok) {
 *   console.log(result.status);
 *   console.log(result.json);
 * } else {
 *   console.error(result.error);
 * }
 *
 * @example
 * // Enable debug logging.
 * const result = await getJson(
 *   "https://example.com/api/settings",
 *   true
 * );
 */
async function getJson(url, debug = false) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const result = {
        url,
        ok: false,
        status: response.status,
        error: JSON.parse(await response.text()),
      };

      if (debug) {
        console.log("getJson", result);
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
      console.log("getJson", result);
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
      console.log("getJson", result);
    }

    return result;
  }
}

/**
 * Performs an HTTP GET request and returns the response body as text.
 *
 * Use this function when the API endpoint returns plain text, source text,
 * configuration text, USFM, XML, HTML, or another text-based response.
 *
 * @param {string} url - The URL to request.
 * @param {boolean} [debug=false] - If true, logs the result to the console.
 *
 * @returns {Promise<GetTextResult|GetError>} The HTTP response result.
 *
 * @example
 * const result = await getText(
 *   "http://127.0.0.1:19119/api/burrito/ingredient/raw/_local_/_local_/plt?ipath=test.usfm"
 * );
 *
 * if (result.ok) {
 *   console.log(result.text);
 * } else {
 *   console.error(result.error);
 * }
 *
 * @example
 * // Enable debug logging.
 * const result = await getText(
 *   "https://example.com/api/content",
 *   true
 * );
 */
async function getText(url, debug = false) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const result = {
        url,
        ok: false,
        status: response.status,
        error: JSON.parse(await response.text()),
      };

      if (debug) {
        console.log("getText", result);
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
      console.log("getText", result);
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
      console.log("getText", result);
    }

    return result;
  }
}

/**
 * Performs an HTTP GET request and returns the response body as binary data.
 *
 * The response is returned as an ArrayBuffer, which can be converted to
 * a Uint8Array when byte-level access is required.
 *
 * @param {string} url - The URL to request.
 * @param {boolean} [debug=false] - If true, logs the result to the console.
 *
 * @returns {Promise<GetBytesResult|GetError>} The HTTP response result.
 *
 * @example
 * const result = await getBytes(
 *   "http://127.0.0.1:19119/api/burrito/ingredient/bytes/_local_/_local_/plt?ipath=test.usfm"
 * );
 *
 * if (result.ok) {
 *   const bytes = new Uint8Array(result.bytes);
 *
 *   console.log(bytes);
 * } else {
 *   console.error(result.error);
 * }
 *
 * @example
 * // Enable debug logging.
 * const result = await getBytes(
 *   "https://example.com/api/file",
 *   true
 * );
 */
async function getBytes(url, debug = false) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const result = {
        url,
        ok: false,
        status: response.status,
        error: JSON.parse(await response.text()),
      };

      if (debug) {
        console.log("getBytes", result);
      }

      return result;
    }

    const result = {
      url,
      ok: true,
      status: response.status,
      bytes: await response.arrayBuffer(),
    };

    if (debug) {
      console.log("getBytes", result);
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
      console.log("getBytes", result);
    }

    return result;
  }
}

/**
 * Performs a GET request for JSON and passes the resulting JSON value
 * to a setter function when the request succeeds.
 *
 * This is a convenience wrapper around {@link getJson}.
 *
 * If the request fails, the error response is returned instead of calling
 * the setter.
 *
 * @param {Object} options - Function options.
 * @param {string} options.url - The URL to request.
 * @param {(json: any) => void} options.setter - Function that receives
 *   the parsed JSON response.
 * @param {boolean} [options.debug=false] - If true, logs the request result.
 *
 * @returns {Promise<GetError|undefined>} The error response when the request
 *   fails, otherwise undefined.
 *
 * @example
 * let languages;
 *
 * const result = await getAndSetJson({
 *   url: "http://127.0.0.1:19119/api/settings/languages/en",
 *   setter: (json) => {
 *     languages = json;
 *   },
 * });
 *
 * if (result) {
 *   console.error(result.error);
 * }
 *
 * @example
 * // Using a framework state setter.
 * await getAndSetJson({
 *   url: "https://example.com/api/settings",
 *   setter: setSettings,
 * });
 *
 * @example
 * // Enable debug logging.
 * await getAndSetJson({
 *   url: "https://example.com/api/settings",
 *   setter: (json) => {
 *     console.log("Received:", json);
 *   },
 *   debug: true,
 * });
 */
const getAndSetJson = async ({ url, setter, debug = false }) => {
  const response = await getJson(url, debug);

  if (response.ok) {
    setter(response.json);
  } else {
    return response;
  }
};

export {
  getJson,
  getAndSetJson,
  getText,
  getBytes,
};

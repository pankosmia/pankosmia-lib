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
export { postEmpty, postJson, postText, postBytes };

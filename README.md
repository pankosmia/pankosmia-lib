# pankosmia-lib

A utility library for the Pankosmia ecosystem.

## Modules

The library is divided into multiple modules:

- **`http`** — Functions for communicating with a Pankosmia server through HTTP requests (GET/POST).
- **`i18n`** — Internationalization utilities, mainly the `do18n` function.
- **`usfm`** — Utility functions for working with USFM.

Each module can be imported independently:

```ts
import { ... } from "pankosmia-lib/http"
import { ... } from "pankosmia-lib/i18n"
import { ... } from "pankosmia-lib/usfm"
```

## Installation

```bash
pnpm add pankosmia-lib
```

## Testing

Tests require a running Pankosmia server.

Once the server is running, execute:

```bash
pnpm run test
```
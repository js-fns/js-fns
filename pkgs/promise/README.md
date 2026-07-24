# @js-fns/promise

Tiny JS promise utilities collection, such as [`promiseQueue`](#promisequeue), [`resettablePromise`](#resettablepromise) and [many more](#usage).

Think of it as _Lodash for promises_. It is fully type-safe, tree-shakable, lightweight and has no dependencies. The smallest bundle size you can get is just `111 B`.

It features dual CJS/ESM support and built-in TypeScript definitions.

## Installation

The package is available as a standalone npm package:

```sh
npm install @js-fns/promise
```

It is also available as a part of the `js-fns` collection:

```sh
npm install js-fns
```

## Usage

@js-fns/promise provides the following utilities:

- [`flatPromise`](#flatpromise) — A promise with `resolve` and `reject` as object properties.
- [`resettablePromise`](#resettablepromise) — A reusable promise that can be returned to the pending state and resolved/rejected again.
- [`timeoutPromise`](#timeoutpromise) — `setTimeout` as a promise.
- [`promiseQueue`](#promisequeue) — Runs promise-returning functions with limited concurrency.

### `flatPromise`

The `flatPromise` function returns a promise together with its `resolve` and `reject` functions.

Use it when something is constructed first and initialized later — for example, a custom element that exposes a ready promise before `connectedCallback` finishes:

```ts
import { flatPromise } from "@js-fns/promise"; // Or "js-fns/promise"
import { createEditor } from "./editor.ts

class EditorElement extends HTMLElement {
  // Create the promise when the element is constructed:
  #editor = flatPromise<Editor>();

  connectedCallback() {
    // Resolve the promise when the editor is created:
    createEditor(this).then(
      (editor) => this.#editor.resolve(editor),
      (error) => this.#editor.reject(error),
    );
  }

  async code(): Promise<string> {
    // Wait for the editor to be created:
    const editor = await this.#editor.promise;

    // Use it when ready:
    return editor.code;
  }
}
```

### `resettablePromise`

The `resettablePromise` function returns a reusable promise-like object. Its `promise` is a live handle: awaiting it always reflects the current round, so many consumers can read the latest result while it's recomputed over and over.

Call `reset` before each new round so anyone awaiting after it starts waits for the fresh result instead of the previous one:

```ts
import { resettablePromise } from "@js-fns/promise"; // Or "js-fns/promise"

const compiled = resettablePromise<CompiledResult>();

// Runs again on every edit:
async function compile(code: string) {
  // Back to pending, so current readers wait for this run:
  compiled.reset();

  try {
    compiled.resolve(await runCompile(code));
  } catch (error) {
    compiled.reject(error);
  }
}

// Any consumer, at any time, gets the latest compilation:
async function openFile(path: string) {
  const result = await compiled.promise;
  return result.files[path];
}
```

### `timeoutPromise`

The `timeoutPromise` function returns a promise that resolves after the given delay in milliseconds. The delay defaults to `0`:

```ts
import { timeoutPromise } from "@js-fns/promise"; // Or "js-fns/promise"

await timeoutPromise(1000);
// Resolves after 1s

await timeoutPromise();
// Postpones to the next event loop (0ms)
```

### `promiseQueue`

The `promiseQueue` function runs an array of promise-returning functions, keeping at most `max` of them in flight at a time. It resolves with the results in the input order, which makes it handy for throttling I/O-heavy work like processing many files:

```ts
import { promiseQueue } from "@js-fns/promise"; // Or "js-fns/promise"
import { cpus } from "node:os";

const results = await promiseQueue(
  paths.map((path) => () => processFile(path)),
  cpus().length,
);
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)

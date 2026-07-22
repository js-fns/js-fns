# @js-fns/canon

Tiny JS values canonicalization for hashing.

It uses a simple serialization algorithm, generating a consistent string representation of JS values. It is built to use with [Smol xxHash](https://github.com/kossnocorp/smolxxh).

It is tiny, efficient, just `185B` and faster than other stable serialization libraries.

Unlike alternatives, it is focused on hashing and doesn't produce valid JSON, making it more efficient, and also supports more value types, i.e., `undefined`.

It features dual CJS/ESM support and built-in TypeScript definitions.

## Installation

The package is available as a standalone npm package:

```sh
npm install @js-fns/canon
```

It is also available as a part of the `js-fns` collection:

```sh
npm install js-fns
```

## Usage

Pass any JS value to the `canonize` function to get its string representation:

```ts
import { canonize } from "@js-fns/canon"; // Or "js-fns/canon"

const canon = canonize({ foo: "bar", baz: "qux" });
// => '{foo:"bar";baz:"qux"}'
```

You can use it with [Smol xxHash](https://github.com/kossnocorp/smolxxh) to produce consistent hashes for your data:

```ts
import { canonize } from "@js-fns/canon"; // Or "js-fns/canon"
import { xxh32 } from "smolxxh";

const canon = canonize({ foo: "bar", baz: "qux" });
const hash = xxh32(Buffer.from(canon, "utf8")).toString(16);
//=> "ed4e5029"
```

## Benchmark

[The benchmark](./_bench.pkg/bench.ts) shows that js-fns/canon is significantly faster than other popular libraries for canonicalizing JavaScript values:

```
canonize:
┌─────────┬────────────────────────────────┬───────────────┐
│ (index) │ Package                        │ ops/s         │
├─────────┼────────────────────────────────┼───────────────┤
│ 1       │ '@js-fns/canon'                │ '10,829 ± 23' │
│ 2       │ 'safe-stable-stringify'        │ '9,492 ± 20'  │
│ 3       │ 'json-canon'                   │ '9,061 ± 20'  │
│ 4       │ 'fast-safe-stringify'          │ '7,246 ± 18'  │
│ 5       │ 'fast-stable-stringify'        │ '7,083 ± 16'  │
│ 6       │ 'fast-json-stable-stringify'   │ '6,395 ± 20'  │
│ 7       │ 'json-stable-stringify'        │ '4,673 ± 11'  │
│ 8       │ 'canonicalize'                 │ '4,401 ± 14'  │
│ 9       │ 'json-stringify-deterministic' │ '4,026 ± 11'  │
└─────────┴────────────────────────────────┴───────────────┘
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)

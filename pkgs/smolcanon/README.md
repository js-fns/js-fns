# Smol Canon

Tiny JS values canonicalization for hashing.

It uses a simple serialization algorithm, generating a consistent string representation of JS values. It is built to use with [Smol xxHash](https://github.com/kossnocorp/smolxxh).

It is tiny and efficient. It is just `185B` and 30%+ faster than other stable serialization libraries.

Unlike alternatives, it is focused on hashing and doesn't produce valid JSON, making it more efficient, and also supports more value types, i.e., `undefined`.

It features dual CJS/ESM support and built-in TypeScript definitions.

## Installation

The package is available on npm:

```sh
npm install smolcanon
```

## Usage

Pass any JS value to the `canonize` function to get its string representation:

```ts
import { canonize } from "smolcanon";

const canon = canonize({ foo: "bar", baz: "qux" });
// => '{foo:"bar";baz:"qux"}'
```

You can use it with [Smol xxHash](https://github.com/kossnocorp/smolxxh) to produce consistent hashes for your data:

```ts
import { canonize } from "smolcanon";
import { xxh32 } from "smolxxh";

const canon = canonize({ foo: "bar", baz: "qux" });
const hash = xxh32(Buffer.from(canon, "utf8")).toString(16);
//=> "ed4e5029"
```

## Benchmark

[The benchmark](./benchmark/benchmark.ts) shows that Smol Canon is significantly faster than other popular libraries for canonicalizing JavaScript values:

```
canonicalize:
  4 197 ops/s, ±0.28%   | 43.59% slower

json-canon:
  5 171 ops/s, ±2.11%   | 30.5% slower

fast-json-stable-stringify:
  4 548 ops/s, ±2.32%   | 38.87% slower

fast-safe-stringify:
  5 310 ops/s, ±2.30%   | 28.63% slower

fast-stable-stringify:
  4 973 ops/s, ±1.56%   | 33.16% slower

json-stable-stringify:
  3 648 ops/s, ±1.93%   | 50.97% slower

json-stringify-deterministic:
  3 054 ops/s, ±1.80%   | slowest, 58.95% slower

safe-stable-stringify:
  5 345 ops/s, ±2.17%   | 28.16% slower

smolcanon:
  7 440 ops/s, ±1.68%   | fastest
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)

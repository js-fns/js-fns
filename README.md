# Smol Canon

Tiny JS values canonicalization for hashing.

It uses a simple serialization algorithm, generating a consistent string representation of JS values. It is built to use with [Smol xxHash](https://github.com/kossnocorp/smolxxh).

It is tiny and efficient. It is just `164B` and faster than other stable serialization libraries. Unlike alternatives, it is focused on hashing and doesn't produce valid JSON, making it more efficient, and also supports more value types, i.e., `undefined`.

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
const hash = xxh32(Buffer.from("hello world", "utf8")).toString(16);
//=> "ed4e5029"
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)

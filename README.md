# Smol xxHash

Tiny [xxHash](https://xxhash.com/) JS implementation.

Smol xxHash is a modern, faster, and smaller alternative to the [xxhashjs](https://www.npmjs.com/package/xxhashjs) package. It is 3.8x faster than it, and `xxh32` and `xxh64` are just `366B` and `475B`, respectively.

It is only 1.8x slower than the [xxhash-wasm](https://www.npmjs.com/package/xxhash-wasm) package that is `3 KB` and requires WebAssembly support.

The package features dual CJS/ESM support and built-in TypeScript definitions.

Implementation is a port of a reference C implementation ([`xxhash32-ref.c`](https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash32-ref.c) and [`xxhash64-ref.c`](https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash64-ref.c)).

## Installation

The package is available on npm:

```sh
npm install smolxxh
```

## Usage

Pass `Buffer` or `Uint8Array` to the `xxh32`/`xxh64` function to get the hash of the content:

```ts
import { xxh32, xxh64 } from "smolxxh";

xxh32(Buffer.from("hello world", "utf8")).toString(16);
// => "cebb6622"

xxh64(Buffer.from("hello world", "utf8")).toString(16);
// => "45ab6734b21e6968"
```

### JS Object Hashing

To consistently hash JS objects, you need to canonize them first.

I recommend using [Smol Canon](https://github.com/kossnocorp/smolcanon) (from the same Smol family) for this purpose:

```ts
import { canonize } from "smolcanon";
import { xxh32 } from "smolxxh";

const canon = canonize({ foo: "bar", baz: "qux" });
const hash = xxh32(Buffer.from(canon, "utf8")).toString(16);
//=> "ed4e5029"
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)

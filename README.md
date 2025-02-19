# Smol xxHash

Tiny [xxHash](https://xxhash.com/) JS implementation.

It is a modern, faster and smaller alternative to [xxhashjs](https://www.npmjs.com/package/xxhashjs) package. It is 3.8x faster and fits in just `381B`.

It is just 1.8x slower than [xxhash-wasm](https://www.npmjs.com/package/xxhash-wasm) package.

It features dual CJS/ESM support and built-in TypeScript definitions.

It is based on [a reference C implementation](https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash32-ref.c)

## Installation

The package is available on npm:

```sh
npm install smolxxh
```

## Usage

Pass `Buffer` or `Uint8Array` to `xxh32` function to get the hash of the content:

```ts
import { xxh32 } from "smolxxh";

xxh32(Buffer.from("hello world", "utf8")).toString(16);
// => 0x31b7405d
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)

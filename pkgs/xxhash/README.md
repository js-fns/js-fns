# @js-fns/xxhash

Tiny [xxHash](https://xxhash.com/) implementation for JavaScript.

It provides portable XXH32 and XXH64 functions that accept `Uint8Array`, including Node.js `Buffer`, plus helpers for hashing strings and canonicalized JavaScript values.

The implementation is based on the reference C implementations [`xxhash32-ref.c`](https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash32-ref.c) and [`xxhash64-ref.c`](https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash64-ref.c).

## Installation

The package is available as a standalone npm package:

```sh
npm install @js-fns/xxhash
```

It is also available as a part of the `js-fns` collection:

```sh
npm install js-fns
```

## Usage

Pass a `Uint8Array` to `xxh32` or `xxh64` to get its hash:

```ts
import { xxh32, xxh64 } from "@js-fns/xxhash"; // Or "js-fns/xxhash"

const input = new TextEncoder().encode("hello world");

xxh32(input).toString(16);
//=> "cebb6622"

xxh64(input).toString(16);
//=> "45ab6734b21e6968"
```

Node.js `Buffer` is a `Uint8Array` and can be passed directly.

### String Hashing

The Node.js string helpers accept string-like values and the encodings supported by `Buffer.from`:

```ts
import { xxh32Str, xxh64Str } from "@js-fns/xxhash/str";
// Or "js-fns/xxhash/str"

xxh32Str("hello world");
//=> "cebb6622"

xxh64Str("hello world");
//=> "45ab6734b21e6968"

xxh32Str("cafebabe", "hex");
//=> "408e9853"
```

Both helpers infer their return type, allowing a branded string type to be supplied contextually or explicitly:

```ts
type UserHash = string & { readonly userHash: unique symbol };

const userHash: UserHash = xxh32Str("user");
const explicitHash = xxh64Str<UserHash>("user");
```

### Value Hashing

The `xxh32Any` and `xxh64Any` helpers canonicalize values with [`@js-fns/canon`](../canon) before hashing them:

```ts
import { xxh32Any, xxh64Any } from "@js-fns/xxhash/any";
// Or "js-fns/xxhash/any"

xxh32Any({ foo: "bar", baz: "qux" });
//=> "ed4e5029"
xxh32Any({ baz: "qux", foo: "bar" });
//=> "ed4e5029"

xxh64Any([1, 2, 3]);
//=> "bba91612761944c5"
```

When using the standalone package, install the optional canon peer dependency:

```sh
npm install @js-fns/xxhash @js-fns/canon
```

The `js-fns` collection already includes canon.

## Benchmark

[The benchmark](./_bench.pkg/bench.ts) compares XXH32 and XXH64 with `xxhashjs` and `xxhash-wasm` across small and large inputs:

```sh
mise bench
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)

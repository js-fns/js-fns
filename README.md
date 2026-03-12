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

### Basics

Pass `Buffer` or `Uint8Array` to the `xxh32`/`xxh64` function to get the hash of the content:

```ts
import { xxh32, xxh64 } from "smolxxh";

xxh32(Buffer.from("hello world", "utf8")).toString(16);
// => "cebb6622"

xxh64(Buffer.from("hello world", "utf8")).toString(16);
// => "45ab6734b21e6968"
```

### Helpers

Smol xxHash comes with a set of helper functions helping to reduce boilerplate when hashing strings and JS values.

- [String hashing with `xxh32Str` and `xxh64Str`](#string-hashing)
- [Any JS value hashing with `xxh32Any` and `xxh64Any`](#any-js-value-hashing)

#### String Hashing

To quickly hash string values, you can use the `xxh32Str` and `xxh64Str` helpers:

```ts
import { xxh32Str, xxh64Str } from "smolxxh/str";

xxh32Str("hello world");
// => "cebb6622"

xxh64Str("hello world");
// => "45ab6734b21e6968"
```

It supports any string as well as objects implementing `toString` and `[Symbol.toPrimitive](hint: "string")` methods.

You also can pass encoding as the second argument, which defaults to `utf8`:

```ts
xxh32Str("cafebabe", "hex");
// => "408e9853"

xxh32Str("cafebabe");
// => "f6a25a07"
```

Both `xxh32Str` and `xxh64Str` infer the return type, so you can use it with branded strings without explicitly casting the result:

```ts
type UserHash = string & { [userHashBrand]: true };
declare const userHashBrand: unique symbol;

// No type error!
const userHash: UserHash = xxh32Str(user);

// Can pass the generic type parameter too:
callback(xxh32Str<UserHash>(user));
```

#### Any JS Value Hashing

To consistently hash any JS value, including objects, they must be canonized first.

Smol xxHash comes with `xxh32Any` and `xxh64Any` helpers that utilize the [Smol Canon](https://github.com/kossnocorp/smolcanon) package to canonize the value before hashing it:

```ts
import { xxh32Any, xxh64Any } from "smolxxh/any";

// Objects get canonized, so order doesn't matter:
xxh32Any({ foo: "bar", baz: "qux" });
//=> "ed4e5029"
xxh32Any({ baz: "qux", foo: "bar" });
//=> "ed4e5029"

// Any JS value can be hashed
xxh64Any([1, 2, 3]);
//=> "bba91612761944c5"
xxh64Any(undefined);
//=> "6aeed7835f4984a3"
xxh64Any(null);
//=> "3ec9e10063179f3a"
xxh64Any(NaN);
//=> "bada388f33705db6"
```

Both `xxh32Any` and `xxh64Any` infer the return type, so you can use it with branded strings without explicitly casting the result:

```ts
type UserHash = string & { [userHashBrand]: true };
declare const userHashBrand: unique symbol;

// No type error!
const userHash: UserHash = xxh32Any(user);

// Can pass the generic type parameter too:
callback(xxh64Any<UserHash>(user));
```

To use the `xxh32Any` and `xxh64Any` helpers, you need to have the `smolcanon` package installed in your project, as they depend on it for canonization:

```bash
npm install smolcanon
```

## Changelog

See [the changelog](./CHANGELOG.md).

## License

[MIT © Sasha Koss](https://koss.nocorp.me/mit/)

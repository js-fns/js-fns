import { describe, expect, it } from "vitest";
import { xxh64Str } from "../str/xxh64Str.js";
import { xxh64Any } from "./xxh64Any.js";

describe("xxh64Any", () => {
  it("hashes objects", () => {
    expect(xxh64Any({ foo: "bar", baz: "qux" })).toBe("b4d53e85c078086a");
    expect(xxh64Any({ baz: "qux", foo: "bar" })).toBe("b4d53e85c078086a");
    expect(xxh64Any([1, 2, 3])).toBe("bba91612761944c5");
  });

  it("hashes stringifiable values", () => {
    expect(xxh64Any("hello world")).toBe(xxh64Str('"hello world"'));
    expect(xxh64Any(123)).toBe(xxh64Str("123"));
    expect(xxh64Any(12.3)).toBe(xxh64Str("12.3"));
    expect(xxh64Any(true)).toBe(xxh64Str("true"));
    expect(xxh64Any(false)).toBe(xxh64Str("false"));
    expect(xxh64Any(null)).toBe(xxh64Str("null"));
    expect(xxh64Any(undefined)).toBe(xxh64Str("undefined"));
    expect(xxh64Any(NaN)).toBe(xxh64Str("NaN"));
    expect(xxh64Any(Infinity)).toBe(xxh64Str("Infinity"));
    expect(xxh64Any(-Infinity)).toBe(xxh64Str("-Infinity"));
    expect(xxh64Any(0)).toBe(xxh64Str("0"));
    expect(xxh64Any(-0)).toBe(xxh64Str("-0"));
  });

  it("allows to infer return type as a branded string", () => {
    type Branded = string & { __brand: "xxh64" };
    const _hash: Branded = xxh64Any("hello world");

    const _obj: Record<string, Branded> = {
      hello: xxh64Any("hello world"),
    };

    const fn = (_input: Branded) => {};
    fn(xxh64Any("hello world"));
  });
});

import { describe, expect, it } from "vitest";
import { xxh32Str } from "../str/xxh32Str.js";
import { xxh32Any } from "./xxh32Any.js";

describe("xxh32Any", () => {
  it("hashes objects", () => {
    expect(xxh32Any({ foo: "bar", baz: "qux" })).toBe("ed4e5029");
    expect(xxh32Any({ baz: "qux", foo: "bar" })).toBe("ed4e5029");
    expect(xxh32Any([1, 2, 3])).toBe("82722f1f");
  });

  it("hashes stringifiable values", () => {
    expect(xxh32Any("hello world")).toBe(xxh32Str('"hello world"'));
    expect(xxh32Any(123)).toBe(xxh32Str("123"));
    expect(xxh32Any(12.3)).toBe(xxh32Str("12.3"));
    expect(xxh32Any(true)).toBe(xxh32Str("true"));
    expect(xxh32Any(false)).toBe(xxh32Str("false"));
    expect(xxh32Any(null)).toBe(xxh32Str("null"));
    expect(xxh32Any(undefined)).toBe(xxh32Str("undefined"));
    expect(xxh32Any(NaN)).toBe(xxh32Str("NaN"));
    expect(xxh32Any(Infinity)).toBe(xxh32Str("Infinity"));
    expect(xxh32Any(-Infinity)).toBe(xxh32Str("-Infinity"));
    expect(xxh32Any(0)).toBe(xxh32Str("0"));
    expect(xxh32Any(-0)).toBe(xxh32Str("-0"));
  });

  it("allows to infer return type as a branded string", () => {
    type Branded = string & { __brand: "xxh32" };
    const _hash: Branded = xxh32Any("hello world");

    const _obj: Record<string, Branded> = {
      hello: xxh32Any("hello world"),
    };

    const fn = (_input: Branded) => {};
    fn(xxh32Any("hello world"));
  });
});

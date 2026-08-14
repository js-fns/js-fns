import { describe, expect, it } from "vitest";
import { xxh64Str } from "./xxh64Str.js";

describe("xxh64Str", () => {
  it("hashes strings", () => {
    expect(xxh64Str("hello world")).toBe("45ab6734b21e6968");
  });

  it("hashes stringifiable values", () => {
    expect(xxh64Str(new String("hello world"))).toBe("45ab6734b21e6968");
    expect(
      xxh64Str({
        [Symbol.toPrimitive]: () => "hello world",
      }),
    ).toBe("45ab6734b21e6968");
    expect(xxh64Str({ valueOf: () => "hello world" })).toBe("45ab6734b21e6968");
  });

  it("accepts encoding as the second argument", () => {
    expect(xxh64Str("cafebabe", "hex")).toBe("28140923537eaba8");
    expect(xxh64Str("cafebabe", "hex")).not.toBe(xxh64Str("cafebabe"));
  });

  it("allows to infer return type as a branded string", () => {
    type Branded = string & { __brand: "xxh64" };
    const _hash: Branded = xxh64Str("hello world");
  });
});

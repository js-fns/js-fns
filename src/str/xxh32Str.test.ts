import { describe, expect, it } from "vitest";
import { xxh32Str } from "./xxh32Str.js";

describe("xxh32Str", () => {
  it("hashes strings", () => {
    expect(xxh32Str("hello world")).toBe("cebb6622");
  });

  it("hashes stringifiable values", () => {
    expect(xxh32Str(new String("hello world"))).toBe("cebb6622");
    expect(
      xxh32Str({
        [Symbol.toPrimitive]: () => "hello world",
      }),
    ).toBe("cebb6622");
    expect(xxh32Str({ valueOf: () => "hello world" })).toBe("cebb6622");
  });

  it("accepts encoding as the second argument", () => {
    expect(xxh32Str("cafebabe", "hex")).toBe("408e9853");
    expect(xxh32Str("cafebabe", "hex")).not.toBe(xxh32Str("cafebabe"));
  });
});

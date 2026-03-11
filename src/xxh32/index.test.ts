import { describe, expect, it } from "vitest";
import { xxh32 } from "./index.js";

describe("xxh32", () => {
  it("reference tests", () => {
    // Tests based on a reference C implementation:
    // https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash32-ref.c#L152-L198

    const magicPrime = 0x9e3779b1;
    const size = 101;
    const data = Buffer.alloc(size);
    let byteGen = magicPrime;
    for (let i = 0; i < size; i++) {
      data[i] = (byteGen >>> 24) & 0xff;
      byteGen = Math.imul(byteGen, byteGen) >>> 0;
    }

    expect(xxh32(data.subarray(0, 1), 0)).toBe(0xb85cbee5);
    expect(xxh32(data.subarray(0, 1), magicPrime)).toBe(0xd5845d64);
    expect(xxh32(data.subarray(0, 14), 0)).toBe(0xe5aa0ab4);
    expect(xxh32(data.subarray(0, 14), magicPrime)).toBe(0x4481951d);
    expect(xxh32(data, 0)).toBe(0x1f1aa412);
    expect(xxh32(data, magicPrime)).toBe(0x498ec8e2);
  });
});

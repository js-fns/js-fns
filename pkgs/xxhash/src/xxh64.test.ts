import { describe, expect, it } from "vitest";
import { xxh64 } from "./xxh64.js";

describe("xxh64", () => {
  it("reference tests", () => {
    // Tests based on a reference C implementation:
    // https://github.com/easyaspi314/xxhash-clean/blob/86a04ab3f01277049a23f6c9e2c4a6c174ff50c4/xxhash64-ref.c#L216-L272

    const magicPrime = 0x9e3779b1n;
    const size = 101;
    const data = Buffer.alloc(size);
    let byteGen = Number(magicPrime);
    for (let i = 0; i < size; i++) {
      data[i] = (byteGen >>> 24) & 0xff;
      byteGen = Math.imul(byteGen, byteGen) >>> 0;
    }

    expect(xxh64(data.subarray(0, 0), 0n)).toBe(0xef46db3751d8e999n);
    expect(xxh64(data.subarray(0, 0), magicPrime)).toBe(0xac75fda2929b17efn);
    expect(xxh64(data.subarray(0, 1), 0n)).toBe(0x4fce394cc88952d8n);
    expect(xxh64(data.subarray(0, 1), magicPrime)).toBe(0x739840cb819fa723n);
    expect(xxh64(data.subarray(0, 14), 0n)).toBe(0xcffa8db881bc3a3dn);
    expect(xxh64(data.subarray(0, 14), magicPrime)).toBe(0x5b9611585efcc9cbn);
    expect(xxh64(data, 0n)).toBe(0x0eab543384f878adn);
    expect(xxh64(data, magicPrime)).toBe(0xcaa65939306f1e21n);
  });
});

import b from "benny";
import loadXxhashWasm from "xxhash-wasm";
import xxhashjs from "xxhashjs";
import { xxh32 } from "./src/index.js";

const xxhashWasm = await loadXxhashWasm();

const data = genData(101);

await b.suite(
  "XXH32",

  b.add("xxhashjs", () => {
    xxhashjs.h32(data, 0);
  }),

  b.add("xxhash-wasm", async () => {
    xxhashWasm.h32Raw(data, 0);
  }),

  b.add("smolxxh", () => {
    xxh32(data, 0);
  }),

  b.cycle(),
  b.complete(),
);

function genData(size: number) {
  const data = Buffer.alloc(size);
  let byteGen = 0x9e3779b1;
  for (let i = 0; i < size; i++) {
    data[i] = (byteGen >>> 24) & 0xff;
    byteGen = Math.imul(byteGen, byteGen) >>> 0;
  }
  return data;
}

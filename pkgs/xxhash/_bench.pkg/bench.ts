import { xxh32, xxh64 } from "@js-fns/xxhash";
import { Bench } from "tinybench";
import loadXxhashWasm from "xxhash-wasm";
import xxhashjs from "xxhashjs";

const xxhashWasm = await loadXxhashWasm();

for (const size of [16, 101, 65_536]) {
  const data = generateData(size);
  const buffer = Buffer.from(data.buffer, data.byteOffset, data.byteLength);

  const xxh32Bench = new Bench({ name: `XXH32 (${size} bytes)` });
  xxh32Bench
    .add("xxhashjs", () => xxhashjs.h32(buffer, 0))
    .add("xxhash-wasm", () => xxhashWasm.h32Raw(data, 0))
    .add("@js-fns/xxhash", () => xxh32(data, 0));
  await runBench(xxh32Bench);

  const xxh64Bench = new Bench({ name: `XXH64 (${size} bytes)` });
  xxh64Bench
    .add("xxhashjs", () => xxhashjs.h64(buffer, 0))
    .add("xxhash-wasm", () => xxhashWasm.h64Raw(data, 0n))
    .add("@js-fns/xxhash", () => xxh64(data, 0n));
  await runBench(xxh64Bench);
}

async function runBench(bench: Bench) {
  await bench.run();
  console.log(`${bench.name}:`);

  if (process.env.DEBUG) {
    console.table(bench.table());
    return;
  }

  const rows = Object.fromEntries(
    bench.results
      .map((result, index) => {
        const task = bench.tasks[index];
        if (!task || result.state !== "completed") {
          return { Package: task?.name ?? "???", mean: 0, moe: 0 };
        }

        return {
          Package: task.name,
          mean: Math.round(result.throughput.mean),
          moe: Math.round(result.throughput.moe),
        };
      })
      .sort((a, b) => b.mean - a.mean)
      .map((row, index) => [
        index + 1,
        {
          Package: row.Package,
          "ops/s": `${row.mean.toLocaleString()} ± ${row.moe.toLocaleString()}`,
        },
      ]),
  );

  console.table(rows);
}

function generateData(size: number) {
  const data = new Uint8Array(size);
  let byteGenerator = 0x9e3779b1;

  for (let index = 0; index < size; index++) {
    data[index] = (byteGenerator >>> 24) & 0xff;
    byteGenerator = Math.imul(byteGenerator, byteGenerator) >>> 0;
  }

  return data;
}

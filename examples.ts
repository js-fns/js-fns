import { xxh32Str } from "./src/str/xxh32Str.js";
import { xxh64Str } from "./src/str/xxh64Str.js";

const examples: [Function, any[]][] = [
  [xxh32Str, ["cafebabe", "hex"]],
  [xxh32Str, ["cafebabe"]],
  [xxh64Str, ["cafebabe", "hex"]],
  [xxh64Str, ["cafebabe"]],
];

for (const [fn, args] of examples) {
  console.log(
    `${fn.name}(${args.map((a) => JSON.stringify(a)).join(", ")}):`,
    JSON.stringify(fn(...args)),
  );
}

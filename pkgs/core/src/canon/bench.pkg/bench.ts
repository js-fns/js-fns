import { Bench } from "tinybench";
import { canonize } from "js-fns";
import data from "./data/56Kb.json" with { type: "json" };
import canonicalize from "canonicalize"; // ~450K/week
// @ts-expect-error: "json-canon" has no types
import jsonCanon from "json-canon"; // ~6.3K/week
import fastJsonStableStringify from "fast-json-stable-stringify"; // ~54M/week
import fastSafeStringify from "fast-safe-stringify"; // ~17M/week
// @ts-expect-error: "fast-stable-stringify" has no types
import fastStableStringify from "fast-stable-stringify"; // ~800K/week
import jsonStableStringify from "json-stable-stringify"; // ~7.5M/week
import jsonStringifyDeterministic from "json-stringify-deterministic"; // ~180K/week
import safeStableStringify from "safe-stable-stringify"; // ~20M/week

const bench = new Bench({ name: "canonize" });

bench.add("canonicalize", () => {
  canonicalize(data);
});

bench.add("json-canon", () => {
  jsonCanon(data);
});

bench.add("fast-json-stable-stringify", () => {
  fastJsonStableStringify(data);
});

bench.add("fast-safe-stringify", () => {
  fastSafeStringify.default.stableStringify(data);
});

bench.add("fast-stable-stringify", () => {
  fastStableStringify(data);
});

bench.add("json-stable-stringify", () => {
  jsonStableStringify(data);
});

bench.add("json-stringify-deterministic", () => {
  jsonStringifyDeterministic(data);
});

bench.add("safe-stable-stringify", () => {
  safeStableStringify(data);
});

bench.add("js-fns/canon", () => {
  canonize(data);
});

await bench.run();

console.log(bench.name);
console.table(bench.table());

import b from "benny";
import { canonize } from "../src/index.ts";
import data from "./data/56Kb.json" with { type: "json" };
import canonicalize from "canonicalize"; // ~450K/week
// @ts-expect-error: "json-canon" has no types
import jsonCanon from 'json-canon'; // ~6.3K/week
import fastJsonStableStringify from 'fast-json-stable-stringify'; // ~54M/week
import fastSafeStringify from 'fast-safe-stringify'; // ~17M/week
// @ts-expect-error: "fast-stable-stringify" has no types
import fastStableStringify from 'fast-stable-stringify'; // ~800K/week
import jsonStableStringify from 'json-stable-stringify'; // ~7.5M/week
import jsonStringifyDeterministic from 'json-stringify-deterministic'; // ~180K/week
import safeStableStringify from 'safe-stable-stringify'; // ~20M/week

b.suite(
  "Canonize",

  // TODO: Instead of comparing to unsorted version, we should have a naive
  // implementation with sorting.
  // b.add("JSON.stringify (unsorted)", () => {
  //   JSON.stringify(data);
  // }),

  b.add("canonicalize", () => {
    // @ts-expect-error: "canonicalize" types are messed up
    canonicalize(data);
  }),

  b.add("json-canon", () => {
    jsonCanon(data);
  }),

  b.add("fast-json-stable-stringify", () => {
    fastJsonStableStringify(data);
  }),

  b.add("fast-safe-stringify", () => {
    fastSafeStringify.default.stableStringify(data);
  }),

  b.add("fast-stable-stringify", () => {
    fastStableStringify(data);
  }),

  b.add("json-stable-stringify", () => {
    jsonStableStringify(data);
  }),

  b.add("json-stringify-deterministic", () => {
    jsonStringifyDeterministic(data);
  }),

  b.add("safe-stable-stringify", () => {
    safeStableStringify(data);
  }),

  b.add("smolcanon", () => {
    canonize(data);
  }),

  b.cycle(),
  b.complete(),
  b.save({ file: 'canonize', format: 'chart.html' }),
);

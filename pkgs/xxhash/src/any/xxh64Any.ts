import { canonize } from "smolcanon";
import { xxh64 } from "../xxh64.js";

/**
 * Computes the 64-bit xxHash of any JavaScript value.
 *
 * It utilizes `canonize` function from the `smolcanon` package to canonicalize
 * the input value, ensuring that structurally equivalent values produce
 * the same hash.
 *
 * Make sure to install `smolcanon` package as it is not listed as a dependency.
 *
 * @param input - Value to hash.
 *
 * @returns The computed 64-bit hash as a hexadecimal string.
 */
export function xxh64Any<Type extends string>(input: unknown): Type {
  return xxh64(Buffer.from(canonize(input))).toString(16) as Type;
}

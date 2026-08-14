import { canonize } from "smolcanon";
import { xxh32 } from "../xxh32.js";

/**
 * Computes the 32-bit xxHash of any JavaScript value.
 *
 * It utilizes `canonize` function from the `smolcanon` package to canonicalize
 * the input value, ensuring that structurally equivalent values produce
 * the same hash.
 *
 * Make sure to install `smolcanon` package as it is not listed as a dependency.
 *
 * @param input - Value to hash.
 *
 * @returns The computed 32-bit hash as a hexadecimal string.
 */
export function xxh32Any<Type extends string>(input: unknown): Type {
  return xxh32(Buffer.from(canonize(input))).toString(16) as Type;
}

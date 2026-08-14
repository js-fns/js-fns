import { canonize } from "#xxhash/canon";
import { xxh64 } from "../xxh64.ts";

/**
 * Computes the 64-bit xxHash of any JavaScript value.
 *
 * It utilizes the `canonize` function from `@js-fns/canon` to canonicalize
 * the input value, ensuring that structurally equivalent values produce
 * the same hash.
 *
 * The standalone package uses `@js-fns/canon` as an optional peer dependency.
 *
 * @param input - Value to hash.
 *
 * @returns The computed 64-bit hash as a hexadecimal string.
 */
export function xxh64Any<Type extends string>(input: unknown): Type {
  return xxh64(Buffer.from(canonize(input))).toString(16) as Type;
}

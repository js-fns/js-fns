import { xxh64 } from "../xxh64.js";
import type { xxhStr } from "./xxhStr.js";

/**
 * Computes the 64-bit xxHashof a stringifiable value.
 *
 * Just like `Buffer.from`, it accepts any value that can be implicitly coerced
 * to a string.
 *
 * @param input - Value to hash.
 * @param encoding - Encoding to use. Defaults to "utf8".
 *
 * @returns The computed 64-bit hash as a hexadecimal string.
 */
export function xxh64Str(
  input: xxhStr.Input,
  encoding: BufferEncoding = "utf8",
): string {
  return xxh64(Buffer.from(input, encoding)).toString(16);
}

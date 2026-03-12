import { xxh32 } from "../xxh32.js";
import type { xxhStr } from "./xxhStr.js";

/**
 * Computes the 32-bit xxHash of a stringifiable value.
 *
 * Just like `Buffer.from`, it accepts any value that can be implicitly coerced
 * to a string.
 *
 * @param input - Value to hash.
 * @param encoding - Encoding to use. Defaults to "utf8".
 *
 * @returns The computed 32-bit hash as a hexadecimal string.
 */
export function xxh32Str(
  input: xxhStr.Input,
  encoding: BufferEncoding = "utf8",
): string {
  return xxh32(Buffer.from(input, encoding)).toString(16);
}

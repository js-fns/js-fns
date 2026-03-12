/**
 * Smol xxHash string module types.
 */
export namespace xxhStr {
  /**
   * Represents a value that can be implicitly coerced to a string.
   */
  export type Input =
    | string
    | { valueOf(): string }
    | { [Symbol.toPrimitive](hint: "string"): string };
}

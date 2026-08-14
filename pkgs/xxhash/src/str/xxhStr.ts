/**
 * Smol xxHash string module types.
 */
export namespace xxhStr {
  /**
   * Represents a value that can be explicitly coerced to a string.
   */
  export type StringLike =
    | string
    | { valueOf(): string }
    | { [Symbol.toPrimitive](hint: "string"): string };
}

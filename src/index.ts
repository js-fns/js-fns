/**
 * Canonicalizes the input value as a string to use for hashing. It sorts keys,
 * making sure deeply equal objects produce the same string.
 *
 * This version doesn't handle any instance types, such as custom classes, Date,
 * Map, Set, etc.
 *
 * @param input - The value to canonicalize.
 * @returns The canonicalized string representation of the input.
 */
export function canonize(input: unknown): string {
  if (typeof input !== "object" || !input) {
    if (Object.is(input, -0)) return "-0";
    if (typeof input === "string") return JSON.stringify(input);
    return String(input);
  }

  let canon = "";
  for (const key of Object.keys(input).sort() as (keyof typeof input)[]) {
    canon += `${key}:${canonize(input[key])};`;
  }

  return Array.isArray(input) ? `[${canon}]` : `{${canon}}`;
}

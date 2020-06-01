export interface Entries<Input extends { [key: string]: any }>
  extends Array<
    [keyof Input, Input extends { [key: string]: infer Value } ? Value : never]
  > {}

/**
 * Creates an array of arrays where the first element is the key and second is the value.
 *
 * @param object - The object to get entries from
 * @returns Array of entries
 *
 * @public
 */
export default function entries<Input extends { [key: string]: any }>(
  object: Input
): Entries<Input> {
  return Object.keys(object).reduce<[string, any][]>(
    (acc, key) => acc.concat([[key, object[key]]]),
    []
  ) as Entries<Input>
}

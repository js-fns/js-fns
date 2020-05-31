/**
 * Returns an object composed from entries, an array of [key, value].
 *
 * @param array - The entries, an array of [key, value]
 * @returns an object composed from the entries
 *
 * @public
 */
export default function fromEntries<
  Key extends string | number,
  Value,
  Entry extends [Key, Value],
  ReturnType extends { [key: string]: Value }
>(array: Entry[]): ReturnType {
  return array.reduce((acc, [key, value]) => {
    acc[key] = value as ReturnType[typeof key]
    return acc
  }, {} as Partial<ReturnType>) as ReturnType
}

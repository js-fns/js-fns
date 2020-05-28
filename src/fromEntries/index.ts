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
  ReturnType extends { [key in Key]: Value }
>(array: Entry[]): ReturnType {
  return array.reduce((acc, cur) => {
    acc[cur[0]] = cur[1]
    return acc
  }, {}) as ReturnType
}

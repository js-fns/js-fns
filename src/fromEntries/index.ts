import type { Entries } from '../entries'

/**
 * Returns an object composed from entries, an array of [key, value].
 *
 * @param array - The entries, an array of [key, value]
 * @returns an object composed from the entries
 *
 * @category Array
 * @public
 */
export default function fromEntries<Input>(array: Entries<Input>): Input

/**
 * Returns an object composed from entries, an array of [key, value].
 *
 * @param array - The entries, an array of [key, value]
 * @returns an object composed from the entries
 *
 * @category Array
 * @public
 */
export default function fromEntries<Entries extends [string | number, any][]>(
  array: Entries
): Entries extends [string | number, infer Value][]
  ? { [key: string]: Value }
  : never

/**
 * @internal
 */
export default function fromEntries(
  array: [any, any][]
): { [key: string]: any } {
  return array.reduce<{ [key: string]: any }>((acc, [key, value]) => {
    acc[key] = value
    return acc
  }, {})
}

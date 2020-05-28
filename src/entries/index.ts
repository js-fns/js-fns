export type Entry<Key, Value> = [Key, Value]

export type Entries<Key, Value> = Entry<Key, Value>[]

/**
 * Creates an array of arrays where the first element is the key and second is the value.
 *
 * @param object - The object to get entries from
 * @returns Array of entries
 *
 * @public
 */
export default function entries<Key extends string | number, Value>(
  object: { [key in Key]: Value }
): Entries<Key, Value> {
  return (Object.keys(object) as Key[]).reduce<Entries<Key, Value>>(
    (acc, key) => acc.concat([[key, object[key]]]),
    []
  )
}

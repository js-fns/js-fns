/**
 * Picks the given fields from the provided object.
 *
 * @param object - The object to pick fields from
 * @param keys - The array of field names to pick
 * @returns An object with the given fields picked
 *
 * @category Object
 * @public
 */
export default function pick<
  ObjectType extends {},
  Key extends keyof ObjectType,
  ReturnType extends Pick<ObjectType, Key>
>(object: ObjectType, keys: Key | [Key, ...Key[]]): ReturnType {
  return (Array.isArray(keys) ? keys : [keys]).reduce((result, key) => {
    if (key in object) {
      result[key] = object[key]
    }
    return result
    // NOTE: Figure out why when we use ReturnType instead of the type below,
    // it shows a type error.
  }, {} as { [key in Key]: ObjectType[key] }) as ReturnType
}

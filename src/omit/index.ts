/**
 * Creates a copy of the object without given fields.
 *
 * @param object - The object to remove fields from
 * @param keys - The field names to remove
 * @returns The copy of the object without given fields
 *
 * @public
 */
export default function omit<
  ObjectType extends {},
  FieldName extends keyof ObjectType
>(
  object: ObjectType,
  keys: FieldName | [FieldName, ...FieldName[]]
): Omit<ObjectType, FieldName> {
  const clone = { ...object }
  ;(Array.isArray(keys) ? keys : [keys]).forEach((key) => delete clone[key])
  return clone
}

export default function omit<
  ObjectType extends {},
  Key extends keyof ObjectType
>(object: ObjectType, keys: Key | Key[]): Omit<ObjectType, Key> {
  const clone = { ...object }
  ;(Array.isArray(keys) ? keys : [keys]).forEach(key => delete clone[key])
  return clone
}

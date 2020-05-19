export default function pick<
  ObjectType extends {},
  Key extends keyof ObjectType
>(object: ObjectType, keys: Key[]): Pick<ObjectType, Key> {
  return keys.reduce((result, key) => {
    result[key] = object[key]
    return result
  }, Object.create(null))
}

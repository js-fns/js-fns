export default function pick<
  ObjectType extends {},
  Key extends keyof ObjectType
>(object: ObjectType, keys: [Key, ...Key[]]): Pick<ObjectType, Key> {
  return keys.reduce((result, key) => {
    if (key in object) {
      result[key] = object[key]
    }

    return result
  }, Object.create(null))
}

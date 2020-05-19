export default function pick<
  ObjectType extends {},
  Key extends keyof ObjectType,
  ReturnType extends Pick<ObjectType, Key>
>(object: ObjectType, keys: [Key, ...Key[]]): ReturnType {
  return keys.reduce((result, key) => {
    if (key in object) {
      result[key] = object[key]
    }
    return result
    // NOTE: Figure out why when we use ReturnType instead of the type below,
    // it shows a type error.
  }, {} as { [key in Key]: ObjectType[key] }) as ReturnType
}

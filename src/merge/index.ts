export type MergedObjects<FirstObject extends {}, SecondObject extends {}> = {
  [Key in keyof FirstObject]: SecondObject extends Partial<
    Pick<FirstObject, Key>
  >
    ? MergedObjects<FirstObject[Key], SecondObject[Key]>
    : FirstObject[Key]
} &
  {
    [Key in keyof SecondObject]: FirstObject extends Partial<
      Pick<SecondObject, Key>
    >
      ? MergedObjects<FirstObject[Key], SecondObject[Key]>
      : SecondObject[Key]
  }

/**
 * Deeply merges the given objects.
 *
 * @param firstObject - The first object to merge
 * @param secondObject - The second object to merge
 * @returns Deep merge of the given objects
 *
 * @public
 */
export default function merge<FirstObject extends {}, SecondObject extends {}>(
  firstObject: FirstObject,
  secondObject: SecondObject
): MergedObjects<FirstObject, SecondObject>

/**
 * Deeply merges the given objects.
 *
 * @param objects - The objects to merge
 * @returns Deep merge of the given objects
 *
 * @public
 */
export default function merge<ObjectType>(objects: ObjectType[]): ObjectType

/**
 * @internal
 */
export default function merge<ObjectType extends {}>(
  firstObjectOrObjects: ObjectType | ObjectType[],
  maybeSecondObject?: ObjectType
): ObjectType {
  const objects = (maybeSecondObject
    ? [firstObjectOrObjects, maybeSecondObject]
    : firstObjectOrObjects) as ObjectType[]

  const result: Partial<ObjectType> = {}

  for (let objectIndex = 0; objectIndex < objects.length; objectIndex++) {
    const keys = Object.keys(objects[objectIndex]) as Array<keyof ObjectType>
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      const key = keys[keyIndex]
      if (result[key] && typeof result[key] === 'object') {
        result[key] = merge(result[key], objects[objectIndex][key])
      } else {
        result[key] = objects[objectIndex][key]
      }
    }
  }

  return result as ObjectType
}

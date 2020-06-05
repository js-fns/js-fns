/**
 * Maps through entries of the given object and returns values by the given key.
 *
 * @param object - The object to map
 * @param key - The key to map with
 * @returns The values by the given key
 *
 * @category Collection
 * @public
 */
export default function map<
  ValueType,
  Key extends keyof ValueType,
  ResultType extends ValueType[Key]
>(object: { [key: string]: ValueType }, key: Key): ResultType[]

/**
 * Maps through entries of the given object and collects values returned from the mapper function.
 *
 * @param object - The object to map
 * @param mapper - The mapper function
 * @returns The values returned from the mapper function
 *
 * @category Collection
 * @public
 */
export default function map<
  ObjectType extends { [key: string]: ValueType },
  ValueType,
  Key extends keyof ObjectType,
  ResultType
>(
  object: ObjectType,
  mapper: (element: ValueType, index: Key) => ResultType
): ResultType[]

/**
 * Maps through elements of the given array and returns values by the given key.
 *
 * @param array - The array to map
 * @param key - The key to map with
 * @returns The values by the given key
 *
 * @category Collection
 * @public
 */
export default function map<
  ElementType extends {},
  Key extends keyof ElementType,
  ResultType extends ElementType[Key]
>(array: ElementType[], mapper: Key): ResultType[]

/**
 * Maps through elements of the given array and collects values returned from the mapper function.
 *
 * @param array - The array to map
 * @param mapper - The mapper function
 * @returns The values returned from the mapper function
 *
 * @category Collection
 * @public
 */
export default function map<ElementType, ResultType>(
  array: ElementType[],
  mapper: (element: ElementType, index: number) => ResultType
): ResultType[]

/**
 * @internal
 */
export default function map(
  array: any,
  mapper: ((element: any, index: any) => any) | string
): any[] {
  if (Array.isArray(array)) {
    if (typeof mapper === 'string') {
      return array.map((element) => element[mapper])
    } else {
      return array.map(mapper)
    }
  } else {
    const keys = Object.keys(array)
    return keys.map((key) => {
      if (typeof mapper === 'string') {
        return array[key][mapper]
      } else {
        return mapper(array[key], key)
      }
    })
  }
}

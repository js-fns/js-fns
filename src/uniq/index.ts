/**
 * Creates an array with unique elements from the given array.
 *
 * @param array - The array to pick unique elements from
 * @returns An array with unique elements from the given array
 *
 * @public
 */
export default function uniq<ElementType>(array: ElementType[]): ElementType[]

/**
 * Creates an array with unique elements from the given array which uniqueness is determined using the mapper function.
 *
 * @param array - The array to pick unique elements from
 * @param mapper - The function that returns the value to check for uniqueness
 *
 * @public
 */
export default function uniq<ElementType>(
  array: ElementType[],
  mapper: (i: ElementType) => any
): ElementType[]

/**
 * Creates an array with unique elements from the given array which uniqueness is determined by the element field
 *
 * @param array - The array to pick unique elements from
 * @param fieldName - The name of the field to check for uniqueness
 *
 * @public
 */
export default function uniq<
  ElementType extends {},
  FieldNameType extends keyof ElementType
>(array: ElementType[], fieldName: FieldNameType): ElementType[]

/**
 * @internal
 */
export default function uniq<ElementType>(
  array: ElementType[],
  mapper?: ((i: ElementType) => any) | keyof ElementType
): ElementType[] {
  const map = new Map()
  const result: ElementType[] = []
  for (let i = 0; i < array.length; i++) {
    const element = array[i]
    const key =
      typeof mapper === 'function'
        ? mapper(element)
        : mapper
        ? element[mapper]
        : element
    if (!map.has(key)) {
      map.set(key, true)
      result.push(element)
    }
  }
  return result
}

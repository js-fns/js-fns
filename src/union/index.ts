/**
 * Creates a new array with all unique elements from the given arrays
 *
 * @param firstArray - The first array to get unique elements from
 * @param secondArray - The second array to get unique elements from
 * @returns An array with all unique elements from the given arrays
 *
 * @public
 */
export default function union<FirstElementType, SecondElementType>(
  firstArray: FirstElementType[],
  secondArray: SecondElementType[]
): Array<FirstElementType | SecondElementType>

/**
 * Creates a new array with all unique elements from the given arrays
 *
 * @param arrays - The array of arrays of elements to get unique elements from
 * @returns An array with all unique elements from the given arrays
 *
 * @public
 */
export default function union<ElementType>(
  arrays: ElementType[][]
): Array<ElementType>

/**
 * @internal
 */
export default function union<ElementType>(
  firstArrayOrArrays: ElementType[] | ElementType[][],
  maybeSecondArray?: ElementType[]
): Array<ElementType> {
  let arrays = (maybeSecondArray
    ? [firstArrayOrArrays, maybeSecondArray]
    : firstArrayOrArrays) as ElementType[][]

  const uniqueSet = new Set()
  const result: ElementType[] = []

  for (let arrayIndex = 0; arrayIndex < arrays.length; arrayIndex++) {
    const array = arrays[arrayIndex]
    for (let elementIndex = 0; elementIndex < array.length; elementIndex++) {
      const element = array[elementIndex]
      if (!uniqueSet.has(element)) {
        uniqueSet.add(element)
        result.push(element)
      }
    }
  }

  return result
}

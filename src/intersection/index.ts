/**
 * Creates an array with elements present in all given arrays.
 *
 * @param firstArray - The first array to get elements from
 * @param secondArray - The second array to get elements from
 * @returns An array with elements present in all given arrays
 *
 * @public
 */
export default function intersection<FirstElementType, SecondElementType>(
  firstArray: FirstElementType[],
  secondArray: SecondElementType[]
): Array<FirstElementType & SecondElementType>

/**
 * Creates an array with elements present in all given arrays.
 *
 * @param arrays - The array of arrays of elements to get elements from
 * @returns An array with elements present in all given arrays
 *
 * @public
 */
export default function intersection<ElementType>(
  arrays: ElementType[][]
): Array<ElementType>

/**
 * @internal
 */
export default function intersection<ElementType>(
  firstArrayOrArrays: ElementType[] | ElementType[][],
  maybeSecondArray?: ElementType[]
): Array<ElementType> {
  const arrays = (maybeSecondArray
    ? [firstArrayOrArrays, maybeSecondArray]
    : firstArrayOrArrays) as ElementType[][]
  const sets = arrays.map((array) => new Set(array))

  const biggestArray = arrays.sort((a, b) => a.length - b.length)[0]
  if (!biggestArray || !biggestArray.length) return []

  return biggestArray.filter((element) => sets.every((set) => set.has(element)))
}

/**
 * Creates an array with elements present in all given arrays.
 *
 * @param arrays - The array of arrays of elements to get elements from
 * @returns An array with elements present in all given arrays
 *
 * @public
 */
export default function zip<ElementsArray extends any[][]>(
  ...arrays: ElementsArray
): ElementsArray extends Array<Array<infer ElementType>>
  ? ElementType[][]
  : never

/**
 * @internal
 */
export default function zip<ElementType>(
  ...arrays: ElementType[][]
): ElementType[][] {
  if (arrays.length === 0) {
    return arrays
  }

  const longestArrayLength = arrays
    .slice()
    .sort((a, b) => b.length - a.length)[0].length

  const result: ElementType[][] = []

  for (let i = 0; i < longestArrayLength; i++) {
    const arr: ElementType[] = []

    for (let j = 0; j < arrays.length; j++) {
      const element = arrays[j][i]
      arr.push(element)
    }

    result.push(arr)
  }

  return result
}

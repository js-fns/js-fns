// const arrays = [['a'], [1, 2], [true, false]]

// assert.deepEqual(zip<any>(...arrays), [
//   ['a', 1, true],
//   [undefined, 2, false],
// ])

/**
 * @internal
 */
export default function zip<FirstElementType, SecondElementType>(
  firstArray: FirstElementType[],
  secondArray: SecondElementType[]
): Array<Array<FirstElementType | SecondElementType>>

/**
 * @internal
 */
export default function zip<
  FirstElementType,
  SecondElementType,
  ThirdElementType
>(
  firstArray: FirstElementType[],
  secondArray: SecondElementType[],
  thirdArray: ThirdElementType[]
): Array<Array<FirstElementType | SecondElementType | ThirdElementType>>

/**
 * Creates an array with elements present in all given arrays.
 *
 * @param arrays - The array of arrays of elements to get elements from
 * @returns An array with elements present in all given arrays
 *
 * @public
 */
export default function zip<ElementType>(
  ...arrays: ElementType[][]
): Array<Array<ElementType>> {
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

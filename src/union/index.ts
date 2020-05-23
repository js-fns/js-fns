/**
 * Creates a new array with all unique elements from the given arrays
 *
 * @param arrays - Arrays to get unique elements from
 * @returns An array with all unique elements from the given arrays
 *
 * @public
 */
export default function union<ElementType>(
  ...arrays: ElementType[][]
): Array<ElementType> {
  if (arrays.length === 1) {
    return arrays[0]
  }

  const set = new Set<ElementType>()

  arrays.forEach((array) => {
    array.forEach((el) => {
      set.add(el)
    })
  })

  return Array.from(set)
}

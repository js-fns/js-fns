/**
 * Creates a copy of an array with the given number of elements starting from the beginning.
 *
 * @param array - The array to copy elements from
 * @param howMany - The number of elements to copy, default is 1
 * @returns The copy of the array with the given number of elements from the beginning
 *
 * @category Array
 * @public
 */
export default function take<ElementType>(
  array: Array<ElementType | ElementType[]>,
  howMany = 1
): Array<ElementType | ElementType[]> {
  if (howMany < 1) {
    return []
  }
  return array.slice(0, howMany)
}

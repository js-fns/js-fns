/**
 * Removes the given number of elements from the beginning.
 *
 * @param array - The array to remove elements from
 * @param howMany - The number of elements to remove
 * @returns A clone of the array with the given number of elements removed from the beginning
 *
 * @public
 */
export default function drop<ElementType>(
  array: Array<ElementType>,
  howMany: number = 1
): Array<ElementType> {
  if (howMany < 1) {
    return array
  }

  return array.slice(howMany)
}

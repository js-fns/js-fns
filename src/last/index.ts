/**
 * Returns the last element of the array.
 *
 * @param array - The array to return the last element from
 * @returns The last element of the array
 *
 * @public
 */
export default function last<ElementType>(
  array: ElementType[]
): ElementType | undefined {
  return array[array.length - 1]
}

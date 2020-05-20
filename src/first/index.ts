/**
 * Returns the first element of the array.
 *
 * @param array - The array to return the first element from
 * @returns The first element of the array
 */

export default function first<ElementType>(
  arr: ElementType[]
): ElementType | undefined {
  return arr[0]
}

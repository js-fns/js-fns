/**
 * Returns the index of the last matching element in an array.
 *
 * @param array - The array to find element index in
 * @param matcher - The function that returns true if element satisfies a condition
 * @returns A last element index that satisfies the condition
 *
 * @category Array
 * @public
 */
export default function findLastIndex<ElementType>(
  array: Array<ElementType>,
  matcher: (element: ElementType) => boolean
): number | -1 {
  for (let index = array.length - 1; index >= 0; index--) {
    const element = array[index]
    if (matcher(element)) return index
  }
  return -1
}

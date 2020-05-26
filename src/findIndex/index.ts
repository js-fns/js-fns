/**
 * Returns the index of the first matching element.
 *
 * @param array - The array to find element index in
 * @param matcher - The function that returns true if element satisfies a condition
 * @returns An element that satisfies the condition
 *
 * @public
 */
export default function findIndex<ElementType>(
  array: Array<ElementType>,
  matcher: (element: ElementType) => boolean
): number | -1 {
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (matcher(element)) return index
  }
  return -1
}

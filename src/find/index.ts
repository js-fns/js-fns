/**
 * Returns the first matching element.
 *
 * @param array - The array to find element in
 * @param matcher - The function that returns true if element satisfies a condition
 * @returns An element that satisfies the condition
 *
 * @category Array
 * @public
 */
export default function find<ElementType>(
  array: Array<ElementType>,
  matcher: (element: ElementType) => boolean
): ElementType | undefined {
  for (let i = 0; i < array.length; i++) {
    const element = array[i]

    if (matcher(element)) {
      return element
    }
  }
}

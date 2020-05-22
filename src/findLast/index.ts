/**
 * Returns the last matching element in an array.
 *
 * @param array - The array to find element in
 * @param matcher - The function that returns true if element satisfies a condition
 * @returns A last element that satisfies the condition
 *
 * @public
 */
export default function findLast<ElementType>(
  array: Array<ElementType>,
  matcher: (element: ElementType) => boolean
): ElementType | undefined {
  for (let i = array.length - 1; i >= 0; i--) {
    const element = array[i]

    if (matcher(element)) {
      return element
    }
  }
}

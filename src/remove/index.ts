/**
 * Creates an array without the given element.
 *
 * @param array - The array to remove the element from
 * @param element - The element to remove
 *
 * @public
 */
export default function remove<ElementType>(
  array: ElementType[],
  element: ElementType
) {
  return array.filter((i) => i !== element)
}

/**
 * Returns a random element from the given array.
 *
 * @param array - The array to get element from
 * @returns A random element
 *
 * @public
 */
export default function sample<ElementType>(
  array: Array<ElementType>
): ElementType | undefined {
  const randomIndex = Math.round(Math.random() * array.length - 1)
  return array[randomIndex]
}

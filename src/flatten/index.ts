/**
 * Creates an array with elements "flatten" one-level deep. Meaning if the element is an array, the elements of the array will be added to the root-level array.
 *
 * @param array - The array to alter
 * @returns The copy of the array with elements "flatten"
 *
 * @public
 */
export default function flatten<ElementType>(
  array: Array<ElementType | ElementType[]>
): ElementType[] {
  return array.reduce<ElementType[]>((acc, item) => acc.concat(item), [])
}

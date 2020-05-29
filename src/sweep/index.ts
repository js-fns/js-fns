/**
 * Removes null and undefined elements from the given array.
 *
 * @param array - The array to remove elements from
 * @returns An array without elements equal null or undefined
 *
 * @category Array
 * @public
 */
export default function sweep<
  ElementType,
  ReturnType extends Array<Exclude<ElementType, null | undefined>>
>(array: Array<ElementType>): ReturnType {
  return array.filter((item) => item != null) as ReturnType
}

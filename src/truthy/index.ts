/**
 * Removes falsy elements (null, undefined, false, 0 and '') from the given array.
 *
 * @param array - The array to remove elements from
 * @returns An array without falsy elements
 *
 * @category Array
 * @public
 */
export default function truthy<
  ElementType,
  ReturnType extends Array<
    Exclude<ElementType, null | undefined | false | 0 | ''>
  >
>(array: Array<ElementType>): ReturnType {
  return array.filter((item) => !!item) as ReturnType
}

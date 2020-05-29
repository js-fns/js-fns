/**
 * Creates a new array without elements from the second argument.
 *
 * @param inputArray - The array to remove elements from
 * @param arrayToSubstract - The array of elements to remove
 * @returns An array basing of the first one without element from the second
 *
 * @category Array
 * @public
 */
export default function difference<ElementType>(
  inputArray: Array<ElementType>,
  arrayToSubtract: Array<ElementType>
): Array<ElementType> {
  return inputArray.filter((item) => arrayToSubtract.indexOf(item) === -1)
}

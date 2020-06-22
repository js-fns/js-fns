type ElementType<ArrayType extends any[]> = ArrayType extends Array<infer Type>
  ? Type
  : never

/**
 * Creates an array without the given element.
 *
 * @param array - The array to remove the element from
 * @param element - The element to remove
 *
 * @category Array
 * @public
 */
export default function remove<ArrayType extends Array<unknown>>(
  array: ArrayType,
  element: ElementType<ArrayType>
): ArrayType {
  return array.filter((el) => el !== element) as ArrayType
}

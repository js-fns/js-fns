/**
 * Checks if an array is empty or not.
 *
 * @param array - The array to check for
 * @returns A boolean If the given array is empty or not
 *
 * @category Collection
 * @public
 */
export default function isEmpty<Type>(val: Type[]): boolean

/**
 * Checks if an object is empty or not.
 *
 * @param object - The object to check for
 * @returns A boolean If the given object is empty or not
 *
 * @category Lang
 * @public
 */
export default function isEmpty<Type extends { [key: string]: any }>(
  val: Type
): boolean

/**
 * @internal
 */
export default function isEmpty(val: any): boolean {
  if (Array.isArray(val)) {
    return !val.length
  }
  return !Object.keys(val).length
}

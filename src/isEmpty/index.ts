/**
 * Checks if an array is empty or not
 *
 * @param array - The array to check for
 * @returns A boolean If the given array is empty or not
 *
 * @public
 */
export default function isEmpty<T>(val: T[]): boolean

/**
 * Checks if an object is empty or not
 *
 * @param object - The object to check for
 * @returns A boolean If the given object is empty or not
 *
 * @public
 */
export default function isEmpty<T extends { [key: string]: any }>(
  val: T
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

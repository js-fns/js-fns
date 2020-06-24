import { Values } from '../values'

/**
 * @internal
 */
export default function isEmpty<Type>(val: Type[]): boolean

/**
 * @internal
 */
export default function isEmpty<Type extends { [key: string]: any }>(
  val: Type
): boolean

/**
 * @internal
 */
export default function isEmpty(val?: undefined | null): boolean

/**
 * @internal
 */
export default function isEmpty(val: number): boolean

/**
 * @internal
 */
export default function isEmpty(val: string): boolean

/**
 * @internal
 */
export default function isEmpty(val: RegExp): boolean

/**
 * @internal
 */
export default function isEmpty<Key, Value>(val: Map<Key, Value>): boolean

/**
 * @internal
 */
export default function isEmpty<Type>(val: Set<Type>): boolean

/**
 * @internal
 */
export default function isEmpty(val: symbol): boolean

/**
 * @internal
 */
export default function isEmpty(val: Buffer): boolean

/**
 * Checks if a given value is empty or not.
 *
 * @param value - The value to check for
 * @returns A boolean If the given value is empty or not
 *
 * @category Lang
 * @public
 */
export default function isEmpty(val?: any): boolean {
  if (typeof val === 'undefined' || val === null) {
    return true
  }
  if (
    val instanceof RegExp ||
    typeof val === 'number' ||
    typeof val === 'symbol'
  ) {
    return true
  }
  if (Array.isArray(val) || typeof val === 'string' || val instanceof Buffer) {
    return !val.length
  }
  if (val instanceof Map || val instanceof Set) {
    return !val.size
  }
  return !Object.keys(val).length
}

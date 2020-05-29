/**
 * Creates an array with n elements returned from the mapper function.
 *
 * @param n - The number of times to repeat mapper
 * @param mapper - The function executed n times
 * @returns The array of n elements returned from the mapper function
 *
 * @public
 */
export default function times<ElementType>(
  n: number,
  mapper: (index: number) => ElementType
): Array<ElementType>

/**
 * Creates an array of n size filled with the indexes of the elements.
 *
 * @param n - The number of elements
 * @returns The array of indexes, starting from 0
 *
 * @public
 */
export default function times(n: number): Array<number>

/**
 * @internal
 */
export default function times(
  n: number,
  mapper?: (index: number) => any
): Array<any> {
  const arr: Array<any> = []
  for (let i = 0; i < n; i++) {
    arr.push(mapper?.(i) ?? i)
  }
  return arr
}

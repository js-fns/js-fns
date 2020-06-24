export interface Values<Input extends { [key: string]: any }>
  extends Array<Input extends { [key: string]: infer Value } ? Value : never> {}

/**
 * Creates an array of values of the items in the object.
 *
 * @param object - The object to get the values from
 * @returns Array of values
 *
 * @category Collection
 * @public
 */
export default function values<Input extends { [key: string]: any }>(
  obj: Input
): Values<Input>

/**
 * Creates an array of values of an array passed.
 *
 * @param array - The array to get the values from
 * @returns Array of values
 *
 * @category Collection
 * @public
 */
export default function values<Type>(obj: Type[]): Type[]

/**
 * Creates an array of the characters of a string.
 *
 * @param string - The string to get the values from
 * @returns Array of characters of the string
 *
 * @category Collection
 * @public
 */
export default function values(obj: string): string[]

/**
 * @internal
 */
export default function values(obj: any): any {
  if (Array.isArray(obj)) {
    return obj
  }
  if (typeof obj === 'string') {
    return obj.split('')
  }

  const arr = []
  for (let i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      arr.push(obj[i])
    }
  }
  return arr
}

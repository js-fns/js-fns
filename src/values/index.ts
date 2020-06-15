export interface Values<Input extends { [key: string]: any }>
  extends Array<Input extends { [key: string]: infer Value } ? Value : never> {}

/**
 * Creates an array of values of the items in the object.
 *
 * @param object - The object to get the values from
 * @returns Array of values
 *
 * @public
 */
export default function values<Input extends { [key: string]: any }>(
  obj: Input
): Values<Input> {
  const arr = []
  for (let i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      arr.push(obj[i])
    }
  }
  return arr as Values<Input>
}

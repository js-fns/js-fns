/**
 * Performs a reduce on the elements in reverse order
 *
 * @param array - The array to reduce
 * @param callback - The callback function with current output value and current array element
 * @param initialValue - The initial value to start with
 * @returns The reduced array output
 *
 * @category Array
 * @public
 */
export default function reduceRight<ArrayType, InitialVal>(
  arr: ArrayType[],
  cb: (acc: InitialVal, val: ArrayType) => InitialVal,
  initialValue: InitialVal
): InitialVal {
  let val = initialValue
  for (let i = arr.length - 1; i >= 0; i--) {
    val = cb(val, arr[i])
  }
  return val
}

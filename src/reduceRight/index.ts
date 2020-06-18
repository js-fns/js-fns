/**
 * Accumulates entries of the given object in reverse order.
 *
 * @param object - The object to reduce
 * @param reducer - The reducer function
 * @param initialValue - The initial accumulator value
 * @returns The accumulated value
 *
 * @category Collection
 * @public
 */
export default function reduceRight<
  Key extends string,
  ObjectType extends { [key: string]: ValueType },
  AccumulatorType,
  ValueType
>(
  object: { [key in Key]: ValueType },
  reducer: (
    accumulator: AccumulatorType,
    value: ValueType,
    key: Key
  ) => AccumulatorType,
  initialValue: AccumulatorType
): AccumulatorType

/**
 * Accumulates elements of the given array in reverse order.
 *
 * @param array - The array to reduce
 * @param reducer - The reducer function
 * @param initialValue - The initial accumulator value
 * @returns The accumulated value
 *
 * @category Collection
 * @public
 */
export default function reduceRight<AccumulatorType, ValueType>(
  object: ValueType[],
  reducer: (
    accumulator: AccumulatorType,
    element: ValueType,
    index: number
  ) => AccumulatorType,
  initialValue: AccumulatorType
): AccumulatorType

/**
 * @internal
 */
export default function reduceRight(
  object: any,
  reducer: (accumulator: any, value: any, key: any) => any,
  initialValue: any
): any {
  if (Array.isArray(object)) {
    return object.reduceRight(reducer, initialValue)
  }
  const keys = Object.keys(object)
  return keys.reduceRight((acc, key) => {
    return reducer(acc, object[key], key)
  }, initialValue)
}

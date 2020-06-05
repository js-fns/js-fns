/**
 * Accumulates entries of the given object.
 *
 * @param object - The object to reduce
 * @param reducer - The reducer function
 * @param initialValue - The initial accumulator value
 * @returns The accumulated value
 *
 * @category Collection
 * @public
 */
export default function reduce<
  Key extends string,
  ObjectType extends { [key: string]: ValueType },
  AccumulatorType,
  ValueType
>(
  objec: { [key in Key]: ValueType },
  reducer: (
    accumulator: AccumulatorType,
    value: ValueType,
    key: Key
  ) => AccumulatorType,
  initialValue: AccumulatorType
): AccumulatorType

/**
 * Accumulates elements of the given array.
 *
 * @param array - The array to reduce
 * @param reducer - The reducer function
 * @param initialValue - The initial accumulator value
 * @returns The accumulated value
 *
 * @category Collection
 * @public
 */
export default function reduce<AccumulatorType, ValueType>(
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
export default function reduce(
  object: any,
  reducer: (accumulator: any, value: any, key: any) => any,
  initialValue: any
): any {
  if (Array.isArray(object)) {
    return object.reduce(reducer, initialValue)
  } else {
    const keys = Object.keys(object)
    return keys.reduce((acc, key) => {
      return reducer(acc, object[key], key)
    }, initialValue)
  }
}

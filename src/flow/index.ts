type UnknownFn = (...params: unknown[]) => unknown
type AnyFn = (...params: any[]) => any

/**
 * @internal
 */
export default function flow<First extends unknown, Output>(
  first: (val: First) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<First extends unknown, Second, Output>(
  first: (val: First) => Second,
  second: (val: Second) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<First extends unknown, Second, Third, Output>(
  first: (val: First) => Second,
  second: (val: Second) => Third,
  third: (val: Third) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<
  First extends unknown,
  Second,
  Third,
  Fourth,
  Output
>(
  first: (val: First) => Second,
  second: (val: Second) => Third,
  third: (val: Third) => Fourth,
  fourth: (val: Fourth) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<
  First extends unknown,
  Second,
  Third,
  Fourth,
  Fifth,
  Output
>(
  first: (val: First) => Second,
  second: (val: Second) => Third,
  third: (val: Third) => Fourth,
  fourth: (val: Fourth) => Fifth,
  fifth: (val: Fifth) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<
  First extends unknown,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Output
>(
  first: (val: First) => Second,
  second: (val: Second) => Third,
  third: (val: Third) => Fourth,
  fourth: (val: Fourth) => Fifth,
  fifth: (val: Fifth) => Sixth,
  sixth: (val: Sixth) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<
  First extends unknown,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Seventh,
  Output
>(
  first: (val: First) => Second,
  second: (val: Second) => Third,
  third: (val: Third) => Fourth,
  fourth: (val: Fourth) => Fifth,
  fifth: (val: Fifth) => Sixth,
  sixth: (val: Sixth) => Seventh,
  seventh: (val: Seventh) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<
  First extends unknown,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Seventh,
  Eighth,
  Output
>(
  first: (val: First) => Second,
  second: (val: Second) => Third,
  third: (val: Third) => Fourth,
  fourth: (val: Fourth) => Fifth,
  fifth: (val: Fifth) => Sixth,
  sixth: (val: Sixth) => Seventh,
  seventh: (val: Seventh) => Eighth,
  eighth: (val: Eighth) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<
  First extends unknown,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Seventh,
  Eighth,
  Ninth,
  Output
>(
  first: (val: First) => Second,
  second: (val: Second) => Third,
  third: (val: Third) => Fourth,
  fourth: (val: Fourth) => Fifth,
  fifth: (val: Fifth) => Sixth,
  sixth: (val: Sixth) => Seventh,
  seventh: (val: Seventh) => Eighth,
  eighth: (val: Eighth) => Ninth,
  ninth: (val: Ninth) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow<
  First extends unknown,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
  Seventh,
  Eighth,
  Ninth,
  Tenth,
  Output
>(
  first: (val: First) => Second,
  second: (val: Second) => Third,
  third: (val: Third) => Fourth,
  fourth: (val: Fourth) => Fifth,
  fifth: (val: Fifth) => Sixth,
  sixth: (val: Sixth) => Seventh,
  seventh: (val: Seventh) => Eighth,
  eighth: (val: Eighth) => Ninth,
  ninth: (val: Ninth) => Tenth,
  tenth: (val: Tenth) => Output
): (val: First) => Output

/**
 * @internal
 */
export default function flow(...fns: AnyFn[]): AnyFn

/**
 * Lets you perform a flow of function operations sequentially
 *
 * @param functions - The function operations that you want to perform on a given value
 * @returns A function that accepts an initial value to perform the above functions on
 *
 * @category Util
 * @public
 */
export default function flow(...fns: UnknownFn[]): UnknownFn {
  return (initialValue: unknown): unknown => {
    return fns.reduce<unknown>((val, fn) => {
      return fn(val)
    }, initialValue)
  }
}

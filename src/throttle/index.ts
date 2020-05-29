type ThrottledFunction<Fn extends (...args: any[]) => any> = Fn extends (
  ...args: infer Args
) => any
  ? (...args: Args) => void
  : never

/**
 * Creates a function that execute no more than once per the given timeout.
 *
 * @param fn - The function to execute
 * @param wait - The timeout
 * @returns A function based on the provided function that execute no more than once per the given timeout
 *
 * @category Function
 * @public
 */
export default function throttle<InputFunction extends (...args: any[]) => any>(
  fn: InputFunction,
  wait: number
): ThrottledFunction<InputFunction> {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return ((...args: any[]) => {
    if (timeout === undefined) {
      fn(...args)
      timeout = setTimeout(() => {
        timeout = undefined
      }, wait)
    }
  }) as ThrottledFunction<InputFunction>
}

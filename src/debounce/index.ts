type DebouncedFunction<Fn extends (...args: any[]) => any> = Fn extends (
  ...args: infer Args
) => any
  ? (...args: Args) => void
  : never

/**
 * Creates a function that will execute after the given timeout after the last call.
 *
 * @param fn - The function to execute
 * @param wait - The timeout
 * @returns A function based on the provided function that will execute after the given timeout after the last call
 *
 * @category Function
 * @public
 */
export default function debounce<InputFunction extends (...args: any[]) => any>(
  fn: InputFunction,
  wait: number
): DebouncedFunction<InputFunction> {
  let timeout: ReturnType<typeof setTimeout>
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, wait)
  }) as DebouncedFunction<InputFunction>
}

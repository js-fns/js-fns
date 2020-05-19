type Debounced<Fn extends (...args: any[]) => any> = Fn extends ((
  ...args: infer Args
) => any)
  ? ((...args: Args) => void)
  : never

export default function debounce<Fn extends (...args: any[]) => any>(
  fn: Fn,
  wait: number
): Debounced<Fn> {
  let timeout: ReturnType<typeof setTimeout>
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, wait)
  }) as Debounced<Fn>
}

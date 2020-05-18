export default function drop<T>(array: Array<T>, n: number): Array<T> {
  if (n < 1) {
    return array
  }

  return array.slice(n)
}

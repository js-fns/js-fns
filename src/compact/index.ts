export default function compact<T>(array: Array<T>): Array<T> {
  return array.filter(item => item != null)
}

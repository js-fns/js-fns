export default function sweep<T>(array: Array<T>): Array<T> {
  return array.filter((item) => item != null)
}

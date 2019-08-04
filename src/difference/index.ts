export default function difference<T>(
  array1: Array<T>,
  array2: Array<T>
): Array<T> {
  return array1.filter(item => array2.indexOf(item) === -1)
}

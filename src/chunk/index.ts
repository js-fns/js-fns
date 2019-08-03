export default function chunk<T>(
  array: Array<T>,
  size: number
): Array<Array<T>> {
  const maxChunks = Math.ceil(array.length / size)
  const newArray = []
  for (let index = 0; index < maxChunks; index++) {
    const sliceStart = index * size
    newArray.push(array.slice(sliceStart, sliceStart + size))
  }
  return newArray
}

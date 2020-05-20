/**
 * Groups the array elements into chunks of the given size.
 *
 * @param array - The array to generate chunks from
 * @param size - The size of a chunk
 * @returns An array of chunks of the given size
 *
 * @public
 */
export default function chunk<ElementType>(
  array: ElementType[],
  size: number
): ElementType[][] {
  const maxChunks = Math.ceil(array.length / size)
  const newArray = []
  for (let index = 0; index < maxChunks; index++) {
    const sliceStart = index * size
    newArray.push(array.slice(sliceStart, sliceStart + size))
  }
  return newArray
}

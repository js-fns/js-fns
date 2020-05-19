export default function uniq<ItemType>(array: ItemType[]): ItemType[]

export default function uniq<ItemType>(
  array: ItemType[],
  mapper: (i: ItemType) => any
): ItemType[]

export default function uniq<ItemType extends {}, Key extends keyof ItemType>(
  array: ItemType[],
  mapper: Key
): ItemType[]

export default function uniq<ItemType>(
  array: ItemType[],
  mapper?: ((i: ItemType) => any) | keyof ItemType
): ItemType[] {
  const map = new Map()
  const result: ItemType[] = []
  for (const item of array) {
    const key =
      typeof mapper === 'function' ? mapper(item) : mapper ? item[mapper] : item
    if (!map.has(key)) {
      map.set(key, true)
      result.push(item)
    }
  }
  return result
}

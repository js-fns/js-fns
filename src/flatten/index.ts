export default function flatten<ItemType>(
  arr: Array<ItemType | ItemType[]>
): ItemType[] {
  return arr.reduce<ItemType[]>((acc, item) => acc.concat(item), [])
}

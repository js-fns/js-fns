export default function last<ItemType>(arr: ItemType[]): ItemType | undefined {
  return arr[arr.length - 1]
}

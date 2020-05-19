export default function without<ItemType>(arr: ItemType[], item: ItemType) {
  return arr.filter(i => i !== item)
}

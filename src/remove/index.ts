export default function remove<ItemType>(arr: ItemType[], item: ItemType) {
  return arr.filter((i) => i !== item)
}

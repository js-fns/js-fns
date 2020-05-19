export default function sweep<
  ItemType,
  ReturnType extends Array<Exclude<ItemType, null | undefined>>
>(array: Array<ItemType>): ReturnType {
  return array.filter((item) => item != null) as ReturnType
}

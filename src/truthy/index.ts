export default function truthy<
  ItemType,
  ReturnType extends Array<Exclude<ItemType, null | undefined | false | 0 | ''>>
>(array: Array<ItemType>): ReturnType {
  return array.filter((item) => !!item) as ReturnType
}

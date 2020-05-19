export type Groups<ItemType> = {
  [key: string]: ItemType[]
}

export default function group<ItemType, GroupIdType extends string | number>(
  arr: ItemType[],
  getGroupId: (item: ItemType, index: number) => GroupIdType
): Groups<ItemType> {
  return arr.reduce<Groups<ItemType>>((acc, item, index) => {
    const groupId = getGroupId(item, index)
    acc[groupId] = acc[groupId] || []
    acc[groupId].push(item)
    return acc
  }, {})
}

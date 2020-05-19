type Group<ItemType> = {
  [key: string]: ItemType[]
}

export default function group<ItemType, GroupIdType extends string | number>(
  arr: ItemType[],
  getGroupId: (item: ItemType, index: number) => GroupIdType
): Group<ItemType> {
  return arr.reduce<Group<ItemType>>((acc, item, index) => {
    const groupId = getGroupId(item, index)
    acc[groupId] = acc[groupId] || []
    acc[groupId].push(item)
    return acc
  }, {})
}

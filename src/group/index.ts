export type Groups<GroupIdType extends number | string, ItemType> = {
  [key in GroupIdType]: ItemType[]
}

export default function group<ItemType, GroupIdType extends string | number>(
  arr: ItemType[],
  mapper: (item: ItemType, index: number) => GroupIdType
): Groups<GroupIdType, ItemType>

export default function group<
  ItemType extends {},
  Key extends keyof ItemType,
  GroupIdType extends ItemType[Key]
>(
  arr: ItemType[],
  mapper: Key
): GroupIdType extends number | string ? Groups<GroupIdType, ItemType> : never

export default function group<ItemType, GroupIdType extends string | number>(
  arr: ItemType[],
  mapper: ((item: ItemType, index: number) => GroupIdType) | (string | number)
): Groups<GroupIdType, ItemType> {
  return arr.reduce(
    (acc, item: any, index) => {
      const groupId =
        typeof mapper === 'function' ? mapper(item, index) : item[mapper]
      acc[groupId] = acc[groupId] || []
      acc[groupId].push(item)
      return acc
    },
    {} as { [key: string]: ItemType[] }
  ) as Groups<GroupIdType, ItemType>
}

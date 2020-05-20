export type GroupedElements<GroupIdType extends number | string, ElementType> = {
  [groupId in GroupIdType]: ElementType[]
}

/**
 * Creates an object where the key is the group id and the value is an array of elements grouped by this id.
 *
 * @param array - The array to group elements from
 * @param mapper - The function that returns the group id
 * @returns An object where the key is the group id and the value is an array of elements grouped by this id
 *
 * @public
 */
export default function group<ElementType, GroupIdType extends string | number>(
  arr: ElementType[],
  mapper: (element: ElementType, index: number) => GroupIdType
): GroupedElements<GroupIdType, ElementType>

/**
 * Creates an object where the key is the group id and the value is an array of elements grouped by this id.
 *
 * @param array - The array to group elements from
 * @param fieldName - The name of the field to use as the id
 * @returns An object where the key is the group id and the value is an array of elements grouped by this id
 *
 * @public
 */
export default function group<
  ElementType extends {},
  FieldName extends keyof ElementType,
  GroupIdType extends ElementType[FieldName]
>(
  arr: ElementType[],
  fieldName: FieldName
): GroupIdType extends number | string ? GroupedElements<GroupIdType, ElementType> : never

/**
 * @internal
 */
export default function group<ElementType, GroupIdType extends string | number>(
  array: ElementType[],
  mapper: ((element: ElementType, index: number) => GroupIdType) | (string | number)
): GroupedElements<GroupIdType, ElementType> {
  return array.reduce(
    (acc, element: any, index) => {
      const groupId =
        typeof mapper === 'function' ? mapper(element, index) : element[mapper]
      acc[groupId] = acc[groupId] || []
      acc[groupId].push(element)
      return acc
    },
    {} as { [groupId: string]: ElementType[] }
  ) as GroupedElements<GroupIdType, ElementType>
}

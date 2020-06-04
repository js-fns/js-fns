export default function map<
  ValueType,
  Key extends keyof ValueType,
  ResultType extends ValueType[Key]
>(object: { [key: string]: ValueType }, key: Key): ResultType[]

export default function map<
  ObjectType extends { [key: string]: ValueType },
  ValueType,
  Key extends keyof ObjectType,
  ResultType
>(
  object: ObjectType,
  mapper: (element: ValueType, index: Key) => ResultType
): ResultType[]

export default function map<
  ElementType extends {},
  Key extends keyof ElementType,
  ResultType extends ElementType[Key]
>(array: ElementType[], mapper: Key): ResultType[]

export default function map<ElementType, ResultType>(
  array: ElementType[],
  mapper: (element: ElementType, index: number) => ResultType
): ResultType[]

/**
 * @internal
 */
export default function map(
  array: any,
  mapper: ((element: any, index: any) => any) | string
): any[] {
  if (Array.isArray(array)) {
    if (typeof mapper === 'string') {
      return array.map((element) => element[mapper])
    } else {
      return array.map(mapper)
    }
  } else {
    const keys = Object.keys(array)
    return keys.map((key) => {
      if (typeof mapper === 'string') {
        return array[key][mapper]
      } else {
        return mapper(array[key], key)
      }
    })
  }
}

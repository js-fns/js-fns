/**
 * @internal
 */
export default function intersection<FirstElementType, SecondElementType>(
  firstArray: FirstElementType[],
  secondArray: SecondElementType[]
): Array<FirstElementType & SecondElementType>

/**
 * @internal
 */
export default function intersection<
  FirstElementType,
  SecondElementType,
  ThirdElementType
>(
  firstArray: FirstElementType[],
  secondArray: SecondElementType[],
  thirdArray: ThirdElementType[]
): Array<FirstElementType & SecondElementType & ThirdElementType>

/**
 * @internal
 */
export default function intersection<
  FirstElementType,
  SecondElementType,
  ThirdElementType,
  FourthElementType
>(
  firstArray: FirstElementType[],
  secondArray: SecondElementType[],
  thirdArray: ThirdElementType[],
  fourthArray: FourthElementType[]
): Array<
  FirstElementType & SecondElementType & ThirdElementType & FourthElementType
>

/**
 * @internal
 */
export default function intersection<
  FirstElementType,
  SecondElementType,
  ThirdElementType,
  FourthElementType,
  FifthElementType
>(
  firstArray: FirstElementType[],
  secondArray: SecondElementType[],
  thirdArray: ThirdElementType[],
  fourthArray: FourthElementType[],
  fifthArray: FifthElementType[]
): Array<
  FirstElementType &
    SecondElementType &
    ThirdElementType &
    FourthElementType &
    FifthElementType
>

/**
 * Creates an array with elements present in all given arrays.
 *
 * @param arrays - The array of arrays of elements to get elements from
 * @returns An array with elements present in all given arrays
 *
 * @public
 */
export default function intersection<ElementType>(
  ...arrays: ElementType[][]
): Array<ElementType>

/**
 * @internal
 */
export default function intersection<ElementType>(
  ...arrays: ElementType[][]
): Array<ElementType> {
  const sets = arrays.map((array) => new Set(array))

  const biggestArray = arrays.sort((a, b) => a.length - b.length)[0]
  if (!biggestArray || !biggestArray.length) return []

  return biggestArray.filter((element) => sets.every((set) => set.has(element)))
}

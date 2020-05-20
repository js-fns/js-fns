/**
 * Deeply clones the given value.
 *
 * @param value - The value to clone
 * @returns Deep clone of the given value
 *
 * @public
 */
export default function cloneDeep<ValueType extends unknown>(
  value: ValueType
): ValueType {
  if (!value || !(typeof value === 'object')) return value
  const typeStr = Object.prototype.toString.call(value)
  const newObj: { [key: string]: any } = Object.assign(
    typeStr === '[object Array]' ? [] : {},
    value
  )
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] && typeof newObj[key] === 'object') {
      newObj[key] = cloneDeep(newObj[key])
    }
  })
  return newObj as ValueType
}

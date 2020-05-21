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
  const newObj: { [key: string]: any } = typeStr === '[object Array]' ? [] : {}
  const valueObj = value as { [key: string]: any }
  Object.keys(newObj).forEach((key) => {
    if (valueObj[key] && typeof valueObj[key] === 'object') {
      newObj[key] = cloneDeep(valueObj[key])
    } else {
      newObj[key] = valueObj[key]
    }
  })
  return newObj as ValueType
}

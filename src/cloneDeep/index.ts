export default function cloneDeep<InputType extends unknown>(
  input: InputType
): InputType {
  if (!input || !(typeof input === 'object')) return input
  const typeStr = Object.prototype.toString.call(input)
  const newObj: { [key: string]: any } = Object.assign(
    typeStr === '[object Array]' ? [] : {},
    input
  )
  Object.keys(newObj).forEach(key => {
    if (newObj[key] && typeof newObj[key] === 'object') {
      newObj[key] = cloneDeep(newObj[key])
    }
  })
  return newObj as InputType
}

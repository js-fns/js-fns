import assert from 'assert'
import pick from '.'

describe('pick', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
  }

  it('picks only required keys from object', () => {
    const result = pick(obj, ['a', 'b'])
    assert.deepEqual(result, { a: 1, b: 2 })
  })

  it('returns empty object if none of the keys are found', () => {
    // @ts-expect-error
    const result = pick(obj, ['nope', 'nah'])
    assert.deepEqual(result, {})
  })

  it('does not change orignal object', () => {
    const clone = { ...obj }
    pick(obj, ['a', 'b'])
    assert.deepEqual(obj, clone)
  })
})

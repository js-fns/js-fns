import assert from 'assert'
import pick from '.'

describe('pick', function() {
  const obj = {
    a: 1,
    b: 2,
    c: 3
  }

  it('picks only required keys from object', function() {
    const result = pick(obj, ['a', 'b'])
    assert.deepEqual(result, { a: 1, b: 2 })
  })

  it('returns the same object when none of the keys are found', function() {
    // @ts-expect-error
    const result = pick(obj, ['nope', 'nah'])
    assert.deepEqual(result, {})
  })

  it('does not change orignal array', function() {
    const result = pick(obj, ['a', 'b'])
    assert.deepEqual(obj, { a: 1, b: 2, c: 3 })
  })
})

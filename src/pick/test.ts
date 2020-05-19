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
})

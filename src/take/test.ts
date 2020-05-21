import assert from 'assert'
import take from '.'

describe('take', function () {
  var array = [1, 2, 3, 4]

  it('takes the first three elements', function () {
    assert.deepEqual(take(array, 3), [1, 2, 3])
  })

  it('takes the first element by default', function () {
    assert.deepEqual(take(array), [1])
  })

  it('should not modify original array', function () {
    const clone = array.concat([])
    take(array, 2)
    assert.deepEqual(array, clone)
  })

  it('returns an empty array when howMany is less than 1', function () {
    assert.deepEqual(take(array, 0), [])
    assert.deepEqual(take(array, -2), [])
  })

  it('returns an array when howMany is more that array length', function () {
    assert.deepEqual(take(array, 5), array)
  })
})

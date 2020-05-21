import assert from 'assert'
import drop from './index'

describe('drop', function () {
  var array = [1, 2, 3]

  it('drops the first two elements', function () {
    assert.deepEqual(drop(array, 2), [3])
  })

  it('drops the first element by default', function () {
    assert.deepEqual(drop(array), [2, 3])
  })

  it('does not modify original array', function () {
    drop(array, 2)
    assert.deepEqual(array, array)
  })

  it('returns all elements when n < 1', function () {
    assert.deepEqual(drop(array, -1), array)
    assert.deepEqual(drop(array, 0), array)
  })

  it('returns an empty array when n >= length', function () {
    assert.deepEqual(drop(array, 4), [])
  })
})

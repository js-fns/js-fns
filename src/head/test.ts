import assert from 'assert'
import head from '.'

describe('head', function () {
  it('returns the first element', function () {
    assert(head([1, 2, 3]) === 1)
    assert.deepEqual(head([[1, 2], 3]), [1, 2])
  })

  it('returns undefined if the array is empty', () => {
    assert(head([]) === undefined)
  })
})

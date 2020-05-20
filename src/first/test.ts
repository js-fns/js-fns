import assert from 'assert'
import first from '.'

describe('first', function () {
  it('returns the first element', function () {
    assert(first([1, 2, 3]) === 1)
    assert.deepEqual(first([[1, 2], 3]), [1, 2])
  })

  it('returns undefined if the array is empty', () => {
    assert(first([]) === undefined)
  })
})

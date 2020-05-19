import assert from 'assert'
import last from '.'

describe('last', function() {
  const array = [1, 2, 3, 4]

  it('returns the last element', function() {
    const result = last(array)
    assert(result === 4)
  })

  it('returns undefined if the array is empty', function() {
    const result = last([])
    assert(result === undefined)
  })
})

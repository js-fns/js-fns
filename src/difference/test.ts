import assert from 'assert'
import difference from '.'

describe('difference', () => {
  it('returns an array with first argument values not included into the second one', () => {
    assert.deepEqual(difference([2, 1], [2, 3]), [1])
  })
})

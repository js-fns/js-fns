import assert from 'assert'
import chunk from '.'

describe('chunk', () => {
  it('groups the elements intro arrays of the given size', () => {
    assert.deepEqual(chunk([1, 2, 3], 2), [[1, 2], [3]])
  })

  it('handles empty arrays', () => {
    assert.deepEqual(chunk([], 10), [])
  })
})

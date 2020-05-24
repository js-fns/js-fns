import assert from 'assert'
import union from '.'

describe('union', () => {
  it('returns an array with all unique elements from the given arrays', () => {
    const result = union([2, 1], [2, 3])
    assert.deepEqual(result, [2, 1, 3])
  })

  it('allows to pass more than two arrays', () => {
    const result = union([
      [2, 1],
      [2, 3],
      [4, 5],
    ])
    assert.deepEqual(result, [2, 1, 3, 4, 5])
  })
})

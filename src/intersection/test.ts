import assert from 'assert'
import intersection from '.'

describe('intersection', () => {
  it('returns values present in both arrays', () => {
    const result = intersection([1, 'a', 'b', 2, 3, 'c'], [1, 2, 3, 4])
    assert.deepEqual(result, [1, 2, 3])
  })

  it('returns values present in the given arrays', () => {
    const result = intersection([
      [1, 'a', 'b', 2, 3, 'c'],
      [1, 2, 3, 4],
      [1, 3, 5],
    ])
    assert.deepEqual(result, [1, 3])
  })

  it('returns empty array when the target arrays are empty', () => {
    assert.deepEqual(intersection([[], [], []]), [])
    assert.deepEqual(intersection([], []), [])
  })
})

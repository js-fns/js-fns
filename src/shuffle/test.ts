import assert from 'assert'
import shuffle from '.'

describe('shuffle test', () => {
  it('has elements in different order but equal after sorting each', () => {
    assert.notDeepEqual(shuffle([1, 2, 3]), [1, 2, 3])

    const arr = [1, 2, 3, 4]
    const comparator = (a: number, b: number) => a - b
    assert.deepEqual(
      arr.sort(comparator),
      shuffle([1, 2, 3, 4]).sort(comparator)
    )
  })
})

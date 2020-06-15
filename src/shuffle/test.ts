import assert from 'assert'
import shuffle from '.'

describe('shuffle test', () => {
  it('has elements in different order but equal after sort', () => {
    assert.notDeepEqual(shuffle([1, 2, 3]), [1, 2, 3])

    assert.deepEqual(
      shuffle([1, 2, 3, 4]).sort((a, b) => a - b),
      [1, 2, 3, 4]
    )
  })
})

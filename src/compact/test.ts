import assert from 'assert'
import compact from '.'

describe('compact', () => {
  it('removes null and undefined values from the array', () => {
    assert.deepEqual(
      compact([null, 1, null, undefined, 2, null, 3, undefined]),
      [1, 2, 3]
    )
  })
})

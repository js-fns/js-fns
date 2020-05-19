import assert from 'assert'
import sweep from '.'

describe('sweep', () => {
  it('removes null and undefined values from the array', () => {
    assert.deepEqual(sweep([null, 1, null, undefined, 2, null, 3, undefined]), [
      1,
      2,
      3,
    ])
  })
})

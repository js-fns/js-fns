import assert from 'assert'
import sweep from '.'

describe('sweep', () => {
  it('removes null and undefined values from the array', () => {
    const result = sweep([
      null,
      1,
      null,
      undefined,
      2,
      null,
      3,
      undefined,
      0,
      false,
      '',
    ])
    assert.deepEqual(result, [1, 2, 3, 0, false, ''])
  })
})

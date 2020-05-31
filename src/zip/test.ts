import assert from 'assert'
import zip from '.'

describe('zip', () => {
  it('zips', () => {
    const result = zip(['a'], [1, 2, 3], [true, false], [true, false])

    assert.deepEqual(result, [
      ['a', 1, true],
      [undefined, 2, false],
      [undefined, 3, undefined],
    ])
  })
})

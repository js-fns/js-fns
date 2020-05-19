import assert from 'assert'
import truthy from '.'

describe('truthy', () => {
  it('removes falsy values from the array', () => {
    const result = truthy([
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
    assert.deepEqual(result, [1, 2, 3])
  })
})

import assert from 'assert'
import values from '.'

describe('values', () => {
  it('returns the values correctly', () => {
    assert.deepEqual(values({ a: 1, b: 2, c: 3 }), [1, 2, 3])
  })

  it('returns an empty array for an empty object', () => {
    assert.deepEqual(values({}), [])
  })
})

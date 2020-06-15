import assert from 'assert'
import isEmpty from '.'

describe('isEmpty test', () => {
  it('checks if isEmpty works properly on arrays', () => {
    assert.equal(isEmpty([1, 2, 3]), false)
    assert.equal(isEmpty([]), true)
  })
  it('checks if isEmpty works properly on objects', () => {
    assert.equal(isEmpty({ a: 1, b: 2 }), false)
    assert.equal(isEmpty({}), true)
  })
})

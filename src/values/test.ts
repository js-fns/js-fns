import assert from 'assert'
import values from '.'

describe('values', () => {
  it('returns the values correctly', () => {
    assert.deepEqual(values({ a: 1, b: 2, c: 3 }), [1, 2, 3])
  })

  it('only returns the properties of the given object and not inherited ones', () => {
    const obj1 = { a: 1 }
    const obj2 = Object.create(obj1)
    obj2.b = 2
    obj2.c = 3

    assert.deepEqual(values(obj2), [2, 3])
  })

  it('returns an empty array for an empty object', () => {
    assert.deepEqual(values({}), [])
  })

  it('returns an array of characters of the given string', () => {
    assert.deepEqual(values('abcd'), ['a', 'b', 'c', 'd'])
  })

  it('returns the same array if an array is passed', () => {
    assert.deepEqual(values([1, 2, 3]), [1, 2, 3])
  })
})

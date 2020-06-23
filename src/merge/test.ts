import assert from 'assert'
import merge from '.'

describe('merge', function () {
  it('merges objects', () => {
    const firstObject = { a: 1, b: 2 }
    const secondObject = { c: 3, d: 4 }
    const result = merge(firstObject, secondObject)
    assert.deepEqual(result, { a: 1, b: 2, c: 3, d: 4 })
  })

  it('merges objects deeply', () => {
    const firstObject = { a: 1, b: { d: { e: 4 } } }
    const secondObject = { b: { c: 3 }, f: 5, g: { h: 6 } }
    const result = merge(firstObject, secondObject)
    assert.deepEqual(result, {
      a: 1,
      b: { c: 3, d: { e: 4 } },
      f: 5,
      g: { h: 6 },
    })
  })
})

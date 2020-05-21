import assert from 'assert'
import cloneDeep from '.'

describe('cloneDeep', function () {
  it('bypass primitives', () => {
    assert(cloneDeep(1) === 1)
    assert(cloneDeep('hello') === 'hello')
    assert(cloneDeep(false) === false)
    assert(cloneDeep(null) === null)
    assert(cloneDeep(undefined) === undefined)
  })

  it('clones flat objects', () => {
    const object = { a: 1, b: 2, c: 3, d: 4 }
    const result = cloneDeep(object)
    assert.deepEqual(result, { a: 1, b: 2, c: 3, d: 4 })
    assert(result !== object)
  })

  it('clones flat arrays', () => {
    const array = [1, 2, 3, 4]
    const result = cloneDeep(array)
    assert.deepEqual(result, [1, 2, 3, 4])
    assert(result !== array)
  })

  it('clones nested data structures', () => {
    const data = { a: [1, 2, 3, 4], b: 2, c: { d: { e: 5 }, f: 6 } }
    const result = cloneDeep(data)
    assert.deepEqual(result, {
      a: [1, 2, 3, 4],
      b: 2,
      c: { d: { e: 5 }, f: 6 },
    })
    assert(result !== data)
    assert(result.a !== data.a)
    assert(result.c !== data.c)
    assert(result.c.d !== data.c.d)
  })
})

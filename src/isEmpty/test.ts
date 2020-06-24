import assert from 'assert'
import isEmpty from '.'

describe('isEmpty test', () => {
  it('checks if it works on arrays, strings, and buffers', () => {
    assert.equal(isEmpty([1, 2, 3]), false)
    assert.equal(isEmpty([]), true)

    assert.equal(isEmpty(''), true)
    assert.equal(isEmpty('abcd'), false)

    assert.equal(isEmpty(Buffer.alloc(0)), true)
    assert.equal(isEmpty(Buffer.alloc(10)), false)
  })

  it('checks if it works on objects', () => {
    assert.equal(isEmpty({ a: 1, b: 2 }), false)
    assert.equal(isEmpty({}), true)
  })

  it('checks if it works on null and undefined', () => {
    assert.equal(isEmpty(), true)
    assert.equal(isEmpty(undefined), true)
    assert.equal(isEmpty(null), true)
  })

  it('checks if it works on numbers, symbols, and regex', () => {
    assert.equal(isEmpty(1), true)
    assert.equal(isEmpty(NaN), true)

    let x = Symbol()
    assert.equal(isEmpty(x), true)

    assert.equal(isEmpty(/abc/), true)
  })

  it('checks if it works on maps and sets', () => {
    let m = new Map<string, string>()
    assert.equal(isEmpty(m), true)
    m.set('abc', 'def')
    assert.equal(isEmpty(m), false)

    let s = new Set([2, 3, 4])
    assert.equal(isEmpty(s), false)
    s.clear()
    assert.equal(isEmpty(s), true)
  })
})

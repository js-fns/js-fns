import assert from 'assert'
import omit from '.'

describe('omit', function() {
  const object = { a: 1, b: 2, c: 3, d: 4 }

  it('omits a single element', function() {
    const result = omit(object, 'b')
    assert.deepEqual(result, { a: 1, c: 3, d: 4 })
  })

  it('omits a bunch of keys', () => {
    const result = omit(object, ['b', 'd'])
    assert.deepEqual(result, { a: 1, c: 3 })
  })

  it('ignores missing keys', () => {
    // @ts-expect-error
    assert.deepEqual(omit(object, 'nope'), object)
    // @ts-expect-error
    assert.deepEqual(omit(object, ['nope', 'nah']), object)
  })

  it('does not mutate the input', () => {
    const input = { ...object }
    omit(input, 'a')
    assert.deepEqual(input, object)
  })
})

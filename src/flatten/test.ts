import assert from 'assert'
import flatten from '.'

describe('flatten', function() {
  const array = [1, [2, 3], [4, 5, [6]], 7]

  it('groups array items by iteratee result', function() {
    const result = flatten(array)
    assert.deepEqual(result, [1, 2, 3, 4, 5, [6], 7])
  })

  it('does not mutate the input', () => {
    const input = array.concat([])
    flatten(input)
    assert.deepEqual(input, array)
  })
})

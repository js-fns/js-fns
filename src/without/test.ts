import assert from 'assert'
import without from '.'

describe('without', function() {
  const array = ['with', 'or', 'without', 'you']

  it('returns the last element', function() {
    const result = without(array, 'with')
    assert.deepEqual(result, ['or', 'without', 'you'])
  })

  it('returns the same array if the given element is not found', () => {
    const result = without(array, 'nope')
    assert.deepEqual(result, ['with', 'or', 'without', 'you'])
  })

  it('does not mutate the input', () => {
    const input = array.concat([])
    without(array, 'with')
    assert.deepEqual(input, array)
  })
})

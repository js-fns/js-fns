import assert from 'assert'
import remove from '.'
import { expectType } from '../../test/utils'

describe('remove', function () {
  const array = ['with', 'or', 'without', 'you']

  it('removes the given element from the array', function () {
    const result = remove(array, 'with')
    assert.deepEqual(result, ['or', 'without', 'you'])
  })

  it('infers type from the array', () => {
    // @ts-expect-error
    const result = remove([1, 2, 3], undefined)
    expectType<number[]>(result)
  })

  it('returns the same array if the given element is not found', () => {
    const result = remove(array, 'nope')
    assert.deepEqual(result, ['with', 'or', 'without', 'you'])
  })

  it('does not mutate the input', () => {
    const input = array.concat([])
    remove(array, 'with')
    assert.deepEqual(input, array)
  })
})

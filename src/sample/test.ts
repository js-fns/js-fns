import assert from 'assert'
import sample from '.'

describe('sample', function () {
  var array = [1, 2, 3]

  it('returns random element from the given array', function () {
    const result = sample(array)
    assert(typeof result === 'number' && array.indexOf(result) !== -1)
  })

  it('returns undefined if the array is empty', function () {
    const result = sample([])
    assert(result === undefined)
  })
})

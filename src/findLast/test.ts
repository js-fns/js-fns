import assert from 'assert'
import findLast from '.'

describe('findLast', function () {
  var array = [1, 2, 3]

  it('finds the last element in the array', function () {
    assert(findLast(array, (i) => i > 1) === 3)
  })

  it('returns undefined', function () {
    assert(findLast(array, (i) => i === 420) === undefined)
  })
})

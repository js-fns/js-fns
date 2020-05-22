import assert from 'assert'
import find from '.'

describe('find', function () {
  var array = [1, 2, 3]

  it('finds first element by condition', function () {
    assert(find(array, (i) => i > 1) === 2)
  })

  it('returns undefined', function () {
    assert(find(array, (i) => i === 420) === undefined)
  })
})

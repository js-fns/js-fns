import assert from 'assert'
import find from '.'
import sinon from 'sinon'

describe('find', function () {
  var array = [1, 2, 3]

  it('finds first element by condition', function () {
    assert(find(array, (i) => i > 1) === 2)
  })

  it('stops execution as soon as it finds the element', function () {
    sinon.stub()
    const matcher = sinon.stub()
    matcher.withArgs(1).returns(false)
    matcher.withArgs(2).returns(true)
    matcher.withArgs(3).returns(true)

    assert(find(array, matcher) === 2)
    assert(matcher.callCount === 2)
  })

  it('returns undefined', function () {
    assert(find(array, (i) => i === 420) === undefined)
  })
})

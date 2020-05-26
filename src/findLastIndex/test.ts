import assert from 'assert'
import findLastIndex from '.'
import sinon from 'sinon'

describe('findLast', () => {
  const array = [1, 2, 3]

  it('finds the last element index in the array', () => {
    assert(findLastIndex(array, (i) => i > 1) === 2)
  })

  it('stops execution as soon as it finds the element', () => {
    sinon.stub()
    const matcher = sinon.stub()
    matcher.withArgs(1).returns(true)
    matcher.withArgs(2).returns(true)
    matcher.withArgs(3).returns(false)

    assert(findLastIndex(array, matcher) === 1)
    assert(matcher.callCount === 2)
  })

  it('returns -1 if the element is not found', () => {
    assert(findLastIndex(array, (i) => i === 420) === -1)
  })
})

import assert from 'assert'
import findIndex from '.'
import sinon from 'sinon'

describe('findIndex', () => {
  const array = [1, 2, 3]

  it('finds first element index by condition', () => {
    assert(findIndex(array, (i) => i > 1) === 1)
  })

  it('stops execution as soon as it finds the element', () => {
    sinon.stub()
    const matcher = sinon.stub()
    matcher.withArgs(1).returns(false)
    matcher.withArgs(2).returns(true)
    matcher.withArgs(3).returns(true)

    assert(findIndex(array, matcher) === 1)
    assert(matcher.callCount === 2)
  })

  it('returns -1 if element is not found', () => {
    assert(findIndex(array, (i) => i === 420) === -1)
  })
})

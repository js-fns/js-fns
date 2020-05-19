import assert from 'assert'
import uniq from '.'

describe('uniq', () => {
  it('return unique entries', () => {
    const array = [1, 2, 1, 4]
    assert.deepEqual(uniq(array), [1, 2, 4])
  })

  it('accepts mapper function', () => {
    const array = [{ userId: 1 }, { userId: 2 }, { userId: 1 }]
    assert.deepEqual(uniq(array, x => x.userId), [{ userId: 1 }, { userId: 2 }])
  })

  it('accepts mapper string', () => {
    const array = [{ userId: 1 }, { userId: 2 }, { userId: 1 }]
    assert.deepEqual(uniq(array, 'userId'), [{ userId: 1 }, { userId: 2 }])
  })
})

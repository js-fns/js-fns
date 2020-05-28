import assert from 'assert'
import fromEntries from '.'

describe('fromEntries', function () {
  it('returns an object from array', function () {
    const result = fromEntries([
      ['a', 1],
      ['b', 'c'],
      [2, { d: 3 }],
    ])
    assert.deepEqual(result, { a: 1, b: 'c', '2': { d: 3 } })
  })

  it('returns an empty object if the array is empty', () => {
    assert.deepEqual(fromEntries([]), {})
  })
})

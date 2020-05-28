import assert from 'assert'
import entries from '.'

describe('entries', () => {
  const object = {
    2: 3,
    a: 'B',
    c: { d: [] },
  }

  it('returns entries array', () => {
    const result = entries(object)
    assert.deepEqual(result, [
      ['2', 3],
      ['a', 'B'],
      ['c', { d: [] }],
    ])
  })

  it('returns empty array if the object is empty', () => {
    const result = entries({})
    assert.deepEqual(result, [])
  })
})

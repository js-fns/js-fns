import assert from 'assert'
import entries from '.'
import { expectType } from 'ts-expect'

describe('entries', () => {
  const object = {
    2: 3,
    a: 'B',
    c: { d: [] },
  }

  it('returns entries array', () => {
    const result = entries(object)
    expectType<number | string | { d: any[] }>(result[0][1])
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

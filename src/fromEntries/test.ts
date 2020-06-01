import assert from 'assert'
import fromEntries from '.'
import entries from '../entries'
import { expectType } from 'ts-expect'

describe('fromEntries', function () {
  it('returns an object from array', function () {
    const result = fromEntries([
      ['a', 1],
      ['b', 'c'],
      [2, { d: 3 }],
    ])
    expectType<{ [key: string]: string | number | { d: number } }>(result)
    assert.deepEqual(result, { a: 1, b: 'c', '2': { d: 3 } })
  })

  it('allows to restore entries result', () => {
    type User = { firstName: string; lastName?: string; age: number }
    const user: User = { firstName: 'Sasha', age: 33 }
    const result = entries(user)
    const restoredUser = fromEntries(result)
    expectType<User>(restoredUser)
  })

  it('returns an empty object if the array is empty', () => {
    assert.deepEqual(fromEntries([]), {})
  })
})

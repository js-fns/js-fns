import assert from 'assert'
import { expectType } from 'ts-expect'
import zip from '.'

describe('zip', () => {
  it('zips arrays together', () => {
    const result = zip(['a'], [1, 2, 3], [true, false])
    expectType<(string | number | boolean)[][]>(result)
    assert.deepEqual(result, [
      ['a', 1, true],
      [undefined, 2, false],
      [undefined, 3, undefined],
    ])
  })

  it('zips one argument correctly', () => {
    const result = zip(['a', 'b'])
    expectType<string[][]>(result)
    assert.deepEqual(result, [['a'], ['b']])
  })
})

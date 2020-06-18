import assert from 'assert'
import reduceRight from '.'
import { expectType } from '../../test/utils'

describe('reduceRight test', () => {
  it('returns the reverse of the array provided', () => {
    assert.deepEqual(
      reduceRight(
        [1, 2, 3],
        (acc, val) => {
          acc.push(val)
          return acc
        },
        []
      ),
      [3, 2, 1]
    )
  })

  it('performs a reduce right correctly on an object', () => {
    type AbcKey = '1' | '2' | '3'
    type AbcValue = 'a' | 'b' | 'c'
    type AccType = { [key in AbcKey]: string }
    const object: { [key in AbcKey]: AbcValue } = { 1: 'a', 2: 'b', 3: 'c' }
    const result = reduceRight(
      object,
      (acc, value, key) => {
        expectType<AbcKey>(key)
        expectType<AbcValue>(value)
        acc[key] = value.repeat(2)
        return acc
      },
      {} as AccType
    )
    expectType<AccType>(result)
    assert.deepEqual(result, {
      1: 'aa',
      2: 'bb',
      3: 'cc',
    })
  })
})

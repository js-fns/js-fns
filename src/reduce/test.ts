import assert from 'assert'
import reduce from '.'
import { expectType } from '../../test/utils'

describe('reduce', () => {
  describe('of object', () => {
    it('accepts function as reducer', () => {
      const object = { a: 1, b: 2, c: 3 }
      const result = reduce(object, (acc, value) => acc + value, 0)
      expectType<number>(result)
      assert(result === 6)
    })

    it('passes keys to reducer function', () => {
      type AbcKey = '1' | '2' | '3'
      type AbcValue = 'a' | 'b' | 'c'
      const object: { [key in AbcKey]: AbcValue } = { 1: 'a', 2: 'b', 3: 'c' }
      const result = reduce(
        object,
        (acc, value, key) => {
          expectType<AbcKey>(key)
          expectType<AbcValue>(value)
          return acc + parseInt(key)
        },
        0
      )
      expectType<number>(result)
      assert(result === 6)
    })
  })

  describe('of array', () => {
    it('accepts function as reducer', () => {
      const array = [1, 2, 3]
      const result = reduce(array, (acc, el) => acc + el, 0)
      expectType<number>(result)
      assert(result === 6)
    })

    it('passes indices to reducer function', () => {
      const array = [1, 2, 3]
      const result = reduce(
        array,
        (acc, el, i) => {
          expectType<number>(el)
          expectType<number>(i)
          return acc + i
        },
        0
      )
      expectType<number>(result)
      assert(result === 3)
    })
  })
})

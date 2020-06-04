import assert from 'assert'
import map from '.'
import { expectType } from '../../test/utils'

describe('map', function () {
  describe('of object', () => {
    it('accepts function as mapper', () => {
      const object = { a: '1', b: '2', c: '3' }
      const result = map(object, (value) => value + '1')
      expectType<string[]>(result)
      assert.deepEqual(result, ['11', '21', '31'])
    })

    it('passes indecies to mapper function', () => {
      const object = { a: '1', b: '2', c: '3' }
      const result = map(object, (value, key) => key)
      expectType<string[]>(result)
      assert.deepEqual(result, ['a', 'b', 'c'])
    })

    it('accepts string as mapper', () => {
      const object = { a: { id: 111 }, b: { id: 222 } }
      const result = map(object, 'id')
      expectType<number[]>(result)
      assert.deepEqual(result, [111, 222])
    })
  })

  describe('of array', () => {
    it('accepts function as mapper', () => {
      const array = ['1', '2', '3']
      const result = map(array, (el) => el + '1')
      expectType<string[]>(result)
      assert.deepEqual(result, ['11', '21', '31'])
    })

    it('passes indecies to mapper function', () => {
      const array = [1, 2, 3]
      const result = map(array, (el, i) => i)
      expectType<number[]>(result)
      assert.deepEqual(result, [0, 1, 2])
    })

    it('accepts string as mapper', () => {
      const array = [
        {
          id: 111,
        },
        {
          id: 222,
        },
      ]
      const result = map(array, 'id')
      expectType<number[]>(result)
      assert.deepEqual(result, [111, 222])
    })
  })

  // it('omits a single element', function () {
  //   const result = omit(object, 'b')
  //   assert.deepEqual(result, { a: 1, c: 3, d: 4 })
  // })

  // it('omits a bunch of keys', () => {
  //   const result = omit(object, ['b', 'd'])
  //   assert.deepEqual(result, { a: 1, c: 3 })
  // })

  // it('ignores missing keys', () => {
  //   // @ts-expect-error
  //   assert.deepEqual(omit(object, 'nope'), object)
  //   // @ts-expect-error
  //   assert.deepEqual(omit(object, ['nope', 'nah']), object)
  // })

  // it('does not mutate the input', () => {
  //   const input = { ...object }
  //   omit(input, 'a')
  //   assert.deepEqual(input, object)
  // })
})

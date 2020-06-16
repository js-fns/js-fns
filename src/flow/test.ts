import assert from 'assert'
import flow from '.'
import { expectType } from '../../test/utils'

describe('flow', () => {
  it('performs the basic flow function', () => {
    const fn = flow(
      (str: string) => str.repeat(3),
      (repeated) => repeated.toUpperCase()
    )

    const result = fn('abc')
    expectType<string>(result)
    assert.equal(result, 'ABCABCABC')
  })

  it('performs flow on different types', () => {
    const fn = flow(
      (x: number) => x.toString(),
      (y) => `A number: ${y}`,
      (z) => z.slice(2)
    )

    const result = fn(23)
    expectType<string>(result)
    assert.equal(result, 'number: 23')
  })
})

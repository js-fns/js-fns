import assert from 'assert'
import reduceRight from '.'

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
})

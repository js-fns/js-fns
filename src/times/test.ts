import assert from 'assert'
import times from '.'

describe('times', () => {
  it('returns an array from executed function', () => {
    const result = times(3, (i) => i.toString())
    assert.deepEqual(result, ['0', '1', '2'])
  })

  it('returns an array with indexes by default', () => {
    const result = times(3)
    assert.deepEqual(result, [0, 1, 2])
  })

  it('returns an empty array for n < 1', () => {
    const result = times(0, (i) => i.toString())
    assert.deepEqual(result, [])
  })
})

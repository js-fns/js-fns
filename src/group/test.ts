import assert from 'assert'
import group from '.'

describe('group', function() {
  const array = [
    new Date(1987, 1, 11),
    new Date(1989, 5, 6),
    new Date(1989, 6, 10),
    new Date(1995, 6, 2)
  ]

  it('groups array items by iteratee result', function() {
    const result = group(array, date => Math.floor(date.getFullYear() / 10))
    assert.deepEqual(result, {
      '198': [
        new Date(1987, 1, 11),
        new Date(1989, 5, 6),
        new Date(1989, 6, 10)
      ],

      '199': [new Date(1995, 6, 2)]
    })
  })
})

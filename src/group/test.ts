import assert from 'assert'
import group from '.'

describe('group', function() {
  const array = [
    new Date(1987, 1, 11),
    new Date(1989, 5, 6),
    new Date(1989, 6, 10),
    new Date(1995, 6, 2)
  ]

  const data = [
    {
      userId: 1,
      action: 'open'
    },
    {
      userId: 2,
      action: 'open'
    },
    {
      userId: 1,
      action: 'close'
    }
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

  it('groups array items by object key', function() {
    const result = group(data, 'userId')
    assert.deepEqual(result, {
      1: [
        {
          userId: 1,
          action: 'open'
        },
        {
          userId: 1,
          action: 'close'
        }
      ],
      2: [
        {
          userId: 2,
          action: 'open'
        }
      ]
    })
  })

  it('groups array items by mapper', function() {
    const result = group(data, x => x.userId)
    assert.deepEqual(result, {
      1: [
        {
          userId: 1,
          action: 'open'
        },
        {
          userId: 1,
          action: 'close'
        }
      ],
      2: [
        {
          userId: 2,
          action: 'open'
        }
      ]
    })
  })
})

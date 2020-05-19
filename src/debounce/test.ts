import assert from 'assert'
import debounce from '.'

describe('debounce', function() {
  it('executes function after given wait time since the last call', done => {
    let times = 0
    const fn = debounce((add: number) => (times += add), 50)
    fn(66)
    setTimeout(() => {
      fn(35)
      setTimeout(() => {
        fn(7)
        setTimeout(() => {
          assert(times === 7)
          done()
        }, 50)
      }, 5)
    }, 5)
  })
})

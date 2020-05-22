import assert from 'assert'
import throttle from '.'

describe('debounce', () => {
  it('executes function after given wait time since the last call', (done) => {
    let times = 0
    const fn = throttle((add: number) => (times += add), 10)
    const interval = setInterval(() => {
      fn(1)
    }, 2)
    setTimeout(() => {
      clearInterval(interval)
      assert(times === 5)
      done()
    }, 55)
  })
})

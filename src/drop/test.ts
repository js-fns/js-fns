import assert from 'assert';
import drop from './index';

describe('drop', function() {
  var array = [1, 2, 3];

  it('should drop the first two elements', function() {
    assert.deepStrictEqual(drop(array, 2), [3]);
  });

  it('should not modify original array', function () {
    drop(array, 2)
    assert.deepStrictEqual(array, array);
  })

  it('should return all elements when `n` < `1`', function() {
    assert.deepStrictEqual(drop(array, -1), array);
    assert.deepStrictEqual(drop(array, 0), array);
  });

  it('should return an empty array when `n` >= `length`', function() {
    assert.deepStrictEqual(drop(array, 4), []);
  });
});

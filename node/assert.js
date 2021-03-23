const assert = require('assert');

const tracker = new assert.CallTracker();

function func() { };
const callfn = tracker.calls(func, 1);

callfn();

process.on('exit', () => {
  tracker.verify();
})

const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 2,
  },
};

assert.deepStrictEqual(obj2, obj3);
assert.strictEqual(1, 1);


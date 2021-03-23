const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(excutor) {
  let self = this;
  self.status = PENDING;
  self.onFulfilled = []; //成功的回调
  self.onRejected = []; //失败的回调

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach(fn => fn());//2.2.6.1
    }
  } 

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach(fn => fn());//2.2.6.2
    }
  }

  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled !== 'function' ? value => value : onFulfilled; //2.2.7.3  2.2.5
  onRejected = typeof onRejected !== 'function' ? reason => { throw reason; } : onRejected;//2.2.7.4  2.2.5

  let self = this;
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });

      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  })

  return promise2; //2.2.7
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) { //2.3.1
    reject(new TypeError('chaining cycle'));
  }

  if ((x && typeof x === 'object') || typeof x === 'function') { //2.3.3
    let used;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
        x,
        (y) => {
          if (used) return;
          used = true;
          resolvePromise(promise2, y, resolve, reject); // 2.3.3.3.1
        },
        (r) => {
          if (used) return;
          used = true;
          reject(r);// 2.3.3.3.2
        })
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    resolve(x) // 2.3.4
  }
}

module.exports = Promise;

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });

  return dfd;
};
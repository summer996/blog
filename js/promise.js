const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(excutor) {
  let self = this;
  self.status = PENDING;
  self.onFulfilled = [];
  self.onRejected = [];

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach((fn) => fn())
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach(fn => fn())
    }
  }

  try {
    excutor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected){
  //如果两个参数不是函数，就以上一个返回值为值
  onFulfilled =
    typeof onFulfilled !== 'function' ? (value) => value : onFulfilled;
  onRejected =
    typeof onRejected !== 'function' ? (reason) => { throw reason } : onRejected;

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
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
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
            reject(e);
          }
        });
      });
    }
  });
  return promise2;
};

function resolvePromise (promise2, x, resolve, reject){
  if (promise2 === x) {
    reject(new TypeError('chaining cycle'))
  }

  if ((x && typeof x === 'object') || typeof x === 'function') {
    let used;

    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (used) return;
            used = true;
            reject(r);
          }
        );
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
    resolve(x);
  }
} 

module.exports = Promise;

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })

  return dfd;
}

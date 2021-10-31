class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.value = null;
    this.reason = null;
    this.onFullFilledFn = [];
    this.onRejectFn = [];

    let resolve = (value) => {
      this.value = value;
      this.state = 'fulfilled';
      this.onFullFilledFn.forEach(fn => fn());
    }

    let reject = (reason) => {
      this.reason = reason;
      this.state = 'rejected';
      this.onRejectFn.forEach(fn => fn());
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      this.state = 'rejected';
      reject(err);
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value;
    onRejected = typeof onRejected === 'rejected' ? onRejected : reason => { throw reason };
    
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      }
      if (this.state === 'reject') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        })
      }
      if (this.state === 'pending') {
        this.onFullFilledFn.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          })
        })

        this.onRejectFn.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          })
        })
      }
    })
    return promise2;
  }

  resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
      return reject(new TypeError('循环调用promise'))
    }

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      let called;
      let then = x.then;
      try {
        if (typeof then === 'function') {
          then.call(x, (y) => {
            if (called) return;
            called = true;
            this.resolvePromise(promise, y, resolve, reject);
          }, (err) => {
            if (called) return;
            called = true;
            reject(err);
          })
        } else {
          resolve(x);
        }
      } catch (err) {
        if (called) return;
        called = true;
        reject(err);
      }
    } else {
      resolve(x);
    }
  }
}



class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = '';
    this.reason = '';
    this.onFullFilledFn = [];
    this.onRejectFn = [];
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFullFilledFn.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectFn.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw Error(error) };
    const promise = new Promise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulFilled(this.value);
            this.resolvePromise(promise, x, resolve, reject)
          } catch (err) {
            reject(err);
          }
        })
      }
  
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.value);
            this.resolvePromise(promise, x, resolve, reject)
          } catch (err) {
            reject(err);
          }
        })
      }
  
      if (this.state === 'pending') {
        this.onFullFilledFn.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              this.resolvePromise(promise, x, resolve, reject)
            } catch (err) {
              reject(err);
            }
          })
        })

        this.onRejectFn.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.value);
              this.resolvePromise(promise, x, resolve, reject)
            } catch (err) {
              reject(err);
            }
          })
        })
      }
    })
    return promise;
    
  }

  resolvePromise(promise, x, resolve, reject) {
    if (x === promise) {
      return reject(new TypeError('循环调用'));
    }

    if (x !== null && typeof x === 'object' || typeof x === 'function') {
      let called;
      try {
        let then = x.then;
        if (typeof then === 'function') {
          then.call(x, (y) => {
            if (called) return;
            called = true;
            this.resolvePromise(promise, y, resolve, reject);
          }, (err) => {
            if (called) return;
            called = true;
            reject(err);
          })
        } else {
          resolve(x);
        }
      } catch (err) {
        if (called) return;
        called = true;
        reject(err);
      }
    } else {
      //就是一个基本类型
      resolve(x);
    }
  }
}
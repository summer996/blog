/**
 * 1、new promise时，需要传递一个executor执行器，执行器立即执行
 * 2、executor接收两个两个参数，resolve和reject
 * 3、promise只能从pending到fulfilled，或者从pending到rejected
 * 4、promise状态一旦确定，不会在改变
 * 5、promise都有then方法，then方法接收两个参数，分别是promise的成功回调onFulfilled，promise的失败回调onRejected
 * 6、如果调用then时，promise已经成功，则执行onFulfilled函数，并将promise返回的值作为参数传入
 *                  如果promise已经失败，则执行onRejected函数，并将promise返回的error参数进去
 *                  如果promise的状态时pending，需要将onFulfilled和onRejected存放起来，等待状态变化，在执行对应的函数（发布订阅）
 * 7、then的参数onFulfilled和onRejected可以缺省
 * 8、promise可以then多次，promise的then方法返回一个promise
 * 9、如果then返回的时一个结果，那么就会把这个结果作为参数，传递给下一个then的成功回调onFulfilled
 * 10、如果then中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败回调onRejected;
 * 11、如果then返回的是一个promise，那么需要等待这个promise执行完毕，promise如果成功，就走下一个then的成功回调，如果失败，就走下一个then的失败回调
 */

/**
 * 定义promise的状态
 * pending
 * fulfilled
 * rejected
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 创建一个promise
 * 传递一个参数executor
 * executor的参数为resolve, reject
 */

function Promise(executor) {
  let self = this;
  self.value = '';
  self.status = PENDING;
  self.onFulfilled = [];
  self.onRejected = [];

  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach((fn) => fn());
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.value = reason;
      self.onRejected.forEach((fn) => fn());
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {

  //2.2.1 2.2.2 2.2.3 
  onFulfilled =
    typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === 'function' ? onRejected : (reason) => reason;

  let self = this;

  //2.2.7 then 必须返回一个promise
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          //2.2.7.1
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          //2.2.7.2
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

function resolvePromise(promise, x, resolve, reject) {
  //2.3.1
  if (promise === x) {
    reject(new TypeError('Chaining cycle'));
  }

  //2.3.2,如果x是一个promise，采用它的状态
  if (x instanceof Promise) {
  }

  //2.3.3,如果x是一个对象或者函数
  if ((x && typeof x === 'object') || typeof x === 'function') {
    try {
      //2.3.3.1定义then = x.then;
      let then = x.then;
      //2.3.3.2,如果检索属性x.then导致刨出异常，reject promise，并且以e为reason

      //2.3.3.3,如果then是一个函数，调用x为this,第一个参数resolvePromise， 第二个参数rejectPromise
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            //2.3.3.3.1
            resolvePromise(promise, y, resolve, reject);
          },
          (r) => {
            //2.3.3.3.2
            reject(r);
          }
        );
      } else {
        //2.3.3.4then不是一个函数

        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    //2.3.4 如果x不是一个对象或者函数
    resolve(x);
  }
}

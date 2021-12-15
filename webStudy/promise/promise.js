function Promise(fn) {
  const self = this;
  self.status = "pending";
  self.value = null;
  self.reason = null;
  self.onFulfilledCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    if (self.status === "pending") {
      self.status = "fulfilled";
      self.value = value;
      self.onFulfilledCallback.forEach((fn) => fn());
    }
  }

  function reject(e) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.reason = e;
      self.onRejectedCallback.forEach((fn) => fn());
    }
  }
  try {
    fn(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };

  const promise2 = new Promise((resolve, reject) => {
    if (self.status === "pending") {
      self.onFulfilledCallback.push(() => {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== "function") {
              //如果onFulfilled不是一个函数,promise2直接返回resolve(self.value) 就是所谓的值穿透
              resolve(self.value);
            } else {
              let x = onFulfilled(self.value);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      self.onRejectedCallback.push(() => {
        setTimeout(() => {
          try {
            if (typeof onRejected !== "function") {
              //如果onFulfilled不是一个函数,promise2直接返回resolve(self.value)
              reject(self.reason);
            } else {
              let x = onRejected(self.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (e) {
            reject(e);
          }
        });
      });
    } else if (self.status === "fulfilled") {
      setTimeout(() => {
        try {
          if (typeof onFulfilled !== "function") {
            //如果onFulfilled不是一个函数,promise2直接返回resolve(self.value)
            resolve(self.value);
          } else {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === "rejected") {
      setTimeout(() => {
        try {
          if (typeof onRejected !== "function") {
            //如果onFulfilled不是一个函数,promise2直接返回resolve(self.value)
            reject(self.reason);
          } else {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      });
    }
  });
  return promise2;
};
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject("循环调用promise");
  }

  if (x instanceof Promise) {
  } else if (x !== null && (typeof x === "function" || typeof x === "object")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        let used = null;
        then.call(
          x,
          (y) => {
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (e) => {
            if (used) return;
            used = true;
            reject(e);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}

function resolvePromises(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject("循环调用promise");
  }

  if (x !== null && (typeof x === "function" || typeof x === "object")) {
    try {
      let then = x.then;
      let used = null;
      if (typeof then === "function") {
        try {
          then.call(
            x,
            (y) => {
              if (used) return;
              used = true;
              resolvePromise(promise2, y, resolve, reject);
            },
            (e) => {
              if (used) return;
              used = true;
              reject(e);
            }
          );
        } catch (e) {
          if (used) return;
          used = true;
          reject(e);
        }
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (err) {
      reject(err);
    }
  } else {
    resolve(x);
  }
}

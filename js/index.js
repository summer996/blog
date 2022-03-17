function MathHandle(x, y) {
  self.x = x;
  self.y = y;
}

MathHandle.prototype.add = function () {
  return self.x + self.y;
};

var m = new MathHandle(1, 2);

console.log(m.add());

console.log(typeof MathHandle); //function;
console.log(MathHandle.prototype.constructor === MathHandle); //true
console.log(m.__proto__ === MathHandle.prototype); //true 实例的隐式原型等于构造函数显式原型

new Promise((resolve, reject) => {});

function Promise(fn) {
  let self = this;
  self.state = "pending";
  self.value = null;
  self.reason = null;
  self.onFulfilledCallback = [];
  self.onRejectedCallback = [];

  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }

  function resolve(value) {
    if (self.state === "pending") {
      self.state = "resolved";
      self.value = value;
      self.onFulfilledCallback.forEach((fn) => fn());
    }
  }

  function reject(reason) {
    if (self.state === "pending") {
      self.state = "rejected";
      self.reason = reason;
      self.onFulfilledCallback.forEach((fn) => fn());
    }
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
    if (self.state === "pending") {
      self.onFulfilledCallback.push(() => {
        setTimeout(() => {
          //相当于执行then的第一个函数，第一个函数就会接受res也就是this.value
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        });
      });

      self.onRejectedCallback.push(() => {
        setTimeout(() => {
          //相当于执行then的第二个函数，第二个函数就会接受e也就是this.reason
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      });
    } else if (self.state === "fulfilled") {
      setTimeout(() => {
        //相当于执行then的第一个函数，第一个函数就会接受res也就是this.value
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.state === "rejected") {
      setTimeout(() => {
        try {
          //相当于执行then的第二个函数，第二个函数就会接受e也就是this.reason
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
  });
  return promise2;
};

function resolvePromise(prommise, x, resolve, reject) {
  if (promise === x) {
    return reject(new Error("promise循环调用了"));
  }

  if (x !== null && (typeof x === "function" || typeof x === "function")) {
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
              resolvePromise(promise, y, resolve, reject);
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
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    resolve(x);
  }
}

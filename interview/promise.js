class Promise {
  constructor(excutor) {
    this.state = 'pending';
    this.value = '';
    this.reason = '';
    this.onFulfilledFn = [];
    this.onRejectFn = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledFn.forEach(fn => fn());
      }
    }

    const rejected = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = value;
        this.onRejectFn.forEach(fn => fn());
      }
    }

    try {
      excutor(resolve, rejected);
    } catch (err) {
      rejected(err);
    }
  }

  then(onFulFilled, onRejected) {
    onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {return new Error('不是一个函数')}
    const promise2 = () => {
      return new Promise((resolve, rejected) => {
        if (this.state === 'pending') {
          this.onFulfilledFn.push(() => {
            setTimeout(() => {
              try {
                let x = onFulFilled(this.value);
                this.resolvePromise(promise2, x, resolve, rejected);
              } catch (err) {
                rejected(err);
              }
            })
          })

          this.onRejectFn.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason);
                this.resolvePromise(promise2, x, resolve, rejected);
              } catch (err) {
                rejected(err);
              }
            })
          })
          
        } else if (this.state === 'fulfilled') {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value);
              this.resolvePromise(promise2, x, resolve, rejected);
            } catch (err) {
              rejected(err);
            }
          })
        } else if(this.state === 'rejected') {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              this.resolvePromise(promise2, x, resolve, rejected);
            } catch (err) {
              rejected(err);
            }
          })
        }
      })
    }
    return promise2;
  }

  resolvePromise(promise, x, resolve, rejected) {
    if (promise === x) {
      return rejected(new TypeError('循环调用promise'))
    }

    if (x !== null && (typeof x === 'function' || typeof x === 'object')) {
      try {
        let then = x.then;
        if (typeof then === 'function') {
          let called;
          then.call(x, y => {
            if (called) return;
            called = true;
            //表示一个promise可以多次被then调用
            this.resolvePromise(promise, y, resolve, rejected);
          }, err => {
            if (called) return;
            called = true;
            rejected(err);
          })
        } else {
          resolve(x);
        }
      } catch (err) {
        if (called) return;
        called = true;
        rejected(err);
      }
      
    } else {
      resolve(x);
    }
  }
}
var Car = (function() {
  var speed = 0;
  // 补充
  function setSpeed(val) {
    speed = val;

  }
  function getSpeed() {
    return speed;
    
  }
  function speedUp() {
    speed++;
    
  }
  function speedDown() {
    speed--;
    
  }
  return {
    setSpeed: setSpeed,
    getSpeed: getSpeed,
    speedUp: speedUp,
    speedDown: speedDown
  }
})()


function filterPositive(arr) {
  arr.filter(item => {
    return typeof item === 'number' && item > 0;
  })
}
var arr = [3, -1, 2, true]
filterPositive(arr)
console.log(filterPositive(arr)) 

//手动实现reduce
Array.prototype.myReduce = function (fn, initvalue) {
  if (initvalue === undefined && !this.length) {
    throw new Error('不是一个数组，并且没有初始值');
    return;
  }
  let result = initvalue ? initvalue : this[0];
  for (let i = initvalue ? 0 : 1; i < this.length; i++) {
    result = fn(result, this[i], i, this);
  }
  return result;
}

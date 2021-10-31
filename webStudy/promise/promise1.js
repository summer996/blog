
//1. 定义一个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected'


class MyPromise {
  // 5.3创建两个数组，分别是成功的回调数组和失败的回调数组
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];

  // 5.5创建一个私有变量，真实的变量存在这里面
  _status = PENDING;

  //4.实例化的时候，传入的参数，是一个函数，并且在初始化的时候就会执行
  constructor(fn) {
    //2. 初始化一个状态
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    try {
      //4.1实例化就执行fn
      fn(this.resolve.bind(this), this.reject.bind(this));//绑定一些this,
    } catch (e) {
      this.reject(e);//保什么错就抛出什么错误
    }
  }
  //5.6创建get status 和set status
  get status() {
    return this._status;
  }

  //set的作用，仔细看看
  set status(newStatus) {
    this._status = newStatus;

    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(callback => {
          callback(this.value);
        })
        break;
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(callback => {
          callback(this.reason);
        })
        break;
      }
    }
  }


  //3. 实现resolve和reject方法,用于更改状态，promise的状态只能由resolve或者reject方法来改变
  resolve(value) {
    if (this.status === PENDING) {
      //value改变在status之前的原因是，当前总的代码中有监听状态变化的处理逻辑，当状态变化之后，就会立即执行，这时候如果value在status后面赋值，可能就会有问题
      //当status发生变更的时候，就会去拿value,因此把value的改变放在status之前, 不然在set status中获取的value还是变更前的value;
      //规范说的是，当状态发生改变的时候，就会去依次执行then，
      this.value = value
      this.status = FULFILLED;

    }
  }

  reject(reson) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }

  isFuntion(param) {
    return typeof param === "function";
  }
  //5.实现then，接收两个参数onFulfilled, onRejected
  then(onFulfilled, onRejected) {
    //5.1检查参数
    //如果是一个函数，就用它，如果不是，就用一个函数把value和reason抛出去
    const fulFilledFn = this.isFuntion(onFulfilled) ? onFulfilled : (value) => value;
    const rejectedFn = this.isFuntion(onRejected) ? onRejected : (reason) => { throw reson };

    //6 fulfilledFn和rejectedFn函数可能会在执行的过程中发生错误，所以需要做一个错误捕获，由于调用的地方比较多，因此做一个封装，提高代码的可维护性 
    const fulfilledFnWithCatch = (resolve, reject, newPromise) => { //这个参数那里来的
      queueMicrotask(() => {
        try {
          //6.3 修改一下，判断onFulfilled是否是一个函数
          if (!this.isFuntion(onFulfilled)) {
            resolve(this.value)
          } else {
            const x = fulFilledFn(this.value);
            //newPromise来源于then的返回（6.1），then返回了一个新的promise函数也就是它
            this.resolvePromise(newPromise, x, resolve, reject);
          }
          fulFilledFn(this.value);
          //6.2 如果onFulfilled不是一个函数（在5.1就判断了），且promise1成功执行，promise2必须返回同样的状态
          resolve(this.value)
        } catch (e) {
          reject(e);
        }
      })
      
    }

    const rejectedFnWithCatch = (resolve, reject, newPromise) => { //这个参数那里来的
      queueMicrotask(() => {
        try {
          // rejecteddFn(this.value);
          //需要注意的一点是，如果onRejected是一个函数，并且执行成功，需要把结果resolve出去，这时候下一个then就会以onFulfilled来接受结果
          if (!this.isFuntion(onRejected)) {
            resolve(this.reason)
          } else {
            let x = rejectedFn(this.reason);
            this.resolvePromise(newPromise, x, resolve, reject);
          }
        } catch (e) {
          reject(e);
        }
      })
    }

    //5.2判断状态, 根据对应的状态执行对应的回调函数
    switch (this.status) {
      case FULFILLED: {
        //6.1 这里和下面一样的原理
        // let newPromise = new MyPromise(fulfilledFnWithCatch);
        //再次改写
        //问题，返回一个函数又直接传递进去
        let newPromise = new MyPromise((resolve, reject) => fulfilledFnWithCatch(resolve, reject, newPromise));
        return newPromise
      }
      case REJECTED: {
        //6.1 这里和下面一样的原理
        //需要用到rejectedFnWithCatch的返回值，因此不能直接返回
        // let newPromise = new MyPromise(rejectedFnWithCatch);
        //再次改写
        let newPromise = new MyPromise((resolve, reject) => rejectedFnWithCatch(resolve, reject, newPromise));
        return newPromise;
      }
      case PENDING: {
        //6.1 修改原来的调用方式, 并且resolve和reject是由外部传入的，then返回的是一个promise，所以需要返回一个promise
        const newPromise = new MyPromise((resolve, reject) => {
          this.FULFILLED_CALLBACK_LIST.push(() => fulfilledFnWithCatch(resolve, reject, newPromise));
          this.REJECTED_CALLBACK_LIST.push(() => rejectedFnWithCatch(resolve, reject, newPromise));
        })
        return newPromise;
        //改写为6.1 就把这里注释了
        //5.4因为可能又异步的操作，所以promise状态可能还是pending,所以不能直接执行，而是先用一个数组，把成功和失败的回调函数先存起来，等待promise的
        // this.FULFILLED_CALLBACK_LIST.push(fulFilledFn);
        // this.REJECTED_CALLBACK_LIST.push(rejectedFn);
        // break;
      }
    }
  }

  // 7 定义resolvePromise
  resolvePromise(newPromise, x, resolve, reject) {
    if (newPromise === x) {
      return reject(new TypeError('xxxxxxxx'));
    }

    if (x instanceof MyPromise) {
      //难道是我一直理解错了吗， x.then不是x执行的结果传递给then吗？
      x.then(
        (y) => {
          this.resolvePromise(newPromise, y, resolve, reject);
        },
        reject
      )
    } else if (x !== null && (typeof x === 'object' || this.isFuntion(x))) {
      // let then = null;
      //   try {
      //     then = x.then;
      //   } catch (e) {
      //     return reject(e)
      //   }
      let then = x.then;
      if (this.isFuntion(then)) {
        let called = false;
        try {
          then.call(
            x,
            (y) => {
              if (called) return;//被调用，直接返回
              called = true;
              this.resolvePromise(newPromise, y, resolve, reject)
            },
            (error) => {
              if (called) return;
              called = true;
              reject(error);
            }
          );//then本来就来至x，为了避免错误，手动指向一下this为x
        } catch (e) {
          if (called) return;
          called = true;
          reject(e);
        }
      } else {
        resolve(x);
      }

    } else {
      resolve(x);
    }
  }
}
//class
//定义状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MPromise {
  FULFILLED_CALLBACK_LIST = [];
  REJECTED_CALLBACK_LIST = [];
  _status = PENDING;
  constructor(fn) {
    //初始化状态
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    try {
       fn(this.resolve.bind(this), this.reject.bind(this)))
    } catch (e) {
      this.reject(e);
     }
  }
  get status() {
    return this._status;
  }
  
  set status(newStatus) {
    this._status = newStatus;

    switch (newStatus) {
      case FULFILLED: {
        this.FULFILLED_CALLBACK_LIST.forEach(fn => fn(this.value));
        break;
      }
      case REJECTED: {
        this.REJECTED_CALLBACK_LIST.forEach(fn => fn(this.reason));
        break;
      }
    }
  }
  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
    
  }

  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.value = reason;
    }
  }

  isFunction(param) {
    return typeof param === 'function';
  }

  then(onFulfilled, onRejected) {
    const fulfilledFn = this.isFunction(onFulfilled) ? onFulfilled : (value) => value;
    const rejectedFn = this.isFunction(onRejected) ? onRejected : (reason) => { throw reason; }
    
    const fulfilledFnWithCatch = (resolve, reject) => {
      try {
        fulfilledFn(this.value);
      } catch (e) {
        reject(e);
      }
    }

    switch (this.status) {
      case FULFILLED: {
        return new MPromise(fulfilledFnWithCatch);
        // fulfilledFnWithCatch(this.value);
        // break;
      }
      case REJECTED: {
        rejectedFn(this.reson);
        break;
      }
      case PENDING: {
        return new MPromise((resolve, reject) => {
          this.FULFILLED_CALLBACK_LIST.push(onFulfilled);
          this.REJECTED_CALLBACK_LIST.push(onRejected);
        })
        
      }
    }
  }
}

const promise = new MPromise((resolve, reject) => {

})
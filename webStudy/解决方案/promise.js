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
    }

    let reject = (reason) => {
      this.reason = reason;
      this.state = 'rejected';
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
      if (this.state === 'pending') {
        this.onFullFilledFn.push(() => {
          setTimeout(() => {
            try {
              let x = onFulFilled(h)
            } catch (err) {
              reject(err);
            }
          })
        })
      }
    })
    return promise2;
  }
}
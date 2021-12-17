function Promise (fn) {
    this.status = 'pending';
    this.value = null;
    this.reason = null;
    this.onFulfilledCallback = [];
    this.onRejectedCallback = [];

    try {
        fn(resolve, reject);
    } catch(err) {
        reject(err);
    }

    function resolve(value) {
        if(this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = value;
            this.onFulfilledCallback.forEach(fn => fn());
        }
    }

    function reject(error) {
        if(this.status === 'pending') {
            this.status = 'rejected';
            this.reason = error;
            this.onRejectedCallback.forEach(fn => fn());
        }
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    //then需要返回一个promise
    const promise2 = new Promise((resolve, reject) => {
        if(this.status === 'pending') {
            this.onFulfilledCallback.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(err) {
                        reject(err);
                    }
                })
            })

            this.onRejectedCallback.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch(err) {
                        reject(err);
                    }
                })
            })
        } else if(this.status === 'fulfilled') {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(err) {
                    reject(err);
                }
            })
        } else if(this.status === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(err) {
                    reject(err);
                }
            })
        }
    });
    return promise2;
}

function resolvePromise(promise2, x, resolve, reject) {
    if(promise2 === x) {
        return reject('循环调用promise')
    }

    if(x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then;
            let used = null;
            if(typeof then === 'function') {
                try {
                    then.call(x, y => {
                        if(used) return;
                        used = true;
                        resolvePromise(promise2, y, resolve, reject);
                    }, e => {
                        if(used) return;
                        used = true;
                        reject(e);
                    })
                } catch(e) {
                    if(used) return;
                    used = true;
                    reject(e);
                }
            } else {
                resolve(x);
            }
            
        } catch(e) {
            reject(e)
        }
    } else  {
        resolve(x);
    }
}
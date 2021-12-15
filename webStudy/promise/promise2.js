//定义状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

const p = new Promise ((resolve, rejected) => {
    return resolve(333);
})
p.then((res) => {console.log(res)}); //333;

class MyPromise {
    constructor(fn) {
        this.status = "pending";
        this.value = null;
        this.reason = null;
        this.fulfilledCallback = [];
        this.rejectedCallback = [];

        try{
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch(e) {
            this.reject(e)
        }

    }

    resolve(value) {
        if(this.status === 'pending') {
            this.status = "fulfilled";
            this.value = value;
        }
    }

    reject(reason) {
        if(this.status === 'pending') {
            this.status = 'rejected';
            this.reason = reason;
        }
    }

    then(onFulfilled, onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason;}

        const promise2 = new Promise((resolve, rejected) => {
            if(this.status === 'pending') {
                this.fulfilledCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, rejected);
                        } catch(err) {
                            rejected(err);
                        }
                    })
                })

                this.rejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            this.resolvePromise(promise2, x, resolve, rejected);
                        } catch(err) {
                            rejected(err);
                        }
                    })
                })
            } else if(this.status === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = this.onFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, rejected);
                    } catch(err) {
                        rejected(err);
                    }
                })

            } else if(this.status === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, rejected);
                    } catch(err) {
                        rejected(err);
                    }
                })
            }
        });

        //then必须返回一个promise
        return promise2;
    }

    resolvePromise(promise2, x, resolve, rejected) {
        if(promise2 === x) {
            return rejected(new TypeError('循环调用promise'))
        }

        if(x !== null && (typeof x === 'function' || typeof x === 'object')) {
            try {
                let then = x.then;

                if(typeof then === 'function') {
                    let called = null;
                    then.call(x, y => {
                        if(called) return;
                        called = true;
                        this.resolvePromise(promise2, y, resolve, rejected)
                    }, err => {
                        if (called) return;
                        called = true;
                        rejected(err);
                    })
                } else {
                    //说明x没有then方法，直接resolve
                    resolve(x);
                }
            } catch(err) {
                if(called) return;
                called = true;
                rejected(err);
            }
        } else {
            //x是一个基本数据，直接返回
            resolve(x)
        }
    }

}

const allPromiseResult = Promise.all([promise1, promise2, promise3]);
Promise.all = (arr) => {
    let len = arr.length;
    let result = [];
    return new Promise((resolve, reject) => {
        arr.forEach(promise => {
            promise.then(res => {
                result.push(res);
                result.length === len && resolve(result);
            }, err => {
                reject(err);
            })
        })
    })
}
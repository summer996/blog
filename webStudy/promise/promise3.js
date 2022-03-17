class MyPromise {
    constructor(fn) {
        this.status = 'pending';
        this.value = null;
        this.reason = null;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];

        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch(err) {
            this.reject(err);
        }
    }

    resolve(value) {
        if(this.status === 'pending') {
            this.status = 'fulfilled';
            this.value = value;
            this.onFulfilledCallback.forEach(fn => fn()); //2.2.6.1 当promise是fulfilled，onFulfilledCallback按照注册顺序执行
        }
    }

    reject(error) {
        if(this.status === 'pending') {
            this.status = 'rejected';
            this.reason = error;
            this.onRejectedCallback.forEach(fn => fn()); //2.2.6.2 当promise是rejected，onRejectedCallback按照注册顺序执行
        }
    }

    then(onFulfilled, onRejected) {
        //PromiseA+ 2.2.1 onfulfilled和onRejected都是可选参数
        // PromiseA+ 2.2.5  onFulfilled 和 onRejected 必须作为函数调用
        // PromiseA+ 2.2.7.3 如果onFulfilled不是一个函数，并且promise1是fulfilled，promise2一定会以promise1的value作为value，并且fulfilled
        // PromiseA+ 2.2.7.4 如果onRejected不是一个函数，并且promise1是rejected，promise2一定会rejected并且原因和promise1一样
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason;};

        //2.2.7 then必须返回一个promise
        const promise2 = new Promise((resolve, reject) => {
            //这里决定了当前的then执行fulfilled还是rejected或者注册回调
            if(this.status === 'pending') {
                //注册一个在未来某个时刻改变当前状态的回调函数
                this.onFulfilledCallback.push(() => {
                    //使用定时器来模拟异步
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch(err) {
                            reject(err);
                        }
                    })
                })

                this.onRejectedCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch(err) {
                            reject(err);
                        }
                    })
                })

            } else if(this.status === 'fulfilled') {
                //PromiseA+ 2.2.2 如果onfulfilled是一个函数：
               //PromiseA+ 2.2.4 --- setTimeout onFulfilled or onRejected 只有当执行上下文栈只包含平台代码时才会被调用
                setTimeout(() => {
                    try {
                        //2.2.7.1 不管onFulfilled还是onRejected返回值X，则运行Promise Resolution ProcedureResolve(promise2, X);
                        let x = onFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(err) {
                        //2.2.7.2 不管onFulfilled还是onRejected返回异常e，promise2一定会被rejected，并且e作为reason
                        reject(err);
                    }
                })
                
            } else if(this.status === 'rejected') {
                // 2.2.3 如果onRejected是一个函数
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch(err) {
                        reject(err);
                    }
                })
            }
        })
        //2.2.7 then必须返回一个promise
        return promise2;
    }

    resolvePromise(promise2, x, resolve, reject) {
        //PromiseA+ 2.3.1如果 promise2 和 x 相等，那么 reject promise with a TypeError
        if(promise2 === x) {
            return reject('循环调用promise')
        }
        //PromiseA+2.3.3 如果 x 是一个 object 或者 是一个 function
        if(x !== null && (typeof x === 'function' || typeof x === 'object')) {
            //PromiseA+2.3.3.3.3 如果 resolvePromise 和 rejectPromise 都调用了，那么第一个调用优先，后面的调用忽略。
            let called = null;
            try {
                //2.3.3.1 let then = x.then.
                let then = x.then;
                //2.3.3.3 如果 then 是一个函数，then.call(x, resolvePromiseFn, rejectPromise)
                if(typeof then === 'function') {
                    then.call(x, y => {
                        //PromiseA+2.3.3.1 resolvePromiseFn 的 入参是 y, 执行 resolvePromise(promise2, y, resolve, reject);
                        if(called) return;
                        called = true;
                        this.resolvePromise(promise2, y, resolve, reject);
                    }, error => {
                        //PromiseA+ 2.3.3.3.2 rejectPromise 的 入参是 r, reject promise with r.
                        if (called) return;
                        called = true;
                        rejected(error);
                    })
                } else {
                    //PromiseA+2.3.3.4 如果 then 不是一个function. fulfill promise with x
                    if(called) return;
                    called = true;
                    resolve(x);
                }
            } catch(err) {
                //PromiseA+ 2.3.3.2 如果 x.then 这步出错，那么 reject promise with e as the reason..
                if(called) return;
                called = true;
                rejected(err);
            }
        } else {
             //PromiseA+ 2.3.4 如果 x 不是一个 object 或者 function，fulfill promise with x.
            resolve(x);
        }
    }
}

MyPromise.defer = MyPromise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
}


function MyPromise = function(fn) {
    this.state = 'pending';
    this.reason = null;
    this.value = null;
    this.onFulfilledCallback = [];
    this.onRejectedCallbac = [];

    function resolve(value) {
        if(this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
            this.onFulfilledCallback.forEach(fn => fn())
        }
    }

    function reject(reason) {
        if(this.state === 'pending') {
            this.state = 'rejected';
            this.reason = reason;
            this.onRejectedCallbac(fn => fn());
        }
    }

    try {
        fn(resolve, reject);
    } catch(e) {
        reject(e);
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason};

    const promise2 = new Promise((resolve, reject) => {
        if(this.state === 'pending') {
            this.onFulfilledCallback.push(() => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0)
            })

            this.onRejectedCallback.push(() => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x, promise2, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0)
            })
        } else if(this.state === 'fulfilled') {
            setTimeout(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolvePromise(x, promise2, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }, 0)
        } else if(this.state === 'rejected') {
            setTimeout(() => {
                try {
                    let x = onRejected(this.reason);
                    resolvePromise(x, promise2, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }, 0)
        }
    })
}

function resolvePromise(x, promise2, resolve, reject) {
    if(x === promise2) {
        return reject(new error('循环调用'))
    }

    if(x !== null && (typeof x === 'function' || typeof x === 'object')) {
        try {
            let then = x.then;
            if(typeof then === 'function') {
                let used = false;
                try {
                    then.call(x, y => {
                        if(used) return;
                        used = true;
                        resolvePromise(y, promise2, resolve, reject);
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
            }
        } catch(e) {
            reject(e);
        }
    } else {
        resolve(x);
    }
}
# PromiseA+规范

## 术语
1. promise 有then方法的对象或函数
2. thenable 有then方法的对象或函数
3. value promise成功时的值， resolve（value）,任何数据类型，基础类型 thenable promise
4. reason promise失败的值， reject（reason）
5. excption

# 实现promise

1. const promise = new Promise(); 代表Promise应该是一个构造函数或class
2. 定义三种状态
3. 初始化状态
4. 实现resolve reject方法
   1. 这两个方法要更改status,pending --> fulfilled/rejected
   2. 入参， 分别是value / reason
5. promise的入参
   1. 对于实例化promise的入参，接收resolve reject两个参数
   2. 初始化就要执行这个两个参数中的其中一个
6. then 方法
   1. then有两个参数，onFulfilled onRejected
   2. 检查参数，如果参数不是函数，忽略（用一个函数直接返回,原来的值直接返回）
   3. 根据当前的promise状态，调用不同的函数
   4. 首先拿到所有的回调，新建两个数组，分别存储成功和失败的回调，调用then的时候，
   5. 在status发生变化
```javascript
const promise2 = promise1.then(onFulfulled, onRejected)；
```
1. onFulfilled或者onRejected的执行结果为x， 调用resolvePromise
2. onFulfilled 或者 onRejected在执行过程中，刨出异常，promise2需要被rejected
3. 如果onFulfilled不是一个函数，promise2 将以promise1 的**value 触发fulfilled**,就是值透传
4. 如果onRejected不是一个函数，promise2 将以promise1 的**reason 触发fulfilled**



7. then的返回值
   1. 如果onFulfilled或者onRejected抛出异常e，新的promise必须reject e；
   2. 返回值是一个promise函数
   3. 如果onFulfilled不是一个函数， 且promise1成功执行，promise2必须返回同样的状态和value
   4. 如果onReject不是一个函数，promise1 拒绝执行，promise2必须返回同样的状态和reason
   5. 如果onFulfilled或者onRejected返回一个x，运行resolvePromise方法
# generator async
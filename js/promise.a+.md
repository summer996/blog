## Promise/A+
可操作的JavaScript开放标准

```promise```代表异步操作的最终结果。一个与promise互动的基本方式是通过它的```then```方法,它注册回调函数来接受```promise```最终的结果或者为什么失败的原因。

这个规范详细的说明了```then```方法的表现形式，提供了一个可互相操作的基础，所有```promise/A+```的实现都可以依赖此提供的基础。因此，该规范被认为是非常稳定的。即使```promise/a+```组织可能会偶尔的修改这个规范来向后兼容，来解决新发现的极端的问题，只有经过仔细考虑，讨论和测试，我们才会集成较大或向后不兼容的更改。

## 术语
- "promise"是一个对象或者一个带有then方法表现符合规范的函数
- "thenable"是一个对象或者是一个被定义了then方法的函数
- "value"是一个合法的javascript值（包含undefined, thenable，promise）
- "exception"是一个由throw语法抛出的值
- "reason"是一个解释为什么promise被拒绝的值

## 要求
### promise states
一个promise必须是以下三个状态中的一个状态，pending, fulfilled, rejected
- primise是pending状态，
  - 它可以转变为fulfilled或者rejected状态
- promise是fulfilled状态，
  - 不能变为其他状态
  - 必须有一个值，该值不能改变
- promise是rejected状态
  - 不能改变为其他状态
  - 必须有一个原因，该原因不能改变
### then方法
promise必须提供一个then方法来接收当前的最终值或者原因

promise的then方法接收两个参数
```
prommise.then(onFulfilled, onRejected)
```
1. ```onFulfilled```和```onRejected```都是可选参数：
   1. 如果```onFulfilled```不是一个函数，它必须被忽略
   2. 如果```onRejedted```不是一个函数，它必须被忽略
2. 如果```onFulfilled```是一个函数：
   1. 它必须在```promise```变成```fulfilled```状态之后被调用，并且```promise```返回的```value```作为第一个参数
   2. 它不能在```promise```状态还没变成```fulfilled```状态之前被调用
   3. 它只能被调用一次
3. 如果```onRejected```是一个函数：
   1. 它必须在```promise```变成```rejected```状态之后被调用，并且```promise```返回的```reson```作为第一个参数
   2. 它不能在```promise```状态还没变成```rejected```状态之前被调用
   3. 它只能被调用一次
4. ```onFulfilled```和```onRejected```都不能被调用直到执行上下文堆栈中包含的只有平台代码
5. ```onFulfilled```和```onRejected```一定会被作为一个函数调用
6. ```then```可能被多次调用在同一个promise中
   1. 当promise的状态是fulfilled时，所有的onFulfilled回调函数都会按照注册顺序依次执行
   2. 当Promise的状态时rejected时，所有的onRejected回调函数都会按照注册损下一次执行
7. then必须返回一个promise 
```promise2 = promise1.then(onFulfilled, onRejected);```
   1. 如果```onFulfilled```或者```onRejected```返回一个值```x```,就会执行promise规范，返回一个状态为resolve的promise
   2. 如果```onFulfilled```或者```onRejected```throw an exception e，promise2一定会被rejected，并且e作为原因
   3. 如果```onFulfilled```不是一个函数，并且```promise```已经```fulfilled```, 则```promise2```一定会```fulfilled```并且和```promise1```的值相同
   4. 如果```onRejected```不是一个函数，并且```promise```已经```rejected```，则```promise2```一定会```rejected```并且和```promise1```的原因相同
### the promise resolution procedure
promise resolution procedure把promise和value放进去是一个抽象的操作，这个表示为```[[Resolve]]](promise, x)```如果x是一个thenable， 它会尝试让```promise```采用```x```的状态，假设```x```的表现至少有点像一个promise。除此之外，实现值```x```的```promise```

这种对thenable的处理允许promise实现互相操作，只要他们暴露的promise/A+符合then方法。它也允许promise/A+实现“整合”不合格的实现用then方法

为了运行```[[Resolve]](promise, x)```，执行以下步骤:
1. 如果```promise```和```x```指向同一个对象，reject ```promise```用```TypeError```作为原因
2. 如果```x```是一个promise，就用它的状态
   1. 如果```x```的状态是```pending```, ```promise```必须保持```pending```状态，直到x的状态是```fulfilled或者rejected```；
   2. 如果```x```的状态是```fulfilled```，使用相同的value fulfilled promise
   3. 如果```x```的状态是```rejected```, 使用相同reason reject promise
3. 除此之外，如果```x```是一个对象或者函数：
   1. 变```then```为```x.then```
   2. 如果检索属性```x.then```导致抛出异常```e```，reject ```promise```并且用````e```作为原因
   3. 如果then是一个函数，调用它，使用```x```作为它的第一个参数，
      1. 如果```resolvePromise```被调用并且值是```y```，运行[[Resolve]](promise, y)
      2. 如果```resolvePromise```被调用并且返回一个原因```r```，用```r```拒绝promise
      3. 如果```resolvePromise```和```rejectPromise```都被调用，或者多次调用同一个参数，第一次调用优先，然后忽略其他的调用
      4. 如果当调用then,抛出一个错误时
         1. 如果```resolvePromise```和```rejectPromise```已经被调用，就忽略这个值
         2. 除此之外，用```e```作为原因拒绝```promise```
   4. 如果then不是一个函数，完成```promise```用```x```
4. 如果x不是一个对象或者函数，用```x```完成```promise```


## Promise A+

A promise represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its then method, which registers callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled.

一个Promise代表一个异步操作的最终结果。与Promise互动的主要方法是通过它的then方法，then方法注册了两个回调函数来接收Promise最终的值，或者Promise不能成功的原因。

This specification details the behavior of the then method, providing an interoperable base which all Promises/A+ conformant promise implementations can be depended on to provide. As such, the specification should be considered very stable. Although the Promises/A+ organization may occasionally revise this specification with minor backward-compatible changes to address newly-discovered corner cases, we will integrate large or backward-incompatible changes only after careful consideration, discussion, and testing.

这个规范详细的说明了then方法的表现，提供一个可互相操作的基础，所有Promise/A+一致的承诺实现都可以依赖与提供。因此，规范应该被认为是非常稳定的。尽管 Promises/A+ 组织可能偶尔会通过向后兼容的较小更改来修改此规范以解决新发现的极端情况，但我们只有在仔细考虑、讨论和测试后才会集成大的或向后不兼容的更改。

Historically, Promises/A+ clarifies the behavioral clauses of the earlier Promises/A proposal, extending it to cover de facto behaviors and omitting parts that are underspecified or problematic.

从历史上看，Promises/A+ 澄清了早期 Promises/A 提案的行为条款，将其扩展到涵盖事实上的行为，并省略了未指定或有问题的部分。

Finally, the core Promises/A+ specification does not deal with how to create, fulfill, or reject promises, choosing instead to focus on providing an interoperable then method. Future work in companion specifications may touch on these subjects.

最后，核心 Promises/A+ 规范不涉及如何创建、履行或拒绝承诺，而是选择专注于提供可互操作的 then 方法。 伴随规范的未来工作可能会涉及这些主题。

## 术语
1.1 promise是一个对象或者函数病情有着then方法，它的表现符合该规范
1.2 thenable是一个对象或者函数并且定义了一个then方法
1.3 value是一个合法的js值（包括undefined， tenable, a promise）
1.4 异常是使用throw语句抛出的值
1.5 reason是一个值，表示promise被拒绝的原因

## 要求
### 2.1 promise 状态
一个promise必须是这三个状态中的一个状态：pending，fulfilled，或者rejected

- 2.1.1 当promise的状态为pending：
    - 2.1.1.1 promise状态可能变为fulfilled或者rejected
- 2.1.2 当promise的状态是fulfilled:
    - 2.1.2.1 一定不能变为其他状态
    - 2.1.2.2 一定有一个value，并且value不能改变
- 2.1.3 当promise的状态是rejected：
    - 2.1.3.1 一定不会变为其他状态
    - 2.1.3.2 一定有一个reason，并且失败原因不会在改变

### 2.2 then方法
一个promise一定会提供一个then方法来获取当前或者最终的值或者失败原因

promise的then方法接收两个参数：
```promise.then(onFulfilled, onRejected)```

- 2.2.1 onfulfilled和onRejected都是可选参数：
    - 2.2.1.1 如果onFulfilled不是一个函数，她一定会被忽略（就是值穿透，直接传给下一个then）
    - 2.2.1.2 如果onRejected不是函数，它也会被忽略（就是值穿透，直接传给下一个then）
- 2.2.2 如果onfulfilled是一个函数：
    - 2.2.2.1 当promise变为fulfilled之后，一定会被调用，并且把promise的value作为第一个参数
    - 2.2.2.2 不会在fulfilled前被调用
    - 2.2.2.3 只会被调用一次
- 2.2.3 如果onRejected是一个函数：
    - 2.2.3.1 当promise变为rejected之后，一定会被调用，并且把promise的reason作为第一个参数
    - 2.2.3.2 不会在fulfilled前被调用
    - 2.2.3.3 只会被调用一次
- 2.2.4 onFulfilled or onRejected 只有当执行上下文栈只包含平台代码时才会被调用
- 2.2.5 onFulfilled 和 onRejected 必须作为函数调用
- 2.2.6 then可以在同一个承诺上多次调用。
    - 2.2.6.1 当promise是fulfilled，onFulfilled回调函数中的每一个都会按照注册顺序执行
    - 2.2.6.2 当promise是rejected，onRejected回调函数中的每一个都会按照注册顺序执行
- 2.2.7 then必须返回一个promise
    promise2 =  promise1.then(onFulfilled, onRejected);
    - 2.2.7.1 不管onFulfilled还是onRejected返回值X，则运行Promise Resolution Procedure[[Resolve]](promise2, X);
    - 2.2.7.2 不管onFulfilled还是onRejected返回异常e，promise2一定会被rejected，并且e作为reason
    - 2.2.7.3 如果onFulfilled不是一个函数，并且promise1是fulfilled，promise2一定会以promise1的value作为value，并且fulfilled
    - 2.2.7.4 如果onRejected不是一个函数，并且promise1是rejected，promise2一定会rejected并且原因和promise1一样
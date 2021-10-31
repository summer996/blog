### 2.2 then 方法
一个promise必须提供一个```then```方法来接收当前或者最终的值或者失败原因。

一个```promise```的```then```方法接收两个参数：
```promise.then(onFulfilled, onRejected)```;

#### 2.2.1
```onFulfilled、onRejected```都是可选参数：
- 如果```onFulfilled```不是一个函数，它一定会被忽略
- 如果```onRejected```不是一个函数，它一定会被互虐

```js
var a = new Promise((resolve, reject) => {
  resolve(222);
})
a.then(1).then((res) => {console.log(res); return Promise.reject('errorfasdfads')}).then(res => console.log(res), 'fasd').then('fasf', (reason) => {console.log(reason)}).then(res => console.log('last',res));

```

#### 2.2.2
如果```onFulfilled```是一个函数：
- 他一定会在```promise```变成```fulfilled```之后, 并且把promise的值作为第一个参数
- 一定不会再```promise```没有变成```fulfilled```之前
- 只能调用一次

### 2.2.3
如果```onRejected ```是一个函数：
- 他一定会在```promise```变成```rejected```之后, 并且把promise的失败原因作为第一个参数
- 一定不会再```promise```没有变成```rejected```之前
- 只能调用一次

### 2.2.4
```onFulfilled```或者```onRejected```，只会在执行栈只包含平台代码之后被调用

### 2.2.5
只能作为函数被调用

### 2.2.6
then可以被多次调用，在一个promise中：
- 当promise变成fulfilled时，```OnFulfilledCallbackFnArr```，一定会被顺序执行
- 当promise变成rejected时，```OnRejectedCallbackFnArr```，一定会被顺序执行


#### resolvePromise（promise, x）
- 如果promise和x来源于同一个promise，reject promise，并且刨出typeError作为原因
- 如果x是一个promise



1、谈谈垃圾回收机制的方式及内存管理？
2、js类型转化
3、
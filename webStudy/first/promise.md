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
7. then的返回值
   1. 抛出异常，新的promise也需要刨出异常
   2. 
# generator async
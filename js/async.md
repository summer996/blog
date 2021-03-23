注：以下代码结果均为google chrome版本号87

### async/await执行顺序
举个例子：
```
async function async1() {
let result = await async2()
console.log(result);
console.log('async1 end')
}
async function async2() {
console.log('async2 end')
return 'async2 result'
}

async1()

new Promise(resolve => {
console.log('Promise')
resolve()
})
.then(function() {
console.log('promise1')
})
.then(function() {
console.log('promise2')
})
//输出结果：async2 end => Promise => async2 result => async1 end => promise1 => promise2
```
```
async function async1() {
let result = await async2()
console.log(result);
console.log('async1 end')
}
async function async2() {
console.log('async2 end')
return Promise.resolve('asnyc2 resolve result')
}

async1()

new Promise(resolve => {
console.log('Promise')
resolve()
})
.then(function() {
console.log('promise1')
})
.then(function() {
console.log('promise2')
}) 
//输出结果： async2 end => Promise => promise1 => promise2 => asnyc2 resolve result => async1 end
```
产生以上两种不同的结果的原因可以总结如下：（关键在于先注册还是后注册为微任务）
1. 如果awati后面的函数返回的是一个普通值，例如：'async2 result'，这时候相当与把await后面的代码注册为微任务，相当于promise.then(await后面的代码)，遇见await就跳出当前函数，继续执行async1后面的代码，当本轮宏任务执行完毕之后，就会去执行微任务队列，此时注意，在promise.then注册微任务之前，已经有微任务注册，就是例子1中await后面的代码
2. 如果await后面的函数返回的是一个promise函数，此时就不会把await后面的代码注册到微任务，而是执行完await之后，直接跳出当前函数，执行其他代码，遇到promise.then，注册微任务，等本次宏任务都执行完毕，这时候回到async1函数执行剩下的代码，然后把await后面的代码注册到微任务。
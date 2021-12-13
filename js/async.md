注：以下代码结果均为google chrome版本号87

### async/await执行顺序
举个例子：
```
async function async1() {
  let result = await async2();
  console.log(result);
  console.log('1');
}
async function async2() {
  console.log('2');
  return '6';
}

async1();

new Promise((resolve) => {
  console.log('3');
  resolve();
})
  .then(function () {
    console.log('4');
  })
  .then(function () {
    console.log('5');
  });

//输出结果：async2 end => Promise => async2 result => async1 end => promise1 => promise2    236145
```
```
async function async1() {
  let result = await async2();
  console.log(result);
  console.log(1);
}
async function async2() {
  console.log('2');
  return Promise.resolve('3');
}

async1();

new Promise((resolve) => {
  console.log('44');
  resolve();
})
  .then(function () {
    console.log('55');
  })

new Promise((resolve) => {
  console.log('4');
  resolve();
})
  .then(function () {
    console.log('5');
  })
  .then(function () {
    console.log('6');
  });

//输出结果： async2 end => Promise => promise1 => promise2 => asnyc2 resolve result => async1 end  245631
```
产生以上两种不同的结果的原因可以总结如下：（关键在于先注册还是后注册为微任务）
1. 如果awati后面的函数返回的是一个普通值，例如：'async2 result'，这时候相当与把await后面的代码注册为微任务，相当于promise.then(await后面的代码)，遇见await就跳出当前函数，继续执行async1后面的代码，当本轮宏任务执行完毕之后，就会去执行微任务队列，此时注意，在promise.then注册微任务之前，已经有微任务注册，就是例子1中await后面的代码
2. 如果await后面的函数返回的是一个promise函数，此时就不会把await后面的代码注册到微任务，而是执行完await之后，直接跳出当前函数，执行其他代码，遇到promise.then，注册微任务，等本次宏任务都执行完毕，微任务执行完，这时候回到async1函数执行剩下的代码，然后把await后面的代码注册到微任务。

总结：
- 如果是普通值，立即注册
- 如果是promise，先跳出执行，本轮宏任务结束之后，微任务执行完之后，在注册
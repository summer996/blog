Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then(res => {
  console.log(res);
  return Promise.resolve(55); //0 1 2 3 4 5 6 7 55 8;
}).then(res => {
  console.log(res);
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
}).then(() => {
  console.log(7)
}).then(() => {
  console.log(8)
})

//如果是自己实现的promise 则输出的结果是0 1 2 4 3 5 6 7 8
//原因是，return Promise.resolve(4)，会产生两个微任务
//promiseA+规范说，当前执行栈为空的时候，才会resolve新的promise，也就是return Promise.resolve(4);

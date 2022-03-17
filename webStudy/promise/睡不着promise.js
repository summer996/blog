Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4);
}).then(res => {
  console.log(res);
  return Promise.resolve(55); 
}).then(res => {
  console.log(res);
  return Promise.resolve(66);  //0123456755891066
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
}).then(() => {
  console.log(9)
}).then(() => {
  console.log(10)
})

Promise.resolve().then(() => {
  console.log(11);
  return Promise.resolve(22);
}).then(res => {
  console.log(res);
  return Promise.resolve(33); 
}).then(res => {
  console.log(res);
  return Promise.resolve(44); 
}).then(res => {
  console.log(res);
})

//如果是自己实现的promise 则输出的结果是0 1 2 4 3 5 6 7 8
//原因是，return Promise.resolve(4)，会产生两个微任务
//promiseA+规范说，当前执行栈为空的时候，才会resolve新的promise，也就是return Promise.resolve(4);

//0 1 ()=>{} 2 Promise.resolve(4) 3 4 5 ()=>{} 6 Promise.resolve(55) 7 55 8 ()=>{} 9 Promise.resolve(66) 10 66
//0 1 2 3 4 5 6 7 55 8 9 10 66

//0 1 11 ()=>{p4} 2 ()=>{p22} p4 3 p22 4 5 22 （）=>{p55} 6 （）=>{p33} p55 7 p33 55 8 33 ()=>{p66} 9 ()=>{p44} p66 10 p44 66 44
//0 1 11 2 3 4 5 22 6 7 55 8 33 9 10 66 44
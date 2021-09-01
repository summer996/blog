### node
事件循环，每个阶段都有一个队列，除了poll（它会一直执行，结束节点是check）

虽然每个阶段都是特殊的，但通常情况下，当事件循环进⼊给定的阶段时，它将执⾏特定于该阶段的任何操作，然后执⾏该阶段队列中的回调，它将执⾏特定于该阶段的任何操作，然后执⾏该阶段队列中的回调，它将执⾏特定于该阶段的任何操作，然后执⾏该阶段队列中的回调，
- timers （setTimeout setInterval的回调）
- pending callbacks
- idle, prepare  内部使用机制
- poll （所有的回调处理，除了timers）
- check (setImmediate)
- close callbacks

微任务：process.nextTick()(优先于promise.then执行)   new Promise().then() async/await 

微任务执行阶段是，以上每个阶段执行完了，就执行微任务，然后才会执行下一个阶段
```js
setTimeout(() => {  console.log('setTimeout1')}, 0)
setImmediate(()=>{  console.log('setImmediate')}) 
//执行结果在node环境中，可能是setTimeout1 setImmediate, 也可能是setImmediate setTimeout1
//1、出现这样的原因是，当进入事件循环的时候，当到达timer阶段，如果setTimeout已经进入队列，那么就立即执行setTimeout1, 然后进入下一个事件循环阶段，一直到check阶段，这时候有setImmediate，就执行输出setImmediate，  所以此使输出setTimeout1 setImmediate
//2、如果进入事件循环，当到达timer阶段，这时候setTimeout还没有进入队列，这时候队列为空，就进入下一个事件循环阶段，一直到check，然后就先执行setImmediate， 然后到下一个循环事件在开始，才输出setTimeout1，  所以输出结果为setImmediate setTimeout1

//注意 定时器后面的时间，只是希望这么多秒后执行，具体是否执行要看队列是否为空
```

```js
setTimeout(() => { 
  console.log('setTimeout0');  
  setTimeout(() => {  console.log('setTimeout1');  }, 0)
  setImmediate(()=>{  console.log('setImmediate');  }) 
  }, 0); 
//执行结果一定为setImmediate  setTimeout1
//原因是，最外面的setTimeout执行时，正处于timer阶段，然后执行代码，这时候setTimeout1就准备进入队列，然后timer阶段执行完毕，到check就执行setImmerdiate，然后再输出setTimeout1  所以就是一定输出setImmediate  setTimeout1
```
const async_hooks = require('async_hooks');

// setTimeout(() => {
//   console.log('first settimeout id', async_hooks.executionAsyncId());
// })

// setTimeout(() => {
//   console.log('first settimeout id', async_hooks.triggerAsyncId)
// });

//可以对handleObject的声明周期进行追踪
// const asyncHook = async_hooks.createHook({ init, before, after, destroy, promiseResolve });//创建一个新的asyncHook,都是回调函数
// asyncHook.enable(); //允许该实例中异步函数启用hook，不会自动生效需要手动启动
// asyncHook.disable();//关闭监听异步事件
// asyncHook.after(asyncId);
// asyncHook.before(asyncId);
// asyncHook.promiseResolve();

const buf = Buffer.from([1, 2, 23, 4, 5, 6]);
console.log(buf);


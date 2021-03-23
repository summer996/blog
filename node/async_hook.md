```const async_hooks = require('async_hooks');```

```
async_hooks.executionAsyncId(); //当前异步的id

async_hooks.triggerAsyncId()//调用当前异步的异步id

const asyncHook = async_hook.cre
```

```async_hooks```提供了一组API来追踪应用中的所有的异步资源，是一个与异步资源相关的回调函数，
```console.log()```是一个异步操作，如果在```async_hooks.createHook({})```的回调参数中调用的话，会引起死循环，因此需要注意使用
```
const fs = require('fs');
const asyncHooks = require('async_hooks');

const hook = asyncHooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) {
        fs.writeSync(1, `init: asyncId-${asyncId},type-${type},triggerAsyncId-${triggerAsyncId}\n`);
    },
    before(asyncId) {
        fs.writeSync(1, `before: asyncId-${asyncId}\n`);
    },
    after(asyncId) {
        fs.writeSync(1, `after: asyncId-${asyncId}\n`);
    },
    destroy(asyncId) {
        fs.writeSync(1, `destroy: asyncId-${asyncId}\n`);
    }
});

hook.enable();
console.log('hello');

// hook.disable();    // 注意，这里不要disable，否则只能触发init事件
```

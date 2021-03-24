#### 宏任务
|  #   | 浏览器  |  node   |
|  ----  | ----  |  ----  |
|  I/O | ✅ | ✅ |
| setTimeout  | ✅ |  ✅ |
| setInterval  | ✅ |  ✅ |
| setImmediate  | ❌ |  ✅ |
| requestAnimationFrame  | ✅ |  ❌ |


#### 微任务
|  #   | 浏览器  |  node   |
|  ----  | ----  |  ----  |
| process.nextTick  | ❌ |  ✅ |
| MutationObserver  | ✅ |  ❌ |
| Promise.then catch finally  | ✅ |  ✅ |

##### 浏览器的事件机制
宏任务 ===》 微任务交替执行
微任务是宏任务执行过程中产生的微任务，微任务有一个微任务队列来维护，每次执行完一次宏任务就会去执行微任务队列，并且清空

![avatar]('./../image/node-event.png')
##### node的事件机制

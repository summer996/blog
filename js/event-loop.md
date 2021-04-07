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

阶段概述：
- 定时器： 本阶段执行已经被settimeout()和setInterval（）的函数
- 待定回调: 执行延迟到下一个循环迭代的i/o回调
- idle, prepare：仅系统内部使用。
- 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
- 检测：setImmediate() 回调函数在这里执行。
- 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。
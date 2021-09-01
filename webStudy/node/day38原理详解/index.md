### Buffer
Buffer是nodejs中Api的一部分，不是es标准里定义的东西。主要用来处理二进制文件流和TCP流的文件缓存区，内存缓冲区

优势：Buffer使用堆外内存，不占用堆内存，实际上是字节的形式


### EVENT
emmiter 触发事件是同步还是异步 是同步，如何查看同步异步，主要看是否使用了异步逻辑，

### global
nodejs上的全局对象，和浏览器的window一样
global: {
  Buffer,
  Event,
  console,
  process,
  setTimeout,
  setInterval,
  setImmediate
}

__dirname
__filename
exports

module,
require

exports,
module.exports = {}
exports 是module.exports的引用

```js
let module = {
  exports: {
    name: 'i am exports'
  }
}

let exports = module.exports; //则exports和module.exports都是指向一个地址

console.log(exports); //{name: "i am exports"}
console.log(module.exports); //{name: "i am exports"}

exports.name = '我是李春英'
console.log(exports); //{name: "我是李春英"}
console.log(module.exports); //{name: "我是李春英"}
```

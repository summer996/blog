### 发展历史
- IIFE
- AMD CMD COMMONJS
- ESM
- 
### CommonJs
CommonJS定义的模块分为：模块引用，模块输出，模块标识

CommonJs是一个更偏向于服务端的规范，nodejs采用了这种规范，Commonjs的一个模块就是一个脚本文件，require命令第一次加载该脚本文件的时候，就会在内存中生成一个对象，下次在加载，就会直接返回对应的引用地址

由于Commonjs是同步加载的，这对于服务器来说不是问题，因为所有模块都是放在本地的，等待时间就是文件的读取时间（时间很小）。但是对于浏览器端来说，他需要从服务器加载资源，会受到网速，代理的影响，一旦等待的时间长了，那么页面就会造成假死的状态

因此在浏览器端，CommonJs规范不适用，因此浏览器端又出现了一个AMD的规范（RequireJs就是该规范的实现）

### AMD（Asynchronous Module Definition）
CommonJS解决了模块化的问题，但是这种同步加载的方式并不适用于浏览器端
```
异步模块定义规范指定了定义模块的规则，这样模块和模块的依赖就可以被异步加载，这里的异步指的是不堵塞浏览器的其他任务（dom构建，css渲染），而加载内部是同步的（加载完后模块立即执行回调）
```

AMD也是采用require命令加载模块，但是和CommonJs有所不同，该命令只需两个参数：
```
require([module], callback);//参数1是一个数组，里面是需要加载的模块；参数2是加载完成后的回调函数，该函数可以接收模块加载的内容作为参数
//例如
require(['math'], (math) => {//可以获取math模块的一些值，或者调用一些方法})//即回调函数的参数对应数组中的成员（模块）；
```

requireJs加载模块是按照AMD的规范，因此模块就需要按照AMD规定的方式来写
```
define(id?, dependencies?, factory);//id: 模块的名字，dependencies：该模块的依赖模块； factory：模块的工厂函数，模块初始化的时候要执行的函数或对象，如果是函数，只执行一次，如果是对象，此对象应该为模块的输出值
```

### CMD(Common Module Definition)
CMD推崇的是依赖就近，可以把依赖写进任何一个依赖中
```
//CMD
define(function(require, exports, module) {
  let a = requie('./a');
  a.doSomething();

  let b = require('./b');
  b.doSomething();
})

//AMD
define(['a','b'], function (a, b) {
  a.doSomething();
  b.doSomething();
})
```
### CMD和AMD
- CMD和AMD一样，都是js的模块化规范，业主要应用于浏览器端
- AMD是requireJs推广和普及的过程中被创造出来的
- CMD是为了推广SeaJs而被创造出来的


### ESM(ECMAScript6.0)
ESM和CommonJs模块的不同之处
- ESM模块输出是值的引用，输出接口动态绑定，而CommonJs输出的是值的拷贝
- ESM是编译时执行，而CommonJS模块时运行时加载

amd和cdm总的来说 都是按需加载

code splitting 按需加载
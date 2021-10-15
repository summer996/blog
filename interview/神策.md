### loader和plugin区别
- loader就是一个转化器，可以将a.less编译为b.css文件，单纯的文件转化过程
  - webpack自身只理解js文件，对于其他文件，需要通过loader将其转换为commonjs规范的文件后，webpack才能解析
- plugin是一个扩展器，它丰富了webpack本身，针对的是loader结束后，webpack打包的整个过程，它并不是直接操作文件，而是基于事件机制，会监听webpack打包过程中的某些节点，执行广泛的任务。
  - 从打包优化和压缩，一直到重新定义环境中的变量，都可以使用plugin来处理
  - 用户在webpack打包编译的过程中，在对应事件节点里面执行自定义操作，比如资源管理，bundle文件优化等
- babel-polyfill：会将浏览器不能识别的语法转为es5语法，比如箭头函数，promise等

### new
```js
Object.prototype.type = "111";
Function.prototype.type = '222';
function A() { };
var a = new A();
A.type; // 222
a.type;  //111
```

### this
```js
function Person () {
  var self = this;
  const a = () => {console.log(self)};
  a();
}

var child = new Person(); //Person


var a = 1;
var self = this;
var obj = {
  a: 2,
  get: function () {
    console.log(this.a);
  },
  geta: function() {
    console.log(self.a);
  }
}
obj.get(); // 2
obj.geta(); //1
```

### Promise.resolve() 和new Promise(resolve => resolve)
```js
//注意：Promise.resolve（）的对象，是再本轮事件循环的结束时执行，不是马上执行，也不是下一轮事件循环开始时执行
//promise.resolve()的参数有四种情况
//1、参数是一个promise实例，不做任何修改，直接返回
//2、参数是一个thenable对象，会将该对象转为promise对象，然后立即执行thenable对象里面的方法
//3、如果不是thenable也不是对象，就是一个原始值，直接返回一个新的promise对象，并且是resolved的
//4、啥也不带，就直接返回一个promise对象并且是resolved的，值为undefined；
```

### return resolve() 和 resolve（）
return resolve()只是不想再执行下面的数据
```js
const a = () => {
  return new Promise((res) => {
    res(1111);
    console.log(222);
  })
}
a(); //222;
a().then(res => console.log(res)) //1111;

const b = () => {
  return new Promise((res) => {
    return res(333);
    console.log(44444)
  })
}

b(); //没有输出;
b().then(res => console.log(res)) //333;
```

### 手动实现promise.all
```js
const promiseRace = (promiseArr) => {
  return new Promise((resolve, reject) => {
    promiseArr.forEach(promiseItem => {
      promiseItem.then(res => resolve(res), error => reject(error));
    })
  })
}
const promiseAll = (promiseArr) => {
  let count = promiseArr.length;
  return new Promise((resolve, reject) => {
    let result = [];
    promiseArr.forEach(promiseItem => {
      promiseItem.then((res) => {
        result.push(res);
        result.length === count && resolve(result);
      },
      (error) => {
        reject(error)
      })
    })
  })
}

let promise1 = new Promise(function(resolve) {
  resolve(1);
});
let promise2 = new Promise(function(resolve) {
  resolve(2);
});
let promise3 = new Promise(function(resolve) {
  resolve(3);
});
let promise4 = new Promise(function(resolve, reject) {
  reject(3);
});

promiseAll([promise1, promise2, promise3, promise4]).then((res) => {
    debugger;
}, (err) => {
  debugger;
})
```


### promise输出
```js
new Promise((resolve, reject) => {
  console.log(111)
  resolve();
  return new Prommise((res) => {
    resolve();
  }).then(() => {
    console.log(333)
  })
}).then(() => {
  console.log(222);
})
```
```js

let v = new Promise(resolve => {
      console.log("begin");
      resolve("then");
    });

    new Promise(resolve => {
      resolve(v);
    }).then((v)=>{
        console.log(v)
    });
//Promise.resolve(v).then(res => console.log(res));


    new Promise(resolve => {
      console.log(1);
      resolve();
    })
      .then(() => {
        console.log(2);
      })
      .then(() => {
        console.log(3);
      })
      .then(() => {
        console.log(4);
      });
```
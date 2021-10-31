### promise
```js

```

### 如何是一个对象的原型为null
```js
let a = {name: 'fadsf'};
a.__proto__ = null; //这样就可以改变了
let aa = Object.create({aa: 1});
aa.aa = 3;
console.log(aa.aa); //3;
delete aa.aa; // true;
console.log(aa.aa); // 1;
delete aa.__proto__.aa;
console.log(aa.aa); //undefined;
```

### 闭包
可以说是在函数内部引用保存了外部的变量，可以脱离当前作用域继续使用变量值
使用场景：防抖

### 设计模式，依赖倒置

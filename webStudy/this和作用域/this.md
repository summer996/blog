### 默认绑定（函数直接调用）
1. 全局调用，非严格模式指向window, 或者glob；严格模式指向undefined;
2. 函数直接调用情况， this都是指向全局


非严格模式下：

```js
function fn() {
  console.log(this) // console what ?
}

fn() //window, glob
```



严格模式下：

```js
function fn() {
  'use strict'
  console.log(this) // console what ?
}

fn() //undefined
```

```js
var a = 1
function fn() {
  var a = 2
  console.log(this.a) 
}
fn() // 1

// -------------- 变 -----------------
// 1. 把最外层 var a = 1 -> let a = 1，输出结果是？
let a = 1
function fn() {
  var a = 2
  console.log(this.a) 
}
fn() //undefined 因为let a是作用于当前，而window上没有a 所以是undefined

// -------------- 变 -----------------
var b = 1
function outer () {
  var b = 2
  function inner () { 
    console.log(this.b) 
  }
  inner()
}

outer()// 1  记住函数直接执行的情况 this都是指向window

// --------------- 变 -----------------
const obj = {
  a: 1,
  fn: function() {
    console.log(this.a)
  }
}

obj.fn() // 1
const f = obj.fn
f() // undefined
```

### 隐式绑定（属性访问调用）
1. 隐式绑定的this 指向的是调用堆栈的**上一级**（`.`前面的**一**个）
2. setTimeout中的this也是指向全局，因为setTimeout的堆栈不同，这里已经丢失了原来的堆栈了，所以是指向全局的
3. 匿名函数也指向全局
4. 函数作为参数传递，这时候也会丢失函数原来的this指向，真正的this是运行时的this，例如
    ```js 
   function run(fn) {fn()}
   run(obj.fn); //这时候fn的this指向全局
    ```


### 显式绑定（`call`、 `bind`、 `apply`）
1. 绑定的第一个参数为null时，就是this指向全局了
  

```js
function fn() {
  console.log(this)
}

// 为啥可以绑定基本类型 ?
// boxing(装箱) -> (1 ----> Number(1))
// bind 只看第一个 bind（堆栈的上下文，上一个，写的顺序来看就是第一个） 多个bind绑定，只有第一次生效
fn.bind(1).bind(2)() // 1 console what ?
```

```js
function myNew(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.apply(obj, args);
  return typeof res === "function" ? res : obj;
}

function Person(name) {
  this.name = name;
}

Person.prototype.say = 'fsdaf';
var p = myNew(Person, 'fdaasdfsdfas');
console.log(p);
```

### 箭头函数
箭头函数本身是没有this的，因此call, apply， bind都没有用，箭头函数的this是在编写时就确定了
箭头函数这种情况比较特殊，编译期间确定的上下文，不会被改变，哪怕你 `new`，指向的就是**上一层**的上下文,

```js
function a(x){
  this.x = x
  return this
}
var x = a(5) // 替换为 let 再试试 全局调用，this指向window
var y = a(6) // 替换为 let 再试试 // 再换回 var，但是去掉 y 的情况，再试试

console.log(x.x) // console what ?
console.log(y.x) // console what ?

// 等价于
window.x = 5;
window.x = window;

window.x = 6;
window.y = window;

console.log(y); //window
console.log(x); //6
console.log(x.x) //undefined  void 0 其实执行的是 Number(6).x
console.log(y.x) // 6
```

## 作用和与和闭包
一段代码在编译和执行阶段分别做了什么事情？

逃逸分析


### js运行三部曲
1. 语法分析
2. 预编译  变量提升
3. 解释执行 变量赋值

#### 语法分析
js在执行前，会对代码进行一个全扫描，主要是为了检查是否有语法错误，这个全扫描就是所谓的语法分析

#### 预编译
1. 创建AO（active object） 对象
2. 将形参和变量声明作为AO的属性名，值为undefined
3. 形参实参统一值
4. 在函数体找函数声明

```js
function fn  (a){
	console.log(a); // :function a(){}
	var a =123;
	console.log(a); //123
	function a(){}
	console.log(a); //123
	var b =function(){}
	console.log(b);  //:function (){}
	function d(){}
}
fn(1)
```
1. 创建AO也就是执行上下文
AO{
  
}

2. 找变量, 首选就一个fn函数，有一个形参a
AO {
  a: undefined
}

3. 给形参赋值
AO {
  a: 1
}

4. 找函数体
AO {
  a: function a() {},
  d: function d() {}
  b: undefined,

}

函数的提升优先于变量提升

首次运行js代码的时候，会创建一个全局上下文（永远在栈底），每当函数被调用的时候，都会创建一个新的函数执行上下文


VO -> AO

创建变量发生发生在预编译阶段，但还没有进入执行阶段，该过程的变量对象不能访问，因为还没有赋值，都为undefined；当进入到执行阶段的时候，变量对象（VO）的变量属性才会赋值，这是VO -> AO就完成了
```js
function test() {
  var a = 1;
  function b(){};
}

function fn() {
  var b = 2;
  function a() {};
}
test();
fn();
//分析
/**
 * 1、首先进行语法分析，就是整体代码扫描一遍，看是否有语法错误
 * 2、预编译，就是当执行test()时，会先进行预编译，并且会创建一个test的执行栈，在预编译的过程中，会提升变量，
 * 3、执行，这时候已经进入到test()所代表的函数体了，预编译已经完成了，所以开始一行一行的执行代码，这个过程就会给变量赋值
 * 4、当test（）所代表的函数体执行完毕，就销毁当前执行栈，
 * 5、这时候来到fn(),重复2，3，4步骤
 * /

```

建立作用域链

就是当前执行环节的变量对象（还没有进入执行阶段）与上层环节的活动对象（AO）组成，它保证了当前执行环境对符合访问权限的变量和函数的有序访问

例如：
```js
var c = 20;
function test() {
  var a = 10;

  functon innerTest() {
    var b = 10;
    return a + b + c;
  }

  innerTest();
}

test();

//分析
/**
 * 1、当执行到调用innerTest函数时，进入innerTest函数环境。这时候全局执行上下文和test函数执行上下文已经进入到执行阶段了，innerTest函数这时候时预编译阶段，会创建执行上下文，它的活动对象和变量对象分别是AO(test), AO(window)和VO（innerTest）,所以作用域链可以为如下：
*/

innerTestEC = {
  //变量对象
  VO: {b: undefined},
  
  //作用域链
  scopeChain: [VO(innerTest), AO(test), AO(window)],

  //this指向 函数独立调用都指向this
  this: window
}
```


**词法环境**用于存储函数什么和let,const定义的变量，**变量环境**用于存储var定义的变量
执行上下文的伪代码如下：
```js
//第一种类型，全局环境
GlobalExectionContext = { //全局执行上下文，也就是全局执行栈
  
  LexicalEnvironment: { //词法环境
    EnvironmentRecord: { //环境记录
      Type: 'Object',   //全局环境
      //标识符绑定在这里
      outer: <null>  //对外部环境的引用
    }
  },

  VariableEnvironment: { //变量环境
    EnvironmentRecord: { //环境记录
      Type: "Object",  //全局环境

      outer：<null>
    }
  }
}


// 第二种，函数环境
FunctionExectionContent = {  //函数执行上下文
  LexiEnvironment: { // 词法环境
    EnvironmentRecord: {  //环境记录
      Type: "Declarative",  //函数环境

      //标识符绑定在这里   
      outer: <Global or outer function environment reference>//对外部环境的引用
    }
  }
}
```


### 变量提升
在预编译阶段，会先进行变量提升，函数提升优先于变量，函数声明会存在环境中，而变量（var）会被创建并且初始化为undefined, let， const只会创建
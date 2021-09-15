/**开放-封闭原则，开放：扩展功能，封闭：不修改影响原代码逻辑 */
/**
 * 例如想要给window.onload绑定事件，但有不知道是否被其他人绑定过，因此为了不覆盖其他人的绑定，可以先保存之前的window.onload的事件
 */
let _onload = window.onload || function () { };

window.onload = function () {
  //先执行原来的事件
  _onload();

  //在执行想要的逻辑
  //doing something
}
//但这种方式存在两个问题
// 1、必须维护_onload这个中间变量，虽然看起来并不起眼，但是如果函数的装饰器较长，或者需要装饰的函数较多，这些中间变量的数量也会变得原来越多
// 2、还有this的问题，虽然上面没有this的问题，因为window.onload的this都是指向window,但是以下情况就有this的问题

//有问题的this指向
let _getElementById = document.getElementById;
document.getElementById = function (id) {
  console.log(12312);
  return _getElementById(id);
}
let button = document.getElementById('button');
//在输出12312之后，就会报错，原因是，_getElementById(id);中的_getElementById是一个全局函数，调用时this指向window，而document.getElementById的this指向的是document;
//改进方法，可以绑定this为document

//改进this指向的代码
let _getElementById = document.getElementById;
document.getElementById = function (id) {
  console.log(12312);
  return _getElementById.call(document, id);
}
let button = document.getElementById('button');

//AOP装饰函数
//两者区别，一个是新加函数在原函数之前执行，一个是新加函数在原函数之后执行
//缺点，修改了Function的原型，污染了原型
Function.prototype.before = function (beforefn) {
  let self = this;
  return function () {
    before.apply(this, arguments);
    return self.apply(this, arguments)
  }
}

Function.prototype.after = function (afterfn) {
  let self = this;
  return function () {
    let result = self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return result;
  }
}


//把原函数和新函数作为参数传入before或者after
let before = function (fn, beforeFn) {
  return function () {
    before.apply(this, arguments);
    return fn.apply(this, arguments);
  }
}

let a = before(function () { console.log(3) }, function () { console.log(2) });
a = before(a, function () { console.log(1) });
a();

/**
 * 单例模式，就是在生成实例前，判断是否已经生成了实例
 */

// 1、通过变量标志，存储是否生成实例

// let Singleton = function (name) {
//   this.name = name;
//   this.instance = null;
// }

// Singleton.prototype.getName = function () {
//   console.log(this.name);
// }

// Singleton.getInstance = function (name) {
//    return instance || (instance = new Singleton(name))
// }

// let a = Singleton.getInstance('a');
// let b = Singleton.getInstance('b');

// console.log(a === b);
// a.getName();
// b.getName();

// let instance = null;

// let Singleton = function (name) {
//   this.name = name;
// }

// Singleton.prototype.say = function () {
//   console.log(`i am ${this.name}`)
// }

// Singleton.getInstance = function (name) {
//   return instance || (instance = new Singleton(name))
// }

// let a = Singleton.getInstance('a');
// let b = Singleton.getInstance('b');

// console.log(a === b);
// a.say();
// b.say();

// function MyNew(fn, ...arg) {
//   let obj = {};
//   obj.__proto__  = fn.prototype;
//   let result = fn.apply(obj, arg);
//   return typeof(result) === 'object' ? result : obj
// }

/**单例模式，其实就是利用了闭包，例如以下代码 */
let getInstance = function(fn){
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}
//传入构造函数，生成惰性单例
let a = getInstance(function () { console.log('i am a 构造函数'); return {aaa: 1} });
let aa = a();
let bb = a();
// 静态方法不能使用this
/**es6 单例实现 */
class Single {
  constructor(name) {
    this.name = name;
  }
}
Single.instance = null;
Single.getInstance = (name) => {
  return Single.instance || (Single.instance = new Single(name));
}

let a = Single.getInstance(2222);
let b = Single.getInstance(3333);

/**
 * 单例模式-购物车
 */

class Cart {
  constructor() {
    this.list = [];
  }

  add(data) {
    this.list.push(data)
  }

  delete(id) {
    let arr = [...this.list];
    this.list = arr.filter(item => item.id !== id);
  }
}

Cart.instance = null;
Cart.getInstance = (name) => {
  return Cart.instance || (Cart.instance = new Cart(name));
}


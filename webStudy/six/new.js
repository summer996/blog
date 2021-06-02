function Animal (name) {
  this.name = name || 'dog'
}

Animal.prototype.say = function(){
  console.log('动物也会说话')
}

//实现以下的继承
function Child(){};
Child.prototype = new Animal();

// Child.prototype.constructor = Child;
console.log(Child.prototype);
let c = new Child();
console.log(c.__proto__.constructor);


function customNew(fn, ...args) {
  //创建新对象
  let obj = {};

  //将新对象的原型指向构造原型
  obj.__proto__ = fn.prototype;

  //将this指向新对象,执行构造函数并获取结果
  let result = fn.apply(obj, args);

  return typeof result === "object" ? result : obj;

}
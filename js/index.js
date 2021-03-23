function MathHandle(x, y) {
  this.x = x;
  this.y = y;
}

MathHandle.prototype.add = function () {
  return this.x + this.y;
}

var m = new MathHandle(1, 2);

console.log(m.add())

console.log(typeof MathHandle); //function;
console.log(MathHandle.prototype.constructor === MathHandle); //true
console.log(m.__proto__ === MathHandle.prototype); //true 实例的隐式原型等于构造函数显式原型
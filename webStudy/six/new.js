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
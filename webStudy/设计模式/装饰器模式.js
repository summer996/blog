//给已有的类，增强功能，但不影响类额外派生的子类或者实例

//传统面向对象的装饰者模式
var Plane = function () {
  
};
Plane.prototype.fire = function() {
  console.log('发射火箭')
}

var Decorator = function (plane) {
  this.plane = plane;
}

Decorator.prototype.fire = function(){
  this.plane.fire();
  console.log('发射导弹')
}

let plane = new Plane();
let decoratorInstance = new Decorator(plane);
decoratorInstance.fire();

//js
var Plane = {
  fire: function () {
      console.log('发射普通的子弹');
  }
};

var missileDecorator= function () {
  console.log('发射导弹!');
};

var fire = Plane.fire;

Plane.fire=function () {
  fire();
  missileDecorator();
};

Plane.fire();

class Plane {
  fire() {
    console.log('发送子弹')
  }
}

class DecPlane {
  constructor(plane) {
    this.plane = plane;
  }

  fire() {
    this.plane.fire();
    console.log('fasong')
  }
}

let decPlane = new DecPlane(new Plane);
decPlane.fire()
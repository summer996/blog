class MathHandle {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
  }

  add() {
    return this.x + this.y;
  }
}

const m = new MathHandle(1, 2);
console.log(m.add());

console.log(typeof MathHandle); //function;
console.log(MathHandle.prototype.constructor === MathHandle); //true
console.log(m.__proto__ === MathHandle.prototype); //true 实例的隐式原型等于构造函数显式原型



// function Animal(name) {
//   this.name = name;
// }

// Animal.prototype.say = function () {
//   console.log('say', this.name);
// }

// function Dog(name) {
//   this.eat = function () {
//     console.log('eat', this.name);
//   }
// }


// Dog.prototype = new Animal('fasfafasdfa');

// var dog = new Dog();
// dog.eat();
// dog.say();

class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log("eat", this.name);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
    this.name = name;
  }

  say() {
    console.log('say', this.name);
  }
}

var dog = new Dog('哈士奇');
dog.say();
dog.eat();

`
<ul id = 'list'>
  <li class='item'>item 1</li>
  <li class='item'>item 2</li>
</ul>
`;
a = {
  tag: 'ul',
  attrs: {
    id: 'list'
  },
  children: [
    {
      tag: 'li',
      attrs: {
        className: 'item'
      },
      children: ['item 1']
    },
    {
      tag: 'li',
      attrs: {
        className: 'item'
      },
      children: ['item 2']
    },
  ]
}

// vat vnode = h('ul#list', {}, [
//   h('li.item', {}, 'item 1'),
//   h('li.item', {}, 'item 2'),
// ])

// var btnChange = document.getElementById("btn-change");
// btnChange.addEventListener('click', () => {
//   var newVnode = h('ul#list', {}, [
//     h('li.item', {}, 'item 1'),
//     h('li.item', {}, 'item 2'),
//     h('li.item', {}, 'item 3'),
//   ]);

//   patch(vnode, newVnode)
// })




### 装饰器是什么
装饰器就是用于给一个已有的方法或者类扩展一些新的行为，而不是直接去修改它本身

当装饰器作用域类本身的时候，我们操作的对象是类本身，而当装饰器作用域类的某个具体的属性的时候，我们操作的对象既不是类本身，也不是类的属性，而是它的描述符（descriptor）, 而描述符里记录着我们对这个属性的全部信息。

最后一点，现阶段的装饰器因为还在实验性阶段，因此还没有被大部分环境支持，如果要用的话，需要使用babel进行转码，需要用到babel-plugin-transform-decorators-legacy；
```js
function isAnimal(target) {
  target.isAnimal = true;
    return target;
}

@isAnimal
class Cat {
  say() {
    console.log('i am cat')
  }
}

console.log(Cat.isAnimal);

function readonly(target, name, descriptor) {
  descriptor.writable = false;
  //当作用于对象的属性时，操作的对象是描述符也就是（descriptor）
  return descriptor;
}

class Cat {
  @readonly
  say() {
    console.log('i readonly cat')
  }
}
```

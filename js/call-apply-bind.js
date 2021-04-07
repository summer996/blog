/**
 * call apply区别
 * call接收一系列参数
 * apply接收一个包含多个参数的数组
 */

/**
 * function.call(thisArg, arg1, arg2, ...)
 * call手动实现
 * 原理：
 * 1、改变this指向
 *
 */
Function.prototype._call = function (context, ...arg) {
  context.fn = this; //this就是被绑定的函数，这里是bar
  context.fn(...arg); //执行
  // context === {
  //   value: 1,
  //   fn: bar
  // }
  delete context.fn; //删除
};

var foo = {
  value: 1,
};

function bar(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

bar._call(foo, 'chris', 10); //chris 10 1

/**
 * function.apply(thisArg, arg1, arg2, ...)
 */

Function.prototype._apply = function (context, arg) {
  context.fn = this;
  context.fn(...arg);
  delete context.fn;
};

let arr = [1, 2, 3];
function applys(arrs) {
  console.log(this.arr);
}

applys._apply(arr, [5, 6, 7]);

/**
 * bind
 * 返回一个函数
 *
 */

Function.prototype._bind = function (context, ...arg1) {
  return (...arg2) => {
    let arg = arg1.concat(arg2);
    context.fn = this;
    let val = context.fn(...arg);
    delete context.fn;
    return val;
  };
};

Number.prototype.add = function (n) {
  return this.valueOf() + n;
};
Number.prototype.minus = function (n) {
  return this.valueOf() - n;
};

LazyMan('Tony');
// Hi I am Tony
LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony // 等待了 10 秒...
// I am eating lunch
LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了 10 秒...
// I am eating diner
LazyMan('Tony')
  .eat('lunch')
  .eat('dinner')
  .sleepFirst(5)
  .sleep(10)
  .eat('junk food');
// Hi I am Tony
// 等待了 5 秒...
// I am eating lunch
// I am eating dinner
// 等待了 10 秒...
// I am eating junk food

class LazyManClass {
  constructor(name) {
    this.name = name;
    this.queue = [];
    console.log(`Hi I am ${name}`);
    setTimeout(() => {
      this.next();
    }, 0);
  }
  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time);
    };
    this.queue.unshift(fn);
    return this;
  }
  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`);
        this.next();
      }, time);
    };
    this.queue.push(fn);
    return this;
  }
  eat(food) {
    const fn = () => {
      console.log(`I am eating ${food}`);
      this.next();
    };
    this.queue.push(fn);
    return this;
  }
  next() {
    const fn = this.queue.shift();
    fn && fn();
  }
}
function LazyMan(name) {
  return new LazyManClass(name);
}

var detectCycle = function (head) {
  if (head === null) {
    return null;
  }
  let slow = head,
    fast = head;
  while (fast !== null) {
    slow = slow.next;
    if (fast.next !== null) {
      fast = fast.next.next;
    } else {
      return null;
    }
    if (fast === slow) {
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }
  return null;
};

//finally手动实现
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};

function formArray(arr) {
  const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);
  const map = new Map();
  sortedArr.forEach((v) => {
    const key = Math.floor(v / 10);
    const group = map.get(key) || [];
    group.push(v);
    map.set(key, group);
  });
  return [...map.values()];
}

function rotate(arr, k) {
  const len = arr.length;
  const step = k % len;
  return arr.slice(-step).concat(arr.slice(0, len - step));
}
//[0,1,0,3,12] //移动0
var moveZeroes = function (nums) {
  let j = 0;
  nums.forEach((item, index) => {
    if (item !== 0) {
      nums[j] = item;
      if (j !== index) {
        nums[index] = 0;
      }

      j++;
    }
  });
  return nums;
};

add(1); // 1
add(1)(2); // 3
add(1)(2)(3); // 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3);

function add() {
  let param = Array.from(arguments);
  let len = param.length;
  let res = 0;
  if (len == 1) {
    let param1 = param[0];
    res = res + param1;
    return function () {};
  }
}

function currying(fn, length) {
  length = length || fn.length;
  return function (...args) {
    return args.length >= length
      ? fn.apply(this, args)
      : currying(fn.bind(this, ...args), length - args.length);
  };
}


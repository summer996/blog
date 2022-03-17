// 1、变量提升
function fn(a, c) {
  console.log(a);
  var a = 123;
  console.log(a);
  console.log(c);
  function a() {}
  if (false) {
    var d = 678;
  }
  console.log(d);
  console.log(b);
  var b = function () {};
  console.log(b);
  function c() {}
  console.log(c);
}

fn(1, 2);

// 2、this指向
var num = 222;
var a = {
  num: 111,
  say: function () {
    console.log(this.num);
  },
};

var fn = a.say;
fn();
a.say();

var b = {
  name: 333,
  say: function (fn) {
    fn();
  },
};
b.say(a.say);
b.say = a.say;
b.say();

// 3、原型链
Array.a = 1;
Array.prototype.a = 2;
Function.prototype.a = 3;
Object.prototype.a = 4;

var arr = [];
console.log(arr.a);
console.log(arr.length.a);
console.log(arr.forEach.a);
console.log(Function.a);
console.log(Object.a);

/** 4、函数柯里化 就是高阶函数的一种应用
  let _fn = curry(function (a, b, c, d, e) {
      console.log(a, b, c, d, e);
  });

  _fn(1, 2, 3, 4, 5);// 1 2 3 4 5
  _fn(1)(2, 3, 4)(5);// 1 2 3 4 5
  _fn(1,2)(3,4)(5);// 1 2 3 4 5
  _fn(1)(2)(3)(4)(5);// 1 2 3 4 5
*/

function curry(fn) {
  const len = fn.length;
  return _curry(fn, len);
}

function _curry(fn, len, args = []) {
  return function () {
    const params = [...args, ...arguments];
    //如果刚好大于，就执行该函数
    if (params.length >= len) {
      fn.apply(this, params);
    } else {
      //如果参数个数小于最初fn.length，则递归调用，继续收集参数
      return _curry(fn, len, params);
    }
  };
}

/** 5、deepClone
let obj = {
    a: 1,
    b: '2',
    c: [1, 2, 3],
    d: new Date(),
    e: /^\d+$/,
    f:{m:1,n:2}
};
let o = {};
deepClone(obj, o)
*/
function deepClone(sourceObj, targetObj) {
  for (const objKey in sourceObj) {
    if (sourceObj.hasOwnProperty(objKey)) {
      const item = sourceObj[objKey];
      const typeStr = Object.prototype.toString.call(item);
      if (typeStr === "[object Array]") {
        targetObj[objKey] = [];
        deepClone(item, targetObj[objKey]);
      } else if (typeStr === "[object Date]") {
        targetObj[objKey] = new Date(item);
      } else if (typeStr === "[object RegExp]") {
        targetObj[objKey] = new RegExp(item);
      } else if (typeStr === "[object Object]") {
        targetObj[objKey] = {};
        deepClone(item, targetObj[objKey]);
      } else {
        targetObj[objKey] = item;
      }
    }
  }
}

/** 6、手写call或者applay，能达到和原生call或者apply的输出结果
var a = [1, 2, 3];
function f(a, b) {
    console.log(a, b);
}
f.call(this, 1, 2);
console.log(Array.prototype.slice.call(a));
console.log(Object.prototype.toString.call(a));
*/
Function.prototype.myCall = function (context) {
  const args = [...arguments].slice(1);
  context = context || window;
  context.fn = this;
  return context.fn(...args);
};
Function.prototype.myApply = function (context) {
  const args = arguments[1] || [];
  context = context || window;
  context.fn = this;
  return context.fn(...args);
};

/**7、数组扁平化：flat、递归、迭代、reduce、转string正则匹配（如有depth限制的情况下，较难）。此处的答案是模拟flat方法，难度更高
var a = [1, [2, 3], [4, [5, 6]]];
var depth = 3;
var b = a.flat(depth);
console.log(a, b, a === b);//[ 1, [ 2, 3 ], [ 4, [ 5, 6 ] ] ] [ 1, 2, 3, 4, 5, 6 ] false
*/
Array.prototype.iterativeFlat = function (depth) {
  depth = depth === undefined ? 1 : depth;
  depth = depth < 0 ? 0 : depth;
  let currentArr = this;
  let res = [];
  let hasArray = true;
  while (depth >= 0 && hasArray) {
    res = [];
    hasArray = false;
    for (let i = 0; i < currentArr.length; i++) {
      if (depth && Array.isArray(currentArr[i])) {
        res.push(...currentArr[i]);
        hasArray = true;
      } else {
        res.push(currentArr[i]);
      }
    }
    currentArr = res;
    depth--;
  }
  return res;
};
Array.prototype.recurseFlat = function (depth) {
  depth = depth === undefined ? 1 : depth;
  depth = depth < 0 ? 0 : depth;
  const res = [];
  const query = (data, dep) => {
    if (dep < 0) {
      res.push(data);
      return;
    }
    for (let i = 0; i < data.length; i++) {
      const datum = data[i];
      if (Array.isArray(datum)) {
        query(datum, dep - 1);
      } else {
        res.push(datum);
      }
    }
  };
  query(this, depth);
  return res;
};
Array.prototype.reduceFlat = function (depth) {
  depth = depth === undefined ? 1 : depth;
  depth = depth < 0 ? 0 : depth;
  let res = [];
  const query = (data, dep) => {
    if (dep < 0) {
      res.push(data);
      return;
    }
    data.reduce((prev, datum) => {
      if (Array.isArray(datum)) {
        query(datum, dep - 1);
      } else {
        prev.push(datum);
        return prev;
      }
    }, res);
  };

  query(this, depth);

  return res;
};

/** 8、手写instanceOf
var a = [];
console.log(myInstance(a, Array), a instanceof Array);// true true
var b = 1;
console.log(myInstance(b, Object), b instanceof Object);// false false
*/
function myInstance(target, origin) {
  if (typeof target !== "object") {
    return false;
  }
  while (target) {
    if (target.__proto__ === origin.prototype) {
      return true;
    } else {
      target = target.__proto__;
    }
  }
  return false;
}
/** 9、手写map或者手写reduce
map：
var a = [1, 2, 3];
var b = a.map((value, index, array) => {
    return value + array[index];
});
console.log(a, b);//[ 1, 2, 3 ] [ 2, 4, 6 ]
reduce：
var a = [1, 2, 3];
var init = 1;
var b = a.reduce((previousValue, currentValue, currentIndex, array) => {
    return previousValue + currentValue + currentIndex + array[currentIndex];
}, init);
console.log(a, b);// [ 1, 2, 3 ] 16
*/

Array.prototype.myMaps = function (fn, thisArg) {};
const myMaps = fimctopm;
Array.prototype.myMap = function (fn) {
  let obj = [];
  for (let i = 0; i < this.length; i++) {
    obj.push(fn(this[i], i, this));
  }
  return obj;
};
Array.prototype.reduceMap = function (fn) {
  return this.reduce((prev, current, index, arr) => {
    prev.push(fn(current, index, arr));
    return prev;
  }, []);
};
//手写reduce
Array.prototype.myReduce = function (fn, initData) {
  let prev = initData;
  let i = 0;
  // 需注意，此处原生reduce的判断是看参数是否只有一个，哪怕第二个参数传入undefined，也算两个参数，会返回NaN
  if (arguments.length === 1) {
    prev = this[0];
    i = 1;
  }
  for (i; i < this.length; i++) {
    prev = fn(prev, this[i], i, this);
  }

  return prev;
};

//10、手写Promise.All或者Promise.Race
function promiseAll(reqs) {
  let count = 0;
  let res = [];
  const len = reqs.length;

  return new Promise((resolve, reject) => {
    for (let i = 0; i < len; i++) {
      Promise.resolve(reqs[i])
        .then((data) => {
          res[i] = data;
          if (++count === len) {
            resolve(res);
          }
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
}

function promiseRace(reqs) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < reqs.length; i++) {
      Promise.resolve(reqs[i])
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
}

//11、手写节流或者防抖
const throttle = function (delay) {
  let timer;
  return function (callback, value) {
    if (!timer) {
      timer = setTimeout(() => {
        callback(value);
        timer = null;
      }, delay);
    }
  };
};

function debounce(delay) {
  let timer;
  return function (callback, value) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
}

function myreduce(fn, initvalue) {
  let pre = initvalue;
  let i = 0;

  if (arguments.length === 1) {
    pre = this[0];
    i = 1;
  }

  for (i; i < this.length; i++) {
    pre = fn(pre, this[i]);
  }
  return pre;
}

function promiseAll(promiseArr) {
  let len = promiseArr.length;
  let result = [];
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item) => {
      item.then(
        (res) => {
          result.push(res);
          (result.length === len) & resolve(result);
        },
        (e) => {
          reject(e);
        }
      );
    });
  });
}

function promiseRace(promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((item) => {
      item.then(
        (res) => resolve(res),
        (e) => reject(e)
      );
    });
  });
}

//防抖
function debounce(fn, delay) {
  let timer = null;
  return (...arg) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(arg), delay);
  };
}
//配置是否立即执行
function debounce(fn, delay, immediate) {
  let timer = null;
  return (...arg) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (immediate) {
      !timer && fn.apply(this, arg);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arg);
      }, delay);
    }
  };
}

//节流
/**
 * 1、游戏里面的子弹发射，发射一次之后，在等多少秒才能再次发射
 * 2、监听滚动条滚动决定是否加载更多，如果是debounce的话，直到用户不在滚动才会判断是否到达底部，而如果是throttle的话，就会每隔一段时间就去判断是否达到底部
 * 3、鼠标不断点击，单位时间只执行一次
 */
function throtle(fn, delay) {
  let timer = null;

  return (...arg) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn(arg);
      clearTimeout(timer);
    }, delay);
  };
}

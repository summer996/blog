// 1. 一个继承自 Player 的新对象 p1 被创建了。
// 2. p1.**proto** = Player.prototype，p1 的**proto**指向 Player 的原型对象
// 3. 将 this 指向新创建的对象 p1
// 4. 返回这个新对象 p1

function Player(name) {
  this.name = name;
}

function objectFactory() {
  //创建新对象
  let o = new Object();

  //获取构造函数
  let FunctionConstructor = [].shift.call(arguments); // Player 参数,参数,
  //将新对象的原型指向构造函数的原型
  o.__proto__ = FunctionConstructor.prototype;

  //改变新对象的this指向
  let resultObj = FunctionConstructor.apply(o, arguments); // 参数数组
  return typeof resultObj === 'object' ? resultObj : o;
}

const p1 = objectFactory(Player, '路白');

console.log(p1);

/**
 * 
 * 创建一个新对象
 * 将新对象的原型指向构造函数的原型
 * 将this指向新对象 
 *  如果构造函数没有显示的返回值，那么返回this
 *  如果构造函数有显示返回值，并且是基本类型，返回this
 *  如果构造函数有显示返回值，并且是对象类型，则返回该对象
 */

/**
 * new 做了什么
 * 1、创建一个新对象  
 * 2、给新对象绑定作用域 prototype
 * 3、给新对象添加属性
 * 4、返回新对象
 */
 
const newss = (fn, ...arg) => {
  //创建新对象
  let obj = {};
  //添加原型
  obj.__proto__ = fn.prototype;
  //运行构造函数fn，改变this
  let res = fn.apply(obj, arg);

  //判断结果是否为对象
  // 1、如果构造函数没有显示的返回值，那么返回this
  // function Player(color){
  //   this.color = color;
  // }
  // const white = new Player('#fff');
  // console.log(white) //Player {color: '#fff'}

  // 2、如果构造函数有显示返回值，并且是基本类型，返回this
  // function Player(color){
  //   this.color = color;
  //   return 1;
  // }
  // const white = new Player('#fff');
  // console.log(white) //Player {color: '#fff'}

  // 3、如果构造函数有显示返回值，并且对象，则返回对象
  // function Player(color){
  //   this.color = color;
  //   return {a: '22222'};
  // }
  // const white = new Player('#fff');
  // console.log(white) // {a: '22222'};

  //所以在返回的时候需要判断一下构造函数执行结果
  return typeof res === 'object' ? res : obj;

}

const myNew = function(fn, ...arg) {
  //创建一个新对象
  const obj = {};
  //改变原型
  obj.__proto__ = fn.prototype;
  //改变this指向
  const res = fn.apply(obj, [...arg]);

  return typeof res === 'object' ? res : obj;
}

//fangdou
const debounce = (fn, timeout) => {
  let time = null;
  return function (...arg) {
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(fn, ...arg)
    }, timeout)
  }
}

const t = (fn, timeout) => {
  let time = null;
  return (...arg) => {
    if (time) return;
    time = setTimeout(() => {
      fn(...arg); time = null;
    }, timeout)
  }
}

const tt = (fn, timeout) => {
  //时间戳
  let pretime = 0;
  return (...arg) => {
    let now = +new Date;
    if (now- pretime > timeout) {
      fn(...arg);
      pretime = now
    }
    
  }
}


var permute = function(nums) {
  //left随时都可以加，但不能大于n
  //right 不能加载第一个，左括号的个数大于右括号的个数， 左个数 > 右个数

  let len = nums.length;
  if (!len) return [];
  
  const dfs = (nums, [...temp],used, res, len) => {
    if (temp.length === len) {
      res.push(temp);
      return;
    }

    for (let i = 0; i < len; i++) {
      if (used[i]) continue;
      temp.push(nums[i]);
      used[i] = true;

      dfs(nums, temp, used, res, len);
      //之前做了什么，在递归之后就要取消，成为回溯
      temp.pop();
      used[i] = false;
    }

  }

  let res = [];
  let used = [];
  let temp = [];
  dfs(nums, temp, used, res, len);

  return res;
  
  
};


var combine = function(n, k) {
  const dfs = () => {
    if (temp.length === k) {
      res.push(temp);
      return;
    }

    if (temp.length + (n - current + 1) < k) return;//temp的长度+(current 到 n的长度）< k直接返回

    //使用当前元素
    dfs(n, current + 1, [...temp, current], k, res);

    //不使用当前元素
    dfs(n, current + 1, [...temp], k, res);
  }

  let temp = [];
  let res = [];
  dfs(n, 1, temp, k, res);
  return res;
};

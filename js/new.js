/**
 * new 做了什么
 * 1、创建一个新对象
 * 2、给新对象绑定作用域
 * 3、给新对象添加属性
 * 4、返回新对象
 */

const news = () => {
  let obj = {};
  let constructor = Array.prototype.shift.call(arguments);
  obj.__proto__ = constructor.prototype;

  let res = constructor.apply(obj, arguments);

  return res instanceof Object ? res : obj;

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

/**
 * 
 * //子集 视频讲解  递归
 */
var subsets = function(nums) {
  let ans = [];
  if (nums === null) return ans;

  const generate = (ans, nums, list, index) => {
      if (index === nums.length) {
          ans.push(list); 
          return;
    }
    //不选去当前元素
      generate(ans, nums, [...list], index +1);

    //选择当前元素
      list.push(nums[index]);
      generate(ans, nums, [...list], index+1);
  }

  generate(ans, nums, [], 0);

  return ans;
};

//迭代
var subsets = function(nums) {
  let result = [[]];
  //nums = [1,2];
  nums.forEach(item => {
    result.forEach(item1 => {
      //获取当前的nums元素和result元素，并且合并
      let newlist = [...item1,item];
      result.push(newlist)
    })
  })
  return result;
};

/**
 * 全排列
 */
/**
 * depth 层数
 * path 哪些数
 * used 使用过
 */

var dfs = (nums, len, depth, path, used, res) => {
  if (depth === len) {
    res.push(path);
    return;
  }

  for (let i = 0; i < len; i++) {
    if (used[i]) continue;
    path.push(nums[i]);
    used[i] = true;
    dfs(nums, len, depth + 1, [...path], used, res);
    //之前做了什么，在递归之后就要取消，成为回溯
    path.pop();
    used[i] = false;
  }
}
var solution = (nums) => {
  let len = nums.length;
  if (!len) return [];
  let res = [];
  let used = [];
  let path = [];

  dfs(nums, len, 0, [...path], used, res);

  return res;
  
 } 
 //有重复值的重拍列  回溯
var dfs = (nums, len, depth,list,used, res) => {
    if(depth === len) {
        res.push(list);
        return;
    }
  for (let i = 0; i < len; ++i) {
      //当前元素是否被使用，是 继续下一轮循环，否，执行后面代码
    //当前元素是否和前一个元素相同，并且前一个元素没有被使用，是，说明当前元素所扩展的分支和前一个元素一致，就继续执行下一轮循环，否，执行后面代码
        if(used[i] || (i > 0 && nums[i] === nums[i-1] && !used[i-1] )){
            continue;
        }
        list.push(nums[i]);
        used[i] = true;
        dfs(nums, len, depth + 1, [...list], used, res);
        list.pop();
        used[i]=false;
    }

}
var permuteUnique = function(nums) {
    let len = nums.length;
    let res  = [];
    let used = [];
    if (!len) return res;
    nums.sort((x, y) => x-y);
    dfs(nums, len, 0, [], used, res);
    return res;

};
//电话号码
var letterCombinations = function(digits) {
    let nummap = {
        2: 'abc',
        3:'def',
        4:'ghi',
        5:'jkl',
        6:'mno',
        7:'pqrs',
        8:'tuv',
        9:'wxyz'
  }
  
  const def = (digits, nummap, level, str, res,) => {
    //终止条件
    if (level === digits.lenght) {
      res.push(str);
      return;
    }

    //过程
    let currentstring = nummap[digits[level]];
    let len = currentstring.length;
    for (let i = 0; i < len; i++) {
      //drill down
      def(digits, nummap, level + 1, str + currentstring[i], res);
    }


  }
  let res = [];
  def(digits,nummap, 0, '', res);
  return res;
  
};

//括号生成
var generateParenthesis = (n) => {
  //left随时都可以加，主要不大于n
  //right，第一个不能加，左括号大于右括号，就可以加
  const dfs = (n, left, right, string, res) => {
    if (left === n && right === n) {
      res.push(string);
      return;
    }

    if (left < n) {
      dfs(n, left + 1, right, string + '(', res);
    }

    if (left > right) {
      dfs(n, left, right + 1, string + ')', res);
    }
  }

  let res = [];
  dfs(n, 0, 0,'', res);
  return res;
}

//组合
//方法一 回溯+剪枝
var combine = function(n, k) {
    const ans = [];
    const dfs = (cur, n, k, temp) => {
        // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
        if (temp.length + (n - cur + 1) < k) {
            return;
        }
        // 记录合法的答案
        if (temp.length == k) {
            ans.push(temp);
            return;
        }
        // 考虑选择当前位置
        dfs(cur + 1, n, k, [...temp, cur]);
        // 考虑不选择当前位置
        dfs(cur + 1, n, k, temp);
    }
    dfs(1, n, k, []);
    return ans;
};

//方法二 回溯+剪枝
var dfss = (nums, len, k,lastIndex, depth, list, used, res) => {
    if (depth === k) {
        res.push(list);
        return;
    }
    for(let i = 0; i < len; i++) {
        if(used[i] || i <= lastIndex) continue;

        list.push(nums[i]);
        used[i] = true;
        dfss(nums, len, k,i, depth + 1, [...list], used, res);
        list.pop();
        used[i] = false;
    }
}
var combine = function(n, k) {
    if (k > n) return [];
    let res = [];
    let used = [];
    let nums = [];
    for(let i = 1; i <= n; i++) {
        nums.push(i);
    }
    let len = nums.length;
    dfss(nums,len, k,-1, 0, [], used, res);
    return res;
};

var combine = (n, k) => {
  const dfs = (currentNum, n, k, list, res) => {
    if (list.length + (n - currentNum + 1) < k) return;//当当前list的长度加上[currentNum, n]未使用的数据的长度都小于k则说明不会生成k长度的list，直接返回
    if (list.length === k) {
      res.push(list);
      return;
    }
    //使用当前数据
    dfs(currentNum + 1, n, k, [...list, currentNum], res);
    //不使用当前数据
    dfs(currentNum + 1, n, k, [...list], res);
  }

  let list = [];
  let res = [];

  dfs(1, n, k, [...list], res);
  return res;
}

//滑窗升序 最大
var slidewindow = (nums) => {
  let result = 0;
  let slidingwindow = [];
  for (let i = 0; i < nums.length; i++) {
    let len = slidingwindow.length;
    while (len > 0 && slidingwindow[len - 1] > nums[i]) {
      // slidingwindow.shift();
      // len = slidingwindow.length;
      slidingwindow = [];
    }
    slidingwindow.push(nums[i]);
    result = Math.max(result, slidingwindow.length);
  }

  return result;
}

//滑窗升序并且连续 最大
var slidewindow = (nums) => {
  let result = 0;
  let slidingwindow = [];
  for (let i = 0; i < nums.length; i++) {
    let len = slidingwindow.length;

    if (len && nums[i] - slidingwindow[len - 1] !== 1) {
      slidingwindow = [];
    }
    slidingwindow.push(nums[i]);
    result = Math.max(result, slidingwindow.length);
  }

  return result;
}

//扑克牌顺子

var isStraight = function(nums) {
let repeat = new Array(5).fill(0);

let max = 0;
let min = 20;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) continue;
        max = Math.max(max, nums[i]);
        min = Math.min(min, nums[i]);
        if (repeat.includes(nums[i])) return false;
        repeat.push(nums[i]);
    }

    return max - min < 5;
};

//排序
var isStraight = function (nums) {
    nums.sort((a, b) => a - b);
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) count++;
        if (nums[i] === nums[i - 1]) return false;
    }
    return nums[4] - nums[count] < 5;
};


/**
 * 广度优先，队列
 * 
 */

 //二叉树层次遍历
 //深度
var levelOrder = (root) => {
  if (!root) return [];
  const dfs = (root, level, res) => {
    if (!root) return;
    if (res[level]) res[level] = [];
    res[level].push(root.val);
    root.left && dfs(root.left, level + 1, res);
    root.right && dfs(root.right, level + 1, res);
  }
  
  let res = [];
  let level = 0;
  dfs(root, level, res);
  return res;
}
 
//广度
var levelOrder = function(root) {
    const ret = [];
    if (!root) {
        return ret;
    }

    const q = [];
    q.push(root);
    while (q.length !== 0) {
        const currentLevelSize = q.length;
        ret.push([]);
        for (let i = 1; i <= currentLevelSize; ++i) {
            const node = q.shift();
            ret[ret.length - 1].push(node.val);
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
        
    return ret;
};
//每个树中的最大值
var largestValues = function(root) {
    const dfs = (root, level, res) => {
        if(!root) return;
        if(!res[level]) res[level] = [];

        res[level].push(root.val);
        
        dfs(root.left, level + 1, res);
        dfs(root.right, level + 1, res);
    }

    let res = [];
    dfs(root, 0, res);
    let result = [];
    res.forEach(item => {
        item.sort((a, b) => a - b);
        let topItem = item.pop();
        result.push(topItem);
    })
    return result;
};
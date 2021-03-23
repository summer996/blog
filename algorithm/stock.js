//https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/121-mai-mai-gu-piao-de-zui-jia-shi-ji-by-leetcode-/

/**
 *
 * 维护一个最小价格和最高收益
 * 最低点和最高点的差值，就可能是最大收益
 * 因此维护最小价格
 * 维护最大收益，通过当前价格减去最小价格，与已经存在的最大收益作比较
 */
var maxProfit = function (prices) {
  let minPrice = Number.MAX_SAFE_INTEGER;
  let maxProfit = 0;

  let len = prices.length;
  for (let i = 0; i < len; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
};

//https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/
/**
 * 求总收益和
 */
var maxProfit = function (prices) {
  let res = 0;
  let len = prices.length;

  for (let i = 1; i < len; i++) {
    if (prices[i] > prices[i - 1]) {
      res += prices[i] - prices[i - 1];
    }
  }
  return res;
};

//https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/submissions/
var maxProfit = function (prices) {
  let minPrice = Number.MAX_SAFE_INTEGER;
  let maxProfit = 0;

  let len = prices.length;
  for (let i = 0; i < len; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxProfit) {
      maxProfit = prices[i] - minPrice;
    }
  }

  return maxProfit;
};
/**
 * 动态规划
 * 三部曲
 * 1、分解子问题
 * 2、定义转移方程
 * 3、递归写代码
 * 定义二位数组，dp[n][2];
 * dp[i][0]不持有表示第i天不持有收获的最大利润
 * dp[i][1]持有，收获的最大利润，是持有，不是买入
 *
 * 转移方程
 * 不持有： dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i] - fee);解释为：今天不持有，可以由两个状态转化而来，1、昨天也不持有，2、昨天持有， 今天卖出。两者取最大值
 * 持有： dp[i][1] = max(dp[i - 1][1], dp[i- 1][0] - prices[i]);解释为：1、昨天持有，2、昨天不持有，今天买入(i-1前的收益减去今天的价格)
 *
 * 给定转移方程初始值
 * 对于第0天
 * 不持有： dp[0][0] = 0;
 * 持有： dp[0][1] = -prices[0];
 *
 *  */

var maxProfit = function (prices) {
  let n = prices.length;
  let dp = new Array(n).fill(0).map(() => new Array(2));

  //初始化方程
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < n; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  //对于最后一天，不持有才能获取最大值
  return dp[n - 1][0];
};

/**
 * 动态规划的方式
 * 都可以用当天持有 dp[i][1]表示当前持有，可以有两种情况而来，dp[i-1][1](前一天就持有)，dp[i - 1][0] - array[1](表示前一天不持有，当天买入)
 * 当天不持有dp[i][0]表示当天不持有，可以有两种情况而来，dp[i-1][0]不持有，dp[i-1][1] + array[1]前一天不持有，当天卖出
 *
 * 所以状态转移方程
 * dp[i][1] = Math.max(dp[i-1][1], dp[i - 1][0] - array[i])
 * dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + array[i])
 *
 *
 * 当然最后时不持有才能获取最大值
 */
('原题：给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。注意你不能在买入股票前卖出股票。');
//https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/121-mai-mai-gu-piao-de-zui-jia-shi-ji-by-leetcode-/
/**
 *
 * @param {*} prices
 * 状态转移方程
 *  dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
 *  dp[i][0] = Math.max(dp[i - 1], dp[i - 1] + prices[i]);
 */
/**
 *
 * @param {} prices
 * 不用动态规划
 * 用一个数据来记录购买值
 */

var maxProfit = (prices) => {
  let len = prices;
  let profit = 0;
  let buy = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < len; i++) {
    if (prices[i] < buy) {
      buy = prices[i];
    }

    if (prices[i] - buy > profit) {
      profit = prices[i] - buy;
    }
  }
  return profit;
};

/**
 *
 * @param {*} prices
 * 使用动态规划
 * 转移方程
 * dp[i][1] = Math.max(d[i - 1][1],  -prices[i]);
 * dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
 */

var maxProfit = (prices) => {
  let len = prices.length;
  let dp = new Array(len).fill(0).map(() => new Array(2));

  //初始化的dp
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < len; i++) {
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
  }

  return dp[len - 1][0];
};

/**
 * 支付手续费的股票购买
 * 状态转移方程
 * dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - pricess[i] - fee);
 * dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + pricess[i]);
 */

/**
 * 最佳买卖股票时机含冷冻期（中等） 没有手续费，冷冻期为，卖出的第二天不能买入
 * 状态转移方程
 * dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i]); //这里为什么是i-2可以有两种情况，1、i- 2天卖出，则i - 1是冷冻期，那i - 2 和 i - 1是相同的情况， 2、i-1天来就不持有,则就和i - 2不持有一个情况
 * dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
 */

var maxProfit = (prices) => {
  let len = prices.length;
  let dp = new Array(len).fill(0).map(() => new Array(2));

  //初始化的dp
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

  for (let i = 1; i < len; i++) {
    let temp = dp[i - 2] === undefined ? 0 : dp[i - 2][0];
    dp[i][1] = Math.max(dp[i - 1][1], temp - prices[i]);
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
  }

  return dp[len - 1][0];
};

/**
 * 买卖股票的最佳时机三级 困难
 * 状态转移方程
 * dp[i][1] = Math.max();
 * dp[i][0] = Math.max();
 * 
 * [3,3,5,0,0,3,1,4]
 */
var maxProfit = function (prices) {
  const n = prices.length;
  let buy1 = -prices[0],
    buy2 = -prices[0];
  let sell1 = 0,
    sell2 = 0;
  for (let i = 1; i < n; i++) {
    buy1 = Math.max(buy1, -prices[i]);
    sell1 = Math.max(sell1, buy1 + prices[i]);
    buy2 = Math.max(buy2, sell1 - prices[i]);
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }
  return sell2;
};

var maxProfit = function (prices) {
  let dp = new Array(3).fill(0);
  let min = new Array(3).fill(prices[0]);
  for (let i = 1; i < prices.length; i++) {
    for (let j = 1; j < dp.length; j++) {
      min[j] = Math.min(min[j], prices[i] - dp[j - 1]);
      dp[j] = Math.max(dp[j], prices[i] - min[j]);
    }
  }
  return dp[2];
};

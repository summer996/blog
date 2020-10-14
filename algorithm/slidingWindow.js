//violence way
const sortNumber = (a, b) => {
  return a - b;
};
const violenceWay = (nums, k) => {
  let currentarr = [nums[0], nums[1], nums[2]];
  let karr = [];
  karr.push(currentarr);
  let result = [];
  for (let i = 3; i < nums.length; i++) {
    let temp = [...currentarr];
    temp.shift();
    temp.push(nums[i]);
    karr.push(temp);
  }
  karr.forEach((item) => {
    let max = item.sort(sortNumber)[k - 1];
    result.push(max);
  });
  return result;
};

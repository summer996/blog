const template = (nums, target) => {
  let len = nums.length;
  let left = 0;
  let right = len - 1;

  while (left <= right) {
    mid = parseInt(left + (right - left) / 2); 
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
}
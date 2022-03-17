//选择排序

var selectSort = (nums) => {
  let len = nums.length;

  let minIndex = 0;
  let temp = 0;

  for (let i = 0; i < len - 1; i++) {
    minIndex = i;

    for (var j = i + 1; j < len; j++) {
      if (nums[i] > nums[j]) {
        minIndex = j;
      }
    }

    temp = nums[minIndex];
    nums[i] = nums[minIndex];
    num[minIndex] = temp;
  }

  return nums;
};

//插入排序
var insertSort = (nums) => {
  let len = nums.length;

  for (var i = 1; i < len; i++) {
    let temp = nums[i];

    let j = i - 1;
    while (j > -1 && nums[j] > temp) {
      nums[j + 1] = nums[j];
      j--;
    }
    nums[j + 1] = temp;
  }
  return nums;
};

//快速排序
quickSort(arr, 0, arr.length - 1);
var quickSort = (nums) => {
  let len = nums.length;
  if (len < 2) return nums;

  let mid = (len / 2) | 0;
  let left = [];
  let right = [];
  for (let i = 0; i < len; i++) {
    if (nums[i] < nums[mid]) {
      left.push(nums[i]);
    } else if (nums[i] > nums[mid]) {
      right.push(nums[i]);
    }
  }

  return quickSort(left).concat(nums[mid], quickSort(right));
};

function maxLength(arr) {
  // write code here
  //hash存储
  let map = new Map();
  let max = 0;
  let len = arr.length;
  let i = 0;
  for (let i = 0; i < len; i++) {
    if (map.get(arr[i]) !== undefined) {
      let index = map.get(arr[i]);
      i = Math.max(i, index + 1);
    }
    map.set(arr[i], i);

    max = Math.max(max, j + 1);
  }
  return max;
}

function mergeTwoLists(l1, l2) {
  let all = new ListNode(0);
  let current = all;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 === null ? l2 : l1;
  return all.next; //因为初始化了一个节点0，返回的时候需要去掉，本题思路和合并有序数组一样，都是双指针，一次只能动一个指针
}

//二叉树查找目标数
const isinbst = (root, target) => {
  if (root === null) return false;
  if (root.val === target) return true;
  if (root.val > target) {
    return isinbst(root.left, target);
  }

  if (root.val < target) {
    return isinbst(root.right, target);
  }
}

//二叉树插入数
const insertbst = (root, val) => {
  if (root === null) return new TreeNode(val);

  if (root.val > val) root.left = insertbst(root.left, val);

  if (root.val < val) root.right = insertbst(root.right, val);

  return root;
}

//删除二叉树
const getMin = (root) => {
  while (root.left !== null) {
    root = root.left;
  }
  return root;

}
const deletenode = (root, val) => {
  if (root === null) return null;

  if (root.val === val) {
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    //找到右遍最小的节点
    const min = getMin(root.right);
    //删除当前节点
    root.val = min.val;
    //再删除最小节点
    root.right = deletenode(root.right, min.val);
  }

  if (root.val < val) {
    root.right = delete(root.right, val)
  }

  if (root.val > val) {
    root.left = delete (root.left, val);
  }

  return root;
}

//翻转二叉树
const invertTree = (root) => {
  const deep = (root) => {
    if (root === null) return null;

    let temp = root.left;
    root.left = deep(root.right);
    root.right = deep(temp);
    return root;
  }

  
  return deep(root);
}

//二分基本法
const search = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + parseInt((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) {
      right = mid - 1;
    }
    if (nums[mid] < target) {
      left = mid + 1;
    }
  }
}

//左边界二分法
const leftsearch = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = left + parseInt((right - left) / 2);

    let item = nums[mid];
    if (item === target) {
      right = mid - 1;
    }
    if (item > target) {
      right = mid - 1
    }
    if (item < target) {
      left = mid + 1;
    }
  }

  if (left >= nums.length || nums[left] === target) return -1;
  return left;
}

//右边界二分法
const rightsearch = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = left + parseInt((right - left) / 2);

    let item = nums[mid];
    if (item === target) {
      left = mid + 1;
    }

    if (item > target) {
      right = mid - 1;
    }

    if (item < target) {
      left = mid + 1;
    }

  }

  if (!nums[right] || nums[right] !== target) return -1;
  return right;
}

//倒数k个节点
const nodek = (node, k) => {
  let p1 = node;
  let p2 = node;

  for (let i = 0; i < k; i++) {
    p1 = node.next;
  }
  while (p1 !== null) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p2;
}



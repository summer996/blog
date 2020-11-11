//middleOrder
//使用递归  recursion
var middleOrder = (root) => {
  const res = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return res;
};

//使用堆栈
var middleOrder = (root) => {
  const res = [];
  const stk = [];
  while (root || stk.length) {
    while (root) {
      stk.push(root);
      root = root.left;
    }
    root = stk.pop();
    res.push(root.val);
    root = root.right;
  }
  return res;
};

//使用morris 空间复杂度常数

/**
 *
 * @param {} root
 * 1、如果root没有左孩子，就将root的值放入数组中，并且root = root.right;
 * 2、如果root有左孩子，就找到root左子树上最右边的节点（即左子树中序遍历的最后一个节点，root在中序遍历中的前驱节点）就说说以root分割的前一个元素 记为：prenode
 * 如果prenode的右孩子为空，就将其右孩子指向root,此时就访问root = root.left;
 * 如果prenode的右孩子不为空，就将其右孩子指向root,此时说明root左子树遍历完了,此时将root的值放入数组中,然后将prenode的右孩子置为null,，并且root = root.right;
 *
 */
var middleOrder = (root) => {
  const res = [];
  let prenode = null;

  while (root) {
    if (!root.left) {
      res.push(root.val);
      root = root.right;
    } else {
      //先获取左孩子，然后一直向右走，走到不能走
      prenode = root.left;
      while (prenode.right && prenode.right !== root) {
        prenode = prenode.right;
      }

      if (!prenode.right) {
        prenode.right = root;
        root = root.left;
      } else {
        res.push(root.val);
        prenode.right = null;
        root = root.right;
      }
    }
  }

  return res;
};

/**
 * 前序遍历  根左右
 */
//递归
var preorder = (root) => {
  let res = [];

  const inorder = (root) => {
    if (!root) return;
    res.push(root.val);
    inorder(root.left);
    inorder(root.right);
  };

  inorder(root);
  return res;
};

//堆栈
var preorder = (root) => {
  let res = [];
  let stack = [];

  if (root) {
    stack.push(root);
  }
  while (stack.length) {
    let node = stack.pop();
    res.push(top.val);
    //栈的先进后出，因此先近右边，在进左边
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }

  return res;
};

/**
 * 后续遍历  左右根
 */
//递归
var tree = (root) => {
  let res = [];

  const inorder = (root) => {
    if (!root) return;

    inorder(root.left);
    inorder(root.right);
    res.push(root.val);
  };

  inorder(root);
  return res;
};

//堆栈
var tree = (root) => {
  let res = [];
  let stack = [];

  root && stack.push(root);

  while (stack.length) {
    let node = stack.pop();
    res.unshift(node.val);
    //栈的先进后出
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }
  return res;
};

//相同二叉树
var themeTree = (one, two) => {
  const checkoutTree = (root1, root2) => {
    if (root1 === root2) return true;
    else if (!root1 || !root2) return false;
    else {
      let res1 = root1.val === root2.val;
      if (!res1) return false;
      let res2 = checkoutTree(root1.left, root2.left);
      let res3 = checkoutTree(root1.right, root2.right);
      return res1 && res2 && res3;
    }
  };

  return checkoutTree(one, two);
};

//翻转二叉树
var invertTree = (root) => {
  const traversal = (root) => {
    if (!root) return null;
    else {
      [root.right, root.left] = [traversal(root.left), traversal(root.right)];
      return root;
    }
  };

  return traversal(root);
};

//层序二叉树
var floorTree = (root) => {
  let tempRes = [];

  const tree = (root, depth) => {
    if (!root) return;
    if (!tempRes[depth]) tempRes[depth] = [];
    tempRes[depth].push(root.val);
    tree(root.left, depth + 1);
    tree(root.right, depth + 1);
  };

  tree(root, 0);
  return tempRes;
};

//二叉树右视图
var rightTree = (root) => {
  let tempRes = [];
  let res = [];

  const tree = (root, depth) => {
    if (!root) return;
    if (!tempRes[depth]) tempRes[depth] = [];
    tempRes[depth].push(root.val);
    tree(root.left, depth + 1);
    tree(root.right, depth + 1);
  };

  tree(root, 0);
  tempRes.forEach((item) => {
    let len = item.length - 1;
    res.push(item[len]);
  });

  return res;
};

//二叉树最深
var depthTree = (root) => {
  // let res = [];

  // const tree = (root, depth) => {
  //   if (!root) return;
  //   if (!res[depth]) res[depth] = [];
  //   tree(root.left, depth + 1);
  //   tree(root.right, depth + 1);
  // }

  // tree(root, 0);
  // return res.length;

  let res = 0;

  const tree = (root, depth) => {
    if (!root) return;
    if (depth > res) res = depth;
    tree(root.left, depth + 1);
    tree(root.right, depth + 1);
  };

  tree(root, 1);
  return res;
};

//二叉树2小值
var secondTree = (root) => {
  let res = [];
  const tree = (root) => {
    if (!root) return;
    tree(root.left);
    res.push(root.val);
    tree(root.right);
  };
  tree(root);
  let result = [...new Set(res)];
  return result[1] ? result[1] : -1;
};

//sum二叉树
var sumTree = (root) => {
  let sum = 0;
  const tree = (root) => {
    if (!root) return;
    tree(root.right);
    root.val += sum;
    sum = root.val;
    tree(root.left);
  };

  tree(root);
  return root;
};

//查找指定二叉树
var searchTree = (root, val) => {
  const tree = (root) => {
    if (!root) return null;
    if (root.val === val) return root;
    else if (root.val > val) {
      tree(root.left);
    } else {
      tree(root.right);
    }
  };

  tree(root);
  return root;
};

//n叉树的最深
var depthTree = (root) => {
  let res = [];

  const tree = (root, depth) => {
    if (!root) return;
    if (!res[depth]) res[depth] = [];
    root.children.forEach((item) => {
      tree(item, depth + 1);
    });
  };
  tree(root, 0);
  return res.length;
};

//n叉树的前序
var preTree = (root) => {
  let res = [];

  const tree = (root) => {
    if (!root) return;
    res.push(root.val);
    root.children.forEach((item) => {
      tree(item);
    });
  };
  tree(root);
  return res;
};

//n叉树后序遍历
var backTree = (root) => {
  let res = [];

  const tree = (root) => {
    if (!root) return;
    // root.children.map(item => {
    //   tree(item);
    // })
    let { children } = root;
    let len = children.length;
    for (let i = 0; i < len; i++) {
      tree(children[i]);
    }
    res.push(root.val);
  };

  tree(root);
  return res;
};

//n叉树层序遍历
const sequenceTree = (root) => {
  let res = [];

  const tree = (root, depth) => {
    if (!root) return;
    if (!res[depth]) res[depth] = [];
    res[depth].push(root.val);
    root.children.forEach((item) => {
      tree(item, depth + 1);
    });
  };

  tree(root, 0);
  return res;
};

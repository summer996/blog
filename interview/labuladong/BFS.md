### 树的最小高度
```js
const bfs = (root) => {
  if(root === null) return 0;
  let res = 0;
  const bfs = (root, deepth) => {
    if(root === null) return;
    if(root.left === null && root.right === null)  res = res !== 0 ? Math.min(res, depth) : depth;
    bfs(root.left, deepth + 1);
    bfs(root.right, deepth + 1);
  }
  bfs(root, 1);
  return res;
}
```
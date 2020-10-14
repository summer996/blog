算法还是主要从时间和空间两个维度去考量

- 时间维度：执行当前算法需要的时间，通常称为时间复杂度
- 空间复杂度： 执行当前算法需要占用的空间内存，我们通常用空间复杂度来描述

## 时间复杂度

常见的时间复杂度量级有：

- 常数阶 O(1);
- 对数阶 O(logn)
- 线性阶 O(n)
- 线性对数阶 nO(logn)
- 平方阶 O(n^2)
- 立方阶 O(n^3)
- K 次方阶 O(n^k)
- 指数阶 O(2^n)

1、常数阶 O(1) </br>
无论代码执行了多少行，只要没有循环等复杂的结构，那么代码的时间复杂度就是 O(1),如：

```
const i = 1;
const j = 2;
const k = 3;
i++;
J++;
k++;
.
.
.
```

上述代码在执行的过程中，它的消耗时间并不会随着某个变量的增长而增长，那么无论这样的代码有多少，即使有几十几百万行，都可以用 O（1）来表示他的复杂度。

2、线性阶 O（n）</br>
例如这样的代码:

```
for (let i = 0; i < n; i++) {
  let j = i;
  j ++;
}
```

这样的代码，由于有个 for 循环，而且只有一次，所以可以说这段代码执行的时间复杂度是，O（n）

3、对数阶 O(logn) </br>

```
let i = 1;
while(i < n) {
  i = i * 2;
}
```

假设这段代码的执行次数为 X，则`2^X = n`那么`X = logn`因此就是对阶数 O（logn）;

4、线性对阶数 O(nlogN) </br>
就是把时间复杂度为 logN 的代码，循环了 n 次

```
for(m=1; m<n; m++)
{
    i = 1;
    while(i<n)
    {
        i = i * 2;
    }
}
```

5、平方阶 O(n^2)

```
for(x=1; i<=n; x++)
{
   for(i=1; i<=n; i++)
    {
       j = i;
       j++;
    }
}
```

## 空间复杂度

如果算法的执行需要临时空间 **不** 需要随着某个变量 n 的大小而变化，那么此算法空间复杂度就为一个常量，可表示为 O(1)

```
const i = 1;
const j = 2;
++i;
++j;
const m = i + j;
```

空间复杂度为 O（n）</br>
例如：

```
const a = new Array(10);
for(let i = 0; i < a.length; i ++) {
  let j = i;
  j++;
}
```

在这段代码中，由于只有第一行创建了一个数组，然后其他的代码虽然有循环，但是没有在分配空间，所以这段代码的空间复杂度就是 `S(n) = O(n)`
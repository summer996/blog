### 正则基本用法

### 对象

### Proxy 
### Reflect


### 可迭代对象
- 可迭代协议：对象必须实现iterator方法，对象或者原型上必须又Symbol.iterator: () => 迭代器协议
- 迭代器协议：必须实现next方法， next方法返回对象{done, value}

### 手动实现可迭代对象
```javascript
let obj = {
  count: 0,
  [Symbol.iterator]: () => {
    return {
      next: () => {
        obj.count++;
        if (obj.count < 3) {
          return {
            value: obj.count,
            done: false
          }
        } else {
          return {
            value: undefined,
            done: true
          }
        }
      }
    }
  }
}
```

### 遍历
1. for in
- 不仅会遍历当前对象，还会遍历原型上的对象
- 不会被break
- 不适合遍历数组

1. for of
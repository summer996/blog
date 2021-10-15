### LRU算法 least recently used
LRU是一种缓存淘汰算法策略。淘汰最久没有使用的数据，时间控制

哈希表查找快，但是数据无固定顺序，链表有顺序，插入删除快，但是查找慢，综合使用一种新的数据结构，哈希链表

```js
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.map = new Map();
    }

    get(key) {
        let val = this.map.get(key);
        if (val === undefined) return -1;

        this.map.delete(key); // 因为被用过一次，原有位置删除
        this.map.set(key, val); // 放入最下面表示最新使用
        return val;
    }

    put(key, val) {
        if (this.map.has(key)) this.map.delete(key); // 如果有，删除
        if (this.map.size === this.capacity) {
        //entries返回一个map迭代器，就具有next,就返回第一个值，就可以删除
          this.map.delete(this.map.entries().next().value[0])
        }
        this.map.set(key, val); // 放到最下面表示最新使用
    }
}

```


### LFU算法 least frequently used 
淘汰使用次数最少的数据，类似垃圾回收的标记更新（垃圾回收是什么）

```js
class LFUClass {
  constructor(capacity) {
    this.capacity = capacity;
    this.value = new Map();
    this.used = new Map();
  }

  get(key) {
    if(this.value.has(key)) {
      let value = this.value.get(key);
      //更新使用位置
      this.value.delete(key);
      this.value.set(key, value);

      //更新使用次数
      let count = this.used.get(key);
      this.used.set(key, count + 1);
      return value;
    } else {
      return -1;
    }
  }

  put(key, value) {
    if(this.capacity === 0) return;
    //寻找最小值
    let min = Math.min(...this.value.values());

    //当前存在
    if(this.value.has(key)) {
      //更新使用位置
      this.value.delete(key);
      this.value.set(key, value);

      //更新使用次数
      let count = this.used.get(key);
      this.used.set(key, count + 1);
    } else {
      //不存在
      this.value.set(key, value);
      this.used.set(key, 1);
    }

    //当前是否大于最大存储
    if(this.value.size > this.capacity) {
      let it = this.value.keys();
      let delekey = it.next().value;
      while(this.value.get(delekey) !== min) {
        delekey = it.next().value;
      }

      this.value.delete(delekey);
      this.used.delete(delekey);
    }
  }   
}


var LFUCache = function(capacity) {
  this.size = capacity
  this.valueMap = new Map()     // 记录值
  this.useMap = new Map()       // 记录使用次数
};

LFUCache.prototype.get = function(key) {
  if (this.valueMap.has(key)){       // 当存在时 删掉原来的重新添加  使用值加1
    let use = this.useMap.get(key)
    let value = this.valueMap.get(key)
    this.valueMap.delete(key)
    this.useMap.set(key, use + 1)
    this.valueMap.set(key, value)
    return value
  } else {
    return -1
  }
};

LFUCache.prototype.put = function(key, value) {
  if(this.size === 0) return
  let min = Math.min(...this.useMap.values())  // 缓存下 最小使用值
  if (this.valueMap.has(key)) {                // 如果存在 值重新赋, use加一
    this.valueMap.set(key, value)
    let use = this.useMap.get(key)
    this.useMap.set(key, use + 1)
  } else {                                     // 不存在就直接加
    this.valueMap.set(key, value)
    this.useMap.set(key, 1)
  }
  // 当超出, 删掉不常用的 当碰到用的次数相同的删掉 较前未使用的
  if(this.valueMap.size > this.size){
    let it = this.valueMap.keys()              // 缓存 key 遍历器
    let delKey = it.next().value
    while(this.useMap.get(delKey) !== min){    // 获取使用值为 min 的key
      delKey = it.next().value
    }
    this.useMap.delete(delKey)                 // 删掉该项
    this.valueMap.delete(delKey)
  }
};

class Node {
  constructor(key, value){
    this.key = key;
    this.val = value;
    this.pre = null;
    this.next = null;
    this.times = 1;   // 使用次数
  }
}
class DBLinkedList {  // 双端链表
  constructor(){
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail; // 头连尾
    this.tail.pre = this.head;  // 尾连头
  }

  add(node) {// 从前面添加
    node.next = this.head.next;
    this.head.next.pre = node;
    this.head.next = node;
    node.pre = this.head;
  } 

  remove(node) {
    node.pre.next = node.next;
    node.next.pre = node.pre;
  }
}
```
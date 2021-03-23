js语言本身只有字符串数据类型，没有二进制数据类型，但是像处理TCP流或者文件流时，必须使用到二进制数据，因此在node.js中定义了一个buffer类，专门用来存放二进制数据的缓存区。

在node.js中，buffer类事随node内核一起发布的核心库，buffer库为node带来了一种存储原始数据的方法，可以让node.js处理二进制数据，每当需要在node.js中处理I/O操作中移动的数据，就有可能使用buffer库，原始数据存储在buffer类的实例中，buffer类似一个**整数数组**，对应v8堆内存之外的一块**原始内存**

node.js目前支持的字符串编码:
- ascii 仅支持7位ASCII数据，如果设置去掉高位的话，这种编码十非常快的
- utf8 多字节编码的Unicode字符，许多网页和其他文档格式都是用UTF-8
- ut16le 2或4个字节，小字节序编码的unicode字符，支持代理对（U+10000至U+10ffff）
- ucs2 utf16le的别名
- base64 Base64编码
- latin1 一种把buffer编码成一字节编码的字符串的方式
- binary latin1的别名
- hex 将每个字节编码为两个十六进制字符

#### 创建Buffer类
- Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- Buffer.allocUnsafeSlow(size)
- Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

#### 写入缓冲区
```
const buf = Buffer.alloc(256);
buf.write(string[, offset[, length]][, encoding])
```
- string 写入缓冲区的字符串
- offset 缓冲区开始写入的索引值，默认为0
- length 写入的字节数，默认为buffer.length
- encoding 使用的编码，默认为’Utf8‘

#### 返回值
返回实际写入的大小，如果buffer空间不足，则只会写入部分字符串

### 从缓冲区读取数据
#### 语法
```
buf.toString([encoding,start, end]);
```
- encoding 使用的编码，默认为utf8
- start 指定开始读取的索引位置，默认为0
- end 结束位置，默认为缓冲区的末尾

#### 返回值
解码缓冲区数据并使用指定的编码格式返回字符串
#### 实例
```
const buf = Buffer.alloc(222);
for(let i = 0; i < 20; i++) {
  buf[i] = i + 97;
}

buf.tostring('ascii');
``` 

### Buffer转化为JSON对象
#### 语法
```
const buf = Buffer.alloc(222);
const json = buf.toJSON();
```
当字符串化一个buffer实例时，JSON.stringify()回隐士的调用该toJSON();
#### 返回值
返回JSON对象
#### 实例 
```
const buf = Buffer.from([1,2,3,4]);
const json = JSON.stringify(buf);

console.log(json);//输出：{'type': 'Buffer', 'data': [1,2,3,4]};

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);
```
### 缓冲区比较
```
const otherBuffer = Buffer.alloc(222);
const buffer = Buffer.alloc(222);
buffer.compare(otherBuffer); //返回一个数字，表示buffer和otherBuffer之前，之后，或相同
```
例如：
```
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
```
### 拷贝缓冲区

```buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])```
- targetBuffer - 要拷贝的 Buffer 对象。
- targetStart - 数字, 可选, 默认: 0
- sourceStart - 数字, 可选, 默认: 0
- sourceEnd - 数字, 可选, 默认: buffer.length-

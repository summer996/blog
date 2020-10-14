文章参考https://www.cnblogs.com/penghuwan/p/12053775.html

首先需要知道的是，javascript 是不能处理二进制数据的，所以处理二进制的方式就是试用 charCodeAt()或者把字节一个一个的从文字编码转为二进制，还有就是可以把二进制转为 base64 编码,这两种方式不仅速度慢，而且容易出错，因此不推荐。

而在前端中，二进制有 Bolb、ArrayBuffer 和 Buffer。

概述

- Blob： 前端的一个专门用于支持文件操作的二进制对象
- ArrayBuffer： 前端一个通用的二进制缓冲区，类似数组，但在 API 和特性上却有诸多不同
- Buffer：node.js 提供的一个二进制缓冲区，常用来处理 I/O 操作。

## Blob 对象

Blob(Binary large object)对象代表了一段二进制数据，提供了一些列的操作接口，其他操作二进制数据的 API，比如 file 对象，都是建立在 blob 对象的基础上的，File 继承了 Blob 的所有属性

因此可以说 File 是一种特殊的 Blob 对象。

在前端工程中，有哪些操作可以获取 File 对象了，请看这两种操作：

- `<input />`标签上所选择的文件
- 拖拽中生成的 DataTransfer 对象

File 对象是一种特殊的 Blob 对象，因此可以直接在 File 上直接调用 Blob 的方法，而 Blob 的方法有这些：

- 文件下载，通过 URL.createObjectURL(blob)生成的 Blob URL，直接复制给 a.download 属性
- 图片显示，通过 URL.createObjectURL(blob)生成 Blob URL，赋值给 img.src 属性
- 资源分段上传，通过 blob.slice 可以分割二进制数据为子 blob 上传
- 本地读取文件，FileReader 的 API 可以将 Blob 或 File 转化为文本/arrayBuffer/DataUrl 等类型

生成 Blob 对象的两种方式：一种是使用 Blob 构造函数，另一种是对现有的 Blob 对象使用 slice 方法切出一部分
1、Blob 构造函数，接受两个参数，第一个参数是一个包含实际数据的数组，第二个参数是数据的类型，这两个参数都不是必须的

```
let htmlParams = 'fasfas'
let myBlob = new Blob(htmlParams, {'type': 'text/xml'})
```

### 本地读取文件内容

如果想读取 Blob 或者文件对象并转化为其他格式的数据，可以借助 FileReader 对象的 API 进行操作：

- FileReader.readAsText(Blob):将 Blob 转化为文本字符串
- FileReader.readAsArrayBuffer(blob): 将 blob 转为 arrayBuffer 格式的数据
- FileReader.readAsDataURL(blob)：将 blob 转化为 base64 格式的 dataUrl

例如：

```
<input
  ref={inputRef}
  type="file"
  onChange={(e: any) => {
    let file = inputRef.current.files[0];
    debugger;
    const reader = new FileReader();
    reader.readAsText(file)
    reader.onload = () => {
      const content = reader.result;
      console.log(content);  //当加载成功就会在控制台打印出读到到文件
    }

  }}
/>
```

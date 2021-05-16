### 前端理由router 原理及表现

vue => hash, history
react => hash, history

1. 页面间的交互不会刷新页面
2. 不同url/路由/路径 会渲染不同的内容

hash和history的区别
1. hash有#， history没有
2. hash的#不会传递给服务端，history所有的url内容，服务端都可以获取到
3. history路由，应用在部署的时候，需要注意html文件的访问
4. hash通过 hashChange 监听变化， history 通过popState 监听变化

#### hash

#### 特性
1. url中带有一个#， #只是浏览器端或客户端的状态，不会传递给服务端
   1. www.baidu.con/#/user => http: //www.baidu.com/
   2. www.baidu.com/#/list/detail
2. hash值的改变，不会刷新页面
   1. location.hash = '#aaaa',
   2. location.hash = '#fsadf'
3. hash值的改变，会在浏览器的访问历史中添加一条记录，浏览器的前进和后退按钮，可以控制hash的切换
4. hash值的改变，会触发 hashChange 事件
5. 如何改变 hash
   1. location.hash = '#aaa'
   
#### history
hash有个 # 不美观，服务端无法接收到hash部分的内容
```js
//history的api 详情参考mdn
window.history.back(); //后退
window.history.forward(); //前进
window.history.go(number);//正数前进，负数后退
window.history.pushState();//location.href;
window.history.replaceState();//location.replace;
```

### 面试题
pushState时，会促发 popState 事件嘛？
1. pushState/replaceState 都不会触发popState事件， 需要手动触发页面的重新渲染
2. popState什么时候会触发？
   1. 点击浏览器的前进后退按钮
   2. js 调用go
   3. js 调用back
   4. js 调用forward

### nginx配置
1. index.html存在服务器本地
```js
location /main/ {
  
}
```

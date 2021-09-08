### history
常用api
```js
window.history.back();//后退一步
window.history.forward();//前进一步 
window.history.go();// 符号前进或者后退，数字代表几步
window.history.pushState(); // location.href 页面的浏览器记录里面会添加一个历史记录
window.history.replaceState(); // location.replace 替换当前的历史记录
```

### pushState / replaceState 的参数
```window.history.pushState(state, title, url)```
1. state 是一个对象，是一个与指定网址相关的对象
2. title，新页面的title
3. url，新页面的地址

### 相关面试题
pushState 或者 replaceState时， 会触发 popState 事件吗？
1. pushState 或者 replaceState时，不会触发页面的刷新，也不会触发popState 事件，需要手动触发页面的重新渲染
2. popState 什么时候会触发？
   1. 点击浏览器的前进后退按钮
   2. js调用back go forward等api

### Nginx 配置

1、index.html存在服务器本地

访问地址：
www.lubai.com/a/
www.lubai.com/b/

```nginx
localtion / { //根路由访问，这样上面的两个地址都会访问到www.lubai.com/home/dist/index.html这里
  try_files $uri/ /home/dist/index.html //文件存在的地址
}


```

2. index.html 存在于远程地址，例如oss/cdn上面

nginx 配置在a服务器上，index.html 被上传到了cdn上

访问地址:
www.lubai.com/main/a/
文件存储地址：
www.lubai-cdn.com/file/index.html

```nginx
location /main/ {
  rewrite ^ /file/index.html break;
  proxy_pass https://www.lubai-cdn.com; //当访问www.lubai.com/main/a/都会被代理到https://www.lubai-cdn.com/file/index.html 这里
}
```
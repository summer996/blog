### Hash的实现以及特性

#### 特性
1. url中的hash值只是客户端/浏览器端的一种状态，不会传递给服务器
2. hash值的改变，不会导致页面的刷新
3. hash值的改变，会在浏览器的访问历史中增加记录，因此可以通过浏览器的前进与后退来控制hash的改变
4. hash值的改变，会触发 hashchange事件

#### 如何控制hash
1. 通过a标签，设置href属性，当用户点击a标签时，Url中的hash会改变为href的属性值
2. 通过js,例如```location.hash = '#hash-value'```



### 简介
hooks是16.8添加的新特性，可以在不编写class的情况下使用state以及其他生命周期
### 为什么会有Hooks
Hook解决了facebook五年来编写和维护成千上万的组件时，遇到各种各样看起来不相关的问题，但这也是大众在项目中有遇到的
- 在组件之间复用状态逻辑很困难
- 复杂组件变得难以理解
- 难以理解的class,在class组件中，必须要去学习js中this的指向
- 使用class组件会无意中鼓励开发者使用一些让优化措施无效的方案，class也给目前的工具带来了一些问题，例如不能很好的压缩，热重载出现不稳定的情况

### state Hook
useState的状态更新函数类似class组件的this.setState，但是它不会把新的state和旧的state合并，而是每次更新都是一个新的state

### Effect Hook
它和class组件中的componentDidMount, componentDidUpdate，componentWillUnmount具有相同的功能，只是合并在一个api中

React会等待浏览器完成画面渲染之后，才会延迟调用useEffect，默认情况下（如果添加依赖，只有依赖发生变化，才会调用）useEffect在每次渲染后，都会调用，包括第一次渲染

返回一个函数就可以清除副作用，通过hook可以把组件内相关的副作用组织在一起，例如监听和取消监听

### useState是如何对应组件

### 为什么在组件内部调用useEffect
将useEffect放在组件内部，可以让我们直接在effect中直接调用count state变量，而不需要其他方式来处理

hook使用了js的闭包机制，而不用在js已经提供了解决方案的情况下，还引入特定的react api；

### 使用多个Effect实现关注点分离
使用hook的一个目的就是要解决在class组件中，在某个生命周期里面，常常包含互不相关的逻辑，又常把相关逻辑分离到不同的几个生命周期中，这使得代码变得可维护性不高

### 为什么每次更新都会运行effect
在运行新的一个effect时，会清除上一个创建的effect，重新创一个effect并且运行
```js
// Mount with { friend: { id: 100 } } props
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // 运行第一个 effect

// Update with { friend: { id: 200 } } props
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // 运行下一个 effect

// Update with { friend: { id: 300 } } props
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // 清除上一个 effect
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // 运行下一个 effect

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // 清除最后一个 effect
```
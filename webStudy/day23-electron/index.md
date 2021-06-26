### 架构
一个应用对应一个主进程，主进程包含原生Api和node.js

主进程中可以创建渲染进程

渲染进程主要是web页面，通过浏览器的渲染引擎来渲染页面

主进程和渲染进程通过ipc通信

### 环境搭建
```yarn add electron```
启动项目```electron .```

### 主进程模块
```const {app, BrowserWindow, ipcMain} = require('electron')```;
- ```BrowserWindow```控制窗口
- ```Notification```通知 ```notification.show()```
- ```ipcMain.handle（channel，handler）```主进程，继承```Event Emitter```

#### 主进程的作用
- package.json中的main脚本
- 一个应用对应一个主进程
- 原生GUI的调度管理
- app应用的生命周期
- 创建渲染进程

#### ipc(inter-process-communication，进程间通信)
- 通知事件，数据传输，数据共享
- 主进程的ipcMain和渲染进程的ipcRenderer
  - 继承自EventEmitter

#### 从渲染进程到主进程
- callback写法
  - ipcRender.send()
  - ipcMain.on();
- promise写法（electron 7.0之后， 处理请求+响应模式）
  - ipcRenderer.invoke
  - ipcMain.handle

#### 主进程到渲染进程
- ipcRenderer.on();
- webContents.send();

#### 优势
- 不必为兼容而烦恼
- 使用chrome的最新特性，无需polyfill
- es标准最新的语法
- 没有跨域问题，请求走node.js
- 读取本地文件


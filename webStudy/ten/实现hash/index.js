//手动实现hash路由
/**
 * 实现思路
 * 当点击a标签的时候，url中的hash值会改变为href的属性值
 * 当window监听到hashchagne事件被触发，就会去执行内容刷新，因此需要注册hashchange监听事件
 * 而刷新函数，需要根据当前location.hash的值，来获取当前的url,并且在this.routes中找到对应的注册事件，进行执行
 * 然后hash路由就需要去处理，处理方式为
 * 1、根据hash的值，去执行回调函数，执行对应的处理逻辑
 * 
 */

class HashRouter {
  constructor() {
    this.routes = {}; //路由注册与回调事件
    this.refresh = this.refresh.bind(this);
    window.addEventListener('load', this.refresh, false);//这是因为，在页面加载完之后，应该执行当前hash的对应事件；
    window.addEventListener('hashchange', this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function () { };
  }

  refresh() {
    const path = `/${location.hash.slice(1) || ''}`; //slice（1）是去掉#
    this.routes[path]();
  }


}
class HashRouters {
  constructor() {
    this.routes = {}; //存储path以及callback的对应关系
    this.refresh = this.refresh.bind(this);
    //页面初始化就会渲染一次路由？？？？
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false)
  }
  route(path, callback) {
    this.routes[path] = callback || function () {};
  }

  //渲染当前路径对应的操作
  refresh() {
    const path = `/${location.hash.slice(1) || ''}` //slice（1）的作用去掉#
    this.routes[path]();
  }
}

const body = document.querySelector('body')
const changeBgColor = (color) => {
  body.style.backgroundColor = color;
}

let Router = new HashRouter();
//注册路由
Router.route('/', () => {
  changeBgColor('white');
})

Router.route('/green', () => {
  changeBgColor('green');
})

Router.route('/gray', () => {
  changeBgColor('gray');
})

/**
 * 观察者
 * 主体和观察者是相互感知的
 * 1对多，不能单独更新一个观察对象
 * 
 * 栗子：买房子与售楼处
 */
//E66
class Subject {
  constructor() {
    this.list = [];
  }

  add(observer) {
    this.list.push(observer);
  }

  notify(...arg) {
    this.list.forEach(call => call(...arg));
  }
}
//目标
let sub1 = new Subject();
//目标添加观察处理对象
sub1.add((value) => { console.log('目标1：', value)});
sub1.add((value) => { console.log('目标2：', value)});
//目标主动通知对象
sub1.notify('fasdf')

//Es5
function Sales() {
  this.list = [];
}
Sales.prototype.publish = function (arg) {
  this.list.forEach(item => item(arg));
}
Sales.prototype.subcribe = function (callback) {
  this.list.push(callback)
}
//实例化目标
let sale1 = new Sales();
//目标添加观察处理事件
sale1.subcribe((value) => { console.log('目标1：', value) })
sale1.subcribe((value) => { console.log('目标2：', value) })
sale1.subcribe((value) => { console.log('目标2：', value) })

//目标通知，更新
sale1.publish('更新了')



/**
 * 发布订阅
 * 借助第三方实现调度，发布者和订阅互不感知
 */
//es6
class Pubsub {
  constructor() {
    this.list = {};
  }

  subscribe(subscriber, call) {
    let callback = this.list[subscriber];

    if (!callback) {
      this.list[subscriber] = [call];
    } else {
      callback.push(call);
    }
  }

  publish(subscriber, arg) {
    let callbacks = this.list[subscriber] || [];
    callbacks.forEach(item => item(arg));
  }
}
//创建实例
let pubsub = new Pubsub();
//添加订阅者
pubsub.subscribe('lichunying', (arg) => { console.log('lichunying', arg) });
pubsub.subscribe('lili', (arg) => { console.log('lili', arg) });
//执行
pubsub.publish('lichunying', 'shiwoya')

//Es5
function PubSub() {
  this.list = {};
}
Pubsub.prototype.subscribe =function (name, call) {
  let callback = this.list.name;
  if (!callback) {
    this.list.name = [call];
  } else {
    callback.push(call);
  }
}

Pubsub.prototype.publish =function (name, value) {
  let callback = this.list.name || [];
  callback.forEach(item => item(value))
}
//创建实例
let pubsub = new Pubsub();
//添加订阅者
pubsub.subscribe('lichunying', (arg) => { console.log('lichunying', arg) });
pubsub.subscribe('lili', (arg) => { console.log('lili', arg) });
//执行
pubsub.publish('lichunying', 'shiwoya')

//观察者模式
class ObserverModal {
  constructor() {
    this.list = [];
  }

  //添加观察者
  add(observer) {
    this.list.push(observer);
  }

  notice(message) {
    this.list.forEach(fn => fn(message));
  }
}

//创建一个观察目标
let sub = new ObserverModal();
//给目标添加观察者
sub.add((message) => { console.log('目标1：', message) });
sub.add((message) => { console.log('目标2：', message) });

//目标发生变动，通知观察者
sub.notice('内容变动，请注意')

/**
 * 发布订阅
 */
class Publish {
  constructor() {
    this.list = [];
  }

  //订阅者
  subscribe(subscriber, callback) {
    if (!this.list[subscriber]) {
      this.list[subscriber] = [];
    }
    this.list[subscriber].push(callback);
  }

  //发布,相关订阅者都会接到并执行对应操作
  publish(subscriber, arg) {
    let callbackArr = this.list[subscriber] || [];
    callbackArr.forEach(fn => fn(arg))
  }
}

//创建实例
let pub = new Publish();
//添加订阅者
pub.subscribe('lichunying', (arg) => { console.log('lichunying', arg) });
pub.subscribe('lichunying', (arg) => { console.log('lichunying', arg) });
pub.subscribe('lilin', (arg) => { console.log('lilin', arg) });

//给某个订阅发布消息
pub.publish('lichunying', '消息发布了， 李春英')
pub.publish('lilin', '消息发布了， 李林')
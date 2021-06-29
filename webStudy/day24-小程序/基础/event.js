//实现内部通信机制
//发布订阅
/**
 *  a <=> middle <=> b   有中间者
 */

//观察者模式
/**
 * a <=> b
 * a <=> c
 */

class Event {
  constructor(name) {
    this.name = name;
    this.observers = {};
  }

  //注册事件，类似监听
  on = (type, fn) => {
    if (!this.observers[type]) {
      this.observers[type] = [];
    }
    this.observers[type].push(fn);
  }

  //触发事件
  emit = (type, option) => {
    if (this.observers[type]) {
      this.observers[type].forEach(item => {
        item(option)
      })
    }
  }
}

const events = new Event();
events.on('buy', () => { console.log('buy a kole') });

events.emit('buy')
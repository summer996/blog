

class MyEventsEmitter {
  constructor() {
    this.events = {};
  }

  //绑定事件
  on(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(fn);
    return this;
  }

  //解绑事件
  off(event, fn) {
    let eventArr = this.events[event];
    if (eventArr.length > 0) {
      eventArr.fillter(item => item === fn)
    }
  }

  //只绑定响应一次
  once(event, fn) {
    const onlyOnce = (...args) => {
      this.off(event, fn);
      fn.apply(this, args);
    }

    this.on(event, onlyOnce);
    return this;
  }

  //触发监听事件
  emit(event, ...arg) {
    let eventArr = this.events[event];
    if (eventArr.length > 0) {
      eventArr.forEach((item, index) => {
        item.call(this, ...arg);
      })
    }
  }
}

let myevent = new MyEventsEmitter();
function cbfn() {
  console.log(1111)
}
myevent.on("http", cbfn);

(req, res) => {
  myevent.emit('http', 'shishenm')
}
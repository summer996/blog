//目标：面向抽线进行coding，而不是对实现经行coding,降低需求与实现耦合

//需求
//分享功能
class Store {
  constructor() {
    this.share = new Share();
  }
}

class Share {
  shareTo() {
    //分享到不同平台
  }
}

class Rate {
  star(stars) {

  }
}

const store = new Store();
store.share.shareTo('wx');

//重构
//目标：暴露挂载
class Rate{
  init(store) {
    store.rate = this;
  }

  store(stars) {

  }
}

class store {
  static modules = new Map();
  constructor() {
    for (let module of Store.modules.values()) {
      module.init(this);
    }
  }

  // 注入功能模块
  static inject(module) {
    Store.modules.set(module.constructor.name, module)
  }
}

class Share {
  init(store) {
    store.share = this;
  }

  shareTo(platform) {
    //分享到不同平台
  }
}
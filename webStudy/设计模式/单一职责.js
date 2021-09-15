//通过解耦，让每一个职责更加独立
//目标：一个功能模块只做一件事

class PubgManager {
  openDialog() {
    //计算金额
    setPrice();
  }
}

//重构
//gameManager.js
class PubgManager {
  constructor(command) {
    this.command = command;
  }
  openDialog(price) {
    //计算金额
    this.command.setPrice(price)
  }
}

//optManager.js
class PriceManager {
  setPrice(price) {
    //配置金额
  }
}

const exe = new PriceManager();
const game = new PubgManager(exe);
game.openDialog(15);
game.setPrice(10)
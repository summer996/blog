// 开闭原则
//目标： 在已有的场景，对于需要拓展的功能进行开放，拒绝直接功能修改
//避免面条式开发，就是if else if else
//场景， 游戏活动

//render
gameManager(game).setColor();

//event
gameManager(game).openDialog();

//game库
function gameManager(game) {
  return `${game}Manager`;
}

//导引
const LolManager = {
  setColor(game) {
    //正常
  }

  openDialog(game) {
    // 折扣
  }
}

const PubgManager = {
  setColor(game) {
    //高亮
  }

  openDialog(game) {
    //付款
  }
}

//重构2 使用es6
class Game {
  constructor(name) {
    this.name = name
  }

  setColor(name) {
    console.log('修改color')
  }

  openDialog(name) {
    console.log('打开对话框')
  }
}

class Lol extends Game {
  openDialog() {

  }
}

class Pubg extends Game {
  setColor() {
    console.log('高亮')
  }

  openDialog() {
    
  }
}


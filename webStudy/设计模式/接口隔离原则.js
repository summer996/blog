//目标：多个专业的接口，比一个胖接口好

class Game {
  constructor(name) {
    this.name = name;
  }

  run() {
    
  }

  shot() {
    //开枪
  }

  mega() {
    //开大
  }
}

//重构，用多个接口替代，每个接口服务于一个子模块
//瘦身
class Game {
  constructor(name) {
    this.name = name;
  }
  run() {
    
  }
}

class Pubg extends Game {
  constructor() {

  }

  shot() {

  }
}

class Lol extends Game {
  constructor() {

  }
  mega() {
    
  }
}
//车辆
class Car {
  constructor(num) {
    this.carNum = num
  }
}

class Camera {
  shot(car) {
    return {
      carNum: car.carNum,
      inTime: Date.now()
    }
  }
}

class Screen {
  show(car, time) {
    console.log('车牌号', car.carNum);
    console.log('停车时间', Date.now() - time);
  }
}

//停车场
class Park {
  constructor(floors) {
    this.floors = floors || [];
    this.camera = new Camera();
    this.screen = new Screen();
    this.carList = {}; //存储已停车信息
  }

  in(car) {
    //通过摄像头获取信息
    const info = this.camera.shot(car);

    //停到某个位置
    const i = parseInt(Math.random() * 100 % 100);
    const place = this.floors[0].place[i];
    place.in();
    info.place = place;

    //记录信息
    this.carList[car.carNum] = info;
  }

  out(car) {
    //获取信息
    const info = this.carList[car.carNum];

    //将车位清空
    const place = info.place;
    place.out();

    //显示时间
    this.screen.show(car, info.inTime);

    //清空记录
    delete this.carList[car.carNum];
  }

  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index}层还有${floor.emptyPlaceNum()}个空闲车位`
    }).join('\n');
  }
}

class Place {
  constructor() {
    this.empty = true;
  }

  in() {
    this.empty = false;
  }

  out() {
    this.empty = true;
  }
}

class Floor {
  constructor(index, placeInfo) {
    this.index = index;
    this.placeInfo = placeInfo;
  }

  emptyPlaceNum() {
    let num = 0;
    this.placeInfo.forEach(item => {
      item.empty && (num++);
    })
    return num;
  }
}

//初始化停车场
const floors = [];
for (let i = 0; i < 3; i++) {
  const places = [];
  for (let j = 0; i < 10; j++) {
    places[j] = new Place();//车位信息
  }

  floors[i] = new Floor(i + 1, places);//每层信息
}

const park = new Park(floors);

const car1 = new Car(0001);
const car2 = new Car(0002);
const car3 = new Car(0003);
const car4 = new Car(0004);

//第一辆车进入，并且先获取空闲车位
console.log(park.emptyNum());
park.in(car1);

//每一个车位
class Place {
  constructor() {
    //一开始就是空的
    this.empty = true;
  }

  in() {
    this.empty = false;
  }

  out() {
    this.empty = true;
  }
}

class Car {
  constructor(carNum) {
    this.carNum = carNum;
  }
}

class Floor {
  constructor(floorIndex, placeArr) {
    this.floorIndex = floorIndex;
    this.placeArr = placeArr;
  }
  emptyPlaceNum() {
    let num = 0;
    this.placeArr.forEach(item => {
      item.empty && (num++);
    })
    return num;
  }
}

class Screen {
  show(car, inTime) {
    console.log(`车牌号为：${car.carNum}, 停车时长为：${Date.now() - inTime}`)
  }
}

class Camera {
  shot(car) {
    return {
      carNum: car.carNum,
      inTime: Date.now()
    }
  }
}

class Park {
  constructor(floors) {
    //停车位
    this.floors = floors || [];
    //初始化照相机
    this.camera = new Camera();
    //初始化显示屏
    this.screen = new Screen();

    //存储已停车辆的信息
    this.carListObj = {};
  }

  emptyNum() {

  }
  

  in(car) {
    const info = this.camera.shot(car);
    //停车位置
    const carIndex = parseInt(Math.random() * 100 % 100);
    const place = this.floors[0].placeArr[i];
    debugger;
    place.in();
    info.place = place;
    this.carListObj[info.carNum] = info;
  }

  out(car) {
    const info = this.carList[car.carNum];

    info.place.out();

    this.screen.show(car, info.inTime);

    delete this.carListObj[car.carNum];
  }
}

//初始化floor
const floors = [];
for (let i = 0; i < 3; i++) {
  let placeArr = [];
  for (let j = 0; j < 100; j++) {
    placeArr[j] = new Place();
  }
  floors[i] = new Floor(index + 1, placeArr);//每层信息
}

const park = new Park(floors);

const car1 = new Car(0001);
park.emptyNum();
park.in(car1);
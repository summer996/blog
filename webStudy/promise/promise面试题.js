//封装一个异步加载图片的方法
const loadImageAsync = (url) => {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.onerror = function () {
      reject("下载错误");
    };

    image.src = url;
  });
};

loadImageAsync(
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100120461512E-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642057126&t=e0a30276d9228e06cd1921ac9619a95b"
).then((res) => {
  //res是一个图片
});

//亮红绿灯
const red = () => console.log("red");
const green = () => console.log("green");
const yellow = () => console.log("yellow");

let myLight = (timer, cb) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};
let count = 0;
let myStep = () => {
  Promise.resolve()
    .then(() => {
      return myLight(300, red);
    })
    .then(() => {
      return myLight(200, green);
    })
    .then(() => {
      return myLight(100, yellow);
    })
    .then(() => {
      count++;
      if (count == 2) {
        return Promise.reject("停止");
      }
      myStep();
    });
};
myStep();

//直接使用定时器
var a = 0;
function red() {
  console.log("red");
  if (a === 2) {
    return console.log("停止");
  }
  setTimeout(function () {
    green();
  }, 200);
}

function green() {
  console.log("green");
  setTimeout(function () {
    yellow();
  }, 300);
}

function yellow() {
  console.log("yellow");
  a++;
  setTimeout(function () {
    red();
  }, 100);
}

red();

//使用promise + 定时器
var a = 0;
function red() {
  return new Promise(function (resolve, reject) {
    console.log("red");
    setTimeout(function () {
      resolve(green());
    }, 200);
  });
}

function green() {
  return new Promise(function (resolve, reject) {
    console.log("green");
    setTimeout(function () {
      resolve(yellow());
    }, 300);
  });
}

function yellow() {
  return new Promise(function (resolve, reject) {
    console.log("yellow");
    a++;
    if (a == 2) {
      return reject("停止");
    }
    setTimeout(function () {
      resolve(red());
    }, 100);
  });
}

red();

//使用async + await
function lightChange(color, timer) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(color);
      res();
    }, timer);
  });
}
async function light() {
  let i = 0;
  while (i < 3) {
    i++;
    await lightChange("red", 100);
    await lightChange("green", 200);
    await lightChange("yellow", 300);
  }
}

//实现promiseAll
promiseAll = (arr) => {
  const len = arr.length;
  let result = [];
  return new Promise((resolve, reject) => {
    arr.forEach((item) => {
      item.then(
        (res) => {
          result.push(res);
          result.length === len && resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  });
};

//并发下载图片
var urls = [];
const loadimg = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = function () {
      resolve();
    };
    image.onerror = function () {
      reject();
    };
  });
};
const loadLimit = async (loadimg, url, limit) => {
  let urlList = [...url];
  let promiseArr = null;
  const promiseArrAll = [];

  promiseArr = urlList.slice(0, limit).map((url, index) => {
    const _t = loadimg(url);
    promiseArrAll.push(_t);
    return _t.then((res) => {
      return [index, res];
    });
  });

  for (const item of urlList) {
    const [index] = await Promise.race(promiseArr);
    const _t = loadimg(item);
    promiseArrAll.push(_t);
    promiseArr[index] = _t.then((res) => {
      return [index, res];
    });
  }

  return Promise.allSettled(promiseArrAll);
};


/**
 * 异步加载图片的意思就是，使用promise
 */

function loadImgAsync(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.src = url;
    image.onload = function() {
      resolve(image);
    }
    image.onerror = reject;
  })
}

loadImgAsync(url).then(res => {
  console.log('加载成功')
})

/**
 * 并发下载图片，自定义控制下载数据，最大不超过6；
 */

async function batchLoadImgAsync(urlArr, limit) {
  let allPromise = [];
  let currentPromises = [];

  //先添加limit个promise到当前promise数组中
  currentPromises = urlArr.slice(0, limit).map((item, index) => {
    const _t = loadImgAsync(item);
    allPromise.push(_t);
    return _t.then((res) => {
      return [index, res];
    })
  })

  //遍历剩余的函数，然后把遍历一个 等待currentPromises中的变化，在改变
  for(let item of urlArr) {
    let [index] = await currentPromises.race();
    const _t = loadImgAsync(item);
    allPromise.push(_t);
    currentPromises[index] = _t.then(res => {
      return [index, res];
    })
  }

  //获取全部结果,虽然allPromise中，有执行成功的，但是在此执行就不会执行，直接返回结果。
  return Promise.allSettled(allPromise);
}
batchLoadImgAsync([...urlArr], 3).then(res => {

}, e => {

})

function lightChange(color, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(color);
      resolve()
    }, time)
  })
}
//红绿灯
async function light() {
  //这是控制执行几次，如果无限就改为true
  let i = 0;
  while(i < 3) {
    i++;
    await lightChange('red', 100);
    await lightChange('green', 200);
    await lightChange('yellow', 300);
  }
}

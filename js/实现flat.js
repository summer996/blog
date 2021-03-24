const flatCustom = () => {
  let result = [];
  return function flat(arr) {
    for (let item of arr) {
      if (Array.isArray(item)) {
        result.concat(flat(item));
      } else {
        result.push(item);
      }
    }
    return result;
  }
}

//调用
let flat = flatCustom();
flat([1, 2, 3, [1, 2, 3, [1, 2, 3]]])


var a = 10;
(function () {
  console.log(a) //undefined 变量提升
  a = 5 
  console.log(a); //刚刚定义的a被赋值为5
  console.log(window.a) //全局变量10
  var a = 20;
  console.log(a)//20
})()


//sleep函数
const sleep = (time) => {
  return new Promise(resolve =>
    setTimeout(resolve, time))
}
sleep(1000).then(() => {
  // 这里写你的处理
})

for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

/**
 * let 块级作用域
 */

for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

/**
 * 利用setTime的第三个参数，当第三个参数存在会作为回调函数的第一个参数
 */
for (let i = 0; i < 10; i++) {
  setTimeout((i) => {
    console.log(i);
  }, 1000, i);
}
/**
 * settimeout的回调为立即执行函数，绑定参数
 */
for (var i = 0; i < 10; i++) {
  setTimeout((i => {
    console.log(i);
  })(i), 1000)
}

/**
 * 立即执行， 闭包
 */
for (var i = 0; i < 10; i++) {
  ((i) => {
    setTimeout(() => {
      console.log(i);
    }, 1000)
  })(i);
}


/**
 * 闭包
 */
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

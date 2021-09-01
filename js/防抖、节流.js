/**
 * 防抖原理
 * 事件触发n秒之后才执行事件，n秒内重复触发的话，就会重新⏲,使用setTimeout来执行事件
 * 实现原理步骤：
 * 1、接收两个参数，一个是要执行的事件，一个是延迟的时间
 * 2、返回一个函数
 */
const debounce = (fn, time) => {
  let timer = null;

  return (arg) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn(...arg), time);
  }
}
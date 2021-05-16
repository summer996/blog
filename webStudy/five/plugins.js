export const mit = () => {
  const list = [];
  return {
    on: (fn) => {list.push(fn)},
    off: () => { },
    emit: () => { list.forEach(item => item())},
    once: () => {}
  }
}
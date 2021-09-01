const vm = require('vm');
const path = require('path');
const fs = require('fs');

// //vm把字符串变成可执行性的代码
// const script = new vm.Script(content, {
//   filename: 'index.js'
// })

function r(filename) {
  const pathToFile = path.resolve(__dirname, filename);
  const content = fs.readFileSync(pathToFile, 'utf-8');
  
  const wrapper = [
    "(function(require, module, exports){",
    "})"
  ]
  //把字符串变为可执行函数 使用vm
  const wrapperContent = wrapper[0] + content + wrapper[1];
  const script = new vm.Script(wrapperContent, {
    filename: 'index.js'
  })

  const module = {
    exports: {}
  }
  const result = script.runInThisContext();
  console.log("result", result);
  result(r, module, module.exports);
  return module.exports;
}

global.r = r;


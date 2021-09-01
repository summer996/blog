const fs = require('fs');
const path = require('path');

//和promise相似的东西

const pathToFile = path.resolve(__dirname, './texts')


// //异步模块
// fs.readFile(pathToFile, 'utf-8', (err, result) => {
//   if (err) {
//     console.log('error', err);
//     return err;
//   }
//   console.log('result', result);
// });//使用绝对路径更安全

// //同步模块
// const content = fs.readFileSync(pathToFile, 'utf-8');
// console.log('content', content);

function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      args.push(function (err, result) {
        if (err) return reject(err);
        return resolve(result);
      })
      return func.apply(func, args);
    })    
  }
}

const readFileAsync = promisify(fs.readFile);

readFileAsync(pathToFile, 'utf-8')
  .then(content => {
    console.log("content",content);
  })
  .catch((e) => {
    console.log('e', e);
  })
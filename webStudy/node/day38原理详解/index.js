const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const zlib = require('zlib');

// function base64_encode(file) {
//   let bitmap = fs.readFileSync(file);
//   return Buffer.from(bitmap).toString('base64')
// }

// function base64_decode(base64str, file) {
//   let bitmap = Buffer.from(base64str, 'base64');
//   fs.writeFileSync(file, bitmap);
// }

// let base64str = base64_encode(path.join(__dirname, './a.jpg'));

// console.log(base64str);
// base64_decode(base64str, path.join(__dirname, 'copy.jpg'));




// const rs = fs.createReadStream(path.join(__dirname, '1.txt'), { highWaterMark: 12 });
// rs.setEncoding('utf8');
// //为什么会乱码, 
// //解决方式，1、使用rs.setEncoding('utf8');先编码，在阶段  2、将小buffer拼接成大Buffer对象
// let data = '';
// rs.on('data', (chunk) => {
//   console.log(chunk);
//   console.log(chunk.toString());
//   data += chunk
// })

// rs.on('end', () => {
//   console.log(data);
// })





// fs.createReadStream(path.join(__dirname, '1.txt'))
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream(path.join(__dirname, '1.txt.gz')));
// //pipe的实现原理
// Readable.prototype.pipe = function (dest, options) {
//   const src = this;
//   src.on('data', ondata);
//   function ondata(chunk) {
//     const ret = dest.write(chunk);
//     if (ret === false) {
//       //...
//       src.pause();
//     }
//   }

//   //....
//   //保持链式调用
//   return dest;
// }
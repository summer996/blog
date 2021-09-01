const http = require('http');

const proxy = http.createServer((request, response) => {
  response.writeHead(200, { 'a-lichunying': "hello-lichunying" });
  response.end('hello word');
})

proxy.listen(8888, '127.0.0.1', () => {
  console.log('server start');
})
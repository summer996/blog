const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/plain'
  });

  res.end('hello word');
}).listen(8888, '127.0.0.1')
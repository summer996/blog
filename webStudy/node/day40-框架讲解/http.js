const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  // res.writeHead(200, { 'Content-Type': "text/plain" });
  // res.end("http response success");
  fs.readFile(__dirname + '/index.html', 'binary', (error, file) => {
    if (error) {
      console.log(error);
    } else {
      res.writeHead(200, { 'Content-Type': "text/html" });
      res.end(file, 'binary');
    }

  })
}).listen(9000);
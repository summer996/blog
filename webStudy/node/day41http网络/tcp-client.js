const net = require('net');
const { clearInterval } = require('timers');

const HOST = '127.0.0.1';
const PORT = 7777;
let count = 0; 

const client = new net.Socket();
const SERVER_NAME = `${HOST}: ${PORT}`;

client.connect(PORT, HOST, () => {
  console.log(`成功连接到 ${SERVER_NAME}`);
  const timer = setInterval(() => {
    if (count > 10) {
      client.write("我没事了， 再见");
      clearInterval(timer);
      return;
    }
    client.write(`你好呀 ${count++}`);
  }, 1000)
})

client.on('data', (data) => {
  console.log(`${SERVER_NAME} - ${data}`);
})

client.on('close', () => {
  console.log('Connection closed');
})

client.on('error', (error) => {
  console.log(error);
})
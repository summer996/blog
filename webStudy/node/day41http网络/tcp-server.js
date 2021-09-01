const net = require('net');

const HOST = '127.0.0.1';
const PORT = 7777;

//创建一个TCP服务器实例，调用listen函数监听指定端口和IP
//net.createServer有一个参数，是监听连接建立的回调
net
  .createServer((socket) => {
    const remoteName = `${socket.remoteAddress}:${socket.remotePort}`;

    // 建立成功了一个连接, 这个回调函数里返回一个socket对象.
    console.log(`${remoteName} 连接到本服务器`);

    //接收数据
    socket.on('data', (data) => {
      console.log('data', data);
      //给客户端发送消息
      socket.write(`你说啥？是说的${data}吗？`);
    });

    //关闭
    socket.on('close', (data) => {
      console.log(`${remoteName}连接关闭`);
    });
  })
  .listen(PORT, HOST);

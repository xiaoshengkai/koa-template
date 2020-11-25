const app = require('../src/app.js')
const http = require('http');
  
// 接受主进程启动进程
const server = http.createServer(app.callback());
let worker

process.on('message', (name, data) => {
  if (name === 'server') {
    worker = data;
    // tcp 套字节代理
    worker.on('connection', (socket) => {
      server.emit('connection', socket)
    })
  }
})

// 监听未捕获的异常出现
process.on('uncaughtException', function (err) {
  console.log('捕获到错误', err)
  // logger.error(err) // 日志
  // 发射自杀信号
  process.send({ act: 'notLive' })
  // 停止接收新的连接
  worker.close(function () {
    // 所有已有连接断开后，退出进程
    process.exit(1);
  });
  // 防止长链接一直挂载，设置超时设置
  setTimeout(() => {
    process.exit(1);
  }, 5000)
});

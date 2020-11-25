const fork = require('child_process').fork
const cpus = require('os').cpus()
const net = require('net')
const path = require('path')
const consola = require('consola')
const watch = require('./watch')
const { config } = require('../index.js')

const server = net.createServer()
server.listen(config.port, () => {
  consola.ready({
      message: `Server listening on http://${config.host}:${config.port}`,
      badge: true
  })
})

/** 定义超时超量 */
let limit = 200;
let during = 60000;
let restart = []; // 时间点队列

function isTooQuick () {
  let length = restart.push(new Date())
  if (length > limit) {
    restart = restart.slice(limit * -1) // 取出最后8个记录
  }
  //  最后一次重启到前8次重启之间的时间间隔
  return length >= limit && (restart[length - 1] - restart[0]) < during
}

/** 初始化创建进程 */
const works = {}  // 进程对象
function init () {
  for (let i = 0; i < cpus.length; i++) {
    createWork()
  }

  // 监听主进程退出，杀掉子进程
  process.on('exit', () => {
    for (var pid in works) {
      works[pid].kill();
    }
  })
}
init()

/** 创建进程  */
function createWork () {
  if (isTooQuick()) {
    console.log('超时超量了')
    process.emit('giveup', during)
    process.exit(1)
    return
  }

  const work = fork(path.resolve(__dirname + '/index.js'))
  works[work.pid] = work
  work.send('server', server)

  // 监听 子进程被注销
  work.on('exit', () => {
    delete works[work.pid]
  })

  // 监听 自杀信号 创建新进程
  work.on('message', (data) => {
    if (data.act === 'notLive') { // 接受自杀信号，将exit中的重启进程移至此
      createWork()
    }
  })
}

/** 监听src文件改变 重启进程 */
watch((changePaeh) => {
  consola.info('changePaeh:', changePaeh)
  for (var pid in works) {
    works[pid].kill();
  }
  init()
})
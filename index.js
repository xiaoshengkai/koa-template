const app = require('./src/app')
const consola = require('consola')

const config = {
  host: '127.0.0.1',
  port: 9003
}

exports.config = config

app.listen('9001', () => {
  consola.ready({
      message: `Server listening on http://${'127.0.0.1'}:${9001}`,
      badge: true
  })
})
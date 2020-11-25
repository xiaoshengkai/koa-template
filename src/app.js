const Koa = require('koa')
const koaBody = require('koa-body') // 获取post参数
const cors = require('@koa/cors');
const router = require('./router')
/** middlewares */
// const token = require('./middlewares/token')

const app = new Koa()

app.use(cors({
  credentials: true
})) // 跨域

app.use(koaBody({
  multipart: true
}));

// app.use(token); // token验证

// router
app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app
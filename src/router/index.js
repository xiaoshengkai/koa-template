const Router = require('koa-router')           // 路由模块
/** modal  */
const user = require('../controllers/user')

const router = new Router();

router.get('/test', (ctx) => {ctx.body='test'})
// router.post('/login', user.login)

module.exports = router
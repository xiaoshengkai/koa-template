// const JWT = require('../util/jwt')

// module.exports = async (ctx, next) => {
//   // 登录不用验证
//   const noToken = [
//     '/test'
//   ]
//   if (noToken.includes(ctx.request.url)) {
//     await next()
//     return
//   }
  
//   const { token } = ctx.request.body
//   let isNext = true
//   await Promise.resolve(new JWT().decrypt(token, (err, decoded) => {
//     if (err) {
//       ctx.body = {
//           code: 1002,
//           msg: '请登录后操作！'
//       }
//       isNext = false
//     } else {
//       ctx.state.user = decoded
//       isNext = true
//     }
//   }))
//   isNext && await next()
// }
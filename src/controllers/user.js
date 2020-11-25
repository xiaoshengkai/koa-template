// const userModel= require('../models/user')
// const JWT = require('../util/jwt')

// exports.login = async (ctx) => {
//   let { username, password } = ctx.request.body
//   try {
//     let res = await userModel.findUser({ username, password })
//     if (res && res._id) {
//       const tokenData = {
//         id: res._id,
//         username: res.username
//       }
//       ctx.body = {
//           code: 1000,
//           msg: 'ok',
//           data: {
//             token: new JWT().createToken(tokenData)
//           }
//       }
//     } else {
//       ctx.body = {
//           code: 1003,
//           msg: '密码或者账户不正确'
//       }
//     }
//   } catch (e) {
//     ctx.body = {
//         code: 1003,
//         msg: e.toString()
//     }
//   }
// }
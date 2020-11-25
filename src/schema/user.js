// const mongoose = require('mongoose')
// const dayjs =  require('dayjs');

// const Schema = mongoose.Schema;

// module.exports = new mongoose.Schema({
//     username: String,                // 用户名
//     password: String,                // 密码
//     type: String,                    // 用户角色
//     project: [{
//       type: Schema.Types.ObjectId,
//       ref: 'project'
//     }],
//     // 创建时间
//     meta: {
//       createAt: {
//         type: String, default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
//       },
//       updateAt: {
//         type: String, default: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
//       }
//     }
// }, { versionKey: false })
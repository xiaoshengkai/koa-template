const jwt = require('jsonwebtoken');

module.exports = class JWT {
  constructor () {
    this.secret = 'XIAOSHENGKAI_NIUPI'; //撒盐：加密的时候混淆
  }

  createToken (token) {
    return jwt.sign(
      token,
      this.secret,
      {
        expiresIn:  604800 // 秒到期时间:7天
      });
  }

  decrypt (token, fn) {
    jwt.verify(token, this.secret, fn)
  }
}
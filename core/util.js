/**
 * util
 */

 const jwt = require('jsonwebtoken')

/**
 * 生成 token 令牌
 * @param {number} uid uid
 * @param {number} scope 令牌有效时间
 * @returns 
 */
const {
    secretKey,
    expiresIn
} = require('../conf/confing').security
const generateToken = function (uid, scope) {
    const token = jwt.sign({
        uid,
        scope
    }, secretKey, {
        expiresIn
    })

    return token
}

module.exports = {
    generateToken
}
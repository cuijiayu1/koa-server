/**
 * 校验token中间件
 */

const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const { security } = require('../conf/confing')


class Auth {
    constructor(level) {
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }

    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req)
            console.log(userToken)
            let errMsg = 'token不合法'
            if (!userToken || !userToken.name) {
                throw new global.errs.AuthFailed({})
            }

            try {
                var decode = jwt.verify(userToken.name, security.secretKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }

                throw new global.errs.Forbbiden({ msg: errMsg })
            }

            if (decode.scope < this.level) {
                errMsg = '权限不足'
                throw new global.err.Forbbiden({ msg: errMsg })
            }

            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }
            await next()
        }
    }
}

module.exports = {
    Auth
}
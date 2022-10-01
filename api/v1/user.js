/**
 * user api
 */

const Router = require('koa-router')
const bcrypt = require('bcrypt')
const { paramValidater } = require('../../validator/validater')
const { LoginScheme } = require('../../validator/user')
const { UserDao } = require('../../dao/userDao')
const { Auth } = require('../../middlewares/auth')
const { LoginType } = require('../../lib/enum')
const { EmailManager } = require('../../service/email');

const userRouter = new Router({
    prefix: '/v1/user'
})

/* 小程序端无需注册，直接调用token接口获得token，邮箱需要使用本接口注册 */
userRouter.post('/register', async (ctx) => {
    const { email, password } = ctx.request.body
    paramValidater(LoginScheme, { email, password })
    await UserDao.registerUserByEmail({
        email,
        password,
        loginType: LoginType.USER_EMAIL
    })

    const token = await EmailManager.emailToLogin({ email, password })
    throw new global.errs.Success({ data: token })
})


/* 以下是测试接口 */

userRouter.get('/user-info', new Auth().m, async (ctx) => {
    throw new global.errs.Success({})
})

module.exports = userRouter
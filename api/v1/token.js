/**
 * token api
 */

const Router = require('koa-router')
const { LoginType } = require('../../lib/enum');
const { paramValidater } = require('../../validator/validater')
const { TokenScheme } = require('../../validator/token');
const { WXManager } = require('../../service/wx');
const { EmailManager } = require('../../service/email');

const tokenRouter = new Router({
    prefix: '/v1/token'
})

/** 小程序端无需注册，直接使用openid获得token */
tokenRouter.post('/', async (ctx) => {
    const { account, password, type } = ctx.request.body
    paramValidater(TokenScheme, { account, password, type })
    let token;

    switch (type) {
        //邮箱获得token
        case LoginType.USER_EMAIL:
            token = await EmailManager.emailToLogin({ email: account, password, type })
            break;
        //VX小程序获得token
        case LoginType.USER_MINI_VX_PROGRAM:
            token = await WXManager.codeToToken({ openid: account });
            break;
        case LoginType.USER_MINI_QQ_PROGRAM:
            break;
        default:
            break;
    }
    throw new global.errs.Success({ data: token })
})

module.exports = tokenRouter
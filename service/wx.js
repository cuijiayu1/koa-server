/**
 * 微信登录交互逻辑
 */

const axios = require('axios')
const util = require('util')
const { generateToken } = require('../core/util')
const { UserDao } = require('../dao/userDao')
const { LoginType } = require('../lib/enum')
const { wx } = require('../conf/confing')

class WXManager {
    /**
     * 获得token
     * @param {string} openid openid 
     * @returns 
     */
    static async codeToToken({ openid }) {
        const url = util.format(wx.loginUrl,
            wx.appId,
            wx.appSecret,
            openid)

        const result = await axios.get(url)

        if (result.status !== 200) {
            throw new global.errs.AuthFailed({ msg: 'openid获得失败' })
        }
        const errcode = result.data.errcode
        if (errcode) {
            throw new global.errs.AuthFailed({ msg: `openid获得失败:${errcode}` })
        }

        let user = await UserDao.getUserByOpenid({
            openid: result.data.openid
        })
        //数据库没有就注册
        if (!user) {
            user = await UserDao.registerByOpenid({
                openid: result.data.openid
            })
        }

        return generateToken(user.id, LoginType.USER_MINI_VX_PROGRAM);

    }
}

module.exports = {
    WXManager
}
/**
 * email登录逻辑
 */
const { generateToken } = require('../core/util')
const { UserDao } = require('../dao/userDao')

class EmailManager {

    /**
     * 通过email获得token
     * @param {string} email
     * @param {string} password
     * @returns 
     */
    static async emailToLogin({ email, password }) {
        const user = await UserDao.verifyEmailPassword({ email, password })
        return await generateToken(user.id, user.scope)
    }
}

module.exports = {
    EmailManager
}
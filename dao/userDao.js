/**
 * userDao 层
 */

const { User } = require("../db/models/user");
const bcrypt = require('bcrypt')

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class UserDao {

    /**
     * 通过邮箱注册用户
     * @param {string} nickname nickname 
     * @param {string} email email 
     * @param {string} password password 
     */
    static async registerUserByEmail({ email, password, scope }) {
        if (await this.getUserByNicknameOrEmail({ email })) {
            throw new global.errs.ParameterException({ msg: '邮箱已存在' })
        }

        const user = await User.create({
            nickname: `用户${random(100000000000000, 999999999999999)}`,
            email,
            password,
            scope: scope || 8
        })
    }

    /**
     * 通过openId注册用户
     * @param {*} param0 
     */
    static async registerByOpenid({ openid, scope }) {
        const user = await User.create({
            nickname: `用户${random(100000000000000, 999999999999999)}`,
            openid,
            scope: scope || 8
        })

        return user
    }

    /**
     * 通过邮箱或nickname获得用户
     * @param {string} nickname
     * @param {string} email
     * @returns user
     */
    static async getUserByNicknameOrEmail({ nickname, email }) {
        //不可以两个参数都为空
        if (nickname == null && email == null) {
            return null
        }

        const user = await User.findOne({ where: arguments[0] })
        return user
    }

    /**
     * 通过openId获得用户
     * @param {string} openId
     */
    static async getUserByOpenid({ openid }) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }

    /**
     * 根据email验证密码
     * @param {string} email 
     * @param {string} plainPassword 
     */
    static async verifyEmailPassword({ email, password }) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.NotFound({ msg: '用户不存在' })
        }

        const correct = bcrypt.compareSync(password, user.password)

        if (!correct) {
            throw new global.errs.AuthFailed({ msg: '密码不正确' })
        }

        return user
    }
}

module.exports = { UserDao }
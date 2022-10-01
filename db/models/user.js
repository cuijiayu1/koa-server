/**
 * user 数据库模型
 */

const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcrypt')
const { sequelize } = require('../db')

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    nickname: {
        type: Sequelize.STRING,
        unique: true
    },

    email: {
        type: Sequelize.STRING,
        //unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
    scope:{
        type:Sequelize.INTEGER
    }

}, { sequelize })


module.exports = { User }
/**
 * sequelize 连接
 */

const Sequelize = require('sequelize')

const {
    dbName,
    host,
    port,
    user,
    password
} = require("../conf/confing.js").database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false
})

module.exports = {
    sequelize
}
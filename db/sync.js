/**
 * sequelize 同步数据库
 */

const { sequelize } = require('./db')

require('./models/index.js')

// 测试连接
sequelize.authenticate().then(() => {
    console.log('mysql connect ok')
}).catch((error) => {
    console.log(error)
})

// 执行同步
sequelize.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
})
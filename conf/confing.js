/**
 * 全局配置信息
 */

module.exports = {
    database: {
        dbName: 'myblog',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '249303'
    },
    security: {
        secretKey: '19bbxcd6ba625',
        expiresIn: 60 * 60
    },
    wx: {
        appId: 'wx21a0e0fcb8b40787',
        appSecret: '89a32d9536262c9ef44a62805ae4827f',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}
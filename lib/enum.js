/**
 * 描述用户类型
 */

const LoginType = {
    USER_MINI_VX_PROGRAM: 100, //vx小程序登录
    USER_MINI_QQ_PROGRAM: 101, //QQ小程序登录
    USER_EMAIL: 102,   //邮箱登录
    ADMIN_EMAIL: 200,   //管理员登录
    transitionArray
}

/**
 * 将类型值转化为数组 供数据校验使用
 * @returns Array
 */
function transitionArray() {
    let arr = []
    for (let item in LoginType) {
        if (typeof (LoginType[item]) == "number") {
            arr.push(LoginType[item])
        }
    }
    return arr
}

module.exports = {
    LoginType
}
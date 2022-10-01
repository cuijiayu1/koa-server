/**
 * 抛出错误信息合集
 */

class HttpException extends Error {
    constructor(msg = '服务器异常', errorCode = 10000, code = 400) {
        super()
        this.msg = msg
        this.errorCode = errorCode
        this.code = code
    }
}

class Success extends HttpException {
    constructor({ msg, errorCode, data }) {
        super()
        this.code = 201
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 1

        if (data) {
            this.data = data
        }
    }
}

class ParameterException extends HttpException {
    constructor({ msg, errorCode }) {
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class NotFound extends HttpException {
    constructor({ msg, errorCode }) {
        super()
        this.code = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 10000
    }
}

class AuthFailed extends HttpException {
    constructor({ msg, errorCode }) {
        super()
        this.code = 404
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}

module.exports = {
    ParameterException,
    NotFound,
    Success,
    AuthFailed,
    Forbbiden
}
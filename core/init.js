/**
 * 初始化和配置全局
 */

const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        InitManager.app = app
        InitManager.initLoadRrouters()
        InitManager.loadHttpException()
    }

    /**
     * 实现自动加载路由
     * 原理是通过 require-directory 自动加载 api 目录挂载到 app 中
     */
    static initLoadRrouters() {
        let whenLoadModule = (obj) => {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }

        requireDirectory(module, '../api/v1', {
            visit: whenLoadModule
        })
    }

    /**
     * 将自定的 error 错误参数挂载到 global
     */
    static loadHttpException(){
        const errors = require('../lib/http-exception')
        global.errs = errors
    }
}

module.exports = {
    InitManager
}
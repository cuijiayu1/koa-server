/**
 * json schema 校验
 */

const Ajv = require('ajv')
const ajv = new Ajv({
    allErrors: true // 输出所有的错误
})
require("ajv-errors")(ajv /*, {singleError: true} */)

/**
 * 拼接error信息合集
 * @param {*} obj 
 * @returns 
 */
function parseErrorTips(obj) {
    let tipsArray = []
    for (item of obj) {
        tipsArray.push(item.message)
    }
    let msg = tipsArray.join(' ')
    return msg
}

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function paramValidater(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {

        throw new global.errs.ParameterException({ msg: parseErrorTips(ajv.errors) })

    }
}

module.exports = { paramValidater }

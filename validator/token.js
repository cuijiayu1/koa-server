/**
 * token 数据格式校验
 */

const { LoginType } = require("../lib/enum")
const typeArray = LoginType.transitionArray()

const TokenScheme = {
    type: 'object',
    properties: {
        account: {
            type: 'string',
            maxLength: 255,
            minLength: 6,
            errorMessage: {
                type: "必须是string类型",
                minLength: "account:长度必须大于6",
                maxLength: 'account:长度必须小于255'
            }
        },
        psssword: {
            type: 'string',
            maxLength: 255,
            minLength: 6,
            errorMessage: {
                type: "必须是string类型",
                minLength: "psssword:长度必须大于6",
                maxLength: 'psssword:长度必须小于255'
            }
        },
        type: {
            type: 'number',
            enum: typeArray,
            errorMessage: {
                type: "必须是number类型",
                enum: "type:参数错误"
            }
        }
    },
    "required": [
        "account", "type" //可以不使用密码获得token 针对小程序登陆方式
    ],
    errorMessage: {
        required: {
            account: "account不存在",
            type: 'type不存在',
        },
    }
}

module.exports = { TokenScheme }

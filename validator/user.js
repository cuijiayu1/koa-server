/**
 * user 数据格式校验
 */

const LoginScheme = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            maxLength: 255,
            minLength: 6,
            errorMessage: {
                type: "必须是string类型",
                minLength: "email:长度必须大于6",
                maxLength: 'email:长度必须小于255'
            }
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 6,
            errorMessage: {
                type: "必须是string类型",
                minLength: "psssword:长度必须大于6",
                maxLength: 'psssword:长度必须小于255'
            }
        },
    },
    required: [
        "email", "password"
    ],
    errorMessage: {
        required: {
            password: 'password必须存在',
            email: 'email必须存在',

        }
    }
}

module.exports = { LoginScheme }

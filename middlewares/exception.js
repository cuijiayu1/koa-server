/**
 * 处理错误中间件
 * @param {Object} ctx ctx
 * @param {function} next next
 */

const catchError = async (ctx, next) => {
    try {
        await next()
        
    } catch (error) {
        if(process.env.NODE_ENV == 'dev'){
            console.log(error)
        }

        if (error.errorCode) {
            ctx.status = error.code

            const body = {
                msg: error.msg,
                errorCode: error.errorCode,
                data:error.data
            }
            if(error.data){
                body.data = error.data
            }

            ctx.body = body
        } else { 
            ctx.status = 500;
            ctx.body = {
                msg: '服务器未知错误',
                error_code: 999
            }
        }
    }
}

module.exports = {
    catchError
}
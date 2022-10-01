/**
 * 入口函数
 */

const Koa = require('koa');
const { InitManager } = require('./core/init');
const { catchError } = require('./middlewares/exception');
const BodyParser = require('koa-body');
//require('./db/sync')

const app = new Koa();
app.use(catchError)
app.use(BodyParser({}))
InitManager.initCore(app);

app.listen(3000)
const Koa = require('koa')
const unitRouter = require('./routes/unitRoutes.js')
const employeeRouter = require('./routes/employeeRoutes.js')

const bodyParser = require('koa-bodyparser')

const app = new Koa();

app.use(bodyParser())

app.use(unitRouter.routes()).use(unitRouter.allowedMethods())
app.use(employeeRouter.routes()).use(employeeRouter.allowedMethods())


module.exports = app;
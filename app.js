const Koa = require('koa')
const unitRouter = require('./routes/unitRoutes.js')
const bodyParser = require('koa-bodyparser')

const app = new Koa();

app.use(bodyParser())

app.use(unitRouter.routes()).use(unitRouter.allowedMethods())

module.exports = app;
const Koa = require('koa')
const unitRouter = require('./routes/unitRoutes.js')
const bodyParser = require('koa-bodyparser')

const app = new Koa();
const projectRoute = require('./routes/projectRoutes')

app.use(bodyParser({ enableTypes: ['json', 'text'] }));

app.use(projectRoute.routes()).use(projectRoute.allowedMethods());
//app.use(bodyParser())

app.use(unitRouter.routes()).use(unitRouter.allowedMethods())

module.exports = app;
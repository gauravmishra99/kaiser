const Koa = require('koa');
const clientRouter = require('../routes/clientRoutes.js');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());
app.use(clientRouter.routes()).use(clientRouter.allowedMethods());

module.exports = app;

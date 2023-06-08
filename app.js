const Koa = require('koa');
const app = new Koa();
const projectRoute = require('./routes/projectRoutes')
bodyParser = require('koa-bodyparser')

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });
app.use(bodyParser({ enableTypes: ['json', 'text'] }));

app.use(projectRoute.routes()).use(projectRoute.allowedMethods());

app.listen(3000);
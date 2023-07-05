const Koa = require('koa')
const cors = require('@koa/cors');
const unitRouter = require('./routes/unitRoutes.ts')
const employeeRouter = require('./routes/employeeRoutes.js')
const clientRouter = require('./routes/clientRoutes.ts');
const projectRoute = require('./routes/projectRoutes.js')
const bodyParser = require('koa-bodyparser')
// const apiResponse=require('./helper/apiResponse')
const app = new Koa();

app.use(cors());
app.use(bodyParser({ enableTypes: ['json', 'text'] }));

// Error handling middleware
async function errorMiddleware(ctx: any, next: any) {
  try {
    await next();
  } catch (error: any) {
    // apiResponse( ctx.response, error.message,[],error.status,true)  
    ctx.response.status = error.status;
    ctx.response.body = {
      message: error.message,
      status: true,
      data: []
    };
  }
}

// Register error middleware
app.use(errorMiddleware);

app.use(unitRouter.routes()).use(unitRouter.allowedMethods())
app.use(employeeRouter.routes()).use(employeeRouter.allowedMethods())
app.use(clientRouter.routes()).use(clientRouter.allowedMethods());
app.use(projectRoute.routes()).use(projectRoute.allowedMethods());

export default app;



const Koa = require('koa')
const cors = require('@koa/cors');
const unitRouter = require('./routes/unitRoutes.js')
const employeeRouter = require('./routes/employeeRoutes.js')
// const clientRouter = require('./routes/clientRoutes.js');
const projectRoute = require('./routes/projectRoutes.js')
import clientRouter from './routes/clientRoutes';

const bodyParser = require('koa-bodyparser')

const app = new Koa();
app.use(cors());

app.use(bodyParser({ enableTypes: ['json', 'text'] }));

app.use(unitRouter.routes()).use(unitRouter.allowedMethods())
app.use(employeeRouter.routes()).use(employeeRouter.allowedMethods())
app.use(clientRouter.routes()).use(clientRouter.allowedMethods());
app.use(projectRoute.routes()).use(projectRoute.allowedMethods());

export default app;



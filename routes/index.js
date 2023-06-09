import Koa from 'koa';
import clientRouter from '../routes/clientRoutes.js';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(bodyParser());

app.use(clientRouter.routes()).use(clientRouter.allowedMethods());

export default app;

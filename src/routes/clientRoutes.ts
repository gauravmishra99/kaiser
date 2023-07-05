import KoaRouter from 'koa-router';
import * as clientController from '../controllers/clientController';

const route = new KoaRouter();

// Define your routes using the `route` instance
route.get('/api/clients', clientController.getAllClient);
route.post('/api/createClient', clientController.createClient);
route.post('/api/updateClient', clientController.updateClient);
route.post('/api/deleteClient', clientController.deleteClient);
route.get('/api/clients/:id', clientController.getClientById);

module.exports = route;

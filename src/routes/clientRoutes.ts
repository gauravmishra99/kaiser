const KoaRouter = require('koa-router')
const  clientController= require('../controllers/clientController.ts');

const route= new KoaRouter()

route.get('/api/clients',clientController.getAllClient);
route.post('/api/createClient',clientController.createClient);
route.post('/api/updateClient',clientController.updateClient);
route.post('/api/deleteClient',clientController.deleteClient);
route.get('/api/clients/:id',clientController.getClientById);

module.exports = route;

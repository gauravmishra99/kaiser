// const Router = require('koa-router');
// const clientController = require('../controllers/clientController.js');

// const router = new Router();

// router.get('/api/clients',clientController. getAllClient);
// router.post('/api/createClient',clientController.createClient);
// router.post('/api/updateClient',clientController.updateClient);
// router.post('/api/deleteClient',clientController.deleteClient);
// router.get('/api/getClientById/:id',clientController.getClientById);

// module.exports = router;

//Typescript
import Router from 'koa-router';
import { getAllClient, createClient, updateClient, deleteClient, getClientById } from '../controllers/clientController';

// const router = new Router();
const router = new Router({ prefix: '/api/client' });

router.get('/', getAllClient);
router.post('/api/createClient', createClient);
router.post('/api/updateClient', updateClient);
router.post('/api/deleteClient', deleteClient);
router.get('/api/getClientById/:id', getClientById);

export default router;

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
import { getAllClient } from '../controllers/clientController';

const router = new Router({ prefix: '/api/clients' });

router.get('/', getAllClient);
// router.post('/createClient', createClient);
// router.post('/updateClient', updateClient);
// router.post('/deleteClient', deleteClient);
// router.get('/:id', getClientById);

export default router;

const Router = require('koa-router');
const clientController = require('../controllers/clientController.js');

const router = new Router();

router.get('/api/clients',clientController. getAllClient);
router.post('/api/createClient',clientController.createClient);
router.post('/api/updateClient',clientController.updateClient);
router.post('/api/deleteClient',clientController.deleteClient);
router.post('/api/getClientById/:id',clientController.getClientById);

module.exports = router;

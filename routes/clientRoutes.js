const Router = require('koa-router');
const clientController = require('../controllers/clientController.js');

const router = new Router();

router.get('/api/clients',clientController. getAllClient);

module.exports = router;

const Router = require('koa-router')
const unitController =  require('../controllers/unitController.js')

const router = new Router()

router.get('/api/unit', unitController.getAllUnits)
router.post('/api/unit/create', unitController.createUnit)
router.post('/api/unit/update', unitController.updateUnit)
router.post('/api/unit/delete', unitController.deleteUnit)

module.exports = router
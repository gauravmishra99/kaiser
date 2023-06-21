const Router = require('koa-router')
const unitController =  require('../controllers/unitController.ts')

const router = new Router()

router.get('/api/unit', unitController.getAllUnits)
router.get('/api/unit/:id', unitController.getUnitById)
router.post('/api/unit/create', unitController.createUnit)
router.post('/api/unit/update', unitController.updateUnit)
router.post('/api/unit/delete', unitController.deleteUnit)

module.exports = router
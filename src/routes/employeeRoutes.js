const Router = require('koa-router')
const employeeController =  require('../controllers/employeeController.js')

const router = new Router()

router.get('/api/employee', employeeController.getAllEmployee);
router.post('/api/employee/create', employeeController.createNewEmployee);
router.post('/api/employee/update', employeeController.updateEmployee);
router.post('/api/unit/delete', employeeController.deleteEmployee);




module.exports = router
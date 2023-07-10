const koaRouter = require('koa-router')
const employeeController =  require('../controllers/employeeController.ts')

const route = new koaRouter()

route.get('/api/employee', employeeController.getAllEmployee);
route.post('/api/employee/create', employeeController.createNewEmployee);
route.post('/api/employee/update', employeeController.updateEmployee);
route.post('/api/employee/delete', employeeController.deleteEmployee);


module.exports = route
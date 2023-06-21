const Koa = require('koa');
const Route = require('koa-router');
const projectController = require('../controllers/projectController')

const route = new Route();

route.get('/projects', projectController.getAllProject)

route.get('/projects/:id', projectController.getProject)

route.post('/projects', projectController.createProject)

route.put('/projects/:id', projectController.updateProject)

route.delete('/projects/:id', projectController.deleteProject)

module.exports = route;


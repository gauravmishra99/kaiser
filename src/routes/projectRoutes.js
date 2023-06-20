const Koa = require('koa');
const router = require('koa-router');
const projectController = require('../controllers/projectController')

const route = new router();

route.post('/projects', projectController.createProject)

route.get('/projects', projectController.getProject)

route.put('/projects/:id', projectController.updateProject)

route.delete('/projects/:id', projectController.deleteProject)

module.exports = route;


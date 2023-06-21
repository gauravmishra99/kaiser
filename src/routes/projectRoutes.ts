const Koa = require('koa');
const ProjectRouter = require('koa-router');
const projectController = require('../controllers/projectController')

const ProjectRoute = new ProjectRouter();

ProjectRoute.get('/projects', projectController.getAllProject)

ProjectRoute.get('/projects/:id', projectController.getProject)

ProjectRoute.post('/projects', projectController.createProject)

ProjectRoute.put('/projects/:id', projectController.updateProject)

ProjectRoute.delete('/projects/:id', projectController.deleteProject)

module.exports = ProjectRoute;


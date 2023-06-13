const request = require('supertest')
const app = require('../app')
const fs = require('fs');
jest.mock('fs');


afterEach(() => {
    jest.clearAllMocks();
  });

describe("getProject api test",  ()=>{

    test('getProject api - success test ', async () => {
        fs.readFileSync.mockReturnValue('{"id": 1, "client_id": 1, "name":"kaiser_digital", "created_at":"", "updated_at": ""}');
        const response = await request(app.callback()).get('/projects');
        expect(response.status).toBe(200);
    });

    test('getProject api - failure test ', async () => {
        fs.readFileSync.mockReturnValue('string');
        const response = await request(app.callback()).get('/projects');
        expect(response.status).toBe(500);
    });
});

describe("createProject api test",  ()=>{
    test('createProject api - success test ', async () => {
        let mockObject = {
            "id": 3,
            "client_id": 1,
            "name": "kaiser_frontend",
            "desc": "kaiser frontened project",
            "created_at": "",
            "updated_at": ""
          }
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        fs.writeFileSync.mockReturnValue('')
        const response = await request(app.callback()).post('/projects').send(mockObject);
        expect(response.status).toBe(200);
    });

    test('createProject api - success test - id is not present in the request body', async () => {
        let mockObject2 = {
            "client_id": 1,
            "name": "kaiser_frontend",
            "desc": "kaiser frontened project",
            "created_at": "",
            "updated_at": ""
          }
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        fs.writeFileSync.mockReturnValue('')
        const response = await request(app.callback()).post('/projects').send(mockObject2);
        expect(response.status).toBe(200);
    });

    test('createProject api - failure test - client_id is not present in the request body', async () => {
        let mockObject3 = {
            "name": "kaiser_frontend",
            "desc": "kaiser frontened project",
            "created_at": "",
            "updated_at": ""
          }
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        const response = await request(app.callback()).post('/projects').send(mockObject3);
        expect(response.status).toBe(500);
    });

    test('createProject api - failure test -  Project already exists', async () => {
        let mockObject4 = {
            "id":1,
            "client_id": 1,
            "name": "kaiser_digital",
            "desc": "kaiser frontened project",
            "created_at": "",
            "updated_at": ""
          }
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        const response = await request(app.callback()).post('/projects').send(mockObject4);
        expect(response.status).toBe(500);
    });
});


describe("updateProject api test",  ()=>{
    test('updateProject api - success test ', async () => {
        let mockObject = {
            "id": 3,
            "client_id": 1,
            "name": "kaiser_frontend",
            "desc": "kaiser frontened project",
            "created_at": "",
            "updated_at": ""
          }
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        fs.writeFileSync.mockReturnValue('')
        const response = await request(app.callback()).put('/projects/1').send(mockObject);
        expect(response.status).toBe(200);
    });

    test('updateProject api - failure test - client_id is not present in the request body', async () => {
        let mockObject2 = {
            "name": "kaiser_frontend",
            "desc": "kaiser frontened project",
            "created_at": "",
            "updated_at": ""
          }
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        const response = await request(app.callback()).put('/projects/1').send(mockObject2);
        expect(response.status).toBe(500);
    });

    test('updateProject api - failure test -  Project does not exists', async () => {
        let mockObject3 = {
            "id":4,
            "client_id": 1,
            "name": "kaiser_digital",
            "desc": "kaiser frontened project",
            "created_at": "",
            "updated_at": ""
          }
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        const response = await request(app.callback()).put('/projects/4').send(mockObject3);
        expect(response.status).toBe(500);
    });
});


describe("deleteProject api test",  ()=>{
    test('deleteProject api - success test ', async () => {
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        fs.writeFileSync.mockReturnValue('')
        const response = await request(app.callback()).delete('/projects/1');
        expect(response.status).toBe(200);
    });

    test('deleteProject api - failure test -  Project does not exists', async () => {
        fs.readFileSync.mockReturnValue('{"projects": [{"id": 1, "client_id": 1, "name":"kaiser_digital","desc": "kaiser digital project", "created_at":"", "updated_at": ""}, {"id": 2, "client_id": 1, "name":"kaiser_digital", "desc": "kaiser node.js project", "created_at":"", "updated_at": ""}]}');
        const response = await request(app.callback()).delete('/projects/5');
        expect(response.status).toBe(500);
    });

});
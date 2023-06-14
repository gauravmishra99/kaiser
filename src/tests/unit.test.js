const request = require('supertest')
const app = require('../app.js')

describe("Test the unit endpoints",  ()=>{
    test('Response from unit is Array', async () => {
        const response = await request(app.callback()).get('/api/unit');
        const body = response.body;
        expect(response.status).toBe(200);
        expect(Array.isArray(body)).toBe(true)
    });

    test('New data added in units', async () => {
        await request(app.callback())
        .post('/api/unit/create').send({"name": "Religion"}).expect(201)

        const response = await request(app.callback()).get('/api/unit');
        const body = response.body;
        let found = false;
        expect(body[body.length-1].name).toBe("Religion")
    })

    test("Adding new data already present", async () => {
        const response  = await request(app.callback()).post('/api/unit/create').send({"name": "Religion"})

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Unit name already exits')
    })

    test('Update data', async () => {
        await request(app.callback())
        .post('/api/unit/update').send({
            "id" : 1,
            "newUnitName" : "Healthcare_Updated"
        }).expect(201);

        const response = await request(app.callback()).get('/api/unit');

        let id = 1;
        let name = ''
        response.body.forEach(element => {
            if(element.id == id){
                name = element.name;
            }
        });

        expect(name).toBe('Healthcare_Updated')
    })

    test('Update invalid data', async () => {
        const response = await request(app.callback())
        .post('/api/unit/update').send({
            "id" : 34,
            "newUnitName" : "Healthcare_Updated"
        }).expect(500);

        expect(response.body.message).toBe('No such unit found')
    })

    test("Delete Religion unit", async () => {
        let response = await request(app.callback()).get('/api/unit');
        let body = response.body;

        let id = body[body.length-1].id;

        await request(app.callback()).post('/api/unit/delete').send({
            "id" : id
        }).expect(200);

        response = await request(app.callback()).get('/api/unit');
        body = response.body;

        let deleted = true;
        body.forEach(unit => {
            if(unit.id === id){
                deleted = false;
            }
        })

        expect(deleted).toBe(true)
    })
})

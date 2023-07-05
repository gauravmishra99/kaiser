
const request = require('supertest');
const app = require('../app'); // Imported Koa.js app
const fs = require('fs')
describe('CRUD operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get client', () => {
    test('should fetch all clients successfully', async () => {
      const response = await request(app.callback())
      .get('/api/clients');
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Successfully fetched');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('should return an error on failure', async () => {
      // Mock the API call to throw an error
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('Error occurred');
      });  
      // Perform the GET request to your app's endpoint
      const response = await request(app.callback()).get('/api/clients');
      // Assert the response
      expect(response.status).toBe(500);
      expect(Array.isArray(response.body.data)).toBe(true);
      mockReadFileSync.mockReset();

    });
  });

  
  describe('get client by id', () => {
    test('should fetch a client by ID successfully', async () => {
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync');
      mockReadFileSync.mockImplementation(() => JSON.stringify([
        { id: 1, uid: 1, name: 'Client 1' },
        { id: 2, uid: 2, name: 'Client 2' },
      ]));
      // Make a request to your application using Supertest
      const response = await request(app.callback()).get('/api/getClientById/1')
      // Assert the response body
      expect(response.status).toBe(200)
      expect(response.body.message).toEqual('Client Details');
      expect(Array.isArray(response.body.data)).toBe(false);
      mockReadFileSync.mockReset();

    });
    test('should return an error when an invalid client ID is provided', async () => {
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync');
      mockReadFileSync.mockImplementation(() => JSON.stringify([
        { id: 1, uid: 1, name: 'Client 1' },
        { id: 2, uid: 2, name: 'Client 2' },
      ]));

      // Make a request to your application using Supertest
      const response = await request(app.callback()).get('/api/getClientById/3')
      // Assert the response body
      expect(response.status).toBe(200)
      expect(response.body.message).toEqual('client Not Found');
      mockReadFileSync.mockReset();

    });
  });
  describe('create client', () => {

    test('should create a new client', async () => {
      const clientData = [{ id: 1, name: 'Client 1' }];
      const unitData = [{ id: 1, name: 'Unit 1' }];
      const mockReadFileSync = fs.readFileSync.mockReturnValueOnce(JSON.stringify(clientData));
      const mockReadFileSync1 = fs.readFileSync.mockReturnValueOnce(JSON.stringify(unitData));

      const response = await request(app.callback())
        .post('/api/createClient')
        .send({ name: 'New Client', id: 2, uid: 1 });

      expect(response.status).toBe(201)
      expect(response.body.message).toEqual('Client created and stored successfully');
      mockReadFileSync.mockReset();
      mockReadFileSync1.mockReset();
    });

    test('should return an error when a client ID or Name already exists', async () => {
      // Mock the file system readFileSync function for clientModel.json
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync');
      mockReadFileSync.mockImplementation(() => JSON.stringify([
        { name: 'Existing Client', id: 1, uid: 1 }

      ]));

      //  const mockReadFileSync= jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(JSON.stringify([
      //     { name: 'Existing Client', id: 1, uid: 1 }
      //   ]));

      // Mock the file system readFileSync function for unitModel.json
      const mockReadFileSync1 = jest.spyOn(fs, 'readFileSync');
      mockReadFileSync.mockImplementation(() => JSON.stringify([
        { id: 1, name: 'Unit 1' },
        { id: 2, name: 'Unit 2' },
      ]));
      // const mockReadFileSync1= jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(JSON.stringify([
      //   { id: 1, name: 'Unit 1' },
      //   { id: 2, name: 'Unit 2' },
      // ]))
      // Make a request to your application using Supertest
      const response = await request(app.callback()).post('/api/createClient')
        .send({
          name: 'Existing Client',
          id: 1,
          uid: 1,
        })
      // Assert the response body
      expect(response.status).toBe(200)
      expect(response.body.message).toEqual('Client with the same ID or Name already existslly Added');
      mockReadFileSync.mockReset();
      mockReadFileSync1.mockReset();
    });

    it('should return an error when unit id doesnot exist', async () => {
      const clientData = [{ id: 1, name: 'Client 1' }];
      const unitData = [{ id: 1, name: 'Unit 1' }];
      const mockReadFileSync = fs.readFileSync.mockReturnValueOnce(JSON.stringify(clientData));
      const mockReadFileSync1 = fs.readFileSync.mockReturnValueOnce(JSON.stringify(unitData));

      const response = await request(app.callback())
        .post('/api/createClient')
        .send({ name: 'New Client', id: 2, uid: 2 });

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Unit doesn't exist !");
      mockReadFileSync.mockReset();
      mockReadFileSync1.mockReset();
    });

    it('should return an error on failure', async () => {
      // const errorMessage = 'Mocked error';
      // fs.readFileSync.mockReturnValueOnce(JSON.stringify([]));
      // Mock the API call to throw an error
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('Error occurred');
      });

      const response = await request(app.callback())
        .post('/api/createClient')
        .send({ name: 'New Client', id: 1, uid: 1 });

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('Error storing clients');
      mockReadFileSync.mockReset();
    });
  });
  describe('update client', () => {
    test('should update a client successfully', async () => {
      // Create a test client
      const testClient = {
        name: 'Test Client',
        id: 1,
        uid: 1,
      };
      // Mock the file system readFileSync function for clientModel.json
      const mockReadFileSync = jest.spyOn(fs, 'readFileSync');
      mockReadFileSync.mockImplementation(() => JSON.stringify([
        { id: 1, name: 'Unit 1' },
        { id: 2, name: 'Unit 2' },
      ]));
      // const mockReadFileSync= jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(JSON.stringify([
      //   testClient ]));
      // // Write the test client data to the clientModel.json file
      // fs.writeFileSync('./models/clientModel.json', JSON.stringify([testClient]));

      // Send a request to update the client
      const response = await request(app.callback())
        .post('/api/updateClient') // Replace with the actual route to updateClient
        .send({
          name: 'Updated Client',
          id: 1,
          uid: 1,
        });

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Client Updated Successfully');
      mockReadFileSync.mockReset();
    });

    test('should return an error if client is not found', async () => {
      // Send a request to update a non-existent client
      const response = await request(app.callback())
        .post('/api/updateClient') // Replace with the actual route to updateClient
        .send({
          name: 'Updated Client',
          id: 2,
          uid: 1,
        });

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Client Not Found');
    });

    test('should return an error if there is an error updating the client', async () => {
      // Mock an error while reading the clientModel.json file
      jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
        throw new Error('Mocked readFileSync error');
      });

      // Send a request to update the client
      const response = await request(app.callback())
        .post('/api/updateClient') // Replace with the actual route to updateClient
        .send({
          name: 'Updated Client',
          id: '123',
          uid: 'abc',
        });

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error Updating Client');
    });
  })
  describe('delete client', () => {

    test('should delete an client if id exist', async () => {

      // Send a request to delete the client
      const response = await request(app.callback())
        .post('/api/deleteClient') // Replace with the actual route to updateClient
        .send({ id: 1 });

      // Assert the API response
      expect(response.body.message).toBe('Client Deleted Successfully');
      expect(response.status).toBe(200);
    });

    test('should return messege Client Not Found if id is not exist', async () => {
      // Send a request to delete the client
      const response = await request(app.callback())
        .post('/api/deleteClient') // Replace with the actual route to updateClient
        .send({ id: 2 });
      // Assert the API response
      expect(response.body.message).toBe('Client Not Found');
      expect(response.status).toBe(200);
    });

    test('should handle an error while deleting a client', async () => {
      // Mock the file system readFileSync and writeFileSync methods to throw an error
      jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw new Error('Error Deleting Client');
      });

      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
        throw new Error('Mocked error');
      });
      // Make a request to delete the client
      const response = await request(app.callback())
        .post('/api/deleteClient') // Replace with the actual route to updateClient
        .send({ id: 2 });
      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error Deleting Client');

    });
  });

});
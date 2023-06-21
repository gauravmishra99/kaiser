// //TYPESCRIPT
// import fs from 'fs';
// import { successResponse, errorResponse } from  '../responseClass/responseHelper';
// import path from 'path';
// import { Context } from 'koa';
const fs = require("fs");
const { apiResponse } = require("../helper/apiResponse");
const path = require("path");

const filePath = path.join(__dirname, '../models/clientModel.json');
const unitfilePath = path.join(__dirname, '../models/unitModel.json');

export const getAllClient = async (ctx: any) => {
  try {
    // Read the existing client data from the JSON file
    const clientJsonData =await fs.readFileSync(filePath, 'utf-8');
    const clientData = JSON.parse(clientJsonData);
    apiResponse(ctx, "Successfully fetched", clientData, 200,false);
  } catch (error) {
    apiResponse(ctx, "Client not found",[], 500,true);
    }
};

export const getClientById = async (ctx: any) => {
  try {
    const { id }= ctx.params;
    // Read the client data from the JSON file
    const clientJsonData =await fs.readFileSync(filePath, 'utf-8');
    const clientData = JSON.parse(clientJsonData);
    // Find the client by ID
    const existingClient = clientData.find((client: { id: number }) => client.id === parseInt(id));
    if (existingClient) {
      apiResponse(ctx, 'Client Details', existingClient, 200,false);
    } else {
      apiResponse(ctx, 'Client ID does not Exist', [], 200,false);
    }
  } catch (error) {
    apiResponse(ctx, "Something went wront !",[], 500,true);
    }
};

export const createClient = async (ctx: any) => {
  const { name, id, uid } = ctx.request.body;
  try {
    // Read existing client data from JSON file
    const clientJsonData =await fs.readFileSync(filePath, 'utf-8');
    const clientData = JSON.parse(clientJsonData);

    const existingClient = clientData.find((client: { id: number; name: string }) => client.id === id || client.name === name);
    if (existingClient) {
      apiResponse(ctx, 'Client with the same ID or Name already exists', [], 200);

    } else {
      // Read existing unit data from JSON file unitfilePath
    const unitJsonData =await fs.readFileSync(unitfilePath, 'utf-8');
    const unitData = JSON.parse(unitJsonData);
      // Check if unit id exists or not
      const existingUnit = unitData.find((unit: { id: number }) => unit.id === uid);
      if (existingUnit) {
        // Auto-increment the client id
        const lastItem = clientData[clientData.length - 1];
        const lastId = lastItem ? lastItem.id + 1 : 1;
        const currentDate = new Date();
        const currentTime = new Date().toLocaleTimeString();

        const newClient = {
          name: name,
          id: lastId,
          uid: uid,
          createdDateTime: currentDate.toISOString(),
          createdTime: currentTime,
          updatedDate: currentDate.toISOString(),
          updatedTime: currentTime,
        };
        // Add the new client to the existing data
        clientData.push(newClient);
        
        await fs.writeFileSync(filePath, JSON.stringify(clientData));
        apiResponse(ctx, "Client created and stored successfully", [], 201,false);
      } else {
        apiResponse(ctx, "Unit doesn't exist!", [], 200,false);
      }
    }
  } catch (error) {
 apiResponse(ctx, "Something went wront !", 500,true);
  }
};

export const updateClient = async (ctx: any): Promise<void> => {
  const { name, id, uid } = ctx.request.body;

  try {
    // Read existing Client data from JSON file
    const clientJsonData =await fs.readFileSync(filePath, 'utf-8');
    const clientData = JSON.parse(clientJsonData);

    let clientUpdated = false;
    const currentDate = new Date();  
    const currentTime = new Date().toLocaleTimeString();
    // Loop through the client array
    for (let i = 0; i < clientData.length; i++) {
      if (clientData[i].id === id) {
        // Update the client data
        clientData[i].name = name;
        clientData[i].updatedDate = currentDate.toISOString();
        clientData[i].updatedTime = currentTime;
        clientUpdated = true;
        break;
      }
    }
    if (clientUpdated) {
      // Write the updated client data back to the JSON file
      await fs.writeFileSync(filePath, JSON.stringify(clientData));
      apiResponse(ctx, 'Client Updated Successfully', [], 200);
    } else {
      apiResponse(ctx, 'Client Not Found', [], 200,false);
    }
  } catch (error) {
    apiResponse(ctx, "Something went wront !", 500,true);
    }
};

export const deleteClient = async (ctx: any): Promise<void> => {
  try {
    const { id } = ctx.request.body;
    // Read the existing client data from the JSON file
    const clientJsonData =await fs.readFileSync(filePath, 'utf-8');
    // const clientJsonData = await fs.readFileSync('./models/clientModel.json', 'utf-8');
    let clientData = JSON.parse(clientJsonData);
    let existingClient = false;

    // Loop through the client array and find the matching client by ID
    for (let i = 0; i < clientData.length; i++) {
      if (clientData[i].id === id) {
        // Remove the client from the array
        clientData.splice(i, 1);
        existingClient = true;
        break;
      }
    }
    if (existingClient) {
      // Write the updated client data back to the JSON file
      await fs.writeFileSync(filePath, JSON.stringify(clientData));
      apiResponse(ctx, 'Client Deleted Successfully', [], 200,false);
    } else {
      apiResponse(ctx, 'Client Not Found', [], 200,false);
    }
  } catch (error) {
    apiResponse(ctx, "Something went wront !", 500,true);
  }
};
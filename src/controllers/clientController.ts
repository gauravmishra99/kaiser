
import fs from 'fs';
import { apiResponse } from '../helper/apiResponse';
import path from 'path';
import { CustomError } from '../errorClass/errorClass';

const filePath: string = path.join(__dirname, '../models/clientModel.json');
const unitfilePath: string = path.join(__dirname, '../models/unitModel.json');

export const getAllClient = async (ctx: any) => {
  try {
    // Read the existing client data from the JSON file
    const clientJsonData: string = await fs.readFileSync(filePath, 'utf-8');
    const clientData: any[] = JSON.parse(clientJsonData);
    if (clientData.length) {
      apiResponse(ctx, "Successfully fetched", clientData, 200, false);
    } else {
      throw new CustomError("No Client found", 200);
      // apiResponse(ctx, "No Client found", [], 200, false);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      apiResponse(ctx, error.message, [], error.status, false);
      // throw new CustomError('Internal server error !',500);
    } else
      throw new CustomError('Something went wrong!', 500);
  }
};

export const getClientById = async (ctx: any) => {
  try {
    const { id }: { id: string } = ctx.params;
    const clientId: number = parseInt(ctx.params.id)
    if (clientId) {
      // Read the client data from the JSON file
      const clientJsonData: string = await fs.readFileSync(filePath, 'utf-8');
      const clientData: any[] = JSON.parse(clientJsonData);
      // Find the client by ID
      const existingClient: any = clientData.find((client: { id: number }) => client.id === parseInt(id));
      if (existingClient) {
        apiResponse(ctx, 'Client Details', existingClient, 200, false);
      } else {
        throw new CustomError('Client ID does not Exist', 200);
        // apiResponse(ctx, 'Client ID does not Exist', [], 200, false);
      }
    } else {
      throw new CustomError('Plese provide Client ID', 200);
      // apiResponse(ctx, 'Plese provide Client ID', [], 200, false);
    }
  } catch (error) {
    if (error instanceof CustomError) {

      apiResponse(ctx, error.message, [], error.status, false);

      // ctx.response.status = error.status;
      // ctx.response.body = {   
      //   message: error.message,
      //   status:false,
      //   data:[]
      // };
    } else
      throw new CustomError("Something went wront !", 500);
    // apiResponse(ctx, "Something went wront !", [], 500, true);
  }
};

export const createClient = async (ctx: any) => {
  const { name, id, uid }: { name: string, id: string, uid: string } = ctx.request.body;

  try {
    const UID: number = parseInt(uid);
    const ID: number = parseInt(id);

    if (name && UID) {
      // Read existing client data from JSON file
      const clientJsonData: string = await fs.readFileSync(filePath, 'utf-8');
      const clientData: any = JSON.parse(clientJsonData);

      const existingClient: any = clientData.find((client: { id: number; name: string }) => client.id === ID || client.name === name);
      if (existingClient) {
        throw new CustomError('Client with the same ID or Name already exists', 200);
      } else {
        // Read existing unit data from JSON file unitfilePath
        const unitJsonData: string = await fs.readFileSync(unitfilePath, 'utf-8');
        const unitData: any = JSON.parse(unitJsonData);
        // Check if unit id exists or not
        const existingUnit: any = unitData.find((unit: { id: number }) => unit.id === UID);
        if (existingUnit) {
          // Auto-increment the client id
          const lastItem = clientData[clientData.length - 1];
          const lastId: number = lastItem ? lastItem.id + 1 : 1;
          const currentDate: Date = new Date();
          const date: string = dateForm(currentDate);
          const currentTime: string = new Date().toLocaleTimeString();

          const newClient = {
            name: name,
            id: lastId,
            uid: UID,
            createdDate: date,
            createdTime: currentTime,
            updatedDate: date,
            updatedTime: currentTime,
          };
          // Add the new client to the existing data
          clientData.push(newClient);

          await fs.writeFileSync(filePath, JSON.stringify(clientData));
          apiResponse(ctx, 'Client created and stored successfully', [], 201, false);
        } else {
          throw new CustomError("Unit doesn't exist!", 200);
        }
      }
    } else {
      const err = new CustomError('Please provide all inputs', 200);
      throw err;
    }
  } catch (error) {
    if (error instanceof CustomError) {
      apiResponse(ctx, error.message, [], error.status, false);
    } else {
      throw new CustomError('Something went wrong!', 500);

    }
  }
};

export const updateClient = async (ctx: any) => {
  const { name, id, uid } = ctx.request.body;
  try {
    const ID: number = parseInt(id);
    const uID: number = parseInt(uid)
    if (name && ID) {
      // Read existing Client data from JSON file
      const clientJsonData: string = await fs.readFileSync(filePath, 'utf-8');
      const clientData: any = JSON.parse(clientJsonData);

      let clientUpdated: boolean = false;
      const currentDate: Date = new Date();
      const date: string = dateForm(currentDate)
      const currentTime: string = new Date().toLocaleTimeString();
      // Loop through the client array
      for (let i: number = 0; i < clientData.length; i++) {
        if (clientData[i].id === ID) {
          // Update the client data
          clientData[i].name = name;
          clientData[i].uid = uID;
          clientData[i].updatedDate = date;
          clientData[i].updatedTime = currentTime;
          clientUpdated = true;
          break;
        }
      }
      if (clientUpdated) {
        // Write the updated client data back to the JSON file
        await fs.writeFileSync(filePath, JSON.stringify(clientData));
        apiResponse(ctx, 'Client Updated Successfully', [], 200, false);
      } else {
        throw new CustomError('Client Not Found', 200)
        // apiResponse(ctx, 'Client Not Found', [], 200, false);
      }
    } else {
      throw new CustomError('Please provide all inputs', 200)
      // apiResponse(ctx, 'Please provide all inputs', [], 200,false);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      apiResponse(ctx, error.message, [], error.status, false);
    } else
      throw new CustomError("Something went wront !", 500)
    // apiResponse(ctx, "Something went wront !", 500, true);
  }
};


export const deleteClient = async (ctx: any) => {
  try {
    const { id } = ctx.request.body;
    const clientID: number = parseInt(id)
    if (clientID) {
      // Read the existing client data from the JSON file
      const clientJsonData: string = await fs.readFileSync(filePath, 'utf-8');
      // const clientJsonData = await fs.readFileSync('./models/clientModel.json', 'utf-8');
      let clientData: any = JSON.parse(clientJsonData);
      let existingClient: boolean = false;

      // Loop through the client array and find the matching client by ID
      for (let i: number = 0; i < clientData.length; i++) {
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
        apiResponse(ctx, 'Client Deleted Successfully', [], 200, false);
      } else {
        throw new CustomError('Client Not Found', 200)
        // apiResponse(ctx, 'Client Not Found', [], 200, false);
      }
    } else {
      throw new CustomError("Please provide the client ID", 200)
      // apiResponse(ctx, "Please provide the client ID", 500, true);
    }
  } catch (error) {
    if (error instanceof CustomError) {
      apiResponse(ctx, error.message, [], error.status, false)
    } else
      throw new CustomError("Something went wront !", 500)
    // apiResponse(ctx, "Something went wront !", 500, true);
  }
};

//create date format
const dateForm = (dt: Date): string => {
  const date = new Date(dt).toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });
  let dtSplit = date.split(',');
  dtSplit = dtSplit[0].split('/');
  const dt1 = prependOneZero(Number(dtSplit[1]));
  const dt0 = prependOneZero(Number(dtSplit[0]));
  const formattedDate = `${dtSplit[2]}-${dt0}-${dt1}`;
  return formattedDate;
}

const prependOneZero = (number: number): string => {
  if (number < 10)
    return "0" + number;
  else
    return number.toString();
}

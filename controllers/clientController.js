import fs from 'fs/promises';
import { apiResponse } from '../helper/apiResponse.js';

const getAllClient = async (ctx) => {
  
  try {
    const jsonString = await fs.readFile('./models/clientModel.json', 'utf-8');
    const client = JSON.parse(jsonString);
    apiResponse(ctx, "Address Successfully Added", client, 201, false);;
  } catch (error) {
    apiResponse(ctx, "Address Successfully Added", [], 500, true);;
  }
};

export { getAllClient };
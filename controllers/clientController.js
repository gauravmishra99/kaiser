const fs = require('fs').promises;
const { apiResponse } = require('../helper/apiResponse');

exports. getAllClient = async (ctx) => {
  try {
    const jsonString = await fs.readFile('./models/clientModel.json', 'utf-8');
    const client = JSON.parse(jsonString);
    apiResponse(ctx, "Successfully Added", client, 201, false);
  } catch (error) {
    console.log(error)
    apiResponse(ctx, "Error Occured", [], 500, true);
  }
};

const fs = require('fs').promises;
const { apiResponse } = require('../helper/apiResponse');

exports. getAllClient = async (ctx) => {
  try {
    // Read the existing client data from the JSON file
    const clientJsonData = await fs.readFile('./models/clientModel.json', 'utf-8');
    const clientData = JSON.parse(clientJsonData);
    apiResponse(ctx, "Successfully Added", clientData, 200, false);
  } catch (error) {
    console.log(error)
    apiResponse(ctx, "Error Occured", [], 500, true);
  }
};

exports. getClientById = async (ctx) => {
      try {
      const { id } = ctx.params;
      // Read the client data from the JSON file
      const clientJsonData = await fs.readFile('./models/clientModel.json', 'utf-8');
      const clientData = JSON.parse(clientJsonData);
  
      // Find the client by ID
      const existingclient = clientData.find((clients) => clients.id === parseInt(id));
  
      if (existingclient) {
        apiResponse(ctx, 'Client Found', existingclient, 200, false);
      } else {
        apiResponse(ctx, 'client Not Found', [], 500, true);
      }
    } catch (error) {
      console.error(error);
      apiResponse(ctx, 'Error Fetching Client', null, 500, false);
    }
};

exports. createClient = async (ctx) => {
      const { name, id, uid } = ctx.request.body;
  
      try {
        // Read existing client data from JSON file
        const clientJsonData = await fs.readFile('./models/clientModel.json', 'utf-8');
        const clientData = JSON.parse(clientJsonData);

        const existingClient= clientData.find((clients) => clients.id === id || clients.name===name);
         if (existingClient) {
          apiResponse(ctx, "Client with the same ID or Name already existslly Added", [], 200, false);
         }
        else{
          const existingUnit = clientData.find((clients) => clients.uid === uid);

          if (existingUnit) {
            const currentDate = new Date();
            const currentTime = new Date().toLocaleTimeString();
           
            const newClient = {
                "name": name,
                "id": id,
                "uid":uid,
                "createdDateTime":  currentDate.toISOString(),
                "createdTime": currentTime,
                "updatedDate":  currentDate.toISOString(),
                "updatedTime": currentTime
              };
              // Add the new client to the existing data
              clientData.push(newClient);
  
              await fs.writeFile('./models/clientModel.json', JSON.stringify(clientData));
              apiResponse(ctx, "Client created and stored successfully", [], 200, false);
  
           }else{
            apiResponse(ctx, "Unit doesn't exist !", [], 200, false);
           }
        }
      } catch (error) {
        console.error(error);
        apiResponse(ctx, 'Error storing clients', [], 500, true);
      }
    };


exports. updateClient = async (ctx) => 
  {
    const { name, id, uid } = ctx.request.body;

    try {
      // Read existing Client data from JSON file
      const clientJsonData = await fs.readFile('./models/clientModel.json', 'utf-8');
      const clientData = JSON.parse(clientJsonData);

      let clientUpdated = false;

      const currentDate = new Date();
      const currentTime = new Date().toLocaleTimeString();
      // Loop through the client array
      for (let i = 0; i < clientData.length; i++) {
        if (clientData[i].id === id) {
          // Update the client data
          clientData[i].name = name;
          // clientData[i].id = id;
          // clientData[i].uid = uid;
          clientData[i].updatedDate= currentDate.toISOString(),
          clientData[i].updatedTime =currentTime
          clientUpdated = true;
          break;
        }
      }
      if (clientUpdated) {
        // Write the updated client data back to the JSON file
        await fs.writeFile('./models/clientModel.json', JSON.stringify(clientData));
        apiResponse(ctx, 'Client Updated Successfully', [], 200, false);
      } else {
        apiResponse(ctx, 'Client Not Found', [], 500, false);
      }
    } catch (error) {
      console.error(error);
      apiResponse(ctx, 'Error Updating Clint', [], 500, false);
    }
  };


exports. deleteClient = async (ctx) => {
  try {
    const { id } = ctx.request.body;

    // Read the existing client data from the JSON file
    const clientJsonData = await fs.readFile('./models/clientModel.json', 'utf-8');
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
      await fs.writeFile('./models/clientModel.json', JSON.stringify(clientData));
      apiResponse(ctx, 'Client Deleted Successfully', [], 200, false);
    } else {
      apiResponse(ctx, 'Client Not Found', [], 500, true);
    }
  } catch (error) {
    console.error(error);
    apiResponse(ctx, 'Error Deleting Client', [], 500, true);
  }
};
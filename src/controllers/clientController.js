const fs = require("fs");
const { apiResponse } = require("../helper/apiResponse");
const client = require("../models/clientModel.json");
const path = require("path");

exports.getAllClient = async (ctx) => {
  try {
    // Read the existing client data from the JSON file
    const clientJsonData = await fs.readFileSync(
      path.resolve(__dirname, "../models/clientModel.json"),
      "utf-8"
    );
    const clientData = JSON.parse(clientJsonData);
    apiResponse(ctx, "Successfully fetched", clientData, 200, false);
  } catch (error) {
    // console.log(error);
    apiResponse(ctx, "Error Occured", [], 500, true);
  }
};

exports.getClientById = async (ctx) => {
  try {
    const { id } = ctx.params;

    // Read the client data from the JSON file
    const clientJsonData = await fs.readFileSync(
      path.resolve(__dirname, "../models/clientModel.json")
    );
    const clientData = JSON.parse(clientJsonData);

    // Find the client by ID
    const existingclient = clientData.find(
      (clients) => clients.id === parseInt(id)
    );
    if (existingclient) {
      apiResponse(ctx, "Client Details", existingclient, 200, false);
    } else {
      apiResponse(ctx, "client Not Found", [], 200, false);
    }
  } catch (error) {
    console.log(error);
    apiResponse(ctx, "Error Fetching Client", [], 500, true);
  }
};

exports.createClient = async (ctx) => {
  const { name, id, uid } = ctx.request.body;

  try {
    // Read existing client data from JSON file
    const clientJsonData = await fs.readFileSync(
      path.resolve(__dirname, "../models/clientModel.json)"),
      "utf-8"
    );
    const clientData = JSON.parse(clientJsonData);

    const existingClient = clientData.find(
      (clients) => clients.id === id || clients.name === name
    );
    if (existingClient) {
      apiResponse(
        ctx,
        "Client with the same ID or Name already existslly Added",
        [],
        200,
        false
      );
    } else {
      // Read existing unit data from JSON file
      const unitJsonData = await fs.readFileSync(
        "./models/unitModel.json",
        "utf-8"
      );
      const unitData = JSON.parse(unitJsonData);
      //check unit id exist or not
      const existingUnit = unitData.find((units) => units.id === uid);
      if (existingUnit) {
        //auto-increment the client id
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

        await fs.writeFileSync(
          path.resolve(__dirname, "../models/clientModel.json)"),
          JSON.stringify(clientData)
        );
        apiResponse(
          ctx,
          "Client created and stored successfully",
          [],
          201,
          false
        );
      } else {
        apiResponse(ctx, "Unit doesn't exist !", [], 200, false);
      }
    }
  } catch (error) {
    console.log(error);
    apiResponse(ctx, "Error storing clients", [], 500, true);
  }
};

exports.updateClient = async (ctx) => {
  const { name, id, uid } = ctx.request.body;

  try {
    // Read existing Client data from JSON file
    const clientJsonData = await fs.readFileSync(
      path.resolve(__dirname, "../models/clientModel.json)"),
      "utf-8"
    );
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
        (clientData[i].updatedDate = currentDate.toISOString()),
          (clientData[i].updatedTime = currentTime);
        clientUpdated = true;
        break;
      }
    }
    if (clientUpdated) {
      // Write the updated client data back to the JSON file
      await fs.writeFileSync(
        path.resolve(__dirname, "../models/clientModel.json)"),
        JSON.stringify(clientData)
      );
      apiResponse(ctx, "Client Updated Successfully", [], 200, false);
    } else {
      apiResponse(ctx, "Client Not Found", [], 200, false);
    }
  } catch (error) {
    console.log(error);
    apiResponse(ctx, "Error Updating Client", [], 500, true);
  }
};

exports.deleteClient = async (ctx) => {
  try {
    const { id } = ctx.request.body;

    // Read the existing client data from the JSON file
    const clientJsonData = await fs.readFileSync(
      path.resolve(__dirname, "../models/clientModel.json)"),
      "utf-8"
    );
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
      await fs.writeFileSync(
        path.resolve(__dirname, "../models/clientModel.json)"),
        JSON.stringify(clientData)
      );
      apiResponse(ctx, "Client Deleted Successfully", [], 200, false);
    } else {
      apiResponse(ctx, "Client Not Found", [], 200, false);
    }
  } catch (error) {
    console.log(error);
    apiResponse(ctx, "Error Deleting Client", [], 500, true);
  }
};

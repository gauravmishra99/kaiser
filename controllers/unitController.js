const crypto = require('crypto')
const fs = require('fs')

async function getAllUnits(ctx) {
  try {
    const jsonString = fs.readFileSync("./models/unitModel.json");
    const units = JSON.parse(String(jsonString));
    ctx.body = units;
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = "Error Reading file";
    ctx.app.emit("error", error, ctx);
  }
}

async function createUnit(ctx) {
  try {
    const jsonString = fs.readFileSync("./models/unitModel.json");
    const units = JSON.parse(String(jsonString));
    const body = ctx.request.body;
    let unitName = body["name"];

    // check if unit name exists
    for (let i = 0; i < units.length; i++) {
      if (units[i]["name"] === unitName) {
        throw Error("Unit name already exits");
      }
    }

    // add unit name
    let unit = {
      name: unitName,
      id: crypto.randomUUID(),
      createdDate: "06-06-2023",
      createdTime: "10:11 am",
      updatedDate: "",
      updatedTime: "",
    };

    units.push(unit);
    try {
      fs.writeFileSync("./models/unitModel.json", JSON.stringify(units));
    } catch (error) {
      ctx.status = error.status || 500;
      ctx.body = "Error Writing data in file";
      ctx.app.emit("error", error, ctx);
    }

    ctx.status = 201;
    ctx.body = "Data inserted successfully";
  } catch (error) {
    ctx.status = error.status || 500;
    let response = {
        "message": error.message || "File read failed"
    }
    ctx.body = response;
  }
}

async function updateUnit(ctx) {
  try {
    const jsonString = fs.readFileSync("./models/unitModel.json");
    const units = JSON.parse(String(jsonString));
    const body = ctx.request.body;
    let unitID = body["id"];
    let newUnitName = body["newUnitName"];

    let unitFound = false;
    // check if unit name exists
    for (let i = 0; i < units.length; i++) {
      if (units[i]["id"] === unitID) {
        unitFound = true;
        units[i]["name"] = newUnitName;
        try {
          fs.writeFileSync("./models/unitModel.json", JSON.stringify(units));
        } catch (error) {
          ctx.status = error.status || 500;
          ctx.body = "Error Writing data in file";
          ctx.app.emit("error", error, ctx);
        }
        break;
      }
    }
    if (!unitFound) throw Error("No such unit found");

    ctx.status = 201;
    ctx.body = "Data Updated successfully";
  } catch (error) {
    let response = {
        "message" : error.message || "File read failed"
    }
    ctx.status = error.status || 500;
    ctx.body = response;
  }
}

async function deleteUnit(ctx) {
  try {
    const jsonString = fs.readFileSync("./models/unitModel.json");
    const units = JSON.parse(String(jsonString));
    const body = ctx.request.body;
    let unitID = body["id"];

    let updatedUnits = units.filter((unit) => {
      return unit["id"] !== unitID;
    });
    
    try {
      fs.writeFileSync("./models/unitModel.json", JSON.stringify(updatedUnits));
    } catch (error) {
        throw Error("Error Writing data in file");
    }
    ctx.status = 200;
    ctx.body = "Data Updated successfully";
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message || "File read failed";
  }
}

module.exports = { getAllUnits, createUnit, updateUnit, deleteUnit };

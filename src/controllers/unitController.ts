import crypto from "crypto"
import fs from "fs";
import { Context, Request } from "koa";
import path from "path";
import { apiResponse } from "../helper/apiResponse";

const unit = require("../models/unitModel.json");

async function getAllUnits(ctx: Context) {
  try {
    const jsonString = fs.readFileSync(
      path.resolve(__dirname, "../models/unitModel.json")
    );
    const units = JSON.parse(String(jsonString));
    ctx.body = units;
  } catch (error: any) {
    ctx.status = error.status || 500;
    ctx.body = "Error Reading file";
    ctx.app.emit("error", error, ctx);
  }
}

async function getUnitById(ctx: Context) {
  try {
    const { id } = ctx.params;
    console.log(id)
    const jsonString = fs.readFileSync(
      path.resolve(__dirname, "../models/unitModel.json")
    );
    const units = JSON.parse(String(jsonString));

    let unit = units.filter((unit: any) => {
      return unit.id == id;
    });
    
    if (unit.length > 0) {
      apiResponse(ctx, "Unit Details", unit, 200, false);
    } else {
      apiResponse(ctx, "Unit Not Found", [], 200, false);
    }
  } catch (error) {
    console.log(error);
    apiResponse(ctx, "Error Fetching Unit", [], 500, true);
  }
}

async function createUnit(ctx: Context) {
  try {
    const jsonString = fs.readFileSync(
      path.resolve(__dirname, "../models/unitModel.json")
    );
    const units = JSON.parse(String(jsonString));
    const body: any = ctx.request.body;
    let unitName = body["name"];

    // check if unit name exists
    for (let i = 0; i < units.length; i++) {
      if (units[i]["name"] === unitName) {
        throw Error("Unit name already exits");
      }
    }

    const date = new Date();
    let time = date.toLocaleTimeString();

    // add unit name
    let unit = {
      name: unitName,
      id: crypto.randomUUID(),
      createdDate: date.toISOString(),
      createdTime: time,
      updatedDate: date.toISOString(),
      updatedTime: time,
    };

    units.push(unit);
    try {
      fs.writeFileSync(
        path.resolve(__dirname, "../models/unitModel.json"),
        JSON.stringify(units)
      );
    } catch (error: any) {
      ctx.status = error.status || 500;
      ctx.body = "Error Writing data in file";
      ctx.app.emit("error", error, ctx);
    }

    ctx.status = 201;
    ctx.body = "Data inserted successfully";
  } catch (error: any) {
    ctx.status = error.status || 500;
    let response = {
      message: error.message || "File read failed",
    };
    ctx.body = response;
  }
}

async function updateUnit(ctx: Context) {
  try {
    const jsonString = fs.readFileSync(
      path.resolve(__dirname, "../models/unitModel.json")
    );
    const units = JSON.parse(String(jsonString));
    const body: any = ctx.request.body;
    let unitID = body["id"];
    let newUnitName = body["newUnitName"];

    let unitFound = false;
    // check if unit name exists
    for (let i = 0; i < units.length; i++) {
      if (units[i]["id"] === unitID) {
        unitFound = true;
        const date = new Date();
        let time = date.toLocaleTimeString();    
        units[i]["name"] = newUnitName;
        units[i]["updatedDate"] = date.toISOString();
        units[i]["updatedTime"] = time;
        try {
          fs.writeFileSync(
            path.resolve(__dirname, "../models/unitModel.json"),
            JSON.stringify(units)
          );
        } catch (error: any) {
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
  } catch (error: any) {
    let response = {
      message: error.message || "File read failed",
    };
    ctx.status = error.status || 500;
    ctx.body = response;
  }
}

async function deleteUnit(ctx: Context) {
  try {
    const jsonString = fs.readFileSync(
      path.resolve(__dirname, "../models/unitModel.json")
    );
    const units = JSON.parse(String(jsonString));
    const body: any = ctx.request.body;
    let unitID = body["id"];

    let updatedUnits = units.filter((unit: any) => {
      return unit["id"] !== unitID;
    });

    try {
      fs.writeFileSync(
        path.resolve(__dirname, "../models/unitModel.json"),
        JSON.stringify(updatedUnits)
      );
    } catch (error) {
      throw Error("Error Writing data in file");
    }
    ctx.status = 200;
    ctx.body = "Data Updated successfully";
  } catch (error: any) {
    ctx.status = error.status || 500;
    ctx.body = error.message || "File read failed";
  }
}

module.exports = {
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
};

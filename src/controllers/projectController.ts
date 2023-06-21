const project = require('../models/projectModel.json')
import fs from "fs";
import { Context, Request } from "koa";
import path from "path";

module.exports.getAllProject = (ctx : Context) => {
  try {
    let jsonString = fs.readFileSync(path.resolve(__dirname, "../models/projectModel.json"));
    let projects = JSON.parse(String(jsonString));
    ctx.body = projects;
  }
  catch (e : any) {
    ctx.status = 500;
    ctx.body = { "status": 500, "msg": e.message || "error while reading the file" };
  }
}

module.exports.getProject = (ctx : Context) => {
  try {
    let projectId = ctx.params.id;
    let jsonString = fs.readFileSync(path.resolve(__dirname, "../models/projectModel.json"));
    let data = JSON.parse(String(jsonString));
    let projectData = data.projects;
    let value = null;

    projectData.map((pro : any) => {
      if (pro.id == projectId) {
        value = pro;
        ctx.body = value;
      }
    });

    if(!value){
      throw Error("Project id does not exists")
    }
  }
  catch (e : any) {
    ctx.status = 500;
    ctx.body = { "status": 500, "msg": e.message || "error while reading the file" };
  }
}

module.exports.createProject = async (ctx : Context) => {
  try {
    let requestBody : any = ctx.request.body;
    let projectName = requestBody["name"];
    let projectID = requestBody["id"];
    let jsonString = fs.readFileSync(path.resolve(__dirname, "../models/projectModel.json"));
    let data = JSON.parse(String(jsonString));
    let projectData = data.projects;
    let createdAt = getDateString()

    if(!projectID){
      let arrValue = (projectData.length) - 1;
      projectID = (projectData[arrValue].id) + 1;
      requestBody.id = projectID;
    }

    if(!requestBody.client_id || !requestBody.name || !requestBody.desc){
       throw Error("missing data")
    }

    projectData.map((pro : any) => {
      if (pro.name == projectName || pro.id == projectID) {
        throw Error("Project already exists");
      }
    });

    requestBody.created_at = createdAt
    requestBody.updated_at = "" 

    projectData.push(requestBody);

    fs.writeFileSync(path.resolve(__dirname, "../models/projectModel.json"), JSON.stringify(data, null, 2));

    ctx.body = { "status": 200, "msg": "create project is successful" };

  }
  catch (e : any) {
    ctx.status = 500;
    ctx.body = { "status": 500, "msg": e.message || "error while creating the project" };
  }

}


module.exports.updateProject = async (ctx : Context) => {
  try {
    let requestBody : any = ctx.request.body;
    let projectId = ctx.params.id;
    let jsonString = fs.readFileSync(path.resolve(__dirname, "../models/projectModel.json"));
    let data = JSON.parse(String(jsonString));
    let projectData = data.projects;
    let newArr : any = [];
    let updatedAt = getDateString()
    let value = null;

    if(!requestBody.client_id || !requestBody.name || !requestBody.desc){
      throw Error("missing data")
   }
    
    projectData.map((pro : any) => {
      if (pro.id == projectId) {
        value = pro
        pro.client_id = requestBody["client_id"];
        pro.name = requestBody["name"];
        pro.desc = requestBody["desc"];
        pro.created_at = pro.created_at;
        pro.updated_at = updatedAt;
      }
      newArr.push(pro);
    });

    if(!value){
      throw Error("Project id does not exists")
    }

    let newJson = { "projects": newArr };

    fs.writeFileSync(path.resolve(__dirname, "../models/projectModel.json"), JSON.stringify(newJson, null, 2));

    ctx.body = { "status": 200, "msg": "update project is successful" };
  }
  catch (e : any) {
    ctx.status = 500;
    ctx.body = { "status": 500, "msg": e.message || "error while updating the project" };
  }

}


module.exports.deleteProject = async (ctx : Context) => {
  try {
    let projectId = ctx.params.id;
    let jsonString = fs.readFileSync(path.resolve(__dirname, "../models/projectModel.json"));
    let data = JSON.parse(String(jsonString));
    let projectData = data.projects;
    let newArr : any = [];
    let value = null;

    projectData.map((pro : any) => {
      if (pro.id == projectId) {
        value = pro;
        console.log("deleting this value:", pro);
      }
      else {
        newArr.push(pro)
      }
    });

    if(!value){
      throw Error("Project id does not exist")
    }
    
    let newJson = { "projects": newArr };

    fs.writeFileSync(path.resolve(__dirname, "../models/projectModel.json"), JSON.stringify(newJson, null, 2));

    ctx.body = { "status": 200, "msg": "delete project is successful" };
  }
  catch (e : any) {
    ctx.status = 500;
    ctx.body = { "status": 500, "msg": e.message || "error while deleting the project" };
  }

}


function getDateString(){
  let currentDate = new Date();
  let options = {timeZone: 'Asia/Kolkata'}
  let istDate = currentDate.toLocaleString('en-US', options);
  return istDate
}
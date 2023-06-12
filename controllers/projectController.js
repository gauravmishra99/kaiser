const project = require('../models/projectModel.json')
const fs = require('fs')


module.exports.getProject = (ctx) => {
  try {
    let jsonString = fs.readFileSync("./models/projectModel.json");
    let projects = JSON.parse(jsonString);
    ctx.body = projects;
  }
  catch (e) {
    ctx.status = 500;
    ctx.body = { "status": 500, "msg": e.message || "error while reading the file" };
  }
}

module.exports.createProject = async (ctx) => {
  try {
    let requestBody = ctx.request.body;
    let projectName = requestBody["name"];
    let projectID = requestBody["id"];
    let jsonString = fs.readFileSync("./models/projectModel.json");
    let data = JSON.parse(jsonString);
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

    projectData.map((pro) => {
      if (pro.name == projectName) {
        throw Error("Project already exists");
      }
      else if (pro.id == projectID){
        throw Error("Project id already exists");
      }
    });

    requestBody.created_at = createdAt
    requestBody.updated_at = "" 

    projectData.push(requestBody);

    fs.writeFileSync("./models/projectModel.json", JSON.stringify(data, null, 2));

    ctx.body = { "status": 200, "msg": "create project is successful" };

  }
  catch (e) {
    ctx.status = 500;
    ctx.body = { "status": 500, "msg": e.message || "error while creating the project" };
  }

}


module.exports.updateProject = async (ctx) => {
  try {
    let requestBody = ctx.request.body;
    let projectId = ctx.params.id;
    let jsonString = fs.readFileSync("./models/projectModel.json");
    let data = JSON.parse(jsonString);
    let projectData = data.projects;
    let newArr = [];
    let updatedAt = getDateString()
    let value = null;

    if(!requestBody.client_id || !requestBody.name || !requestBody.desc){
      throw Error("missing data")
   }
    
    projectData.map((pro) => {
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

    fs.writeFileSync("./models/projectModel.json", JSON.stringify(newJson, null, 2));

    ctx.body = { "status": 200, "msg": "update project is successful" };
  }
  catch (e) {
    ctx.status = 500;
    ctx.body = { "status": 500, "msg": e.message || "error while updating the project" };
  }

}


module.exports.deleteProject = async (ctx) => {
  try {
    let projectId = ctx.params.id;
    let jsonString = fs.readFileSync("./models/projectModel.json");
    let data = JSON.parse(jsonString);
    let projectData = data.projects;
    let newArr = [];

    projectData.map((pro) => {
      if (pro.id == projectId) {
        console.log("deleting this value:", pro);
      }
      else {
        newArr.push(pro)
      }
    });

    let newJson = { "projects": newArr };

    fs.writeFileSync("./models/projectModel.json", JSON.stringify(newJson, null, 2));

    ctx.body = { "status": 200, "msg": "delete project is successful" };
  }
  catch (e) {
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
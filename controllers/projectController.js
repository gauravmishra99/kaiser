const router = require('koa-router');
const project = require('../models/projectModel.json')
const fs = require('fs')


module.exports.getProject = (ctx) => {
  try {
    fs.readFile("./models/projectModel.json", "utf8", (err, jsonString) => {
      const projects = JSON.parse(jsonString);
      if (err) {
        console.log("File read failed:", err);
        return;
      }
      console.log("File data:", projects);
    });
    ctx.body = { "status": 200, "msg": "get projects is successful" }
  }
  catch (e) {
    ctx.body = { "status": 500, "msg": "error while reading the file" }
  }

}

module.exports.createProject = async (ctx) => {
  try {
    console.log("request:", ctx.request);
    let requestBody = ctx.request.body;
    console.log("requestBody", requestBody)

    jsonReader("./models/projectModel.json", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      data.projects.push(requestBody)
      fs.writeFile("./models/projectModel.json", JSON.stringify(data, null, 2), err => {
        if (err) console.log("Error writing file:", err);
      });

      console.log("data:",data.projects);
    });
    ctx.body = { "status": 200, "msg": "create project is successful" };

  }
  catch (e) {
    ctx.body = { "status": 500, "msg": "error while creating the project" }
  }

}


module.exports.updateProject = async (ctx) => {
  try {
    console.log("request:", ctx.request);
    let requestBody = ctx.request.body;
    let projectId = ctx.params.id;
    console.log("requestBody:", requestBody, "id:", projectId)

    jsonReader("./models/projectModel.json", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      //data.projects[0].id -= 1;
      //data.projects.push(requestBody)
      let value = null;
      let newArr = []
      data.projects.map((pro) => {
        if (pro.id == projectId) {
          pro = requestBody;
          console.log("proo", pro);
          value = pro;
          //return pro
        }
        newArr.push(pro)
      })
      console.log("xxx", newArr)
      let newJson = { "projects": newArr }

      console.log("newJson", newJson)

      fs.writeFile("./models/projectModel.json", JSON.stringify(newJson, null, 2), err => {
        if (err) console.log("Error writing file:", err);
      });

      console.log(data.projects);
    });
    ctx.body = { "status": 200, "msg": "update project is successful" };
  }
  catch (e) {
    ctx.body = { "status": 500, "msg": "error while updating the project" }
  }

}


module.exports.deleteProject = async (ctx) => {
  try {
    console.log("request:", ctx.request);
    let projectId = ctx.params.id;
    console.log("id:", projectId)

    jsonReader("./models/projectModel.json", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      //data.projects[0].id -= 1;
      //data.projects.push(requestBody)
      let value = null;
      let newArr = []
      data.projects.map((pro) => {
        if (pro.id == projectId) {
          console.log("deleting this value:", pro);
          value = pro;
          //return pro
        }
        else {
          newArr.push(pro)
        }

      })

      let newJson = { "projects": newArr }

      fs.writeFile("./models/projectModel.json", JSON.stringify(newJson, null, 2), err => {
        if (err) console.log("Error writing file:", err);
      });

      console.log(data.projects);
    });
    ctx.body = { "status": 200, "msg": "delete project is successful" };
  }
  catch (e) {
    ctx.body = { "status": 500, "msg": "error while deleting the project" }
  }

}



function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}





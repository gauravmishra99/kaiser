const crypto = require('crypto')
const fs = require('fs')
const employee = require('../models/employeeModel.json');
const path = require('path');

const getAllEmployee = async (ctx) => {
    try {
        const jsonString = fs.readFileSync(path.resolve(__dirname, "../models/employeeModel.json"));
        const employees = JSON.parse(String(jsonString));
        ctx.body = employees;
    } catch (error) {
        ctx.status = 500;
        ctx.body = { "status": 500, "msg": error.message || "error while reading the file" };
    }
}

const createNewEmployee = async (ctx) => {
    try {
        const jsonString = fs.readFileSync(path.resolve(__dirname, "../models/employeeModel.json"));
        const employees = JSON.parse(String(jsonString));
        const body = ctx.request.body;
        let employeeName = body["name"];

        // check if unit name exists
        let checkUserName = employees.filter(employee => employee.name === employeeName);
        if (checkUserName.length > 0) {
            throw Error("employee name already exits");
        }


        // add employee name
        let employee = {
            name: employeeName,
            id: crypto.randomUUID(),
            projectId: body["projectId"],
            createdDate: "06-06-2023",
            createdTime: "10:11 am",
            updatedDate: "",
            updatedTime: "",
        };

        employees.push(employee);
        try {
            fs.writeFileSync(path.resolve(__dirname, "../models/employeeModel.json"), JSON.stringify(employees));
        } catch (error) {
            ctx.status = 500;
            ctx.body = { "status": 500, "msg": error.message || "Error Writing data in file" };
        }
        ctx.status = 200;
        ctx.body = { "status": 200, "msg": "employee created successfully" };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { "status": 500, "msg": error.message || "error while creating the employee" };
    }

}

const updateEmployee = async (ctx) => {
    try {
        const jsonString = fs.readFileSync(path.resolve(__dirname, "../models/employeeModel.json"));
        const employees = JSON.parse(String(jsonString));
        const body = ctx.request.body;
        let empID = body["id"];
        let newEmployeeName = body["newEmployeeName"];

        employees.forEach((element, index) => {
            if (element.id === empID) {
                employees[index]["name"] = newEmployeeName;
                try {
                    fs.writeFileSync(path.resolve(__dirname, "../models/employeeModel.json"), JSON.stringify(employees));
                } catch (error) {
                    ctx.status = 500;
                    ctx.body = { "status": 500, "msg": error.message || "Error Writing data in file" };
                }
            }
        });
        ctx.status = 200;
        ctx.body = { "status": 200, "msg": "employee Updated successfully" };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { "status": 500, "msg": error.message || "error while Updating the employee" };
    }

}
const deleteEmployee = async (ctx) => {
    try {
        const jsonString = fs.readFileSync(path.resolve(__dirname, "../models/employeeModel.json"));
        const employees = JSON.parse(String(jsonString));
        const body = ctx.request.body;
        let employeesID = body["id"];

        let updatedemployees = employees.filter((employee) => {
            return employee["id"] !== employeesID;
        });

        try {
            fs.writeFileSync(path.resolve(__dirname, "../models/employeeModel.json"), JSON.stringify(updatedemployees));
        } catch (error) {
            throw Error("Error Writing data in file");
        }
        ctx.status = 200;
        ctx.body = { "status": 200, "msg": "employee deleted successfully" };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { "status": 500, "msg": error.message || "Error Writing data in file" };
    }
}

module.exports = { getAllEmployee, createNewEmployee, updateEmployee, deleteEmployee };

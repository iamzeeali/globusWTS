const Employee = require("../models/employeeModel");
const factory = require("./handlerFactory");

exports.createEmployee = factory.createOne(Employee);
exports.getAllEmployees = factory.getAll(Employee);
exports.getEmployee = factory.getOne(Employee);
exports.updateEmployee = factory.updateOne(Employee);
exports.deleteEmployee = factory.deleteOne(Employee);

const UserType = require("../models/userTypeModel");
const factory = require("./handlerFactory");

exports.createUserType = factory.createOne(UserType);
exports.getAllUserTypes = factory.getAll(UserType);
exports.getUserType = factory.getOne(UserType);
exports.updateUserType = factory.updateOne(UserType);
exports.deleteUserType = factory.deleteOne(UserType);

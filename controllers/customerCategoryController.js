const CustomerCategory = require("../models/customerCategoryModel");
const factory = require("./handlerFactory");

exports.createCustomerCategory = factory.createOne(CustomerCategory);
exports.getAllCustomerCategories = factory.getAll(CustomerCategory);
exports.getCustomerCategory = factory.getOne(CustomerCategory);
exports.updateCustomerCategory = factory.updateOne(CustomerCategory);
exports.deleteCustomerCategory = factory.deleteOne(CustomerCategory);

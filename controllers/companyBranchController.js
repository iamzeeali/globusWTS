const CompanyBranch = require("../models/companyBranchModel");
const factory = require("./handlerFactory");

exports.setStateCityLocationId = (req, res, next) => {
  //Nested routes
  if (!req.body.state) req.body.state = req.params.stateId;
  if (!req.body.city) req.body.city = req.params.cityId;
  if (!req.body.location) req.body.location = req.params.locationId;
  next();
};

exports.createCompanyBranch = factory.createOne(CompanyBranch);
exports.getAllCompanyBranches = factory.getAll(CompanyBranch);
exports.getCompanyBranch = factory.getOne(CompanyBranch);
exports.updateCompanyBranch = factory.updateOne(CompanyBranch);
exports.deleteCompanyBranch = factory.deleteOne(CompanyBranch);

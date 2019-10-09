const City = require("../models/cityModel");
const factory = require("./handlerFactory");

exports.setStateId = (req, res, next) => {
  //Nested routes
  if (!req.body.state) req.body.state = req.params.stateId;
  next();
};

exports.createCity = factory.createOne(City);
exports.getAllCities = factory.getAll(City);
exports.getCity = factory.getOne(City);
exports.updateCity = factory.updateOne(City);
exports.deleteCity = factory.deleteOne(City);

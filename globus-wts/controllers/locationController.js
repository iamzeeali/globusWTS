const Location = require("../models/locationModel");
const factory = require("./handlerFactory");

exports.setStateCityId = (req, res, next) => {
  //Nested routes
  if (!req.body.state) req.body.state = req.params.stateId;
  if (!req.body.city) req.body.city = req.params.cityId;
  next();
};

exports.createLocation = factory.createOne(Location);
exports.getAllLocation = factory.getAll(Location);
exports.getLocation = factory.getOne(Location);
exports.updateLocation = factory.updateOne(Location);
exports.deleteLocation = factory.deleteOne(Location);

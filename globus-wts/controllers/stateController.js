const State = require("../models/stateModel");
const factory = require("./handlerFactory");

exports.createState = factory.createOne(State);
exports.getAllStates = factory.getAll(State);
exports.getState = factory.getOne(State);
exports.updateState = factory.updateOne(State);
exports.deleteState = factory.deleteOne(State);

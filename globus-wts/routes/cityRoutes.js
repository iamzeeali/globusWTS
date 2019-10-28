const express = require("express");
const cityController = require("./../controllers/cityController");
const authController = require("./../controllers/authController");
const stateRouter = require("./stateRoutes");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));
 
router
  .route("/:stateId/state")
  .post(cityController.setStateId, cityController.createCity);

router
  .route("/")
  .get(cityController.getAllCities)
  .post(cityController.createCity);

router
  .route("/:id")
  .get(cityController.getCity)
  .patch(cityController.updateCity)
  .delete(cityController.deleteCity);

module.exports = router;

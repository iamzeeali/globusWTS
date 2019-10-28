const express = require("express");
const locationController = require("./../controllers/locationController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));

router
  .route("/:stateId/state/:cityId/city")
  .post(locationController.setStateCityId, locationController.createLocation);

router
  .route("/")
  .get(locationController.getAllLocation)
  .post(locationController.createLocation);

router
  .route("/:id")
  .get(locationController.getLocation)
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);

module.exports = router;

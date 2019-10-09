const express = require("express");
const userTypeController = require("./../controllers/userTypeController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(userTypeController.getAllUserTypes)
  .post(userTypeController.createUserType);

router
  .route("/:id")
  .get(userTypeController.getUserType)
  .patch(userTypeController.updateUserType)
  .delete(userTypeController.deleteUserType);

module.exports = router;

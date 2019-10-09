const express = require("express");
const employeeController = require("./../controllers/employeeController");
const authController = require("./../controllers/authController");

const router = express.Router();

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(employeeController.getAllEmployees)
  .post(employeeController.createEmployee);

router
  .route("/:id")
  .get(employeeController.getEmployee)
  .patch(employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;

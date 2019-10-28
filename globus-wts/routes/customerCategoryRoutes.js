const express = require("express");
const customerCategoryController = require("./../controllers/customerCategoryController");
const authController = require("./../controllers/authController");

const router = express.Router();

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));

router
  .route("/")
  .get(customerCategoryController.getAllCustomerCategories)
  .post(customerCategoryController.createCustomerCategory);

router
  .route("/:id")
  .get(customerCategoryController.getCustomerCategory)
  .patch(customerCategoryController.updateCustomerCategory)
  .delete(customerCategoryController.deleteCustomerCategory);

module.exports = router;

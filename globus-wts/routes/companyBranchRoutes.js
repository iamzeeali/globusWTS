const express = require("express");
const companyBranchController = require("../controllers/companyBranchController");
const authController = require("../controllers/authController");

const router = express.Router();

//Protect all routes after this middleware- Authentication
router.use(authController.protect);

//Restrict all router after this middleware to admin only- Authorization
router.use(authController.restrictTo("admin"));

router
  .route("/:stateId/state/:cityId/city/:locationId/location")
  .get(
    companyBranchController.setStateCityLocationId,
    companyBranchController.getAllCompanyBranches
  )
  .post(
    companyBranchController.setStateCityLocationId,
    companyBranchController.createCompanyBranch
  );

router
  .route("/")
  .get(companyBranchController.getAllCompanyBranches)
  .post(companyBranchController.createCompanyBranch);

router
  .route("/:id")
  .get(companyBranchController.getCompanyBranch)
  .patch(companyBranchController.updateCompanyBranch)
  .delete(companyBranchController.deleteCompanyBranch);

module.exports = router;

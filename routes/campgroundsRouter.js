const express = require("express");
const router = express.Router();
const campgroundControlers = require("../controllers/campgroundsControllers");
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware/middleware");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router.route("/").get(catchAsync(campgroundControlers.index)).post(
  isLoggedIn,

  upload.array("image"),
  validateCampground,
  catchAsync(campgroundControlers.createCampground)
);

router.get("/new", isLoggedIn, campgroundControlers.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgroundControlers.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundControlers.updateCampground)
  )
  .delete(
    isLoggedIn,
    isAuthor,
    catchAsync(campgroundControlers.deleteCampground)
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundControlers.renderEditForm)
);

module.exports = router;

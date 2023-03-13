const express = require("express");
//to access parameter (id) in app.js route
const router = express.Router({ mergeParams: true });
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware/middleware");
const reviewsControlers = require("../controllers/reviewsControllers");
const catchAsync = require("../utils/catchAsync");
// adding reviews
router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(reviewsControlers.createReview)
);

//deleting reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviewsControlers.deleteReview)
);

module.exports = router;

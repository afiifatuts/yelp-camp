//JOI Schema to require thing
const { campgroundSchema, reviewSchema } = require("../schemas");
const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be Signed In first!");
    return res.redirect("/login");
  }
  next();
};

//this is validate new post to and check if theres error
module.exports.validateCampground = (req, res, next) => {
  //result of joi validation
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    //massage in joi validation
    const msg = error.details.map((ell) => ell.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

//this is validate review
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((ell) => ell.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

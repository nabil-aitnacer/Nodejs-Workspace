const review = require("../models/db/review.model");
const AppError = require("../Utils/AppError");
const catchAndSync = require("../Utils/utils");
const User = require("../models/db/user.model");
const mongoose = require("mongoose");
module.exports.getAllReviews = catchAndSync(async (req, res, next) => {
  const reviews = await review.find({});
  res.status(200).json({
    message: "success",
    result: reviews.length,
    data: {
      reviews: reviews,
    },
  });
});
module.exports.addReview = catchAndSync(async (req, res, next) => {
  //before creating a new review, we check if there is an existing review with the same tour and user values.
  //If such a review exists, we return a 400 Bad Request response indicating that the user has already written a review for that tour.
  //If there is no existing review, the new review is created as usual.

  // Check if the user has already written a review for the tour
  const { tour, user } = req.body;
  const existingReview = await review.findOne({ tour, user });
  if (existingReview) {
    return res.status(400).json({
      message: "User has already written a review for this tour",
    });
  }

  const newReview = await review.create(req.body);
  res.status(200).json({
    message: "success",
    data: {
      reviews: newReview,
    },
  });
});

module.exports.deleteReview = catchAndSync(async (req, res, next) => {
  const id = req.params.id;
  const deletedReview = await review.findById(id);

  if (!deletedReview) {
    return next(new AppError(`No review found for this id: ${id}`, 404));
  }
  console.log(req.user._id  == deletedReview.user )

  const userId = mongoose.Types.ObjectId(req.body.user); // Convert user ID to ObjectId
  // Retrieve the user data including the role
  const user = await User.findById(req.user).select("+role");

  // Check if the user is an admin
  const isAdmin = user.role === "admin";
  // Check if the user ID matches the user of the deleted review or if the user is an admin
  if (!userId.equals(deletedReview.user) && !isAdmin) {
    return next(
      new AppError(`User does not have permission to delete the review`, 403)
    );
  }

  await deletedReview.remove();

  res.status(204).json({
    message: "success",
    review_deleted: deletedReview,
  });
});

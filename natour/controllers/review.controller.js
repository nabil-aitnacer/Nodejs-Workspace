const Review = require("../models/db/review.model");
const AppError = require("../Utils/AppError");
const catchAndSync = require("../Utils/utils");
const User = require("../models/db/user.model");
const mongoose = require("mongoose");
module.exports.getAllReviews = catchAndSync(async (req, res, next) => {
//TODO when start with front end edit this 
  const userId = req.user._id;
  const user =await  User.findById(userId).select('+role');
  let reviews = {}
    if(user.role == 'admin'){
      reviews =await Review.find({})
    } else {
      reviews = await Review.find({user:userId});
    }
   
  res.status(200).json({
    message: "success",
    result: reviews.length,
    data: {
      reviews: reviews,
    },
  });
});

module.exports.getReviewsByTour = catchAndSync( async (req,res,next)=>{
  const tourId = req.params.id
  if (!tourId){
    return  next(new AppError(`Please select a tour`, 404));
  }  
  const _review = await Review.find({tour:tourId})

   res.status(200).json({
    message: "success",
    result: _review.length,
    data: {
      reviews: _review,
    },
  });

}) 

module.exports.getReviewsByUser = catchAndSync( async (req,res,next)=>{
  const userId = req.params.id
  if (!userId){
    return  next(new AppError(`Please select a user`, 404));
  }  
  const _review = await Review.find({user:userId})

   res.status(200).json({
    message: "success",
    result: _review.length,
    data: {
      reviews: _review,
    },
  });

}) 



module.exports.addReview = catchAndSync(async (req, res, next) => {
  //before creating a new review, we check if there is an existing review with the same tour and user values.
  //If such a review exists, we return a 400 Bad Request response indicating that the user has already written a review for that tour.
  //If there is no existing review, the new review is created as usual.

  // Check if the user has already written a review for the tour

  const tour = (!req.body.tour) ? req.params.tourId : req.body.tour;
  const addReview = req.body.review
 
  const userId = req.user._id;
  const existingReview = await Review.findOne({ tour, user: userId });;
  if (existingReview) {
    return res.status(400).json({
      message: "User has already written a review for this tour",
    });
  }


  const newReview = await Review.create({ tour, review: addReview, user: userId });
  res.status(200).json({
    message: "success",                                     
    data: {
      reviews: newReview,
    },
  });
});
module.exports.updateReview = catchAndSync( async (req,res,next)=>{
  const reviewId = req.params.id;
  if (!reviewId) {
    return next(new AppError("Please select a review to update", 404));
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new AppError(`No review found for this id: ${reviewId}`, 404));
  }

  if (!req.user._id.equals(review.user)) {
    return next(new AppError("You do not have permission to update the review", 403));
  }

  const updatedReview = req.body.review;

  
    const _updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { review: updatedReview },
      { new: true, runValidators: true }
    ).lean();

    res.status(200).json({
      message: "Success",
      data: {
        review: _updatedReview,
      },
    });


})
module.exports.deleteReview = catchAndSync(async (req, res, next) => {
  const id = req.params.id;
  const deletedReview = await Review.findById(id);

  if (!deletedReview) {
    return next(new AppError(`No review found for this id: ${id}`, 404));
  }


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

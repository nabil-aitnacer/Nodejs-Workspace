const express = require('express');

//when a url redite to review with parameMerge we can acces to all pramater
const router = express.Router({
    mergeParams:true
});
const reviewController = require('../controllers/review.controller')
const authController =require("../controllers/auth.controller");
const review = require('../models/db/review.model');

//this route for user to gell the review they write
router.get('/',authController.protect,reviewController.getAllReviews);


router.get('/',authController.protect,reviewController.getReviewsByTour);

//this route for admin to get all review write by an user

router.get('/user/:id?',authController.protect,authController.restricTo('admin'),reviewController.getReviewsByUser);

router.post('/',authController.protect,authController.restricTo('user'),reviewController.addReview);

//update review
router.patch('/:id?',authController.protect,reviewController.updateReview);
router.delete('/:id',authController.protect, reviewController.deleteReview);

module.exports = router;
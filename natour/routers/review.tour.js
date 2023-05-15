const express = require('express');

const router = express.Router();
const reviewController = require('../controllers/review.controller')
const authController =require("../controllers/auth.controller");
const review = require('../models/db/review.model');

router.get('/',authController.protect,reviewController.getAllReviews);

router.post('/',reviewController.addReview);
router.delete('/:id',authController.protect, reviewController.deleteReview);

module.exports = router;
const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tour.controller');
const authController =require("../controllers/auth.controller")
const reviewRouter = require("../routers/review.router")

router.get('/setTours',tourController.setTours)
router.get('/top-5-cheap',tourController.aliasCheapMiddle,tourController.getAllTour);
router.get('/toursStats',tourController.getToursStats)
router.get('/toursByMonths/:year',tourController.getToursByMonths)
router.get('/:id', tourController.getTourById);
router.get('/:id/reviews/:id',authController.protect,tourController.getTourAndReview)
router.get('/', tourController.checkIdGoNext,tourController.getAllTour);
//nested router
router.use('/:tourId/review',reviewRouter)


router.use(authController.protect,authController.restricTo('admin','lead-guide'))
router.post('/',  tourController.addTour);
router.patch('/:id',tourController.updateTour);
router.delete('/:id', tourController.deleteTour);

module.exports = router;
 
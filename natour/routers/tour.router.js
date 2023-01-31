const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tour.controller');
const authController =require("../controllers/auth.controller")

router.get('/setTours',tourController.setTours)
router.get('/top-5-cheap',tourController.aliasCheapMiddle,tourController.getAllTour);
router.get('/toursStats',tourController.getToursStats)
router.get('/toursByMonths/:year',tourController.getToursByMonths)
router.get('/:id', tourController.getTourById);
router.get('/', tourController.checkIdGoNext,authController.protect,tourController.getAllTour);


router.post('/',authController.protect,authController.restricTo('admin','lead-guide'),  tourController.addTour);
router.patch('/:id',authController.protect,authController.restricTo('admin','lead-guide'),tourController.updateTour);
router.delete('/:id',authController.protect,authController.restricTo('admin','lead-guide'), tourController.deleteTour);

module.exports = router;

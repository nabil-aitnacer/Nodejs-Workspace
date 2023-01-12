const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tour.controller');


router.get('/setTours',tourController.setTours)
router.get('/top-5-cheap',tourController.aliasCheapMiddle,tourController.getAllTour);
router.get('/toursStats',tourController.getToursStats)
router.get('/toursByMonths/:year',tourController.getToursByMonths)
router.get('/:id', tourController.getTourById);
router.get('/', tourController.checkIdGoNext,tourController.getAllTour);


router.post('/',  tourController.addTour);
router.patch('/:id',tourController.updateTour);
router.delete('/:id', tourController.deleteTour);

module.exports = router;

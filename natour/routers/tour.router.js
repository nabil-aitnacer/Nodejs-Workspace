const express = require('express');

const router = express.Router();
const tourController = require('../controllers/tour.controller');

//router.param('id', tourController.checkId);

router.get('/', tourController.getAllTour);
router.get('/:id', tourController.getTourById);
router.post('/',  tourController.addTour);
router.patch('/:id',tourController.updateTour);
router.delete('/:id', tourController.deleteTour);

module.exports = router;

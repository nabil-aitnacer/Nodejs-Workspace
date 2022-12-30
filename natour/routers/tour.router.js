const express = require('express')
const router = express.Router()
const tourController = require('../controllers/tour.controller')

router.get('/tours',tourController.getAllTour )
router.get('/tours/:id',tourController.getTourById)
router.post('/tours',  tourController.addTour)
router.patch('/tours/:id',tourController.updateTour)
router.delete('/tours/:id',tourController.deleteTour )

module.exports = router
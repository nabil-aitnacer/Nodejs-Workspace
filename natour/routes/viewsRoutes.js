const express = require('express');
const viewsController = require('../controllers/viewController');

const router = express.Router();
// 3) ROUTES
router.get('/', viewsController.getOverview);

router.get('/tour', viewsController.getTour);
module.exports = router;

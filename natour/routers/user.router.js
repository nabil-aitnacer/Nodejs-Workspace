const express = require('express');
const auth =require('../controllers/auth.controller')
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

router.post('/signup',auth.signup)
module.exports = router;

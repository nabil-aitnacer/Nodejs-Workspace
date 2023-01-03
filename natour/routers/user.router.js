const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/:id', userController.addUser);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;

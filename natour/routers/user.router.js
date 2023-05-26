const express = require('express');
const auth =require('../controllers/auth.controller')
const router = express.Router();
const userController = require('../controllers/user.controller');





router.post('/signup',auth.signup)
router.post('/login',auth.logIn)
router.post('/forgotPassword',auth.forgotPassword)
router.patch('/resetPassword/:token',auth.resetpassword)

router.use(auth.protect);
router.get('/me',userController.getMe,userController.getUserById)
router.patch('/updatePassword',auth.updatePasword)
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(auth.restricTo('admin','lead-guide','guide'))
router.get('/', userController.getAllUsers);
router.get('/:id?', userController.getUserById);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);


module.exports = router;

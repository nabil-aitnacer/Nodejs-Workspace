const express = require('express');
const auth =require('../controllers/auth.controller')
const router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/',auth.protect,auth.restricTo('admin','lead-guide','guide'), userController.getAllUsers);
router.get('/:id',auth.protect,auth.restricTo('admin','lead-guide','guide'), userController.getUserById);



router.post('/signup',auth.signup)
router.post('/login',auth.logIn)
router.post('/forgotPassword',auth.forgotPassword)
router.patch('/resetPassword/:token',auth.resetpassword)
router.patch('/updatePassword',auth.protect,auth.updatePasword)

router.patch('/updateMe', auth.protect,userController.updateMe);
router.patch('/:id', auth.protect,auth.restricTo('admin','lead-guide'),userController.updateUserById);
router.delete('/deleteMe', auth.protect,userController.deleteMe);
router.delete('/:id',auth.protect,auth.restricTo('admin','lead-guide'), userController.deleteUserById);
module.exports = router;

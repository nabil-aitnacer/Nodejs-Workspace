const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.module')
const loginUserController = require('../controllers/login')
userRouter.post('/register',async (req,res)=>{
    
    await User.create( req.body,(error,user)=>{
        if(error){
            return res.redirect('/users/register')
        }
    })

    res.redirect('/')
})
userRouter.get('/login',(req,res)=>{
    res.render('login')
})
userRouter.post('/login',loginUserController)


module.exports = userRouter 
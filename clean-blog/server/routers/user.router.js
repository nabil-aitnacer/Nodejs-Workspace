const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.module')
const loginUserController = require('../controllers/login')
userRouter.post('/register',async (req,res)=>{
    
    await User.create( req.body,(error,user)=>{
        if(error){
            console.log('creation error')
           const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
           req.session.validationErrors =validationErrors
            res.redirect('/auth/register');
           
        }else{
            res.redirect('/')
            
        }
      
    })

    
})
userRouter.get('/login',(req,res)=>{
    res.render('login')
})
userRouter.post('/login',loginUserController)



module.exports = userRouter 
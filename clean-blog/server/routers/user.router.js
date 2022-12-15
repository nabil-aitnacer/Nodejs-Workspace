const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.module')
userRouter.post('/register',async (req,res)=>{
    
    await User.create( req.body,(error,user)=>{
        if(error){
            return res.redirect('/users/register')
        }
    })

    res.redirect('/')
})


module.exports = userRouter
const bcrypt = require('bcrypt')
const User = require('../models/user.module')

module.exports = (req,res)=>{
    const{username,password}= req.body
    User.findOne({username:username},(error,user)=>{
        if(user){
            bcrypt.compare(password,user.password,(error,same)=>{
                if(same){
                    req.session.userId=user._id
                   
                    res.redirect('/')
                }else {
                    res.redirect('/users/login')
                }
            })
        }else {
            res.redirect('/users/login')
        }
    })
}

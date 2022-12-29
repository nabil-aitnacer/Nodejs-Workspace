const express = require('express');

const router = express.Router();
const { passport } = require('./auth.controller')

router.use(passport.initialize())
router.use(passport.session())
router.get('/',(req,res)=>{

    const isLoggin = false
    if(isLoggin){
        res.render('home')
    }else {
        res.redirect('/auth')
    }
    console.log('/auth user ',req.session.passport.user)
    
})
module.exports = router
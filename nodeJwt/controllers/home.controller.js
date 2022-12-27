const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    const isLogin = false;
    if(!isLogin){
        res.redirect('auth')
    }else {
        res.render('home')
    }
})

module.exports=router
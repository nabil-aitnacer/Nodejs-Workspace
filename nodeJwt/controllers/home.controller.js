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
router.get('/home',(req,res)=>{
res.render('home')
})
module.exports=router
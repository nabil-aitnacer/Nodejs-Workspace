const express = require('express')
const router = express.Router();
require('dotenv').config();
const passport = require('passport')
const {Strategy} = require('passport-google-oauth20')
const config ={
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}


passport.use(new Strategy({
    
}))
router.use(passport.initialize())
router.get('/',(req,res)=>{
    res.render('login')
})
router.get('/google',(req,res)=>{

})
router.get('/google/callback',(req,res)=>{

})
router.get('/logout',(req,res)=>{

})
module.exports= router
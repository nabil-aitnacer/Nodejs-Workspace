const express = require('express')
const router = express.Router();
require('dotenv').config();
const passport = require('passport')
const {Strategy} = require('passport-google-oauth20')
const cookieSession = require('cookie-session');
const { route } = require('./home.controller');

let userId ;
const config ={
    CLIENT_ID : process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1:process.env.COOKIE_KEY_1,
    COOKIE_KEY_2:process.env.COOKIE_KEY_2
}

function verifyCallback(accessToken,refreshToken,profile,done) {
    console.log(profile)
    done(null,profile);
}

const AUTH_OPTIONS ={
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
  }
  passport.use(new Strategy(AUTH_OPTIONS,verifyCallback))
passport.serializeUser((user,done)=>{
    console.log('USer :' ,user.id)
    userId =user.id;
done(null,user.id)
})
passport.deserializeUser((id,done)=>{
   
done(null,id)
})
router.use(cookieSession({
    name:'session',
    maxAge:24*60*60*1000,
    keys:[config.CLIENT_ID,config.COOKIE_KEY_2]
}))

router.use(passport.initialize())
passport.use(passport.session())

router.get('/auth',(req,res)=>{

     console.log(req.user)
   if(req.isAuthenticated && req.user){
    res.redirect('/')
   }
    res.render('login')
})
router.get('/auth/google',
passport.authenticate('google',{
    scope:['email']
}))
router.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:'/auth/failure',
    successRedirect:'/',
    session:true
}),(req,res)=>{
    console.log('google call us back')})



router.get('/auth/failure',(req,res)=>{
res.send('failure')
})
router.get('/',(req,res)=>{
    if(req.isAuthenticated()){
  res.render('home')
    } else {
        res.redirect('/auth')
    }
  
})

module.exports= {router,userId,passport}
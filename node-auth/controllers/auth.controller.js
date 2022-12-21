const User = require("../models/User");
const jwt = require('jsonwebtoken')

const maxAge = 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'Secret Auth Net Ninja',{
        expiresIn:maxAge
    })
}
//handler Errors
const handleError = (err)=>{
    let errors = {email:'',password:''}
 
    if(err.code === 11000){
        errors['email'] = 'that email already registered';
        return errors;
    }
    if(err && err.errors){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
           })
    }
 
   return errors
}
module.exports.signup_get =(req,res)=>{
    res.render('signup')
}

module.exports.signup_post = async(req,res)=>{
    const {email,password} = req.body
   
    try {
   
        const user = await User.create({ email, password });
       const token = createToken(user._id);
  
      
       res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
       res.status(201).json({ user: user._id });
        console.log(user)
    } catch (error) {
        
        const errors = handleError(error)
        console.log(error)
        res.status(400).json(errors)
    }
}

module.exports.login_get =(req,res)=>{
    res.render('login')
}

module.exports.login_post =(req,res)=>{
    res.send('signup')
}
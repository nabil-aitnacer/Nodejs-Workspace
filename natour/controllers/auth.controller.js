const User = require('../models/db/user.model');
const catchAndSync = require('../Utils/utils')
const jwt = require('jsonwebtoken');
const {promisify}= require('util')

const AppError = require('../Utils/AppError');
const signToken= id =>{
return  jwt.sign({id:id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_IN
});
}
module.exports.signup=catchAndSync( async (req,res,next)=>{
    const newUser = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });
    const token = await signToken(newUser._id)

   res.status(201).json({
    status:'Success',
    token:token,
    data:{
        user:newUser
    }
   })
})

module.exports.logIn=async (req,res,next)=>{
    const {email,password}= req.body;

    //check if email and password is exist 
    if(!email || !password) {
        return next(new AppError("Please provide email and password",400))
    }
  const user = await User.findOne({email}).select("+password").lean().exec();
const userModel = User.hydrate(user);
const correct =await userModel.correctPassword(password,userModel.password);
    if(!user){
        return next(new AppError("No user found for this email",404))
    }
   
    if(!correct){
        return next(new AppError("Password Not Correct",404))
    }
    
    const token = await signToken(user._id);
    res.status(200).json({
        status:"succes",
        token
    })
}
module.exports.protect= catchAndSync(async(req,res,next)=>{
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(sendError("Please Login to access to this",401))
    }
    //promisify method allows you to convert a callback-based function to a promise-based function
    const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    console.log(decode)
    next();
})
//TODO: start video 131
function sendError(message,code){
    return new AppError(message,code)
}
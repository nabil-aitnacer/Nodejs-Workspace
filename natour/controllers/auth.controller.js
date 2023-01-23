const User = require('../models/db/user.model');
const catchAndSync = require('../Utils/utils')
module.exports.signup=catchAndSync( async (req,res,next)=>{
    const newUser = await User.create(req.body);

   res.status(201).json({
    status:'Success',
    data:{
        user:newUser
    }
   })
})
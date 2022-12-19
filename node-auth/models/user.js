const mongoose= require('mongoose')
const validator = require('mongoose-validator');
const bcrypt = require('bcrypt')
const emailValidator =[
    validator({
        validator:'isEmail',
        message:'Please enter a valid email address'
    })
]
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please enter an email"],
        unique:true,
        lowercase:true,
        validate:emailValidator
 
    },
    password:{
        type:String,
        required:[true,"Please enter an password"],
        minlength:[6,"Minimum passowrd length is 6 character"]
    }
})

userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})
const User = mongoose.model('user',userSchema)
module.exports= User;
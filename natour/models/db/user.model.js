const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require('crypto')
const UserSchma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user should have a name"],
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "A user should have a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valide email"]
  },
  photo:String,
  role:{
type:String,
enum:['user','admin','guide','lead-guide'],
default:'user'


  },
  password: {
    type: String,
    required: [true, "A user should have a password"],
    minlength: 8,
    select:false
  },
  passwordConfirm: {
    type: String,
    required: [true, "A user should confirm a password"],
    validate: {
      //only works on SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not the same",
    },
  },
  passwordChangeAt:Date,
  passwordResetToken:String,
  passwordResetExpires:Date
});
//TODO:"Should change validation in the saving and use   mongoose-unique-validator"
UserSchma.pre("save", async function (next) {
  //if password not change don't hash
  if (!this.isModified("password")) return next();

  //hash password
  this.password = await bcrypt.hash(this.password, 12);
  //delete confirm password dont save it in db
  this.passwordConfirm = undefined;
});
UserSchma.pre('save',async function(next){
  if(!this.isModified('password' || this.isNew)) return next()
  //-1000 just to adjust time sometime chageate save before timestaptoken save
  this.passwordChangeAt = Date.now() - 1000
  next();
})
UserSchma.methods.correctPassword = async function(condidatePassword,userPassword){
  return await bcrypt.compare(condidatePassword,userPassword);
}
UserSchma.methods.changedPasswordAfter= function (JWTTimestamp) {
  if(this.passwordChangeAt){
    const changedTimestamp = parseInt(this.passwordChangeAt/1000,10)
    return JWTTimestamp < changedTimestamp
  } else {
    return false;
  }
}
UserSchma.methods.createPasswordResetToken=function () {
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.passwordResetToken= crypto.createHash('sha256').update(resetToken).digest('hex')
  console.log({resetToken},this.passwordResetToken)
  this.passwordResetExpires=Date.now() + 10*60*1000 //== 10 min
  return resetToken;
}
const userModel = mongoose.model("user", UserSchma);
module.exports = userModel;

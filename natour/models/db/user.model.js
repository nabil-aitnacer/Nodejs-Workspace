const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
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

UserSchma.methods.correctPassword = async function(condidatePassword,userPassword){
  return await bcrypt.compare(condidatePassword,userPassword);
}
const userModel = mongoose.model("user", UserSchma);
module.exports = userModel;

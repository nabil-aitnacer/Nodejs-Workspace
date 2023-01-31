const User = require("../models/db/user.model");
const catchAndSync = require("../Utils/utils");
const sendEmail = require("../Utils/email");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const AppError = require("../Utils/AppError");
const { use } = require("../routers/tour.router");
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
module.exports.signup = catchAndSync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  const token = await signToken(newUser._id);

  res.status(201).json({
    status: "Success",
    token: token,
    data: {
      user: newUser,
    },
  });
});

module.exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return sendError("No user found for this email pleas sign up", 404, next);
  }
  const correct = await user.correctPassword(password, user.password);
  if (!user) {
    return next(new AppError("No user found for this email", 404));
  }

  if (!correct) {
    return next(new AppError("Password Not Correct", 404));
  }

  const token = await signToken(user._id);
  res.status(200).json({
    status: "succes",
    token,
  });
};
module.exports.protect = catchAndSync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //promisify method allows you to convert a callback-based function to a promise-based function
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decode.id);
  const user = await User.findOne({ _id: decode.id });
  console.log(user);
  if (!user) {
    return sendError(
      "The user belonging to this token does no longer exits",
      401,
      next
    );
  }
  if (user.changedPasswordAfter(decode.iat)) {
    return sendError(
      "User recently changed password Please log in again",
      401,
      next
    );
  }
  req.user = user;
  console.log(user);
  next();
});
module.exports.forgotPassword = catchAndSync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return sendError("No user Found for this email", 404, next);
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false }); // to ignore field required when save to update token

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot Your password submit a patch request with your password and confirm password to ${resetURL}.\n if you didn't forget your password please ignore this email`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token valid forr 10 min",
      message,
    });
    res.status(200).json({
      status: "succes",
      toke: "Token Sent to mail",
    });
  } catch (error) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })
    return sendError('There Was an error sending the email',500,next)
  }
});

//TODO: video 136 
module.exports.resetpassword = catchAndSync(async (req, res, next) => {

    res.status(200).json({
        status: "succes",
      toke: req.params.token,
    })
});
module.exports.restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return sendError(
        "You don't have permission to prefom this action",
        403,
        next
      );
    }
    next();
  };
};

function sendError(message, code, next) {
  return next(new AppError(message, code));
}

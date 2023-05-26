const AppError = require('../Utils/AppError');
const { inspect } = require('util');
const _=require('lodash')
const handleCastErrorDB = err => {

  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  console.log(err["message"]);
  const value = err["message"].match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
//  const errors = Object.values(err).map(el => el.message);

//  const message = `Invalid input data. ${errors.join('. ')}`;
   const message = `Invalid input data. ${err.message}`;
  return new AppError(message, 400);
};
const handleJWTTokenError = err => {


  const message = `Please Log in `;
  return new AppError(message, 401);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
  //  console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

module.exports.globalHandlerError = (err, req, res, next) => {
  

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {



let error =cloneError(err)

    if (err.name === 'CastError') error = handleCastErrorDB(error);
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if(err.name === 'JsonWebTokenError') error = handleJWTTokenError(error)

  console.log(error)
    sendErrorProd(error, res);
  }
};
function cloneError(error) {
  const clonedError = new AppError(error.message,error.statusCode);
  Object.assign(clonedError, error);
  return clonedError;
}
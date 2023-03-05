const express = require('express');
const dotenv = require('dotenv');
const appError =require('./Utils/AppError')
dotenv.config({ path: './config.env' });
const errorController = require('./controllers/error.controller')
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
//Get the default connection
const db = mongoose.connection;

//Set up default mongoose connection
mongoose.set('strictQuery', false);
mongoose.connect(DB, { useNewUrlParser: true });

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const tourRouter = require('./routers/tour.router');
const userRouter = require('./routers/user.router');
const AppError = require('./Utils/AppError');
const app = express();

//MiddleWare
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//no matter witch request post or get or delete ....
app.all('*',(req,res,next)=>{

  const err = new Error(`No page found for this link ${req.originalUrl}`)
  err.statusCode = 404;
  err.status="fail"
  next(new AppError())
})
app.use(errorController.globalHandlerError);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//npm install eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y  eslint-plugin-node eslint-plugin-prettier eslint-plugin-react prettier --save-dev

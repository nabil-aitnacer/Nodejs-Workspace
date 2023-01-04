const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
  
  name: {
    type:String,
    trim:true,
    required:[true,"A tour must have a name "]
  },
  duration: {
    type:Number,
    required:[true,"A tour must have a duration "]
  },
  maxGroupSize: {
    type:Number,
    required:[true,"A tour must have a max group size "]
  },
  difficulty: {
    type:String,
    
  
  },
  ratingsAverage: {
    type:String,
    required:[true,"A tour must have a difficulty "]
  },
  ratingsQuantity: {
    type:Number,
    
  },
  price: {
    type:Number,
    required:[true,"A tour must have a price "]
  },
  discount: {
    type:Number,

  },
  summary: {
    type:String,
    trim:true,
    required:[true,"A tour must have a summary "]
  },
  description: {
    type:String,
    trim:true,
    required:[true,"A tour must have a description "]
  },
  imageCover: {
    type:String,
    required:[true,"A tour must have a imageCover "]
  },
  images: {
    type:[String],
 
  },
  createdAt: {
    type:Date,
    default:Date.now(),
    select:false
  },
  startDates: {
    type:[Date],
    required:[true,"A tour must have a startDates "]
  },

  


  


  })
  const Tour = mongoose.model('tours',tourSchema)
  module.exports = Tour
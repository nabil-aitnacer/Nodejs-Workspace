//review // rating // createdAt // ref to tour // ref to user
const mongoose = require('mongoose')
const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true,'Review cannot be empty']

    },
    rating:{
        type:Number,
        min :1,
        max:5
    },
    createdAd:{
        type:Date,
        default:Date.now
    },
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'tours',
        required:[true,'A review must have a tour']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:[true,'A review must have a user']
    }
})

const review = mongoose.model('review',reviewSchema)
module.exports = review
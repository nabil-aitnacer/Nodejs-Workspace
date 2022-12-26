const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    },
})
module.exports = mongoose.model('user',User)
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const employe = new Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'Please Provide a name']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please Provide a email']
    },
    address:{
        type:String,
        unique:true,
        required:[true,'Please Provide a address']
    }, 
    phone:{
        type:String,
        unique:true,
        required:[true,'Please Provide a phone']
    }
})

const Employe = mongoose.model('employee',employe)
module.exports = Employe
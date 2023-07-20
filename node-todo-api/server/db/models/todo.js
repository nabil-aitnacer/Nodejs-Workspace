const mongoose = require('mongoose')
const Todo = mongoose.model('Todo',{
    text:{
        type:String,
        required: true,
        minLength:1,
        trim :true
    },
    completed:{
        type:Boolean
    },
    completedAt:{
        type:Date
    }
})

module.exports = {Todo}
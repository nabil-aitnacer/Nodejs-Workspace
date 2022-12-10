 
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        required:true
    },

    
});
// Compile model from schema
mongoose.set('strictQuery', true)
const Todo = mongoose.model('Todo', todoSchema );
module.exports = Todo
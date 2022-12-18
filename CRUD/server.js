const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../SOCKETS/TODO-List/server/todo.schema');
const app =express();
const PORT=5500;
const cors =require('cors')
const bodyParser = require('body-parser');
const MONGOOSE_URL = "mongodb+srv://root:cAHYnOKTRoeQDdVI@cluster0.ls5u6h8.mongodb.net/TodoDB?retryWrites=true&w=majority"

const todoSchema = new mongoose.Schema({
    id:{
        type:String,
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

    
})
const todo = mongoose.model('Todo',todoSchema)
app.use(bodyParser.json());
app.use(cors())
mongoose.connect(MONGOOSE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
mongoose.set('strictQuery', false)

// Listen for the `connected` event on the connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose connection was successful!');
  });
  
  // Listen for the `error` event on the connection
  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection failed:', err);
  });


  app.post('/',async (req,res)=>{

    try {
        console.log(req.body)
        const newTodo= new todo(req.body);
        console.log(newTodo)
        newTodo.save((err)=>{
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(newTodo)
            }
        })
    } catch (error) {
        
    }
  })



  // Start the Express server
app.listen(PORT, () => {
    console.log('Server is listening on port 5500');
  });

  module.exports =app
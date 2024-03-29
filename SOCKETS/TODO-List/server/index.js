const express = require('express');
const mongoose = require('mongoose');

const app =express();
const PORT=5500;
const path = require('path')
const cors =require('cors')
const bodyParser = require('body-parser');
const MONGOOSE_URL = "mongodb+srv://root:cAHYnOKTRoeQDdVI@cluster0.ls5u6h8.mongodb.net/TodoDB?retryWrites=true&w=majority"
const pupblicPath = path.join(__dirname,'..','public')
const todoSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
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
todoSchema.set('id','id')
const todo = mongoose.model('Todo',todoSchema)
app.use(express.static(pupblicPath))
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

app.get('/',(req,res)=>{
    res.type('html')
    res.sendFile('public/index.html',{root:path.join(__dirname,'..')})
})

//insert TODo to mongo DB
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

  // delete todo from data base 


todo.findById(4, (err, todo) => {
    if (err) {
      // Handle the error...
      console.log("Nout found")
    } else {
      console.log('Todo:', todo);
    }
  });
 

  // Start the Express server
app.listen(PORT, () => {
    console.log('Server is listening on port 5500');
  });

  module.exports =app
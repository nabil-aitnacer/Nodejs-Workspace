
var mongoose = require('mongoose');
const Todo = require('./todo.schema')
const express = require('express')
const cors = require('cors')
const appp = express()
const PORT = 8000;
const path = require('path');
const morgan =require('morgan')

const filePath = path.join(__dirname,'..' ,'public', 'index.html');
//Set up default mongoose connection
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/todoDB?retryWrites=true&w=majority"

main().catch(err=> console.log(err))
async function main(){
    await mongoose.connect(Mongo_db_Url)
}

async function insertTodo(todo){
    const newTodo = new Todo(todo);
    await newTodo.save();
}

appp.post('/',morgan('combined'),async (req,res)=>{

    try {
        await insertTodo(req.body)
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
})
appp.get('/',(req,res)=>{
    res.sendFile(filePath);
    res.type('html')
})

mongoose.set('strictQuery', true)
mongoose.connection.once('open',()=>{
    console.log('Mongoose Connection is ready')
})

appp.use('/',express.static(path.join(__dirname,'..' ,'public')))
appp.use(morgan('combined'))
appp.use(express.json())

appp.listen(PORT,()=>console.log("Server listening"))

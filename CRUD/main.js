//imports
require('dotenv').config;
const express = require('express')
const mongoose = require('mongoose')
const app =express();
const session = require('express-session')
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/crudDb?retryWrites=true&w=majority"
const userRouter= require('./routers')
const path = require('path')
// databae Connection
mongoose.connect(Mongo_db_Url);
const db = mongoose.connection
db.on('error',()=>console.log('Error Mongoose  '))
db.once('open',()=>console.log('Mongoose Connected'))

//Middlewares
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"uploads")))
app.use(session({
    secret:'SecreTe KeyS',
    saveUninitialized:true,
    resave:false
}))
app.use((req,res,next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
})
app.use(userRouter)


//set Template Engine
app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'))


app.listen(3000,()=>{
    console.log(`Server started at port 3000`)
})
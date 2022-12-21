const express = require('express')
const ejs = require('ejs');
const path = require('path')
const app =express();
const employeeRouter = require('./controllers/employe.controller')
const bodyParser= require('body-parser')
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/manageDb?retryWrites=true&w=majority"
const mongoose = require('mongoose')
//MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'public','views'))

app.use(employeeRouter)

mongoose.connect(Mongo_db_Url)
mongoose.connection.on('open',()=>{
    console.log("Mongoose Connected")
})
app.listen(3000,()=>{
    console.log('Server Lestening.....')
})


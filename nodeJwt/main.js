const express = require('express')
const ejs = require('ejs')
const app = express();
const path =require('path')
const homeRouter = require('./controllers/home.controller')
const authRouter = require('./controllers/auth.controller')

app.use(express.static(path.join(__dirname,'public')))
//set Template Engine
app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'))


app.use('/',homeRouter);
app.use('/auth',authRouter)

app.listen(3500,()=>{
    console.log('server listening on 3500')
})
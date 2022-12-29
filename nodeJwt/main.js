const express = require('express')
const ejs = require('ejs')
const app = express();
const path =require('path')
const homeRouter = require('./controllers/home.controller')
const {router} = require('./controllers/auth.controller')
const https = require('https')
const fs = require('fs')
const helmet =require('helmet')

app.use(helmet())
app.use(express.static(path.join(__dirname,'public')))
//set Template Engine
app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'))

app.use('/',router)



https.createServer({
key: fs.readFileSync('key.pem'),
cert:fs.readFileSync('cert.pem')
},app).listen(3500,()=>{
    console.log('server listening on 3500')
})
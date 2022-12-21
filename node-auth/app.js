const express = require('express');
const mongoose = require('mongoose');
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/authDB?retryWrites=true&w=majority"
const authRouter = require('./routers/auth.router')
const app = express();
const coockie = require('cookie-parser')
// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(coockie())

// view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(Mongo_db_Url,{useNewUrlParser: true,useUnifiedTopology: true})

mongoose.connection.on('open',()=>{
    console.log('Connection is Ready ')
    app.listen(3000)
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRouter)
app.get('/setcoockie',(req,res)=>{
    res.cookie('newuser',false)
   
})
app.get('/getcoockie',(req,res)=>{
 const cookie = req.cookies

 res.send(cookie)
})
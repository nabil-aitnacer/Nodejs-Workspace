const express = require('express');
const mongoose = require('mongoose');
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/authDB?retryWrites=true&w=majority"
const authRouter = require('./routers/auth.router')
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
// view engine
app.set('view engine', 'ejs');

// database connection

mongoose.connect(Mongo_db_Url,{useNewUrlParser: true,useUnifiedTopology: true})
mongoose.set('strictQuery', false);
mongoose.connection.on('open',()=>{
    console.log('Connection is Ready ')
    app.listen(3000)
})

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRouter)
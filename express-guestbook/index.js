const express = require('express')

const  logger = require('morgan')
const bodyParser = require('body-parser')
const path =require('path');
const app =express();
app.set('view engine',"ejs")
app.set('views',path.join(__dirname,'views'))


const entries =[];

app.locals.entries = entries;
app.use(logger('short'))
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/new-entry',(req,res)=>{
   res.render('new-entry')
})
app.post('/new-entry',(req,res)=>{
    if(!req.body.title || !req.body.body){
        res.status(400).send('Entries must have a title and a body')
        return;
    }
    entries.push({
        title:req.body.title,
        content:req.body.body,
        published:new Date()
    })
    res.redirect('/')
})

app.use((req,res)=>{
    res.status(400).render('404')
})


app.listen(3000,()=>{
    console.log("Guestbook app started on port 3000.");
})
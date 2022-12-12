const path = require('path')
const express =require('express');
const app = express()
const ejs = require('ejs')
const publicPath = path.join(__dirname,'..','public')
const bodyParser = require('body-parser')
const mongoose= require('mongoose')
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/blogDB?retryWrites=true&w=majority"
const BlogPost = require('./models/BlogPost')
mongoose.connect(Mongo_db_Url,{useNewUrlParser: true})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',async (req,res)=>{
  
    const blogposts= await BlogPost.find({})
    console.log(blogposts)
    res.render('index',{
        blogposts
    })
})
app.get('/about',(req,res)=>{
  
    //res.sendFile('about.html',{root:pagePath})
    res.render('about')
})
app.get('/contact',(req,res)=>{
  
   // res.sendFile('contact.html',{root:pagePath})
   res.render('contact')
})
app.get('/post/:id',async (req,res)=>{
    const postId = req.params.id
    console.log('post id '+postId)
    const post = await BlogPost.findById(postId)
    if(post){
        console.log(post.title)
    }else {
        console.log(`No post found with ID ${postId}`);
      }
   // res.sendFile('post.html',{root:pagePath})
   res.render('post',{
    post
   })
})
app.get('/posts/new',(req,res)=>{
    res.render('create')
})
app.post('/posts/store',async (req,res)=>{
    console.log(req.body)
   
        await BlogPost.create(req.body)
        res.redirect('/')
  
   
})

app.use(express.static(publicPath))

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'..','public','views'))

app.listen(4000,()=>{
    console.log('App listening on port 4000');
})
mongoose.set('strictQuery', false);
mongoose.connection.on('open',()=>{
    console.log('Connection is Ready ')
})
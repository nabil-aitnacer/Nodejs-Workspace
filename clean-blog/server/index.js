const path = require('path')
const express =require('express');
const app = express()
const ejs = require('ejs')
const publicPath = path.join(__dirname,'..','public')
const bodyParser = require('body-parser')
const mongoose= require('mongoose')
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/blogDB?retryWrites=true&w=majority"
const BlogPost = require('./models/BlogPost')
const fileUpload = require('express-fileupload');
const { watch } = require('./models/BlogPost');

mongoose.connect(Mongo_db_Url,{useNewUrlParser: true})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

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
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
        // The name of the input field (i.e. "image") is used to retrieve the uploaded file
  let image = req.files.image;

  // Use the mv() method to place the file in upload directory (i.e. "uploads")
  image.mv('../public/assets/img/' + image.name, async function(err) {
    if (err) return res.status(500).send(err);
    await BlogPost.create({
        ...req.body,
        image:'../../assets/img/' + image.name

    })

    res.redirect('/');
       
        
   });

})
const formValidation = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.body == null|| req.body.username == null || req.body.image == null){
        console.log(req.body)
        res.redirect('/posts/new')
       
    }
    next()
}
app.use('/posts/new',formValidation)
app.use(express.static(publicPath))
app.use('/post/assets/',express.static('public/assets/'))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'..','public','views'))

app.listen(4000,()=>{
    console.log('App listening on port 4000');
})
mongoose.set('strictQuery', false);
mongoose.connection.on('open',()=>{
    console.log('Connection is Ready ')
})
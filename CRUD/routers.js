const express = require('express')
const router = express.Router();
const multer = require('multer')
const User = require('./users')
const path= require('path')
const fs = require('fs')

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"uploads"))
    },
    filename:function(req,file,cb){
        cb(null,Date.now().toString()+"_"+ file.originalname );
    },
})
var uploads = multer({
    storage:storage,
}).single('image')
router.get('/users',(req,res)=>{
    res.send('All User')
})
router.get('/',(req,res)=>{
    User.find().exec((err,users)=>{
        if (err) {
            res.json({message:err.message})

        }else {
            res.render('index',{
                title:'Home',
                users:users
            })
            
        }
    })
    
    })
router.get('/add',(req,res)=>{
    res.render('add_user',{
        title:"Add  User"
    })
})
router.post('/add',uploads,(req,res)=>{
const user = new User({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    image:req.file.filename
});
user.save((error)=>{
    if(error){
        res.json({message:error.message,type:"danger"})
    }else{
        req.session.message = {
            type:"success",
            message:"User added successfully!"
        };
        res.redirect('/')
    }
})
})

router.get('/edit/:id',(req,res)=>{
    let id =req.params.id
    User.findById(id,(err,user)=>{
        if(err){
            res.redirect('/')
        }else{
        if(user == null){
            res.redirect('/')
        }else {
            res.render('update_user',{
                title:"Add  User",
                user:user
            })
        }
        }
    })
})
router.post('/edit/:id',uploads,(req,res)=>{
    let id =req.params.id
    let new_image =''
    if(req.file){
        new_image= req.file.filename
        try {
            fs.unlinkSync(path.join(__dirname,'uploads',req.body.old_image))
        } catch (error) {
            
        }
   
    }else{
        new_image = req.body.old_image
    }
    User.findByIdAndUpdate(id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        image:new_image
    },(error,user)=>{
        if(error){
            res.json({message:error.message,type:"danger"})
        }else{
            req.session.message = {
                type:"success",
                message:"User Update successfully!"
            };
            res.redirect('/')
        }
    })
})
router.get('/delete/:id',(req,res)=>{
    let id = req.params.id
    User.findByIdAndDelete(id,(err,user)=>{
        if(err){
            res.json({message:err.message,type:"danger"})
        }else{
            try {
                fs.unlinkSync(path.join(__dirname,'uploads',user.image))
            } catch (error) {
                
            }

            req.session.message = {
                type:"success",
                message:"User Delete successfully!"
            };
            res.redirect('/')
        }
    })
})
module.exports = router;
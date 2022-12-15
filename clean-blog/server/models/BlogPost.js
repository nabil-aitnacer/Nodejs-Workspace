const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title:String,
    body:String,
    username:String,
    dateposted:{
        type:Date,
        default:new Date()
    },
    image:{
        type:String,
        default:'../assets/img/home-bg.jpg'
    }
});

const BlogPost= mongoose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title:String,
    body:String,
    username:String,
    dateposted:{
        type:Date,
        default:new Date()
    }
});

const BlogPost= mongoose.model('BlogPost',BlogPostSchema)

module.exports = BlogPost
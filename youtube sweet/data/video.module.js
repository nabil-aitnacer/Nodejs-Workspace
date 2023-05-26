const mongoose = require('mongoose')
const videoSchema = new mongoose.Schema({

    title:{
        type:String,
    } ,
    channelTitle :{
        type:String,
    },
    thumbnail:{
        type:String,
    },
    publishedAt:{
        type:Date,
    },
    videoUrl :{
        type:String
    },
    description:{
        type:String
    }

})
const Video = mongoose.model('videos',videoSchema)
module.exports=Video
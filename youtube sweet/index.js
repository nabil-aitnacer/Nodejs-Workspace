const { google } = require('googleapis');
const mongoose = require('mongoose')

const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/manageDb?retryWrites=true&w=majority"
const Video = require('./data/video.module')
const fs = require('fs')

mongoose.connect(Mongo_db_Url)
mongoose.connection.on('open',()=>{
    console.log("Mongoose Connected")
})
async function search() {
  // Initialize the YouTube API client
  const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyAmpbOTPkfDGy8hXOvOBkTgR6RepedtKms' // Replace with your own API key
  });

  // Set the search query parameters
  const params = {
    q: 'حلويات رمضان',
    type: 'video',
    part: 'snippet',
    maxResults: 10
  };
  function saveVideo(){
    
  }

  // Search for videos matching the query
  const response = await youtube.search.list(params);
  console.log(response.data.items)
  // Print the results

  response.data.items.forEach(async (item) => {
   

  try {
    const video = new Video({
      title:item.snippet.title,
      channelTitle:item.snippet.channelTitle,
      thumbnail:item.snippet.thumbnails.high.url,
      publishedAt:new Date(item.snippet.publishedAt),
      videoUrl:`https://www.youtube.com/watch?v=${item.id.videoId}`,
      description:item.snippet.description
    });

    await video.save();
    console.log('creation Success');
  } catch (error) {
    console.log('creation error:', error);
  }
});
}

search().catch(console.error);
const sa_controller =  require('./controller/south_africa/sa.controller')
// Import the source and article models
const { Source, Article } = require("./DATA/article.modele");
const mongoose = require('mongoose')
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/news_sa_db?retryWrites=true&w=majority"

//TODO complet this code so mongose connect and can insert source
// Now you can use the Source and Article models in your application
<<<<<<< Updated upstream
// For example, you can create a new source
=======
//Get the default connection
const db = mongoose.connection;



//Set up default mongoose connection
mongoose.set('strictQuery', false);
mongoose.connect(Mongo_db_Url, { useNewUrlParser: true });

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
>>>>>>> Stashed changes
// const newSource = new Source({
//     name: "News24",
//     url: "https://www.news24.com",
//     icon_url: "https://scripts.24.co.za/img/sites/news24.png",
//   });
  
//   // Save the new source to the database
<<<<<<< Updated upstream
//   newSource.save()
//     .then((savedSource) => {
//       console.log("Saved source:", savedSource);
//     })
//     .catch((error) => {
//       console.error("Error saving source:", error);
//     });
<<<<<<< HEAD


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
sa_controller.saCrawl(); 
=======
sa_controller.scrapeTimeslive(); 
=======
  // newSource.save()
  //   .then((savedSource) => {
  //     console.log("Saved source:", savedSource);
  //   })
  //   .catch((error) => {
  //     console.error("Error saving source:", error);
  //   });
sa_controller.scrapeNews24(); 
>>>>>>> Stashed changes
>>>>>>> 99c37ae7c7a1c475811c7147b1d8a4daa6b2da8f

const sa_controller =  require('./controller/south_africa/sa.controller')
// Import the source and article models
const { Source, Article } = require("./DATA/article.modele");
const mongoose = require('mongoose')
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/crudDb?retryWrites=true&w=majority"

//TODO complet this code so mongose connect and can insert source
// Now you can use the Source and Article models in your application
// For example, you can create a new source
const newSource = new Source({
    name: "News24",
    url: "https://www.news24.com",
    icon_url: "https://scripts.24.co.za/img/sites/news24.png",
  });
  
  // Save the new source to the database
  newSource.save()
    .then((savedSource) => {
      console.log("Saved source:", savedSource);
    })
    .catch((error) => {
      console.error("Error saving source:", error);
    });
sa_controller.scrapeNews24(); 
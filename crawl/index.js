const sa_controller =  require('./controller/south_africa/sa.controller')
// Import the source and article models
const { Source, Article } = require("./DATA/article.modele");
const mongoose = require('mongoose')
const Mongo_db_Url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/crudDb?retryWrites=true&w=majority"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBUPpKpcpfOIhilMxZKG-8V3IWOgiaIiI",
  authDomain: "news-app-1fe4d.firebaseapp.com",
  projectId: "news-app-1fe4d",
  storageBucket: "news-app-1fe4d.appspot.com",
  messagingSenderId: "849358659838",
  appId: "1:849358659838:web:d82dcd54d7cf3efcea05af",
  measurementId: "G-G8T33092CQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



//TODO complet this code so mongose connect and can insert source
// Now you can use the Source and Article models in your application
// For example, you can create a new source
// const newSource = new Source({
//     name: "News24",
//     url: "https://www.news24.com",
//     icon_url: "https://scripts.24.co.za/img/sites/news24.png",
//   });
  
//   // Save the new source to the database
//   newSource.save()
//     .then((savedSource) => {
//       console.log("Saved source:", savedSource);
//     })
//     .catch((error) => {
//       console.error("Error saving source:", error);
//     });


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
sa_controller.saCrawl(); 

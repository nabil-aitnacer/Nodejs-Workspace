// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-aJrfIWRILQq_8p4id5U8mc0-ViGMeLw",
  authDomain: "samurai-wallpape.firebaseapp.com",
  projectId: "samurai-wallpape",
  storageBucket: "samurai-wallpape.appspot.com",
  messagingSenderId: "576262816683",
  appId: "1:576262816683:web:5f31bc94d16b1012a088ee",
  measurementId: "G-E7VXRRXFTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
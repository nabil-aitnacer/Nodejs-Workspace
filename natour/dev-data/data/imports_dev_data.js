const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/db/tour.model');
const Review = require('../../models/db/review.model');
const User = require('../../models/db/user.model');
const path = require('path');
const { async } = require('rxjs');
dotenv.config({path: '../../config.env'});


const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  mongoose.set('strictQuery', false);
mongoose.connect(DB, { useNewUrlParser: true });



const tours = JSON.parse(fs.readFileSync(`${path.join(__dirname, 'tours.json')}`));
const reviews = JSON.parse(fs.readFileSync(`${path.join(__dirname, 'reviews.json')}`));
const users = JSON.parse(fs.readFileSync(`${path.join(__dirname, 'users.json')}`));

const importData = async () =>{
    try{
            await Tour.create(tours,{ validateBeforeSave:false});
            await Review.create(reviews);
            await User.create(users,{ validateBeforeSave:false});
            console.log("Data successfully loaded");
    }catch(err){
console.log(err)
    }
    process.exit();
}

const deleteData = async () =>{
    try{
        await Tour.deleteMany();
        await Review.deleteMany();
        await User.deleteMany();
        console.log("Data successfully Deleted");
}catch(err){
console.log(err)
}
process.exit();
}
if(process.argv[2] == 'importdata'){
    importData();
}else if (process.argv[2] == 'deletedata'){
    deleteData();
}

console.log(process.argv);
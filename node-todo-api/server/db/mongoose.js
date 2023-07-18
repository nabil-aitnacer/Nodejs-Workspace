const mongoose= require('mongoose');
const db_url = "mongodb+srv://root-db:CDD8i9he5yJeMCfE@cluster0.ihpy6fx.mongodb.net/todo-api?retryWrites=true&w=majority"
mongoose.Promise = global.Promise
mongoose.connect(db_url);
const db = mongoose.connection
db.on('error',() =>console.log('Error Mongoose'))
db.on('open',() =>console.log(' Mongoose Connected'))

module.exports = {mongoose}
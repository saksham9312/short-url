const mongoose = require('mongoose');
require('dotenv').config()

// const url = process.env.MONGODB_URL;
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main() {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("DB Connected!")
    }catch(err){
        console.log("Error in connecting to MongoDb DB")
    }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
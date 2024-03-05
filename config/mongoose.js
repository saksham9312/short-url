const mongoose = require('mongoose')
require('dotenv').config();
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main(){
    try{
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("DB Connected!")
    }catch(err){
        console.error('Error in connecting to MongoDB', err);
    }
}
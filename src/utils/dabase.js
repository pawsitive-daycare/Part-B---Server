
const mongoose = require('mongoose');


async function dbConnect(){
    console.log(process.env.DATABASE_URL);
    let databaseurl = process.env.DATABASE_URL || `mongodb://127.0.0.1:27017/${process.env.npm_package_name}`;

    await mongoose.connect(databaseurl);
}

module.exports = {
    dbConnect 
}
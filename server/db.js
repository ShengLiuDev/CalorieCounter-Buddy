const mongoose = require('mongoose') //import mongoose library to better handle MongoDB
mongoose.set('strictQuery',false)   //set not strict on constraint checking and connect to our url
const url = process.env.MONGODB_URI //url for accessing our database


console.log('connecting to', url)
const connectDB = async () => {
    mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })
};

module.exports = connectDB;
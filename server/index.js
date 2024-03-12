//Index.js is entry point for our backend server

//Importing libraries and modules as needed
require('dotenv').config()                          //Enviroment variables
const Recipe = require('./models/Recipes.js')       //Recipe model
const express = require('express');                 //Express module/library
const cors = require('cors');                       //Cross Origin Resource Sharing Library


const app = express(); //Create express application


app.use(cors())         //use cors library
app.use(express.json()) //use express json library for parsing incoming json


//Event Handler for GET requests to application's root URL
app.get('/', (request,response) => {
    Recipe.find({}).then(recipes => {
        response.json(recipes)
    })
})


//Set PORT and listen to PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => { //express object listens to port
    console.log(`Server running on port ${PORT}`)
})
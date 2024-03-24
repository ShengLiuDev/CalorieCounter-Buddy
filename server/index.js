//Index.js is entry point for our backend server

//Importing libraries and modules as needed
require('dotenv').config()                          //Enviroment variables
const express = require('express');                 //Express module/library
const cors = require('cors');                       //Cross Origin Resource Sharing Library
const Recipe = require('./models/recipe.js')       //Recipe model
const recipeRoutes = require('./routes/recipeRoutes.js');


const app = express(); //Create express application

app.use(cors())         //use cors library
app.use(express.json()) //use express json library for parsing incoming json
app.use('/api/recipes', recipeRoutes);

//Set PORT and listen to PORT
const PORT = process.env.PORT || 3001
app.listen(PORT, () => { //express object listens to port
    console.log(`Server running on port ${PORT}`)
})
//Index.js is entry point for our backend server

//Importing libraries and modules as needed
require('dotenv').config()                          //Enviroment variables
const express = require('express');                 //Express module/library
const cors = require('cors');                       //Cross Origin Resource Sharing Library
const connectDB = require('./db');
const mongoose = require('mongoose')

const recipeRoutes = require('./routes/recipeRoutes.js');
const ingredientRoutes = require('./routes/ingredientRoutes.js') 

const app = express(); //Create express application

app.use(cors())         //use cors library
app.use(express.json()) //use express json library for parsing incoming json
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);

//Set PORT and listen to PORT
const PORT = process.env.PORT || 3001
connectDB()
  	.then(() => {
    	app.listen(PORT, () => {
      	console.log(`Server running on port ${PORT}`);
    });
  	})
  	.catch((error) => {
    	console.error('Error connecting to MongoDB:', error.message);
  	});

app.get('/', (request, response) => {
	console.log("HELLO")
	response.send("Testing");
})

//Index.js is entry point for our backend server

//Importing necessary modules necessary
const express = require('express'); //import express module and make sure it exists
const cors = require('cors');       //import cors for Cross-Origin Resource Sharing so backend can interact wiht front end

//Create express application stored in app variable
const app = express();


app.use(cors())         //use cors library
app.use(express.json()) //use express json library for parsing incoming json

//Event Handler for GET requests to application's root URL
app.get('/', (request,response) => {
    response.send("This is our backend")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { //express object listens to port
    console.log(`Server running on port ${PORT}`)
})
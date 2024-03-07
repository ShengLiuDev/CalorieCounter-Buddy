const express = require('express'); //loads express module and make sure it exists
const app = express(); //create express object
const cors = require('cors');

console.log(app)

app.use(cors()) //use cors library

//event handler used to handle HTTP GET requests made to the application's / root
app.get('', (request,response) => {
  response.send("Something going on")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { //express object listens to port
  console.log(`Server running on port ${PORT}`)
})
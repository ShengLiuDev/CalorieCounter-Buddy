//File to create Recipe model
//Models are constructors compiled from schema definitions. An instance of a model is called a document.
//Models are responsible for creating and reading documents from the underlying MongoDB database.

const mongoose = require('mongoose') //import mongoose library to better handle MongoDB
mongoose.set('strictQuery',false)   //set not strict on constraint checking and connect to our url


//url for accessing our database
const url = process.env.MONGODB_URI

console.log('connecting to', url)

//Try to connect to MongoDB Atlas
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })


//Define recipe schema
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        measurement: { type: String, required: true }
    }],
    steps: {
        type: [String],
        required: true
    },
    nutritionalInformation: {
        calories: { type: Number, required: true },
        protein: { type: Number, required: true },
        fat: { type: Number, required: true },
        carbohydrates: { type: Number, required: true }
    },
    photos: [String], // Array of photo URLs
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

recipeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Recipe = mongoose.model('Recipe', recipeSchema);

const recipe = new Recipe({
  title: 'First Recipe',
  ingredients: [{name:'pickles',quantity:'1',measurement:'cups'}],
  steps: ['Step1','Step2'],
  nutritionalInformation: {calories: 100, protein: 20, fat: 20, carbohydrates: 20},
  photos: []
})

recipe.save().then(result => {
  console.log('recipe saved!')
  mongoose.connection.close()
})

module.exports = mongoose.model('Recipe', recipeSchema)

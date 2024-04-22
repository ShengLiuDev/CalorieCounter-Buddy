//File to create Recipe model
//Models are constructors compiled from schema definitions. An instance of a model is called a document.
//Models are responsible for creating and reading documents from the underlying MongoDB database.

const mongoose = require('mongoose') //import mongoose library to better handle MongoDB

//Define recipe schema
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: [
        {
            name: { type: String, required: true },
            quantity: { type: String },
            measurement: { type: String }
        }
    ],
    steps: {
        type: [String],
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    nutritionalInformation: {
        calories: { type: Number, required: true },
        protein: { type: Number, required: true },
        fat: { type: Number, required: true },
        carbohydrates: { type: Number, required: true }
    },
    photos: [String],
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    contributor_id: {
        type: String,
        required: true
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

recipeSchema.index({ title: 'text', tags: 'text' });

module.exports = mongoose.model('Recipe', recipeSchema)

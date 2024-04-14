const mongoose = require('mongoose')

const ingredientSchema = new mongoose.Schema({
    FoodItem: {
        type:String,
        required: true
    },
    per100grams: {
        type:String,
        required: true
    },
    Cals_per100grams: {
        type:Number,
        required: true
    },
})

ingredientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

ingredientSchema.index({ FoodItem: 'text' });

module.exports = mongoose.model('Ingredient', ingredientSchema)

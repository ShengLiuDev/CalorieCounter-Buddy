const express = require('express');
const Ingredient = require('../models/ingredient');
const mongoose = require('mongoose');
const ingredient = require('../models/ingredient');

const router = express.Router();

// GET all ingredients, seperated by pages
router.get('/', async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const pageSize = parseInt(request.query.pageSize) || 10;

    try {
        const totalIngredients = await Ingredient.countDocuments();
        const ingredients = await Ingredient.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        response.json({
            ingredients,
            totalPages: Math.ceil(totalIngredients / pageSize),
            currentPage: page
        });
        console.log("get/");
    } catch (error) {
        console.error('Error fetching ingredients:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    }
});

//GET Ingredient by ID
router.get('/:_id', (request, response) => {
	Ingredient.findById(request.params._id)
	.then(ingredient => {
		// If the recipe is found, return it in the response
		if (ingredient) {
			response.json(ingredient);
            console.log("get/id");
		} else {
			// If the recipe is not found, return a 404 Not Found error
			response.status(404).json({ error: 'Ingredient not found' });
		}
	})
	.catch(error => {
		// If there's an error querying the database, return a 500 Internal Server Error
		console.error('Error finding ingredient:', error.message);
		response.status(500).json({ error: 'Internal server error' });
	});
})

// GET Ingredient by name with exact or closest match
router.get('/name/:name', async (request, response) => {
    const name = request.params.name;
    try {
        // Perform a text search for ingredients with the given name
        const ingredients = await Ingredient.find({ $text: { $search: name } }, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).limit(1);

        // Check if any ingredients are found
        if (ingredients.length > 0) {
            response.json(ingredients[0].Cals_per100grams);
            console.log("get/name");
        } else {
            response.status(404).json({ error: 'Ingredient not found' });
            console.log(name);
        }
    } catch (error) {
        console.error('Error finding ingredient by name:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    }
});

// CREATE a new ingredient
router.post('/', (request, response) => {
    const ingredient = new Ingredient(request.body);

    ingredient.save()
    .then(savedIngredient => {
        response.status(201).json(savedIngredient);
    })
    .catch(error => {
        console.error('Error creating ingredient:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    });
});

// UPDATE an ingredient by ID
router.put('/:id', (request, response) => {
    Ingredient.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
    )
    .then(updatedIngredient => {
        if (updatedIngredient) {
            response.json(updatedIngredient);
        } else {
            response.status(404).json({ error: 'Ingredient not found' });
        }
    })
    .catch(error => {
        console.error('Error updating ingredient:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    });
});

// DELETE a ingredient by ID
router.delete('/:id', (request, response) => {
    Ingredient.findByIdAndDelete(request.params.id)
    .then(deletedIngredient => {
        if (deletedIngredient) {
            response.json({ message: 'Ingredient deleted successfully' });
        } else {
            response.status(404).json({ error: 'ingredient not found' });
        }
    })
    .catch(error => {
        console.error('Error deleting ingredient:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    });
});


module.exports = router;
const express = require('express');
const Recipe = require('../models/recipe');
const mongoose = require('mongoose')

const router = express.Router();

// Middleware to log MongoDB connection status
const checkDBConnection = (req, res, next) => {
    const isConnected = mongoose.connection.readyState === 1;
    console.log('MongoDB Connection Status:', isConnected ? 'Connected' : 'Disconnected');
    next(); // Move to the next middleware or route handler
};

// Apply the middleware to all routes in this router
router.use(checkDBConnection);

// GET all recipes, seperated by pages
router.get('/', async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const pageSize = parseInt(request.query.pageSize) || 10;

    try {
        const totalRecipes = await Recipe.countDocuments();
        const recipes = await Recipe.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        response.json({
            recipes,
            totalPages: Math.ceil(totalRecipes / pageSize),
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    }
});

//GET Recipe by ID
router.get('/:_id', (request, response) => {
	Recipe.findById(request.params._id)
	.then(recipe => {
		// If the recipe is found, return it in the response
		if (recipe) {
			response.json(recipe);
		} else {
			// If the recipe is not found, return a 404 Not Found error
			response.status(404).json({ error: 'Recipe not found' });
		}
	})
	.catch(error => {
		// If there's an error querying the database, return a 500 Internal Server Error
		console.error('Error finding recipe:', error.message);
		response.status(500).json({ error: 'Internal server error' });
	});
})

// CREATE a new recipe
router.post('/', (request, response) => {
    const recipe = new Recipe(request.body);

    recipe.nutritionalInformation.calories = 200;
    recipe.nutritionalInformation.protein = 200;
    recipe.nutritionalInformation.fat = 200;
    recipe.nutritionalInformation.carbohydrates = 200;

    recipe.save()
    .then(savedRecipe => {
        response.status(201).json(savedRecipe);
        console.log('Successful');
        console.log(recipe);
    })
    .catch(error => {
        console.error('Error creating recipe:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    });
});

// UPDATE a recipe by ID
router.put('/:id', (request, response) => {
    Recipe.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
    )
    .then(updatedRecipe => {
        if (updatedRecipe) {
            response.json(updatedRecipe);
        } else {
            response.status(404).json({ error: 'Recipe not found' });
        }
    })
    .catch(error => {
        console.error('Error updating recipe:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    });
});

// DELETE a recipe by ID
router.delete('/:id', (request, response) => {
    Recipe.findByIdAndDelete(request.params.id)
    .then(deletedRecipe => {
        if (deletedRecipe) {
            response.json({ message: 'Recipe deleted successfully' });
        } else {
            response.status(404).json({ error: 'Recipe not found' });
        }
    })
    .catch(error => {
        console.error('Error deleting recipe:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = router;

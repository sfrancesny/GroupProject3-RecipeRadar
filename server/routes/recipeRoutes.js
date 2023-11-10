const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// fetches all of the recipes
router.get('/', recipeController.getAllRecipes);

// fetches a single recipe by ID
router.get('/:id', recipeController.getRecipeById);

// creates a new recipe
router.post('/', recipeController.createRecipe);

// updates a recipe by ID
router.put('/:id', recipeController.updateRecipeById);

// deletes a recipe by ID
router.delete('/:id', recipeController.deleteRecipeById);

module.exports = router;

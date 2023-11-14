const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const Ingredient = require('../models/ingredientsModel');
const usersData = require('./user.json');
const recipesData = require('./recipe.json');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Seed Users
async function seedUsers() {
  try {
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    for (const userData of usersData) {
      const filter = { username: userData.username };
      await User.findOneAndUpdate(filter, userData, options);
    }

    console.log('Users successfully added!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

// Seed Recipes
async function seedRecipes() {
  try {
    // Loop through each recipe data
    for (const recipeData of recipesData) {
      // Modify recipe data to use author's username directly and ingredients as strings
      const modifiedRecipe = {
        ...recipeData,
        ingredients: recipeData.ingredients.map(ingredient => ingredient.ingredientName) // Use only the ingredient name
      };

      // Insert the modified recipe data
      await Recipe.create(modifiedRecipe);
    }

    console.log('Recipes successfully added!');
  } catch (error) {
    console.error('Error seeding recipes:', error);
    throw error;
  } finally {
    // Close the connection after seeding
    mongoose.connection.close();
  }
}

// Seed data sequentially
async function seedData() {
  await seedUsers();
  await seedRecipes();
}

// Run the seed process
seedData();


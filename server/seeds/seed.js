const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const Ingredient = require('../models/ingredientsModel');
const usersData = require('./user.json'); 
const recipesData = require('./recipe.json'); 
const ingredientsData = require('./ingredients.json');

mongoose.connect('mongodb://127.0.0.1:27017')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const seedDatabase = async () => {
  try {
    // clears the database of existing users, recipes, and ingredients
    await User.deleteMany({});
    await Recipe.deleteMany({});
    await Ingredient.deleteMany({});

    // seed the ingredients
    const insertedIngredients = await Ingredient.insertMany(ingredientsData);
    console.log('Ingredients successfully added!');
    insertedIngredients.forEach(ingredient => {
      console.log(`Ingredient: ${ingredient.name}, ID: ${ingredient._id}`);
    });

    // inserts the users from the JSON file
    const createdUsers = await User.insertMany(usersData);

    // map through the recipesData & replace w/ actual user IDs
    const preparedRecipes = recipesData.map(recipe => {
      const user = createdUsers.find(u => u.username === recipe.author);
      if (!user) {
        throw new Error(`User not found for the author: ${recipe.author}`);
      }
      return { ...recipe, author: user._id };
    });

    // inserts the recipes with updated author IDs
    const insertedRecipes = await Recipe.insertMany(preparedRecipes);
    console.log('Recipes successfully added!');

    // when seeding is done, log the recipes and users
    const recipes = await Recipe.find();
    recipes.forEach(recipe => {
      console.log(`Recipe: ${recipe.name}, ID: ${recipe._id}`);
    });

    const users = await User.find();
    users.forEach(user => {
      console.log(`User: ${user.username}, ID: ${user._id}`);
    });

    console.log('Database seeded with users, recipes, and ingredients!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();

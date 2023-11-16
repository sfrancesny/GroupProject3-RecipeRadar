require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const Ingredient = require('../models/ingredientsModel');
const usersData = require('./user.json');
const recipesData = require('./recipe.json');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe-radar-db', {
});

// Function to drop collections
async function dropCollections() {
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();

  for (const collection of collections) {
    await db.dropCollection(collection.name);
    console.log(`Dropped collection: ${collection.name}`);
  }
}

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
      // Use recipe data directly without modifying ingredients
      await Recipe.create(recipeData);
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
  await mongoose.connection.once('open', async () => {
    console.log("Connected to MongoDB");
    await dropCollections();  // Drop collections before seeding
    await seedUsers();
    await seedRecipes();
    mongoose.connection.close(); // Close the connection after seeding
  });
}

// Run the seed process
seedData();


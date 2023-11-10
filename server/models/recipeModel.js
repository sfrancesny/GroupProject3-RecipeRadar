const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    preparationTime: {
        type: Number,
        required: true,
    },
    cookingTime: {
        type: Number,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    difficultyLevel: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    source: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0, // Default rating value
    },
    ingredients: [
        {

            /* Ingredients will be an array of subdocuments. Each document
               contains refences to ingredients from 'ingredientModel'
            */

            ingredient: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient', // Reference to the Ingredient model
            },
            quantity: Number,
            unitOfMeasurement: String,
        },
    ],
    instructions: [  //Array on instruction 
        {
            stepNumber: Number, // 01 , 02, 03 . . .
            instructionText: String, //chop onion in cubes, heat oil in pan . . . 
        },
    ],
    tags: [String], // Array for adding categories or of tag names
    images: [String], // Array of image URLs or file paths
});

const recipeModel = mongoose.model('recipeModel', recipeSchema);

recipeSchema.set('toJSON', {
    virtuals: true
  });

module.exports = recipeModel;


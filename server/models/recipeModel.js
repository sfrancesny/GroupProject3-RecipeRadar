const mongoose = require('mongoose');

const { Schema } = mongoose;

const recipeSchema = new Schema({

    title: {
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
    author: {
        type: String,
        ref: 'User',
        required: false,
    },    
    ingredients: [String], 
    instructions: [String],
});

const recipeModel = mongoose.model('recipeModel', recipeSchema);

recipeSchema.set('toJSON', {
    virtuals: true
  });

module.exports = recipeModel;

